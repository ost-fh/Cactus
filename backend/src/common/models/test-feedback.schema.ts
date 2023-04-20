import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TestFeedbackDocument = HydratedDocument<TestFeedback>;

@Schema({
  timestamps: true,
})
export default class TestFeedback {
  @Prop({ required: true })
  testedBy: string;

  @Prop()
  component: string;

  @Prop()
  testMode: string;

  @Prop()
  userOs: string;

  @Prop()
  userBrowser: string;

  @Prop()
  feedback: string;
}

export const TestFeedbackSchema = SchemaFactory.createForClass(TestFeedback);
