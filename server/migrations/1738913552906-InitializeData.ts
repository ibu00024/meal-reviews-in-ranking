import { MigrationInterface, QueryRunner } from "typeorm";

export class InitializeData1738913552906 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            INSERT INTO category
            VALUES
                (1, 'Ramen'),
                (2, 'Soba');
        `);

    await queryRunner.query(`
            INSERT INTO restaurant
            VALUES
                (1, 'Ramen Olympus', 'https://maps.app.goo.gl/PXQAhE5Dy52RJjvg6', 40.7128, 74.0060, 'New york', 'United State of America', '39-1 Shimogamo Minamichanokichō, Sakyo Ward, Kyoto', '070-000-0011', true, false, 'Monday: Closed;Tuesday: 12:00–2:00PM, 5:30–10:00PM', 3),
                (2, 'Soba Olympus', 'https://maps.app.goo.gl/XuZNY9tpEgu1pzyLA', 35.6764, 139.6500, 'Tokyo', 'Japan', '39-1 Shimogamo Minamichanokichō, Sakyo Ward, Kyoto', '070-000-0011', true, false, 'Monday: Closed;Tuesday: 12:00–2:00PM, 5:30–10:00PM', 4);
        `);

    await queryRunner.query(`
            INSERT INTO review
            VALUES
                (1, 'Olympus', 'User1', 5, 1500, 'This is very good', 'https://lh5.googleusercontent.com/p/AF1QipOVdfjjhcz8n3tO4xCDzkiydiAGhsBR1AJvfsPW=w520-h350-n-k-no', 1, 1),
                (2, 'Olympus Extra', 'User2', 3, 1300, 'This is ok', 'https://lh3.googleusercontent.com/p/AF1QipM4xkxd-mfDRgCr2Q8Sp7W8HMNA1YZ0ddG0YdEi=s1360-w1360-h1020', 1, 1),
                (3, 'Tempura Soba', 'User3', 0, 1000, 'Its really bad', 'https://lh3.googleusercontent.com/p/AF1QipMhGsaHIj6El3UaekQwuE92aV4zDyQ78mrt_wjX=s1360-w1360-h1020', 2, 2);
            `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
