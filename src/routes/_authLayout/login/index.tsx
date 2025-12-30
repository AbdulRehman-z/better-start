import { createFileRoute } from "@tanstack/react-router";
import { LoginForm } from "@/components/auth/login-form";
import { requireNoAuthMiddleware } from "@/lib/middlewares";

export const Route = createFileRoute("/_authLayout/login/")({
	server: {
		middleware: [requireNoAuthMiddleware],
	},
	head: () => ({
		meta: [
			{
				title: "Log-in",
			},
		],
	}),
	component: RouteComponent,
});

function RouteComponent() {
	return <LoginForm />;
}
