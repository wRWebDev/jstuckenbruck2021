import styles from './styles.module.scss'
import Image from 'next/image'

const Gallery = ({ images, folder, handleDelete }) => {

    return (
        <div className={styles.gallery_wrapper}>

            {

                !images.length
                    ?   <p>You currently have no images to display</p>
                    :   images.map( ( image, i ) => (
                            <div 
                                className={`${styles.gallery_image}`}
                                key={i}
                            >
                                <div className={`loadingCircle ${styles.preview_loader}`} />
                                <Image 
                                    src={`${process.env.AWS_BUCKET}${folder}/${image.filename}`}
                                    layout={'fill'}
                                    objectFit={'contain'}
                                    objectPosition={'center'}
                                />
                                <div className={styles.gallery_actions}>
                                    <span className={styles.gallery_order}>
                                        { `#${i + 1}` }
                                    </span>
                                    <span   
                                        className={styles.gallery_delete}
                                        onClick={() => handleDelete(i)}    
                                    >
                                        x
                                    </span>
                                </div>
                            </div>
                        ))

            }

        </div>
    )

}

export default Gallery