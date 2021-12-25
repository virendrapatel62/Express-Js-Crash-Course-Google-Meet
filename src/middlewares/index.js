const loggerMiddleware = (request, response, next) => {
  console.log({ url: request.url });
  console.log({ body: request.body });
  console.log({ params: request.params });
  next();
};

module.exports = loggerMiddleware;
