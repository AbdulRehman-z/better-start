import { useNavigate } from "@tanstack/react-router";
import { ArrowLeftFromLine } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

export function NavUser() {
	const navigate = useNavigate();
	const { isPending, isRefetching } = authClient.useSession();
	const isLoading = isPending || isRefetching;

	return (
		<>
			{isLoading ? (
				<Skeleton className="h-8" />
			) : (
				<Button
					variant="secondary"
					disabled={isLoading}
					className="[&:hover_svg]:motion-preset-wobble [&:hover_svg]:motion-duration-1000"
					onClick={() => {
						authClient.signOut({
							fetchOptions: {
								onSuccess: () => {
									navigate({
										to: "/login",
									});
								},
								onError: () => {
									console.error("Failed to sign out");
								},
							},
						});
					}}
				>
					<ArrowLeftFromLine />
					Sign out
				</Button>
			)}
		</>
	);
}
