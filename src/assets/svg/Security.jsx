import React from 'react';

export default function Security({ color = 'black' }) {
  return (
    <svg width={16} height={20} viewBox='0 0 16 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M7.99999 18.3327C7.99999 18.3327 14.6667 14.9993 14.6667 9.99935V4.16602L7.99999 1.66602L1.33333 4.16602V9.99935C1.33333 14.9993 7.99999 18.3327 7.99999 18.3327Z'
        stroke={color}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
