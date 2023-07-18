import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AdminServiceContext } from '../../services/AdminService';
import LoadingMarkUp from '../../components/Loading/Loading';
import { Link, useLocation, createSearchParams, useNavigate } from 'react-router-dom';
//import Pagination from '../../components/Pagination/Pagination';
import { PaginationControl } from 'react-bootstrap-pagination-control';

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

  const handleDelete = async (id) => {
    if (window.confirm('are you sure?')) {
      await deleteBlog(id);
      fetchBlogs();
    }
  };

  if (loading) {
    return <LoadingMarkUp />;
  }

  const handlePageChange = (event) => {
    setPage(event);
    //alert(1);
    //console.log(event);
    navigate({
      search: createSearchParams({
        page: event,
      }).toString(),
    });
  };

  //console.log(recordsCount);

  return (
    <>
      <Link to={`/${lang}/admin/dashboard/blog/`}>{t('new')}</Link>
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
                      <Link to={`/${lang}/admin/dashboard/blog/${blog.id}`}>edit</Link>
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
          {/* <Pagination
            className="pagination-bar"
            currentPage={page}
            totalCount={recordsCount}
            pageSize={5}
            onPageChange={(page) => handlePageChange(page)}
          /> */}
        </div>
      </div>
    </>
  );
};

export default Blogs;
