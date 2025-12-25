import { Client } from "@upstash/workflow";
import { env } from "@/env";

export const upstashClient = new Client({
	token: env.QSTASH_TOKEN,
});
