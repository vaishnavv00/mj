import bcrypt from'bcryptjs';

// bcrypt.hash("kar123", 10).then((hash) => {
//     console.log("Hashed Password:", hash);
//   });
const password = "123";  
const hashedPassword = await bcrypt.hash(password, 10);

console.log("Hashed Password:", hashedPassword);
