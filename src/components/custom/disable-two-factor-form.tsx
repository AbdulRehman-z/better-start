import { useForm } from "@tanstack/react-form";
import { useRouteContext } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { PasswordInput } from "@/components/ui/password-input";
import { authClient } from "@/lib/auth-client";
import { Alert } from "../ui/alert";

type DisableTwoFactorFormProps = {
	onSuccess?: () => void;
};

export function DisableTwoFactorForm({ onSuccess }: DisableTwoFactorFormProps) {
	const { queryClient } = useRouteContext({ from: "/_protected/profile/" });
	const [loading, startTransition] = useTransition();

	const form = useForm({
		defaultValues: {
			password: "",
		},
		onSubmit: async ({ value }) => {
			startTransition(async () => {
				await authClient.twoFactor.disable(
					{ password: value.password },
					{
						onSuccess() {
							toast.success("Two-factor authentication disabled successfully");
							queryClient.invalidateQueries({ queryKey: ["user-details"] });
							onSuccess?.();
						},
						onError(context) {
							toast.error(context.error.message);
						},
					},
				);
			});
		},
	});

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				form.handleSubmit();
			}}
			className="flex flex-col gap-4"
		>
			<Alert
				variant="destructive"
				className="text-sm p-4 border border-destructive/50 rounded-lg bg-destructive/5 text-destructive font-medium"
			>
				Warning: Disabling 2-FA will make your account less secure.
			</Alert>

			<FieldGroup>
				<form.Field
					name="password"
					children={(field) => (
						<Field data-invalid={field.state.meta.errors.length > 0}>
							<FieldLabel htmlFor="disable-password">Password</FieldLabel>
							<PasswordInput
								id="disable-password"
								name={field.name}
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
								placeholder="Enter your password to confirm"
								autoComplete="off"
							/>
							{field.state.meta.errors.length > 0 && (
								<FieldError errors={field.state.meta.errors} />
							)}
						</Field>
					)}
				/>
			</FieldGroup>

			<Button type="submit" variant="destructive" disabled={loading}>
				{loading ? (
					<Loader2 size={16} className="animate-spin" />
				) : (
					"Disable 2-FA"
				)}
			</Button>
		</form>
	);
}
