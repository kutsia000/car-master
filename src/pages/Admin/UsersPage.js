import React from 'react';
import Users from '../../containers/Users/Users';
import { AxiosInterceptor } from '../../services/AxiosInterceptor';
import { AdminService } from '../../services/AdminService';

const UsersPage = () => {
  return (
    <AxiosInterceptor>
      <AdminService>
        <Users />
      </AdminService>
    </AxiosInterceptor>
  );
};

export default UsersPage;
