const userController = require('../controllers/user.controller');
const uploadController = require('../controllers/upload.photoapi.controller');

const multer = require('multer');
const upload = multer();

const UserMiddleWare = require('../middleware/user.middleware');

const checkPassword = UserMiddleWare.checkPassword;

module.exports = function(routerx){
    
    routerx.get('/api', function (req, res) {
        res.send('PHOTO API!');
    });

    // routerx.get('/api/linktogg', (req, res) => {
    //     const authUrl = userController.getAuthUrl();
    //     res.send(`<a href="${authUrl}">Click here to linking with Google</a>`);
    // });

    routerx.get('/api/callback', userController.callBackPhoAcc, userController.insertPhoAcc);
    
    routerx.post('/api/upload/photo', upload.single('image'), uploadController.upLoad);

}