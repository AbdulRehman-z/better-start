import {
	KeyIcon,
	Link2Icon,
	ShieldIcon,
	Trash2Icon,
	UserIcon,
} from "lucide-react";

export const menuItems = [
	{
		title: "Account",
		path: "/account",
		icon: UserIcon,
	},
	{
		title: "Security",
		path: "/security",
		icon: ShieldIcon,
	},
	{
		title: "Sessions",
		path: "/sessions",
		icon: KeyIcon,
	},
	{
		title: "Accounts",
		path: "/accounts",
		icon: Link2Icon,
	},
	{
		title: "Danger",
		path: "/danger",
		icon: Trash2Icon,
	},
];
