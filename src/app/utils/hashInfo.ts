import bcrypt from 'bcrypt';
export const hashInfo = (info: string) => {
  const hashedInfo = bcrypt.hashSync(info, 10);
  return hashedInfo;
};
