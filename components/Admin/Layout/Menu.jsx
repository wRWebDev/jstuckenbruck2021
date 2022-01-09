import Link from 'next/link'
import { auth, signOut } from '../../../lib/Db'
import { useRouter } from 'next/router'
import Image from 'next/image'

const Menu = () => {

    const router = useRouter()

    return (
        <div id="mainMenu" className="hidden">

            <nav>
                <ul>
                    
                    <Link href="/admin" passHref><li>Dashboard</li></Link>
                    <Link href="/admin/edit" passHref><li>Content</li></Link>
                    <Link href="/admin/media" passHref><li>Media</li></Link>
                    <Link href="/admin/schedule" passHref><li>Schedule</li></Link>
                    <Link href="/admin/settings" passHref><li>Settings</li></Link>
                    <li onClick={() => {
                        signOut( auth )
                            .then( () => router.push('/auth/login') )
                            .catch( err => {
                                console.error( err )
                            })
                    }}>
                        Sign Out
                    </li>

                </ul>
            </nav>

            <div 
                id="menu_button" 
                onClick={() => document.getElementById( 'mainMenu' ).classList.add( 'hidden' ) }
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

        </div>
    )

}

export default Menu