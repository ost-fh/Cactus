import { Type } from 'class-transformer';
import {
  IsDefined,
  IsNotEmptyObject,
  IsObject,
  IsString,
  IsUrl,
  Matches,
  ValidateNested,
} from 'class-validator';
import CreateLibraryVersionDto from './create-library-version.dto';

export default class CreateLibraryDto {
  @IsString()
  @Matches(/[A-Za-z0-9]/)
  title: string;

  @IsUrl()
  linkHome: string;

  @IsUrl()
  linkDocs: string;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => CreateLibraryVersionDto)
  currentVersion: CreateLibraryVersionDto;
}
