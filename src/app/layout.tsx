import { type Metadata } from 'next'
import {
    ClerkProvider,
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
} from '@clerk/nextjs'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { DropDownMenu } from '@/components/DropDownMenu'
import { Toaster } from '@/components/ui/sonner'

import Link from 'next/link'
import { Plus } from 'lucide-react'

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
})

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: '4DESA SOCIAL APP',
    description: 'GET SOCIAL',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <ClerkProvider signUpForceRedirectUrl="/onboarding" afterSignOutUrl="/">
            <html lang="en">
                <body
                    className={`${geistSans.variable} ${geistMono.variable} antialiased`}
                >
                    <Toaster />
                    <header className="flex justify-between items-center p-4 gap-4 h-16 border-b-2 border-b-black">
                        <div>
                            <Link className="text-sky-950 text-xl" href={'/'}>
                                4DESA SOCIAL
                            </Link>
                        </div>
                        <SignedOut>
                            <SignInButton />

                            <SignUpButton />
                        </SignedOut>
                        <SignedIn>
                            <div className="flex items-center">
                                <Link
                                    className="mr-2 flex p-1 border-2 border-gray-700 rounded-sm items-center gap-2"
                                    href={'/upload'}
                                >
                                    <Plus /> Post something
                                </Link>
                                <DropDownMenu />
                            </div>
                        </SignedIn>
                    </header>
                    {children}
                </body>
            </html>
        </ClerkProvider>
    )
}
