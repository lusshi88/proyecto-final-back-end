const bcrypt = require ("bcrypt");

const createHashValue = async (val) => {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hashSync(val,salt)
};

const isValidPasswd = async (psw,encrytedPsw) => {
    const validValue = await bcrypt.compareSync ( psw,encrytedPsw);
    return validValue
};

module.exports= {
    createHashValue,
    isValidPasswd
};