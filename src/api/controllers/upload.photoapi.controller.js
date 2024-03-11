
const Pho = require('../models/pho.model');
const Pip = require('../models/pip.model');

const axios = require('axios');
const generateString = require('../../helper/randomString');


class upload {

    static upLoad(req, res){
        const imageFile = req.file;
        if(imageFile){

            Pho.getAccessTokenGGPhoto(req.query.pip_id, async (error_code, result) => {
                if(error_code == 0){
                    console.log(result)
                    res.status(400).send('Status: Bad Request');
                }else{
                    
                    var typeAcc = Number(result[0].type);
                    var randomID = String(generateString(Number(process.env.ID_LENGTH_IMAGE)));
             
                        let accessToken = result[0].AccessToken;

                        const uploadUrlResponse = await axios.post('https://photoslibrary.googleapis.com/v1/uploads', imageFile.buffer, {
                            headers: {
                                'Content-Type': 'application/octet-stream',
                                'Authorization': `Bearer ${accessToken}`,
                            },
                        });
                
                        const uploadToken = uploadUrlResponse.data;
                
                        const createMediaItemResponse = await axios.post('https://photoslibrary.googleapis.com/v1/mediaItems:batchCreate', {
                        newMediaItems: [
                            {
                                simpleMediaItem: {
                                    fileName: typeAcc == 1 ? req.query.file_name : randomID,
                                    uploadToken: uploadToken,
                                },
                            },
                        ],
                        }, {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${accessToken}`,
                            },
                        });
                
                        const mediaItemId = createMediaItemResponse.data.newMediaItemResults[0].mediaItem.id;
                        console.log(`Image uploaded successfully! Media Item ID: ${mediaItemId}`);

                        // Retrieve baseUrl for the uploaded image
                        const getMediaItemResponse = await axios.get(
                            `https://photoslibrary.googleapis.com/v1/mediaItems/${mediaItemId}`,
                            {
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${accessToken}`,
                            },
                            }
                        );

                        const baseUrl = getMediaItemResponse.data.baseUrl + '=d';

                        let data = {}
                        data['media_id'] = mediaItemId;
                        data['pho_id'] = result[0].ID;
                        data['url'] = baseUrl;
                        data['id'] = randomID;

                        if(typeAcc == 1){
                            data['name'] = req.query.file_name;
                            Pip.insertMangaUrl(data, function(error_code, result){
                                if(error_code == 0){
                                    console.log(result)
                                    res.status(400).send('Status: Bad Request');
                                }else{
                                    res.status(200).send({
                                        useID: randomID,
                                        URL: process.env.HOST_URL_IMAGE+'/img/v1/'+randomID+'.nat',
                                        mediaItemId: mediaItemId,
                                        baseUrl: baseUrl,
                                    });
                                }
                            });
                        }else{
                            Pip.insertPhoUrl(data, function(error_code, result){
                                if(error_code == 0){
                                    console.log(result)
                                    res.status(400).send('Status: Bad Request');
                                }else{
                                    res.status(200).send({
                                        useID: randomID,
                                        URL: process.env.HOST_URL_IMAGE+'/img/v1/'+randomID,
                                        mediaItemId: mediaItemId,
                                        baseUrl: baseUrl,
                                    });
                                }
                            });
                        }

                }
            });

        }
    }

}

module.exports = upload;