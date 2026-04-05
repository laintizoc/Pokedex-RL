import NextAuth from "next-auth"
import db from "@/app/db";

const authOptions = {
	providers: [
		{
			id: "nextcloud",
			name: "Nextcloud",
			type: "oauth",
			clientId: process.env.NEXTCLOUD_CLIENT_ID ?? "",
			clientSecret: process.env.NEXTCLOUD_CLIENT_SECRET ?? "",
			wellKnown: `${process.env.NEXTCLOUD_ISSUER}/.well-known/openid-configuration`,
			authorization: {
				params: {
					scope: "openid email profile",
				},
			},
			idToken: true,
			profile(profile) {
				return {
					id: profile.sub,
					name: profile.name || profile.preferred_username,
					email: profile.email,
					image: profile.picture || null,
				}
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
