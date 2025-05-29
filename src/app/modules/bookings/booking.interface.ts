import { Types } from 'mongoose';

export interface IBooking {
  _id?: Types.ObjectId;
  schedule: Types.ObjectId;
  trainee: Types.ObjectId;
  status?: 'booked' | 'cancelled';
}
