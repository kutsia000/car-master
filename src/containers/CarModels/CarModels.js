import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AdminServiceContext } from '../../services/AdminService';
import LoadingMarkUp from '../../components/Loading/Loading';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import Dialog from '../../components/Dialog/Dialog';
import CarModel from './CarModel';
import { Link, useLocation, createSearchParams, useNavigate, useParams } from 'react-router-dom';
import AppButton from '../../components/AppButton/AppButton';
import styles from './CarModels.module.scss';
import EditIcon from '../../components/Icons/EditIcon';
import DeleteIcon from '../../components/Icons/DeleteIcon';

const CarModels = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(parseInt(queryParams.get('page')) || 1);
  const [pageSize, setPageSize] = useState(parseInt(queryParams.get('pageSize')) || 5);
  const lang = i18n.language || 'en';
  const [isOpen, setIsOpen] = useState(false);

  const { getCarModels, deleteCarModel, carModels, recordsCount, error, success } =
    useContext(AdminServiceContext);

  const { carmodelId } = useParams();

  const fetchCarModels = async () => {
    const langModel = {
      id: -1,
      languageCode: lang,
      page: page,
      pageSize: pageSize,
    };
    await getCarModels(langModel);
    setLoading(false);
  };

  useEffect(() => {
    fetchCarModels();
  }, [page, pageSize]);

  useEffect(() => {
    if (carmodelId) {
      handleOpenDialog();
    }
  }, [carmodelId]);

  const handleOpenDialog = () => {
    setIsOpen(true);
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
    navigate(`/${lang}/admin/dashboard/carmodels`);
    fetchCarModels();
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
      await deleteCarModel(id);
      fetchCarModels();
    }
  };

  if (loading) {
    return <LoadingMarkUp />;
  }

  isOpen ? (document.body.style.overflow = 'hidden') : (document.body.style.overflow = '');

  return (
    <>
      <div className={styles.CarModels__new}>
        <AppButton large label={'new'} onClick={handleOpenDialog} color={'#0c2d57'} />
      </div>
      {isOpen && (
        <Dialog onClose={handleCloseDialog}>
          <CarModel handleCloseDialog={handleCloseDialog} />
        </Dialog>
      )}
      <div className={styles.CarModels}>
        <table className={styles.CarModels__table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>CarMark</th>
              <th>Name</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {carModels &&
              carModels.map((carModel) => {
                return (
                  <tr key={carModel.carModelId}>
                    <td>{carModel.carModelId}</td>
                    <td>{carModel.carName}</td>
                    <td>{carModel.carModelName}</td>
                    <td>
                      <Link to={`/${lang}/admin/dashboard/carmodels/${carModel.carModelId}`}>
                        <AppButton iconButton color={'#0c2d57'}>
                          <EditIcon />
                        </AppButton>
                      </Link>
                    </td>
                    <td>
                      <AppButton
                        iconButton
                        color={'rgba(219, 45, 46, .8)'}
                        onClick={() => handleDelete(carModel.id)}
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

export default CarModels;
