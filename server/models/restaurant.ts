import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Restaurant {
    @PrimaryGeneratedColumn()
    RestaurantID!: number;

    @Column()
    Name!: string;

    @Column()
    Location!: string;
}