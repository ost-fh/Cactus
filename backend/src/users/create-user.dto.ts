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

  //@MinLength(3)
  //@MaxLength(50)
  //@Matches(/^[a-zA-Z0-9.\-_$@*!]/)
  username: string;

  @IsNotEmpty()
  password: string;
}
