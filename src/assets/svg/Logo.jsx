import React from 'react';

export default function Logo({ color = '#4E60FF', www = 2, ww = 29, hh = 29 }) {
  return (
    <svg width={ww} height={hh} viewBox='0 0 29 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M11 17C11.5304 17 12.0391 17.2107 12.4142 17.5858C12.7893 17.9609 13 18.4696 13 19C13 19.5304 12.7893 20.0391 12.4142 20.4142C12.0391 20.7893 11.5304 21 11 21C10.4696 21 9.96086 20.7893 9.58579 20.4142C9.21071 20.0391 9 19.5304 9 19C9 18.4696 9.21071 17.9609 9.58579 17.5858C9.96086 17.2107 10.4696 17 11 17ZM11 17H22M11 17V3H9M22 17C22.5304 17 23.0391 17.2107 23.4142 17.5858C23.7893 17.9609 24 18.4696 24 19C24 19.5304 23.7893 20.0391 23.4142 20.4142C23.0391 20.7893 22.5304 21 22 21C21.4696 21 20.9609 20.7893 20.5858 20.4142C20.2107 20.0391 20 19.5304 20 19C20 18.4696 20.2107 17.9609 20.5858 17.5858C20.9609 17.2107 21.4696 17 22 17ZM11 5L25 6L24 13H11M7 6L2 6M5 9L1 9M7 12H2'
        stroke='url(#paint0_linear_1_80)'
        strokeWidth={www}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <defs>
        <linearGradient id='paint0_linear_1_80' x1='20.5' y1='10.5' x2='-7.5' y2='10.5' gradientUnits='userSpaceOnUse'>
          <stop stopColor={color} />
          <stop offset={1} stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
    </svg>
  );
}
