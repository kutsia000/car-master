import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DealerServiceContext } from '../../services/Dealer/DealerService';
import LoadingMarkUp from '../../components/Loading/Loading';
import Dialog from '../../components/Dialog/Dialog';
import Car from './Car';
import { Link, useLocation, createSearchParams, useNavigate, useParams } from 'react-router-dom';
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbar,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import Lightbox from 'react-18-image-lightbox';
import 'react-18-image-lightbox/style.css';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const images = [
  'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80',
  'https://th.bing.com/th/id/OIG.lVXjWwlHyIo4QdjnC1YE',
  'https://1.bp.blogspot.com/-kK7Fxm7U9o0/YN0bSIwSLvI/AAAAAAAACFk/aF4EI7XU_ashruTzTIpifBfNzb4thUivACLcBGAsYHQ/s1280/222.jpg',
  'https://pixlr.com/images/index/remove-bg.webp',
];

const DealerCars = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const { getCars, updateCar, cars, error } = useContext(DealerServiceContext);

  const { t, i18n } = useTranslation();
  const lang = i18n.language || 'en';
  const [loading, setLoading] = useState(true);
  const [editedRows, setEditedRows] = useState([]);
  const [lBoxIsOpen, setLBoxIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await getCars();
    setLoading(false);
  };

  const PhotoCellRenderer = ({ value }) => {
    return (
      <img
        src={value}
        alt="Photo"
        style={{ maxWidth: '100%', maxHeight: '100px', cursor: 'pointer' }}
        onClick={() => setLBoxIsOpen(true)}
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
    e.preventDefault();
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
    { field: 'id', headerName: 'Id', width: 50, hideable: true },
    {
      field: 'mainImageUrl',
      width: 150,
      headerName: '',
      renderCell: (params) => (
        <PhotoCellRenderer
          key={params.id}
          value={
            'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80'
          }
        />
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
    },
    { field: 'userId', headerName: 'userId', width: 50 },
    {
      field: 'fullName',
      headerName: 'fullName',
      width: 150,
      hideable: true,
    },
    {
      field: 'prodYear',
      headerName: 'ProdYear',
      width: 150,
      hideable: true,
    },
    { field: 'vincode', headerName: 'vincode', width: 150, hideable: true },
    { field: 'lotNumber', headerName: 'lotNumber', width: 150, hideable: true },
    { field: 'auctionId', headerName: 'auctionId', width: 50 },
    {
      field: 'auctionName',
      headerName: 'auctionName',
      width: 150,
      hideable: true,
    },
    { field: 'portId', headerName: 'portId', width: 50 },
    {
      field: 'portName',
      headerName: 'portName',
      width: 100,
      hideable: true,
    },
    { field: 'locationId', headerName: 'locationId', width: 50 },
    {
      field: 'locationName',
      headerName: 'locationName',
      width: 150,
      hideable: true,
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
    },
    {
      field: 'wayPay',
      headerName: 'wayPay',
      width: 150,
      hideable: true,
      type: 'number',
    },
    {
      field: 'tempPriceIncrease',
      headerName: 'tempPriceIncrease',
      width: 150,
      hideable: true,
      type: 'number',
    },
    {
      field: 'documentPrice',
      headerName: 'documentPrice',
      width: 150,
      hideable: true,
      type: 'number',
    },
    {
      field: 'fine',
      headerName: 'fine',
      width: 100,
      hideable: true,
      type: 'number',
    },
    {
      field: 'insurance',
      headerName: 'insurance',
      width: 150,
      hideable: true,
      type: 'number',
    },
    {
      field: 'payOfService',
      headerName: 'documentPrice',
      width: 150,
      hideable: true,
      type: 'number',
    },
    {
      field: 'transportAmount',
      headerName: 'transportAmount',
      width: 150,
      hideable: true,
      type: 'number',
    },
    { field: 'lineId', headerName: 'lineId', width: 50 },
    {
      field: 'lineName',
      headerName: 'lineName',
      width: 100,
      hideable: true,
    },
    { field: 'recieverPortId', headerName: 'recieverPortId', width: 50 },
    {
      field: 'recieverPortName',
      headerName: 'recieverPortName',
      width: 100,
      hideable: true,
    },
    {
      field: 'containerEntryDate',
      headerName: 'containerEntryDate',
      width: 150,
      hideable: true,
      type: 'date',
      valueGetter: ({ value }) => value && new Date(value),
    },
    {
      field: 'containerOpenDate',
      headerName: 'containerOpenDate',
      width: 150,
      hideable: true,
      type: 'date',
      valueGetter: ({ value }) => value && new Date(value),
    },
    {
      field: 'greenDate',
      headerName: 'greenDate',
      width: 150,
      hideable: true,
      type: 'date',
      valueGetter: ({ value }) => value && new Date(value),
    },
    {
      field: 'sublot',
      headerName: 'sublot',
      width: 150,
      hideable: true,
      type: 'number',
    },
  ];

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
          clickOutsideToClose
          toolbarButtons={[<CustomDownloadButton />]}
        />
      )}
      <div>
        <button type="button" className="btn btn-md btn-primary" onClick={(e) => handleSave(e)}>
          save
        </button>
      </div>
      <label>{editedRows.length} row(s) affected</label>
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
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
        />
      </div>
    </>
  );
};

export default DealerCars;
