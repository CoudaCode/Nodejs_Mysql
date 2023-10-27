import { compare, hash, genSalt } from "bcrypt";

export const Hash = async (password) => {
  const salt = await genSalt();
  return hash(password, salt);
};

export const compareHash = async (from, to) => {
  try {
    return compare(from, to);
  } catch (e) {
    console.log("erreur lors de la comparaison", e);
    return false;
  }
};
