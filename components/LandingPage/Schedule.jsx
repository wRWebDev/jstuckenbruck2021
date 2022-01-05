import Event from '../Event'
import * as Scroll from 'react-scroll'
let ScrollElement = Scroll.Link

const Schedule = ({ content, events }) => {

    // console.log(events)

    return (
        <>
            <section className="parallax events" id="section_schedule">
                <div className="parallax-title">
                    <h1> { content.title } </h1>
                </div>
                <div className="parallax-body darken events">

                    <ScrollElement name="schedule" to="" />

                    { events.map((e, i) => <Event key={i} data={e} /> ) }

                </div>
            </section>
        </>
    )
}

export default Schedule