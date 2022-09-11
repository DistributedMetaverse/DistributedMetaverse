import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
    BeforeInsert,
    BeforeUpdate,
} from "typeorm";
import { User } from "../../user/entities/user.entity"
import { File } from "./file.entity"

@Entity()
export class Share {
    @PrimaryGeneratedColumn()
    id: number;

    /**
     * 1 : M 관계 설정
     * @ManyToOne -> 해당 엔티티(File) To 대상 엔티티(Share)
     *               여러 공유받은 파일은 하나의 파일 속성에 소속
     */
    @ManyToOne(
        () => File,
        (file) => file.id,
    )
    @JoinColumn()
    file: File;

    /**
     * 1 : M 관계 설정
     * @ManyToOne -> 해당 엔티티(User) To 대상 엔티티(Share)
     *               여러 공유받은 파일은 하나의 유저에 소속
     */
    @ManyToOne(
        () => User,
        (user) => user.id,
    )
    @JoinColumn()
    user: User;

    @Column()
    nodeId: string;

    @Column({ type: "boolean", default: false })
    isDown: boolean;

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
