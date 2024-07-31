
const express = require('express');
const router = express.Router();
const {
  getCarousel,
  addCarousel,
  updateCarousel,
  deleteCarousel,
} = require('../controllers/carousel.controller');

module.exports = (upload) => {
  // Getting Carousel Data
  router.get('/', getCarousel);

  // Adding Carousel Data
  router.post('/', upload.single('carousel_img_1'), addCarousel);

  // Updating Carousel Data
  router.put('/:id', upload.single('carousel_img_1'), updateCarousel);

  // Deleting Carousel Data
  router.delete('/:id', deleteCarousel);

  return router;
};
