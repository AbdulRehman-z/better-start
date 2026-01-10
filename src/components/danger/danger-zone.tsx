import {
	AlertTriangle,
	CopyCheckIcon,
	CopyIcon,
	ShieldAlert,
	Trash2Icon,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DeleteAccountDialog } from "./delete-account-dialog";

export function DangerZone() {
	const [confirmText, setConfirmText] = useState("");
	const [isDeleting, setIsDeleting] = useState(false);
	const [isCopied, setIsCopied] = useState(false);
	const [open, onOpenChange] = useState(false);

	const handleCopy = () => {
		navigator.clipboard.writeText("DELETE MY ACCOUNT");
		setIsCopied(true);
		setTimeout(() => setIsCopied(false), 2000);
	};

	const handleDeleteAccount = async () => {
		setIsDeleting(true);
		await new Promise((resolve) => setTimeout(resolve, 2000));
		console.log("[v0] Account deleted");
		window.location.href = "/";
	};

	return (
		<div className="py-10 max-w-4xl space-y-12">
			<section className="space-y-6">
				<div className="flex items-center gap-3 text-destructive">
					<AlertTriangle className="h-6 w-6" />
					<h2 className="font-bold text-xl uppercase tracking-tight">
						Irreversible Actions
					</h2>
				</div>

				<div className="border border-destructive/30 bg-destructive/5 p-6 space-y-4">
					<div className="space-y-2">
						<h3 className="font-bold uppercase tracking-widest text-sm flex items-center gap-2">
							<ShieldAlert className="h-4 w-4" />
							Delete Account
						</h3>
						<p className="text-muted-foreground font-mono text-sm leading-relaxed">
							Once you delete your account, there is no going back. All your
							data, sessions, and connected social accounts will be permanently
							purged from our systems. This action is immediate and
							irreversible.
						</p>
					</div>

					<div className="pt-4 space-y-4">
						<p className="font-mono text-[12px] uppercase tracking-widest text-muted-foreground">
							To confirm, type
							<span className="text-foreground font-bold italic px-2">
								<Button
									className="peer"
									variant="ghost"
									size="icon-xs"
									onClick={handleCopy}
								>
									{isCopied ? (
										<CopyCheckIcon className="text-green-600" />
									) : (
										<CopyIcon />
									)}
								</Button>
								<strong className="peer-hover:bg-muted transition-all p-1 py-1.5 rounded-sm bg-none">
									"DELETE MY ACCOUNT"
								</strong>
							</span>{" "}
							below
						</p>
						<Input
							value={confirmText}
							onChange={(e) => setConfirmText(e.target.value)}
							placeholder="DELETE MY ACCOUNT"
							className="rounded-none border-destructive/20 focus-visible:ring-destructive font-mono text-sm uppercase"
						/>

						<DeleteAccountDialog open={open} onOpenChange={onOpenChange} />
						<Button
							onClick={() => onOpenChange(true)}
							variant="destructive"
							disabled={confirmText !== "DELETE MY ACCOUNT"}
							className="w-full font-bold uppercase tracking-widest h-12"
						>
							<Trash2Icon className="size-4" />
							Finalize Account Deletion
						</Button>
					</div>
				</div>
			</section>

			<div className="pt-12 border-t">
				<p className="text-[10px] font-mono text-muted-foreground uppercase leading-relaxed text-center">
					{
						"Flowcat Inc. Security Protocol v4.0 // Data retention: 0 days after deletion // Compliance: GDPR/CCPA"
					}
				</p>
			</div>
		</div>
	);
}
