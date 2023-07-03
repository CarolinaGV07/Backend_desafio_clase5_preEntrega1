import fs from 'fs'

class FileManager {
    
    constructor (filename = './db.json'){
        this.filename = filename
    }

    getId = (list) => {
        const count = list.length
        const id = (count > 0) ? products[count - 1].id +1 :1
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
        const list = await this.get()
        const index = list.findIndex(p => p.id == data.id)
        list (index) = data
        return fs.promises.writeFile (this.filename, JSON.stringify(list))
    }

    delete = async (Id) => {
        return fs.promises.writeFile(this.filename,JSON.stringify(Id))
    }
}

export default FileManager