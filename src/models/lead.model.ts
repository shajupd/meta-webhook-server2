import mongoose, { Document, Schema } from 'mongoose';

export interface LeadDocument extends Document {
  data: object;
}

const leadSchema = new Schema<LeadDocument>({
  data: { type: Schema.Types.Mixed, required: true },
});

const Lead = mongoose.model<LeadDocument>('Lead', leadSchema);

export default Lead;
