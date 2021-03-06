import Layout from '../components/Layout'
import LandingPage from '../components/LandingPage'
import { db, doc, getDoc } from '../lib/Db/document'
import {testdata} from '../lib/Db/testdata'

export default function Home({ data }) {

  const aboutMe = {
    title: 'Johann Stuckenbruck - Conductor',
    description: 'Welocme to the website of international conductor, Johann Stuckenbruck',
    keywords: [
      'conductor',
      'musician'
    ],
    sm_image: 'https://jstuckenbruck2021.s3.eu-west-2.amazonaws.com/scaled-images/home-image-2056.jpg'
  }
  
  return (
    <Layout properties={aboutMe} >
      <LandingPage 
        content={data} 
      />
    </Layout>
  )
}

export async function getServerSideProps() {

  let data

  if( process.env.NODE_ENV === "production" ) {
    const snapshot = await getDoc( doc( db, 'singlepage', 'landingpage' ) )
    data = snapshot.data()
  
    for( let i = 0; i < data.schedule.length; i++ ) {
      let date = data.schedule[i].datetime.toDate()
      data.schedule[i].date = date.getDate()
      data.schedule[i].month = date.getMonth()
      delete data.schedule[i].datetime
    }
  } else {
    data = testdata
  }

  return {
    props: {
      data
    }
  }

}