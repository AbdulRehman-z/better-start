import { Resend } from "resend";
import { env } from "@/env";

const resendClient = new Resend(env.RESEND_API_KEY);

export const sendEmail = async ({
	email,
	subject,
	html,
}: {
	email: string;
	subject: string;
	html: string | (() => string);
}) => {
	const { error } = await resendClient.emails.send({
		from: "Flowcat Inc. <onboarding@resend.dev>",
		to: [email],
		subject,
		html: typeof html === "function" ? html() : html,
	});

	console.error(error);
};
