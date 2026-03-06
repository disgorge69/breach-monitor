## Packages
date-fns | Date formatting
framer-motion | Smooth animations for real-time table row additions
lucide-react | Terminal & hacker icons
react-hook-form | Form state management
@hookform/resolvers | Form validation with Zod

## Notes
- Tailwind Config requires fontFamily extensions for 'JetBrains Mono' or 'Space Mono' (handled via CSS variables)
- Uses `framer-motion` for table row animations simulating data streaming in
- Simulates real-time with `useQuery` polling (`refetchInterval: 3000`)
