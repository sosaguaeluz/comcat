import React, { useEffect } from "react";
import chromajs from "chroma-js";

// import { Container } from './styles';

interface ClusterMarkerProps {
  map: any;
  lat: number;
  lng: number;
  qtd: number;
  elapsed_time_avg: number;
  color: string;
  services: any[];
}

const ClusterMarker: React.FC<ClusterMarkerProps> = ({
  map,
  lat,
  lng,
  qtd,
  elapsed_time_avg,
  services,
  color
}) => {
  class CustomMapsOverlay2 extends google.maps.OverlayView {
    private bounds: google.maps.LatLngBounds;
    //   private image: string;
    private div?: HTMLElement;
    private content?: HTMLElement;
    private image?: HTMLImageElement;
    private image_uri: string;

    constructor(
      bounds: google.maps.LatLngBounds,
      content: HTMLElement,
      image: string
    ) {
      super();

      this.bounds = bounds;
      this.content = content;
      this.image_uri = image;
    }
    // [END maps_overlay_hideshow_subclass]

    // [START maps_overlay_hideshow_onadd]
    /**
     * onAdd is called when the map's panes are ready and the overlay has been
     * added to the map.
     */
    onAdd() {
      if (!this.content) return;

      this.div = this.content; //document.createElement("div");
      this.div.style.zIndex = "9999";
      this.div.style.borderStyle = "none";
      this.div.style.borderWidth = "0px";
      this.div.style.position = "absolute";
      this.div.style.bottom = "0";
      this.div.style.fontWeight = "bold";

      this.image = document.createElement("img");
      this.image.src = this.image_uri;
      this.image.style.position = "absolute";
      //   this.image.style.backgroundColor = "red";

      const panes = this.getPanes()!;

      if (this.content) panes.overlayLayer.appendChild(this.content);
      //   if (this.image) panes.overlayLayer.appendChild(this.image);
    }

    draw() {
      const overlayProjection = this.getProjection();

      const sw = overlayProjection.fromLatLngToDivPixel(
        this.bounds.getSouthWest()
      )!;
      const ne = overlayProjection.fromLatLngToDivPixel(
        this.bounds.getNorthEast()
      )!;

      if (this.div && this.image) {
        this.div.style.left = sw.x + "px";
        this.div.style.top = ne.y + "px";
        this.div.style.width = ne.x - sw.x + "px";
        this.div.style.height = sw.y - ne.y + "px";
        this.div.style.paddingTop = (sw.y - ne.y) * 0.28 + "px";
        this.div.style.fontSize = (sw.y - ne.y) / 2 + "px";
        this.div.style.textAlign = "center";

        // this.image.style.left = sw.x * 0.2 + "px";
        // this.image.style.top = ne.y * 0.5 + "px";
        // this.image.style.paddingTop = (sw.y - ne.y) * 0.28 + "px";
        this.div.appendChild(this.image);

        this.image.style.top = (ne.x - sw.x) * 0.14 + "px";
        this.image.style.left = (ne.x - sw.x) * 0.4 + "px";
        // this.image.style.width = (ne.x - sw.x) * 0.2 + "px";
        this.image.style.height = (sw.y - ne.y) * 0.2 + "px";

        // this.div.children[0].hei;
        // const image = this.div.childNodes[0] as HTMLElement;
        // image.style.left = sw.x + "px";
        // image.style.top = ne.y + "px";
        // image.style.width = ne.x - sw.x + "px";
        // image.style.height = sw.y - ne.y + "px";

        /*
        
         <img style="position:absolute;
                  top:0; 
                //   background-color: red; 
                  height: 40px; 
                  width: 40px;
                  background-size: contain;
                  background-position: center center;
                  background-repeat: no-repeat;
                  background-image: url(' data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAcCAYAAACQ0cTtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGdSURBVHgBtVWBUcMwDFS4DhA20AZ0hG5AO0HZoGwQMwEjFDboBjkmoExAN2g2MFJjNcI4ieKSv/M5sf8lK1JkAIL3fkUDYQaQ3SWNtbyUvsWZNwxi5iPPRkfnYL+URacclgnjFY1aCb3i8/ou/jJBJ3wXn4Id1tHaLuHgW40YVeSs/uOo5xNUysie89rD43y/pRyaQIInPyGPQaPzswIrQviMLUyAOmRtFVyrEzLg4+pTuEvw5bMdIQ+iQ4uz/4IpslOYEW5zcjKxs6qq1aH8i1NEblJVdbrPoHNTRKXqEHujZi9ReUPfjMWoHL6OcCvlCCEHwaHkDwc40m1wyN5g6RdFcaLpPbyue2iyfgj8XiygOyGLliRwEUd+0i1xHhI2pAl8xBuhKX+RzYNe3PoO8X229jY8RjpUe5ceWwTj0gdfEpFJ1EMV1vw6fadzNMmVc39dpPEMM8C3N4Hj58JARpq49Mf+nQ1F18CNJ1vl5CyF0cjE4QiFc5Z7Jc0DU2QM3zZlTGwdKaoNGLAAOxDy77gLpkTG1ZiqyMZahT/jamN2kB7pNwAAAABJRU5ErkJggg==')"/>
        */
      }
    }

    onRemove() {
      if (this.div) {
        (this.div.parentNode as HTMLElement).removeChild(this.div);
        delete this.div;
      }
    }

    hide() {
      if (this.div) {
        this.div.style.visibility = "hidden";
      }
    }

    show() {
      if (this.div) {
        this.div.style.visibility = "visible";
      }
    }

    toggle() {
      if (this.div) {
        if (this.div.style.visibility === "hidden") {
          this.show();
        } else {
          this.hide();
        }
      }
    }

    toggleDOM(map: google.maps.Map) {
      if (this.getMap()) {
        this.setMap(null);
      } else {
        this.setMap(map);
      }
    }
    PRESERVE_COMMENT_ABOVE = 1; // force tsc to maintain the comment above eslint-disable-line
  }

  useEffect(() => {
    const _max = 500;
    const _qtd = qtd * 1.5 * 15 + _max * 0.5;
    const size = _qtd > _max ? _max : _qtd;
    const percentace = (1 / 24) * elapsed_time_avg;
    let overlay: CustomMapsOverlay2 | null = null;
    let circles: any = [];

    // const scale = chromajs.scale(["#47DED0", "#F77014", "#FF000E"]);
    // const color = scale(percentace).hex();

    console.log("get chromejs color", color);

    const cluster_circle = new google.maps.Circle({
      strokeColor: color || "blue",
      strokeOpacity: 1,
      strokeWeight: 0,
      fillColor: color,
      fillOpacity: 1,
      map,
      center: { lat, lng },
      radius: size,
    });

    circles.push(cluster_circle);

    services.forEach((service, i) => {
      const center = { lat, lng };
      if (services.length > 1) {
        // center.lat = center.lat * 0.99999;
        if (i === 0) center.lng = center.lng * 0.999975;
        if (i === 1) center.lng = center.lng * 1.000025;
      }
      const _circle = new google.maps.Circle({
        strokeColor: "#fff",
        strokeOpacity: 1,
        strokeWeight: 0,
        strokePosition: 0,
        fillColor: "#fff",
        fillOpacity: 1,
        map,
        center,
        radius: 100,
      });

      const _circle2 = new google.maps.Circle({
        // strokeColor: "#fff",
        // strokeOpacity: 1,
        strokeWeight: 0,
        strokePosition: 0,
        fillColor: service.color, //"#47DED0",
        fillOpacity: 1,
        map,
        center,
        radius: 90,
      });

      const bounds =
        _circle.getBounds() ||
        new google.maps.LatLngBounds(new google.maps.LatLng(lat, lng));
      const div = document.createElement("div");
      div.style.color = "#fff";
      div.innerHTML = Number(service.qtd) + "";
      const image = service.image;
      overlay = new CustomMapsOverlay2(bounds, div, image);

      if (map) overlay.setMap(map);

      circles.push(_circle);
      circles.push(_circle2);
    });

    console.log("ClusterMarker Effect", { map, lat, lng, qtd });

    return () => {
      console.log("ClusterMarker clean", { overlay });
      overlay?.setMap(null);
      overlay?.onRemove();
      circles?.map((c: any) => c.setMap(null));
    };
  }, []);

  return <div />;
};

export default ClusterMarker;
