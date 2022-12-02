import React, { useEffect, useState } from 'react';
import * as S from './style';
import { Typeahead } from "react-bootstrap-typeahead"; // ES2015
import { GOOGLE_MAPS_API_KEY } from "../../constants";
import { useJsApiLoader } from "@react-google-maps/api";
import "react-bootstrap-typeahead/css/Typeahead.css";

const InputSearchMap: React.FC <any> = (props) => {
    const [ places, setPlaces ] = useState<any>([]);
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyAySrRV2P8-DZb5mWAKZfLkYo3UM5H-2Do",
        language: 'pt-br',
        libraries: ['places']
    });

    useEffect(() => {
        const value = props.value;

        var div: any = document.getElementById(props.name);
        
        if (!isLoaded || value?.length < 3 || !div) return;

        var service = new google.maps.places.AutocompleteService();

        service.getPlacePredictions(
            {
                input: value,
                componentRestrictions: { country: "br" }
            },
            function (result, status) {
                setPlaces(result || []);
                console.log("textSearch", { result, status });
            }
        )

    }, [isLoaded, props.value])

    return (
        <S.Container>
            <Typeahead
                id={`typehead_${props?.name}`}
                options={places?.map((v: any) => v?.description)}
                emptyLabel="Nenhum resultado para exibir."
                inputProps={{
                    name: props?.name,
                    id: props?.name,
                    value: props?.value
                }}
                selected={props?.value ? [props?.value] : []}
                onBlur={props?.onBlur}
                onInputChange={(v, e) => {
                    console.log("onInputChane", { e, v });
                    props.onChange(v);
                }}
                onChange={(selecteds: any) => {
                    const [selected] = selecteds;
                    console.log("onChange", {selected});

                    props.onChange?.(selected);

                    const geoService = new window.google.maps.Geocoder();
                    geoService.geocode({ address: selected }, (data, status) => {
                        if(!data) return;

                        const [geoResult] = data;
                        const location = {
                            lat: geoResult?.geometry?.location?.lat?.(),
                            lng: geoResult?.geometry?.location?.lng?.()
                        }
                        console.log("geocode", { data, location });
                        props.onLoacationChange?.(location)
                    })
                }}
            />
        </S.Container>
    )
}

export default InputSearchMap;