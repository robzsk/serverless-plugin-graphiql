const path = require('path');
const server = require('./server');

class MyPlugin {

  constructor(sls, options) {
    this.sls = sls;
    this.options = options;
    this.commands = {
      graphiql: {
        usage: 'Creates graphiql server',
        lifecycleEvents: ['start'],
        options: {
          port: {
            usage: 'Port to listen on. Default: 3000',
            shortcut: 'p',
          },
        },
      },
    };
    this.hooks = {
      'graphiql:start': this.graphiqlStart.bind(this),
    };
  }

  graphiqlStart() {
    const babelOptions = ((this.sls.config.serverless.service.custom || {})['graphiql'] || {}).babelOptions;
    if (babelOptions) {
      require('babel-register')(babelOptions);
    }
    const fnName = this.options.function || 'graphql';
    const fn = this.sls.config.serverless.service.functions[fnName].handler;
    const [handler, graphql] = fn.split('.');
    const fullPath = path.join(process.cwd(), handler);
    server.start({
      handler: require(fullPath)[graphql],
      port: this.options.port,
    });
  }
}

module.exports = MyPlugin;
