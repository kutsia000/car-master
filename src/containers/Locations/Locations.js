import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AdminServiceContext } from '../../services/AdminService';
import LoadingMarkUp from '../../components/Loading/Loading';
import Dialog from '../../components/Dialog/Dialog';
import Location from './Location';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import { Link, useLocation, createSearchParams, useNavigate, useParams } from 'react-router-dom';

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

  return (
    <>
      <button onClick={handleOpenDialog}>new</button>
      {isOpen && (
        <Dialog onClose={handleCloseDialog}>
          <Location handleCloseDialog={handleCloseDialog} />
        </Dialog>
      )}
      <div>
        <table>
          <thead>
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
                      <Link to={`/${lang}/admin/dashboard/locations/${location.id}`}>edit</Link>
                    </td>
                    <td>
                      <button onClick={() => handleDelete(location.id)}>delete</button>
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
