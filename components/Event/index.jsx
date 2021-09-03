const Event = ({ data }) => {

    const { institution, date, works, performers, url, venue } = data

    return (

        <div className="event">

                <div className="row">
                    <header>{institution}</header>
                    <time>
                        {date.month}<br/>
                        <span>{date.date}</span>
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

                    <p>
                        <strong>
                            { venue }
                        </strong>
                    </p>
                    
                </article>

                <a
                    target="_blank"
                    rel="noreferrer noopener"
                    href={url}
                >
                    More Info
                </a>

        </div>

    )
}

export default Event