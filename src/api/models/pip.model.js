const MysqlQuery = require("../query/mysql.query")

class Pip{
    constructor() {}

    static getAllPips(next){
        let State = `SELECT *
                     FROM PhoAcc `;  
        MysqlQuery.select(State, next);
    }

    static getPics(id, pip_id, typeAcc, next){
        let State = "";
        if(typeAcc == 1){
            State = `SELECT * 
            FROM MangaUrl 
            WHERE ID < ? AND IDPhoAcc = ? 
            ORDER BY ID DESC 
            LIMIT 10; `;  
        }else{
            State = `SELECT * 
            FROM PhoUrl 
            WHERE ID < ? AND IDPhoAcc = ? 
            ORDER BY ID DESC 
            LIMIT 10; `;  
        }
        MysqlQuery.select_(State, [id, pip_id], next);
    }

    static getCountPics(pip_id, typeAcc, next){
        let State = "";
        if(typeAcc == 1){
            State = `SELECT COUNT(*) as count  
                     FROM MangaUrl 
                     WHERE IDPhoAcc = ? ; `;  
        }else{
            State = `SELECT COUNT(*) as count  
                     FROM PhoUrl  
                     WHERE IDPhoAcc = ? ; `;  
        }
        MysqlQuery.select_(State, [pip_id], next);
    }

    
    static insertPhoUrl(data, next){
        let State = `INSERT INTO PhoUrl (useID, ID_Media, URL, IDPhoAcc)
                     VALUES (?, ?, ?, ?); `;  
        MysqlQuery.select_(State, [data.id, data.media_id, data.url, data.pho_id], next);
    }
    static insertMangaUrl(data, next){
        let State = `INSERT INTO MangaUrl (useID, ID_Media, URL, IDPhoAcc, name)
                     VALUES (?, ?, ?, ?, ?); `;  
        MysqlQuery.select_(State, [data.id, data.media_id, data.url, data.pho_id, data.name], next);
    }


    static updatePhoURLL(url,id,next){
        let State = `UPDATE PhoUrl
                     SET URL = ? 
                     WHERE ID_Media = ? ; `;
        MysqlQuery.select_(State, [url, id], next);
    }
    static updateMangaURLL(url,id,next){
        let State = `UPDATE MangaUrl
                     SET URL = ? 
                     WHERE ID_Media = ? ; `;  
        MysqlQuery.select_(State, [url, id], next);
    }

    
    static reLoadPip(rowsToInsert, type, next){
        let State = "";
        if(type == 1){
            State = `INSERT INTO MangaUrl (useID, ID_Media, URL, IDPhoAcc, name) VALUES ? ON DUPLICATE KEY UPDATE URL = VALUES(URL), name = VALUES(name), ID_Media = VALUES(ID_Media)`;  
        }else{
            State = `INSERT INTO PhoUrl (useID, ID_Media, URL, IDPhoAcc) VALUES ? ON DUPLICATE KEY UPDATE URL = VALUES(URL)`;  
        }
        MysqlQuery.select_(State, [rowsToInsert], next);
    }


    static getChapters(id, code, next){
        let State = `
                    SELECT * 
                        FROM MangaUrl 
                        WHERE IDPhoAcc = ? AND name LIKE ? ORDER BY name ASC;
                    `;  
        MysqlQuery.select_(State, [id, `%${code}%`], next);
    }

    static deleteChapter(id, code, next){
        let State = ` DELETE FROM MangaUrl WHERE IDPhoAcc = ? AND name LIKE ? ; `;  
        MysqlQuery.select_(State, [id, `%${code}%`], next);
    }

    static searchChapter(code, next){
        let State = `
                    SELECT * 
                        FROM MangaUrl 
                        WHERE name LIKE ? ORDER BY name ASC;
                    `;  
        MysqlQuery.select_(State, [`%${code}%`], next);
    }

}

module.exports = Pip;