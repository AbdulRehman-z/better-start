import { upstashClient } from "./upstash-client";

export const sendVerificationEmailTrigger = async (
	user: { email: string; name: string },
	url: string,
) => {
	void upstashClient.trigger({
		url: `http://localhost:3000/api/send-verification-email`,
		body: JSON.stringify({
			user: { email: user.email, name: user.name },
			url,
		}),
		retries: 3,
		keepTriggerConfig: true,
	});
};

export const sendPasswordResetEmailTrigger = async (
	user: { email: string; name: string },
	url: string,
) => {
	void upstashClient.trigger({
		url: `http://localhost:3000/api/send-password-reset-email`,
		body: JSON.stringify({
			user: { email: user.email, name: user.name },
			url,
		}),
		retries: 3,
		keepTriggerConfig: true,
	});
};
