import { mustBe, a } from "zafiro-validators";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import * as interfaces from "../interfaces";

@Entity()
export default class Role implements interfaces.Role {

    @PrimaryGeneratedColumn()
    @mustBe(a.number().optional())
    public id!: number;

    @Column()
    @mustBe(a.string().required())
    public name!: string;

}
