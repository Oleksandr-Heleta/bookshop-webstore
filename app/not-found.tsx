import Link from 'next/link'
import Image from 'next/image'
 
export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center h-screen text-center text-amber-950">
         <Image src="/logo.webp" alt="logo" width={100} height={100} />
      <h2 className='text-amber-950 text-lg font-bold'>404</h2>
      <p>Цієї сторінки не знайдено</p>
      <Link className='hover:text-amber-800 underline underline-offset-2' href="/">На головну</Link>
    </div>
  )
}