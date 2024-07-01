import bodyParser from 'body-parser';

const injectMiddlewares = (server) => {
  server.use(bodyParser.json());
  // Add other middlewares here
};

export default injectMiddlewares;
