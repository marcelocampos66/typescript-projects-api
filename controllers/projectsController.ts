import express, { Request, Response, NextFunction } from 'express';
import Middlewares from '../middlewares/ProjectMiddlewares';
import { ProjectsService } from '../services/ProjectsService';
import { Project } from '../database/models/Project';

class ProjectsController extends Middlewares {
  public router: express.Router;
  private service: ProjectsService;

  constructor(ProjectsService: ProjectsService) {
    super();
    this.router = express.Router();
    this.service = ProjectsService;
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', this.getAllProjects);
    this.router.get('/:id', this.getProjectById);
    this.router.post('/', [
      this.verifyProjectInfos,
      this.verifyProjectExists,
      this.registerProject,
    ]);
    this.router.delete('/:id', this.deleteProject);
  }

  private getAllProjects = async (
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) => {
    const result: Array<Project> | [] = await this.service.getAllProjects();
    return res.status(200).json(result);
  }

  private getProjectById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { params: { id } } = req;
    const result: Project |
      undefined = await this.service.getProjectById(Number(id));
    if (!result) {
      return next({ status: 404, error: 'Project not found' });
    }
    return res.status(200).json(result);
  }

  private registerProject = async (
    req: Request,
    res: Response,
    _next: NextFunction,
  ) => {
    const { body } = req;
    const result: Project = await this.service.registerProject(body);
    return res.status(201).json(result);
  }

  private deleteProject = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { params: { id } } = req;
    const result: { message: string; }
      | undefined = await this.service.deleteProject(Number(id));
    if (!result) {
      return next({ status: 404, error: 'Project not found' });
    }
    return res.status(200).json();
  }

}

export default ProjectsController;
