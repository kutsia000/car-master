import React, { useState, useContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LoadingMarkUp from '../../components/Loading/Loading';

export default function EmployeeHomePage() {
  return (
    <div className="dealer-layout">
      <Outlet />
    </div>
  );
}
