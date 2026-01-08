import { SignIn } from '@stackframe/stack'
import Link from 'next/link'


export default function SignInpage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center">
        <div className='container mx-auto px-4 py-16 text-center'>
       <SignIn />
       <Link href="/">Go Back To Home</Link>
        </div>
    </div>
  )
}

