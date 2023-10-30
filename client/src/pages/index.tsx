import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className="flex flex-col p-10">
      <h1 className="font-bold bg-base-100 bold border">Holis</h1>
    </div>
  )
}
