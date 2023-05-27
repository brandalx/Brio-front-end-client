import React from 'react';

export default function ThreeDots({ color = 'black' }) {
  return (
    <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M9.99996 10.8327C10.4602 10.8327 10.8333 10.4596 10.8333 9.99935C10.8333 9.53911 10.4602 9.16602 9.99996 9.16602C9.53972 9.16602 9.16663 9.53911 9.16663 9.99935C9.16663 10.4596 9.53972 10.8327 9.99996 10.8327Z'
        stroke='#83859C'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M9.99996 5.00065C10.4602 5.00065 10.8333 4.62756 10.8333 4.16732C10.8333 3.70708 10.4602 3.33398 9.99996 3.33398C9.53972 3.33398 9.16663 3.70708 9.16663 4.16732C9.16663 4.62756 9.53972 5.00065 9.99996 5.00065Z'
        stroke='#83859C'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M9.99996 16.6667C10.4602 16.6667 10.8333 16.2936 10.8333 15.8333C10.8333 15.3731 10.4602 15 9.99996 15C9.53972 15 9.16663 15.3731 9.16663 15.8333C9.16663 16.2936 9.53972 16.6667 9.99996 16.6667Z'
        stroke='#83859C'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
