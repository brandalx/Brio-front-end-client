import React from 'react';

export default function Account({ color = 'black' }) {
  return (
    <svg width={20} height={20} viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M5 1.66602L2.5 4.99935V16.666C2.5 17.108 2.67559 17.532 2.98816 17.8445C3.30072 18.1571 3.72464 18.3327 4.16667 18.3327H15.8333C16.2754 18.3327 16.6993 18.1571 17.0118 17.8445C17.3244 17.532 17.5 17.108 17.5 16.666V4.99935L15 1.66602H5Z'
        stroke={color}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path d='M2.5 5H17.5' stroke={color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
      <path
        d='M13.3333 8.33398C13.3333 9.21804 12.9821 10.0659 12.357 10.691C11.7319 11.3161 10.8841 11.6673 10 11.6673C9.11595 11.6673 8.2681 11.3161 7.64298 10.691C7.01786 10.0659 6.66667 9.21804 6.66667 8.33398'
        stroke={color}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
