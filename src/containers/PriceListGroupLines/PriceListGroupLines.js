import React, { useContext, useEffect, useState } from 'react';
import { AdminServiceContext } from '../../services/AdminService';
import { useTranslation } from 'react-i18next';
import LoadingMarkUp from '../../components/Loading/Loading';
import Dialog from '../../components/Dialog/Dialog';
import PriceListGroupLine from './PriceListGroupLine';
//import { PaginationControl } from 'react-bootstrap-pagination-control';
import { useLocation, createSearchParams, useNavigate, useParams } from 'react-router-dom';
import { DataGrid, GridActionsCellItem, GridToolbar } from '@mui/x-data-grid';
import DeleteIcon from '../../components/Icons/DeleteIcon';
import EditIcon from '../../components/Icons/EditIcon';

const PriceListGroupLines = () => {
  const {
    getPriceListGroupLines,
    priceListGroupLines,
    deletePriceListGroupLine,
    error,
    recordsCount,
    selPriceListGroups,
  } = useContext(AdminServiceContext);
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const lang = i18n.language || 'en';
  const [activeGroup, setActiveGroup] = useState(parseInt(queryParams.get('group')) || 1);
  const [pageData, setPageData] = useState(null);
  const { lineId } = useParams();
  const [page, setPage] = useState(parseInt(queryParams.get('page')) || 1);
  const [pageSize, setPageSize] = useState(parseInt(queryParams.get('pageSize')) || 5);

  const fetchData = async () => {
    const data = {
      groupId: activeGroup,
    };
    await getPriceListGroupLines(data);
    setLoading(false);
  };

  useEffect(() => {
    if (selPriceListGroups && selPriceListGroups.length > 0) {
      setActiveGroup(selPriceListGroups[0].id);
    }
  }, [selPriceListGroups]);

  useEffect(() => {
    fetchData();
  }, [activeGroup]);

  useEffect(() => {
    if (lineId) {
      handleOpenDialog();
    }
  }, [lineId]);

  useEffect(() => {
    //fetchData();
    if (priceListGroupLines) {
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;

      const slicedData = priceListGroupLines.slice(startIndex, endIndex);
      setPageData(slicedData);
    }
  }, [page, pageSize]);

  const handleGroupChange = (id) => {
    setActiveGroup(id);
    //fetchData();
    // navigate({
    //   search: createSearchParams({
    //     group: id,
    //     page: 1,
    //   }).toString(),
    // });
  };

  const handleOpenDialog = () => {
    setIsOpen(true);
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
    navigate(`/${lang}/admin/dashboard/pricelistgrouplines`);
    fetchData();
  };

  const handleDelete = async (id) => {
    //console.log(id);
    if (window.confirm('are you sure?')) {
      await deletePriceListGroupLine(id);
      fetchData();
    }
  };

  const handlePageChange = (event) => {
    setPage(event);
    navigate({
      search: createSearchParams({
        page: event,
        group: activeGroup,
      }).toString(),
    });
  };

  const handleNavigation = (id) => {
    navigate(`${id}`);
  };

  if (loading) {
    return <LoadingMarkUp />;
  }

  const columns = [
    { field: 'lineId', headerName: 'Id', width: 150 },
    { field: 'auctionName', headerName: 'Auction', width: 150, sortable: true, filterable: true },
    { field: 'locationName', headerName: 'Location', width: 150 },
    { field: 'portName', headerName: 'Port', width: 150 },
    { field: 'price', headerName: 'Price', width: 150 },
    {
      field: 'actions',
      type: 'actions',
      width: 80,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="edit"
          onClick={() => handleNavigation(params.id)}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="delete"
          onClick={() => handleDelete(params.id)}
        />,
      ],
    },
  ];

  return (
    <>
      {selPriceListGroups &&
        selPriceListGroups.map((group) => {
          return (
            <div
              style={{ cursor: 'pointer' }}
              key={group.id}
              onClick={() => handleGroupChange(group.id)}
            >
              {group.name}
            </div>
          );
        })}
      <button onClick={handleOpenDialog}>new</button>
      {isOpen && (
        <Dialog onClose={handleCloseDialog}>
          <PriceListGroupLine handleCloseDialog={handleCloseDialog} />
        </Dialog>
      )}
      {priceListGroupLines && (
        <DataGrid
          getRowId={(row) => row.lineId}
          rows={priceListGroupLines}
          columns={columns}
          sx={{ overflowX: 'scroll' }}
          {...priceListGroupLines}
          initialState={{
            ...priceListGroupLines.initialState,
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          localeText={{
            toolbarFilters: 'ფილტრი',
            columnMenuHideColumn: 'დამალვა',
            toolbarColumnsLabel: 'სვეტები',
            toolbarFiltersLabel: 'ფილტრი',
          }}
          pageSizeOptions={[5, 10, 25]}
          slots={{
            toolbar: GridToolbar,
          }}
        />
      )}
      {/* <div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Auction</th>
              <th>Location</th>
              <th>Port</th>
              <th>Price</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {pageData &&
              pageData.map((line) => {
                return (
                  <tr key={line.lineId}>
                    <td>{line.lineId}</td>
                    <td>{line.auctionName}</td>
                    <td>{line.locationName}</td>
                    <td>{line.portName}</td>
                    <td>{line.price}</td>
                    <td>
                      <Link to={`/${lang}/admin/dashboard/pricelistgrouplines/${line.lineId}`}>
                        edit
                      </Link>
                    </td>
                    <td>
                      <button onClick={() => handleDelete(line.lineId)}>delete</button>
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
      </div> */}
    </>
  );
};

export default PriceListGroupLines;
