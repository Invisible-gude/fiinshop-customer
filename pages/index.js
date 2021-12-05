import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchPosts } from '../store/actions/postAction'
import { getUserLoginData } from '../store/actions/authAction'
import MainLayout from '../components/MainLayout'
export default function Home() {
  const dispatch = useDispatch()
  const { posts } = useSelector(state => state.post)
  useEffect(() => {
    dispatch(fetchPosts())
    dispatch(getUserLoginData())
  }, [])
  return (
    <>
      {/* <MainLayout title='หน้าแรก' >
        หน้าแรก
      </MainLayout> */}
    </>
    // <div className={styles.container}>

    //   <main className={styles.main}>
    //     <h1 className={styles.title}>
    //       Welcome to <a href="https://nextjs.org">Next.js!</a>
    //     </h1>

    //     {posts && posts.map(it => (
    //       <h1 key={it} className='h2'>{it}</h1>
    //     ))}
    //   </main>

    //   <footer className={styles.footer}>
    //     <a
    //       href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Powered by{' '}
    //       <span className={styles.logo}>
    //         <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
    //       </span>
    //     </a>
    //   </footer>
    // </div>
  )
}
