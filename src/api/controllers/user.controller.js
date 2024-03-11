const { google } = require('googleapis');
const jwtDecode = require('jwt-decode');

const User = require('../models/user.model');

const SCOPES = ['https://www.googleapis.com/auth/photoslibrary', 'https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/photoslibrary.readonly.appcreateddata'];
const CLIENT_SECRETS = {
    client_id: process.env.CLIENT_ID,
    project_id: process.env.PROJECT_ID,
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_secret: process.env.CLIENT_SECRET,
    redirect_uris: [process.env.HOST_URL_THIS+'/api/callback'],
};

// const oAuth2Client = new google.auth.OAuth2(
//     CLIENT_SECRETS.client_id,
//     CLIENT_SECRETS.client_secret,
//     CLIENT_SECRETS.redirect_uris[0]
// );

var MainoAuth2Client = null;
var client_id = null;
var client_secret = null;

class user {

    static callBackPhoAcc = async (req, res, next) => {
        const code = req.query.code;
        try {
          const { tokens } = await MainoAuth2Client.getToken(code);
      
          const decodedToken = jwtDecode(tokens.id_token);
          const email = decodedToken.email;
      
          req['data'] = {}
          req['data']['user_id'] = '1';
          req['data']['refresh_token'] = tokens.refresh_token;
          req['data']['access_token'] = tokens.access_token;
          req['data']['email'] = email;
          req['data']['client_id'] = client_id;
          req['data']['client_secret'] = client_secret;
      
          return next();
    
        } catch (error) {
          console.error('Error retrieving access token:', error);
          res.status(500).send('Error retrieving access token');
        }
    }

    static insertPhoAcc(req, res){
        User.insertPhoAcc(req.data, function(error_code, result){
            if(error_code == 0){
                console.log(result)
                res.status(400).send('Status: Bad Request');
            }else{
                res.status(201).send('Status: Created');
            }
        });
    }

    static getUrlLoadPip(req, res){

        client_id = req.body.client_id;
        client_secret = req.body.client_secret;

        console.log('PIP LINK: ' ,client_id, client_secret)

        MainoAuth2Client = new google.auth.OAuth2(
            client_id,
            client_secret,
            CLIENT_SECRETS.redirect_uris[0]
        );
        const authUrl = MainoAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: SCOPES,
        });
        res.status(200).send(authUrl);
    }


    // static getAuthUrl = () => {
    //     const authUrl = oAuth2Client.generateAuthUrl({
    //       access_type: 'offline',
    //       scope: SCOPES,
    //     });
    //     return authUrl;
    // }



    // static getAllPics = async (req, res) => {
    //     User.getAllPics(req.query.current_id, async (error_code, result) => {
    //         if(error_code == 0){
    //             console.log(result)
    //             res.status(400).send('Status: Bad Request');
    //         }else{
    //             res.status(200).send(result);
    //         }
    //     })
    // }

    // static getOnePics = async (req, res) => {
    //     User.getOnePics(req.query.current_id, async (error_code, result) => {
    //         if(error_code == 0){
    //             console.log(result)
    //             res.status(400).send('Status: Bad Request');
    //         }else{
    //             res.status(200).send(result);
    //         }
    //     })
    // }

    // static deleteOnePics = async (req, res) => {
    //     res.status(200).send("Succeed!");
    // }

}

module.exports = user;