import {
    //Index,
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

@Entity()
export class File {
    @PrimaryGeneratedColumn()
    id: number;

    /**
     * 1 : M 관계 설정
     * @ManyToOne -> 해당 엔티티(User) To 대상 엔티티(File)
     *               여러 파일은 하나의 유저에 소속
     */
    @ManyToOne(
        () => User,
        (user) => user.id,
    )
    @JoinColumn()
    user: User;
  
    @Column()
    //@Index({ unique: true })
    fileId: string; // → nodeId

    @Column()
    transactionId: number;  // → transactionId
  
    @Column({ type: "text" })
    filename: string;
  
    @Column({ type: "double precision", default: 0 })
    fileSize: number;

    @Column({ type: "text" })
    mimeType: string;

    @Column({ type: "text", nullable: true })
    description: string;

    @Column({ type: "text" })
    path: string;

    @Column({ type: "boolean", default: false })
    isLike: boolean;

    @Column({ type: "boolean", default: false })
    isDel: boolean;

    @Column({ type: "boolean", default: false })
    downIPFS: boolean;

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
