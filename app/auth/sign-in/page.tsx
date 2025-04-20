// app/auth/sign-in/page.tsx
'use client'

import { AuthCard } from '@/components/AuthCard'

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      {/* Pass view="sign_in" to show the login form */}
      <AuthCard view="sign_in" />
    </div>
  )
}
