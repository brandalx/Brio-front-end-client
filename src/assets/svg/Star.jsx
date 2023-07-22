import React from 'react';

export default function Star({ color = '#C7C8D2' }) {
  return (
    <div>
      <svg width={14} height={14} viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M6.46181 2.2566C6.68191 1.8107 7.31776 1.8107 7.53786 2.2566L8.66287 4.53575C8.75019 4.71265 8.91891 4.83533 9.11412 4.86386L11.6309 5.23173C12.1228 5.30363 12.3189 5.90834 11.9628 6.25524L10.1426 8.0281C10.0011 8.16594 9.93646 8.36462 9.96985 8.55934L10.3993 11.0632C10.4834 11.5534 9.96884 11.9272 9.52866 11.6957L7.27911 10.5127C7.10428 10.4207 6.8954 10.4207 6.72057 10.5127L4.47102 11.6957C4.03084 11.9272 3.51631 11.5534 3.60038 11.0632L4.02982 8.55934C4.06322 8.36462 3.99862 8.16594 3.8571 8.0281L2.03691 6.25524C1.68076 5.90834 1.87683 5.30364 2.36877 5.23173L4.88556 4.86386C5.08077 4.83533 5.24948 4.71265 5.3368 4.53575L6.46181 2.2566Z'
          fill={color}
        />
      </svg>
    </div>
  );
}
