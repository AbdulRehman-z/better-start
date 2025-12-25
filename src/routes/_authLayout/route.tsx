import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { GalleryVerticalEnd } from "lucide-react";
import { guestOnlyMiddleware } from "@/lib/middlewares";

export const Route = createFileRoute("/_authLayout")({
	component: RouteComponent,
	server: {
		// middleware: [guestOnlyMiddleware],
	},
});

function RouteComponent() {
	return (
		<div className="grid min-h-svh lg:grid-cols-3">
			<div className="flex flex-col gap-4 p-6 md:p-10 col-span-2">
				<div className="flex justify-center gap-2 md:justify-start">
					<Link to="/" className="flex items-center gap-2 font-medium">
						<div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
							<GalleryVerticalEnd className="size-4" />
						</div>
						Flowcat Inc.
					</Link>
				</div>
				<div className="flex flex-1 items-center justify-center">
					<div className="w-full max-w-sm">
						<Outlet />
					</div>
				</div>
			</div>
			<div className="bg-primary/5 relative p-10 hidden lg:block">
				<div className="absolute bottom-5">
					<blockquote className="leading-normal text-balance text-primary">
						&ldquo;This platform has been a game-changer for our team.
						Everything is so intuitive and well-designed, making our daily tasks
						much more efficient.&rdquo;
						<br />
						<span className="font-semibold ">Sofia Davis</span>
					</blockquote>
				</div>
			</div>
		</div>
	);
}
