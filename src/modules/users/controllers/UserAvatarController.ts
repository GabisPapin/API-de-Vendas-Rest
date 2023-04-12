import { Request, Response } from 'express';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

export default class UserAvantarController {
  public async update(req: Request, res: Response): Promise<Response> {
    const updateAvatar = new UpdateUserAvatarService();

    const AVATAR = req.file?.filename;

    if (!AVATAR) {
      return res.json('something went wrong');
    }

    // console.log('id: ', req.user.id, 'avatar:', AVATAR);
    await updateAvatar.execute({
      user_id: req.user.id,
      avatarFilename: AVATAR,
    });

    return res.json('Avatar updated successfuly');
  }
}
