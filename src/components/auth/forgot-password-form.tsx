import { useForm } from "@tanstack/react-form";
import { Link } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button, buttonVariants } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { env } from "@/env";
import { authClient } from "@/lib/auth-client";
import { forgotPasswordSchema } from "@/lib/schemas";
import { FormWrapper } from "../custom/forms-wrapper";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "../ui/field";

export const ForgotPasswordForm = () => {
	const [isSent, setIsSent] = useState(false);

	const form = useForm({
		defaultValues: {
			email: "",
		},
		validators: {
			onSubmit: forgotPasswordSchema,
		},
		onSubmit: async ({ value }) => {
			await authClient.requestPasswordReset(
				{
					email: value.email,
					redirectTo: `http://localhost:3000/reset-password`,
				},
				{
					onSuccess: () => {
						setIsSent(true);
						toast.success("Password reset email sent");
					},
					onError: (ctx) => {
						toast.error(ctx.error.message || "Something went wrong");
					},
				},
			);
		},
	});

	const isSubmitting = form.state.isSubmitting;

	return (
		<FormWrapper>
			<Card className="gap-y-5">
				<CardHeader className="text-center">
					<CardTitle className="text-xl">Forgot Password</CardTitle>
					<CardDescription>
						{isSent
							? "Check your email for a link to reset your password."
							: "Enter your email below to receive a password reset link"}
					</CardDescription>
				</CardHeader>
				<CardContent>
					{!isSent ? (
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
													disabled={isSubmitting}
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

								<Field>
									<Button
										disabled={isSubmitting}
										type="submit"
										className="w-full relative"
									>
										{isSubmitting ? (
											<>
												<Loader2 className="size-4 animate-spin" />
												Sending link...
											</>
										) : (
											"Send reset link"
										)}
									</Button>
								</Field>

								<Field>
									<FieldDescription className="text-center mt-4">
										Remember your password?{" "}
										<Link
											className="underline underline-offset-4 font-semibold"
											to="/login"
										>
											Login
										</Link>
									</FieldDescription>
								</Field>
							</FieldGroup>
						</form>
					) : (
						<div className="flex flex-col">
							<Link
								className={buttonVariants({
									variant: "default",
								})}
								to="/login"
							>
								Back to Login
							</Link>
						</div>
					)}
				</CardContent>
			</Card>
		</FormWrapper>
	);
};
