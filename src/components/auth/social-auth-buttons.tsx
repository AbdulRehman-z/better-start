import { Image } from "@unpic/react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { Badge } from "../ui/badge";

type SocialProvider = "github" | "google";

type SocialAuthButtonsProps = {
	//Whether buttons should be disabled (e.g., during form submission)
	disabled?: boolean;
	// URL to redirect to after OAuth completes - handled by Better Auth server
	callbackURL?: string;
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
	callbackURL = "/",
	onAuthStart,
	lastLoginMethod,
}: SocialAuthButtonsProps) => {
	const handleSocialAuth = async (provider: SocialProvider) => {
		// Notify parent to disable form elements
		onAuthStart?.();

		await authClient.signIn.social({
			provider,
			callbackURL,
		});
	};

	return (
		<div className="flex flex-col gap-2">
			{(Object.keys(PROVIDERS) as SocialProvider[]).map((provider) => {
				const config = PROVIDERS[provider];

				return (
					<Button
						key={provider}
						variant="outline"
						type="button"
						className="w-full relative"
						disabled={disabled}
						onClick={() => handleSocialAuth(provider)}
					>
						<Image
							src={config.icon}
							height={15}
							width={15}
							alt={`${config.name} logo`}
						/>
						{config.label}
						{provider === lastLoginMethod && (
							<Badge
								variant="secondary"
								className="absolute right-0.5 top-2/12 -translate-y-1/2"
							>
								Last Used
							</Badge>
						)}
					</Button>
				);
			})}
		</div>
	);
};
