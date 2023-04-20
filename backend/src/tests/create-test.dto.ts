import { Type, Transform } from 'class-transformer';
import {
  IsDefined,
  IsString,
  IsArray,
  ValidateNested,
  IsObject,
} from 'class-validator';
import TestDataDto from './test-data.dto';

class CriteriaDto {
  @IsString()
  @Transform(({ value }) => `${value}`)
  _id: string;

  @IsString()
  title: string;

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
