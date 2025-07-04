import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.bf4b88edcb80431482460714fdc571a8',
  appName: 'VineManager - Grape Farm Management',
  webDir: 'dist',
  server: {
    url: 'https://bf4b88ed-cb80-4314-8246-0714fdc571a8.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#6B46C1',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true
    }
  }
};

export default config;