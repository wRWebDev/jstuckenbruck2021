import Event from '../Event'
import * as Scroll from 'react-scroll'
let ScrollElement = Scroll.Link

const Schedule = ({ content, events, isChrome }) => {

    return (
        <>
            <section 
                className={`parallax events ${isChrome ? 'chrome' : ''}`} 
                id="section_schedule"
                style={isChrome ? {backgroundImage:`url(https://jstuckenbruck2021.s3.eu-west-2.amazonaws.com/scaled-images/schedule-image-1024.jpg)`} : {}}
            >
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