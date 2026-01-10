import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
	title?: string;
	className?: string;
	children: ReactNode;
};

export const FormWrapper = ({ title, children, className }: Props) => {
	return (
		<div className="flex flex-col relative min-w-lg">
			{title && (
				<span className="absolute text-yellow-600 -top-8 left-0 text-sm font-light">
					{title}
				</span>
			)}
			<div
				className={cn(
					"border border-dashed border-spacing-20 py-7 px-10",
					className,
				)}
			>
				{children}
			</div>
		</div>
	);
};
