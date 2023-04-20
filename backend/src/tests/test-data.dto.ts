import { IsBoolean, IsOptional, IsString } from 'class-validator';

export default class TestDataDto {
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
