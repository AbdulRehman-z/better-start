import { useForm } from "@tanstack/react-form";
import {
	Link,
	useNavigate,
	useParams,
	useSearch,
} from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import { resetPasswordSchema } from "@/lib/schemas";
import { FormWrapper } from "../custom/forms-wrapper";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "../ui/field";
import { PasswordInput } from "../ui/password-input";

type Props = {
	token: string;
};

export const ResetPasswordForm = ({ token }: Props) => {
	const navigate = useNavigate();

	const form = useForm({
		defaultValues: {
			password: "",
			confirmPassword: "",
		},
		validators: {
			onSubmit: resetPasswordSchema,
		},
		onSubmit: async ({ value }) => {
			await authClient.resetPassword(
				{
					newPassword: value.password,
					token: token,
				},
				{
					onSuccess: () => {
						toast.success("Password reset successfully");
						navigate({ to: "/login" });
					},
					onError: (ctx) => {
						toast.error(ctx.error.message || "Failed to reset password");
					},
				},
			);
		},
	});

	const isLoading = form.state.isSubmitting;

	return (
		<FormWrapper>
			<Card className="gap-y-10">
				<CardHeader className="text-center">
					<CardTitle className="text-xl">Reset your password</CardTitle>
					<CardDescription>
						Enter your new password below to reset your account password
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							e.stopPropagation();
							form.handleSubmit();
						}}
					>
						<FieldGroup>
							<form.Field
								name="password"
								children={(field) => {
									const errors = field.state.meta.errors;
									const isInvalid =
										errors.length > 0 && field.state.meta.isTouched;

									return (
										<Field data-invalid={isInvalid}>
											<FieldLabel htmlFor={field.name}>New Password</FieldLabel>
											<PasswordInput
												disabled={isLoading}
												id={field.name}
												name={field.name}
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
												aria-invalid={isInvalid}
												placeholder="********"
												autoComplete="new-password"
											/>
											{isInvalid && <FieldError errors={errors} />}
										</Field>
									);
								}}
							/>

							<form.Field
								name="confirmPassword"
								children={(field) => {
									const errors = field.state.meta.errors;
									const isInvalid =
										errors.length > 0 && field.state.meta.isTouched;

									return (
										<Field data-invalid={isInvalid}>
											<FieldLabel htmlFor={field.name}>
												Confirm Password
											</FieldLabel>
											<PasswordInput
												disabled={isLoading}
												id={field.name}
												name={field.name}
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
												aria-invalid={isInvalid}
												placeholder="********"
												autoComplete="new-password"
											/>
											{isInvalid && <FieldError errors={errors} />}
										</Field>
									);
								}}
							/>

							<Field>
								<Button
									disabled={isLoading}
									type="submit"
									className="w-full relative"
								>
									{form.state.isSubmitting ? (
										<>
											<Loader2 className="size-4 animate-spin" />
											Resetting...
										</>
									) : (
										"Reset Password"
									)}
								</Button>
								<FieldDescription className="text-center mt-4">
									Remembered your password?{" "}
									<Link
										to="/login"
										className="underline underline-offset-4 font-semibold"
									>
										Login
									</Link>
								</FieldDescription>
							</Field>
						</FieldGroup>
					</form>
				</CardContent>
			</Card>
		</FormWrapper>
	);
};
