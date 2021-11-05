import { 
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
import { Tag } from "./Tag";

@Entity()
export class Project {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  language: string;

  @Column()
  framework: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @Column()
  link: string;

  @Column()
  isFinished: boolean;

  @Column()
  isDeployed: boolean;

  @OneToMany(() => Tag, (tags: Tag) => tags.project)
  tags: Array<Tag>;

}
