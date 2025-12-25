import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { requireAuthMiddleware } from "@/lib/middlewares";

export const Route = createFileRoute("/")({
	server: {
		middleware: [requireAuthMiddleware],
	},
	component: App,
});

function App() {
	// Use the useSession hook for reactive session state
	const { data: session, isPending } = authClient.useSession();
	const navigate = useNavigate();

	const handleSignout = async () => {
		await authClient.signOut({
			fetchOptions: {
				onError: (error) => {
					console.error("Sign out failed:", error);
				},
				onSuccess: () => {
					navigate({
						to: "/login",
					});
					toast.success("Signed out successfully");
				},
			},
		});
	};

	if (isPending) {
		return (
			<div className="flex items-center justify-center min-h-svh">
				<Loader2 className="size-8 animate-spin text-muted-foreground" />
			</div>
		);
	}

	return (
		<div className="p-8 max-w-2xl mx-auto space-y-6">
			<div className="space-y-2">
				<h1 className="text-2xl font-bold">
					Welcome, {session?.user?.name || "User"}!
				</h1>
				<p className="text-muted-foreground">
					You are signed in as {session?.user?.email}
				</p>
			</div>

			<Button onClick={handleSignout} variant="outline">
				Sign out
			</Button>

			{import.meta.env.DEV && (
				<details className="mt-8">
					<summary className="cursor-pointer text-sm text-muted-foreground">
						Debug: Session Data
					</summary>
					<pre className="mt-2 p-4 bg-muted rounded-lg text-xs overflow-auto">
						<code>{JSON.stringify(session, null, 2)}</code>
					</pre>
				</details>
			)}
		</div>
	);
}
