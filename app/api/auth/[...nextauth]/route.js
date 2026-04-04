import NextAuth from "next-auth"
import db from "@/app/db";

const authOptions = {
	providers: [
		{
			id: "nextcloud",
			name: "Nextcloud",
			type: "oidc",
			issuer: process.env.NEXTCLOUD_ISSUER,
			clientId: process.env.NEXTCLOUD_CLIENT_ID ?? "",
			clientSecret: process.env.NEXTCLOUD_CLIENT_SECRET ?? "",
			authorization: {
				params: {
					scope: "openid email profile",
				},
			},
		},
	],

	callbacks: {
		async signIn({ user, account  }) {
			const { email, name, image, id, provider } = user;
			const collection = db.collection('users');
			const findUser = await collection.findOne({ providerAccountId: id });
			if (findUser) {
				return true;
			} else {
				const createUserInDb = await collection.insertOne({
					email,
					name,
					avatar: image,
					providerAccountId: id,
					provider,
					lastUpdated: Date.now(),
					pokedexEntries: 0,
				});
			}
			return true;
		},
		async jwt({ token, account }) {
			if (account) {
			  token.accessToken = account.access_token
			}
			return token
		},
		async session({ session, token, user }) {
			session.accessToken = token.accessToken
			return session
		},
	},
}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST, authOptions}
