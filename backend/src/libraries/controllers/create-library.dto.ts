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
  @Matches(RegExp('^[A-Za-z0-9 ]+$'))
  title: string;

  @IsUrl({ require_protocol: true, protocols: ['http', 'https'] })
  linkHome: string;

  @IsUrl({ require_protocol: true, protocols: ['http', 'https'] })
  linkDocs: string;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => CreateLibraryVersionDto)
  currentVersion: CreateLibraryVersionDto;
}
