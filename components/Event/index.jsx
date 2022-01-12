const months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ]

const Event = ({ data }) => {

    const { institution, date, month, works, performers, infoLink, venue } = data

    return (

        <div className="event">

                <div className="row">
                    <header>{institution}</header>
                    <time>
                        {months[month]}<br/>
                        <span>{date.toString().padStart(2, '0')}</span>
                    </time>
                </div>

                <article>

                    { 
                        works.map((w, i) => 
                            <p key={i} className={`programme ${ i == (works.length - 1) ? 'last-item' : '' }`}>
                                <strong className="composer">
                                    {w.composer}
                                </strong>
                                <br/>
                                {w.composition}
                            </p>
                        ) 
                    }

                    { 
                        performers.map((p, i) => 
                            <p key={i}>
                                <strong>
                                    {p.name}
                                </strong>
                                <span className="instrument">
                                    {p.instrument}
                                </span>
                            </p>
                        ) 
                    }

                    <p style={{ marginTop: performers.length ? '1.5em' : 'auto' }}>
                        <strong>
                            { venue }
                        </strong>
                    </p>
                    
                </article>
                
                {
                    !infoLink
                        ?   ''
                        :   <a
                                target="_blank"
                                rel="noreferrer noopener"
                                href={infoLink}
                            >
                                More Info
                            </a>
                }

        </div>

    )
}

export default Event