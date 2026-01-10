import { EnableTwoFactorForm } from "./enable-two-factor-form";
import { ResponsiveDialog } from "./responsive-dialog";

type Props = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
};

export const EnableTwoFactorDialog = ({ open, onOpenChange }: Props) => {
	return (
		<ResponsiveDialog
			title="Enable Two-Factor Authentication"
			description="Enable two-factor authentication to enhance your account security."
			open={open}
			onOpenChange={onOpenChange}
		>
			<EnableTwoFactorForm onSuccess={() => onOpenChange(false)} />
		</ResponsiveDialog>
	);
};
