import { getRepository } from 'typeorm';
import { Project } from '../database/models/Project';
import { Tag } from '../database/models/Tag';
import { IProject } from '../@Types/Type';

export class ProjectsService {

  public async getAllProjects() {
    const projectRepository = getRepository(Project);
    const projects = await projectRepository.find({
      relations: ['tags'],
    });
    return projects;
  }

  public async getProjectById(id: number) {
    const projectRepository = getRepository(Project);
    const project = await projectRepository.findOne({
        where: { id },
        relations: ['tags'],
    });
    return project;
  }

  public async registerProject(project: IProject) {
    const projectRepository = getRepository(Project);
    const tagRepository = getRepository(Tag);
    const newProject = new Project();
    newProject.name = project.name;
    newProject.language = project.language;
    newProject.framework = project.framework;
    newProject.description = project.description;
    newProject.image = project.image;
    newProject.isFinished = project.isFinished;
    newProject.isDeployed = project.isDeployed;
    await projectRepository.save(newProject);
    project.tags.forEach(async (tag) => {
      const currentTag = new Tag();
      currentTag.name = tag;
      currentTag.project = newProject;
      await tagRepository.save(currentTag);
    });
    return newProject;
  }

}

export default new ProjectsService();
