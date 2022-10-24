const { User } = require("../../models/index")

exports.findAll = async () => {
    try {
        const data = await User.find()
        return data;
    } catch (err) {
        return err;
    }
}

exports.register = async (userInfo) => {
    try {
        const data = await User.create(userInfo)
        return data;
    } catch (err) {
        return err;
    }
}

exports.login = async (userInfo) => {
    try {
        const data = await User.findOne({"username":userInfo.user})
        
        if (await data.validatePassword(userInfo.password)) {
            return data.toAuthJSON()
        } else {
            return {msg: "User or password are incorrects"}
        }
    } catch (err) {
        return err;
    }
}

exports.deleteOne = async (uuid) => {
    try {
        const data = await User.findOneAndDelete({"uuid":uuid})
        return { msg: "User removed correctly", data: data};
    } catch (err) {
        return err;
    }
}