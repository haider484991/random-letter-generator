'use client';

import React, { useEffect } from 'react';
import Script from 'next/script';

// Add type definitions for Google Tag Manager
declare global {
  interface Window {
    googletag: {
      cmd: Array<() => void>;
      pubads: () => {
        setPrivacySettings: (settings: { restrictDataProcessing: boolean }) => void;
      };
    };
    dataLayer: Array<Record<string, unknown>>;
  }
}

export default function ConsentManager() {
  useEffect(() => {
    // Initialize Google's CMP when component mounts
    if (window.googletag && window.googletag.cmd) {
      window.googletag.cmd.push(function() {
        window.googletag.pubads().setPrivacySettings({
          restrictDataProcessing: false
        });
      });
    }
  }, []);

  return (
    <>
      {/* Google Consent Mode v2 */}
      <Script
        id="google-consent-mode"
        strategy="beforeInteractive"
      >
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag() { dataLayer.push(arguments); }
          
          // Default consent settings
          gtag('consent', 'default', {
            'ad_storage': 'denied',
            'analytics_storage': 'denied',
            'personalization_storage': 'denied',
            'functionality_storage': 'denied',
            'security_storage': 'granted',
          });
          
          // Wait for the consent message to be accepted
          gtag('set', 'ads_data_redaction', true);
        `}
      </Script>
    
      {/* Google Funding Choices consent message */}
      <Script
        id="funding-choices"
        strategy="afterInteractive"
        src="https://fundingchoicesmessages.google.com/i/pub-6873688003145340?ers=1"
        nonce="aNJyDlTXsb9N_Ujsw3X2GA"
        async={true}
      />
      
      {/* Initialize Funding Choices */}
      <Script
        id="funding-choices-init"
        strategy="afterInteractive"
      >
        {`
          (function() {
            function signalGooglefcPresent() {
              if (!window.frames['googlefcPresent']) {
                if (document.body) {
                  const iframe = document.createElement('iframe');
                  iframe.style = 'width: 0; height: 0; border: none; z-index: -1000; position: absolute; left: -1000px; top: -1000px;';
                  iframe.style.display = 'none';
                  iframe.name = 'googlefcPresent';
                  document.body.appendChild(iframe);
                } else {
                  setTimeout(signalGooglefcPresent, 0);
                }
              }
            }
            signalGooglefcPresent();
          })();
        `}
      </Script>
    </>
  );
} 