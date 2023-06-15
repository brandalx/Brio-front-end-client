import React from 'react';

export default function Vector({ w, h }) {
  return (
    <svg width={w} height={h} viewBox='0 0 8 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M6.5 11L1.5 6L6.5 1' stroke='#545563' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
}
