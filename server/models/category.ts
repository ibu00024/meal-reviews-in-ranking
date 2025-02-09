import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Review } from "./review";

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  category_id!: number;

  @Column({ type: "varchar", length: 255 })
  name!: string;

  @OneToMany(() => Review, (review) => review.category)
  reviews!: Review[];
}
