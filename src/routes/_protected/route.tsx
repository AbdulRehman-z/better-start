import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppSidebar } from "@/components/custom/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";
import { requireAuthMiddleware } from "@/lib/middlewares";

export const Route = createFileRoute("/_protected")({
	server: {
		middleware: [requireAuthMiddleware],
	},
	component: RouteComponent,
});
function RouteComponent() {
	// const session = authClient.useSession();

	return (
		<SidebarProvider defaultOpen>
			<AppSidebar />
			<SidebarInset className="flex-1 px-16 py-15">
				<Outlet />
				{/*<pre>{JSON.stringify(session, null, 2)}</pre>*/}
			</SidebarInset>
		</SidebarProvider>
	);
}
