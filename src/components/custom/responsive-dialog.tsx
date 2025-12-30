import type { ReactNode } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "../ui/dialog";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
} from "../ui/drawer";

type ResponsiveDialogProps = {
	title: string;
	description: string;
	children: ReactNode;
	open: boolean;
	onOpenChange: (open: boolean) => void;
};

export const ResponsiveDialog = ({
	description,
	title,
	children,
	open,
	onOpenChange,
}: ResponsiveDialogProps) => {
	const isMobile = useIsMobile();

	if (isMobile) {
		return (
			<Drawer open={open} onOpenChange={onOpenChange}>
				<DrawerContent>
					<DrawerHeader>
						<DrawerTitle>{title}</DrawerTitle>
						<DrawerDescription>{description}</DrawerDescription>
					</DrawerHeader>
					<div className="p-4">{children}</div>
				</DrawerContent>
			</Drawer>
		);
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>
				{children}
			</DialogContent>
		</Dialog>
	);
};
