import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import SessionsController from '@modules/users/controllers/SessionsController';

const sessionsRouter = Router();
const sessionsController = new SessionsController();

sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().min(8).max(16).required(),
    },
  }),
  sessionsController.create,
);

export default sessionsRouter;