import styles from './styles.module.scss'
import { useRouter } from 'next/router'

const EventList = ({ list }) => {

    const router = useRouter()
    const linkToContact = id => router.push(`/admin/schedule/${id}`)

    return (
        <ul className={styles.eventList}>
            {
                list.map( ( event, i ) => {
                    return (
                        <li 
                            key={i}
                            onClick={ () => linkToContact( event.uid ) }    
                        >
                            <h2>{ event.institution }</h2>
                            <h3>{ event.works.map( w => w.composer ).join(' / ') }</h3>
                            <h4>Ends: { event.endDate.toDate().toLocaleDateString('en-gb') }</h4>
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default EventList