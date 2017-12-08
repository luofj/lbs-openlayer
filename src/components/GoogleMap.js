import React, { Component } from 'react';
import ol from 'openlayers';
import 'openlayers/css/ol.css';
// import GoogleMapReact from 'google-map-react';
// import { GoogleApiWrapper } from 'google-maps-react';
// import styles from './GoogleMap.css';

// class GoogleMap extends Component {
//   constructor(props) {
//     super(props);
//     this.gmap = null;
//   }

//   componentDidMount() {
//     // eslint-disable-next-line
//     this.gmap = new window.google.maps.Map(this.gmape, {
//       disableDefaultUI: true,
//       keyboardShortcuts: false,
//       draggable: false,
//       disableDoubleClickZoom: true,
//       scrollwheel: false,
//       streetViewControl: false,
//       mapTypeId: 'satellite',
//     });
//     let view = new ol.View({
//       center: ol.proj.fromLonLat([116.37, 39.68], 'EPSG:4326'),
//       maxZoom: 21,
//       zoom: 11,
//       projection: 'EPSG:4326',
//     });
//     // ol.source.Vector 作为 ol.layer.Vector的数据集，增删改feature的方法由source提供
//     let vectorSource = new ol.source.Vector();
//     let vector = new ol.layer.Vector({
//       source: vectorSource
//     });
//     let map = new ol.Map({
//       target: 'olmap',
//       layers: [vector],
//       view: view,
//       controls: ol.control.defaults().extend(
//         [
//           new ol.control.FullScreen(),
//           new ol.control.ScaleLine(),
//           new ol.control.OverviewMap(),
//           new ol.control.Rotate(),
//           new ol.control.MousePosition(),
//           new ol.control.ZoomSlider(),
//           new ol.control.ZoomToExtent(),
//         ],
//       ),
//     });
//     view.on('change:center', function () {
//       let center = view.getCenter();
//       // eslint-disable-next-line
//       this.gmap.setCenter(new window.google.maps.LatLng(center[1], center[0])); // 注意顺序
//     });
//     // 同上，更改焦距时触发的时间
//     view.on('change:resolution', function () {
//       this.gmap.setZoom(view.getZoom());
//     });
//     this.olmap.parentNode.removeChild(this.olmap);
//     // eslint-disable-next-line
//     this.gmap.controls[window.google.maps.ControlPosition.TOP_LEFT].push(this.olmap);
//   }
//   // static defaultProps = {
//   //   center: { lat: 59.95, lng: 30.33 },
//   //   zoom: 11,
//   // };
//   render() {
//     return (
//       <div className={styles.normal}>
//         <div id="map">
//           <div ref={(text) => { this.gmape = text; }} id="gmap" /><div id="olmap" ref={(text) => { this.olmap = text; }} />
//         </div>
//       </div>
//       // <GoogleMapReact
//       //   defaultCenter={this.props.center}
//       //   defaultZoom={this.props.zoom}
//       //   bootstrapURLKeys={{ key: 'AIzaSyCDXUbxsqQTY1pS7wBipenFUfB_Y1CW91Q' }}
//       //   onGoogleApiLoaded={({ map, maps }) => console.log(map, maps)}
//       // />
//     );
//   }
// }

// export default GoogleApiWrapper({
//   apiKey: ('AIzaSyCDXUbxsqQTY1pS7wBipenFUfB_Y1CW91Q')
// })(GoogleMap);
// export default GoogleMap;
class GoogleMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapconfig: {
        center: { lat: 39.872, lng: 116 },
        zoom: 8,
        disableDefaultUI: true,
        keyboardShortcuts: false,
        draggable: false,
        disableDoubleClickZoom: true,
        scrollwheel: false,
        streetViewControl: false,
        mapTypeId: 'satellite',
      },
    };
  }

  componentDidMount() {
    // eslint-disable-next-line
    const google = window.google;
    const googleMap = new google.maps.Map(
      this.map,
      this.state.mapconfig,
    );
    const olView = new ol.View({
      center: ol.proj.fromLonLat([116, 39.872], 'EPSG:4326'),
      maxZoom: 21,
      minZoom: 4,
      zoom: 8,
      projection: 'EPSG:4326',
    });
    // ol.source.Vector 作为 ol.layer.Vector的数据集，增删改feature的方法由source提供
    const vectorSource = new ol.source.Vector();
    const vector = new ol.layer.Vector({
      source: vectorSource,
    });
    let map = new ol.Map({
      target: 'olmap',
      layers: [vector],
      view: olView,
      controls: ol.control.defaults({ attributionOptions: ({ collapsible: true }) }).extend(
        [
          new ol.control.FullScreen(),
          new ol.control.ScaleLine(),
          // new ol.control.OverviewMap(),
          new ol.control.Rotate(),
          new ol.control.MousePosition(),
          // new ol.control.ZoomSlider(),
          // new ol.control.ZoomToExtent(),
        ],
      ),
      interactions: ol.interaction.defaults({
        altShiftDragRotate: false,
        dragPan: false,
        rotate: false,
      }).extend([new ol.interaction.DragPan({ kinetic: null })]),
    });
    olView.on('change:center', function () {
      const center = olView.getCenter();
      // eslint-disable-next-line
      googleMap.setCenter(new google.maps.LatLng(center[1], center[0])); // 注意顺序
    });
    olView.on('change:resolution', function () {
      googleMap.setZoom(olView.getZoom());
    });
    this.olmap.parentNode.removeChild(this.olmap);
    // eslint-disable-next-line
    googleMap.controls[google.maps.ControlPosition.TOP_LEFT].push(this.olmap);
  }

  render() {
    return (
      <div>
        <div ref={(text) => { this.map = text; }} style={{ width: 1800, height: 800 }} />
        <div id="olmap" ref={(text) => { this.olmap = text; }} />
      </div>
    );
  }

}

export default GoogleMap;
