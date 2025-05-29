import { IBooking } from './booking.interface';
import { Booking } from './booking.model';

type PartialSchedule = {
  date: string;
  timeSlot: string;
};

function isPartialSchedule(schedule: unknown): schedule is PartialSchedule {
  return (
    typeof schedule === 'object' &&
    schedule !== null &&
    'date' in schedule &&
    'timeSlot' in schedule
  );
}

const createBooking = async (payload: IBooking): Promise<IBooking> => {
  const existingBookings = await Booking.find({
    schedule: payload.schedule,
    status: 'booked',
  });

  if (existingBookings.length >= 10) {
    throw new Error('Class schedule is full. Maximum 10 trainees allowed.');
  }

  const conflict = await Booking.findOne({
    trainee: payload.trainee,
    status: 'booked',
  }).populate('schedule', 'date timeSlot');

  if (conflict && isPartialSchedule(conflict.schedule)) {
    const existingSchedule = conflict.schedule;

    const currentScheduleDoc = await Booking.findById(
      payload.schedule,
    ).populate('schedule', 'date timeSlot');

    const currentSchedule = currentScheduleDoc?.schedule;

    if (isPartialSchedule(currentSchedule)) {
      if (
        currentSchedule.date === existingSchedule.date &&
        currentSchedule.timeSlot === existingSchedule.timeSlot
      ) {
        throw new Error('Trainee already has a booking in this time slot.');
      }
    }
  }

  const result = await Booking.create(payload);
  return result;
};

const cancelBooking = async (bookingId: string): Promise<void> => {
  await Booking.findByIdAndUpdate(bookingId, { status: 'cancelled' });
};

export const bookingService = {
  createBooking,
  cancelBooking,
};
