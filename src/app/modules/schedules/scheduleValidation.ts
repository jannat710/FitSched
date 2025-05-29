import { z } from 'zod';

export const createScheduleZodSchema = z.object({
  body: z.object({
    trainerId: z.string({
      required_error: 'Trainer ID is required',
    }),
    date: z.string({
      required_error: 'Date is required',
    }),
    timeSlot: z.string({
      required_error: 'Time slot is required',
    }),
  }),
});
