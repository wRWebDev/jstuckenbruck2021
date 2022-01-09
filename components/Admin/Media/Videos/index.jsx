import styles from './styles.module.scss'

const Videos = ({ videos, handleDelete }) => {

    return (
        <div className={styles.videos_wrapper}>
            {
                videos.map( ( vid, i ) => <Video 
                    key={i}
                    data={vid}
                    handleDelete={handleDelete}
                />) 
            }
        </div>
    )
}

const Video = ({ data, handleDelete }) => {
    return (
        <div className={styles.video}>
            <div className={styles.videoImgWrapper}>
                <div 
                    className={`loadingCircle ${styles.preview_loader}`}     
                />
                <div 
                    className={styles.videoImg} 
                    style={{ backgroundImage: `url(https://img.youtube.com/vi/${data.id}/hqdefault.jpg)` }}
                />
            </div>
            <div className={styles.videoInfo}>
                <h3>{ data.title }</h3>
                <p>{ data.subtitle }</p>
            </div>
            <div 
                className={styles.videoDelete} 
                onClick={ () => handleDelete( data.id ) }
            />
        </div>
    )
}

export default Videos