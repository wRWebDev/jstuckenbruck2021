import styles from './styles.module.scss'
import OutsideClickHandler from 'react-outside-click-handler'
import Image from 'next/image'

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
                    <div 
                        style={{
                            position: 'relative',
                            width: '20pt',
                            height: '20pt'
                        }}
                        onClick={() => document.getElementById( id ).classList.add( 'hidden' )}
                    >
                        <Image
                            src="/img/close.png"
                            layout="fill"
                            objectFit={'contain'}
                            objectPosition={'center'}
                            placeholder="empty"
                            alt="Close the menu"
                            priority={true}
                        />
                    </div>
                </header>

                <div className={styles.content}>
                    { children }
                </div>

            </div>
        </OutsideClickHandler>
    )

}

export default Popup