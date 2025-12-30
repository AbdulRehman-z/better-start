import { Link, useLocation } from "@tanstack/react-router";
import { GalleryVerticalEnd } from "lucide-react";
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
				<div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
					<GalleryVerticalEnd className="size-4" />
				</div>
				Flowcat Inc.
			</Link>

			{showAuthButtons && (
				<div className="flex items-center gap-2">
					<Link className={buttonVariants({ variant: "outline" })} to="/login">
						Login
					</Link>
					<Link className={buttonVariants({})} to="/sign-up">
						Sign Up
					</Link>
				</div>
			)}
		</div>
	);
};
