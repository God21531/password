const crypto = require("crypto");
//const CRYPTO_SECRET_KEY = crypto.createHash("sha256");
const CRYPTO_SECRET_KEY = "d8d8a6d2e9e1fb99302b479a8fe540d4";
console.log(CRYPTO_SECRET_KEY);

const encrypt = (userPass) => {
  // DECLARING AND IV (basically an identifier for decryption)
  const iv = new Buffer.from(crypto.randomBytes(16));
  var ivstring = iv.toString("hex").slice(0, 16);

  // CREATING A CIPHER (actual encryption)
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(CRYPTO_SECRET_KEY),
    ivstring
  );

  cipher.update(userPass, "utf8", "base64");
  const bufferEncryptedPassword = cipher.final("base64");

  return {
    iv: ivstring,
    encryptedPassword: bufferEncryptedPassword,
  };
};

const decrypt = (encrypted, ivstring) => {
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(CRYPTO_SECRET_KEY),
    ivstring
  );

  decipher.update(encrypted, "base64", "utf8");
  const decryptedPassword = decipher.final("utf8");

  return decryptedPassword;
};

module.exports = { encrypt, decrypt };
