# Undertaker App

A digital will creation platform built with Next.js, Firebase, and Tailwind CSS.

## Features

- Google Authentication
- Digital Will Creation
- PDF Generation
- Email Sending
- Dark Mode Support

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Firebase (Authentication & Firestore)
- EmailJS
- jsPDF

## Environment Variables

The following environment variables are required:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

## Deployment

1. Fork or clone this repository
2. Create a new project on Vercel
3. Connect your GitHub repository
4. Add the environment variables in Vercel's project settings
5. Deploy!

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## License

MIT 