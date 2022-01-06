import Link from 'next/link'
import { auth, signOut } from '../../../lib/Db'
import { useRouter } from 'next/router'

const Menu = () => {

    const router = useRouter()

    return (
        <div id="mainMenu" className="hidden">

            <nav>
                <ul>
                    
                    <Link href="/admin"><li>Dashboard</li></Link>
                    <Link href="/admin/edit"><li>Content</li></Link>
                    <Link href="/admin/media"><li>Media</li></Link>
                    <Link href="/admin/schedule"><li>Schedule</li></Link>
                    <Link href="/admin/settings"><li>Settings</li></Link>
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

            <img 
                src="/img/close.png"
                onClick={() => document.getElementById( 'mainMenu' ).classList.add( 'hidden' ) }
            />

        </div>
    )

}

export default Menu