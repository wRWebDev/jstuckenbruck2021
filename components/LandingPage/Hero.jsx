const Hero = ({ content }) => {
    return (
        <>
            <section className="home">

                <h1>
                    Johann<br/>
                    Stuckenbruck
                    <span>{ content.subtitle }</span>
                </h1>

                <div className="scrollWrapper">
                    <div className="scrollWrapperInner">
                        <div className="scrollTitle">
                            Scroll
                        </div>
                        <div className="scrollDown" />
                    </div>
                </div>

            </section>
        </>
    )
}

export default Hero