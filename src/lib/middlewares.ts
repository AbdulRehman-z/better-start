import { redirect } from "@tanstack/react-router";
import { createMiddleware } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { auth } from "@/lib/auth";

/**
 * Middleware that requires authentication.
 * Redirects unauthenticated users to login page.
 * Adds session to middleware context for downstream access.
 */
export const requireAuthMiddleware = createMiddleware().server(
	async ({ next }) => {
		const headers = getRequestHeaders();
		const session = await auth.api.getSession({ headers });
		if (!session) {
			throw redirect({ to: "/login" });
		}

		return await next({ context: { session } });
	},
);

/**
 * Middleware that only allows unauthenticated users.
 * Redirects authenticated users to home page.
 * Use on login/signup pages to prevent authenticated users from accessing them.
 */
export const requireNoAuthMiddleware = createMiddleware().server(
	async ({ next }) => {
		const headers = getRequestHeaders();
		const session = await auth.api.getSession({ headers });

		if (session) {
			throw redirect({ to: "/account" });
		}

		return await next();
	},
);
