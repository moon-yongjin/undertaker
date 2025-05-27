import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import LoginButton from '../components/LoginButton'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Undertaker App - Tailwind Demo</title>
        <meta name="description" content="A demo of Tailwind CSS features" />
      </Head>

      <div className="max-w-3xl mx-auto">
        {/* Auth Section */}
        <div className="mb-12 flex justify-between items-center">
          <div className="space-x-4">
            <Link
              href="/write"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Write Your Will
            </Link>
            <Link
              href="/preview"
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700"
            >
              Preview Will
            </Link>
          </div>
          <LoginButton />
        </div>

        {/* Typography Demo */}
        <div className="prose dark:prose-invert lg:prose-xl mb-12">
          <h1>Welcome to Undertaker App</h1>
          <p className="lead">
            This is a demonstration of Tailwind CSS features including typography, forms,
            responsive design, and dark mode support.
          </p>
          <blockquote>
            Tailwind CSS makes it easy to build beautiful, responsive interfaces
            without leaving your HTML.
          </blockquote>
        </div>

        {/* Card with Form Elements */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Contact Form
          </h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Your message here..."
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { title: 'Responsive Design', desc: 'Fully responsive components that look great on any device' },
            { title: 'Dark Mode', desc: 'Built-in dark mode support with simple dark: prefix' },
            { title: 'Typography', desc: 'Beautiful typography with @tailwindcss/typography plugin' },
            { title: 'Form Elements', desc: 'Styled form elements with @tailwindcss/forms plugin' }
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 