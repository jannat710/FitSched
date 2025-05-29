import { Router } from 'express';
import { scheduleController } from './schedule.controller';
import validateRequest from '../../../middlewares/validateRequest';
import auth from '../../../middlewares/auth';
import { USER_ROLE } from '../user/user.constants';
import { createScheduleZodSchema } from './scheduleValidation';

const scheduleRouter = Router();

// Create a schedule
scheduleRouter.post(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.trainer),
  validateRequest(createScheduleZodSchema),
  scheduleController.createSchedule,
);

// Get all schedules
scheduleRouter.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.trainer, USER_ROLE.trainee),
  scheduleController.getAllSchedules,
);

// Delete a schedule
scheduleRouter.delete(
  '/:id',
  auth(USER_ROLE.admin),
  scheduleController.deleteSchedule,
);

export default scheduleRouter;
