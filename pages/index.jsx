import Layout from '../components/Layout'
import LandingPage from '../components/LandingPage'
import AOS from 'aos'
import { useEffect } from 'react'

export default function Home({ content, events }) {

  useEffect(()=>{
    AOS.init({
      duration: 600
    })
  },[])
  
  const aboutMe = {
    title: 'Johann Stuckenbruck - Conductor',
    descrition: 'Welocme to the website of international conductor, Johann Stuckenbruck',
    keywords: [
      'conductor',
      'musician'
    ],
    sm_image: 'https://images.unsplash.com/photo-1483032469466-b937c425697b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80'
  }
  
  return (
    <Layout properties={aboutMe}>
      <LandingPage 
        content={content} 
        events={events} 
      />
    </Layout>
  )
}


export async function getServerSideProps( ctx ){

  const contentRes = await fetch('http://localhost:1337/api/v1/content')
  const contentData = await contentRes.json()

  const eventsRes = await fetch('http://localhost:1337/api/v1/events')
  const eventsData = await eventsRes.json()

  return {
    props: {
      content: contentData,
      events: eventsData
    }
  }

}
