import { Types } from 'mongoose';

export interface ISchedule {
  _id?: Types.ObjectId;
  date: string;
  timeSlot: string;
  trainer: Types.ObjectId;
  trainees?: Types.ObjectId[];
}
