import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export default class CriteriumScore {
  @Prop()
  criterium_id: string;

  @Prop()
  positive: number;

  @Prop()
  negative: number;

  @Prop()
  notDecided: number;

  @Prop()
  agreementScore?: number;
}

export const CriteriumScoreSchema =
  SchemaFactory.createForClass(CriteriumScore);
