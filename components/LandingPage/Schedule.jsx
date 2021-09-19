import Event from '../Event'
import * as Scroll from 'react-scroll'
let ScrollElement = Scroll.Link

const Schedule = ({ content, events }) => {

    // console.log(events)

    return (
        <>
            <section className="parallax events" id="section_schedule">
                <div className="parallax-title">
                    <h1 data-aos="fade-up"> { content.title } </h1>
                </div>
                <div 
                    className="parallax-body darken events"
                    data-aos="fade-in" 
                    data-aos-mirror="true" 
                    data-aos-duration="1000"   
                >

                    <ScrollElement name="schedule" />

                    { events.map((e, i) => <Event key={i} data={e} /> ) }

                </div>
            </section>
        </>
    )
}

export default Schedule