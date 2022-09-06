import {
    Index,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    BeforeInsert,
    BeforeUpdate,
} from "typeorm";
import { UserRole } from "./user.role"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    username: string;
  
    @Column()
    @Index({ unique: true })
    email: string;
  
    @Column()
    password: string;
  
    @Column('enum', { enum: UserRole, default: UserRole.USER})
    role: UserRole;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @BeforeInsert()
    protected beforeInsert() {
        this.createdAt = new Date(Date.now());
        this.updatedAt = new Date(Date.now());
    }

    @BeforeUpdate()
    protected beforeUpdate() {
        this.updatedAt = new Date(Date.now());
    }
}
