import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AdminServiceContext } from '../../services/AdminService';
import LoadingMarkUp from '../../components/Loading/Loading';
import Dialog from '../../components/Dialog/Dialog';
import PriceListGroup from './PriceListGroup';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import { Link, useLocation, createSearchParams, useNavigate, useParams } from 'react-router-dom';
import AppButton from '../../components/AppButton/AppButton';
import EditIcon from '../../components/Icons/EditIcon';
import DeleteIcon from '../../components/Icons/DeleteIcon';
import styles from './PriceListGroups.module.scss';

const PriceListGroups = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const { getPriceListGroups, priceListGroups, deletePriceListGroup, error, recordsCount } =
    useContext(AdminServiceContext);
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(parseInt(queryParams.get('page')) || 1);
  const [pageSize, setPageSize] = useState(parseInt(queryParams.get('pageSize')) || 5);
  const lang = i18n.language || 'en';
  const { priceListGroupId } = useParams();

  const fetchData = async () => {
    setLoading(true);
    const langModel = {
      id: -1,
      languageCode: lang,
      page: page,
      pageSize: pageSize,
    };
    await getPriceListGroups(langModel);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [page, pageSize]);

  useEffect(() => {
    if (priceListGroupId) {
      handleOpenDialog();
    }
  }, [priceListGroupId]);

  const handleOpenDialog = () => {
    setIsOpen(true);
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
    navigate(`/${lang}/admin/dashboard/pricelistgroups`);
    fetchData();
  };

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
      await deletePriceListGroup(id);
      fetchData();
    }
  };

  if (loading) {
    return <LoadingMarkUp />;
  }

  isOpen ? (document.body.style.overflow = 'hidden') : (document.body.style.overflow = '');

  return (
    <>
      <div className={styles.PriceListGroups__new}>
        <AppButton large label={'new'} onClick={handleOpenDialog} color={'#0c2d57'} />
      </div>
      {isOpen && (
        <Dialog onClose={handleCloseDialog}>
          <PriceListGroup handleCloseDialog={handleCloseDialog} />
        </Dialog>
      )}
      <div className={styles.PriceListGroups}>
        <table className={styles.PriceListGroups__table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {priceListGroups &&
              priceListGroups.map((priceListGroup) => {
                return (
                  <tr key={priceListGroup.id}>
                    <td>{priceListGroup.id}</td>
                    <td>{priceListGroup.name}</td>
                    <td>
                      <Link to={`/${lang}/admin/dashboard/pricelistgroups/${priceListGroup.id}`}>
                        <AppButton iconButton color={'#0c2d57'}>
                          <EditIcon />
                        </AppButton>
                      </Link>
                    </td>
                    <td>
                      <AppButton
                        iconButton
                        color={'rgba(219, 45, 46, .8)'}
                        onClick={() => handleDelete(priceListGroup.id)}
                      >
                        <DeleteIcon />
                      </AppButton>
                      {/* <button onClick={() => handleDelete(priceListGroup.id)}>delete</button> */}
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
      {error ? error : null}
    </>
  );
};

export default PriceListGroups;
