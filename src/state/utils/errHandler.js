const errHandler = (err, filter = null, space = "\t") => {
  const plainObject = {};
  Object.getOwnPropertyNames(err).forEach(key => {
    plainObject[key] = err[key];
  });
  return JSON.parse(JSON.stringify(plainObject, filter, space));
};

export default errHandler;
