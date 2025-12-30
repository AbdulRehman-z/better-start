import { useForm } from "@tanstack/react-form";
import { Loader2, Upload, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

type Props = {
	onSuccess: () => void;
};

const updateProfileSchema = z
	.object({
		username: z
			.string()
			.min(2, { message: "Username must be at least 2 characters" })
			.max(100, { message: "Username must be less than 100 characters" })
			.optional()
			.or(z.literal("")),
		image: z
			.url({ message: "Must be a valid URL" })
			.optional()
			.or(z.literal("")),
	})
	.refine((data) => data.username || data.image, {
		message: "At least one field must be updated",
	});

// Image validation constants
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
	"image/jpeg",
	"image/jpg",
	"image/png",
	"image/webp",
	"image/gif",
];

export const UpdateProfileForm = ({ onSuccess }: Props) => {
	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const [uploadingImage, setUploadingImage] = useState(false);

	const form = useForm({
		defaultValues: {
			username: "",
			image: "",
		},
		validators: {
			onSubmit: updateProfileSchema,
		},
		onSubmit: async ({ value }) => {
			// Only send fields that have values
			const updateData: { name?: string; image?: string } = {};

			if (value.username && value.username.trim()) {
				updateData.name = value.username.trim();
			}

			if (value.image && value.image.trim()) {
				updateData.image = value.image.trim();
			}

			// Check if there's anything to update
			if (Object.keys(updateData).length === 0) {
				toast.error("Please provide at least one field to update");
				return;
			}

			await authClient.updateUser(updateData, {
				onSuccess: () => {
					toast.success("Profile updated successfully");
					onSuccess();
				},
				onError: (ctx) => {
					toast.error(ctx.error.message || "Failed to update profile");
				},
			});
		},
	});

	// Handle file upload
	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		// Your existing validation...
		if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
			toast.error("Invalid file type. Please upload JPG, PNG, WEBP, or GIF");
			return;
		}

		if (file.size > MAX_FILE_SIZE) {
			toast.error("File too large. Maximum size is 5MB");
			return;
		}

		setUploadingImage(true);

		try {
			// Upload to Cloudinary
			const formData = new FormData();
			formData.append("file", file);
			formData.append("upload_preset", "user_profile");

			const response = await fetch(
				`https://api.cloudinary.com/v1_1/your-cloud-name/image/upload`,
				{
					method: "POST",
					body: formData,
				},
			);

			const data = await response.json();

			// Set the Cloudinary URL
			setImagePreview(data.secure_url);
			form.setFieldValue("image", data.secure_url);
			toast.success("Image uploaded successfully");
		} catch (error) {
			toast.error("Failed to upload image");
			console.error(error);
		} finally {
			setUploadingImage(false);
		}
	};

	const removeImage = () => {
		setImagePreview(null);
		form.setFieldValue("image", "");
	};

	const isLoading = form.state.isSubmitting;

	return (
		<Card>
			<CardContent className="pt-6">
				<form
					onSubmit={(e) => {
						e.preventDefault();
						e.stopPropagation();
						form.handleSubmit();
					}}
				>
					<FieldGroup>
						{/* Image Upload Field */}
						<Field>
							<FieldLabel>Profile Picture</FieldLabel>
							<div className="flex items-center gap-4">
								<Avatar className="h-20 w-20">
									<AvatarImage src={imagePreview || undefined} />
								</Avatar>

								<div className="flex flex-col gap-2">
									<div className="flex gap-2">
										<Button
											type="button"
											variant="outline"
											size="sm"
											disabled={isLoading || uploadingImage}
											onClick={() =>
												document.getElementById("image-upload")?.click()
											}
										>
											{uploadingImage ? (
												<>
													<Loader2 className="size-4 animate-spin mr-2" />
													Uploading...
												</>
											) : (
												<>
													<Upload className="size-4 mr-2" />
													Upload Image
												</>
											)}
										</Button>

										{imagePreview && (
											<Button
												type="button"
												variant="outline"
												size="sm"
												disabled={isLoading || uploadingImage}
												onClick={removeImage}
											>
												<X className="size-4 mr-2" />
												Remove
											</Button>
										)}
									</div>

									<p className="text-xs text-muted-foreground">
										JPG, PNG, WEBP or GIF (max 5MB)
									</p>
								</div>

								<input
									id="image-upload"
									type="file"
									accept={ACCEPTED_IMAGE_TYPES.join(",")}
									className="hidden"
									onChange={handleFileChange}
									disabled={isLoading || uploadingImage}
								/>
							</div>
						</Field>

						{/* Username Field */}
						<form.Field
							name="username"
							children={(field) => {
								const errors = field.state.meta.errors;
								const isInvalid =
									errors.length > 0 && field.state.meta.isTouched;
								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>
											Username (Optional)
										</FieldLabel>
										<Input
											disabled={isLoading}
											id={field.name}
											name={field.name}
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											aria-invalid={isInvalid}
											placeholder="Enter your username"
										/>
										{isInvalid && <FieldError errors={errors} />}
									</Field>
								);
							}}
						/>

						{/* Submit Button */}
						<Field>
							<Button
								disabled={isLoading || uploadingImage}
								type="submit"
								className="w-full"
							>
								{isLoading ? (
									<>
										<Loader2 className="size-4 animate-spin mr-2" />
										Updating...
									</>
								) : (
									"Update Profile"
								)}
							</Button>
						</Field>
					</FieldGroup>
				</form>
			</CardContent>
		</Card>
	);
};
