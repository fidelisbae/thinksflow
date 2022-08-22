import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { BoardEntity } from './board.entity';

@Injectable()
export class BoardRepository {
  constructor(
    @InjectRepository(BoardEntity)
    private readonly boardRepository: Repository<BoardEntity>,
  ) {}

  async create(
    title: string,
    content: string,
    hashedPassword: string,
    weather: string,
  ): Promise<BoardEntity> {
    return await this.boardRepository.save({
      title: title,
      content: content,
      password: hashedPassword,
      weather: weather,
    });
  }

  async fetch(): Promise<Partial<BoardEntity[]>> {
    const boards = await this.boardRepository.find();
    const result = [];
    for (let i = 0; i < boards.length; i++) {
      result.push({
        id: boards[i].id,
        title: boards[i].title,
        content: boards[i].content,
        weather: boards[i].weather,
      });
    }
    return result;
  }

  async findById(id: number): Promise<BoardEntity> {
    return await this.boardRepository.findOne({ where: { id: id } });
  }

  async update(
    id: number,
    title: string,
    content: string,
  ): Promise<BoardEntity> {
    return await this.boardRepository.save({
      id: id,
      title: title,
      content: content,
    });
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.boardRepository.softDelete({ id: id });
  }
}
