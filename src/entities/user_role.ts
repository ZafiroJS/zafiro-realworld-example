import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import * as interfaces from "../interfaces";
import User from "./user";
import Role from "./role";

@Entity()
export default class UserRole implements interfaces.UserRole {

    @PrimaryGeneratedColumn()
    public id!: number;

    @ManyToOne(type => User, user => user.id)
    @JoinColumn()
    public user!: number;

    @ManyToOne(type => Role, role => role.id)
    @JoinColumn()
    public role!: number;

}
