import mongoose, { Schema, model, Types } from 'mongoose';

const scheduleSchema = new Schema({
  date: {
    type: String,
    required: true,
    match: /^\d{4}-\d{2}-\d{2}$/,
  },
  timeSlot: {
    type: String,
    required: true,
  },
  trainer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  trainees: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

export const Schedule = model('Schedule', scheduleSchema);
