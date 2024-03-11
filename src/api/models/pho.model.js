const MysqlQuery = require("../query/mysql.query")

class Pho{
    constructor() {}

    static getRefreshTokenGGPhoto(next){
        let State = `SELECT RefreshToken, ID, CLIENT_ID, CLIENT_SECRET FROM PhoAcc;`;  
        MysqlQuery.select(State, next);
    }
    static getAccessTokenGGPhoto(pho_id,next){
        let State = `SELECT ID, AccessToken, type FROM PhoAcc WHERE ID = ? ; `;  
        MysqlQuery.select_(State, [pho_id], next);
    }

    static updateAccessTokenGGPhoto(data,next){
        let State = `UPDATE PhoAcc
                     SET AccessToken = ? 
                     WHERE ID = ? ; `;  
        MysqlQuery.select_(State, [data.access_token, data.id], next);
    }

    static getAllAccessTokenGGPhoto(next){
        let State = `SELECT ID, AccessToken, type FROM PhoAcc ; `;  
        MysqlQuery.select(State, next);
    }

}

module.exports = Pho;