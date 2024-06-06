import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { FaMapMarkerAlt } from "react-icons/fa";
import L from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';

const position = [51.505, -0.09];

const createCustomIcon = () => {
    const iconMarkup = renderToStaticMarkup(<FaMapMarkerAlt size={15} color="red" />);
    return L.divIcon({
        html: iconMarkup,
        iconSize: [15,15],
        className: 'custom-marker'
    });
};

const Maps = () => {
    return (
        <MapContainer center={position} zoom={13} style={{ width: '100%', height: '100%' }}>
            <TileLayer
                url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=bAgsZ6LpQEybBJFCTTMW"
            />
            <Marker position={position} icon={createCustomIcon()}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default Maps;
