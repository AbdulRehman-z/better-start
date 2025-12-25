import { Resend } from "resend";
import { env } from "./env";

const resend = new Resend(env.RESEND_API_KEY);

await resend.emails.send({
	from: "Acme <onboarding@resend.dev>",
	to: ["yousafbhaikhan10@gmail.com"],
	subject: "hello world",
	html: "<p>it works!</p>",
});
