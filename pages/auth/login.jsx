import Login from '../../components/Login'

// Get the page that the user tried to access
export const getServerSideProps = async ctx => {
    const redirect = ctx.query.redirect ? ctx.query.redirect : '/admin'
    return { props: { redirectUrl: redirect } }
}

const Page = ({ redirectUrl }) => {
    return (
        <div id="login_wrapper">
            <Login redirectUrl={redirectUrl} />
        </div>
    )
}

export default Page