import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import LoginButton from '../components/LoginButton'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#1e293b]">
      <Head>
        <title>Undertaker App - Digital Will Platform</title>
        <meta name="description" content="Create and manage your digital will" />
      </Head>

      {/* Auth Section */}
      <div className="absolute top-4 right-4 z-10">
        <div className="flex items-center gap-4">
          <Link
            href="/write"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Write Your Will
          </Link>
          <LoginButton />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex justify-center items-center min-h-screen p-4">
        <div className="relative">
          <Image
            src="/assets/intro-1.png"
            alt="Undertaker App Introduction"
            width={1200}
            height={800}
            className="rounded-2xl shadow-2xl"
            priority
          />
        </div>
      </div>
    </div>
  )
} 