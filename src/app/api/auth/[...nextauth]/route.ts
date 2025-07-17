import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  picture: string;
  role: "admin" | "user";
}

const users: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    picture: "asdw",
    password: "123456",
    role: "admin",
  },
  {
    id: "2",
    picture:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6Hb5xzFZJCTW4cMqmPwsgfw-gILUV7QevvQ&s",
    name: "Regular User",
    email: "user@example.com",
    password: "123456",
    role: "user",
  },
];

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = users.find((user) => user.email === credentials.email);
        if (!user) {
          return null;
        }

        const isValidPassword = user.password === credentials.password;
        if (!isValidPassword) {
          return null;
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log("JWT Callback:", { token, user });
      if (user) {
        const customUser = user as User;
        token.picture = customUser.picture;
        token.role = customUser.role;
        token.id = customUser.id;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      console.log("Session Callback:", { session, token });
      if (session.user) {
        session.user.picture = token.picture as string;
        session.user.role = token.role as string;
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

// import { NextAuthOptions } from "next-auth";
// import { NextResponse } from "next/server";
// import NextAuth from "next-auth/next";
// import CredentialsProvider from "next-auth/providers/credentials";

// interface User {
//   id: number;
//   email: string;
//   password: string;
//   name: string;
//   role: "customer" | "admin";
//   avatar: string;
// }

// // In a real app, you would use a database
// // This is a simple in-memory store for demo purposes

// async function getUsers() {
//   try {
//     const response = await fetch("https://api.escuelajs.co/api/v1/users");
//     if (!response.ok) {
//       throw new Error("Failed to fetch users");
//     }
//     return await response.json();
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     return [];
//   }
// }

// export const authOptions: NextAuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           return null;
//         }

//         const users = await getUsers();
//         const user = users.find(
//           (user: User) => user.email === credentials.email
//         );
//         if (!user) {
//           return null;
//         }

//         return {
//           id: user.id,
//           name: user.name,
//           email: user.email,
//           role: user.role,
//           avatar: user.avatar,
//         };
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.role = (user as any).role;
//         token.id = (user as any).id;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (session.user) {
//         (session.user as any).role = token.role as string;
//         (session.user as any).id = token.id as string;
//       }
//       return session;
//     },
//   },
//   pages: {
//     signIn: "/auth/login",
//     error: "/auth/login",
//   },
//   session: {
//     strategy: "jwt",
//     maxAge: 30 * 24 * 60 * 60, // 30 days
//   },
//   secret: process.env.NEXTAUTH_SECRET || "your-secret-key",
//   debug: process.env.NODE_ENV === "development",
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };
