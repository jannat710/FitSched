import { Schedule } from './schedule.model';
import { ISchedule } from './schedule.interface';

const createSchedule = async (payload: ISchedule): Promise<ISchedule> => {
  const { date, trainees = [] } = payload;

  //Check if schedules for the date < 5
  const countSchedules = await Schedule.countDocuments({ date });
  if (countSchedules >= 5) {
    throw new Error(
      'Schedule limit exceeded for this date. Maximum 5 schedules allowed per day.',
    );
  }

  // Check trainees count <= 10
  if (trainees.length > 10) {
    throw new Error('Maximum 10 trainees allowed per schedule.');
  }

  const result = await Schedule.create(payload);
  return result;
};

const getAllSchedules = async (): Promise<ISchedule[]> => {
  const result = await Schedule.find()
    .populate('trainer', 'name email role')
    .populate('trainees', 'name email role');
  return result;
};

const deleteSchedule = async (scheduleId: string): Promise<void> => {
  await Schedule.findByIdAndDelete(scheduleId);
};

export const scheduleService = {
  createSchedule,
  getAllSchedules,
  deleteSchedule,
};
