var express = require('express');
var router = express.Router();


var Compile_Controller = require('../controllers/CompileController');


router.get('/',Compile_Controller.index);

router.post('/code', Compile_Controller.compile_from_form);


module.exports = router;
