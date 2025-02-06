import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Restaurant {
    @PrimaryGeneratedColumn()
    restaurant_id!: number;

    @Column({ type: "varchar", length: 255 })
    name!: string;

    @Column({ type: "varchar", length: 255 })
    location!: string;
}