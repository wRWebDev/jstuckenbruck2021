import Layout from '../../../components/Admin/Layout/Layout'
import { add, erase } from '../../../lib/Db/document'
import { db, collection, query, where, Timestamp, doc } from '../../../lib/Db/index'
import { useDocumentDataOnce, useCollectionDataOnce } from 'react-firebase-hooks/firestore'
import { LoadingPage } from '../../../components/Admin/Layout/Loading'
import SaveButton from '../../../components/Admin/FormElements/SaveBar'
import EventEditor from '../../../components/Admin/Events/Editor'
import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid';

const Events = ({ eventId }) => {

    const [ eventData, loadingEvent ] = useDocumentDataOnce( doc( db, 'schedule', eventId ) )
    const [ initialLoad, setInitialLoadTo ] = useState( true )
    const [ dateData ] = useCollectionDataOnce(
        query( 
            collection( db, 'event_dates' ), 
            where( 'event', '==', eventId )
        ),
        { idField: 'uid' }
    )

    const parseData = async () => {
        // handle events first...
        await addDatesToDb( dates.filter( d => d.status == 'toAdd' ) )
        await delDatesFromDb( dates.filter( d => d.status == 'toDel' ) )
        // get eventData for the schedule collection
        const endDate = dates.sort( ( a, b ) => {
            if( a.datetime.seconds < b.datetime.seconds ) return -1
            if( a.datetime.seconds > b.datetime.seconds ) return 1
            if( a.datetime.seconds == b.datetime.seconds ) return 0
        })[dates.length - 1].datetime
        return { institution, infoLink, works, performers, endDate }
    }

    const addDatesToDb = async dates => {
        dates.forEach( async d => {
            delete d.uid
            delete d.status
            await add( 'event_dates', d )
            console.log('Add: ', d)
        })
    }

    const delDatesFromDb = async dates => {
        dates.forEach( async d => {
            await erase( 'event_dates', d.uid )
        })
    }

    const [ institution, setInstitutionTo ] = useState( '' )
    const [ infoLink, setInfoLinkTo ] = useState( '' )
    const [ works, setWorksTo ] = useState( [] )
    const [ performers, setPerformersTo ] = useState( [] )
    const [ dates, setDatesTo ] = useState( [] )

    const inputHandler = ( name, val ) => {
        
        switch ( name ) {
            case 'institution':
                setInstitutionTo( val )
                break
            case 'infoLink':
                setInfoLinkTo( val )
                break
            case 'work':
                setWorksTo( [ ...works, val ] )
                break
            case 'performer':
                setPerformersTo( [ ...performers, val ] )
                break
            case 'date': 
                setDatesTo( [ ...dates, {
                    event: eventId,
                    venue: val.venue,
                    datetime: Timestamp.fromDate( new Date( val.datetime ) ),
                    status: 'toAdd',
                    uid: nanoid(20)
                }])

            default:
                break
        }
    }

    const removeHandler = ( name, data ) => {
        switch ( name ) {

            case 'work':
                setWorksTo( works.filter( w => { 
                    if( (w.composer !== data.composer) && ( w.composition !== data.composition ) )
                        return w
                }))
                break
            case 'performer': 
                setPerformersTo( performers.filter( p => {
                    if( ( p.name !== data.name ) && ( p.instrument !== data.instrument ) )
                        return p
                }))
                break
            case 'date': 
                setDatesTo( dates.filter( d => {
                    if( d.uid === data.uid ) {
                        if( d.status === 'toAdd' ) return null // handle added and deleted
                        d.status = 'toDel'
                    }
                    return d
                }))
        }
    }

    useEffect( () => {
        if( eventData ) {
            console.log( 'updating event data' )
            setInstitutionTo( eventData.institution || '' )
            setInfoLinkTo( eventData.infoLink || '' )
            setWorksTo( eventData.works || [])
            setPerformersTo( eventData.performers || [] )
        }
    }, [ eventData ])

    useEffect( () => {
        if( dateData && initialLoad )
            console.log( 'updating date data' )
            setInitialLoadTo( false )
            setDatesTo( dateData )
    }, [ dateData ])

    return (
        <Layout>
            
            {

                loadingEvent
                    ?   <LoadingPage />
                    :   <>
                            <SaveButton 
                                getData={ parseData }
                                docId={ eventId }
                                collection="schedule"
                                defaultText="Save & Close"
                                afterSaveRoute={`/admin/schedule`}
                                afterDeleteRoute={`/admin/schedule`}
                            />
                            <h1 style={{marginTop: '40pt'}}>Edit</h1>
                            <h2>Event</h2>
                            <EventEditor 
                                values={{ institution, infoLink, works, performers }}  
                                inputHandler={inputHandler}
                                removeHandler={removeHandler}
                                dates={dates}
                            />
                        </>

            }

        </Layout>
    )
}

// Check login on the serverside
import { checkLogin } from '../../../lib/Auth'
import { date } from 'is_js'
export const getServerSideProps = async ctx => await checkLogin( ctx, [{ prop: 'eventId', value: 'ctx.params.eventId' }] )

export default Events