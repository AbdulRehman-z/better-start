import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import { Loader2Icon } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { FormWrapper } from "../custom/forms-wrapper";
import { Button } from "../ui/button";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "../ui/field";

export const TwoFactorForms = () => {
	const navigate = useNavigate();
	const [isAuthenticatorFormSubmitting, startAuthenticatorTransition] =
		useTransition();
	const [isBackupCodeFormSubmitting, startBackupCodeTransition] =
		useTransition();

	const authenticatorForm = useForm({
		defaultValues: {
			code: "",
		},
		onSubmit: async ({ value }) => {
			startAuthenticatorTransition(async () => {
				await authClient.twoFactor.verifyTotp(
					{ code: value.code },
					{
						onSuccess() {
							toast.success("TOTP verified successfully");
							navigate({
								to: "/",
							});
						},
						onError(context) {
							toast.error(context.error.message || "Failed to verify TOTP");
						},
					},
				);
			});
		},
	});

	const backupCodeForm = useForm({
		defaultValues: {
			backupCode: "",
		},
		onSubmit: async ({ value }) => {
			startBackupCodeTransition(async () => {
				await authClient.twoFactor.verifyBackupCode(
					{ code: value.backupCode },
					{
						onSuccess() {
							toast.success("Backup code verified successfully");
							navigate({
								to: "/",
							});
						},

						onError(context) {
							toast.error(
								context.error.message || "Failed to verify backup code",
							);
						},
					},
				);
			});
		},
	});

	return (
		<div className="flex items-center gap-x-10">
			<FormWrapper>
				<Card className="gap-y-5 max-w-lg">
					<CardHeader className="text-center">
						<CardTitle className="text-xl">Use Totp code</CardTitle>
						<CardDescription>
							Enter your totp code below from your authenticator app such as
							Google Authenticator or 1Password etc.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form
							className="flex flex-col items-center gap-y-5"
							onSubmit={(e) => {
								e.preventDefault();
								authenticatorForm.handleSubmit();
							}}
						>
							<FieldGroup>
								<authenticatorForm.Field
									name="code"
									children={(field) => {
										const errors = field.state.meta.errors;
										const isInvalid =
											errors.length > 0 && field.state.meta.isTouched;

										return (
											<Field data-invalid={isInvalid}>
												<FieldLabel htmlFor={field.name}>Totp code</FieldLabel>
												<Input
													disabled={isAuthenticatorFormSubmitting}
													id={field.name}
													name={field.name}
													type="text"
													value={field.state.value}
													onBlur={field.handleBlur}
													onChange={(e) => field.handleChange(e.target.value)}
													aria-invalid={isInvalid}
													placeholder="e.g 827392"
												/>
												<FieldDescription>
													Enter your 6 digits totp code
												</FieldDescription>
												{isInvalid && <FieldError errors={errors} />}
											</Field>
										);
									}}
								/>
							</FieldGroup>
							<Button
								className="w-full"
								type="submit"
								disabled={isAuthenticatorFormSubmitting}
							>
								{isAuthenticatorFormSubmitting ? (
									<Loader2Icon className="animate-spin size-4" />
								) : (
									"Verify 2-FA Code"
								)}
							</Button>
						</form>
					</CardContent>
				</Card>
			</FormWrapper>

			<FormWrapper title="Approach only if you dont have access to totp.">
				<Card className="gap-y-5">
					<CardHeader className="text-center">
						<CardTitle className="text-xl">Use Backup Code</CardTitle>
						<CardDescription>
							Enter one of your code from your <strong>backup codes</strong>{" "}
							below, generated at the time of enabling 2-FA.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form
							className="flex flex-col items-center gap-y-5"
							onSubmit={(e) => {
								e.preventDefault();
								backupCodeForm.handleSubmit();
							}}
						>
							<FieldGroup>
								<backupCodeForm.Field
									name="backupCode"
									children={(field) => {
										const errors = field.state.meta.errors;
										const isInvalid =
											errors.length > 0 && field.state.meta.isTouched;

										return (
											<Field data-invalid={isInvalid}>
												<FieldLabel htmlFor={field.name}>
													Backup code
												</FieldLabel>
												<Input
													disabled={isBackupCodeFormSubmitting}
													id={field.name}
													name={field.name}
													type="text"
													value={field.state.value}
													onBlur={field.handleBlur}
													onChange={(e) => field.handleChange(e.target.value)}
													aria-invalid={isInvalid}
													placeholder="e.g U2O-TZ6"
												/>
												<FieldDescription>
													Enter your 6 character backup code
												</FieldDescription>
												{isInvalid && <FieldError errors={errors} />}
											</Field>
										);
									}}
								/>
							</FieldGroup>
							<Button
								className="w-full"
								type="submit"
								disabled={isBackupCodeFormSubmitting}
							>
								{isBackupCodeFormSubmitting ? (
									<Loader2Icon className="animate-spin size-4" />
								) : (
									"Verify 2-FA Backup Code"
								)}
							</Button>
						</form>
					</CardContent>
				</Card>
			</FormWrapper>
		</div>
	);
};
