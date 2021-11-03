import express, { Request, Response, NextFunction } from 'express';

class ProjectsController {
  public router: express.Router

  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {

  }

}

export default ProjectsController;
