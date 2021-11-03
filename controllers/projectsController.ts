import express, { Request, Response, NextFunction } from 'express';
import { ProjectsService } from '../services/ProjectsService';

class ProjectsController {
  public router: express.Router;
  private service: ProjectsService;

  constructor(ProjectsService: ProjectsService) {
    this.router = express.Router();
    this.service = ProjectsService;
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/populate', this.populateDB);
    this.router.get('/', this.getAllProjects);
  }

  private populateDB = async (
    _req: Request,
    res: Response,
    _next: NextFunction
  ) => {
    // await getConnection()
    //   .createQueryBuilder()
    //   .insert()
    //   .into(Projects)
    //   .values(projects)
    //   .execute();
    res.status(200).json({ message: 'DataBase succesfully populated!' });
  }

  private getAllProjects = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    return res.status(200).json({ message: 'Pong!' });
  }

}

export default ProjectsController;
