const {check} = require('express-validator');

const userController = require('../controllers/user.controller');
const pipController = require('../controllers/pip.controller');
const sysController = require('../controllers/sys.controller');
const loadController = require('../controllers/load.controller');

const express=require("express");
const router=express.Router();


const UserMiddleWare = require('../middleware/user.middleware');

const checkAuthUserDefault = UserMiddleWare.checkAuthUserDefault;
const checkAuthAdmin = UserMiddleWare.checkAuthAdmin;
const checkAuthUser = UserMiddleWare.checkAuthUser;
const checkParameters = UserMiddleWare.checkParameters;
const checkPassword = UserMiddleWare.checkPassword;


console.log("first-time");

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

module.exports = async function(routerx){

    routerx.use("/api/", router);

    sysController.getRefreshTokens();
    await delay(2000);
    sysController.getRefreshURLPhoto();
    setInterval(async() => {
        sysController.getRefreshTokens();
        sysController.getRefreshURLPhoto();
    }, 23 * 60 * 1000);


    router

    .get('/pips', pipController.getAllPips)

    .get('/pics', pipController.getPics)

    .get('/pics/count', pipController.getCountPics)

    .get('/reloadpip', loadController.reLoadPip)

    .get('/deletechappip', loadController.deleteChapPip)

    .get('/updatechappip', loadController.updateChapPip)

    .get('/urlchap', pipController.getUrlChap)

    .post('/linkurlpip', userController.getUrlLoadPip)

    // .get('/login', checkPassword, (req, res) => {
    //     res.status(201).send('Status: Logged');
    // })

    // .get('/pics/one', checkPassword, userController.getOnePics)

    // .get('/pics/delete/one', checkPassword, userController.deleteOnePics);
}