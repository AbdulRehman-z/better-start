import { DisableTwoFactorForm } from "./disable-two-factor-form";
import { ResponsiveDialog } from "./responsive-dialog";

type Props = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
};

export const DisableTwoFactorDialog = ({ open, onOpenChange }: Props) => {
	return (
		<ResponsiveDialog
			title="Disable Two-Factor Authentication"
			description="This will reduce your account security"
			open={open}
			onOpenChange={onOpenChange}
		>
			<DisableTwoFactorForm onSuccess={() => onOpenChange(false)} />
		</ResponsiveDialog>
	);
};
