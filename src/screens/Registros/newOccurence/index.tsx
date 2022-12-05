import React, { useEffect, useState } from 'react';
import * as S from './style';
import {
    useService,
    api,
    useSources,
} from '../../../services';
import MenuItem from '@mui/material/MenuItem';
import { useSelector } from 'react-redux';
import { RootState } from '../../../stores';
import {
    CustomInput,
    CustomInputData,
    CustomSelect,
    CustomTextArea,
    CustomTolltip,
    InputSearchMap,
    MapSearch,
    ModalDelete,
    ModalMsg,
    PersonalModal
} from '../../../components';
import { 
    blueAlert,
    mapsDefault
} from '../../../assets';
import {
    useForm,
    Controller
} from "react-hook-form";
import {
    FormData,
    IProps
} from './types';
import { 
    TYPE_LOCAL,
    AREA
} from '../../../constants/index';
import { useMutation } from 'react-query';
import { queryClient } from '../../../services/index';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './schema';
import { Grid } from '@mui/material';
import { getCities, getStates } from "../../../utils/resources";

const NewOccurence: React.FC<IProps> = ({ onHide, isModal }) => {
    const { data: services } = useService();
    const { data: sources } = useSources();
    const states = getStates();
    const [ idOccurrence, setIdOccurrence ] = useState('');
    const [ open, setOpen ] = useState(false);
    const [ closeOccurrence, setCloseOccurrence ] = useState(false);
    const [filter, setFilter] = useState<any>({
        service: "",
        state: "RJ",
        city: "Rio de Janeiro",
    });
    const cities = filter.state ? getCities(filter.state) : [];
    let [ latitudeCoord, setLatitudeCoord ] = useState(0);
    let [ longitudeCoord, setLongitudeCoord ] = useState(0);

    const postOccurence = async (data: FormData) => {
        const response  = await api.post('/occurrences', data)
        .then((resp) => {
            setIdOccurrence(resp.data.id)
        });
        return response;
    };

    const putOccurence = async(id: string, data: any) => {
        const { data: response } = await api.put(`/occurrences/${id}`, data);
        return response.data;
    };

    const {
        handleSubmit,
        formState: { errors, isDirty, isValid, dirtyFields },
        control,
        watch,
        register,
        setValue,
        getValues,
        reset
    } = useForm<FormData>({
        mode: 'onChange',
        resolver: yupResolver(schema),
        defaultValues: {
            // service: '',
            // source: '',
            // source_name: '',
            // date: '',
            // address: '',
            //special_place: 'NotKnow',
            have_energy_meter: 'NotKnow',
            have_hydrometer: 'NotKnow',
            have_reservoir: 'NotKnow',
            number_residents: 0,
            type_place: 'Other',
            status: "Approved"
            // type_place: '',
            // area: '',
            // description: '',
            // agree_share: false,
        }
    });

    const { mutate, isLoading } = useMutation(postOccurence, {
        onSuccess: (resp) => {
            setOpen(true)
            queryClient.invalidateQueries('occurence');
        },

    });

    const onSubmit = (values: FormData) => {
        let obj = Object.assign(values, {
            "state": filter.state,
            "city": filter.city
        })
        mutate(values);
    };

    const watchSpecialPlate = watch('special_place')

    useEffect(() => {
        if(!isModal){
            reset()
        }
    }, [isModal, reset]);

    useEffect(() => {
        if(watchSpecialPlate !== 'Yes'){
            setValue('type_place', 'Other')
        }
    }, [watchSpecialPlate])

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
          setLatitudeCoord(position.coords.latitude);
          setLongitudeCoord(position.coords.longitude);
        });
    }, [setLatitudeCoord, setLongitudeCoord, latitudeCoord, longitudeCoord]);

    const latitude = watch("latitude");
    const longitude = watch("longitude");

    console.log(latitude, longitude, 'lat log')

    return (
        <>
            <PersonalModal
                modalBackground={false}
                onClose={onHide}
                padding={4}
                open={isModal}
                width='100%'
                register={true}
            >
                
                <S.Container onSubmit={handleSubmit(onSubmit)}>
                    <h1>Registrar ocorrência</h1>
                    <S.Form >
                        <div>
                            <S.FieldService>
                                <Grid item xs sm md lg xl>
                                    <S.Fieldset style={{width: '254px'}}>
                                        <label htmlFor="">Qual serviço esta indisponível?</label>
                                        <Controller 
                                            name='service'
                                            control={control}
                                            render={({field: { onChange, onBlur, value }}) => {
                                                return (
                                                    <CustomSelect
                                                        id='service'
                                                        onChange={onChange}
                                                        onBlur={onBlur}
                                                        value={value}
                                                        label='Serviço disponível'
                                                        width={254}
                                                        children={
                                                            services?.map((id: any) => {
                                                                if(id.active === true){
                                                                    return (
                                                                        <MenuItem value={id.id}>
                                                                            {id.name}
                                                                        </MenuItem>
                                                                    )
                                                                }
                                                            })
                                                        }
                                                    />
                                                )
                                            }}
                                        />
                                        {errors.service && (
                                            <span>{errors.address?.message}</span>
                                        )}
                                    </S.Fieldset>
                                    {watch('service') !== undefined 
                                        ? <S.Fieldset style={{width: '254px'}}>
                                            <label htmlFor="" style={{color: '#fff'}}></label>
                                            <Controller 
                                                name="source"
                                                control={control}
                                                render={({field: { onChange, onBlur, value }}) => {
                                                    return (
                                                        <CustomSelect
                                                            id="source"
                                                            onChange={onChange}
                                                            onBlur={onBlur}
                                                            value={value}
                                                            label='Selecione a fonte'
                                                            width={254}
                                                            children={
                                                                sources?.map((id: any) => {
                                                                    if(watch('service') === id?.service?.id){
                                                                        return (
                                                                            <MenuItem value={id.id}>
                                                                                {id.name}
                                                                            </MenuItem>
                                                                        )
                                                                    }
                                                                })
                                                            }
                                                        />
                                                    )
                                                }}
                                            />
                                        </S.Fieldset>
                                        : <span/>
                                    }                                    
                                    {sources?.map((id) => {
                                        if(watch('source') === id.id){
                                            if(id.name === "Outra Fonte"){
                                                return (
                                                    <S.Fieldset>
                                                        <label htmlFor="" style={{color: '#fff'}}></label>
                                                        <Controller 
                                                                name="source_name"
                                                                defaultValue=''
                                                                control={control}    
                                                                render={({field: { onChange, onBlur, value }}) => {
                                                                    return (
                                                                        <CustomInput
                                                                            id='source_name'
                                                                            label='Nome da fonte'
                                                                            onChange={onChange}
                                                                            onBlur={onBlur}
                                                                            value={value}
                                                                            type='text'
                                                                            width="372px"
                                                                        />
                                                                    )
                                                                }}
                                                            />
                                                    </S.Fieldset>
                                                )
                                            } else {
                                                return <span/>
                                            }
                                        }
                                    })} 
                                </Grid>                                                                          
                                    {services?.map((id: any) => {
                                        if(watch('service') === id.id){
                                            if(id.name === 'Água'){
                                                return (
                                                    <Grid item xs sm md lg xl>
                                                        <S.RadioFieldset>
                                                            <fieldset>
                                                                <label>
                                                                    O imóvel possui hidrômetro (relógio)?
                                                                    <CustomTolltip
                                                                        img={<img src={blueAlert} alt="" 
                                                                        style={{marginLeft: "5px"}}
                                                                    />}
                                                                        title="Texto em falta"
                                                                    />                                                                        
                                                                </label>
                                                            </fieldset>
                                                            <fieldset>
                                                                <div>
                                                                    <input 
                                                                        {...register('have_hydrometer')}
                                                                        type="radio" 
                                                                        name="have_hydrometer" 
                                                                        id="have_hydrometer_yes"
                                                                        value="Yes"
                                                                    />
                                                                    <label htmlFor="Yes">Sim</label>
                                                                </div>
                                                                <div>
                                                                    <input 
                                                                        {...register('have_hydrometer')}
                                                                        type="radio" 
                                                                        name="have_hydrometer" 
                                                                        id="have_hydrometer_no"
                                                                        value="No"
                                                                    />
                                                                    <label htmlFor="No">Não</label>
                                                                </div>
                                                                <div>
                                                                    <input 
                                                                        defaultChecked={true}
                                                                        {...register('have_hydrometer')}
                                                                        type="radio" 
                                                                        name="have_hydrometer" 
                                                                        id="have_hydrometer_notKnow"
                                                                        value="NotKnow"
                                                                    />
                                                                    <label htmlFor="" style={{width: '103px'}}>Não sei dizer</label>
                                                                </div>
                                                            </fieldset>
                                                        </S.RadioFieldset>
                                                        <S.RadioFieldset>
                                                            <fieldset>
                                                                <label>
                                                                    Você também faz uso de um reservatório, cisterna ou caixa d'água para armazenamento?
                                                                </label>
                                                            </fieldset>
                                                            <fieldset>
                                                                <div>
                                                                    <input 
                                                                        {...register('have_reservoir')}
                                                                        type="radio" 
                                                                        name="have_reservoir" 
                                                                        id="have_reservoir_yes"
                                                                        value="Yes"
                                                                    />
                                                                    <label htmlFor="Yes">Sim</label>
                                                                </div>
                                                                <div>
                                                                    <input 
                                                                        {...register('have_reservoir')}
                                                                        type="radio" 
                                                                        name="have_reservoir" 
                                                                        id="have_reservoir_no"
                                                                        value="No"
                                                                    />
                                                                    <label htmlFor="No">Não</label>
                                                                </div>
                                                                <div>
                                                                    <input 
                                                                        defaultChecked={true}
                                                                        {...register('have_reservoir')}
                                                                        type="radio" 
                                                                        name="have_reservoir" 
                                                                        id="have_reservoir_notKnow"
                                                                        value="NotKnow"
                                                                    />
                                                                    <label htmlFor="" style={{width: '103px'}}>Não sei dizer</label>
                                                                </div>
                                                            </fieldset>
                                                        </S.RadioFieldset>
                                                    </Grid>
                                                )
                                            } else if (id.name === 'Energia' || id.name === 'Luz'){
                                                return (
                                                    <Grid item xs sm md lg xl>
                                                        <S.RadioFieldset>
                                                            <fieldset>
                                                                <label>
                                                                    <p>O imóvel possui medidor de energia elétrica?</p>                                                               
                                                                    <CustomTolltip
                                                                        img={<img src={blueAlert} alt="" />}
                                                                        title="Texto em falta"
                                                                    />                                                                    
                                                                </label>
                                                            </fieldset>
                                                            <fieldset>
                                                                <div>
                                                                    <input 
                                                                        {...register('have_energy_meter')}
                                                                        type="radio" 
                                                                        name="have_energy_meter" 
                                                                        id="have_energy_meter_yes"
                                                                        value="Yes"
                                                                    />
                                                                    <label htmlFor="Yes">Sim</label>
                                                                </div>
                                                                <div>
                                                                    <input 
                                                                        {...register('have_energy_meter')}
                                                                        type="radio" 
                                                                        name="have_energy_meter" 
                                                                        id="have_energy_meter_no"
                                                                        value="No"
                                                                    />
                                                                    <label htmlFor="No">Não</label>
                                                                </div>
                                                                <div>
                                                                    <input
                                                                        defaultChecked={true} 
                                                                        {...register('have_energy_meter')}
                                                                        type="radio" 
                                                                        name="have_energy_meter" 
                                                                        id="have_energy_meter_notKnow"
                                                                        value="NotKnow"
                                                                    />
                                                                    <label htmlFor="">Não sei dizer</label>
                                                                </div>
                                                            </fieldset>
                                                        </S.RadioFieldset>
                                                        <div style={{width: '100%', maxWidth: '372px'}}></div>                                                            
                                                    </Grid>
                                                )
                                            }
                                        }
                                    })}
                            </S.FieldService> 
                            <S.FieldService style={{marginBottom: '40px'}}>
                                <S.FieldsetSearch>
                                    <label htmlFor="">Endereço/Logradouro</label>
                                    <Controller
                                        name="address"
                                        control={control}
                                        render={({ field: { value, ...field } }) => (
                                            <InputSearchMap
                                                type="text"
                                                placeholder="Digite..."
                                                data-cy="occurence-form-address"
                                                value={value}
                                                onLocationChange={({ lat, lng }: any) => {
                                                    if (lat && lng) {
                                                        setValue("latitude", String(lat));
                                                        setValue("longitude", String(lng));
                                                    }
                                                }}
                                                {...field}
                                            />
                                        )}
                                    />

                                    {errors.address && (
                                        <span>{errors.address.message}</span>
                                    )}
                                </S.FieldsetSearch>  
                                <S.Fieldset>
                                    <label htmlFor="">Estado</label>
                                    <CustomSelect
                                        onChange={(e) => {
                                            setFilter((prev: any) => ({
                                                ...prev,
                                                state: e.target.value,
                                                city: undefined,
                                            }))
                                        }}
                                        value={filter.state}
                                        label='Estado'
                                        width='100%'
                                        list={states}
                                        id='state'
                                        defaultValue=''
                                    />
                                </S.Fieldset>                              
                                <S.Fieldset>
                                    <label htmlFor="">Ciade</label>
                                    <CustomSelect
                                        onChange={(e) =>
                                            setFilter((prev: any) => ({ ...prev, city: e.target.value }))
                                        }
                                        value={filter.city}
                                        label='Cidade'
                                        width='100%'
                                        list={cities}
                                        id='state'
                                        defaultValue=''
                                    />
                                </S.Fieldset>
                            </S.FieldService>                                                                                 
                            <S.FieldMid>
                                <S.FieldDate>
                                    <div>                                           
                                    </div>                                       
                                    <S.Fieldset>
                                        <label htmlFor="">
                                            Em que escala é a área afetada?
                                            <CustomTolltip
                                                img={<img src={blueAlert} alt="" />}
                                                title="Se enquadram como localizações especiais lugares como comunidades de assentamento, favelas, quilombos, entre outros"
                                            /> 
                                        </label>
                                        <Controller 
                                            name='area'
                                            control={control}
                                            render={({field: { onChange, onBlur, value }}) => {
                                                return (
                                                    <CustomSelect
                                                        onChange={onChange}
                                                        onBlur={onBlur}
                                                        value={value}
                                                        label='Área afetada'
                                                        width='100%'
                                                        list={TYPE_LOCAL}
                                                        id='area'
                                                    />
                                                )
                                            }}
                                        />
                                        {errors.area && (
                                            <span>{errors.area.message}</span>
                                        )}
                                    </S.Fieldset>                                                                                
                                    {watch('area') === 'House' && (                                                
                                        <S.Fieldset>
                                            <label htmlFor="">Quantos moradores vivem no domicílio afetado?</label>
                                            <Controller 
                                                name='number_residents'
                                                control={control}
                                                render={({field: { onChange, onBlur, value }}) => {
                                                    return (
                                                        <CustomInput 
                                                            label='Número de moradores'
                                                            onBlur={onBlur}
                                                            onChange={onChange}
                                                            type="number"
                                                            value={value}
                                                            width='100%'
                                                            id='number_residents'
                                                        />
                                                    )
                                                }}
                                            />
                                        {errors.number_residents && (
                                            <span>Verifique o numero digitado.</span>
                                        )}
                                        </S.Fieldset>                                            
                                    )}                                        
                                    <S.Fieldset>
                                        <label htmlFor="">Data e hora da ocorrencia:</label>
                                        <Controller 
                                            name="date"
                                            control={control}
                                            render={({ field: { onChange, onBlur, value }}) => {
                                                return (
                                                    <CustomInputData 
                                                        label='Data e hora'
                                                        onBlur={onBlur}
                                                        onChange={onChange}
                                                        value={value}
                                                        max={new Date().toISOString().slice(0, -8)}
                                                        type="datetime-local"
                                                        width='100%'
                                                        id='date_time'
                                                    />
                                                )
                                            }}
                                        />
                                        {errors.date && (
                                            <span>Preencha o campo data.</span>
                                        )}
                                    </S.Fieldset> 
                                    <S.RadioFieldset>
                                        <fieldset>
                                            <label htmlFor="">
                                                A ocorrência é em uma localização especial?                                                                       
                                            </label>
                                            <p>
                                                Se enquadram em localizações especiais: favelas, comunidades, ocupações, quilombos, aldeias, assentamento e etc."
                                            </p>
                                        </fieldset>
                                        <fieldset>
                                            <div>
                                                <input 
                                                    {...register('special_place')}
                                                    type="radio"
                                                    name="special_place"
                                                    id="special_place_yes" 
                                                    value="Yes"
                                                />
                                                <label htmlFor="yes">Sim</label>                                                                        
                                            </div>
                                            <div>
                                                <input 
                                                    {...register('special_place')}
                                                    type="radio"
                                                    name='special_place'
                                                    id="special_place_no" 
                                                    value="No"
                                                />
                                                <label htmlFor="no">Não</label>                                                                        
                                            </div>
                                            <div>
                                                <input
                                                    {...register('special_place')}
                                                    defaultChecked={true}
                                                    type="radio" 
                                                    name='special_place'
                                                    id="special_place_unknow" 
                                                    value="NotKnow"
                                                />                                                                        
                                                <label htmlFor="unknow" style={{width: '103px'}}>Não sei</label>
                                            </div>
                                        </fieldset>
                                    </S.RadioFieldset>
                                    {watch('special_place') === 'Yes' && (
                                        <S.Fieldset>
                                            <label htmlFor="" style={{ marginBottom: '15px !important'}}>
                                                Qual é o tipo de localização especial
                                            </label>
                                            <Controller 
                                                name='type_place'
                                                control={control}
                                                render={({field: { onChange, onBlur, value }}) => {
                                                    return (
                                                        <CustomSelect
                                                            id="type_place"
                                                            onChange={onChange}
                                                            onBlur={onBlur}
                                                            value={value}
                                                            label='Localização especial'
                                                            labelDefault='Localização especial'
                                                            width="100%"
                                                            list={AREA}
                                                        />
                                                    )
                                                }}
                                            />
                                            {errors.type_place && (
                                                <p>{errors.type_place.message}</p>
                                            )}
                                        </S.Fieldset>
                                    )}
                                </S.FieldDate>
                                <div>
                                    <S.FieldMap>
                                        <span>
                                            <input type="hidden" name="latitude" />
                                            <input type="hidden" name="longitude" />

                                            <MapSearch
                                                onPositionSelected={({ lat, lng }) => {
                                                    setValue("latitude", String(lat));
                                                    setValue("longitude", String(lng));
                                                }}
                                                selectedPosition={{
                                                    lng: Number(longitude),
                                                    lat: Number(latitude),
                                                }}
                                            />
                                        </span>
                                    </S.FieldMap>
                                    <S.FieldTextArea>
                                        <label htmlFor="">
                                            Alguma observação sobre a ocorrência?
                                        </label>
                                        <Controller 
                                            name="description"
                                            control={control}
                                            render={({ field: { onChange, onBlur, value }}) => {
                                                return (
                                                    <CustomTextArea
                                                        onChange={onChange}
                                                        onBlur={onBlur}
                                                        value={value}
                                                        placeholder='Digite sua observação (Opcional)'
                                                        width='100%'
                                                        heigth='100%'
                                                        id="description"
                                                    />
                                                )
                                            }}
                                        />
                                    </S.FieldTextArea>                                        
                                </div>
                            </S.FieldMid>                              
                            <S.FieldRule>
                                <label htmlFor="">                                
                                    Caso entrem outras queixas da sua região, você autoriza que as informações da sua reclamação sejam juntadas à elas e compartilhadas com as autoridades competentes para solicitar que o abastecimento da sua residência seja feito pelas agências competentes.
                                    <CustomTolltip
                                        img={<img src={blueAlert} alt="" />}
                                        title="Texto em falta"
                                    />
                                </label>
                                <fieldset>
                                    <input 
                                        {...register('agree_share')}
                                        type="radio" 
                                        name="agree_share" 
                                        id="agree_share_yes"
                                        value="Yes"
                                    />
                                    <label htmlFor="Yes">Sim</label>
                                    <input 
                                        defaultChecked={true}
                                        {...register('agree_share')}
                                        type="radio" 
                                        name="agree_share" 
                                        id="agree_share_no"
                                        value="No"
                                    />
                                    <label htmlFor="No">Não</label>
                                </fieldset>
                            </S.FieldRule>
                        </div>                                                        
                    </S.Form> 
                    <S.ContainerBtn>
                        <S.CancelBtn 
                            type='button' 
                            id='cancel'
                            onClick={() => {
                                setCloseOccurrence(!closeOccurrence)
                            }}
                        >
                            Cancelar
                        </S.CancelBtn>
                        <S.SubmitButton 
                            type='submit'
                            id='submit'
                            disabled={isValid === true && isDirty === true ? false : true}
                        >
                            {isLoading ? 'Cadastrando...' : 'Registrar ocorrência'}
                        </S.SubmitButton>
                    </S.ContainerBtn>                       
                </S.Container>
            </PersonalModal>

            <ModalMsg
                height='477px'
                modalBackground={false} 
                mensage='A ocorrência foi registrada com sucesso!'
                onClose={() => {
                    setOpen(!open)
                    onHide()
                }}
                open={open}
                status="success"
                width={496}
                occurence={true}
                finishOccurence={() => {
                    putOccurence(idOccurrence, {
                        "finished_status": "Yes",
                        "status": 'Approved'
                    })
                    setOpen(!open)
                    onHide()
                }}
            />

            <ModalDelete
                backgroundColor='false'
                buttonText="Sim, cancelar"
                mensage='Deseja mesmo cancelar o registro desta ocorrência?'
                onClose={() => {
                    setCloseOccurrence(!closeOccurrence)
                }}
                onDelete={() => {
                    setCloseOccurrence(!closeOccurrence)
                    onHide()
                }}
                open={closeOccurrence}
                width={469}
            />            
        </>
    );
};

export default NewOccurence;