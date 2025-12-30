import { createFileRoute } from "@tanstack/react-router";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import { requireNoAuthMiddleware } from "@/lib/middlewares";

export const Route = createFileRoute("/_authLayout/forgot-password/")({
	server: {
		middleware: [requireNoAuthMiddleware],
	},
	component: RouteComponent,
});

function RouteComponent() {
	return <ForgotPasswordForm />;
}
