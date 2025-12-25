import { createFileRoute } from "@tanstack/react-router";
import { serve } from "@upstash/workflow/tanstack";

export const Route = createFileRoute("/api/send-password-reset-email")({
	server: {
		handlers: serve<string>(async (context) => {
			const input = context.requestPayload;
		}),
	},
});
