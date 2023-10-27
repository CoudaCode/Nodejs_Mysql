import jwt from "jsonwebtoken";

export const generateToken = (id) => {
  const secret = process.env.JWTSECRET;
  
  if (!secret) throw new Error("La cle n'existe pas");
  const token = jwt.sign({id}, secret, {
    expiresIn: '20m',
  });
  return token;
};

export const verifyToken = (token) => {
  try {
    const secret = process.env.JWTSECRET;
    if (!secret) throw new Error("La cle n'existe pas");
    return jwt.verify(token, secret);
  } catch (e) {
    console.log("erreur renconter lors de la verification", e.message);
    return false;
  }
};
