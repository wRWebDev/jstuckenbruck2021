const Hero = ({ content  }) => {
    return (
        <>
            <section 
                className='home'
                style={ {backgroundImage:`url(${ process.env.AWS_BUCKET }uploads/${ content.img })`} }
            >

                <h1>
                    Johann<br/>
                    Stuckenbruck
                    <span>Conductor</span>
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