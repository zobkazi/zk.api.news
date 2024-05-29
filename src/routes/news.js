const router = require("express").Router();
const {createNews} = require('../controllers/news/create')
const {validateNews} = require('../validators/newsValidator')

router.post('/', validateNews, createNews)



export default router;