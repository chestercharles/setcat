import { UserRepo } from '../../infra/user-repo/user-repo';

export const initFindUserByUuid = (userRepo: UserRepo) => {
  return async (uuid: string): Promise<GetUserResDTO> => {
    const [user] = await fetchUser(uuid, userRepo);
    if (!user) {
      throw new Error('user not found');
    }
    return { uuid: user.uuid, email: user.email, username: user.username };
  };
};

const fetchUser = async (uuid: string, userRepo: UserRepo) => {
  return userRepo.find({ uuid });
};
