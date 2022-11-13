const { Category, User } = require("../../models/index")

exports.findAll = async () => {
    try {
      const data = await Category.find();
      return data.map((category) => category.toJSONFor());
    } catch (err) {
      return err;
    }
  };

  exports.findOne = async (idCategory,auth) => {
    try {
      const data = await Category.findOne({slug:idCategory}).populate("products") 
      if (auth) {
        const user = await User.findOne({uuid:auth.id},{likes:1,_id:0}).populate("likes")  
        data.products.map(product => user.likes.map(likeProduct => product.slug == likeProduct.slug ? product.userLike = true : null))
      }
      console.log(data);
      return data;
    } catch (err) {
      return err;
    }
  };

  exports.addOne = async (categoryInfo) => {
    try {
      const data = await Category.create(categoryInfo);
      return data;
    } catch (err) {
      return err;
    }
  };

  exports.deleteOne = async (idCategory) => {
    try {
      const data = await Category.findOneAndDelete({ slug:idCategory});
      return { msg: "Category removed correctly", data: data};
    } catch (err) {
      return err;
    }
  };

  exports.updateOne = async (idCategory,categoryInfo) => {
    try {
      const data = await Category.updateOne({slug:idCategory},categoryInfo)
      return { msg: "Category updated correctly", data: data};
    } catch (err) {
        return err;
    }
  }

