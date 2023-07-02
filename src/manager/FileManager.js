import fs from 'fs'

class FileManager {
    
    constructor (filename = './db.json'){
        this.filename = filename
    }

    get = async () => {
        return fs.promises.readFile (this.filename, 'utf-8')
        .then(r => JSON.parse(r))
        .catch(e => {
            return []
        })
    }

    set = async (data) => {
        return fs.promises.writeFile (this.filename, JSON.stringify(data))
    }
}

export default FileManager