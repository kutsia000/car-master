import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import LoadingMarkUp from '../../components/Loading/Loading';
import styles from './Cars.module.scss';
import { Link, useLocation, createSearchParams, useNavigate, useParams } from 'react-router-dom';
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbar,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import Lightbox from 'react-18-image-lightbox';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import AppButton from '../../components/AppButton/AppButton';
import { EmployeeServiceContext } from '../../services/Employee/EmployeeService';
import EditIcon from '../../components/Icons/EditIcon';
import DeleteIcon from '../../components/Icons/DeleteIcon';
import Dialog from '../../components/Dialog/Dialog';
import EmployeeCar from './EmployeeCar';

const EmployeeCars = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const {
    getCars,
    updateCar,
    cars,
    deleteCar,
    error,
    selAuctions,
    selPorts,
    selLocations,
    allRecieverPorts,
    allLines,
    carStatuses,
  } = useContext(EmployeeServiceContext);

  const { t, i18n } = useTranslation();
  const lang = i18n.language || 'en';
  const [loading, setLoading] = useState(true);
  const [editedRows, setEditedRows] = useState([]);
  const [lBoxIsOpen, setLBoxIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [comboYears, setComboYears] = useState([]);
  // const [comboDealers, setComboDealers] = useState([]);
  const [comboLocations, setComboLocations] = useState([]);
  const [comboPorts, setComboPorts] = useState([]);
  const [comboAuctions, setComboAuctions] = useState([]);
  const [comboRecieverPorts, setComboRecieverPorts] = useState([]);
  const [comboCarStatuses, setComboCarStatuses] = useState([]);
  const [comboLines, setComboLines] = useState([]);

  const { carId } = useParams();

  const fetchData = async () => {
    await getCars();
    setLoading(false);
  };

  const PhotoCellRenderer = ({ id, value }) => {
    return (
      <img
        src={value}
        alt="Photo"
        style={{ maxWidth: '100%', maxHeight: '100px', cursor: 'pointer' }}
        onClick={() => {
          let car = cars.find((c) => c.id == id);
          if (car) {
            let imgs = [car.mainImageUrl, ...car.imageURLs];
            let images = imgs.map((i) => `https://cl1ne.ge${i}`);
            setImages(images);
          }
          setLBoxIsOpen(true);
        }}
      />
    );
  };

  const CustomDownloadButton = () => {
    return (
      <button className="btn btn-sm btn-info" type="button" onClick={() => handleDownloadImages()}>
        download all images
      </button>
    );
  };

  const updateComboOptions = (data, setter) => {
    // console.log(data);
    const labels = data.map((item) => item.fullName || item.name || item.auctionName);
    setter(labels);
  };

  const handleDownloadImages = async () => {
    const zip = new JSZip();
    //console.log(images);
    const fetchPromises = images.map((imageUrl, index) =>
      fetch(imageUrl)
        .then((response) => response.blob())
        .then((blob) => {
          zip.file(`image${index + 1}.jpg`, blob);
        })
    );
    await Promise.all(fetchPromises);

    zip.generateAsync({ type: 'blob' }).then((content) => {
      saveAs(content, 'images.zip');
    });
  };

  useEffect(() => {
    fetchData();
    const currentYear = new Date().getFullYear();
    const startYear = 1920;

    const yearOptions = [];

    for (let year = currentYear; year >= startYear; year--) {
      yearOptions.push(year);
    }

    setComboYears(yearOptions);
  }, []);

  // useEffect(() => {
  //   console.log(userTypes);
  // }, [userTypes]);

  useEffect(() => {
    if (carId) {
      handleOpenDialog();
    }
  }, [carId]);

  // useEffect(() => {
  //   if (dealers) {
  //     updateComboOptions(dealers, setComboDealers);
  //   }
  // }, [dealers]);

  useEffect(() => {
    if (selLocations) {
      updateComboOptions(selLocations, setComboLocations);
    }
  }, [selLocations]);

  useEffect(() => {
    if (selPorts) {
      updateComboOptions(selPorts, setComboPorts);
    }
  }, [selPorts]);

  useEffect(() => {
    if (selAuctions) {
      updateComboOptions(selAuctions, setComboAuctions);
    }
  }, [selAuctions]);

  useEffect(() => {
    if (allRecieverPorts) {
      updateComboOptions(allRecieverPorts, setComboRecieverPorts);
    }
  }, [allRecieverPorts]);

  useEffect(() => {
    if (allLines) {
      updateComboOptions(allLines, setComboLines);
    }
  }, [allLines]);

  useEffect(() => {
    if (carStatuses) {
      updateComboOptions(carStatuses, setComboCarStatuses);
    }
  }, [carStatuses]);

  const handleCloseDialog = () => {
    setIsOpen(false);
    navigate(`/${lang}/employee/dashboard/cars`);
    fetchData();
  };

  const handleOpenDialog = () => {
    setIsOpen(true);
  };

  const handleSave = async (e) => {
    //console.log(e);
    if (editedRows.length === 0) return;
    setLoading(true);

    editedRows.forEach(async (row) => {
      //console.log(row.saleDate instanceof Date);
      if (row.saleDate && row.saleDate instanceof Date) {
        row.saleDate = row.saleDate.toISOString();
      }
      if (row.containerEntryDate && row.containerEntryDate instanceof Date) {
        row.containerEntryDate = row.containerEntryDate.toISOString();
      }
      if (row.containerOpenDate && row.containerOpenDate instanceof Date) {
        row.containerOpenDate = row.containerOpenDate.toISOString();
      }
      if (row.greenDate && row.greenDate instanceof Date) {
        row.greenDate = row.greenDate.toISOString();
      }
      await updateCar(row);
    });
    setLoading(false);
    setEditedRows([]);
  };

  const handleEditClick = (id) => () => {
    //console.log(id);
    setIsOpen(true);
    navigate(`/${lang}/employee/dashboard/cars/${id}`);
    //setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleDeleteClick = async (e, id) => {
    e.preventDefault();
    //setRows(rows.filter((row) => row.id !== id));
    if (id) {
      await deleteCar(id);
      await fetchData();
    }
  };

  const handleProcessRowUpdate = (newRow, oldRow) => {
    //console.log(newRow);
    const carStatus = carStatuses.find((status) => status.name === newRow.carStatusName);
    if (carStatus) {
      newRow.carStatusId = carStatus.id;
      newRow.carStatusName = carStatus.name;
    }

    // const dealer = dealers.find((dealer) => dealer.fullName === newRow.fullName);
    // if (dealer) {
    //   newRow.userId = dealer.id;
    //   newRow.fullName = dealer.fullName;
    // }

    const auction = selAuctions.find((auc) => auc.auctionName === newRow.auctionName);
    if (auction) {
      newRow.auctionId = auction.id;
      newRow.auctionName = auction.auctionName;
    }

    const port = selPorts.find((port) => port.name === newRow.portName);
    if (port) {
      newRow.portId = port.id;
      newRow.portName = port.name;
    }

    const location = selLocations.find((loc) => loc.name === newRow.locationName);
    if (location) {
      newRow.locationId = location.id;
      newRow.locationName = location.name;
    }

    const line = allLines.find((line) => line.name === newRow.lineName);
    if (line) {
      newRow.lineId = line.id;
      newRow.lineName = line.name;
    }

    const recieverPort = allRecieverPorts.find((p) => p.name === newRow.recieverPortName);
    if (recieverPort) {
      newRow.recieverPortId = recieverPort.id;
      newRow.recieverPortName = recieverPort.name;
    }

    //console.log(newRow);

    const index = editedRows.findIndex((item) => item.id === newRow.id);
    const newList = [...editedRows];

    index === -1 ? newList.push(newRow) : (newList[index] = newRow);

    setEditedRows(newList);

    return newRow;
  };

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const columns = [
    { field: 'id', headerName: 'Id', width: 50, hideable: true },
    {
      field: 'mainImageUrl',
      width: 150,
      headerName: '',
      renderCell: (params) => (
        <>
          <PhotoCellRenderer
            key={params.id}
            id={params.id}
            value={`https://cl1ne.ge${params.value}`}
          />
        </>
      ),
    },
    { field: 'carMarkName', headerName: t('column_carMarkName'), width: 150, hideable: true },
    { field: 'carModelName', headerName: t('column_carModelName'), width: 150, hideable: true },
    { field: 'carStatusId', headerName: 'carStatusId', width: 50 },
    {
      field: 'carStatusName',
      headerName: t('column_carStatusName'),
      width: 150,
      hideable: true,
      editable: true,
      type: 'singleSelect',
      valueOptions: comboCarStatuses,
    },
    { field: 'userId', headerName: 'userId', width: 50 },
    // {
    //   field: 'fullName',
    //   headerName: 'fullName',
    //   width: 150,
    //   editable: false,
    //   type: 'singleSelect',
    //   valueOptions: comboDealers,
    //   hideable: true,
    // },
    {
      field: 'prodYear',
      headerName: 'ProdYear',
      width: 150,
      editable: true,
      hideable: true,
      type: 'singleSelect',
      valueOptions: comboYears,
    },
    { field: 'vincode', headerName: 'vincode', width: 150, hideable: true, editable: true },
    { field: 'lotNumber', headerName: 'lotNumber', width: 150, hideable: true, editable: true },
    { field: 'auctionId', headerName: 'auctionId', width: 50 },
    {
      field: 'auctionName',
      headerName: 'auctionName',
      editable: true,
      width: 150,
      hideable: true,
      type: 'singleSelect',
      valueOptions: comboAuctions,
    },
    { field: 'portId', headerName: 'portId', width: 50 },
    {
      field: 'portName',
      headerName: 'portName',
      editable: true,
      width: 100,
      hideable: true,
      type: 'singleSelect',
      valueOptions: comboPorts,
    },
    { field: 'locationId', headerName: 'locationId', width: 50 },
    {
      field: 'locationName',
      headerName: 'locationName',
      editable: true,
      width: 150,
      hideable: true,
      type: 'singleSelect',
      valueOptions: comboLocations,
    },
    {
      field: 'dealerWin',
      headerName: 'dealerWin',
      width: 150,
      hideable: true,
      type: 'number',
      editable: true,
    },
    {
      field: 'saleDate',
      headerName: 'saleDate',
      width: 150,
      hideable: true,
      editable: true,
      type: 'date',
      valueGetter: ({ value }) => value && new Date(value),
    },
    {
      field: 'reciever',
      headerName: 'reciever',
      width: 150,
      hideable: true,
      editable: true,
      valueGetter: (params) => params.row.reciever || null,
    },
    {
      field: 'recieverPersonalId',
      headerName: 'recieverPersonalId',
      width: 150,
      hideable: true,
      editable: true,
    },
    { field: 'phoneNumber', headerName: 'phoneNumber', width: 150, hideable: true, editable: true },
    {
      field: 'auctionPay',
      headerName: 'auctionPay',
      width: 150,
      hideable: true,
      type: 'number',
      editable: true,
    },
    {
      field: 'wayPay',
      headerName: 'wayPay',
      width: 150,
      hideable: true,
      type: 'number',
      editable: true,
    },
    {
      field: 'tempPriceIncrease',
      headerName: 'tempPriceIncrease',
      width: 150,
      hideable: true,
      type: 'number',
      editable: true,
    },
    {
      field: 'documentPrice',
      headerName: 'documentPrice',
      width: 150,
      hideable: true,
      type: 'number',
      editable: true,
    },
    {
      field: 'fine',
      headerName: 'fine',
      width: 100,
      hideable: true,
      type: 'number',
      editable: true,
    },
    {
      field: 'insurance',
      headerName: 'insurance',
      width: 150,
      hideable: true,
      type: 'number',
      editable: true,
    },
    {
      field: 'payOfService',
      headerName: 'documentPrice',
      width: 150,
      hideable: true,
      type: 'number',
      editable: true,
    },
    {
      field: 'transportAmount',
      headerName: 'transportAmount',
      width: 150,
      hideable: true,
      type: 'number',
      editable: true,
    },
    { field: 'lineId', headerName: 'lineId', width: 50 },
    {
      field: 'lineName',
      headerName: 'lineName',
      editable: true,
      width: 100,
      hideable: true,
      type: 'singleSelect',
      valueOptions: comboLines,
    },
    { field: 'recieverPortId', headerName: 'recieverPortId', width: 50 },
    {
      field: 'recieverPortName',
      headerName: 'recieverPortName',
      editable: true,
      width: 100,
      hideable: true,
      type: 'singleSelect',
      valueOptions: comboRecieverPorts,
    },
    {
      field: 'containerEntryDate',
      headerName: 'containerEntryDate',
      width: 150,
      hideable: true,
      editable: true,
      type: 'date',
      valueGetter: ({ value }) => value && new Date(value),
    },
    {
      field: 'containerOpenDate',
      headerName: 'containerOpenDate',
      width: 150,
      hideable: true,
      editable: true,
      type: 'date',
      valueGetter: ({ value }) => value && new Date(value),
    },
    {
      field: 'greenDate',
      headerName: 'greenDate',
      width: 150,
      hideable: true,
      editable: true,
      type: 'date',
      valueGetter: ({ value }) => value && new Date(value),
    },
    {
      field: 'sublot',
      headerName: 'sublot',
      width: 150,
      hideable: true,
      type: 'number',
      editable: true,
    },
    {
      field: 'actions',
      type: 'actions',
      width: 80,
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon fill="#FF0000" />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon fill="black" />}
            label="Delete"
            onClick={(e) => handleDeleteClick(e, id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  if (loading) {
    return <LoadingMarkUp />;
  }

  isOpen ? (document.body.style.overflow = 'hidden') : (document.body.style.overflow = '');

  return (
    <>
      {lBoxIsOpen && (
        <Lightbox
          mainSrc={images[photoIndex]}
          nextSrc={images[(photoIndex + 1) % images.length]}
          prevSrc={images[(photoIndex + images.length - 1) % images.length]}
          onCloseRequest={() => setLBoxIsOpen(false)}
          onMovePrevRequest={() => setPhotoIndex((photoIndex + images.length - 1) % images.length)}
          onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % images.length)}
          enableZoom
          clickOutsideToClose
          toolbarButtons={[<CustomDownloadButton />]}
        />
      )}
      {isOpen && (
        <Dialog onClose={handleCloseDialog}>
          <EmployeeCar handleCloseDialog={handleCloseDialog} />
        </Dialog>
      )}
      <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'row' }}>
        <div className={styles.Cars__new}>
          <AppButton type="button" large label={'new'} onClick={handleOpenDialog} />
        </div>
        {/* <button type="button" className="btn btn-md btn-success" onClick={handleOpenDialog}>
          new
        </button> */}
        <div className={styles.Cars__new}>
          <AppButton
            type={'button'}
            large
            label={'save'}
            onClick={(e) => handleSave(e)}
            color={'#0c2d57'}
          />
        </div>
      </div>

      <label style={{ color: 'white', padding: '0 40px 0 40px' }}>
        {editedRows.length} row(s) affected
      </label>
      <div style={{ padding: '0 40px 0 40px' }}>
        {cars && (
          <DataGrid
            getRowId={(row) => row.id}
            rows={cars}
            columns={columns}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={handleProcessRowUpdate}
            onProcessRowUpdateError={(error) => {
              //console.log(error);
            }}
            {...cars}
            initialState={{
              ...cars.initialState,
              pagination: { paginationModel: { pageSize: 10 } },
              columns: {
                columnVisibilityModel: {
                  carStatusId: false,
                  userId: false,
                  auctionId: false,
                  portId: false,
                  locationId: false,
                  lineId: false,
                  recieverPortId: false,
                },
              },
            }}
            pageSizeOptions={[10, 15, 25]}
            slots={{
              toolbar: GridToolbar,
            }}
            sx={{
              overflowX: 'scroll',
              background: 'white',
              '& .MuiInputBase-input': {
                color: 'black !important',
              },
            }}
          />
        )}
      </div>
    </>
  );
};

export default EmployeeCars;
