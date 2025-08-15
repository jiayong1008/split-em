import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"

export function ModeToggle() {
  const { setTheme } = useTheme()
  return (
    <div className="inline-flex items-center gap-1">
      <Button variant="outline" size="icon" onClick={() => setTheme('light')} aria-label="Light mode">
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      </Button>
      <Button variant="outline" size="icon" onClick={() => setTheme('dark')} aria-label="Dark mode">
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      </Button>
      <Button variant="outline" size="icon" onClick={() => setTheme('system')} aria-label="System theme">
        <span className="text-xs">Sys</span>
      </Button>
    </div>
  )
}


