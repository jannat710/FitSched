import { Schema, model } from 'mongoose';
import { IBooking } from './booking.interface';

const bookingSchema = new Schema<IBooking>(
  {
    schedule: { type: Schema.Types.ObjectId, ref: 'Schedule', required: true },
    trainee: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['booked', 'cancelled'], default: 'booked' },
  },
  { timestamps: true },
);

export const Booking = model<IBooking>('Booking', bookingSchema);
