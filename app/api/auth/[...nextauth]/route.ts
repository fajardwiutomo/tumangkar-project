import NextAuth from "next-auth";
import bcrypt from "bcryptjs";
import User from "@/app/models/Users";
import dbConnect from "@/app/lib/db";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", required: true },
                password: { label: "Password", type: "password", required: true },
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials?.password) {
                    throw new Error("Missing username or password");
                }

                await dbConnect();

                // Cari user di database
                const user = await User.findOne({ username: credentials.username }).lean();

                if (!user) {
                    throw new Error("User not found");
                }

                // Validasi password
                const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
                if (!isPasswordValid) {
                    throw new Error("Invalid password");
                }

                // Hanya kembalikan data yang diperlukan
                return {
                    id: user._id.toString(),
                    username: user.username,
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = user;
            }
            return token;
        },
        async session({ session, token }) {
            if (token.user) {
                session.user = token.user;
            }
            return session;
        },
    },
    pages: {
        signIn: "/"
    },
    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
