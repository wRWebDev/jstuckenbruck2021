import { db, collection, doc, addDoc, updateDoc, deleteDoc, getDoc } from './'

const add = async ( colName, dataToAdd = {} ) => {
    let ref = await addDoc( collection( db, colName ), dataToAdd )
    return ref.id
}

const update = async ( colName, docId, dataToAdd ) =>
    await updateDoc( doc( db, colName, docId ), dataToAdd )

const erase = async ( colName, docId ) =>
    await deleteDoc( doc( db, colName, docId ) )

export {
    db,
    doc,
    add,
    update,
    erase,
    getDoc
}