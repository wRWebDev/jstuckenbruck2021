import { update, erase } from '../../../../lib/Db/document'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Popup from '../../Popup'

const SaveBar = ({ getData, docId, collection, defaultText = 'Save', afterSaveRoute = null, afterDeleteRoute = null, showDelete = true }) => {
    
    const [ saving, setSavingTo ] = useState( false )
    const [ deleting, setDeletingTo ] = useState( false )
    const [ confirmInput, setConfirmInputTo ] = useState( '' )
    
    const router = useRouter()
    
    const save = async () => {
        setSavingTo( true )
        let data = await getData()
        await update( collection, docId, data )
        if( afterSaveRoute ) router.push( afterSaveRoute )
    }
    
    const deleteRecord = async ( confirmInput ) => {
        if( confirmInput !== 'DELETE' ) {
            return null
        }
        document.getElementById( 'checkDeleteIntent' ).classList.add( 'hidden' )
        setDeletingTo( true )
        await erase( collection, docId )
        if( afterDeleteRoute ) router.push( afterDeleteRoute )
    }

    const styles = {
        wrapper: {
            display: 'flex',
            justifyContent: 'stretch',
            padding: 0
        },
        deleteButton: {
            width: '100%',
            background: deleting ? 'rgb(146, 27, 27)' : 'rgba(146, 27, 27, 0.8)',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            color: '#fff',
            padding: '5pt'
        },
        saveButton: {
            width: '100%',
            background: saving ? 'rgb(30, 110, 113)' : 'rgba(30, 110, 113, 0.8)',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            color: '#fff',
            padding: '5pt'
        }
    }

    return (
        <>
            <div 
                id="actionBar" 
                style={styles.wrapper}
            >
                {
                    !showDelete 
                        ?   ''
                        :   <div 
                                onClick={() => {document.getElementById( 'checkDeleteIntent' ).classList.remove( 'hidden' )} }
                                style={styles.deleteButton}
                            >
                                {
                                    !deleting 
                                        ? 'Delete'
                                        : 'Deleting...'
                                }
                            </div>
                }
                <div 
                    onClick={() => save()}
                    style={styles.saveButton}
                >
                    {
                        !saving 
                            ? defaultText
                            : 'Saving...'
                    }
                </div>
            </div>
            <Popup  
                id="checkDeleteIntent" 
                title="Confirm"
            >
                <form style={{minHeight:'100%'}} onSubmit={e=>e.preventDefault()}>
                    <p>Please type &apos;DELETE&apos; below to confirm your intention to delete this record.</p>
                    <input 
                        type="text"
                        value={confirmInput}
                        onChange={e => setConfirmInputTo(e.target.value)}
                        placeholder="DELETE"
                        onKeyDown={({key}) => { if(key === 'Enter') deleteRecord( confirmInput ) }}
                    />
                </form>
            </Popup>
        </>
    )
}

export default SaveBar