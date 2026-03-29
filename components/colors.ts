export const colorMap: Record<string, { border: string; bg: string; text: string; badge: string }> = {
  teal:   { border: 'border-teal-500',   bg: 'bg-teal-500/10',   text: 'text-teal-400',   badge: 'bg-teal-500' },
  amber:  { border: 'border-amber-500',  bg: 'bg-amber-500/10',  text: 'text-amber-400',  badge: 'bg-amber-500' },
  red:    { border: 'border-red-500',     bg: 'bg-red-500/10',    text: 'text-red-400',    badge: 'bg-red-500' },
  green:  { border: 'border-green-500',   bg: 'bg-green-500/10',  text: 'text-green-400',  badge: 'bg-green-500' },
  blue:   { border: 'border-blue-500',    bg: 'bg-blue-500/10',   text: 'text-blue-400',   badge: 'bg-blue-500' },
  purple: { border: 'border-purple-500',  bg: 'bg-purple-500/10', text: 'text-purple-400', badge: 'bg-purple-500' },
  gray:   { border: 'border-gray-500',    bg: 'bg-gray-500/10',   text: 'text-gray-400',   badge: 'bg-gray-500' },
  cyan:   { border: 'border-cyan-500',    bg: 'bg-cyan-500/10',   text: 'text-cyan-400',   badge: 'bg-cyan-500' },
}

export const variantDefaults: Record<string, { color: string; icon: string }> = {
  tip:     { color: 'teal',   icon: '💡' },
  warning: { color: 'amber',  icon: '⚠️' },
  info:    { color: 'blue',   icon: 'ℹ️' },
  fun:     { color: 'purple', icon: '✨' },
}
