import {useState} from 'react';
import GoogleMapReact from 'google-map-react';
import dotenv from 'dotenv';
import LocationMarker from './LocationMarker';
import LocationInfo from './LocationInfo';

dotenv.config();

const Map=({eventData,center,zoom}) =>{
  const [locationInfo,setLocationInfo]=useState(null);
  const markers=eventData.map(ev=>{
    if(ev.categories[0].id===8){
      return <LocationMarker lat={ev.geometries[0].coordinates[1]} lng= {ev.geometries[0].coordinates[0]} onClick={()=>setLocationInfo({id:ev.id,title:ev.title})}/>

    }
    return null;
  })
  return (
    <div className="map">
       <GoogleMapReact
       bootstrapURLKeys={{key:process.env.API_KEY}}
       defaultCenter={center}
       defaultZoom={zoom}
       >
       {markers}
       </GoogleMapReact>
       {locationInfo && <LocationInfo info={locationInfo}/>}

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
