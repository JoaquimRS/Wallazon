const { Product, User, Category } = require("../../models/index");

  exports.findAll = async (auth) => {
    try {
      const data = await Product.find().sort([["price", 1]]);
      if (auth) {
        const user = await User.findOne({uuid:auth.id},{likes:1,_id:0}).populate("likes")  
        data.map(product => user.likes.map(likeProduct => product.slug == likeProduct.slug ? product.userLike = true : null))
      }
      return data;
    } catch (err) {
      return err;
    }
  };
  exports.findSkiped = async (skip,auth) => {
    try {
      const data = await Product.find().skip(skip*4).limit(4);
      if (auth) {
        const user = await User.findOne({uuid:auth.id},{likes:1,_id:0}).populate("likes")  
        data.map(product => user.likes.map(likeProduct => product.slug == likeProduct.slug ? product.userLike = true : null))
      }
      return data
    } catch (err) {
      return err;
    }
  };

  exports.findFilteredProducts = async (filters,auth) =>{
    try {
      
      
      let query = {}
      let checkContent = (filter,otherwise) => {
        return filter != "undefined" && filter ? filter : otherwise;
      }
      let order_f
      let limit = checkContent(filters.limit,12)
      let offset = checkContent(filters.offset,0)
      let category = checkContent(filters.category, null)
      let search = checkContent(filters.search, null)
      let condition = checkContent(filters.condition, null)
      let order = checkContent(filters.order, null)

      if (search) {
        query.title = {"$regex":search, "$options":"i"}
      }
      if (condition) {
        query.condition = {$in:filters.condition}
      }
      if (category) {
        query.category = {$in:category}
      }
      if (order) {
        order_f=[[order, -1]]

      } else {
        order_f=[["price", 1]]
      }

      const res = {
        numproducts: await Product.find(query).countDocuments(),
        products : await Product.find(query).sort(order_f).skip(offset*limit).limit(limit)
      }
      if (auth) {
        const user = await User.findOne({uuid:auth.id},{likes:1,_id:0}).populate("likes")  
        res.products.map(product => user.likes.map(likeProduct => product.slug == likeProduct.slug ? product.userLike = true : null))
      }

      return res;
      
        
    } catch (err) {
      return err;
    }
  }

  exports.findSearchProducts = async (query) => {
    try {

      const searchProducts = await Product.find({"title":{"$regex":query, "$options":"i"}})
      return searchProducts.map((product) => product.titleProduct())
    } catch (err) {
      return err
    }
  }

  exports.findOne = async (idProduct,auth) => {
    try {
      const data = await Product.findOne({slug:idProduct}).populate("owner")
      const category = await Category.findOne({slug:data.category},{title:1})
      data.category = category.title
      if (auth) {
        const user = await User.findOne({uuid:auth.id},{likes:1,_id:0}).populate("likes")  
        user.likes.map(product => product.slug == idProduct ? data.userLike=true : null)
        // data.map(product => user.likes.map(likeProduct => product.slug == likeProduct.slug ? product.userLike = true : null))
      }
      return data.toJSON();
    } catch (err) {
      return err;
    }
  };

  exports.addOne = async (productInfo) => {
    try {
      const data = await Product.create(productInfo);
      return data;
    } catch (err) {
      return err;
    }
  };

  exports.deleteOne = async (idProduct) => {
    try {
      const data = await Product.findOneAndDelete({ slug:idProduct});
      return { msg: "Product removed correctly", data: data};
    } catch (err) {
      return err;
    }
  };

  exports.updateOne = async (idProduct,productInfo) => {
    try {
      const data = await Product.updateOne({slug:idProduct},productInfo)
      return { msg: "Product updated correctly", data: data};
    } catch (err) {
        return err;
    }
  }
  exports.modOne = async (productInfo,auth) => {
    try {
      let data
      if (productInfo.owner.username == auth.username) {
        data = await Product.findOneAndUpdate({slug:productInfo.slug},{$set:{price:productInfo.price,condition:productInfo.condition,description:productInfo.description}})
      } else {
        data = "No pudes hacer eso"
      }
      return { msg: "Product updated correctly", data: data};
    } catch (err) {
        return err;
    }
  }
  exports.modLike = async (slug,auth) => {
    try {
      let hasLike = false
      const user = await User.findOne({uuid:auth.id}).populate("likes")
      const product = await Product.findOne({slug:slug})
      
      user.likes.map(like => like.slug == slug ? hasLike = true : null)
      if (hasLike) {
        await User.findOneAndUpdate({uuid:auth.id},{$pull:{"likes":product._id}})
        await Product.findOneAndUpdate({slug:slug},{$inc:{"likes":-1}})
        return "Remove Like"
      } else {
        await User.findOneAndUpdate({uuid:auth.id},{$push:{"likes":product._id}})
        await Product.findOneAndUpdate({slug:slug},{$inc:{"likes":1}})
        return "Add Like"
      }
    } catch (err) {
      return err
    }
  }


