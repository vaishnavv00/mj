import bcrypt from'bcryptjs';

const testPassword = "123";  // Password entered in login
const storedHash = "$2a$10$zqsW6itFtk2Jlyqip0COE.qonXFb5Er6LogiIA39b2BxYSrd/gdS."; // From DB

const a=await bcrypt.compare(testPassword, storedHash);
console.log(a);
