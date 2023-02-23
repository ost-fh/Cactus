import AggregatedScore, {
  AggregatedScoreSchema,
} from './aggregated-score.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import TestResult, { TestResultSchema } from './test-result.schema';
import CriteriumScore, { CriteriumScoreSchema } from './criterium-score.schema';

@Schema({
  timestamps: true,
})
export default class TestMode {
  @Prop({ required: true })
  name: string;

  @Prop({ type: [TestResultSchema], required: true, default: [] })
  tests: TestResult[] = [];

  @Prop({ type: AggregatedScoreSchema })
  testScores?: AggregatedScore;

  @Prop({ type: [CriteriumScoreSchema], default: [] })
  scoresPerCriterium?: CriteriumScore[] = [];

  @Prop()
  accessibilityScore?: number;

  @Prop()
  agreementScore?: number;
}

export const TestModeSchema = SchemaFactory.createForClass(TestMode);
