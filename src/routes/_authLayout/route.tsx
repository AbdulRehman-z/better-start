import { createFileRoute, Outlet, useLocation } from "@tanstack/react-router";
import { Header } from "@/components/auth/auth-header";
import { TermsOfService } from "@/components/auth/terms-of-service";
import { Testimonial } from "@/components/auth/testimonial";
import { requireNoAuthMiddleware } from "@/lib/middlewares";
import type { AllRoutes } from "@/lib/types";

export const Route = createFileRoute("/_authLayout")({
	server: {
		middleware: [requireNoAuthMiddleware],
	},
	component: RouteComponent,
});

function RouteComponent() {
	const location = useLocation();
	const currentPath = location.pathname;
	// Paths where we don't want to show terms of service
	const hideTermsOnPaths = [
		"/reset-password",
		"/forgot-password",
		"/2-fa",
	] as AllRoutes[];
	const shouldShowTerms = !hideTermsOnPaths.includes(currentPath as AllRoutes);

	return (
		<div className="grid min-h-svh lg:grid-cols-3">
			<div className="flex flex-col gap-4 p-6 md:p-10 col-span-2">
				<Header />
				<div className="flex flex-1 items-center justify-center">
					<div className="w-full max-w-sm flex flex-col items-center">
						<Outlet />
						{shouldShowTerms && <TermsOfService />}
					</div>
				</div>
			</div>
			<Testimonial />
		</div>
	);
}
