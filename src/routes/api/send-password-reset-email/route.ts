import { createFileRoute } from "@tanstack/react-router";
import { serve } from "@upstash/workflow/tanstack";
import { resetPasswordTemplate } from "@/components/email-templates/reset-password";
import { sendEmail } from "@/lib/resend-client";

type Input = {
	user: {
		email: string;
		name: string;
	};
	url: string;
};

export const Route = createFileRoute("/api/send-password-reset-email")({
	server: {
		handlers: serve<Input>(async (ctx) => {
			const input = ctx.requestPayload;

			await ctx.run("send-password-reset-email", async () => {
				console.log("retried");
				await sendEmail({
					email: input.user.email,
					subject: `Password Reset Request for ${input.user.name}`,
					html: () =>
						resetPasswordTemplate({ user: input.user, url: input.url }),
				});
			});
		}),
	},
});
