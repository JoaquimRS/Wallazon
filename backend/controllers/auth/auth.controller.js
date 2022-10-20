const { User } = require("../../models/index")

exports.findAll = async () => {
    try {
        const data = await User.find()
        return data;
    } catch (err) {
        return err;
    }
}

exports.addOne = async (userInfo) => {
    try {
        const data = await User.create(userInfo)
        return data;
    } catch (err) {

        return "Mal";
    }
}