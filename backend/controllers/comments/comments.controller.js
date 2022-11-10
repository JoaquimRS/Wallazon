const { Comment, User, Product } = require("../../models/index");

  exports.findAll = async () => {
    try {
      const data = await Comment.find()
      return data;
    } catch (err) {
      return err;
    }
  };

  exports.findOneProduct = async (idProduct) => {
    try {
      const data = await Comment.find({slug_product:idProduct}).populate("user").populate("product")
      return data;
    } catch (err) {
      return err;
    }
  }

  exports.findOneUser = async (auth) => {
    try {
      const data = await Comment.find({uuid_user:auth.id}).populate("user").populate("product")
      return data;
    } catch (err) {
      return err;
    }
  }
  
  exports.addOne = async (commentInfo,auth) => {
    try {
      const user = await User.findOne({uuid:auth.id})
      const product = await Product.findOne({slug:commentInfo.slug_product})
      commentInfo.user = user._id
      commentInfo.uuid_user = user.uuid
      commentInfo.product = product._id

      const data = await Comment.create(commentInfo)
      return commentInfo;
    } catch (err) {
      return err;
    }
  }

  exports.deleteOne = async (idProduct) => {
    try {
      console.log(idProduct);
      const data = await Comment.findOneAndRemove({_id:idProduct})
      return data;
    } catch (err) {
      return err;
    }
  }