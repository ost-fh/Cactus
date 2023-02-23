import {
  IsEmail,
  IsNotEmpty,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export default class CreateUserDto {
  @IsEmail()
  email: string;

  @MinLength(3)
  @MaxLength(50)
  @Matches(/[^\s-]/)
  username: string;

  @IsNotEmpty()
  password: string;
}
