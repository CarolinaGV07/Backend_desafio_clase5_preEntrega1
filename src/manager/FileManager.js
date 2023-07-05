import fs from 'fs'

class FileManager {
    
    constructor (filename = './db.json'){
        this.filename = filename
    }

    getId = async () => {
        const list = await this.get()
        console.log(list)
        const id = (list.length !== 0) ? list[list.length - 1].id +1 :1
        return id 
    }

    get = async () => {
        return fs.promises.readFile (this.filename, 'utf-8')
        .then(r => JSON.parse(r))
        .catch(e => {
            return []
        })
    }

    set = async (data) => {
        data.id = await this.getId()
        return fs.promises.writeFile (this.filename, JSON.stringify(data))
    }

    getById = async (id) => {
        const data = await this.get()
        return data.find(dt => dt.id == id)
    }

    update = async (data) => {
        return fs.promises.writeFile (this.filename, JSON.stringify(data))
    }

    delete = async (Id) => {
        return fs.promises.writeFile(this.filename,JSON.stringify(Id))
    }
}

export default FileManager