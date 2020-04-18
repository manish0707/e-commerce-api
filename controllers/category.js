const Category = require("../models/category")

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id, (err, category) => {
    if(err || !category) {
      return res.status(400).json({
        error: "Category Not Found!"
      })
    }
    req.category = category;
    next();
  })
}

exports.createCategory = (req, res) => {
  const category = new Category(req.body);
  category.save((err, category) => {
    if(err) {
      return res.status(400).json({
        error : "Not able to save to category!"
      })
    }
    res.status(200).json({category})
  })
}

exports.getCategory = (req, res) => {
  return res.json(req.category);
}

exports.getAllCategories = (req, res) => {
  Category.find((err, items) => {
    if(err) {
      return res.status(400).json({
        error : "No categoies found!"
      })
    }
    res.json(items);
  })
}

exports.updateCategory = (req, res) => {
  const category = req.category;
  category.name = req.body.name;
  category.save((err, updatedCategory) => {
    if(err) {
      return res.status(400).json({
        error: "Failed to update category!"
      })
    }
    res.json(updatedCategory)
  })
}

exports.removeCategory = (req, res) => {
  const category = req.category;

  category.remove((err, category) => {
    if(err) {
      return res.status(400).json({
        error: "Failed to delte this category!"
      })
    }
    res.json({
      message : `Category ${category.name} was deleted!`
    })
  })
}