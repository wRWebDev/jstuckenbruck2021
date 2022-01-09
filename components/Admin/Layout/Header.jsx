import { useRouter } from 'next/router'
import Image from 'next/image'

const Header = () => {
    
    const router = useRouter()

    const goHome = () => {
        router.push('/')
    }

    return (
        <div id="header">

            <div 
                id="logo" 
                onClick={() => goHome()}
                style={{position:'relative'}}
            >
                <Image
                    src="/img/logo.png" 
                    layout="fill"
                    objectFit={'contain'}
                    objectPosition={'center'}
                    placeholder="empty"
                    alt="View your website"
                    priority={true}
                />
            </div>

            <div 
                id="menu_button" 
                onClick={() => document.getElementById( 'mainMenu' ).classList.toggle( 'hidden' )}
                style={{position:'relative'}}
            >
                <Image
                    src="/img/menu.png" 
                    layout="fill"
                    objectFit={'contain'}
                    objectPosition={'center'}
                    placeholder="empty"
                    alt="View the menu"
                    priority={true}
                />
            </div>

        </div>
    )

}

export default Header