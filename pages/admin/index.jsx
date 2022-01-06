import Layout from '../../components/Admin/Layout/Layout'

const Dashboard = () => {
    return (
        <Layout>
            Dashboard

            <form>

                <fieldset>
                    <label>Test</label>
                    <input type="text" name="test" />
                </fieldset>

                <div class="submitContainer">
                    <button type="submit">Submit</button>
                </div>
                
            </form>

        </Layout>
    )
}

export default Dashboard