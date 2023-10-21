import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AdminServiceContext } from '../../services/AdminService';
import LoadingMarkUp from '../../components/Loading/Loading';
import Dialog from '../../components/Dialog/Dialog';
import Location from './Location';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import { Link, useLocation, createSearchParams, useNavigate, useParams } from 'react-router-dom';
import AppButton from '../../components/AppButton/AppButton';
import EditIcon from '../../components/Icons/EditIcon';
import DeleteIcon from '../../components/Icons/DeleteIcon';
import styles from './Locations.module.scss';

const Locations = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const { getLocations, locations, deleteLocation, error, recordsCount } =
    useContext(AdminServiceContext);
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(parseInt(queryParams.get('page')) || 1);
  const [pageSize, setPageSize] = useState(parseInt(queryParams.get('pageSize')) || 5);
  const lang = i18n.language || 'en';
  const { locationId } = useParams();

  const fetchData = async () => {
    setLoading(true);
    const langModel = {
      id: -1,
      languageCode: lang,
      page: page,
      pageSize: pageSize,
    };
    await getLocations(langModel);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [page, pageSize]);

  useEffect(() => {
    if (locationId) {
      handleOpenDialog();
    }
  }, [locationId]);

  const handleOpenDialog = () => {
    setIsOpen(true);
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
    navigate(`/${lang}/admin/dashboard/locations`);
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
      await deleteLocation(id);
      fetchData();
    }
  };

  if (loading) {
    return <LoadingMarkUp />;
  }
  isOpen ? (document.body.style.overflow = 'hidden') : (document.body.style.overflow = '');
  return (
    <>
      <div className={styles.Locations__new}>
        <AppButton large label={'new'} onClick={handleOpenDialog} color={'#0c2d57'} />
      </div>
      {isOpen && (
        <Dialog onClose={handleCloseDialog}>
          <Location handleCloseDialog={handleCloseDialog} />
        </Dialog>
      )}
      <div>
        <table className={styles.Locations}>
          <thead className={styles.Locations__table}>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {locations &&
              locations.map((location) => {
                return (
                  <tr key={location.id}>
                    <td>{location.id}</td>
                    <td>{location.name}</td>
                    <td>
                      <Link to={`/${lang}/admin/dashboard/locations/${location.id}`}>
                        <AppButton iconButton color={'#0c2d57'}>
                          <EditIcon />
                        </AppButton>
                      </Link>
                    </td>
                    <td>
                      <AppButton
                        iconButton
                        color={'rgba(219, 45, 46, .8)'}
                        onClick={() => handleDelete(location.id)}
                      >
                        <DeleteIcon />
                      </AppButton>
                      {/* <button onClick={() => handleDelete(location.id)}>delete</button> */}
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

export default Locations;
