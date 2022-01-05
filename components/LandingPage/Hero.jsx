const Hero = ({ content  }) => {
    return (
        <>
            <section 
                className='home'
                style={{backgroundImage:`url(https://jstuckenbruck2021.s3.eu-west-2.amazonaws.com/scaled-images/home-image-1024.jpg)`}}
            >

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