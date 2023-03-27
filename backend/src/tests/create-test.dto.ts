import { Type, Transform } from 'class-transformer';
import {
  IsDefined,
  IsString,
  IsArray,
  ValidateNested,
  IsObject,
  IsOptional,
  IsBoolean,
} from 'class-validator';

class TestDataDto {
  @IsString()
  libraryId: string;

  @IsString()
  libraryVersion: string;

  @IsString()
  component: string;

  @IsString()
  @IsOptional()
  alternativeComponentNames?: string;

  @IsString()
  testMode: string;

  @IsString()
  userBrowser: string;

  @IsString()
  userOs: string;

  @IsBoolean()
  componentExists: boolean; // TODO only true if componentLinkDocs exist

  @IsString()
  @IsOptional()
  componentLinkDocs?: string;
}

class CriteriaDto {
  @IsString()
  @Transform(({ value }) => `${value}`)
  _id: string;

  @IsString()
  text: string;

  @IsString()
  help: string;

  @IsString()
  choice: string; // TODO yes no not_decidable

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
