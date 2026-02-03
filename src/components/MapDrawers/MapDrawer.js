import React from 'react';
import GoogleMapReact from 'google-map-react';
import AppContactInfoCard from './AppContactInfoCard';
const AnyReactComponent = ({ text }) => <div className="marker"></div>;
//41.7276150407908, 44.740810298381675
const options = {
  styles: [
    {
      featureType: 'all',
      elementType: 'labels.text.fill',
      // stylers: [
      //   { color: '#333333' }, // Change label text color to gray
      // ],
    },
    {
      featureType: 'all',
      elementType: 'geometry.fill',
      // stylers: [
      //   { color: '#FFFFFF' }, // Change land color to white
      // ],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [
        // {
        //   color: 'gray',
        // },
        {
          lightness: 17,
        },
      ],
    },
    {
      featureType: 'landscape',
      elementType: 'geometry',
      stylers: [
        // {
        //   color: '#f5f5f5',
        // },
        {
          lightness: 20,
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.fill',
      stylers: [
        // {
        //   color: '#ffffff',
        // },
        {
          lightness: 17,
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [
        // {
        //   color: '#ffffff',
        // },
        {
          lightness: 29,
        },
        {
          weight: 0.2,
        },
      ],
    },
    {
      featureType: 'road.arterial',
      elementType: 'geometry',
      stylers: [
        // {
        //   color: '#ffffff',
        // },
        {
          lightness: 18,
        },
      ],
    },
    {
      featureType: 'road.local',
      elementType: 'geometry',
      stylers: [
        // {
        //   color: '#ffffff',
        // },
        {
          lightness: 16,
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [
        // {
        //   color: '#f5f5f5',
        // },
        {
          lightness: 21,
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [
        // {
        //   color: '#dedede',
        // },
        {
          lightness: 21,
        },
      ],
    },
    {
      elementType: 'labels.text.stroke',
      stylers: [
        {
          visibility: 'on',
        },
        {
          color: '#ffffff',
        },
        {
          lightness: 16,
        },
      ],
    },
    {
      elementType: 'labels.text.fill',
      stylers: [
        {
          saturation: 36,
        },
        {
          color: '#333333',
        },
        {
          lightness: 40,
        },
      ],
    },
    {
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [
        {
          color: '#f2f2f2',
        },
        {
          lightness: 19,
        },
      ],
    },
    {
      featureType: 'administrative',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#fefefe',
        },
        {
          lightness: 20,
        },
      ],
    },
    {
      featureType: 'administrative',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#fefefe',
        },
        {
          lightness: 17,
        },
        {
          weight: 1.2,
        },
      ],
    },
  ],
};

export default function SimpleMap() {
  const defaultProps = {
    center: {
      lat: 41.7276150407908,
      lng: 44.740810298381675,
    },
    zoom: 18,
  };

  const handleApiLoaded = (map, maps) => {
    // use map and maps objects
  };
  //options={options}
  //Old 41.72456359863281 44.72990036010742
  //41.7276150407908, 44.740810298381675

  return (
    <div style={{ height: '630px', width: '100%' }}>
      <AppContactInfoCard />
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyBEUGdOyb0Q5qRXDlDkWFZNR6OjkekTDHs' }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
      >
        <AnyReactComponent lat={41.7276150407908} lng={44.740810298381675} text="Cline" />
      </GoogleMapReact>
    </div>
  );
}
