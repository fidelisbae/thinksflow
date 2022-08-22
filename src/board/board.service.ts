import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardService {
  private board = [];

  getAllboards() {
    return this.board;
  }
}
