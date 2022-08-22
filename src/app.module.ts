import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardModule } from './apis/board/board.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'database',
      entities: [
        __dirname + '/apis/**/*.entity.*', //
      ],
      synchronize: true,
    }),

    BoardModule,
  ],
})
export class AppModule {}
