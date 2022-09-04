import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "./user.role"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    username: string;
  
    @PrimaryColumn()
    email: string;
  
    @Column()
    password: string;
  
    @Column('enum', { enum: UserRole, default: UserRole.USER})
    role: UserRole;
}
