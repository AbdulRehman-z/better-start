import { createFileRoute } from "@tanstack/react-router";
import { LoginForm } from "@/components/auth/login-form";

export const Route = createFileRoute("/_authLayout/login/")({
	head: () => ({
		meta: [
			{
				title: "Login",
			},
		],
	}),
	component: RouteComponent,
});

function RouteComponent() {
	return <LoginForm />;
}
