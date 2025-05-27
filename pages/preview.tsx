import { useState, useEffect, useRef } from 'react'
import Head from 'next/head'
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore'
import { firestore, auth } from '../lib/firebase'
import { useRouter } from 'next/router'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import emailjs from '@emailjs/browser'
import { Toaster, toast } from 'react-hot-toast'

type Will = {
  fullName: string
  dateOfBirth: string
  message: string
  createdAt: string
}

export default function PreviewPage() {
  const router = useRouter()
  const [will, setWill] = useState<Will | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [emailTo, setEmailTo] = useState('')
  const [isSending, setIsSending] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchLatestWill = async () => {
      if (!auth.currentUser) {
        setError('Please sign in to view your will')
        setLoading(false)
        return
      }

      try {
        const willsRef = collection(firestore, 'wills')
        const q = query(
          willsRef,
          orderBy('createdAt', 'desc'),
          limit(1)
        )
        
        const querySnapshot = await getDocs(q)
        
        if (querySnapshot.empty) {
          setError('No will found. Please create one first.')
          setLoading(false)
          return
        }

        const latestWill = querySnapshot.docs[0].data() as Will
        setWill(latestWill)
      } catch (err) {
        console.error('Error fetching will:', err)
        setError('Failed to fetch your will')
      } finally {
        setLoading(false)
      }
    }

    fetchLatestWill()
  }, [])

  const generatePDF = async () => {
    if (!contentRef.current) return null

    try {
      const canvas = await html2canvas(contentRef.current, {
        scale: 2,
        logging: false,
        useCORS: true
      })

      const imgData = canvas.toDataURL('image/jpeg', 1.0)
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height]
      })

      pdf.addImage(imgData, 'JPEG', 0, 0, canvas.width, canvas.height)
      return pdf
    } catch (err) {
      console.error('Error generating PDF:', err)
      return null
    }
  }

  const handleDownloadPDF = async () => {
    const pdf = await generatePDF()
    if (pdf) {
      pdf.save('digital-will.pdf')
    } else {
      toast.error('Failed to generate PDF')
    }
  }

  const handleSendEmail = async () => {
    if (!emailTo) {
      toast.error('Please enter an email address')
      return
    }

    setIsSending(true)
    const loadingToast = toast.loading('Sending email...')

    try {
      const pdf = await generatePDF()
      if (!pdf) {
        throw new Error('Failed to generate PDF')
      }

      const pdfData = pdf.output('datauristring')

      // Replace these with your EmailJS credentials
      const emailjsTemplateId = 'YOUR_TEMPLATE_ID'
      const emailjsUserId = 'YOUR_USER_ID'
      const emailjsServiceId = 'YOUR_SERVICE_ID'

      await emailjs.send(
        emailjsServiceId,
        emailjsTemplateId,
        {
          to_email: emailTo,
          from_name: 'Undertaker App',
          message: `Digital Will for ${will?.fullName}`,
          pdf_attachment: pdfData,
        },
        emailjsUserId
      )

      toast.success('Email sent successfully!', {
        id: loadingToast,
      })
      setEmailTo('')
    } catch (error) {
      console.error('Error sending email:', error)
      toast.error('Failed to send email', {
        id: loadingToast,
      })
    } finally {
      setIsSending(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-gray-600 dark:text-gray-300">Loading...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-red-50 dark:bg-red-900 text-red-800 dark:text-red-100 p-4 rounded-md">
            {error}
          </div>
        </div>
      </div>
    )
  }

  if (!will) return null

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Preview Digital Will - Undertaker App</title>
        <meta name="description" content="Preview your digital will" />
      </Head>

      <Toaster position="top-right" />

      <div className="max-w-3xl mx-auto">
        <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Digital Will Preview
          </h1>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleDownloadPDF}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Download as PDF
            </button>
            <div className="flex gap-2">
              <input
                type="email"
                value={emailTo}
                onChange={(e) => setEmailTo(e.target.value)}
                placeholder="Enter email address"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
              />
              <button
                onClick={handleSendEmail}
                disabled={isSending || !emailTo}
                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed ${
                  isSending ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isSending ? 'Sending...' : 'Send PDF'}
              </button>
            </div>
          </div>
        </div>

        <div
          ref={contentRef}
          className="bg-white dark:bg-gray-800 shadow rounded-lg p-8"
        >
          <div className="prose dark:prose-invert max-w-none">
            <div className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                Personal Information
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Full Name</p>
                  <p className="text-lg text-gray-900 dark:text-white">{will.fullName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Date of Birth</p>
                  <p className="text-lg text-gray-900 dark:text-white">
                    {new Date(will.dateOfBirth).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Final Message
              </h2>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                  {will.message}
                </p>
              </div>
            </div>

            <div className="text-sm text-gray-500 dark:text-gray-400">
              Created on: {new Date(will.createdAt).toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 