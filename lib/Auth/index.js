import { firebaseAdmin } from './firebaseAdmin';
import nookies from 'nookies'

const checkLogin = async ( ctx, props = [] ) => {

    let parsedProps = {}

    for( let i = 0; i < props.length; i++ )
        parsedProps[ props[i].prop ] = eval( props[i].value ) || null

    try{
        const cookies = nookies.get( ctx )
        const token = await firebaseAdmin
            .auth()
            .verifyIdToken( cookies.jstuckenbruck )
        return { 
            props: { 
                token,
                ...parsedProps
            } 
        }
    } 
    catch( err ) {
        return {
            redirect: {
                permanent: false,
                destination: `/auth/login?redirect=${ctx.req.url}`,
            },
            props: {}
        }
    }
    
}

export { checkLogin }