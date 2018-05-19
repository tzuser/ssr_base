import React from 'react';


function providesChildContext(instance) {
    return !!instance.getChildContext;
}

function isComponentClass(Comp){
    return Comp.prototype && (Comp.prototype.render || Comp.prototype.isReactComponent);
}

function getProps(element){
    return element.props || element.attributes;
}

const walkTree=(element,context,visitor)=>{
  //是否是数组
  if(Array.isArray(element)){
    element.forEach(item=>walkTree(item,context,visitor));
    return;
  }
  if(!element)return;
  //是否是reactElement
  if(React.isValidElement(element)){
    if(typeof element.type==='function'){
      const Comp = element.type;
      const props = Object.assign({},Comp.defaultProps,getProps(element));
      let childContext=context;
      let child;
      if(isComponentClass(Comp)){
        const instance = new Comp(props, context);
        instance.props = instance.props || props;
        instance.context = instance.context || context;
        // set the instance state to null (not undefined) if not set, to match React behaviour
        instance.state = instance.state || null;
        //执行willmount
        if (instance.componentWillMount) {
          instance.componentWillMount();
        }
        if (providesChildContext(instance)) {
          childContext = Object.assign({}, context, instance.getChildContext());
        }
        if (visitor(element, instance, context, childContext) === false) {
          return;
        }
        child = instance.render();
      }else{
        if (visitor(element, null, context) === false) {
          return;
        }
        child = Comp(props, context);
      }


      if (child) {
        if (Array.isArray(child)) {
          child.forEach(item => walkTree(item, childContext, visitor));
        } else {
          walkTree(child, childContext, visitor);
        }
      }

    }else{
      // a basic string or dom element, just get children
      if (visitor(element, null, context) === false) {
        return;
      }

      if (element.props && element.props.children) {
          React.Children.forEach(element.props.children, (child: any) => {
          if (child) {
            walkTree(child, context, visitor);
          }
        });
      }
    }
    //console.log(element.type)
  }else if (typeof element === 'string' || typeof element === 'number') {
      // Just visit these, they are leaves so we don't keep traversing.
      visitor(element, null, context);
  }

}


function hasFetchDataFunction(instance){
    return typeof instance.fetchData === 'function';
}

function isPromise(promise){
  return typeof promise.then === 'function';
}

const getPromisesFromTree=({rootElement, rootContext})=>{
  const promises = [];
  walkTree(rootElement,rootContext,(_, instance, context, childContext) => {
     
    if(instance && hasFetchDataFunction(instance)){
      const promise = instance.fetchData();
      if(isPromise(promise)){
        promises.push({promise, context: childContext || context, instance});
        return false;
      }
    }
  })
  return promises;
}
export const getDataFromTree=(rootElement,rootContext)=>{
  const promises = getPromisesFromTree({rootElement, rootContext});
  //console.log(promises)
  if (!promises.length) {
      return Promise.resolve();
  }
  const errors = [];

  const mappedPromises = promises.map(({promise, context, instance}) => {
      return promise
          .then(_ => getDataFromTree(instance.render(), context))
          .catch(e => errors.push(e));
  });

  return Promise.all(mappedPromises).then(_ => {
      if (errors.length > 0) {
        const error =
          errors.length === 1
            ? errors[0]
            : new Error(`${errors.length} errors were thrown when executing your fetchData functions.`);
        error.queryErrors = errors;
        throw error;
      }
    });
}

