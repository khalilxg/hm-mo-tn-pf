"use client"

import { useEffect, useState } from "react"
import { GraduationCap } from "lucide-react"

/**
 * A small pill that floats just above the AnythingLLM chat bubble
 * (bottom-right corner), so the corner reads as "this is the students' quick
 * test chat" and repeats the Arabic-only reminder right where people are
 * about to start typing. Auto-hides after a few seconds so it doesn't get in
 * the way, but stays reachable since it re-appears if the page is reloaded.
 */
export function WidgetLanguageBadge() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 9000)
    return () => clearTimeout(timer)
  }, [])
}
