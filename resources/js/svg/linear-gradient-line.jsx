import React from 'react';

const LinearGradientLine = () => (
  <svg width="160" height="6" viewBox="0 0 160 6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="lg" x1="0" x2="160" y1="3" y2="3" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#22c55e"/>
        <stop offset="100%" stopColor="#06b6d4"/>
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="160" height="6" rx="3" fill="url(#lg)" />
  </svg>
);

export default LinearGradientLine;


