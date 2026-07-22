import { getServerSession, NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),

        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials, req) {
                // Add logic to verify credentials here
                if (!credentials) return null
                console.log("use logged in with email:", credentials.email)
                return { id: "1", name: 'User', email: "user@example.com" }
            },
        }),
        // ... other providers
    ],
    // session: {
    //     strategy: 'jwt',
    //     maxAge: 1 * 24 * 60 * 60, // 1 day
    // },
    // jwt: {
    //     // JWT encoding and decoding configurations
    // },
    // callbacks: {
    //     // signIn, session callbacks
    // },
    pages: {
        signIn: "/signin",
    },
    // ... other configurations
}

export const getAuth = () => getServerSession(authOptions)