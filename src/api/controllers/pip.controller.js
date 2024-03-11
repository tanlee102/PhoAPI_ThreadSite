const Pip = require('../models/pip.model');
const userController = require('../controllers/user.controller');


class pip {

    static getAllPips(req, res){
        Pip.getAllPips(function(error_code, result){
            if(error_code == 0){
                console.log(result)
                res.status(400).send('Status: Bad Request');
            }else{
                res.status(201).send(result);
            }
        });
    }

    static getPics = async (req, res) => {
        Pip.getPics(req.query.current_id, req.query.pip_id, req.query.type, async (error_code, result) => {
            if(error_code == 0){
                res.status(400).send('Status: Bad Request');
            }else{
                res.status(200).send(result);
            }
        })
    }

    static getCountPics = async (req, res) => {
        Pip.getCountPics(req.query.pip_id, req.query.type, async (error_code, result) => {
            if(error_code == 0){
                res.status(400).send('Status: Bad Request');
            }else{
                res.status(200).send(result);
            }
        })
    }

    static getUrlChap = async (req, res) => {

        Pip.searchChapter(String(req.query.manga_code+"_"+String(req.query.number_chap)+"_"), async (error_code, result) => {
            if(error_code == 0){
                console.log(result)
                res.status(400).send('Status: Bad Request');
            }else{
        
                var preList = [];
                for(let i = 0; i < result.length; i++){

                    let current = result[i].name.split("_");
                    let page = Number(current[2]);

                    preList.push({page: page, url: result[i].URL})
                }

                preList = preList.sort((a, b) => a.page - b.page);

                let finalList = []
                preList.forEach(element => {
                    finalList.push(element.url)
                });

                res.status(200).send(finalList);
            }
        });
    

    }



}

module.exports = pip;