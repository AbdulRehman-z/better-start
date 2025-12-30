import { Link } from "@tanstack/react-router";
import { KeyIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui/empty";

export const ResetPasswordError = () => {
	return (
		<Empty className="border border-dashed">
			<EmptyHeader>
				<EmptyMedia variant="icon">
					<KeyIcon />
				</EmptyMedia>
				<EmptyTitle>Invalid or Missing Token</EmptyTitle>
				<EmptyDescription>
					Please perform the necessary action again to obtain a valid token.
				</EmptyDescription>
			</EmptyHeader>
			<EmptyContent>
				<Link
					to="/login"
					className={buttonVariants({
						variant: "default",
						size: "lg",
					})}
				>
					Back to Login
				</Link>
			</EmptyContent>
		</Empty>
	);
};
