import { Link } from "@tanstack/react-router";

export const TermsOfService = () => {
	return (
		<p className="mt-6 text-center text-xs text-muted-foreground">
			By continuing, you agree to our{" "}
			<Link
				to="/terms"
				className="underline underline-offset-4 hover:text-primary transition-colors"
			>
				Terms of Service
			</Link>{" "}
			and{" "}
			<Link
				to="/privacy"
				className="underline underline-offset-4 hover:text-primary transition-colors"
			>
				Privacy Policy
			</Link>
			.
		</p>
	);
};
