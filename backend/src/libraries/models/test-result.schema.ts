import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import AggregatedScore, {
  AggregatedScoreSchema,
} from './aggregated-score.schema';
import CriteriumScore, { CriteriumScoreSchema } from './criterium-score.schema';
import Criterium from './criterium.schema';

@Schema({
  timestamps: true,
})
export default class TestResult {
  @Prop({ required: true })
  testedBy: string;

  @Prop()
  userOs: string;

  @Prop()
  userBrowser: string;

  @Prop()
  criteria: Criterium[] = [];

  @Prop({ type: AggregatedScoreSchema })
  testScore?: AggregatedScore;

  @Prop({ type: [CriteriumScoreSchema], default: [] })
  scorePerCriterium?: CriteriumScore[] = [];
}

export const TestResultSchema = SchemaFactory.createForClass(TestResult);
