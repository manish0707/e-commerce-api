const Product = require("../models/product")
const formidable = require('formidable')
const _ = require('lodash')
const fs = require('fs')

exports.getProductById = (req, res, next, id) => {
  Product.findById(id, (err, product) => {
    if(err) {
      return res.status(400).json({
        error : "Product not found!"
      })
    }

    req.product = product;
    next();
  })
}

exports.createProduct = (req, res) => {
  const form = formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if(err) {
      return res.status(400).json({
        error : "problem with image"
      })
    }

    const { name, price, description, category, stock } = fields;

    if(
      !name ||
      !price ||
      !description ||
      !category ||
      !stock
    ) {
      return res.status(400).json({
        error : "Please include all fields"
      })
    }
    
    const product = new Product(fields);

    // Hanldle file here
    if(file.photo) {
      if(file.photo.size > 3000000) {
        return res.status(400).json({
          error : "File size too big!"
        })
      }

      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    // save to the  DB
    product.save((err, product) => {
      if(err) {
        return res.state(400).json({
          error : "Saving field"
        })
      }
      return res.json(product);
    })

  })
}

exports.getProduct = (req, res) => {
  return res.json(req.product)
}