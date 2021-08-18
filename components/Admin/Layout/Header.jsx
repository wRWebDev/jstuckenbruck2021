import Link from 'next/link'

const Header = () => {

    return (
        <header>

            <h1> JS </h1>

            <nav>
                <ul>
                    <li><Link href="/"><a>Site</a></Link></li>
                    <li>Bio</li>
                    <li>Events</li>
                </ul>
            </nav>


        </header>
    ) 

}

export default Header