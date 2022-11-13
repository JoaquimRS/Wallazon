const { User } = require("../../models/index")


exports.register = async (userInfo) => {
    try {
        const data = await User.create(userInfo)
        return data.toAuthJSON();
    } catch (err) {
        return err;
    }
}

exports.login = async (userInfo) => {
    try {
        const data = await User.findOne({"username":userInfo.username})        
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