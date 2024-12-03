// throttle scroll script

function throttle (func, timeout) {
    let timer = null;
    return function perform(...args) {
      if (timer) return
  
      timer = setTimeout( () => {
        func(...args);
        clearTimeout(timer);
        timer = null;
      }, timeout)
    }
  }
  
  export { throttle };