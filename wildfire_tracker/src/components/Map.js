import GoogleMapReact from 'google-map-react';
import dotenv from 'dotenv';

dotenv.config();

const Map=({center,zoom}) =>{
  return (
    <div className="map">
       <GoogleMapReact
       bootstrapURLKeys={{key:process.env.API_KEY}}
       defaultCenter={center}
       defaultZoom={zoom}
       >
       </GoogleMapReact>

    </div>
  )
}

// setting default props, lat for latitude
Map.defaultProps={
  center:{
    lat: 28.6139,
    lng: 77.2090
  },
  zoom: 6
}

export default Map;
