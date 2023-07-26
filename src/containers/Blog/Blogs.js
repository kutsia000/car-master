import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AdminServiceContext } from '../../services/AdminService';
import LoadingMarkUp from '../../components/Loading/Loading';
import { Link, useLocation, createSearchParams, useNavigate } from 'react-router-dom';
//import Pagination from '../../components/Pagination/Pagination';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import Dialog from '../../components/Dialog/Dialog';
import Blog from './Blog';
import { useParams } from 'react-router-dom';

const Blogs = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const { getBlogs, blogs, deleteBlog, recordsCount } = useContext(AdminServiceContext);
  const [page, setPage] = useState(parseInt(queryParams.get('page')) || 1);
  const [pageSize, setPageSize] = useState(parseInt(queryParams.get('pageSize')) || 5);
  const { t, i18n } = useTranslation();
  //console.log(getReviews);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const { blogId } = useParams();
  const lang = i18n.language || 'en';

  const fetchBlogs = async () => {
    const langModel = {
      id: -1,
      languageCode: lang,
      page: page,
      pageSize: pageSize,
    };
    await getBlogs(langModel);
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs();
  }, [page, pageSize]);

  useEffect(() => {
    if (blogId) {
      handleOpenDialog();
    }
  }, [blogId]);

  const handleDelete = async (id) => {
    if (window.confirm('are you sure?')) {
      await deleteBlog(id);
      fetchBlogs();
    }
  };

  const handleOpenDialog = () => {
    setIsOpen(true);
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
    navigate(`/${lang}/admin/dashboard/blogs`);
    fetchBlogs();
  };

  if (loading) {
    return <LoadingMarkUp />;
  }

  const handlePageChange = (event) => {
    setPage(event);
    navigate({
      search: createSearchParams({
        page: event,
      }).toString(),
    });
  };

  return (
    <>
      <button onClick={handleOpenDialog}>{t('new')}</button>
      {isOpen && (
        <Dialog onClose={handleCloseDialog}>
          <Blog handleCloseDialog={handleCloseDialog} />
        </Dialog>
      )}
      <div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Content</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {blogs &&
              blogs.map((blog) => {
                return (
                  <tr key={blog.id}>
                    <td>{blog.id}</td>
                    <td>{blog.blogContents[0].title}</td>
                    <td>{blog.blogContents[0].content}</td>
                    <td>
                      <Link to={`/${lang}/admin/dashboard/blogs/${blog.id}`}>edit</Link>
                    </td>
                    <td>
                      <button onClick={() => handleDelete(blog.id)}>delete</button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div>
          <PaginationControl
            page={page}
            between={3}
            total={recordsCount}
            limit={pageSize}
            changePage={(page) => handlePageChange(page)}
            ellipsis={2}
          />
        </div>
      </div>
    </>
  );
};

export default Blogs;
