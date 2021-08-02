import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('address.db')

export const init = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx)=> {
            tx.executeSql('CREATE TABLE IF NOT EXISTS adress(id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, image TEXT NOT NULL, adress TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL)',
            [],
            () => { resolve() },
            (_, err) => { reject(err) })
        })
    })
    
    return promise
}

export const insertAdress =(
    title,
    image,
    address,
    lat,
    lng
) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx)=> {
            tx.executeSql('INSERT INTO adress(title, image, adress, lat, lng) values (?, ?, ?, ?, ?);',
            [title, image, address, lat, lng],
            (_, result) => resolve(result),
            (_, err) => reject(err) )
        })
    })
    
    return promise
}