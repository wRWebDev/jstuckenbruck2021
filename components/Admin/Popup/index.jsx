import styles from './styles.module.scss'
import OutsideClickHandler from 'react-outside-click-handler'

const Popup = ({ id = "popup", title = "Popup", children }) => {
    
    return (
        <OutsideClickHandler 
            onOutsideClick={() => {
                document.getElementById( id ).classList.add( 'hidden' )
            }}
        >
            <div 
                id={id} 
                className={`${styles.popup} hidden`}
            >

                <header>
                    <h3>{title}</h3>
                    <img
                        src="/img/close.png"
                        onClick={() => document.getElementById( id ).classList.add( 'hidden' )}
                    />
                </header>

                <div className={styles.content}>
                    { children }
                </div>

            </div>
        </OutsideClickHandler>
    )

}

export default Popup