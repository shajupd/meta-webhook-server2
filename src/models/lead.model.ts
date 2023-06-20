import mongoose, { Document, Schema } from 'mongoose';

export interface LeadDocument extends Document {
  data: object;
  createdAt: Date;
  updatedAt: Date;
}

const leadSchema = new Schema<LeadDocument>({
  data: { type: Schema.Types.Mixed, required: true },
}, {
  timestamps: true, // Enable timestamps
});

const Lead = mongoose.model<LeadDocument>('Lead', leadSchema);

export default Lead;
