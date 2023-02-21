import { Type } from 'class-transformer';
import {
  IsDefined,
  IsString,
  IsArray,
  ValidateNested,
  IsObject,
} from 'class-validator';

class TestDataDto {
  @IsString()
  libraryId: string;

  @IsString()
  libraryVersion: string;

  @IsString()
  component: string;

  @IsString()
  alternativeComponentNames: string;

  @IsString()
  testMode: string;

  @IsString()
  userBrowser: string;

  @IsString()
  userOs: string;
}

class CriteriaDto {
  @IsString()
  _id: string;

  @IsString()
  text: string;

  @IsString()
  help: string;

  @IsString()
  choice: string;

  @IsString()
  comment: string;
}

export default class CreateTestDto {
  @IsDefined()
  @IsArray()
  @ValidateNested()
  @Type(() => CriteriaDto)
  criteria: CriteriaDto[];

  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => TestDataDto)
  testData: TestDataDto;
}
