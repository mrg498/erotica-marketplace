
const express = require('express');

const router = express.Router();

router.get('/', (req,res,next)=>{
    res.send("Hello World from the router");
})

module.exports = router;