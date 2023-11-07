import React, { useState, useEffect } from 'react';
import styles from './AppCarInner.module.scss';
import AppImage from '../AppImage/AppImage';
import AppContainer from '../../layout/AppContainer/AppContainer';
import 'react-image-gallery/styles/scss/image-gallery.scss';
import ImageGallery from 'react-image-gallery';
import classNames from 'classnames';
import Lightbox from 'react-18-image-lightbox';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import 'react-18-image-lightbox/style.css';
import AppCheckCar from '../AppHero/AppCheckCar';

export default function AppCarInner({ images, data }) {
  const [imgs, setImgs] = useState([]);
  const [lightBoxImages, setLightBoxImages] = useState([]);
  const [lBoxIsOpen, setLBoxIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [dt, setDt] = useState('');

  useEffect(() => {
    if (data) {
      let imgs = [data.mainImageUrl, ...data.imageURLs];
      let images = imgs.map((i) => {
        return {
          original: `https://cline.ge${i}`,
          thumbnail: `https://cline.ge${i}`,
        };
      });
      setImgs(images);
      let lImages = imgs.map((i) => `https://cline.ge${i}`);
      setLightBoxImages(lImages);
      if (data.containerNumber) {
        //console.log(data.containerOpenDate);
        setDt(data.containerOpenDate);
      }
    }
  }, [data]);

  const handleLightBox = () => {
    //console.log(imgs);
    setLBoxIsOpen(true);
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

  const CustomDownloadButton = () => {
    return (
      <button className="btn btn-sm btn-info" type="button" onClick={() => handleDownloadImages()}>
        download all images
      </button>
    );
  };

  const wrapper = {
    padding: '200px',
  };
  //console.log(Date(data.containerOpenDate));
  return (
    <>
      {lBoxIsOpen && lightBoxImages && (
        <Lightbox
          mainSrc={lightBoxImages[photoIndex]}
          nextSrc={lightBoxImages[(photoIndex + 1) % lightBoxImages.length]}
          prevSrc={lightBoxImages[(photoIndex + lightBoxImages.length - 1) % lightBoxImages.length]}
          onCloseRequest={() => setLBoxIsOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + lightBoxImages.length - 1) % lightBoxImages.length)
          }
          onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % lightBoxImages.length)}
          enableZoom
          imagePadding={250}
          clickOutsideToClose
          toolbarButtons={[<CustomDownloadButton />]}
        />
      )}
      <section className={styles.AppCarInner}>
        <AppContainer>
          {/* <div style={{ marginTop: '50px;' }}>
            <AppCheckCar />
          </div> */}
          <div className={styles.AppCarInner__wrapper}>
            <div className={styles.AppCarInner__images}>
              {imgs.length > 0 && (
                <ImageGallery
                  items={imgs}
                  sizes={600}
                  showFullscreenButton={false}
                  onClick={() => handleLightBox()}
                />
              )}
            </div>
            <div className={styles.AppCarInner__details}>
              <h3 className={styles['AppCarInner__details--title']}>
                {data.prodYear} {data.carMarkName} {data.carModelName}
              </h3>
              <div className={styles['AppCarInner__details--points']}>
                <span>{data.prodYear}</span>
                <span>{data.carMarkName}</span>
                <span>{data.carModelName}</span>
              </div>
              {/* <span className={styles['AppCarInner__details--code']}>კოდი: 33541774</span>
            <div className={styles['AppCarInner__details--price']}>$41,085.00</div> */}
              <div className={styles['AppCarInner__details--additional']}>
                დამატებითი ინფორმაცია
              </div>
              <div className={[styles['AppCarInner__details--info']]}>
                <span>წელი: </span>
                <span>{data.prodYear}</span>
                <span>მწარმოებელი:</span>
                <span>{data.carMarkName}</span>
                <span>მოდელი:</span>
                <span>{data.carModelName}</span>
                <span>სტატუსი:</span>
                <span>{data.carStatusName}</span>
                <span>ლოკაცია:</span>
                <span>{data.locationName}</span>
                <span>VIN კოდი:</span>
                <span>{data.vincode}</span>
                <span>მიმღები პორტი:</span>
                <span>{data.recieverPortName}</span>
                <span>კონტეინერის გახსნის თარიღი:</span>
                <span>{dt}</span>
                <span>კონტეინერის ნომერი:</span>
                <span>{data.containerNumber}</span>
                <span>აუქციონი:</span>
                <span>{data.auctionName}</span>
                {/* <span>Interior Color:</span>
              <span>Jet Black/Ck Ash</span>
              <span>Stock Number:</span>
              <span>A16347</span> */}
              </div>
            </div>
          </div>
        </AppContainer>
      </section>
    </>
  );
}
