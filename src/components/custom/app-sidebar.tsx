import { Link, useRouterState } from "@tanstack/react-router";
import { Image } from "@unpic/react";
import { menuItems } from "@/lib/constants";
import { cn } from "@/lib/utils";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "../ui/sidebar";
import { NavUser } from "./nav-user";

export const AppSidebar = () => {
	const router = useRouterState();
	const pathName = router.location.pathname;

	return (
		<Sidebar collapsible="icon" variant="floating">
			<div className="px-2 pt-5 pb-2 flex flex-col justify-between gap-y-3 flex-1">
				<SidebarHeader className="tracking-tighter uppercase font-bold">
					<Link to="/profile" className="flex items-center gap-2">
						<Image
							src="/logo.svg"
							height={16}
							width={16}
							alt="flowcat-logo"
							className="text-primary"
						/>
						<span>Flowcat Inc.</span>
					</Link>
				</SidebarHeader>
				<SidebarContent className="mt-3">
					<SidebarMenu className="gap-y-1">
						{menuItems.map((item) => (
							<SidebarMenuItem key={item.title}>
								<SidebarMenuButton
									className="h-10 pl-3 transition-colors duration-200 hover:text-primary [&:hover_svg]:motion-preset-shake"
									isActive={
										pathName === item.path || pathName.includes(item.path)
									}
									tooltip={item.title}
									render={
										<Link to={item.path} preload="render">
											<item.icon
												className={cn(
													"motion-opacity-in text-muted-foreground",
													pathName === item.path || pathName.includes(item.path)
														? "text-primary"
														: "",
												)}
											/>
											<span
												className={cn(
													"font-medium",
													pathName === item.path || pathName.includes(item.path)
														? "text-primary"
														: "text-sidebar-foreground/60",
												)}
											>
												{item.title}
											</span>
										</Link>
									}
								/>
							</SidebarMenuItem>
						))}
					</SidebarMenu>
				</SidebarContent>
				<SidebarFooter>
					<NavUser />
				</SidebarFooter>
			</div>
		</Sidebar>
	);
};
