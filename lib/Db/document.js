import { db, collection, doc, addDoc, updateDoc, deleteDoc, getDoc } from './'

const add = async ( colName, dataToAdd = {} ) => {
    ref = await addDoc( collection( db, colName ), dataToAdd )
    return ref.id
}

const ref = ( colName, docId ) => {
    return doc( db, colName, docId )
}

const update = async ( colName, docId, dataToAdd ) =>
    await updateDoc( ref( colName, docId ), dataToAdd )

const erase = async ( colName, docId ) =>
    await deleteDoc( ref( colName, docId ) )

export {
    add,
    ref,
    update,
    erase,
    getDoc
}