const MysqlQuery = require("../query/mysql.query")

const generateString = require('../../helper/randomString');


class User{
    constructor() {}

    static insertPhoAcc(data, next){
        let State = `
            INSERT INTO PhoAcc (User_ID, RefreshToken, AccessToken, email, CLIENT_ID, CLIENT_SECRET)
            VALUES (?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
                User_ID = VALUES(User_ID),
                RefreshToken = VALUES(RefreshToken),
                AccessToken = VALUES(AccessToken),
                CLIENT_ID = VALUES(CLIENT_ID),
                CLIENT_SECRET = VALUES(CLIENT_SECRET)
            `;

            MysqlQuery.select_(State, [data.user_id, data.refresh_token, data.access_token, data.email, data.client_id, data.client_secret], next);
    }

    // static getAllPics(id, next){
    //     let State = `SELECT * 
    //                  FROM PhoUrl 
    //                  WHERE ID < ? 
    //                  ORDER BY ID DESC 
    //                  LIMIT 10; `;  
    //     MysqlQuery.select_(State, [id], next);
    // }


    // static getOnePics(id, next){
    //     let State = `SELECT * 
    //                  FROM PhoUrl 
    //                  WHERE useID = ? ; `;  
    //     MysqlQuery.select_(State, [id], next);
    // }


    // static getAllListURLGGPhoto(next){
    //     let State = `SELECT PhoUrl.ID, PhoUrl.ID_Media, PhoAcc.AccessToken
    //                  FROM PhoUrl
    //                  LEFT JOIN PhoAcc ON PhoUrl.IDPhoAcc = PhoAcc.ID; `;  
    //     MysqlQuery.select(State, next);
    // }


    // static getAccessTokenOfURL(id,next){
    //     let State = `SELECT PhoUrl.ID, PhoUrl.ID_Media, PhoAcc.AccessToken
    //                     FROM PhoUrl
    //                     LEFT JOIN PhoAcc ON PhoUrl.IDPhoAcc = PhoAcc.ID WHERE PhoUrl.ID = ? ;`; 
    //     MysqlQuery.select_(State, [id], next);
    // }


    // static deleteOnePics(id, next){
    //     let State = `DELETE FROM PhoUrl WHERE ID = ? ; `;  
    //     MysqlQuery.select_(State, [id], next);
    // }

}
        // let State = `INSERT INTO PhoAcc (User_ID, RefreshToken, AccessToken, email, CLIENT_ID, CLIENT_SECRET)
        //              VALUES (?, ?, ?, ?, ?, ?); `;  
        // MysqlQuery.select_(State, [data.user_id, data.refresh_token, data.access_token, data.email, data.client_id, data.client_secret], next);
    
module.exports = User;