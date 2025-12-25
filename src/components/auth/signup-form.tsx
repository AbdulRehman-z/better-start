import { useForm } from "@tanstack/react-form";
import { Link } from "@tanstack/react-router";
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
import { signupSchema } from "@/lib/schemas";
import { FormWrapper } from "../custom/forms-wrapper";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldSeparator,
} from "../ui/field";
import {
	PasswordInput,
	PasswordInputStrengthChecker,
} from "../ui/password-input";
import { EmailVerification } from "./email-verification";
import { SocialAuthButtons } from "./social-auth-buttons";

export const SignupForm = () => {
	const [socialAuthPending, setSocialAuthPending] = useState(false);
	const [showVerificationComponent, setShowVerificationComponent] =
		useState(false);

	const form = useForm({
		defaultValues: {
			fullName: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
		validators: {
			onSubmit: signupSchema,
		},
		onSubmit: async ({ value }) => {
			await authClient.signUp.email(
				{
					name: value.fullName,
					email: value.email,
					password: value.password,
				},
				{
					onSuccess: () => {
						setShowVerificationComponent(true);
						toast.success("Verification email sent!", {
							description:
								"Please check your mail and click the link to verify your email address.",
						});
					},
					onError: () => {
						toast.error("Signup failed!", {
							description: "Please try again.",
						});
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
						<CardTitle className="text-xl">Create your account</CardTitle>
						<CardDescription>
							Fill in the form below to create your account
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
									name="fullName"
									children={(field) => {
										const errors = field.state.meta.errors;
										const isInvalid =
											errors.length > 0 && field.state.meta.isTouched;

										return (
											<Field data-invalid={isInvalid}>
												<FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
												<Input
													disabled={isLoading}
													id={field.name}
													name={field.name}
													type="text"
													autoComplete="name"
													value={field.state.value}
													onBlur={field.handleBlur}
													onChange={(e) => field.handleChange(e.target.value)}
													aria-invalid={isInvalid}
													placeholder="John Doe"
												/>
												{isInvalid && <FieldError errors={errors} />}
											</Field>
										);
									}}
								/>

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
													placeholder="john@example.com"
												/>
												<FieldDescription>
													We will never share your email with anyone else.
												</FieldDescription>
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
													autoComplete="new-password"
												>
													<PasswordInputStrengthChecker />
												</PasswordInput>
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
									<Button type="submit" className="w-full" disabled={isLoading}>
										{form.state.isSubmitting ? (
											<>
												<Loader2 className="size-4 animate-spin" />
												Creating account...
											</>
										) : (
											"Sign Up"
										)}
									</Button>
								</Field>

								<FieldSeparator>Or continue with</FieldSeparator>

								<Field>
									<SocialAuthButtons
										disabled={isLoading}
										callbackURL="/"
										onAuthStart={() => setSocialAuthPending(true)}
									/>

									<FieldDescription className="text-center mt-4">
										Already have an account?{" "}
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
			)}
		</FormWrapper>
	);
};
