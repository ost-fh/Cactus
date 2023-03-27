import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import TestMode, { TestModeSchema } from './test-mode.schema';

@Schema({
  timestamps: true,
})
export default class LibraryComponent {
  @Prop({ required: true })
  name: string;

  @Prop()
  alternativeComponentNames?: string;

  @Prop({ type: [TestModeSchema], required: true, default: [] })
  modes: TestMode[] = [];

  @Prop()
  accessibilityScore?: number;

  @Prop()
  agreementScore?: number;

  @Prop()
  amountOfTests?: number;

  @Prop()
  componentTested?: boolean;

  @Prop()
  linkDocs?: string;

  @Prop()
  exists: boolean; // TODO maybe computed
}

export const LibraryComponentSchema =
  SchemaFactory.createForClass(LibraryComponent);
