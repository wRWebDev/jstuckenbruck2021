import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import upload from './upload'
import Image from 'next/image'
import styles from './styles.module.scss'

const UploadImage = ({ name = '', updateFilenameInDb, folder, currentImage = '', buttonText = 'Upload', showPreview = true }) => {

    const [ uploading, setUploadingTo ] = useState( false )
    const [ image, setImageTo ] = useState( currentImage || '' )

    const submitHandler = async e => {

        setImageTo( '' )

        const fileToUpload = e.target.files[0]

        const filename = parseInt((new Date()).toString().replace(/\D/g, ''))
        const filenameParts = fileToUpload.name.split('.')
        const fileExtension = filenameParts.slice(-1).pop()
        const newFilename = `${filename}-${nanoid(6)}.${fileExtension}`

        upload(
            'uploads',
            fileToUpload,
            setUploadingTo,
            newFilename,
            1,
            1
        ).then( () => {
            updateFilenameInDb( newFilename )
        })

    }

    useEffect(() => {
        if( currentImage !== image ) setImageTo( currentImage )
    }, [ currentImage, image ])

    const hiddenInputId = `img_uploader_${name.replace(/s/g, '')}`

    return (
        <div className={styles.upload_image_module}>
            {
                !showPreview 
                    ?   ''
                    :   <div className={styles.preview_wrapper}>
                            <div className={`loadingCircle ${styles.preview_loader}`} />
                            {
                                !image
                                    ? ''
                                    : <Image 
                                        src={`${process.env.AWS_BUCKET}${folder}/${image}`}
                                        layout={'fill'}
                                        objectFit={'contain'}
                                        objectPosition={'center'}
                                        placeholder="empty"
                                    />

                            }
                        </div>
            }
            <form onSubmit={ e => e.preventDefault() }>
                <input 
                    type="file" 
                    id={ hiddenInputId }
                    name={ name }
                    onChange={ e => submitHandler( e ) }
                    hidden={ true }
                    multiple
                />
                <button
                    type="button"
                    onClick={ () => document.getElementById( hiddenInputId ).click() }
                    className={styles.submitButton}
                >   
                    { uploading ? 'Uploading...': buttonText }
                </button>
            </form>
        </div>
    )
}

export default UploadImage