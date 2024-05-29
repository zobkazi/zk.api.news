import { body, validationResult } from 'express-validator';

export const validateNews = [
  body('title')
    .isString()
    .isLength({ min: 3, max: 100 })
    .withMessage('Title must be between 3 and 100 characters long'),
  body('newsBody')
    .isString()
    .isLength({ min: 10, max: 5000 })
    .withMessage('News body must be between 10 and 5000 characters long'),
  body('author')
    .isString()
    .withMessage('Author is required'),
  body('images')
    .isArray()
    .withMessage('Images must be an array')
    .custom(images => images.every(image => image.url && typeof image.url === 'string')),
  body('categories')
    .isArray({ min: 1 })
    .withMessage('At least one category is required'),
  body('tags')
    .isArray({ max: 10 })
    .withMessage('You can provide up to 10 tags only'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
