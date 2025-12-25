import { z } from "zod";

export const emailSchema = z.email("Please enter a valid email address");

export const passwordSchema = z
	.string()
	.min(1, "Password is required")
	.min(8, "Password must be at least 8 characters");

export const nameSchema = z
	.string()
	.min(1, "Name is required")
	.min(2, "Name must be at least 2 characters")
	.max(100, "Name must be less than 100 characters");

export const loginSchema = z.object({
	email: emailSchema,
	password: passwordSchema,
});

export const signupSchema = z
	.object({
		fullName: nameSchema,
		email: emailSchema,
		password: passwordSchema,
		confirmPassword: z.string().min(1, "Please confirm your password"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

export const forgotPasswordSchema = z.object({
	email: emailSchema,
});

export const resetPasswordSchema = z
	.object({
		password: passwordSchema,
		confirmPassword: z.string().min(1, "Please confirm your password"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

// ============================================================================
// Type Exports - Inferred types from schemas
// ============================================================================

export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
