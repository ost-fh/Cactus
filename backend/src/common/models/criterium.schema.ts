import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export default class Criterium {
  @Prop()
  criterium_id: string;

  @Prop()
  title: string;

  @Prop()
  help: string;

  @Prop()
  choice: string;

  @Prop()
  comment: string;
}

export const CriteriumSchema = SchemaFactory.createForClass(Criterium);
