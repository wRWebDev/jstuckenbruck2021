const Media = ({ content }) => {
    return (
        <>
            <section className="parallax bio">
                <div className="parallax-title">
                    <h1 data-aos="fade-up">{ content.title }</h1>
                </div>
                <div 
                    className="parallax-body darken bio" 
                    data-aos="fade-in" 
                    data-aos-duration="1000"
                >
                    Media content
                </div>
            </section>
        </>
    )
}

export default Media