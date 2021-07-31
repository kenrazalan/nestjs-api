import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ObjectIdColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity()
  export class Users extends BaseEntity {
    @ObjectIdColumn()
    _id: string;
  
    @Column()
    fullname: string;
  
    @Column({unique: true})
    email: string;
  
    @Column()
    dob: Date;
  
    @Column()
    password: string;
  
    @CreateDateColumn({ type: 'timestamptz' })
    created: Date;
  
    @UpdateDateColumn({ type: 'timestamptz' })
    updated: Date;
  }
  