export class CreateBoardDto {
  title: string;

  content: string;

  password: string;
}

export class UpdateBoardDto {
  id: number;

  title: string;

  content: string;

  password: string;
}

export class DeleteBoardDto {
  id: number;

  password: string;
}
