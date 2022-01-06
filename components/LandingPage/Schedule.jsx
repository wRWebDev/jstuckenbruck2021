import Event from '../Event'
import * as Scroll from 'react-scroll'
let ScrollElement = Scroll.Link

const Schedule = ({ content, events, isChrome }) => {

    return (
        <>
            <section 
                className={`parallax events ${isChrome ? 'chrome' : ''}`} 
                id="section_schedule"
                style={isChrome ? {backgroundImage:`url(${ process.env.AWS_BUCKET }uploads/${ content.img })`} : {}}
            >
                <div className="parallax-title">
                    <h1> { content.title } </h1>
                </div>
                <div className="parallax-body darken events">

                    <ScrollElement name="schedule" to="" />

                    { events.map((event, i) => <Event key={i} data={event} /> ) }

                </div>
            </section>
        </>
    )
}

export default Schedule