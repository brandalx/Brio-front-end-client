import React from 'react';

export default function Dislike({ color = '#83859C', fill = 'none' }) {
  return (
    <div>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='icon icon-tabler icon-tabler-thumb-down'
        width={24}
        height={24}
        viewBox='0 0 24 24'
        strokeWidth={2}
        stroke={color}
        fill={fill}
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path stroke='none' d='M0 0h24v24H0z' fill='none' />
        <path d='M7 13v-8a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1v7a1 1 0 0 0 1 1h3a4 4 0 0 1 4 4v1a2 2 0 0 0 4 0v-5h3a2 2 0 0 0 2 -2l-1 -5a2 3 0 0 0 -2 -2h-7a3 3 0 0 0 -3 3' />
      </svg>
    </div>
  );
}
