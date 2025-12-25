import { useForm } from "@tanstack/react-form";
import { Link, useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { loginSchema } from "@/lib/schemas";
import { FormWrapper } from "../custom/forms-wrapper";
import { Badge } from "../ui/badge";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldSeparator,
} from "../ui/field";
import { PasswordInput } from "../ui/password-input";
import { EmailVerification } from "./email-verification";
import { SocialAuthButtons } from "./social-auth-buttons";

export const LoginForm = () => {
	const navigate = useNavigate();
	const lastLoginMethod = authClient.getLastUsedLoginMethod();
	const [socialAuthPending, setSocialAuthPending] = useState(false);
	const [showVerificationComponent, setShowVerificationComponent] =
		useState(false);

	const form = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
		validators: {
			onSubmit: loginSchema,
		},
		onSubmit: async ({ value }) => {
			await authClient.signIn.email(
				{
					email: value.email,
					password: value.password,
				},
				{
					onSuccess: () => {
						navigate({ to: "/" });
					},
					onError: (ctx) => {
						if (ctx.error.code === "EMAIL_NOT_VERIFIED") {
							toast.error("Email not verified");
							setShowVerificationComponent(true);
						}
					},
				},
			);
		},
	});

	// Combined loading state: form submitting OR social auth in progress
	const isLoading = form.state.isSubmitting || socialAuthPending;

	return (
		<FormWrapper>
			{showVerificationComponent ? (
				<EmailVerification email={form.getFieldValue("email")} />
			) : (
				<Card className="gap-y-10">
					<CardHeader className="text-center">
						<CardTitle className="text-xl">Login to your account</CardTitle>
						<CardDescription>
							Enter your email below to login to your account
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
									name="email"
									children={(field) => {
										const errors = field.state.meta.errors;
										const isInvalid =
											errors.length > 0 && field.state.meta.isTouched;

										return (
											<Field data-invalid={isInvalid}>
												<FieldLabel htmlFor={field.name}>Email</FieldLabel>
												<Input
													disabled={isLoading}
													id={field.name}
													name={field.name}
													type="email"
													autoComplete="email"
													value={field.state.value}
													onBlur={field.handleBlur}
													onChange={(e) => field.handleChange(e.target.value)}
													aria-invalid={isInvalid}
													placeholder="Enter your email"
												/>
												{isInvalid && <FieldError errors={errors} />}
											</Field>
										);
									}}
								/>

								<form.Field
									name="password"
									children={(field) => {
										const errors = field.state.meta.errors;
										const isInvalid =
											errors.length > 0 && field.state.meta.isTouched;

										return (
											<Field data-invalid={isInvalid}>
												<FieldLabel htmlFor={field.name}>Password</FieldLabel>
												<PasswordInput
													disabled={isLoading}
													id={field.name}
													name={field.name}
													value={field.state.value}
													onBlur={field.handleBlur}
													onChange={(e) => field.handleChange(e.target.value)}
													aria-invalid={isInvalid}
													placeholder="********"
													autoComplete="current-password"
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
												Signing in...
											</>
										) : (
											"Login"
										)}
										{lastLoginMethod === "email" && (
											<Badge
												variant="secondary"
												className="absolute right-0.5 top-2/12 -translate-y-1/2"
											>
												Last Used
											</Badge>
										)}
									</Button>
								</Field>

								<FieldSeparator>Or continue with</FieldSeparator>

								<Field>
									<SocialAuthButtons
										lastLoginMethod={lastLoginMethod}
										disabled={isLoading}
										callbackURL="/"
										onAuthStart={() => setSocialAuthPending(true)}
									/>
									<FieldDescription className="text-center mt-4">
										Don&apos;t have an account?{" "}
										<Link
											to="/sign-up"
											className="underline underline-offset-4 font-semibold"
										>
											Sign up
										</Link>
									</FieldDescription>
								</Field>
							</FieldGroup>
						</form>
					</CardContent>
				</Card>
			)}
		</FormWrapper>
	);
};
