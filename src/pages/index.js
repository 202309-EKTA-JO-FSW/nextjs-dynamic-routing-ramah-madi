import Image from 'next/image'
import { Inter } from 'next/font/google'
import Posts from './posts'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  return (
    <main>
      <div className='flex justify-center justify-content'>
      <Link href="/posts/">Click to see all the posts</Link>
      </div>
    </main>
  )
}
