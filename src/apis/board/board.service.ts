import { ConflictException, Injectable } from '@nestjs/common';
import { BoardEntity } from './entities/board.entity';
import * as bcryptjs from 'bcryptjs';
import { BoardRepository } from './entities/board.repository';
import { DeleteResult } from 'typeorm';

@Injectable()
export class BoardService {
  constructor(private readonly boardRepository: BoardRepository) {}

  async create(dto): Promise<BoardEntity> {
    const { title, content, password } = dto;
    const hasNumber = /(?=.*\d)/.test(password);

    if (!hasNumber || password.length < 6) {
      throw new ConflictException(
        '비밀번호는 숫자를 포함하여 6자 이상이어야 합니다.',
      );
    }

    if (title.length > 20) {
      throw new ConflictException('제목이 20자를 넘을 수 없습니다.');
    }

    if (content.length > 200) {
      throw new ConflictException('본문이 200자를 넘을 수 없습니다.');
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    return await this.boardRepository.create(title, content, hashedPassword);
  }

  async fetch(): Promise<Partial<BoardEntity[]>> {
    return await this.boardRepository.fetch();
  }

  async update(dto): Promise<BoardEntity> {
    const board = await this.boardRepository.findById(dto.id);
    if (!board) {
      throw new ConflictException('잘못된 접근입니다.');
    }

    const checkPassword = await bcryptjs.compare(dto.password, board.password);
    if (!checkPassword) {
      throw new ConflictException('비밀번호가 일치하지 않습니다.');
    }

    return await this.boardRepository.update(dto.id, dto.title, dto.content);
  }

  async delete(dto): Promise<DeleteResult> {
    const board = await this.boardRepository.findById(dto.id);
    if (!board) {
      throw new ConflictException('잘못된 접근입니다.');
    }

    const checkPassword = await bcryptjs.compare(dto.password, board.password);
    if (!checkPassword) {
      throw new ConflictException('비밀번호가 일치하지 않습니다.');
    }

    return await this.boardRepository.delete(dto.id);
  }
}
