import type { LinkProps, RegisteredRouter } from "@tanstack/react-router";
import { Image } from "@unpic/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { Badge } from "../ui/badge";
import { Spinner } from "../ui/spinner";

type SocialProvider = "github" | "google";
type AllRoutes = LinkProps<RegisteredRouter>["to"];

type SocialAuthButtonsProps = {
	// Whether buttons should be disabled (e.g., during form submission)
	disabled?: boolean;
	// URL to redirect to after OAuth completes - handled by Better Auth server
	callbackURL?: AllRoutes;
	// Called when social auth starts - use to disable other form elements
	onAuthStart?: () => void;
	lastLoginMethod?: ReturnType<typeof authClient.getLastUsedLoginMethod>;
};

type ProviderConfig = {
	name: string;
	icon: string;
	label: string;
};

const PROVIDERS: Record<SocialProvider, ProviderConfig> = {
	google: {
		name: "Google",
		icon: "/google.svg",
		label: "Continue with Google",
	},
	github: {
		name: "GitHub",
		icon: "/github.svg",
		label: "Continue with GitHub",
	},
};

export const SocialAuthButtons = ({
	disabled = false,
	callbackURL,
	onAuthStart,
	lastLoginMethod,
}: SocialAuthButtonsProps) => {
	const [loadingProvider, setLoadingProvider] = useState<SocialProvider | null>(
		null,
	);

	const handleSocialAuth = async (provider: SocialProvider) => {
		// Set the current provider as loading
		setLoadingProvider(provider);

		// Notify parent to disable form elements
		onAuthStart?.();

		await authClient.signIn.social({
			provider,
			callbackURL,
		});

		// Note: No need to set loading to false here because the page will redirect
		// But if auth fails, you might want to handle that with try-catch
	};

	return (
		<div className="flex flex-col gap-2">
			{(Object.keys(PROVIDERS) as SocialProvider[]).map((provider) => {
				const config = PROVIDERS[provider];
				const isLoading = loadingProvider === provider;
				const isDisabled = disabled || loadingProvider !== null;

				return (
					<Button
						key={provider}
						variant="outline"
						type="button"
						className="w-full relative"
						disabled={isDisabled}
						onClick={() => handleSocialAuth(provider)}
					>
						{isLoading && <Spinner />}
						<Image
							src={config.icon}
							height={15}
							width={15}
							alt={`${config.name} logo`}
						/>
						{config.label}
						{provider === lastLoginMethod && (
							<Badge className="absolute -right-0.5 top-2/12 -translate-y-1/2 text-[10px]">
								Last Used
							</Badge>
						)}
					</Button>
				);
			})}
		</div>
	);
};
