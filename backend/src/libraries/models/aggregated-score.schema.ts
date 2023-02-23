import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export default class AggregatedScore {
  @Prop()
  positive: number;

  @Prop()
  negative: number;

  @Prop()
  notDecided: number;

  @Prop()
  amountOfTests: number;
}

export const AggregatedScoreSchema =
  SchemaFactory.createForClass(AggregatedScore);
