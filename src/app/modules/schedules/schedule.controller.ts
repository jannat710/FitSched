import { Request, Response } from 'express';

import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import { scheduleService } from './schedule.service';
import sendResponse from '../../utils/sendResponse';
import { ISchedule } from './schedule.interface';
import { Schedule } from './schedule.model';

const createSchedule = catchAsync(async (req: Request, res: Response) => {
  const { trainerId, traineesIds = [], ...rest } = req.body;

  const schedulePayload = {
    ...rest,
    trainer: trainerId,
    trainees: traineesIds,
  };

  const result = await scheduleService.createSchedule(schedulePayload);

  sendResponse(res, {
    status: true,
    statusCode: StatusCodes.CREATED,
    message: 'Schedule created successfully',
    data: result,
  });
});

const getAllSchedules = catchAsync(async (req: Request, res: Response) => {
  const result = await scheduleService.getAllSchedules();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Schedules retrieved successfully',
    data: result,
  });
});

const getSingleSchedule = async (
  scheduleId: string,
): Promise<ISchedule | null> => {
  const result = await Schedule.findById(scheduleId)
    .populate('trainer', 'name email role')
    .populate('trainees', 'name email role');
  return result;
};

const deleteSchedule = catchAsync(async (req: Request, res: Response) => {
  const scheduleId = req.params.scheduleId;
  await scheduleService.deleteSchedule(scheduleId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Schedule deleted successfully',
    data: {},
  });
});

export const scheduleController = {
  createSchedule,
  getAllSchedules,
  getSingleSchedule,
  deleteSchedule,
};
