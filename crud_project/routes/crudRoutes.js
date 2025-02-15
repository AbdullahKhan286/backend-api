const express = require('express');
const router = express.Router();
const crudController = require('../controller/crudController');

router.get('/get-todo', crudController.getTodo);
router.post('/add-todo', crudController.addTodo);


module.exports = router;
