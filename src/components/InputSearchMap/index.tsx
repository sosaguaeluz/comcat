import React, { useEffect, useState } from 'react';
import * as S from './style';
import { Typeahead } from "react-bootstrap-typeahead"; // ES2015
import { GOOGLE_MAPS_API_KEY } from "../../constants";
import { useJsApiLoader } from "@react-google-maps/api";
import "react-bootstrap-typeahead/css/Typeahead.css";

const InputSearchMap: React.FC <any> = (props) => {
    const [places, setPlaces] = useState<any[]>([]);
    const { isLoaded } = useJsApiLoader({
      googleMapsApiKey: GOOGLE_MAPS_API_KEY,
      language: "pt-br",
      libraries: ["places"],
    });
  
    useEffect(() => {
      const value = props.value;
      var div: any = document.getElementById(props.name);
  
      if (!isLoaded || value?.length < 3 || !div) return;
  
      var service = new google.maps.places.AutocompleteService();
  
      service.getPlacePredictions(
        {
          input: value,
          componentRestrictions: { country: "br" },
        },
        function (results, status) {
          setPlaces(results || []);
          console.log("textSearch", { results, status });
        }
      );
    }, [isLoaded, props.value]);

    return (
        <S.Container>
            <Typeahead
                id={`typeahead_${props.name}`}
                // options={
                //   props.value || places.length > 0
                //     ? Array.from(
                //         new Set([props.value, ...places?.map((v: any) => v.description)])
                //       )
                //     : []
                // }
                options={places?.map((v: any) => v.description)}
                // id={props.name}
                inputProps={{
                    name: props.name,
                    id: props.name,
                    value: props.value,
                }}
                onInputChange={(v, e) => {
                    console.log("onInputChange", { v, e });
                    props.onChange(v);
                }}
                emptyLabel="Nenhum resultado para exibir."
                onBlur={props.onBlur}
                selected={props.value ? [props.value] : []}
                onChange={(selecteds: any) => {
                    const [selected] = selecteds;
                    console.log("onChange", { selected });

                    props.onChange?.(selected);

                    const geoService = new google.maps.Geocoder();
                    geoService.geocode({ address: selected }, (data, status) => {
                    if (!data) return;

                    const [geoResult] = data;
                    const location = {
                        lat: geoResult?.geometry?.location.lat?.(),
                        lng: geoResult?.geometry?.location?.lng?.(),
                    };
                    console.log("geocode", { data, location });
                    props.onLocationChange?.(location);
                    });
                }}
                //   {...props}
            />
        </S.Container>
    )
}

export default InputSearchMap;