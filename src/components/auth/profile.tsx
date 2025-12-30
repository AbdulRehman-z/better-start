import { useState } from "react";
import { UpdateProfileDialog } from "../custom/update-profile-dialog";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

type ProfileProps = {
	user: {
		id: string;
		email: string;
		name: string;
		image?: string | null | undefined;
	};
};

export const ProfileDetails = ({ user }: ProfileProps) => {
	const [open, onOpenChange] = useState(false);

	return (
		<div className="flex flex-col justify-between gap-y-5">
			<h1 className="font-bold text-xl">Profile</h1>
			<div className="space-y-10">
				<div className="flex flex-row items-center gap-x-4">
					<Avatar className="size-16">
						<AvatarImage src={user.image ?? ""} />
					</Avatar>
					<p className="text-muted-foreground">{user.name}</p>
				</div>
				<div>
					<UpdateProfileDialog open={open} onOpenChange={onOpenChange} />
					<Button
						size="lg"
						variant="outline"
						onClick={() => onOpenChange(true)}
					>
						Update Profile
					</Button>
				</div>
			</div>
		</div>
	);
};
