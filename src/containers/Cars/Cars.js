import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AdminServiceContext } from '../../services/AdminService';
import LoadingMarkUp from '../../components/Loading/Loading';
import Dialog from '../../components/Dialog/Dialog';
import Car from './Car';
import { Link, useLocation, createSearchParams, useNavigate, useParams } from 'react-router-dom';
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbar,
  GridRowEditStopReasons,
  GridPagination,
  GridColumnVisibilityModel,
} from '@mui/x-data-grid';
//import { createTheme } from '@mui/material/styles';
import DeleteIcon from '../../components/Icons/DeleteIcon';
import EditIcon from '../../components/Icons/EditIcon';
import Lightbox from 'react-18-image-lightbox';
import 'react-18-image-lightbox/style.css';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import styles from './Cars.module.scss';
import AppButton from '../../components/AppButton/AppButton';
import MakeGreenIcon from '../../components/Icons/MakeGreenIcon';
import ExcelIcon from '../../components/Icons/ExcelIcon';
import BillIcon from '../../components/Icons/BillIcon';
import CarCharge from './CarCharge';

// const images = [
//   'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80',
//   'https://th.bing.com/th/id/OIG.lVXjWwlHyIo4QdjnC1YE',
//   'https://1.bp.blogspot.com/-kK7Fxm7U9o0/YN0bSIwSLvI/AAAAAAAACFk/aF4EI7XU_ashruTzTIpifBfNzb4thUivACLcBGAsYHQ/s1280/222.jpg',
//   'https://pixlr.com/images/index/remove-bg.webp',
// ];

