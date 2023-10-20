import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AdminServiceContext } from '../../services/AdminService';
import LoadingMarkUp from '../../components/Loading/Loading';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import Dialog from '../../components/Dialog/Dialog';
import CarMark from './CarMark';
import { Link, useLocation, createSearchParams, useNavigate, useParams } from 'react-router-dom';
import styles from './CarMarks.module.scss';
import AppButton from '../../components/AppButton/AppButton';
import EditIcon from '../../components/Icons/EditIcon';
import DeleteIcon from '../../components/Icons/DeleteIcon';

const CarMarks = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(parseInt(queryParams.get('page')) || 1);
  const [pageSize, setPageSize] = useState(parseInt(queryParams.get('pageSize')) || 5);
  const lang = i18n.language || 'en';
  const [isOpen, setIsOpen] = useState(false);

  const { getCarMarks, deleteCarMark, carMarks, recordsCount, error, success } =
    useContext(AdminServiceContext);

  const { carmarkId } = useParams();

  const fetchCarMarks = async () => {
    setLoading(true);
    const langModel = {
      id: -1,
      languageCode: lang,
      page: page,
      pageSize: pageSize,
    };
    await getCarMarks(langModel);
    setLoading(false);
  };

  useEffect(() => {
    fetchCarMarks();
  }, [page, pageSize]);

  useEffect(() => {
    if (carmarkId) {
      handleOpenDialog();
    }
  }, [carmarkId]);

  const handleOpenDialog = () => {
    setIsOpen(true);
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
    navigate(`/${lang}/admin/dashboard/carmarks`);
    fetchCarMarks();
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
      await deleteCarMark(id);
      fetchCarMarks();
    }
  };

  if (loading) {
    return <LoadingMarkUp />;
  }

  isOpen ? (document.body.style.overflow = 'hidden') : (document.body.style.overflow = '');

  return (
    <>
      <div className={styles.CarMarks__new}>
        <AppButton large label={'new'} onClick={handleOpenDialog} color={'#0c2d57'} />
      </div>
      {isOpen && (
        <Dialog onClose={handleCloseDialog}>
          <CarMark handleCloseDialog={handleCloseDialog} />
        </Dialog>
      )}
      <div className={styles.CarMarks}>
        <table className={styles.CarMarks__table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {carMarks &&
              carMarks.map((carMark) => {
                return (
                  <tr key={carMark.id}>
                    <td>{carMark.id}</td>
                    <td>{carMark.carName}</td>
                    <td>
                      <Link to={`/${lang}/admin/dashboard/carmarks/${carMark.id}`}>
                        <AppButton iconButton color={'#0c2d57'}>
                          <EditIcon />
                        </AppButton>
                      </Link>
                    </td>
                    <td>
                      <AppButton
                        iconButton
                        color={'rgba(219, 45, 46, .8)'}
                        onClick={() => handleDelete(carMark.id)}
                      >
                        <DeleteIcon />
                      </AppButton>
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
    </>
  );
};

export default CarMarks;
