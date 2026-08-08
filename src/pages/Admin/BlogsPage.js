import React from 'react';
import Blogs from '../../containers/Blog/Blogs';
import { AxiosInterceptor } from '../../services/AxiosInterceptor';
import { AdminService } from '../../services/AdminService';

const BlogsPage = () => {
  return (
    <AxiosInterceptor>
      <AdminService>
        <Blogs />
      </AdminService>
    </AxiosInterceptor>
  );
};

export default BlogsPage;
