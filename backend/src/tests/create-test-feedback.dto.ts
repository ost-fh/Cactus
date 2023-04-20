import { Type } from 'class-transformer';
import { IsDefined, ValidateNested, IsObject, IsString } from 'class-validator';
import TestDataDto from './test-data.dto';

export default class CreateTestFeedbackDto {
  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => TestDataDto)
  testData: TestDataDto;

  @IsString()
  feedback: string;
}
