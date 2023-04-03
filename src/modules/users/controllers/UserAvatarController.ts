import { Request, Response } from 'express';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import { instanceToPlain } from 'class-transformer';

export default class UserAvantarController {
  public async update(req: Request, res: Response): Promise<Response> {
    const updateAvatar = new UpdateUserAvatarService();

    const AVATAR = req.file?.filename;

    if (!AVATAR) {
      return res.json('something went wrong');
    }

    // console.log('id: ', req.user.id, 'avatar:', AVATAR);
    const user = await updateAvatar.execute({
      user_id: req.user.id,
      avatarFilename: AVATAR,
    });

    return res.json(instanceToPlain(user));
  }
}
