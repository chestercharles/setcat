import { generateUuid } from '../../lib/generate-uuid';
import { UserRepo } from '../../infra/user-repo/user-repo';

export const initCreateUser = (userRepo: UserRepo) => {
  return async (params: PostUserReqDTO): Promise<PostUserResDTO> => {
    const emailIsRegistered = await isEmailRegistered(params.email, userRepo);
    if (emailIsRegistered) {
      throw new Error('email is registered');
    }

    const usernameIsTaken = await isUsernameTaken(params.username, userRepo);
    if (usernameIsTaken) {
      throw new Error('username is taken');
    }

    const { uuid, email, username } = await saveUser(params, userRepo);
    return { uuid, email, username };
  };
};

const isUsernameTaken = async (username: string, userRepo: UserRepo) => {
  const users = await userRepo.find({ username });
  return users.length > 0;
};

const isEmailRegistered = async (email: string, userRepo: UserRepo) => {
  const users = await userRepo.find({ email });
  return users.length > 0;
};

const saveUser = async (
  { username, password, email }: PostUserDTO,
  userRepo: UserRepo,
) => {
  const uuid = generateUuid();
  return userRepo.create({ uuid, username, password, email });
};
