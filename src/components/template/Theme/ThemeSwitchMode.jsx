import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/context/theme.jsx"
import { Switch } from "@/components/ui/switch"

export function ThemeSwitchMode() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center space-x-2">
      <Sun className="h-4 w-4" />
      <Switch checked={theme == "dark"} onCheckedChange={(e) => e ? setTheme("dark") : setTheme("light")} />
      <Moon className="mr-2 h-4 w-4" />
    </div>
  )
}
