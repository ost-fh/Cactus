import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import AggregatedScore, {
  AggregatedScoreSchema,
} from './aggregated-score.schema';
import CriteriumScore, { CriteriumScoreSchema } from './criterium-score.schema';
import Criterium from './criterium.schema';
import mongoose from 'mongoose';
import TestMode from './test-mode.schema';

export type TestResultDocument = HydratedDocument<TestResult>;

@Schema({
  timestamps: true,
})
export default class TestResult {
  @Prop({ required: true })
  testedBy: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TestMode',
    required: true,
  })
  testMode: TestMode;

  @Prop()
  userOs: string;

  @Prop()
  userScreenreader: string;

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
