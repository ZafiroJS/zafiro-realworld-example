import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn
} from "typeorm";
import { mustBe, a } from "zafiro-validators";
import * as interfaces from "../interfaces";
import User from "./user";

@Entity()
export default class Post implements interfaces.Post {

    @PrimaryGeneratedColumn()
    @mustBe(a.number().optional())
    public id!: number;

    @ManyToOne(type => User, user => user.id)
    @JoinColumn()
    @mustBe(a.number().required())
    public user!: number;

    @Column()
    @mustBe(a.string().min(3).max(60).required())
    public title!: string;

    @Column()
    @mustBe(a.string().required())
    public content!: string;

    @CreateDateColumn()
    @mustBe(a.date().optional())
    public createdDate!: Date;

}
