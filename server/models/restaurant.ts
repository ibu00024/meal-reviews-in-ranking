import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Review } from "./review";

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  restaurant_id!: number;

  @Column({ type: "varchar", length: 255 })
  name!: string;

  @Column({ type: "varchar", length: 255 })
  location!: string;

  @OneToMany(() => Review, (review) => review.restaurant)
  reviews!: Review[];
}
