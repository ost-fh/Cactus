import { IsString, Matches } from 'class-validator';

export default class CreateLibraryVersionDto {
  @IsString()
  @Matches(RegExp('^[A-Za-z0-9\\-\\.]+$'))
  name: string;
}
