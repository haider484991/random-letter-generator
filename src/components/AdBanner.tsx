'use client';

import { useEffect, useRef, useState } from 'react';
import ClientOnly from './ClientOnly';

interface AdBannerProps {
  adSlot: string;
  adFormat?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  style?: React.CSSProperties;
  className?: string;
}

export default function AdBanner({ 
  adSlot, 
  adFormat = 'auto', 
  style = {}, 
  className = '' 
}: AdBannerProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const [adPushed, setAdPushed] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    // Function to measure container width
    const updateContainerWidth = () => {
      if (adRef.current) {
        setContainerWidth(adRef.current.clientWidth);
      }
    };

    // Update width on mount and on resize
    updateContainerWidth();
    window.addEventListener('resize', updateContainerWidth);

    return () => {
      window.removeEventListener('resize', updateContainerWidth);
    };
  }, []);

  useEffect(() => {
    try {
      // Check if we're in the browser and if adsbygoogle is defined
      if (typeof window !== 'undefined' && !adPushed && containerWidth > 0) {
        const pushAd = () => {
          try {
            // Make sure the container has sufficient width before pushing the ad
            if (containerWidth > 200) {
              // adsbygoogle is defined in global.d.ts
              (window.adsbygoogle = window.adsbygoogle || []).push({});
              setAdPushed(true);
            } else {
              console.log(`Ad container too small (${containerWidth}px), not pushing ad`);
            }
          } catch (error) {
            console.error('Error pushing ad:', error);
          }
        };

        // Push the ad after a short delay to ensure the DOM is ready
        const timer = setTimeout(() => {
          pushAd();
        }, 1000); // Increased delay to ensure DOM is fully rendered

        return () => clearTimeout(timer);
      }
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, [adPushed, containerWidth]);

  // Function to determine ad size class based on format
  const getAdSize = () => {
    switch (adFormat) {
      case 'rectangle':
        return 'min-h-[250px] min-w-[300px]';
      case 'horizontal':
        return 'min-h-[90px] min-w-[320px] md:min-w-[728px]';
      case 'vertical':
        return 'min-h-[250px] md:min-h-[600px] min-w-[160px]';
      default:
        return 'min-h-[90px] min-w-[320px]';
    }
  };

  return (
    <ClientOnly>
      <div 
        ref={adRef}
        className={`ad-container w-full overflow-hidden my-4 bg-gradient-to-r from-[#1a1a2e]/50 to-[#16213e]/50 rounded-lg border border-[#FF3E9D]/10 ${getAdSize()} ${className}`}
        style={style}
      >
        <ins
          className="adsbygoogle"
          style={{
            display: 'block',
            width: '100%',
            height: '100%',
          }}
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // Replace with your actual AdSense publisher ID
          data-ad-slot={adSlot}
          data-ad-format={adFormat}
          data-full-width-responsive="true"
        />
        <div className="text-xs text-center text-gray-500 mt-1">Advertisement</div>
      </div>
    </ClientOnly>
  );
} 