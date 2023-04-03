import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailServices';
import { Request, Response } from 'express';

export default class ForgotPasswordController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    const sendForgotPasswordEmail = new SendForgotPasswordEmailService();

    await sendForgotPasswordEmail.execute({
      email,
    });

    return res.status(204).json();
  }
}
