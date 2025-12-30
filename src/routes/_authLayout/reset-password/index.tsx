import { createFileRoute } from "@tanstack/react-router";
import z from "zod";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import { ResetPasswordError } from "@/components/custom/reset-password-error";

const searchParamsValidator = z.object({
	token: z.string({ error: "token is missing!" }).min(1).readonly(),
});

export const Route = createFileRoute("/_authLayout/reset-password/")({
	validateSearch: searchParamsValidator,
	errorComponent: () => <ResetPasswordError />,
	component: RouteComponent,
});

function RouteComponent() {
	const { token } = Route.useSearch();

	return <ResetPasswordForm token={token} />;
}
