export const GA_TRACKING_ID = 'AW-16704672073';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

// Відправка подій перегляду сторінки
export const pageview = (url: string) => {
  if (window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// Відправка користувацьких подій
interface GTagEvent {
  action: string;
  category: string;
  label: string;
  value: number;
}

export const event = ({ action, category, label, value }: GTagEvent) => {
  if (window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};
