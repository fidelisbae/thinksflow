import { ApiProperty } from '@nestjs/swagger';

export class CreateBoardDto {
  @ApiProperty({
    example: '제목',
    description: '게시글 제목',
    required: true,
  })
  title: string;

  @ApiProperty({
    example: '본문',
    description: '게시글 본문',
    required: true,
  })
  content: string;

  @ApiProperty({
    example: 'abcd1212',
    description: '비밀번호 6자이상에 숫자를 하나이상 포함해야함',
    required: true,
  })
  password: string;
}

export class UpdateBoardDto {
  @ApiProperty({
    example: 1,
    description: 'increment id',
    required: true,
  })
  id: number;

  @ApiProperty({
    example: '제목',
    description: '게시글 제목',
    required: true,
  })
  title: string;

  @ApiProperty({
    example: '본문',
    description: '게시글 본문',
    required: true,
  })
  content: string;

  @ApiProperty({
    example: 'abcd1212',
    description: '비밀번호 6자이상에 숫자를 하나이상 포함해야함',
    required: true,
  })
  password: string;
}

export class DeleteBoardDto {
  @ApiProperty({
    example: 1,
    description: 'increment id',
    required: true,
  })
  id: number;

  @ApiProperty({
    example: 'abcd1212',
    description: '비밀번호 6자이상에 숫자를 하나이상 포함해야함',
    required: true,
  })
  password: string;
}
