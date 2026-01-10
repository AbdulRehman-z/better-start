import { useSuspenseQuery } from "@tanstack/react-query";
import {
	Calendar,
	Clock,
	HammerIcon,
	LockKeyhole,
	Mail,
	User,
} from "lucide-react";
import { useState } from "react";
import { getUserDetailsFn } from "@/functions/get-user-details-fn";
import { formatDate } from "@/lib/utils";
import { ChangeEmailDialog } from "../custom/change-email-dialog";
import { ChangePasswordDialog } from "../custom/change-password-dialog";
import { DisableTwoFactorDialog } from "../custom/disable-two-factor-dialog";
import { EnableTwoFactorDialog } from "../custom/enable-two-factor-dialog";
import { UpdateProfileDialog } from "../custom/update-profile-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";

export const ProfileDetailsContainer = () => {
	const [updateProfileOpen, onUpdateProfileOpenChange] = useState(false);
	const [emailOpen, onEmailOpenChange] = useState(false);
	const [passwordOpen, onPasswordOpenChange] = useState(false);
	const [enable2FAOpen, setEnable2FAOpen] = useState(false);
	const [disable2FAOpen, setDisable2FAOpen] = useState(false);
	const {
		data: user,
		error,
		isError,
	} = useSuspenseQuery({
		queryKey: ["user-details"],
		queryFn: getUserDetailsFn,
		staleTime: 1000 * 60 * 10, // means 5 minutes
	});

	const getInitials = (name: string) => {
		return name
			.split(" ")
			.map((n) => n[0])
			.join("")
			.toUpperCase()
			.slice(0, 2);
	};

	if (isError) {
		return (
			<div className="flex items-center justify-center min-h-100">
				<div className="text-center space-y-2">
					<h3 className="text-lg font-semibold text-destructive">
						Error loading profile
					</h3>
					<p className="text-sm text-muted-foreground">{error?.message}</p>
				</div>
			</div>
		);
	}

	return (
		<div className="max-w-4xl space-y-5 py-10">
			{/* Header Card */}
			<Card className="bg-transparent border border-dashed">
				<CardContent className="pt-6">
					<div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
						<Avatar className="size-24 border-4 border-background">
							<AvatarImage src={user.image ?? ""} alt={user.name} />
							<AvatarFallback className="text-2xl font-semibold">
								{getInitials(user.name)}
							</AvatarFallback>
						</Avatar>

						<div className="flex-1 space-y-3">
							<div>
								<h2 className="text-2xl font-bold tracking-tight">
									{user.name}
								</h2>
								<p className="text-muted-foreground flex items-center gap-2 mt-1">
									<Mail className="size-4" />
									{user.email}
								</p>
							</div>

							<div className="flex flex-wrap gap-2">
								{/* UpdateProfileDialog */}
								<UpdateProfileDialog
									open={updateProfileOpen}
									onOpenChange={onUpdateProfileOpenChange}
								/>
								<Button onClick={() => onUpdateProfileOpenChange(true)}>
									<User className="size-4" />
									Edit Profile
								</Button>

								{/* ChangeEmailDialog */}
								<ChangeEmailDialog
									open={emailOpen}
									onOpenChange={onEmailOpenChange}
								/>
								<Button
									variant="outline"
									onClick={() => onEmailOpenChange(true)}
								>
									<Mail className="size-4" />
									Change Email
								</Button>

								{/* ChangePasswordDialog */}
								<ChangePasswordDialog
									open={passwordOpen}
									onOpenChange={onPasswordOpenChange}
								/>
								<Button
									variant="outline"
									onClick={() => onPasswordOpenChange(true)}
								>
									<LockKeyhole className="size-4" />
									Change Password
								</Button>

								{/* TwoFactorDialog */}
								<Button
									variant="outline"
									onClick={() =>
										user.twoFactorEnabled
											? setDisable2FAOpen(true)
											: setEnable2FAOpen(true)
									}
								>
									<HammerIcon className="size-4" />
									{user.twoFactorEnabled ? "Disable 2-FA" : "Enable 2-FA"}
								</Button>

								<EnableTwoFactorDialog
									open={enable2FAOpen}
									onOpenChange={setEnable2FAOpen}
								/>
								<DisableTwoFactorDialog
									open={disable2FAOpen}
									onOpenChange={setDisable2FAOpen}
								/>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Account Information Card */}
			<Card>
				<CardHeader>
					<CardTitle>Account Information</CardTitle>
					<CardDescription>
						View your account details and activity timeline
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid gap-6 sm:grid-cols-2">
						{/* Email Address */}
						<div className="space-y-2">
							<div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
								<Mail className="size-4" />
								<span>Email Address</span>
							</div>
							<div className="flex items-center gap-2">
								<p className="text-base font-medium">{user.email}</p>
								<Badge variant="secondary" className="text-xs">
									Verified
								</Badge>
							</div>
						</div>

						{/* Username */}
						<div className="space-y-2">
							<div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
								<User className="size-4" />
								<span>Display Name</span>
							</div>
							<p className="text-base font-medium">{user.name}</p>
						</div>

						{/* Created At */}
						<div className="space-y-2">
							<div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
								<Calendar className="size-4" />
								<span>Account Created</span>
							</div>
							<p className="text-base font-medium">
								{formatDate(user.createdAt)}
							</p>
						</div>

						{/* Last Updated */}
						<div className="space-y-2">
							<div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
								<Clock className="size-4" />
								<span>Last Updated</span>
							</div>
							<p className="text-base font-medium">
								{formatDate(user.updatedAt)}
							</p>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};
