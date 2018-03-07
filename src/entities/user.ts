import { mustBe, a } from "zafiro-validators";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import * as interfaces from "../interfaces";

@Entity()
export default class User implements interfaces.User {

    @PrimaryGeneratedColumn()
    @mustBe(a.number().optional())
    public id!: number;

    @Column()
    @mustBe(a.string().email().required())
    public email!: string;

    @Column()
    @mustBe(a.string().required())
    public givenName!: string;

    @Column()
    @mustBe(a.string().required())
    public familyName!: string;

    @Column()
    @mustBe(a.boolean().required())
    public isBanned!: boolean;

}
