import Layout from '../../../components/Admin/Layout/Layout'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { db, doc, update } from '../../../lib/Db/document'
import Videos from '../../../components/Admin/Media/Videos'
import { LoadingPage } from '../../../components/Admin/Layout/Loading'
import Popup from '../../../components/Admin/Popup'
import { useState } from 'react'

const Media = () => {

    const [ data ] = useDocumentData( doc( db, 'singlepage', 'landingpage' ) )

    const [ title, setTitleTo ] = useState( '' )
    const [ subtitle, setSubtitleTo ] = useState( '' )
    const [ link, setLinkTo ] = useState( '' )

    const getVidId = link => {
        const regex = /(?:https?:)?(?:\/\/)?(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*?[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/
        let id =  link.match(regex)
        if( id ) return id[1]
        return false
    }

    const addVid = ( title, subtitle, id ) => {
        
        document.getElementById( 'addVideoPopup' ).classList.add( 'hidden' )
        setTitleTo( '' )
        setSubtitleTo( '' )
        setLinkTo( '' )

        let videos = data.media.videos || []
        videos.unshift({
            title,
            subtitle,
            id
        })

        update( 'singlepage', 'landingpage', {
            "media.videos": videos
        })

    }

    const deleteVideo = id => {

        let videos = data.media.videos || []

        update( 'singlepage', 'landingpage', {
            "media.videos": videos.filter( v => v.id !== id )
        })

    }

    return (
        <Layout>

            {

                !data 
                    ?   <LoadingPage />
                    :   <>
                            <h1>Videos</h1>
                            <img
                                src="/img/add.png"
                                style={{ width: '15pt', height: '15pt', position: 'absolute', top: '10pt', right: '10pt', cursor: 'pointer' }}
                                onClick={ () => document.getElementById( 'addVideoPopup' ).classList.remove( 'hidden' ) }
                            />
                            <Videos 
                                videos={ data.media.videos || [] }
                                handleDelete={deleteVideo}
                            />
                            <Popup
                                id="addVideoPopup"
                                title="Add a Youtube Video"
                            >
                                <form onSubmit={ e => {
                                    e.preventDefault()
                                    addVid( title, subtitle, getVidId( link ) )
                                }}>
                                    <fieldset>
                                        {
                                            !(link && getVidId(link))
                                                ? ''
                                                : <img src={`https://img.youtube.com/vi/${getVidId(link)}/hqdefault.jpg`} style={{ width: '84%', margin: '0 8%' }} />
                                        }
                                        <input
                                            type="url"
                                            placeholder="Youtube link"
                                            value={ link }
                                            onChange={ ({ target }) => setLinkTo( target.value ) }
                                        />
                                        <input 
                                            type="text" 
                                            placeholder="Title"
                                            value={ title }
                                            onChange={ ({ target }) => setTitleTo( target.value ) }    
                                        />
                                        <input 
                                            type="text" 
                                            placeholder="Subtitle"
                                            value={ subtitle }
                                            onChange={ ({ target }) => setSubtitleTo( target.value ) }    
                                        />
                                    </fieldset>
                                    {
                                        (link && !getVidId(link))
                                            ? <p>If you've entered a link and can't see the thumbnail, please check the link is correct.</p>
                                            : ''
                                    }  
                                    <div className="submitContainer">
                                        <button
                                            disabled={!link ? true : false}
                                        >
                                            Add
                                        </button>
                                    </div>
                                </form>
                            </Popup>
                        </>

            }
            

        </Layout>
    )
}

// Check login on the serverside
import { checkLogin } from '../../../lib/Auth'
export const getServerSideProps = async ctx => await checkLogin( ctx )

export default Media