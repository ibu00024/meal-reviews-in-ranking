import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Restaurant } from "./restaurant";
import { Category } from "./category";

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  review_id!: number;

  @Column({ type: "varchar", length: 255 })
  name!: string;

  @Column({ type: "varchar", length: 255 })
  reviewer_name!: string;

  @Column({ type: "int" })
  rating!: number;

  @Column({ type: "int" })
  price!: number;

  @Column({ type: "text" })
  comment!: string;

  @Column({ type: "text" })
  picture_url!: string;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.reviews)
  restaurant!: Restaurant;

  @ManyToOne(() => Category, (category) => category.reviews)
  category!: Category;
}
