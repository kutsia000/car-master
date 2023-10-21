import React from 'react';
import { Outlet } from 'react-router-dom';

export default function AdminHomePage() {
  return (
    <div className="admin-layout">
      <Outlet />
    </div>
  );
}
