import Event from '../Event'

const Schedule = ({ content, events }) => {

    return (
        <>
            <section className="parallax events">
                <div className="parallax-title">
                    <h1 data-aos="fade-up"> { content.title } </h1>
                </div>
                <div 
                    className="parallax-body darken events"
                    data-aos="fade-in" 
                    data-aos-mirror="true" 
                    data-aos-duration="1000"   
                >

                    { events.map((e, i) => <Event key={i} data={e} /> ) }

                </div>
            </section>
        </>
    )
}

export default Schedule