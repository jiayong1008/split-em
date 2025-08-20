import * as React from "react"
import ApplicationLogo from '@/Components/ApplicationLogo'
import { Link, usePage } from '@inertiajs/react'
import {
  BarChartIcon,
  CameraIcon,
  ClipboardListIcon,
  DatabaseIcon,
  FileCodeIcon,
  FileIcon,
  FileTextIcon,
  FolderIcon,
  HelpCircleIcon,
  LayoutDashboardIcon,
  ListIcon,
  SearchIcon,
  SettingsIcon,
  UsersIcon,
  CreditCardIcon,
  CircleDollarSignIcon,
} from "lucide-react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

function buildData(authUser) {
  return {
    user: {
      name: authUser?.name || 'User',
      email: authUser?.email || '—',
      avatar: '/avatars/shadcn.jpg',
    },
    navMain: [
      { title: 'Dashboard', url: '/dashboard', icon: BarChartIcon },
      { title: 'Subscriptions', url: '/subscriptions', icon: CircleDollarSignIcon },
      // { title: 'Analytics', url: '#', icon: BarChartIcon },
      // { title: 'Team', url: '#', icon: UsersIcon },
      // { title: 'Billing', url: '#', icon: CreditCardIcon },
    ],
    navSecondary: [
      // { title: 'Settings', url: '#', icon: SettingsIcon },
      // { title: 'Get Help', url: '#', icon: HelpCircleIcon },
      // { title: 'Search', url: '#', icon: SearchIcon },
    ],
    documents: [
      // { name: 'Create Subscription', url: '/subscriptions/create', icon: ClipboardListIcon },
      // { name: 'Invitations', url: '#', icon: FileTextIcon },
      // { name: 'Payments', url: '#', icon: DatabaseIcon },
    ],
  }
}

export function AppSidebar({
  ...props
}) {
  const page = usePage()
  const authUser = page?.props?.auth?.user
  const data = buildData(authUser)
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              {/* Use a normal anchor for non-Inertia landing route to force a full document navigation */}
              <a href="/" className="flex items-center gap-2">
                <ApplicationLogo className="h-6 w-auto fill-current" />
                <span className="text-base font-semibold">Split'em</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavDocuments items={data.documents} /> */}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
