import { MailSearchIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "../ui/button";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "../ui/empty";

type Props = {
	email: string;
};

export const EmailVerification = ({ email }: Props) => {
	const [timeToNextResend, setTimeToNextResend] = useState(30);
	const interval = useRef<NodeJS.Timeout>(undefined);

	const startResendVerificationTimer = (time = 30) => {
		setTimeToNextResend(time);

		interval.current = setInterval(() => {
			setTimeToNextResend((t) => {
				const newT = t - 1;

				if (newT <= 0) {
					clearInterval(interval.current);
					return 0;
				}
				return newT;
			});
		}, 1000);
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		startResendVerificationTimer();
	}, []);

	return (
		<Empty>
			<EmptyMedia>
				<MailSearchIcon />
			</EmptyMedia>
			<EmptyHeader>
				<EmptyTitle>Email Verification</EmptyTitle>
				<EmptyDescription>
					Please check your email for the verification link.
				</EmptyDescription>
			</EmptyHeader>
			<EmptyContent className="mt-2">
				<Button
					onClick={async () => {
						startResendVerificationTimer();
						await authClient.sendVerificationEmail({
							email: email,
							callbackURL: "/",
						});
					}}
					disabled={timeToNextResend !== 0}
				>
					{timeToNextResend === 0
						? "Resend"
						: `Resend in (${timeToNextResend}s)`}
				</Button>
			</EmptyContent>
		</Empty>
	);
};
