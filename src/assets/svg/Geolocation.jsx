import React from 'react';

export default function Geolocation() {
  return (
    <div>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='icon icon-tabler icon-tabler-location'
        width={24}
        height={24}
        viewBox='0 0 24 24'
        strokeWidth={2}
        stroke='#4E60FF'
        fill='none'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path stroke='none' d='M0 0h24v24H0z' fill='none' />
        <path d='M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5' />
      </svg>
    </div>
  );
}
