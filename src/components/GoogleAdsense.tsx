'use client';

import React, { useEffect } from 'react';
import Script from 'next/script';
import ClientOnly from './ClientOnly';

interface GoogleAdsenseProps {
  adSlot?: string;
  adFormat?: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical';
  style?: React.CSSProperties;
  className?: string;
}

/**
 * GoogleAdsense component for displaying Google AdSense ads.
 * This component safely loads AdSense scripts and displays ads on the client side.
 */
export default function GoogleAdsense({
  adSlot = '',
  adFormat = 'auto',
  style = {},
  className = '',
}: GoogleAdsenseProps) {
  // Initialize AdSense when the component mounts
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <ClientOnly>
      <>
        <div className={`google-ad ${className}`} style={style}>
          <ins
            className="adsbygoogle"
            style={{
              display: 'block',
              textAlign: 'center',
              ...style,
            }}
            data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // Replace with your actual AdSense publisher ID
            data-ad-slot={adSlot}
            data-ad-format={adFormat}
            data-full-width-responsive="true"
          />
        </div>
      </>
    </ClientOnly>
  );
}

/**
 * GoogleAdsenseScript component for loading the AdSense script.
 * This should be included once in your layout or page.
 */
export function GoogleAdsenseScript() {
  return (
    <Script
      id="adsbygoogle-init"
      strategy="afterInteractive"
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" // Replace with your actual AdSense publisher ID
      crossOrigin="anonymous"
    />
  );
} 