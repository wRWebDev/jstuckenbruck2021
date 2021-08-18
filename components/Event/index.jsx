const Event = ({ data }) => {

    const { institution, date, works, performers, url } = data

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
                <p>
                    { works.map((w, i) => <span key={i}><strong className="composer">{w.composer}</strong><br/>{w.composition}<br/></span>) }
                </p>
                <p>
                    { performers.map((p, i) => <span key={i}><strong className="performer">{p.name}</strong>{p.instrument}</span>) }
                </p>
                <p>
                    Some Venue
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