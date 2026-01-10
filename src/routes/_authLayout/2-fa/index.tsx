import { createFileRoute } from "@tanstack/react-router";
import { TwoFactorForms } from "@/components/auth/two-factor-forms";

export const Route = createFileRoute("/_authLayout/2-fa/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <TwoFactorForms />;
}
