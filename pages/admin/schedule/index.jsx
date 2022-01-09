import Layout from '../../../components/Admin/Layout/Layout'
import { LoadingMore, FinishedLoading } from '../../../components/Admin/Layout/Loading'
import { db, collection, query, orderBy, where, limit, startAfter, getDocs, getDoc, doc } from '../../../lib/Db'
import { add } from '../../../lib/Db/document'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useState, useEffect } from 'react'
import EventList from '../../../components/Admin/Events/List'
import { useRouter } from 'next/router'

const loadLimit = 10

const Events = () => {

    const [ initialLoad, setInitialLoadTo ] = useState( true )
    const [ list, setListTo ] = useState( [] )
    const [ reachedEnd, setReachedEndTo ] = useState( false )

    const defaultQuery = query( 
        collection( db, 'schedule' ), 
        orderBy( 'endDate', 'asc' ),
        where( 'endDate', '>=', new Date() ),
        limit( loadLimit )
    )
    
    const loadData = async ( loadQuery ) => {
        console.log('running load')
        if( initialLoad ) setInitialLoadTo( false )
        try {
            let snapshot = await getDocs(loadQuery)
            let newData = []
            snapshot.forEach( doc => { 
                newData.push({
                    uid: doc.id,
                    ...doc.data()
                })
            })
            setListTo( [ ...list, ...newData] )
            if( newData.length < loadLimit ) setReachedEndTo(true)
        }
        catch( err ) {
            console.error( err )
            setReachedEndTo( true )
        }
    }

    const paginate = async () => {
        let lastDocument = await getDoc( doc( db, 'schedule', list[list.length - 1].uid ))
        let paginateQuery = query(
            collection( db, 'schedule' ),
            orderBy('startDate', 'asc'),
            limit(loadLimit),
            startAfter(lastDocument)
        )
        loadData( paginateQuery )
    }

    useEffect(() => {
        if( !list.length && initialLoad ) loadData( defaultQuery )
    }, [ initialLoad ])

    const router = useRouter()

    const addNewEvent = async () => {
        let eventId = await add( 'schedule', {} )
        router.push({
            pathname: '/admin/schedule/[eventId]',
            query: { eventId }
        })
    }

    return (
        <Layout>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                padding: '10pt 0 !important'
            }}>
                <img 
                    src="/img/add.png"
                    onClick={ () => addNewEvent() }
                    style={{ width: '15pt', height: '15pt', cursor: 'pointer' }}
                />
            </div>
            <h1>Schedule</h1>
            <InfiniteScroll
                dataLength={list.length}
                next={paginate}
                hasMore={!reachedEnd}
                endMessage={<FinishedLoading />}
                loader={<LoadingMore />}
                style={{}}
            >
                <EventList list={list} />
            </InfiniteScroll>
        </Layout>
    )
}

// Check login on the serverside
import { checkLogin } from '../../../lib/Auth'
export const getServerSideProps = async ctx => await checkLogin( ctx )

export default Events