import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import LibraryVersion, { LibraryVersionSchema } from './library-version.schema';

export type LibraryDocument = HydratedDocument<Library>;

@Schema({
  timestamps: true,
})
export default class Library {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  linkHome: string;

  @Prop({ required: true })
  linkDocs: string;

  @Prop({ required: true })
  currentVersion: string;

  @Prop({ type: [LibraryVersionSchema], required: true })
  versions: LibraryVersion[];
}

export const LibrarySchema = SchemaFactory.createForClass(Library);
