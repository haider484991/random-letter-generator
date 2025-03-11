'use client';

import { useEffect, useRef } from 'react';

interface AdBannerProps {
  adSlot: string;
  adFormat?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  style?: React.CSSProperties;
  className?: string;
}

// Define the type for the global adsbygoogle array
declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export default function AdBanner({ 
  adSlot, 
  adFormat = 'auto', 
  style = {}, 
  className = '' 
}: AdBannerProps) {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      // Check if we're in the browser and if adsbygoogle is defined
      if (typeof window !== 'undefined') {
        // Wait for the adsense script to load completely
        const pushAd = () => {
          try {
            // Only push if adsbygoogle is defined
            if (window.adsbygoogle && Array.isArray(window.adsbygoogle)) {
              (window.adsbygoogle = window.adsbygoogle || []).push({});
            } else {
              // If not defined yet, try again after a short delay
              setTimeout(pushAd, 200);
            }
          } catch (error) {
            console.error('AdSense push error:', error);
          }
        };

        // Start the process
        pushAd();
      }
    } catch (error) {
      console.error('AdSense initialization error:', error);
    }
  }, []);

  // Define ad sizes based on format
  const getAdSize = () => {
    switch (adFormat) {
      case 'rectangle':
        return { width: 300, height: 250 };
      case 'horizontal':
        return { width: 728, height: 90 };
      case 'vertical':
        return { width: 160, height: 600 };
      case 'auto':
      default:
        return { width: 'auto', height: 'auto' };
    }
  };

  const adSize = getAdSize();

  return (
    <div 
      ref={adRef}
      className={`ad-container my-6 mx-auto text-center overflow-hidden ${className}`}
      style={{
        minHeight: adSize.height,
        width: adSize.width,
        ...style
      }}
    >
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          width: adSize.width === 'auto' ? '100%' : adSize.width,
          height: adSize.height === 'auto' ? 'auto' : adSize.height,
        }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // Replace with your AdSense Publisher ID
        data-ad-slot={adSlot}
        data-ad-format={adFormat === 'auto' ? 'auto' : ''}
        data-full-width-responsive="true"
      />
      <div className="text-xs text-gray-500 mt-1">Advertisement</div>
    </div>
  );
} 