import joi from 'joi';
import { IProject } from '../@Types/Type';

class Helpers {

  public verifyProjectInfosJoi = (infos: IProject) => (
    joi.object({
      name: joi.string().min(4).required(),
      language: joi.string().min(2).required(),
      framework: joi.string().min(2).required(),
      description: joi.string().min(12).required(),
      image: joi.string().min(12).required(),
      isFinished: joi.boolean().required(),
      isDeployed: joi.boolean().required(),
      tags: joi.array().required(),
    }).validate(infos)
  )

}

export default Helpers;
