import { Request, Response, NextFunction } from 'express';
import Helpers from '../helpers/Helpers';
import { getRepository } from 'typeorm';
import { Project } from '../database/models/Project';

class Middlewares {
  private helpers: Helpers;

  constructor() {
    this.helpers = new Helpers();
  }

  public verifyProjectInfos = async (
    req: Request,
    _res: Response,
    next: NextFunction,
  ) => {
    const { body } = req;
    const { error } = this.helpers.verifyProjectInfosJoi(body);
    if (error) {
      return next({ status: 422, message: error.details[0].message });
    }
    return next();
  }

  public verifyProjectExists = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { body: { name } } = req;
    const projectRepository = getRepository(Project);
    const exists = await projectRepository.findOne({ name });
    if (exists) {
      return res.status(409).json({ message: 'Project already exists' });
    }
    return next();
  }

}

export default Middlewares;
