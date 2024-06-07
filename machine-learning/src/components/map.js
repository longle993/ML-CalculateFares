import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { FaMapMarkerAlt } from "react-icons/fa";
import L from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';

const position = [51.505, -0.09];

const createCustomIcon = () => {
    const iconMarkup = renderToStaticMarkup(<FaMapMarkerAlt size={15} color="red" />);
    return L.divIcon({
        html: iconMarkup,
        iconSize: [15, 15],
        className: 'custom-marker'
    });
};

const UpdateMapView = ({ from, to }) => {
    const map = useMap();

    useEffect(() => {
        if (from && !to) {
            map.setView([from.lat, from.lon], 13);
        } else if (from && to) {
            const bounds = L.latLngBounds([from.lat, from.lon], [to.lat, to.lon]);
            map.fitBounds(bounds, { padding: [50, 50] });
        }
    }, [from, to, map]);

    return null;
};

const Maps = ({ from, to }) => {
    const selectPosition = from;
    const locationSelection = [selectPosition?.lat, selectPosition?.lon]

    const selectTo = to;
    const locationTo = [selectTo?.lat, selectTo?.lon]

    return (
        <MapContainer center={position} zoom={13} style={{ width: '100%', height: '100%' }}>
            <TileLayer
                url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=bAgsZ6LpQEybBJFCTTMW"
            />
            <UpdateMapView from={from} to={to} />
            {selectPosition && (
                <Marker position={locationSelection} icon={createCustomIcon()}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            )}
            {selectTo && (
                <Marker position={locationTo} icon={createCustomIcon()}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            )}
            {selectPosition && selectTo && (
                <Polyline positions={[locationSelection, locationTo]} color="blue" />
            )}
        </MapContainer>
    );
};

export default Maps;
