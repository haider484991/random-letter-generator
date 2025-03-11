'use client';

import React, { useEffect, useState, ReactNode } from 'react';

interface ClientOnlyProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * ClientOnly component ensures that the children are only rendered on the client side.
 * This is useful for components that use browser APIs or need to be hydrated.
 */
export default function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Return fallback on server, children on client
  return isClient ? <>{children}</> : <>{fallback}</>;
} 