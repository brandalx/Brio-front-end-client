import React from 'react';

export default function Restaurants({ color = 'black' }) {
  return (
    <div>
      <svg width={20} height={20} viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M5 1.66699L2.5 5.00033V16.667C2.5 17.109 2.67559 17.5329 2.98816 17.8455C3.30072 18.1581 3.72464 18.3337 4.16667 18.3337H15.8333C16.2754 18.3337 16.6993 18.1581 17.0118 17.8455C17.3244 17.5329 17.5 17.109 17.5 16.667V5.00033L15 1.66699H5Z'
          stroke={color}
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path d='M2.5 5H17.5' stroke={color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
        <path
          d='M13.3334 8.33301C13.3334 9.21706 12.9822 10.0649 12.3571 10.69C11.732 11.3152 10.8841 11.6663 10.0001 11.6663C9.11603 11.6663 8.26818 11.3152 7.64306 10.69C7.01794 10.0649 6.66675 9.21706 6.66675 8.33301'
          stroke={color}
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </div>
  );
}