const Cars = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const {
    getCars,
    updateCar,
    dealers,
    cars,
    deleteCar,
    error,
    selAuctions,
    selPorts,
    selLocations,
    allRecieverPorts,
    allLines,
    carStatuses,
    getCarById,
    userTypes,
    getUserCarColumns,
    columns,
    markCarAsGreen,
    updateUserCarColumns,
    getPriceReport,
    getTransportingReport,
  } = useContext(AdminServiceContext);
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [comboYears, setComboYears] = useState([]);
  const [comboDealers, setComboDealers] = useState([]);
  const [comboLocations, setComboLocations] = useState([]);
  const [comboPorts, setComboPorts] = useState([]);
  const [comboAuctions, setComboAuctions] = useState([]);
  const [comboRecieverPorts, setComboRecieverPorts] = useState([]);
  const [comboCarStatuses, setComboCarStatuses] = useState([]);
  const [comboLines, setComboLines] = useState([]);
  const [editedRows, setEditedRows] = useState([]);
  const [lBoxIsOpen, setLBoxIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [carsData, setCarsData] = useState([]);
  const [openCarCharge, setOpenCarCharge] = useState(false);
  const [carChargeId, setCarChargeId] = useState(null);

  // const [comboUserTypes, setComboUserTypes] = useState([]);
  // const [comboPriceListGroups, setComboPriceListGroups] = useState([]);
  const lang = i18n.language || 'en';
  const { carId } = useParams();
  // const muiTheme=createTheme({
  //   typography: {
  //     fontSize: 12,
  //   },
  // })

  const [columnVisibilityModel, setColumnVisibilityModel] = useState({
    id: true,
    mainImageUrl: true,
    carMarkName: true,
    carModelName: true,
    carStatusId: false,
    carStatusName: true,
    userId: false,
    fullName: true,
    prodYear: true,
    vincode: true,
    lotNumber: true,
    containerNumber: true,
    lineId: false,
    lineName: true,
    auctionId: false,
    auctionName: true,
    portId: false,
    portName: true,
    locationId: false,
    locationName: true,
    dealerWin: true,
    saleDate: true,
    reciever: true,
    recieverPersonalId: true,
    phoneNumber: true,
    auctionPay: true,
    wayPay: true,
    tempPriceIncrease: true,
    documentPrice: true,
    fine: true,
    insurance: true,
    payOfService: true,
    transportAmount: true,
    recieverPortId: false,
    recieverPortName: true,
    containerEntryDate: true,
    containerOpenDate: true,
    greenDate: true,
    sublot: true,
    buyerId1: true,
    balance: true,
  });

  const fetchData = async () => {
    setLoading(true);
    await getUserCarColumns();
    await getCars();
    setLoading(false);
  };

  const UpdateColumns = async (model) => {
    const dt = Object.entries(model).map(([key, value]) => ({
      columnName: key,
      show: value,
    }));

    await updateUserCarColumns(dt);
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
            let images = imgs.map((i) => `https://cline.ge${i}`);
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

  useEffect(() => {
    if (Array.isArray(columns) && columns.length > 0) {
      // Convert array to map for faster lookup
      const apiVisibilityMap = columns.reduce((acc, item) => {
        if (item && typeof item.columnName === 'string') {
          acc[item.columnName] = item.show;
        }
        return acc;
      }, {});

      const mergedModel = Object.keys(columnVisibilityModel).reduce((acc, key) => {
        if (apiVisibilityMap.hasOwnProperty(key)) {
          acc[key] = apiVisibilityMap[key];
        } else {
          acc[key] = columnVisibilityModel[key];
        }
        return acc;
      }, {});
      //console.log('mergedModel', mergedModel);
      setColumnVisibilityModel(mergedModel);
    }
  }, [columns]);

  // useEffect(() => {
  //   console.log(userTypes);
  // }, [userTypes]);
  useEffect(() => {
    if (cars) {
      setCarsData(cars);
      //console.log(1);
      // const images = cars.map((car) => `https://cline.ge${car.mainImageUrl}`);
      // setImages(images);
    }
  }, [cars]);

  useEffect(() => {
    if (carId) {
      handleOpenDialog();
    }
  }, [carId]);

  useEffect(() => {
    if (dealers) {
      // Add a default dealer at index 0
      if (dealers && dealers.length > 0 && dealers[0].id !== -1) {
        dealers.unshift({ id: -1, fullName: '-----' });
      }
      //console.log(dealers);
      updateComboOptions(dealers, setComboDealers);
    }
  }, [dealers]);

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
      //console.log(allRecieverPorts);
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
    navigate(`/${lang}/admin/dashboard/cars`);
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
        //console.log(row.saleDate);
        let sdt = new Date(row.saleDate.toISOString());
        let result = formatDate(sdt);
        row.saleDate = result;
        //console.log(result);
      }
      if (row.containerEntryDate && row.containerEntryDate instanceof Date) {
        let sdt = new Date(row.containerEntryDate.toISOString());
        let result = formatDate(sdt);
        row.containerEntryDate = result;
        //row.containerEntryDate = row.containerEntryDate.toISOString();
      }
      if (row.containerOpenDate && row.containerOpenDate instanceof Date) {
        let sdt = new Date(row.containerOpenDate.toISOString());
        let result = formatDate(sdt);
        row.containerOpenDate = result;
        //row.containerOpenDate = row.containerOpenDate.toISOString();
      }
      if (row.greenDate && row.greenDate instanceof Date) {
        let sdt = new Date(row.greenDate.toISOString());
        let result = formatDate(sdt);
        row.greenDate = result;

        //row.greenDate = row.greenDate.toISOString();
      }
      if (row.userId < 0) {
        row.userId = null;
      }
      //console.log(row.saleDate);
      //return;
      await updateCar(row);
    });
    setLoading(false);
    setEditedRows([]);
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    // Customize the format as needed
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const handleMarkGreen = async (e, id) => {
    e.preventDefault();
    if (window.confirm('დარწმუნებული ხართ რომ გსურთ გამწვანება?')) {
      await markCarAsGreen(id);
      await fetchData();
    }
  };

  const handleEditClick = (id) => () => {
    //console.log(id);
    setIsOpen(true);
    navigate(`/${lang}/admin/dashboard/cars/${id}`);
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

    const dealer = dealers.find((dealer) => dealer.fullName === newRow.fullName);
    if (dealer) {
      newRow.userId = dealer.id;
      newRow.fullName = dealer.fullName;
    }

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
    //console.log(location);
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
    //console.log(newList);
    setEditedRows(newList);

    return newRow;
  };

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handlePriceReport = async (id) => {
    await getPriceReport(id);
  };

  const handleTransportingReport = async (id) => {
    await getTransportingReport(id);
  };

  const handleColumnVisibility = (model) => {
    setColumnVisibilityModel(model);
    UpdateColumns(model);
  };

  const handleChargeModal = (id) => {
    setCarChargeId(id);
    if (openCarCharge) {
      setCarChargeId(null);
      setOpenCarCharge(false);
      fetchData();
    } else {
      setCarChargeId(id);
      setOpenCarCharge(true);
    }
  };

  const columnsList = [
    { field: 'id', headerName: 'Id', width: 20, hideable: true, fontWeight: 'bold' },
    {
      field: 'mainImageUrl',
      width: 60,
      headerName: '',
      renderCell: (params) => (
        <>
          <PhotoCellRenderer
            key={params.id}
            id={params.id}
            value={`https://cline.ge${params.value}`}
          />
        </>
      ),
    },
    {
      field: 'carMarkName',
      headerName: t('column_carMarkName'),
      width: 90,
      hideable: true,
      fontWeight: 'bold',
    },
    { field: 'carModelName', headerName: t('column_carModelName'), width: 80, hideable: true },
    { field: 'carStatusId', headerName: 'carStatusId', width: 50 },
    {
      field: 'carStatusName',
      headerName: t('column_carStatusName'),
      width: 75,
      hideable: true,
      editable: true,
      type: 'singleSelect',
      valueOptions: comboCarStatuses,
    },
    { field: 'userId', headerName: 'userId', width: 50 },
    {
      field: 'fullName',
      headerName: 'fullName',
      width: 100,
      editable: true,
      type: 'singleSelect',
      valueOptions: comboDealers,
      hideable: true,
    },
    {
      field: 'prodYear',
      headerName: 'Year',
      width: 60,
      editable: true,
      hideable: true,
      type: 'singleSelect',
      valueOptions: comboYears,
    },
    { field: 'vincode', headerName: 'vincode', width: 150, hideable: true, editable: true },
    { field: 'lotNumber', headerName: 'lotNumber', width: 90, hideable: true, editable: true },
    {
      field: 'containerNumber',
      headerName: 'containerNumber',
      width: 120,
      hideable: true,
      editable: true,
    },
    { field: 'lineId', headerName: 'lineId', width: 50 },
    {
      field: 'lineName',
      headerName: 'lineName',
      editable: true,
      width: 90,
      hideable: true,
      type: 'singleSelect',
      valueOptions: comboLines,
    },
    { field: 'auctionId', headerName: 'auctionId', width: 50 },
    {
      field: 'auctionName',
      headerName: 'auction',
      editable: true,
      width: 80,
      hideable: true,
      type: 'singleSelect',
      valueOptions: comboAuctions,
    },
    {
      field: 'buyerId1',
      headerName: 'buyer_Id',
      width: 150,
      hideable: true,
      editable: true,
      type: 'number',
      valueFormatter: (params) => {
        return params.value != null ? params.value.toString() : '';
      },
    },
    { field: 'portId', headerName: 'portId', width: 50 },
    {
      field: 'portName',
      headerName: 'port',
      editable: true,
      width: 50,
      hideable: true,
      type: 'singleSelect',
      valueOptions: comboPorts,
    },
    { field: 'locationId', headerName: 'locationId', width: 50 },
    {
      field: 'locationName',
      headerName: 'location',
      editable: true,
      width: 150,
      hideable: true,
      type: 'singleSelect',
      valueOptions: comboLocations,
    },
    {
      field: 'dealerWin',
      headerName: 'dealerWin $',
      width: 75,
      hideable: true,
      type: 'number',
      editable: true,
      cellClassName: (params) => {
        if (params.row.isGreen) {
          return 'cell-green';
        }
      },
      renderCell: (params) => {
        return <div>{params.value} $</div>;
      },
    },
    {
      field: 'saleDate',
      headerName: 'saleDate',
      width: 75,
      hideable: true,
      editable: true,
      type: 'date',
      valueGetter: ({ value }) => value && new Date(value),
    },
    {
      field: 'reciever',
      headerName: 'reciever',
      width: 125,
      hideable: true,
      editable: true,
      valueGetter: (params) => params.row.reciever || null,
    },
    {
      field: 'recieverPersonalId',
      headerName: 'reciever PersonalId',
      width: 130,
      hideable: true,
      editable: true,
    },
    { field: 'phoneNumber', headerName: 'phoneNumber', width: 100, hideable: true, editable: true },
    {
      field: 'auctionPay',
      headerName: 'auction Pay $',
      width: 90,
      hideable: true,
      type: 'number',
      editable: true,
      renderCell: (params) => {
        return <div>{params.value} $</div>;
      },
    },
    {
      field: 'wayPay',
      headerName: 'wayPay $',
      width: 70,
      hideable: true,
      type: 'number',
      editable: true,
      renderCell: (params) => {
        return <div>{params.value} $</div>;
      },
    },
    {
      field: 'tempPriceIncrease',
      headerName: 'temp Price Increase $',
      width: 145,
      hideable: true,
      type: 'number',
      editable: true,
      renderCell: (params) => {
        return <div>{params.value} $</div>;
      },
    },
    {
      field: 'documentPrice',
      headerName: 'document Price $',
      width: 115,
      hideable: true,
      type: 'number',
      editable: true,
      renderCell: (params) => {
        return <div>{params.value} $</div>;
      },
    },
    {
      field: 'fine',
      headerName: 'fine $',
      width: 45,
      hideable: true,
      type: 'number',
      editable: true,
      renderCell: (params) => {
        return <div>{params.value} $</div>;
      },
    },
    {
      field: 'insurance',
      headerName: 'insurance $',
      width: 80,
      hideable: true,
      type: 'number',
      editable: true,
      renderCell: (params) => {
        return <div>{params.value} $</div>;
      },
    },
    {
      field: 'payOfService',
      headerName: 'pay Of Service $',
      width: 125,
      hideable: true,
      type: 'number',
      editable: true,
      renderCell: (params) => {
        return <div>{params.value} $</div>;
      },
    },
    {
      field: 'transportAmount',
      headerName: 'transport Amount $',
      width: 125,
      hideable: true,
      type: 'number',
      editable: true,
      renderCell: (params) => {
        return <div>{params.value} $</div>;
      },
    },
    {
      field: 'balance',
      headerName: 'Balance $',
      width: 100,
      editable: false,
      hideable: true,
      renderCell: (params) => {
        const data = params.row;
        const getNumber = (val) => (isNaN(Number(val)) ? 0 : Number(val));
        const taxes = -(
          getNumber(data.auctionPay) +
          getNumber(data.tempPriceIncrease) +
          getNumber(data.documentPrice) +
          getNumber(data.fine) +
          getNumber(data.insurance) +
          getNumber(data.payOfService) +
          getNumber(data.transportAmount) +
          getNumber(data.sublot)
        );

        const charges = data.chargeHistory
          ? data.chargeHistory.reduce((sum, curr) => sum + (Number(curr.amount) || 0), 0)
          : 0;
        return taxes + charges;
      },
    },
    { field: 'recieverPortId', headerName: 'recieverPortId', width: 50 },
    {
      field: 'recieverPortName',
      headerName: 'reciever PortName',
      editable: true,
      width: 120,
      hideable: true,
      type: 'singleSelect',
      valueOptions: comboRecieverPorts,
    },
    {
      field: 'containerEntryDate',
      headerName: 'containerEntryDate',
      width: 130,
      hideable: true,
      editable: true,
      type: 'date',
      valueGetter: ({ value }) => value && new Date(value),
    },
    {
      field: 'containerOpenDate',
      headerName: 'containerOpenDate',
      width: 130,
      hideable: true,
      editable: true,
      type: 'date',
      valueGetter: ({ value }) => value && new Date(value),
    },
    {
      field: 'greenDate',
      headerName: 'greenDate',
      width: 90,
      hideable: true,
      editable: true,
      type: 'date',
      valueGetter: ({ value }) => value && new Date(value),
    },
    {
      field: 'sublot',
      headerName: 'sublot',
      width: 75,
      hideable: true,
      type: 'number',
      editable: true,
    },
    {
      field: 'Pricing',
      headerName: 'Pricing',
      width: 80,
      sortable: false,
      renderCell: (params) => (
        <GridActionsCellItem
          icon={<ExcelIcon fill="#FF0000" />}
          label="Export to Excel"
          onClick={() => handlePriceReport(params.id)}
          color="inherit"
          showInMenu={false}
        />
      ),
    },
    {
      field: 'Transporting',
      headerName: 'Transporting',
      width: 80,
      sortable: false,
      renderCell: (params) => (
        <GridActionsCellItem
          icon={<ExcelIcon fill="#FF0000" />}
          label="Export to Excel"
          onClick={() => handleTransportingReport(params.id)}
          color="inherit"
          showInMenu={false}
        />
      ),
    },
    {
      field: 'actions',
      type: 'actions',
      width: 160,
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<BillIcon fill="#FF0000" />}
            label="Export to Excel"
            color="inherit"
            onClick={() => handleChargeModal(id)}
          />,
          <GridActionsCellItem
            icon={<MakeGreenIcon fill="#fff" />}
            label="MakeGreen"
            onClick={(e) => handleMarkGreen(e, id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<EditIcon fill="#FF0000" />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          // <GridActionsCellItem
          //   icon={<DeleteIcon fill="black" />}
          //   label="Delete"
          //   onClick={(e) => handleDeleteClick(e, id)}
          //   color="inherit"
          // />,
        ];
      },
    },
  ];

  const CustomComponent = () => {
    return (
      <>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
            <div>
              <AppButton type="button" small label={'new'} onClick={handleOpenDialog} />
            </div>
            <div style={{ marginLeft: '10px' }}>
              <AppButton
                type={'button'}
                small
                label={'save'}
                onClick={(e) => handleSave(e)}
                color={'#0c2d57'}
              />
            </div>
            <label style={{ marginLeft: '10px' }}>{editedRows.length} row(s) affected</label>
          </div>
          <GridPagination height={'120px'}></GridPagination>
        </div>
      </>
    );
  };

  if (loading) {
    return <LoadingMarkUp />;
  }

  isOpen || openCarCharge
    ? (document.body.style.overflow = 'hidden')
    : (document.body.style.overflow = '');

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
          imagePadding={250}
          clickOutsideToClose
          toolbarButtons={[<CustomDownloadButton />]}
        />
      )}
      {isOpen && (
        <Dialog onClose={handleCloseDialog}>
          <Car handleCloseDialog={handleCloseDialog} />
        </Dialog>
      )}
      {openCarCharge && (
        <Dialog onClose={handleChargeModal}>
          <CarCharge
            handleCloseDialog={handleChargeModal}
            carId={carChargeId}
            handleChargeModal={handleChargeModal}
          />
        </Dialog>
      )}
      {/* style={{ marginBottom: '20px', display: 'flex', flexDirection: 'row' }} */}

      <div style={{ padding: '0 40px 0 40px' }} id="ColorBlakId">
        {carsData && (
          <DataGrid
            getRowId={(row) => row.id}
            rows={carsData}
            columns={columnsList}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={handleProcessRowUpdate}
            density="compact"
            columnVisibilityModel={columnVisibilityModel}
            onColumnVisibilityModelChange={handleColumnVisibility}
            onProcessRowUpdateError={(error) => {
              //console.log(error);
            }}
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0 ? 'even-row' : 'Mui-odd'
            }
            // {...carsData}
            initialState={{
              ...carsData.initialState,
              pagination: { paginationModel: { pageSize: 50 } },
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
            pageSizeOptions={[50, 100, 1000]}
            slots={{
              toolbar: GridToolbar,
              footer: CustomComponent,
            }}
            sx={{
              height: 'calc(100vh - 125px)',
              overflowX: 'scroll',
              background: 'white',
              '& .MuiInputBase-input': {
                color: 'black !important',
              },
              '& .MuiDataGrid-root': {
                color: 'black !important',
              },
              fontSize: '10px !important',
              fontWeight: 'bold',
              '& .MuiDataGrid-columnHeaderTitle': {
                fontWeight: 'bold !important',
                fontSize: '12px !important',
              },
              '& .MuiDataGrid-row:nth-type(odd)': {
                backgroundColor: 'aliceblue',
              },
              '& .MuiDataGrid-columnHeaders': {
                position: 'sticky',
              },
            }}
          />
        )}
      </div>
    </>
  );
};

export default Cars;
