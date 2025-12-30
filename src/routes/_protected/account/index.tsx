import { createFileRoute, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { ConnectedAccounts } from "@/components/auth/connected-accounts";
import { EmailAddresses } from "@/components/auth/email-addresses";
import { ProfileDetails } from "@/components/auth/profile";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/lib/auth";

const serverFn = createServerFn().handler(async () => {
	setTimeout(() => {
		console.log("Timeout executed");
	}, 2000);

	const request = getRequest();
	const data = await auth.api.getSession({
		headers: request.headers,
	});
	console.log({ data });
	if (!data) {
		throw redirect({ to: "/login" });
	}
	return data;
});

export const Route = createFileRoute("/_protected/account/")({
	loader: async () => {
		const data = await serverFn();
		if (!data) throw redirect({ to: "/login" });
		return data;
	},
	component: RouteComponent,
});

function RouteComponent() {
	const data = Route.useLoaderData();

	return (
		<div className="flex flex-col gap-y-12">
			<div className="flex flex-col gap-y-2">
				<h2 className="font-bold text-2xl">Account</h2>
				<p className="text-muted-foreground">Manage your account information</p>
			</div>
			<ul className="flex flex-col gap-y-10 ">
				<li className="flex flex-col gap-y-2 ">
					<Separator />
					<ProfileDetails user={data.user} />
				</li>
				<li className="flex flex-col gap-y-2">
					<Separator />
					<EmailAddresses />
				</li>
				<li className="flex flex-col gap-y-2">
					<Separator />
					<ConnectedAccounts />
				</li>
			</ul>
		</div>
	);
}
