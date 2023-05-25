import React from 'react';

export default function OrderStatus({ istrue, number }) {
  return (
    <div>
      {istrue ? (
        <svg width={32} height={32} viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <circle cx={16} cy={16} r={16} fill='#1ABF70' />
          <path
            d='M22.6667 11.8335L13.5 21.0002L9.33337 16.8335'
            stroke='white'
            strokeWidth={2}
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      ) : (
        <div
          style={{
            width: 32,
            height: 32,
            background: '#4E60FF',
            borderRadius: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '14px',
            color: 'white',
            fontWeight: 'bold'
          }}
        >
          {number}
        </div>
      )}
    </div>
  );
}
