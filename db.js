import mysql from 'serverless-mysql'

const db = mysql({
    config: {
        host:       process.env.DB_HOSTNAME,
        port:       process.env.DB_PORTNAME,
        database:   process.env.DB_DATABASE,
        user:       process.env.DB_USERNAME,
        password:   process.env.DB_PASSWORD
    }
})

export default async function q({ query, values }) {
    try {
        const res = await db.query(query, values)
        await db.end()
        return JSON.stringify(res)
    }
    catch(err) {
        return {err}
    }
}