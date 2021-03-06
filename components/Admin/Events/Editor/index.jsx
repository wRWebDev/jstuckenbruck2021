import Popup from '../../Popup'
import { useState } from 'react'
import styles from './styles.module.scss'
import { LoadingMore } from '../../Layout/Loading'
import Image from 'next/image'

const EventEditor = ({ values, inputHandler, removeHandler, updateHandler, dates }) => {

    const [ newWorkComposer, setNewWorkComposerTo ] = useState( '' )
    const [ newWorkComposition, setNewWorkCompositionTo ] = useState( '' )
    const handleNewWork = ( composer, composition ) => {
        inputHandler( 'work', { composer, composition } )
        setNewWorkComposerTo( '' )
        setNewWorkCompositionTo( '' )
        document.getElementById( 'addWorkPopup' ).classList.add( 'hidden' )
    }

    const [ newPerformerName, setNewPerformerNameTo ] = useState( '' )
    const [ newPerformerInstrument, setNewPerformerInstrumentTo ] = useState( '' )
    const handleNewPerformer = ( name, instrument ) => {
        inputHandler( 'performer', { name, instrument } )
        setNewPerformerNameTo( '' )
        setNewPerformerInstrumentTo( '' )
        document.getElementById( 'addPerformerPopup' ).classList.add( 'hidden' )
    }

    const [ newDateDate, setNewDateDateTo ] = useState( '' )
    const [ newDateVenue, setNewDateVenueTo ] = useState( '' )
    const handleNewDate = ( datetime, venue ) => {
        inputHandler( 'date', { datetime, venue } )
        setNewDateDateTo( '' )
        setNewDateVenueTo( '' )
        document.getElementById( 'addDatePopup' ).classList.add( 'hidden' )
    }

    const [ editIndex, setEditIndexTo ] = useState( null )
    const [ editingDate, setEditingDateTo ] = useState( null )

    const editItem = ( type, data, index ) => {
        switch( type ) {
            case 'work': 
                setEditIndexTo( index )
                setNewWorkComposerTo( data.composer )
                setNewWorkCompositionTo( data.composition )
                document.getElementById( 'editWorkPopup' ).classList.remove( 'hidden' )
                break
            case 'performer':
                setEditIndexTo( index )
                setNewPerformerNameTo( data.name )
                setNewPerformerInstrumentTo( data.instrument )
                document.getElementById( 'editPerformerPopup' ).classList.remove( 'hidden' )
                break
            case 'date': 
                setEditingDateTo( data )
                setNewDateDateTo( data.datetime.toDate().toISOString().split('T')[0] )
                setNewDateVenueTo( data.venue )
                document.getElementById( 'editDatePopup' ).classList.remove( 'hidden' )
            default:
                break;
        }

    }

    const handleUpdateWork = ( index, composer, composition ) => {
        setEditIndexTo( null )
        setNewWorkComposerTo( '' )
        setNewWorkCompositionTo( '' )
        updateHandler( index, 'work', { composer, composition } )
        document.getElementById( 'editWorkPopup' ).classList.add( 'hidden' )
    }

    const handleUpdatePerformer = ( index, name, instrument ) => {
        setEditIndexTo( null )
        setNewPerformerNameTo( '' )
        setNewPerformerInstrumentTo( '' )
        updateHandler( index, 'performer', { name, instrument } )
        document.getElementById( 'editPerformerPopup' ).classList.add( 'hidden' )
    }

    const handleUpdateDate = ( datetime, venue, oldDateObject ) => {
        setEditingDateTo( null )
        setNewDateDateTo( '' )
        setNewDateVenueTo( '' )
        updateHandler( null, 'date', { datetime, venue }, oldDateObject)
        document.getElementById( 'editDatePopup' ).classList.add( 'hidden' )

    }

    return (
        <>
            <form onSubmit={ e => e.preventDefault() }>

                <fieldset>
                    <label>Information</label>
                    <input 
                        placeholder="Name of orchestra/opera company"
                        type="text" 
                        value={ values.institution }
                        onChange={ ({ target }) => inputHandler( 'institution', target.value ) }
                    />
                    <input 
                        placeholder="More info link"
                        type="url" 
                        value={ values.infoLink }
                        onChange={ ({ target }) => inputHandler( 'infoLink', target.value ) }
                    />
                </fieldset>

                <fieldset style={{position:'relative'}}>
                    <label>Programme</label>
                    <ul className={styles.multiList}>
                        {
                            values.works.map( ( w, i ) => (
                                <li key={i}>
                                    <h3>{w.composer}</h3>
                                    <h4>{w.composition}</h4>
                                    <div 
                                        className={styles.updateButton}
                                        onClick={() => editItem( 'work', w, i ) }
                                    />
                                    <div 
                                        className={styles.deleteButton}
                                        onClick={() => removeHandler( 'work', w )}
                                    />
                                </li>
                            ))
                        }
                    </ul>                    
                    <div 
                        className={styles.addButton}
                        onClick={ () => document.getElementById( 'addWorkPopup' ).classList.remove( 'hidden' ) }   
                    >
                        <Image
                            src="/img/add.png"
                            layout="fill"
                            objectFit={'contain'}
                            objectPosition={'center'}
                            placeholder="empty"
                            alt="Add new work"
                        />
                    </div>
                </fieldset>

                <fieldset style={{position:'relative'}}>
                    <label>Performers</label>
                    <ul className={styles.multiList}>
                        {
                            values.performers.map( ( p, i ) => (
                                <li style={{margin:'10pt 0 !important'}} key={i}>
                                    <h3>{p.name}</h3>
                                    <h4>{p.instrument}</h4>
                                    <div 
                                        className={styles.updateButton}
                                        onClick={() => editItem( 'performer', p, i ) }
                                    />
                                    <div 
                                        className={styles.deleteButton}
                                        onClick={() => removeHandler( 'performer', p )}
                                    />
                                </li>
                            ))
                        }
                    </ul>
                    <div 
                        className={styles.addButton}
                        onClick={ () => document.getElementById( 'addPerformerPopup' ).classList.remove( 'hidden' ) }
                    >
                        <Image
                            src="/img/add.png"
                            layout="fill"
                            objectFit={'contain'}
                            objectPosition={'center'}
                            placeholder="empty"
                            alt="Add new performer"
                        />
                    </div>
                </fieldset>

                <fieldset style={{position:'relative'}}>
                    <label>Dates & Venues</label>
                    <ul className={styles.multiList}>
                        { 
                            // sort dates
                            !dates 
                                ? <LoadingMore />
                                : dates
                                    .filter( d => d.status !== 'toDel' )
                                    .sort(( a, b ) => { // asc order
                                        if( a.datetime.seconds < b.datetime.seconds ) return -1
                                        if( a.datetime.seconds > b.datetime.seconds ) return 1
                                        if( a.datetime.seconds == b.datetime.seconds ) return 0
                                    })
                                    .map( ( d, i ) => (
                                        <li style={{margin:'10pt 0 !important'}} key={i}>
                                            <h3>{d.datetime.toDate().toLocaleDateString('en-gb')}</h3>
                                            <h4>{d.venue}</h4>
                                            <div 
                                                className={styles.updateButton}
                                                onClick={() => editItem( 'date', d )}
                                            />
                                            <div 
                                                className={styles.deleteButton}
                                                onClick={() => removeHandler( 'date', d )}
                                            />
                                        </li>
                                    ))
                        }
                    </ul>
                    <div 
                        className={styles.addButton}
                        onClick={ () => document.getElementById( 'addDatePopup' ).classList.remove( 'hidden' ) }
                    >
                        <Image
                            src="/img/add.png"
                            layout="fill"
                            objectFit={'contain'}
                            objectPosition={'center'}
                            placeholder="empty"
                            alt="Add new date"
                        />
                    </div>
                </fieldset>

            </form>

            <Popup
                id="addWorkPopup"
                title="Add a work"
            >
                <form onSubmit={ e => { 
                    e.preventDefault()
                    handleNewWork( newWorkComposer, newWorkComposition )  
                }}>
                    <fieldset>
                        <input 
                            type="text" 
                            name="composer"
                            placeholder="Composer"
                            value={ newWorkComposer }
                            onChange={ e => setNewWorkComposerTo( e.target.value ) }
                        />
                        <input 
                            type="text" 
                            name="composition"
                            placeholder="Composition"
                            value={ newWorkComposition }
                            onChange={ e => setNewWorkCompositionTo( e.target.value ) }
                        />
                    </fieldset>
                    <div className="submitContainer">
                        <button>Add</button>
                    </div>
                </form>
            </Popup>
            <Popup
                id="editWorkPopup"
                title="Edit a work"
            >
                <form onSubmit={ e => { 
                    e.preventDefault()
                    handleUpdateWork( editIndex, newWorkComposer, newWorkComposition )  
                }}>
                    <fieldset>
                        <input 
                            type="text" 
                            name="composer"
                            placeholder="Composer"
                            value={ newWorkComposer }
                            onChange={ e => setNewWorkComposerTo( e.target.value ) }
                        />
                        <input 
                            type="text" 
                            name="composition"
                            placeholder="Composition"
                            value={ newWorkComposition }
                            onChange={ e => setNewWorkCompositionTo( e.target.value ) }
                        />
                    </fieldset>
                    <div className="submitContainer">
                        <button>Update</button>
                    </div>
                </form>
            </Popup>

            <Popup
                id="addPerformerPopup"
                title="Add a performer"
            >
                <form onSubmit={ e => { 
                    e.preventDefault()
                    handleNewPerformer( newPerformerName, newPerformerInstrument ) 
                }}>
                    <fieldset>
                        <input 
                            type="text" 
                            name="name"
                            placeholder="Full name"
                            value={ newPerformerName }
                            onChange={ e => setNewPerformerNameTo( e.target.value ) }
                        />
                        <input 
                            type="text" 
                            name="instrument"
                            placeholder="Instrument / role"
                            value={ newPerformerInstrument }
                            onChange={ e => setNewPerformerInstrumentTo( e.target.value ) }
                        />
                    </fieldset>
                    <div className="submitContainer">
                        <button>Add</button>
                    </div>
                </form>
            </Popup>
            <Popup
                id="editPerformerPopup"
                title="Edit performer"
            >
                <form onSubmit={ e => { 
                    e.preventDefault()
                    handleUpdatePerformer( editIndex, newPerformerName, newPerformerInstrument ) 
                }}>
                    <fieldset>
                        <input 
                            type="text" 
                            name="name"
                            placeholder="Full name"
                            value={ newPerformerName }
                            onChange={ e => setNewPerformerNameTo( e.target.value ) }
                        />
                        <input 
                            type="text" 
                            name="instrument"
                            placeholder="Instrument / role"
                            value={ newPerformerInstrument }
                            onChange={ e => setNewPerformerInstrumentTo( e.target.value ) }
                        />
                    </fieldset>
                    <div className="submitContainer">
                        <button>Change</button>
                    </div>
                </form>
            </Popup>

            <Popup
                id="addDatePopup"
                title="Add a performance"
            >
                <form onSubmit={ e => {
                    e.preventDefault()
                    handleNewDate( newDateDate, newDateVenue )
                }}>
                    <fieldset>
                        <input 
                            type="date" 
                            name="newdate"
                            placeholder="Date: yyyy-mm-dd"
                            value={ newDateDate }
                            onChange={ e => setNewDateDateTo( e.target.value ) }
                        />
                        <input 
                            type="text" 
                            name="venue"
                            placeholder="Venue"
                            value={ newDateVenue }
                            onChange={ e => setNewDateVenueTo( e.target.value ) }
                        />
                    </fieldset>
                    <div className="submitContainer">
                        <button>Add</button>
                    </div>
                </form>
            </Popup>
            <Popup
                id="editDatePopup"
                title="Edit this date"
            >
                <form onSubmit={ e => {
                    e.preventDefault()
                    handleUpdateDate( newDateDate, newDateVenue, editingDate )
                }}>
                    <fieldset>
                        <input 
                            type="date" 
                            name="newdate"
                            placeholder="Date: yyyy-mm-dd"
                            value={ newDateDate }
                            onChange={ e => setNewDateDateTo( e.target.value ) }
                        />
                        <input 
                            type="text" 
                            name="venue"
                            placeholder="Venue"
                            value={ newDateVenue }
                            onChange={ e => setNewDateVenueTo( e.target.value ) }
                        />
                    </fieldset>
                    <div className="submitContainer">
                        <button>Update</button>
                    </div>
                </form>
            </Popup>

        </>
    )
}

export default EventEditor