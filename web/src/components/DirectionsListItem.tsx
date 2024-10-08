import { useMemo } from "react";
import { Coordinate } from "../algorithm/dijkstra";
import { GraphLocation } from "../algorithm/dijkstra";
import formatPolyLine from "../map/formatPolyLine";
import { GoogleMapsLibrary } from "../map/GoogleMapsLibrary";

export default function DirectionsListItem({ graphLocation, googleMap, order, Markers }:
    { graphLocation: GraphLocation, googleMap: any, order: number, Markers: GoogleMapsLibrary }) {
    const highlightedSegment = useMemo(() => {
        if(graphLocation.path.length == 1) {
            return [
                new Markers.AdvancedMarkerElement({
                    position: new Coordinate(graphLocation.path[0]).toGoogleMapsCoordinate(),
                    content: new Markers.PinElement({
                        background: '#808080',
                        borderColor: '#4d4d4d',
                        glyphColor: '#4d4d4d'
                    }).element
                })
            ];
        } else return [
            new google.maps.Polyline({
                ...formatPolyLine(graphLocation.path, graphLocation.travelMode ?? ""),
                strokeWeight: 6,
                zIndex: 3
            }),
            new google.maps.Polyline({
                ...formatPolyLine(graphLocation.path, graphLocation.travelMode ?? ""),
                strokeColor: 'black',
                strokeWeight: 10,
                zIndex: 2
            }),
        ]
    }, []);
    return <div className="flex text-left px-5 hover:bg-gray-300/85"
        onMouseEnter={() => highlightedSegment.forEach(segment => segment.setMap(googleMap))}
        onMouseLeave={() => highlightedSegment.forEach(segment => segment.setMap(null))}>
        <div className="min-w-7">{`${order}.`}</div>
        <div>
            {graphLocation.toDirectionsString()}
        </div>
    </div>;
}
