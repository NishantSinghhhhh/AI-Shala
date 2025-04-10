// app/auth/sign-up/page.tsx
'use client'

import { AuthCard } from '@/components/AuthCard'

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      {/* Pass view="sign_up" to show the registration form */}
      <AuthCard view="sign_up" />
    </div>
  )
}
