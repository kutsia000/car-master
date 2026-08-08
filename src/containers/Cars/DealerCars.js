import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DealerServiceContext } from '../../services/Dealer/DealerService';
import LoadingMarkUp from '../../components/Loading/Loading';
import styles from './Cars.module.scss';
import { Link, useLocation, createSearchParams, useNavigate, useParams } from 'react-router-dom';
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbar,
  GridRowEditStopReasons,
  GridPagination,
} from '@mui/x-data-grid';
import Lightbox from 'react-18-image-lightbox';
import 'react-18-image-lightbox/style.css';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import AppButton from '../../components/AppButton/AppButton';

const DealerCars = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const { getCars, updateCar, cars, error, user } = useContext(DealerServiceContext);

  console.log(user.balance);
  const { t, i18n } = useTranslation();
  const lang = i18n.language || 'en';
  const [loading, setLoading] = useState(true);
  const [editedRows, setEditedRows] = useState([]);
  const [lBoxIsOpen, setLBoxIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

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

  const handleDownloadImages = async () => {
    const zip = new JSZip();
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

  const handleSave = async (e) => {
    //e.preventDefault();
    //console.log(editedRows);
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

  const handleProcessRowUpdate = (newRow, oldRow) => {
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
    // { field: 'id', headerName: 'Id', width: 20, hideable: true },
    {
      field: 'mainImageUrl',
      width: 60,
      headerName: '',
      renderCell: (params) => (
        <PhotoCellRenderer
          key={params.id}
          id={params.id}
          value={`https://cline.ge${params.value}`}
        />
      ),
    },
    { field: 'carMarkName', headerName: t('column_carMarkName'), width: 90, hideable: true },
    { field: 'carModelName', headerName: t('column_carModelName'), width: 80, hideable: true },
    { field: 'carStatusId', headerName: 'carStatusId', width: 50 },
    {
      field: 'carStatusName',
      headerName: t('column_carStatusName'),
      width: 75,
      hideable: true,
    },
    { field: 'userId', headerName: 'userId', width: 50 },
    {
      field: 'fullName',
      headerName: 'fullName',
      width: 100,
      hideable: true,
    },
    {
      field: 'prodYear',
      headerName: 'ProdYear',
      width: 80,
      hideable: true,
    },
    { field: 'vincode', headerName: 'vincode', width: 150, hideable: true },
    { field: 'lotNumber', headerName: 'lotNumber', width: 90, hideable: true },
    {
      field: 'containerNumber',
      headerName: 'containerNumber',
      width: 120,
      hideable: true,
    },
    { field: 'lineId', headerName: 'lineId', width: 50 },
    {
      field: 'lineName',
      headerName: 'lineName',
      width: 90,
      hideable: true,
    },
    { field: 'auctionId', headerName: 'auctionId', width: 50 },
    {
      field: 'auctionName',
      headerName: 'auctionName',
      width: 100,
      hideable: true,
    },
    { field: 'portId', headerName: 'portId', width: 50 },
    {
      field: 'portName',
      headerName: 'portName',
      width: 80,
      hideable: true,
    },
    { field: 'locationId', headerName: 'locationId', width: 50 },
    {
      field: 'locationName',
      headerName: 'locationName',
      width: 100,
      hideable: true,
    },
    {
      field: 'dealerWin',
      headerName: 'dealerWin $',
      width: 80,
      hideable: true,
      type: 'number',
      //valueGetter: (params) => params.row.dealerWin || null,
      editable: true,
      cellClassName: (params) => {
        if (params.row.isGreen) {
          return 'cell-green';
        }
      },
      renderCell: (params) => {
        //console.log(params.row.dealerWin);
        return <div>{params.value} $</div>;
      },
    },
    {
      field: 'saleDate',
      headerName: 'saleDate',
      width: 75,
      hideable: true,
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
      headerName: 'recieverPersonalId',
      width: 130,
      hideable: true,
      editable: true,
    },
    { field: 'phoneNumber', headerName: 'phoneNumber', width: 150, hideable: true, editable: true },
    {
      field: 'auctionPay',
      headerName: 'auctionPay $',
      width: 90,
      hideable: true,
      type: 'number',
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
      renderCell: (params) => {
        return <div>{params.value} $</div>;
      },
    },
    {
      field: 'tempPriceIncrease',
      headerName: 'tempPriceIncrease $',
      width: 145,
      hideable: true,
      type: 'number',
      renderCell: (params) => {
        return <div>{params.value} $</div>;
      },
    },
    {
      field: 'documentPrice',
      headerName: 'documentPrice $',
      width: 115,
      hideable: true,
      type: 'number',
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
      renderCell: (params) => {
        return <div>{params.value} $</div>;
      },
    },
    {
      field: 'payOfService',
      headerName: 'documentPrice $',
      width: 125,
      hideable: true,
      type: 'number',
      renderCell: (params) => {
        return <div>{params.value} $</div>;
      },
    },
    {
      field: 'transportAmount',
      headerName: 'transportAmount $',
      width: 125,
      hideable: true,
      type: 'number',
      renderCell: (params) => {
        return <div>{params.value} $</div>;
      },
    },
    // { field: 'lineId', headerName: 'lineId', width: 50 },
    // {
    //   field: 'lineName',
    //   headerName: 'lineName',
    //   width: 90,
    //   hideable: true,
    // },
    { field: 'recieverPortId', headerName: 'recieverPortId', width: 50 },
    {
      field: 'recieverPortName',
      headerName: 'recieverPortName',
      width: 120,
      hideable: true,
    },
    {
      field: 'containerEntryDate',
      headerName: 'containerEntryDate',
      width: 130,
      hideable: true,
      type: 'date',
      valueGetter: ({ value }) => value && new Date(value),
    },
    {
      field: 'containerOpenDate',
      headerName: 'containerOpenDate',
      width: 130,
      hideable: true,
      type: 'date',
      valueGetter: ({ value }) => value && new Date(value),
    },
    {
      field: 'greenDate',
      headerName: 'greenDate',
      width: 90,
      hideable: true,
      type: 'date',
      valueGetter: ({ value }) => value && new Date(value),
    },
    {
      field: 'sublot',
      headerName: 'sublot',
      width: 75,
      hideable: true,
      type: 'number',
    },
  ];

  function IsCellEditable(params) {
    if (params.field == 'dealerWin') {
      if (params.formattedValue == '') return true;
      else return false;
    }
    return true;
    //return params.ise;
  }

  const CustomComponent = () => {
    return (
      <>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
            {/* <div>
              <AppButton type="button" small label={'new'} onClick={handleOpenDialog} />
            </div> */}
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
            <label style={{ marginLeft: '100px' }}>
              Balance: <span style={{ color: 'green' }}>{user.balance}$</span>
            </label>
          </div>
          <GridPagination height={'120px'}></GridPagination>
        </div>
      </>
    );
  };

  if (loading) {
    return <LoadingMarkUp />;
  }

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

      {/* <div className={styles.Cars__new}>
        <AppButton
          type={'button'}
          large
          label={'save'}
          onClick={(e) => handleSave(e)}
          color={'#0c2d57'}
        />
      </div> */}

      {/* <label style={{ color: 'white', padding: '0 40px 0 40px' }}>
        {editedRows.length} row(s) affected
      </label> */}
      <div style={{ padding: '0 40px 0 40px' }}>
        <DataGrid
          getRowId={(row) => row.id}
          rows={cars}
          columns={columns}
          density="compact"
          isCellEditable={IsCellEditable}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={handleProcessRowUpdate}
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? 'even-row' : 'odd'
          }
          onProcessRowUpdateError={(error) => {
            //console.log(error);
          }}
          {...cars}
          initialState={{
            ...cars.initialState,
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
            fontSize: '10px !important',
            fontWeight: 'bold',
            '& .MuiDataGrid-columnHeaderTitle': {
              fontWeight: 'bold !important',
              fontSize: '12px !important',
            },
            '& .MuiDataGrid-row:nth-type(odd)': {
              backgroundColor: 'aliceblue',
            },
          }}
        />
      </div>
    </>
  );
};

export default DealerCars;
