const axios = require('axios');

const Pip = require('../models/pip.model');
const Pho = require('../models/pho.model');

const generateString = require('../../helper/randomString');

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

class sys {

    static getImageData = async (accessToken) => {
        const response = await axios.get('https://photoslibrary.googleapis.com/v1/mediaItems', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          },
          params: {
            pageSize: 100
          }
        });
      
        let imageData = [];
      
        const extractImageData = async (response) => {
          console.log('total of item page = ' + response?.data?.mediaItems?.length);
      
          if (response?.data?.mediaItems) {
            imageData = imageData.concat(response.data.mediaItems.map((mediaItem) => {
              return {
                id: mediaItem.id,
                baseUrl: mediaItem.baseUrl + '=d',
                mimeType: mediaItem.mimeType,
                filename: mediaItem.filename
              };
            }));
          }
      
          if (response.data.nextPageToken) {
            
            await delay(3000); // Add a delay before making the next API call

            return axios.get('https://photoslibrary.googleapis.com/v1/mediaItems', {
              headers: {
                Authorization: `Bearer ${accessToken}`
              },
              params: {
                pageSize: 100,
                pageToken: response.data.nextPageToken
              }
            }).then(extractImageData);
          } else {
            return imageData;
          }
        };
      
        const allImageData = response?.data?.mediaItems ? await extractImageData(response) : [];
        return allImageData;
    };




    static getRefreshTokens = async () => {

        Pho.getRefreshTokenGGPhoto(async (error_code, result) => {
            if(error_code == 0){
                console.log(result)
            }else{
                for(let i = 0; i < result.length; i++){
                    
                    try {
                        // Set the Google OAuth2 token endpoint
                        const tokenEndpoint = 'https://oauth2.googleapis.com/token';
                    
                        // Set the required parameters for the token endpoint
                        const params = new URLSearchParams();
                        params.append('client_id', result[i].CLIENT_ID);
                        params.append('client_secret', result[i].CLIENT_SECRET);
                        params.append('refresh_token', result[i].RefreshToken);
                        params.append('grant_type', 'refresh_token');
                    
                        // Make a POST request to the token endpoint
                        const response = await axios.post(tokenEndpoint, params);
                    
                        const { access_token, expires_in } = response.data;
                
                        let data = {}
                        data['id'] = result[i].ID;
                        data['access_token'] = access_token;

                        Pho.updateAccessTokenGGPhoto(data, function(error_code, result){
                            if(error_code == 0){
                                console.log(result);
                            }else{
                                console.log('success update 1 access token!')
                            }
                        });

                    } catch (error) {
                        console.error('Error refreshing token:', error);
                    }
                }
            }
        });
    };


    static getRefreshURLPhoto = async () => {

        Pho.getAllAccessTokenGGPhoto(async (error_code, result) => {
            if(error_code == 0){
                console.log(result)
            }else{
                
                for (let i = 0; i < result.length; i++) {
                    const allImageData = await sys.getImageData(result[i].AccessToken);
                    const rowsToInsert = [];
                  
                    for (let j = 0; j < allImageData.length; j++) {
                        if(Number(result[i].type) == 1){
                            rowsToInsert.push([
                                String(generateString(Number(process.env.ID_LENGTH_IMAGE))) + String(j),
                                allImageData[j].id,
                                allImageData[j].baseUrl,
                                result[i].ID,
                                allImageData[j].filename.replace(/\.[^/.]+$/, ""),
                            ]);
                        }else{
                            rowsToInsert.push([
                                String(generateString(Number(process.env.ID_LENGTH_IMAGE))) + String(j),
                                allImageData[j].id,
                                allImageData[j].baseUrl,
                                result[i].ID,
                            ]);
                        }
                    }
                  
                    // console.log(rowsToInsert);
                  
                    try {
                      await new Promise((resolve, reject) => {
                        Pip.reLoadPip(rowsToInsert, Number(result[i].type), (error_code, result) => {
                          if (error_code === 0) {
                            console.log(result);
                            console.log('Cannot update images!');
                            reject(new Error('Cannot update images!'));
                          } else {
                            console.log(result);
                            resolve();
                          }
                        });
                      });
                    } catch (error) {
                      console.error(error);
                      continue; // Continue to the next iteration of the outer loop
                    }
                }
            }
        })
    }


}

module.exports = sys;










                    // // Make a GET request to the Google Photos API
                    // const response = await axios.get('https://photoslibrary.googleapis.com/v1/mediaItems', {
                    //     headers: {
                    //         Authorization: `Bearer ${result[i].AccessToken}`
                    //     },
                    //     params: {
                    //         pageSize: 100
                    //     }
                    // });
                    
                    // let imageData = [];
                    // // Extract the image data from the response
                    // const extractImageData = (response) => {
                    //     console.log('total of item page = ' + response?.data?.mediaItems.length);

                    //     if(response?.data?.mediaItems)
                    //     imageData = imageData.concat(response.data.mediaItems.map((mediaItem) => {
                    //         return {
                    //             id: mediaItem.id,
                    //             baseUrl: mediaItem.baseUrl + '=d',
                    //             mimeType: mediaItem.mimeType,
                    //             filename: mediaItem.filename
                    //         };
                    //     }));
                
                    //     if (response.data.nextPageToken) {
                    //         // Make another request for the next page of results
                    //         return axios.get('https://photoslibrary.googleapis.com/v1/mediaItems', {
                    //             headers: {
                    //                 Authorization: `Bearer ${result[i].AccessToken}`
                    //             },
                    //             params: {
                    //                 pageSize: 100,
                    //                 pageToken: response.data.nextPageToken
                    //             }
                    //         }).then(extractImageData);
                    //     } else {
                    //         return imageData;
                    //     }
                    // };
                    
                    // // Start extracting image data
                    // const allImageData = response?.data?.mediaItems ? await extractImageData(response) : [];







    // static getRefreshURLPhoto = async () => {

    //     const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    //     Pho.getAllAccessTokenGGPhoto(async (error_code, result) => {
    //         if(error_code == 0){
    //             console.log(result)
    //         }else{

    //             for(let i = 0; i < result.length; i++){

    //                 const allImageData = await sys.getImageData(result[i].AccessToken);

    //                 const intervalTime = 100; // Interval time in milliseconds
    //                 let currentIndex = 0;
    //                 const processImage = (imageData) => {
    //                     if(imageData){
    //                         const { id, baseUrl, mimeType, filename } = imageData;
    //                         // Implement your function here to process the image data
    //                         console.log(`Processing image: ID-${id}, Filename-${filename}`);
    //                         if(Number(result[i].type) == 1){
    //                             Pip.updateMangaURLL(baseUrl,id, function(error_code, result){
    //                                 if(error_code == 0){
    //                                     console.log(result)
    //                                 }else{
    //                                     console.log('success update 1 url photo!')
    //                                 }
    //                             });
    //                         }else{
    //                             Pip.updatePhoURLL(baseUrl,id, function(error_code, result){
    //                                 if(error_code == 0){
    //                                     console.log(result)
    //                                 }else{
    //                                     console.log('success update 1 url photo!')
    //                                 }
    //                             });
    //                         }
                            
    //                         // Do something with the image data
    //                         if (++currentIndex >= allImageData.length) {
    //                             clearInterval(imageInterval);
    //                             console.log('All images processed.');
    //                         }
    //                     }
    //                 };
    //                 const imageInterval = setInterval(() => processImage(allImageData[currentIndex]), intervalTime);

    //                 await delay(100000);
    //                 // await delay(1000);
    //             }
    //         }
    //     })
    // }

