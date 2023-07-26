function tryCatchDecorator(statusCode = 400) {
  return function (target, name, descriptor) {
    const original = descriptor.value;
    descriptor.value = async function (...args) {
      try {
        const result = await original.apply(this, args);
        return result;
      } catch (error) {
        console.error(`Error in ${name}:`, error);
        return args?.res.status(statusCode).send(error);
      }
    };
    return descriptor;
  };
}
