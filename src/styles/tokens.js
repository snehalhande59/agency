// Global Design Tokens for AeroVoyage Luxe

export const tokens = {
  colors: {
    navy: {
      950: '#060B18', // Deep background
      900: '#0A1128', // Surface panel
      850: '#0F1A3A', // Glass container
      800: '#14214D', // Active surface
      700: '#1E3264', // Border soft
      600: '#2A437E', // Border accent
    },
    electric: {
      glow: '#00E5FF', // High-tech neon cyan
      300: '#7CD4FD',  // Soft highlight
      400: '#38BDF8',  // Primary accent text
      500: '#0284C7',  // Primary blue
      600: '#0066FF',  // Brand primary CTA
      700: '#0052CC',  // Button hover
    },
    status: {
      success: '#10B981', // Emerald for confirmed
      warning: '#F59E0B', // Amber for upcoming/alert
      info: '#38BDF8',    // Cyan for in-transit
      danger: '#F43F5E',  // Rose for cancelled
      simulated: '#A855F7' // Purple for demo/simulated badge
    },
    slate: {
      100: '#F1F5F9',
      200: '#E2E8F0',
      300: '#CBD5E1',
      400: '#94A3B8',
      500: '#64748B',
      700: '#334155',
      800: '#1E293B',
      900: '#0F172A'
    }
  },
  shadows: {
    glowSm: '0 0 15px -3px rgba(0, 102, 255, 0.35)',
    glow: '0 0 25px -5px rgba(0, 102, 255, 0.45)',
    glowLg: '0 0 40px -8px rgba(0, 229, 255, 0.4)',
    glass: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
    glassCard: '0 10px 40px -10px rgba(0, 10, 30, 0.5)'
  },
  typography: {
    fontSans: "'Plus Jakarta Sans', -apple-system, sans-serif",
    fontDisplay: "'Outfit', 'Plus Jakarta Sans', sans-serif",
  },
  radius: {
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '2rem',
    full: '9999px'
  }
};
