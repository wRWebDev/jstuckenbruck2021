const Biography = ({ content }) => {
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
                    <article className="desktop">
                        { content.body }
                        <div className="social-media">
                            {/* { TODO: GET SOCIAL MEDIA ICONS } */}
                        </div>
                    </article>
                    <article className="mobile">
                        {/* {map the first 2 paragraphs here} */}
                    </article>
                </div>
            </section>
        </>
    )
}

export default Biography