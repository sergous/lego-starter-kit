import express from 'express';
import { Server as httpServer } from 'http';
import AsyncRouter from 'lego-starter-kit/utils/AsyncRouter';
import _ from 'lodash';
import Core from '../Core';

export default class ExpressApp extends Core {
  asyncRouter = AsyncRouter;

  async init() {
    super.init();
    this.log.trace('ExpressApp init');
    this.express = this.createExpress();
    this.httpServer = httpServer(this.express);
    if (this.config.express) {
      this.log.trace('express config:', this.config.express);
      _.forEach((this.config.express || {}), (value, key) => {
        this.express.set(key, value);
      });
    }
  }

  createExpressApp() {
    return express();
  }

  async init() {
    super.init();
    this.log.trace('ExpressApp init');
    this.app = this.createExpressApp();
    this.httpServer = httpServer(this.app);
  }


  async run() {
    this.log.trace('ExpressApp run');
    this.useMiddlewares();
  }

  async afterRun() {
    this.log.trace('ExpressApp afterRun');
    this.useRoutes();
    this.useStatics();
    this.useDefaultRoute();
    this.useCatchErrors();
    return new Promise((resolve) => {
      this.httpInstance = this.httpServer.listen(this.config.port, () => {
        this.log.trace(`App running on port ${this.config.port}!`);
        resolve(this);
      });
    });
  }

  useMiddlewares() {}
  useRoutes() {}
  useStatics() {}
  useDefaultRoute() {
    this.app.use((req, res) => {
      return res.send(`Hello World from "${this.config.name}"`);
    });
  }
  useCatchErrors() {}

  async started() {
    console.log(`🎃  The server is running at http://127.0.0.1:${this.config.port}/ [${global.timing()}ms]`);
  }
}
