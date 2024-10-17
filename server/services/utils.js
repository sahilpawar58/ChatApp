import bcrypt from 'bcrypt'

async function hashPassword(password) {
    const saltRounds = 10;  // The number of salt rounds; higher is more secure but slower.
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}


export {
    hashPassword
}