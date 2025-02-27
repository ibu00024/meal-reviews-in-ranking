import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Review } from "./review";

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn("increment")
  restaurant_id!: number;

  @Index({ fulltext: true })
  @Column({ type: "varchar", length: 255 })
  name!: string;

  @Column({ type: "varchar", length: 255 })
  location!: string;

  @Column({ type: "float" })
  lat!: number;

  @Column({ type: "float" })
  lon!: number;

  @Column({ type: "varchar", length: 255 })
  city!: string;

  @Column({ type: "varchar", length: 255 })
  country!: string;

  @Column({ type: "text" })
  address!: string;

  @Column({ type: "varchar", length: 255 })
  phone_number!: string;

  @Column({ type: "boolean", default: true })
  delivery!: boolean;

  @Column({ type: "boolean", default: true })
  dine_in!: boolean;

  @Column({ type: "text" })
  open_date!: string;

  @Column({ type: "int" })
  price_level!: number;

  @OneToMany(() => Review, (review) => review.restaurant)
  reviews!: Review[];
}
