import { useRouter } from 'next/router'

const Header = () => {
    
    const router = useRouter()

    const goHome = () => {
        router.push('/')
    }

    return (
        <div id="header">

            <img 
                id="logo" 
                src="/img/logo.png" 
                onClick={() => goHome()}    
            />

            <img 
                id="menu_button" 
                src="/img/menu.png" 
                onClick={() => document.getElementById( 'mainMenu' ).classList.toggle( 'hidden' )}
            />

        </div>
    )

}

export default Header