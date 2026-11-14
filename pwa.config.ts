import { defineConfig } from '@/types/config';

export default defineConfig({
  manifest: {
    id: '/',
    name: 'SD Academy',
    short_name: 'SD Academy',
    description: 'Prepare for MPPSC, UPSC IAS, MP Police SI and Constable, SSC and Banking exams with SD Academy. Access courses, live classes, mock tests and study resources.',
    dir: 'ltr',
    lang: 'en-IN',
    background_color: '#F8FAFC',
    theme_color: '#0F172A',
    display: 'standalone',
    orientation: 'natural',
    scope: '/',
    start_url: '/?utm_source=homescreen',
    prefer_related_applications: false,
    shortcuts: [
      {
        name: 'Courses',
        short_name: 'Courses',
        description: 'Explore SD Academy exam preparation courses.',
        url: '/#courses',
      },
      {
        name: 'Live Classes',
        short_name: 'Live Classes',
        description: 'Open SD Academy live classes.',
        url: '/#live-classes',
      },
      {
        name: 'Mock Tests',
        short_name: 'Mock Tests',
        description: 'Practice with SD Academy mock tests.',
        url: '/#mock-test',
      },
    ],
  },

  pwa: {
    logs: true,
  },

  // Blogspot subdomains must use the jsDelivr/CDN deployment method.
  // Service-worker offline pages and OneSignal push are not available on this method.
  oneSignal: {
    enabled: false,
    appId: '********-****-****-****-************',
    allowLocalhostAsSecureOrigin: true,
  },

  origin: 'https://sdacademyjhabua.blogspot.com',
});
