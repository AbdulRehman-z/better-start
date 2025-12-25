import { AlertCircleIcon } from "lucide-react";
import type { FC } from "react";
import { Button } from "../ui/button";

interface GlobalErrorProps {
	error?: Error & { digest?: string };
	onRetry?: () => void;
	title?: string;
	message?: string;
}

const GlobalError: FC<GlobalErrorProps> = ({
	error,
	onRetry,
	title = "Something went wrong",
	message = "An unexpected error occurred. Please try again or contact support if the issue persists.",
}) => {
	return (
		<div className="flex min-h-[400px] w-full flex-col items-center justify-center p-8 text-center sm:p-12">
			<div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-900">
				<AlertCircleIcon className="h-10 w-10 text-neutral-500 dark:text-neutral-400" />
			</div>

			<h1 className="text-2xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-50 sm:text-3xl">
				{title}
			</h1>

			<p className="mt-4 mb-8 max-w-md text-base leading-relaxed text-neutral-500 dark:text-neutral-400">
				{error?.message || message}
			</p>

			{error?.digest && (
				<code className="mb-8 rounded bg-neutral-100 px-2 py-1 text-xs text-neutral-500 dark:bg-neutral-900 dark:text-neutral-400">
					Error ID: {error.digest}
				</code>
			)}

			{onRetry && (
				<Button
					onClick={onRetry}
					className="inline-flex h-11 items-center justify-center rounded-full bg-neutral-950 px-8 text-sm font-medium text-neutral-50 transition-all hover:bg-neutral-800 active:scale-95 dark:bg-neutral-50 dark:text-neutral-950 dark:hover:bg-neutral-200"
				>
					<RotateCcw className="mr-2 h-4 w-4" />
					Try again
				</Button>
			)}
		</div>
	);
};

export default GlobalError;
