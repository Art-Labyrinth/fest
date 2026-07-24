export interface DeviceStats {
  timezone: string;
  deviceType: 'mobile' | 'tablet' | 'desktop';
  screen: {
    width: number;
    height: number;
  };
  viewport: {
    width: number;
    height: number;
  };
  devicePixelRatio: number;
  languages: string[];
  networkType?: '4g' | '3g' | '2g' | 'wifi' | 'unknown';
}

export function getDeviceStats(): DeviceStats {
  const getDeviceType = (): 'mobile' | 'tablet' | 'desktop' => {
    const width = window.innerWidth;
    // Check if we have userAgentData (modern browsers)
    if ((navigator as any).userAgentData?.mobile) return 'mobile';
    // Fallback to viewport width
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
  };

  const getNetworkType = (): DeviceStats['networkType'] => {
    try {
      const connection = (navigator as any).connection;
      if (!connection) return 'unknown';
      const type = connection.effectiveType; // '4g', '3g', '2g', 'slow-2g'
      if (type === 'slow-2g') return '2g';
      if (type === '2g' || type === '3g' || type === '4g') return type;
      return 'unknown';
    } catch {
      return 'unknown';
    }
  };

  const getLanguages = (): string[] => {
    // navigator.languages is preferred (full list)
    if (navigator.languages?.length) {
      return Array.from(navigator.languages);
    }
    // Fallback to single language
    return [navigator.language || 'en'];
  };

  const screenObj = window.screen;
  return {
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    deviceType: getDeviceType(),
    screen: {
      width: screenObj.width,
      height: screenObj.height,
    },
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
    devicePixelRatio: window.devicePixelRatio || 1,
    languages: getLanguages(),
    networkType: getNetworkType(),
  };
}
