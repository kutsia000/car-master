import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AdminServiceContext } from '../../services/AdminService';
import LoadingMarkUp from '../../components/Loading/Loading';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import { useLocation, createSearchParams, useNavigate } from 'react-router-dom';
import AppButton from '../../components/AppButton/AppButton';
import EditIcon from '../../components/Icons/EditIcon';
import DeleteIcon from '../../components/Icons/DeleteIcon';
import styles from './DealerRequests.module.scss';

const DealerRequests = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const {
    getDealerRequests,
    getDealerRequestById,
    deleteDealerRequest,
    error,
    recordsCount,
    becomeDealerRequests,
  } = useContext(AdminServiceContext);
  const { t, i18n } = useTranslation();
  //console.log(getReviews);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(parseInt(queryParams.get('page')) || 1);
  const [pageSize, setPageSize] = useState(parseInt(queryParams.get('pageSize')) || 5);
  const lang = i18n.language || 'en';

  const fetchData = async () => {
    setLoading(true);
    const langModel = {
      id: -1,
      languageCode: lang,
      page: page,
      pageSize: pageSize,
    };
    await getDealerRequests(langModel);
    setLoading(false);
  };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  useEffect(() => {
    fetchData();
  }, [page, pageSize]);

  const handlePageChange = (event) => {
    setPage(event);
    navigate({
      search: createSearchParams({
        page: event,
      }).toString(),
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('are you sure?')) {
      await deleteDealerRequest(id);
      fetchData();
    }
  };

  if (loading) {
    return <LoadingMarkUp />;
  }

  return (
    <>
      <div>
        <table className={styles.DealerRequests}>
          <thead className={styles.DealerRequests__table}>
            <tr>
              <th>ID</th>
              <th>fullName</th>
              <th>PhoneNumber</th>
              <th>EMail</th>
              <th>Text</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {becomeDealerRequests &&
              becomeDealerRequests.map((req) => {
                return (
                  <tr key={req.id}>
                    <td>{req.id}</td>
                    <td>{req.fullName}</td>
                    <td>{req.phoneNumber}</td>
                    <td>{req.eMail}</td>
                    <td>{req.text}</td>
                    <td>
                      <button onClick={() => handleDelete(req.id)}>delete</button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <PaginationControl
          page={page}
          between={3}
          total={recordsCount}
          limit={pageSize}
          changePage={(page) => handlePageChange(page)}
          ellipsis={2}
        />
      </div>
      {error && <span style={{ color: 'red' }}>{error}</span>}
    </>
  );
};

export default DealerRequests;
