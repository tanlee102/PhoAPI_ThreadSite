const axios = require('axios');

const Pip = require('../models/pip.model');
const Pho = require('../models/pho.model');

const generateString = require('../../helper/randomString');

const sys = require('../controllers/sys.controller')

class load {

    static reLoadPip = async (req, res) => {

        var pip_id = req.query.pip_id;
        Pho.getAccessTokenGGPhoto(req.query.pip_id, async (error_code, result) => {
            if(error_code == 0){
                console.log(result)
                res.status(400).send('Status: Bad Request');
            }else{
                const allImageData = await sys.getImageData(result[0].AccessToken);
                const rowsToInsert = [];

                for(let i = 0; i < allImageData.length; i++){
                    rowsToInsert.push([
                        String(generateString(Number(process.env.ID_LENGTH_IMAGE))) + String(i),
                        allImageData[i].id,
                        allImageData[i].baseUrl,
                        pip_id,
                        allImageData[i].filename.replace(/\.[^/.]+$/, ""),
                    ])
                }

                console.log(rowsToInsert)

                Pip.reLoadPip(rowsToInsert, async (error_code, result) => {
                    if(error_code == 0){
                        console.log(result)
                        res.status(400).send('Status: Bad Request');
                    }else{
                        res.status(200).send(result);
                    }
                });

    
            }
        })

    }

    static updateChapPip = async (req, res) => {
        const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

        Pip.getChapters(req.query.pip_id, req.query.manga_code, async (error_code, result) => {
            if(error_code == 0){
                console.log(result)
                res.status(400).send('Status: Bad Request');
            }else{
       
                
                let preChap = -1;
                var preList = [];
                for(let i = 0; i < result.length; i++){
                    let current = result[i].name.split("_");
                    let chap = Number(current[1].replace('^','.'));
                    let page = Number(current[2]);

                    if((chap !== preChap && preChap != -1) || (result.length-1) == i){

                        if((result.length - 1) == i) preList.push({page: page, url: process.env.HOST_URL_IMAGE + '/img/v1/' + result[i].useID +'.nat'})

                        if(preChap <= Number(req.query.end) && preChap >= Number(req.query.start)){

                            preList = preList.sort((a, b) => a.page - b.page);

                            let finalList = []
                            preList.forEach(element => {
                                finalList.push(element.url)
                            });
    

                            const headers = {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bor ' + req.query.token,
                              };
                              
                            const url = process.env.HOST_URL_API + '/chapter/update';
                            const payload = {
                                title: '...',
                                number_chap: preChap,
                                content: finalList,
                                manga_id: req.query.manga_id,
                            };
                            
                            axios.post(url, payload, { headers })
                            .then(response => {
                                console.log('Response:', response.data);
                            })
                            .catch(error => {
                                console.error('Request error:', error);
                            });


                            await delay(1000);
    
                        }
                                    
                        preList = [];
                    }
                    preChap = chap;

                    preList.push({page: page, url: process.env.HOST_URL_IMAGE + '/img/v1/' + result[i].useID +'.nat'})


                }
                res.status(200).send(result);
            }
        });

    }


    static deleteChapPip = async (req, res) => {
        Pip.deleteChapter(req.query.pip_id, String(req.query.manga_code + req.query.start), async (error_code, result) => {
            if(error_code == 0){
                console.log(result)
                res.status(400).send('Status: Bad Request');
            }else{
                console.log('DELETE' + result)
                res.status(200).send(result);
            }
        });
    }

}

module.exports = load;

