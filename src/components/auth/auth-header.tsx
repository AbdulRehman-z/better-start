import { Link, useLocation } from "@tanstack/react-router";
import { Image } from "@unpic/react";
import type { AllRoutes } from "@/lib/types";
import { buttonVariants } from "../ui/button";

export const Header = () => {
	const location = useLocation();
	const currentPath = location.pathname;
	const showAuthButtons = (
		["/reset-password", "/forgot-password", "/2-fa"] as AllRoutes[]
	).includes(currentPath as AllRoutes);

	return (
		<div className="flex justify-between items-center">
			<Link to="/sign-up" className="flex items-center gap-2 font-medium">
				<div className="text-primary-foreground flex size-6 items-center justify-center rounded-md">
					<Image src="/logo.svg" height={16} width={16} alt="flowcat-logo" />
				</div>
				Flowcat Inc.
			</Link>

			{showAuthButtons && (
				<div className="flex items-center gap-2">
					<Link
						className={buttonVariants({ variant: "outline", size: "lg" })}
						to="/login"
					>
						Login
					</Link>
					<Link
						className={buttonVariants({
							variant: "default",
							size: "lg",
						})}
						to="/sign-up"
					>
						Sign Up
					</Link>
				</div>
			)}
		</div>
	);
};
