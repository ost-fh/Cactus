import { Matches } from 'class-validator';

export default class CreateLibraryVersionDto {
  @Matches(/[A-Za-z0-9]/)
  name: string;
  //components: string[];
}
