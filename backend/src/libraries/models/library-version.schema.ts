import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import LibraryComponent, {
  LibraryComponentSchema,
} from './library-component.schema';

@Schema({
  timestamps: true,
})
export default class LibraryVersion {
  @Prop({ required: true })
  version: string;

  @Prop({ type: [LibraryComponentSchema], required: true, default: [] })
  components: LibraryComponent[];

  @Prop()
  accessibilityScore?: number;

  @Prop()
  agreementScore?: number;

  @Prop()
  amountOfComponentsTested?: number;
}

export const LibraryVersionSchema =
  SchemaFactory.createForClass(LibraryVersion);
