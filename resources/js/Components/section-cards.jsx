import { TrendingDownIcon, TrendingUpIcon, UsersIcon, MailIcon, CreditCardIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function SectionCards() {
  return (
    <div
      className="*:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6">
      {/* Active subscriptions */}
      <Card className="@container/card transition duration-200 hover:shadow-md">
        <CardHeader className="relative">
          <CardDescription>Active subscriptions</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            3
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <TrendingUpIcon className="size-3" />
              +1 this week
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Plan growth <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Active, joinable plans you manage
          </div>
        </CardFooter>
      </Card>
      {/* Members joined */}
      <Card className="@container/card transition duration-200 hover:shadow-md">
        <CardHeader className="relative">
          <CardDescription>Members joined</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            12
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <UsersIcon className="size-3" />
              +4 this month
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Growing your groups <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            New members across all plans
          </div>
        </CardFooter>
      </Card>
      {/* Monthly intake */}
      <Card className="@container/card transition duration-200 hover:shadow-md">
        <CardHeader className="relative">
          <CardDescription>Monthly intake (MYR)</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            256.00
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <CreditCardIcon className="size-3" />
              +12%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Paid by members <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">Latest 30 days</div>
        </CardFooter>
      </Card>
      {/* Pending invites */}
      <Card className="@container/card transition duration-200 hover:shadow-md">
        <CardHeader className="relative">
          <CardDescription>Pending invites</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            5
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <MailIcon className="size-3" />
              action needed
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Follow up to boost joins <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">Send reminder emails</div>
        </CardFooter>
      </Card>
    </div>
  );
}
