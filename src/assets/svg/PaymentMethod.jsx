import React from 'react';

export default function PaymentMethod({ color = 'black' }) {
  return (
    <svg width={20} height={20} viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M17.5 3.33325H2.49999C1.57952 3.33325 0.833328 4.07944 0.833328 4.99992V14.9999C0.833328 15.9204 1.57952 16.6666 2.49999 16.6666H17.5C18.4205 16.6666 19.1667 15.9204 19.1667 14.9999V4.99992C19.1667 4.07944 18.4205 3.33325 17.5 3.33325Z'
        stroke={color}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M0.833328 8.33325H19.1667'
        stroke={color}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
