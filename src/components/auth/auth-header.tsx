import { Link, useLocation } from "@tanstack/react-router";
import { Image } from "@unpic/react";
import { buttonVariants } from "../ui/button";

export const Header = () => {
	const location = useLocation();
	const currentPath = location.pathname;
	const showAuthButtons = ["/reset-password", "/forgot-password"].includes(
		currentPath,
	);

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
					<Link className={buttonVariants({ variant: "outline" })} to="/login">
						Login
					</Link>
					<Link
						className={buttonVariants({
							variant: "default",
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
