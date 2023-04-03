import CreateSessionsService from '@modules/users/services/CreateSessionsService';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';

export default class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const createSession = new CreateSessionsService();

    const user = await createSession.execute({
      email,
      password,
    });

    return res.json(instanceToPlain(user));
  }
}
