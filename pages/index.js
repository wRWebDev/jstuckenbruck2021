import styles from '../styles/Home.module.css'
import q from '../db'

export default function Home({ data }) {

  data = JSON.parse(data)[0]

  console.log(data)

  return (
    <div className={styles.container}>
      {data.body}
    </div>
  )
}

export async function getServerSideProps({ params }){

  try {
    const res = await q({
      query: 'SELECT * FROM content WHERE title = ?',
      values: ['Biography']
    })
    return {
      props: {
        data: res
      }
    }
  }
  catch (err) {
    console.error(err)
  }

}
