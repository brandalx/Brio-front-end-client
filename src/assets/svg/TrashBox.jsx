import React, { useState } from 'react';

export default function TrashBox({ color = '#83859C', hoverColor = '' }) {
  const [currentColor, setCurrentColor] = useState(color);
  const [bgColor, setBgColor] = useState('none');

  return (
    <svg
      style={{ cursor: 'pointer' }}
      width='12'
      height='16'
      viewBox='0 0 12 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      // onMouseEnter={() => {
      //   setCurrentColor(hoverColor);
      //   setBgColor('');
      // }}
      // onMouseLeave={() => {
      //   setCurrentColor(color);
      //   setBgColor('');
      // }}
    >
      <path
        d='M3.33337 4.00065V2.66732C3.33337 2.3137 3.47385 1.97456 3.7239 1.72451C3.97395 1.47446 4.31309 1.33398 4.66671 1.33398H7.33337C7.687 1.33398 8.02613 1.47446 8.27618 1.72451C8.52623 1.97456 8.66671 2.3137 8.66671 2.66732V4.00065M10.6667 4.00065V13.334C10.6667 13.6876 10.5262 14.0267 10.2762 14.2768C10.0261 14.5268 9.687 14.6673 9.33337 14.6673H2.66671C2.31309 14.6673 1.97395 14.5268 1.7239 14.2768C1.47385 14.0267 1.33337 13.6876 1.33337 13.334V4.00065H10.6667Z'
        stroke={currentColor}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
