import { createFileRoute } from "@tanstack/react-router";
import { serve } from "@upstash/workflow/tanstack";
import { verifyEmailTemplate } from "@/components/email-templates/verify-email";
import { sendEmail } from "@/lib/resend-client";

type Input = {
	user: {
		email: string;
		name: string;
	};
	url: string;
};

export const Route = createFileRoute("/api/send-verification-email")({
	server: {
		handlers: serve<Input>(async (context) => {
			const input = context.requestPayload;

			await context.run("send-verification-email", async () => {
				await sendEmail({
					email: input.user.email,
					subject: "Verify your email",
					html: () => verifyEmailTemplate(input.user.email, input.url),
				});
			});
		}),
	},
});
