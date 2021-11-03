import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import errorMiddleware from '../middlewares/errorMiddleware';
import { IControllers } from '../@Types/Type';

type port = number;

class App {
  public app: express.Application;
  public port: port;
  private controllers: IControllers;

  constructor(port: port, controllers: IControllers ) {
    this.app = express();
    this.controllers = controllers;
    this.port = port;
    this.initializeMiddlewares();
    this.callRouters();
    this.handleErrors();
  }

  private initializeMiddlewares() {
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  private callRouters() {
    this.app.use('/pokedex', this.controllers.pokedex.router);
    this.app.use('/projects', this.controllers.projects.router);
  }

  private handleErrors() {
    this.app.use(errorMiddleware);
  }

  public startServer() {
    this.app.listen(this.port, () => {
      console.log(`API online on port: ${this.port}`);
    });
  }

}

export default App;
