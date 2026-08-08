import React, { Component } from 'react';
import { AdminService } from '../../services/AdminService';
import { AxiosInterceptor } from '../../services/AxiosInterceptor';
import AdminHomePage from '../AdminHomePage';

const AdminP = () => {
  return (
    <AxiosInterceptor>
      <AdminService>
        <AdminHomePage />
      </AdminService>
    </AxiosInterceptor>
  );
};

export default AdminP;
