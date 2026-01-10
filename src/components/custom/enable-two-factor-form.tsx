import { useForm } from "@tanstack/react-form";
import { useRouteContext } from "@tanstack/react-router";
import {
	CheckCircleIcon,
	CopyCheckIcon,
	CopyIcon,
	Loader2,
	Loader2Icon,
} from "lucide-react";
import { useState, useTransition } from "react";
import QRCode from "react-qr-code";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { authClient } from "@/lib/auth-client";

export function EnableTwoFactorForm() {
	const { queryClient } = useRouteContext({ from: "/_protected/profile/" });
	const [loading, startTransition] = useTransition();
	const [step, setStep] = useState<"enable" | "verify">("enable");
	const [totpURI, setTotpURI] = useState<string>("");
	const [backupCodes, setBackupCodes] = useState<string[]>([]);
	const [showBackupCodes, setShowBackupCodes] = useState(false);
	const [isBackupCodesCopied, setIsBackupCodesCopied] = useState(false);

	const enableForm = useForm({
		defaultValues: {
			password: "",
		},
		onSubmit: async ({ value }) => {
			startTransition(async () => {
				await authClient.twoFactor.enable(
					{ password: value.password },
					{
						onSuccess(context) {
							setTotpURI(context.data.totpURI);
							setStep("verify");
							setBackupCodes(context.data.backupCodes);
							toast.success("Scan the QR code with your authenticator app");
						},
						onError(context) {
							toast.error(
								context.error.message || "Failed to generate QR code",
							);
						},
					},
				);
			});
		},
	});

	const verifyForm = useForm({
		defaultValues: {
			code: "",
		},
		onSubmit: async ({ value }) => {
			startTransition(async () => {
				await authClient.twoFactor.verifyTotp(
					{ code: value.code },
					{
						onSuccess() {
							toast.success("Two-factor authentication enabled successfully");
							setShowBackupCodes(true);
							queryClient.invalidateQueries({ queryKey: ["user-details"] });
						},
						onError(context) {
							toast.error(context.error.message);
						},
					},
				);
			});
		},
	});

	if (step === "verify") {
		return (
			<div className="flex flex-col gap-4">
				<div className="flex items-center justify-center p-4">
					<QRCode
						value={totpURI}
						size={250}
						title="QR code"
						className="bg-white p-4"
					/>
				</div>

				<p className="text-sm text-muted-foreground text-center">
					Scan the QR code with your authenticator app and paste the 6-digit
					code below
				</p>

				<form
					onSubmit={(e) => {
						e.preventDefault();
						verifyForm.handleSubmit();
					}}
					className="flex flex-col gap-4"
				>
					<FieldGroup>
						<verifyForm.Field
							name="code"
							validators={{
								onSubmit: z.string().length(6, "Code must be 6 digits"),
							}}
							children={(field) => (
								<Field data-invalid={field.state.meta.errors.length > 0}>
									<FieldLabel htmlFor="verify-code">
										Verification Code
									</FieldLabel>
									<Input
										id="verify-code"
										name={field.name}
										value={field.state.value}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
										placeholder="Enter 6-digit code"
										autoComplete="off"
										maxLength={6}
									/>
									{field.state.meta.errors.length > 0 && (
										<FieldError errors={field.state.meta.errors} />
									)}
								</Field>
							)}
						/>
					</FieldGroup>
					<Button type="submit" disabled={loading || showBackupCodes}>
						{loading ? (
							<Loader2Icon className="animate-spin size-4" />
						) : (
							"Verify & Enable"
						)}
					</Button>
				</form>

				{backupCodes.length > 0 && showBackupCodes && (
					<div className="mt-4 p-4 border rounded-lg">
						<h3 className="font-bold text-base text-green-600 mb-2 flex items-center gap-2">
							<CheckCircleIcon className="size-5" />
							Verified Successfully
						</h3>
						<p className="text-sm text-muted-foreground mb-3">
							Now save these backup codes securely. Each can only be used once
							when you can have access to your authenticator app. Copy them and
							store them in a secure storage.
						</p>
						<div className="grid grid-cols-2 gap-2">
							{backupCodes.map((code, index) => (
								<code key={index} className="text-sm p-2 bg-muted rounded">
									{code}
								</code>
							))}
						</div>
						<div className="flex justify-end mt-3">
							<Button
								onClick={() => {
									navigator.clipboard.writeText(backupCodes.join("\n"));
									setIsBackupCodesCopied(true);
									setTimeout(() => setIsBackupCodesCopied(false), 1000);
								}}
							>
								{isBackupCodesCopied ? (
									<>
										<CopyCheckIcon />
										Copied!
									</>
								) : (
									<>
										<CopyIcon />
										Copy backup codes
									</>
								)}
							</Button>
						</div>
					</div>
				)}
			</div>
		);
	}

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				enableForm.handleSubmit();
			}}
			className="flex flex-col gap-4"
		>
			<FieldGroup>
				<enableForm.Field
					name="password"
					children={(field) => (
						<Field data-invalid={field.state.meta.errors.length > 0}>
							<FieldLabel htmlFor="enable-password">Password</FieldLabel>
							<PasswordInput
								id="enable-password"
								name={field.name}
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
								placeholder="Enter your password"
								autoComplete="current-password"
							/>
							{field.state.meta.errors.length > 0 && (
								<FieldError errors={field.state.meta.errors} />
							)}
						</Field>
					)}
				/>
			</FieldGroup>
			<Button className="" type="submit" disabled={loading}>
				{loading ? (
					<Loader2Icon className="animate-spin size-4" />
				) : (
					"Enable 2-FA"
				)}
			</Button>
		</form>
	);
}
