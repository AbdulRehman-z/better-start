import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { lastLoginMethod } from "better-auth/plugins";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { db } from "@/db";
import * as authSchema from "@/db/schemas/auth-schema";
import { env } from "@/env";
import {
	sendPasswordResetEmailTrigger,
	sendVerificationEmailTrigger,
} from "./triggers";

const isTargetRoute = (url: string) => {
	return url.endsWith("/sign-in/email") || url.endsWith("/sign-up/email");
};

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
		schema: authSchema,
	}),
	emailAndPassword: {
		enabled: true,
		autoSignIn: false,
		requireEmailVerification: true,
		sendResetPassword: async ({ user, url }) => {
			void sendPasswordResetEmailTrigger(
				{ email: user.email, name: user.name },
				url,
			);
		},
		onPasswordReset: async ({ user }) => {
			console.log(`Password reset for user ${user.id}`);
		},
	},
	emailVerification: {
		afterEmailVerification: async (user) => {
			console.log(`Email verified for user ${user.id}`);
		},
		autoSignInAfterVerification: true,
		sendOnSignIn: true,
		sendOnSignUp: true,
		sendVerificationEmail: async ({ url, user }) => {
			void sendVerificationEmailTrigger(
				{ email: user.email, name: user.name },
				url,
			);
		},
	},
	session: {
		cookieCache: {
			enabled: true,
		},
	},
	rateLimit: {
		enabled: true,
		storage: "database",
		customRules: {
			"/get-session": false,
			"/sign-in/email": {
				max: 200,
				window: 60, // 1 minute
			},
		},
	},
	socialProviders: {
		github: {
			clientId: env.VITE_GITHUB_CLIENT_ID,
			clientSecret: env.GITHUB_SECRET,
		},
		google: {
			clientId: env.VITE_GOOGLE_CLIENT_ID,
			clientSecret: env.GOOGLE_SECRET,
			scope: ["profile", "email"],
			mapProfileToUser: async (profile) => {
				console.log({ profile });
				return {
					name: "dawd9921e821geaoisv",
					image: profile.picture,
				};
			},
		},
	},
	user: {},
	experimental: {
		joins: true,
	},
	plugins: [tanstackStartCookies(), lastLoginMethod()],
});
