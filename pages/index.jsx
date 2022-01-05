import Layout from '../components/Layout'
import LandingPage from '../components/LandingPage'

export default function Home({ content, events }) {

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
        content={content} 
        events={events}
      />
    </Layout>
  )
}

export async function getServerSideProps( ctx ) {

  const contentRes = await fetch(`${process.env.API}content`)
  const contentData = await contentRes.json()

  const eventsRes = await fetch(`${process.env.API}events`)
  const eventsData = await eventsRes.json()

  return {
    props: {
      content: contentData,
      events: eventsData
    }
  }

}