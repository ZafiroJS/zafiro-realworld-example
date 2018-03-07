import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn
} from "typeorm";
import * as interfaces from "../interfaces";
import User from "./user";
import Post from "./post";

@Entity()
export default class Comment implements interfaces.Comment {

    @PrimaryGeneratedColumn()
    public id!: number;

    @ManyToOne(type => User, user => user.id)
    @JoinColumn()
    public user!: number;

    @ManyToOne(type => Post, post => post.id)
    @JoinColumn()
    public post!: number;

    @Column()
    public content!: string;

    @CreateDateColumn()
    public createdDate!: Date;

}
