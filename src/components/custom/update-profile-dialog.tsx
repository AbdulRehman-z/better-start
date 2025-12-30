import { ResponsiveDialog } from "./responsive-dialog";
import { UpdateProfileForm } from "./update-profile-form";

type Props = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
};

export const UpdateProfileDialog = ({ open, onOpenChange }: Props) => {
	return (
		<ResponsiveDialog
			title="Update Profile"
			description="Update your personal profile below"
			open={open}
			onOpenChange={onOpenChange}
		>
			<UpdateProfileForm onSuccess={() => onOpenChange(false)} />
		</ResponsiveDialog>
	);
};
