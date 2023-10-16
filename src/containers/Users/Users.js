import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AdminServiceContext } from '../../services/AdminService';
import LoadingMarkUp from '../../components/Loading/Loading';
import Dialog from '../../components/Dialog/Dialog';
import User from './User';
import { Link, useLocation, createSearchParams, useNavigate, useParams } from 'react-router-dom';
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbar,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import DeleteIcon from '../../components/Icons/DeleteIcon';
import EditIcon from '../../components/Icons/EditIcon';

const Users = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const { getUsers, userTypes, updateUser, selPriceListGroups, users, deleteUser, error } =
    useContext(AdminServiceContext);
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [editedRows, setEditedRows] = useState([]);
  const [comboUserTypes, setComboUserTypes] = useState([]);
  const [comboPriceListGroups, setComboPriceListGroups] = useState([]);
  const lang = i18n.language || 'en';
  const { userId } = useParams();

  const fetchData = async () => {
    //setLoading(true);
    await getUsers();
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    //console.log(userId);
    if (userId) {
      handleOpenDialog();
    }
  }, [userId]);

  useEffect(() => {
    if (userTypes) {
      const labels = userTypes.map((ut) => {
        return ut.name;
      });
      setComboUserTypes(labels);
      //console.log(labels);
    }
  }, [userTypes]);

  useEffect(() => {
    if (selPriceListGroups) {
      const labels = selPriceListGroups.map((p) => {
        return p.name;
      });
      setComboPriceListGroups(labels);
    }
  }, [selPriceListGroups]);

  useEffect(() => {
    //console.log(editedRows);
  }, [editedRows]);

  // useEffect(() => {
  //   if (users) {
  //     console.log(users);
  //   }
  // }, [users]);

  const handleOpenDialog = () => {
    setIsOpen(true);
  };

  const handleDelete = async (id) => {};

  const handleCloseDialog = () => {
    setIsOpen(false);
    navigate(`/${lang}/admin/dashboard/users`);
    fetchData();
  };

  const handleNavigation = (id) => {
    navigate(`${id}`);
  };

  const handleEditClick = (id) => () => {
    //console.log(id);
    setIsOpen(true);
    navigate(`/${lang}/admin/dashboard/users/${id}`);
    //setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleDeleteClick = (id) => () => {
    //setRows(rows.filter((row) => row.id !== id));
  };

  const handleProcessRowUpdate = (newRow, oldRow) => {
    //console.log([newRow, oldRow]);
    const ut = userTypes.find((type) => type.name === newRow.userTypeName);
    if (ut) {
      newRow.userTypeId = ut.id;
    }
    const pg = selPriceListGroups.find((g) => g.name === newRow.priceListGroupName);
    if (pg) {
      newRow.priceListGroupId = pg.id;
    } else {
      newRow.priceListGroupId = 0;
      newRow.priceListGroupName = null;
    }
    const index = editedRows.findIndex((item) => item.id == newRow.id);
    //console.log(index);
    if (index === -1) {
      const newList = [...editedRows, newRow];
      setEditedRows(newList);
    } else {
      const newList = editedRows.filter((item) => item.id !== newRow.id);
      //console.log(newList);
      newList.push(newRow);
      setEditedRows(newList);
    }

    return newRow;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    //console.log(editedRows);
    if (editedRows.length === 0) return;
    setLoading(true);

    editedRows.forEach(async (row) => {
      await updateUser(row);
    });
    setLoading(false);
  };

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const columns = [
    { field: 'id', headerName: 'Id', width: 50, hideable: true },
    { field: 'userTypeId', headerName: 'userTypeId', width: 150, hideable: true },
    {
      field: 'userTypeName',
      headerName: 'UserType',
      width: 100,
      editable: true,
      type: 'singleSelect',
      valueOptions: comboUserTypes,
      hideable: true,
    },
    { field: 'priceListGroupsId', headerName: 'priceListGroupsId', width: 150, hideable: true },
    {
      field: 'priceListGroupName',
      headerName: 'priceListGroupName',
      width: 200,
      editable: true,
      type: 'singleSelect',
      valueOptions: comboPriceListGroups,
      hideable: true,
    },
    {
      field: 'userName',
      headerName: 'userName',
      width: 150,
      sortable: true,
      filterable: true,
      editable: true,
      hideable: true,
    },
    { field: 'firstName', headerName: 'firstName', width: 150, editable: true, hideable: true },
    { field: 'lastName', headerName: 'lastName', width: 150, editable: true, hideable: true },
    { field: 'personalId', headerName: 'personalId', width: 150, hideable: true },
    { field: 'email', headerName: 'email', width: 150 },
    { field: 'phoneNumber', headerName: 'phoneNumber', width: 150, hideable: true },
    {
      field: 'dateBirth',
      headerName: 'dateBirth',
      width: 150,
      editable: true,
      valueGetter: ({ value }) => value && new Date(value),
      type: 'date',
      hideable: true,
    },
    {
      field: 'actions',
      type: 'actions',
      width: 80,
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  if (loading) {
    return <LoadingMarkUp />;
  }

  return (
    <>
      {isOpen && (
        <Dialog onClose={handleCloseDialog}>
          <User handleCloseDialog={handleCloseDialog}></User>
        </Dialog>
      )}
      <div>
        <button type="button" className="btn btn-md btn-success" onClick={handleOpenDialog}>
          new
        </button>
        <button type="button" className="btn btn-md btn-primary" onClick={(e) => handleSave(e)}>
          save
        </button>
      </div>
      <div style={{ width: '1280px' }}>
        {users && (
          <DataGrid
            getRowId={(row) => row.id}
            rows={users}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={handleProcessRowUpdate}
            onProcessRowUpdateError={(error) => {
              //console.log(error);
            }}
            columns={columns}
            sx={{ overflowX: 'scroll' }}
            {...users}
            initialState={{
              ...users.initialState,
              pagination: { paginationModel: { pageSize: 5 } },
            }}
            // localeText={{
            //   toolbarFilters: 'ფილტრი',
            //   columnMenuHideColumn: 'დამალვა',
            //   toolbarColumnsLabel: 'სვეტები',
            //   toolbarFiltersLabel: 'ფილტრი',
            // }}
            pageSizeOptions={[5, 10, 25]}
            slots={{
              toolbar: GridToolbar,
            }}
          />
        )}
      </div>
    </>
  );
};

export default Users;
