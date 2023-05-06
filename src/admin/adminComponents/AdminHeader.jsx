import React from 'react';
import AdminNavbar from './AdminNavbar';
import theme from '../../utils/theme';

export default function AdminHeader() {
  return (
    <header
      className='page-header'
      style={{ background: theme.colors.neutral.bg, height: 'auto', zIndex: '9999', paddingBottom: '10px' }}
    >
      <AdminNavbar />
    </header>
  );
}
