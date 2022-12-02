import React, { useEffect, useState } from 'react';
import * as S from './style';
import { CustomInputData, CustomTextArea, ModalDelete, ModalMsg, PersonalModal } from '../../../components';
import { api, convertDate, putOccurrences } from '../../../services';
import {
    mapsDefault
} from '../../../assets/index';
import { 
    useForm,
    Controller
} from 'react-hook-form';
import { FormData } from './types';
import { useSelector } from 'react-redux';
import { RootState } from '../../../stores';
import { Grid } from '@mui/material';

interface IProps {
    onHide: () => void,
    isModal: boolean,
    itemEdit: any
}

const FinishOccurence: React.FC<IProps> = ({ onHide, isModal, itemEdit }) => {
    const { token } = useSelector((state : RootState) => state.clickState);
    const [ cancelModal, setCancelModal ] = useState(false);
    const [ success, setSuccess ] = useState(false);

    const {
        control,
        handleSubmit,
        reset,
        watch,
        formState: { isDirty, isValid }
    } = useForm<FormData>({
        mode: 'onChange'
    });

    function onSubmit (values: FormData) {
        const obj = Object.assign(values, {
            "service": itemEdit.service.id,
            "source": itemEdit.source.id,
            "finished_status": "Yes",
        })

        putOccurrences(itemEdit.id, obj).then(() => {
            onHide()
            setSuccess(!success)
        })
    };

    useEffect(() => {
        if(!isModal){
            reset()
        }
    }, [isModal, reset]);

    return (
        <>
            <PersonalModal
                modalBackground={false}
                padding={4}
                width='auto'
                height='auto'
                open={isModal}
                onClose={onHide}
            >
                <S.Container>
                    <h1>Finalizar ocorrência</h1>
                    <div>
                        <S.Header backgroundColor={itemEdit?.service?.background_color}>
                            <div>
                                <img src={itemEdit?.service?.image} alt="" />
                            </div>
                            <p>{itemEdit?.service?.name}</p>
                        </S.Header>
                        <S.Section>
                            <Grid container >
                                <Grid item flexWrap='wrap' container >
                                    <Grid item xs={2} sm={2} md={2} lg={2} xl={2} style={{minWidth:"200px", maxWidth:"200px"}} >
                                        <p>Registrador por</p>
                                        <p>{itemEdit?.user?.name}</p>
                                    </Grid>
                                    <Grid item xs={2} sm={2} md={2} lg={2} xl={2} style={{minWidth:"200px", maxWidth:"200px"}} >
                                        <p>Fonte do serviço</p>
                                        <p>{itemEdit?.source?.name}</p>
                                    </Grid>
                                    {itemEdit?.source?.name === 'Outra fonte' && (
                                    <Grid item xs={2} sm={2} md={2} lg={2} xl={2} style={{minWidth:"200px", maxWidth:"200px"}} >
                                        <p>Nome da fonte</p>
                                        <p>{itemEdit?.source_name}</p>
                                    </Grid>
                                    )}
                                    {itemEdit?.service?.name === 'Energia' && (
                                        <Grid item xs sm md lg xl style={{minWidth:"330px"}} >
                                            <p>O imóvel possui medidor de energia elétrica?</p>
                                            <p>{itemEdit?.have_energy_meter === 'Yes' ? 'Sim' : 'Não'}</p>
                                        </Grid>
                                    )}
                                    {itemEdit?.service?.name === 'Água' && (
                                        <>
                                            <Grid item xs sm md lg xl style={{minWidth:"190px", maxWidth:"250px"}} >
                                                <p>O imóvel possui hidrômetro (relógio)?</p>
                                                <p>{itemEdit?.have_hydrometer === 'Yes' ? 'Sim' : 'Não'}</p>
                                            </Grid>
                                            <Grid item xs sm md lg xl style={{minWidth:"320px"}} >
                                                <p>Você também faz uso de um reservatório, cisterna ou caixa d'água para armazenamento?</p>
                                                <p>{itemEdit?.have_reservoir === 'Yes' ? 'Sim' : 'Não'}</p>
                                            </Grid>
                                        </>
                                    )}
                            </Grid>
                                <Grid item flexWrap='wrap' container >
                                    <Grid item xs sm md lg xl>
                                        <p>Data e hora da ocorrência</p>
                                        <p>{convertDate(itemEdit?.date)}</p>
                                    </Grid>
                                    <Grid item xs sm md lg xl>
                                        <p>A ocorrência é em uma localização especial?</p>
                                        <p>{itemEdit?.special_place === 'Yes' ? 'Sim' : 'Não'}</p>
                                    </Grid>
                                    {itemEdit?.special_place === 'Yes' && (
                                        <Grid item xs sm md lg xl>
                                            <p>Qual é o tipo de localização especial</p>
                                            <p>{itemEdit?.type_place}</p>
                                        </Grid>
                                    )}
                                </Grid>
                                <Grid item flexWrap='wrap' container>
                                    <Grid item xs sm md lg xl>
                                        <p>Endereço/Logradouro</p>
                                        <p>{itemEdit?.address}</p>
                                    </Grid>
                                    <Grid item xs sm md lg xl>
                                        <p>Em que escala é a área afetada?</p>
                                        <p>{itemEdit?.area}</p>
                                    </Grid>
                                    {itemEdit?.area === 'House' && (
                                        <Grid item xs sm md lg xl>
                                            <p>Quantos moradores vivem no domicílio afetado?</p>
                                            <p>{itemEdit?.number_residents}</p>
                                        </Grid>
                                    )}
                                </Grid>
                                <div  style={{display: 'Flex', justifyContent: 'flex-start', flexWrap: 'nowrap'}} >
                                    <div>
                                        <img src={mapsDefault} alt="" />
                                    </div>
                                    <div style={{width:"250px"}} >
                                        <p>Observação</p>
                                        <p>
                                            {
                                            itemEdit?.description === '' 
                                                ? '-'
                                                : itemEdit?.description
                                            }
                                        </p>
                                    </div>
                                </div>
                                <Grid item style={{margin: '0px'}}>
                                    <Grid item xs sm md lg xl style={{maxWidth:"960px", margin: '0px'}}>
                                        <p>Caso entrem outras queixas da sua região, você autoriza que as informações da sua reclamação sejam juntadas à elas e compartilhadas com as autoridades competentes para solicitar que o abastecimento da sua residência seja feito pelas agências competentes.</p>
                                        <p>{itemEdit?.agree_share === 'Yes' ? 'Sim' : 'Não'}</p>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </S.Section>
                    </div>
                    <S.Form onSubmit={handleSubmit(onSubmit)}>
                        <fieldset>
                            <S.Fieldset>
                                <label>Data e hora do restabelecimento:</label>
                                <Controller 
                                    name='restoration_date'
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
                                                width="100%"
                                                id='date_time'
                                            />
                                        )
                                    }}
                                />
                            </S.Fieldset>     
                            <S.Fieldset  style={{minWidth: "auto", maxWidth:'636px'}}>
                                <label>Alguma observação sobre o restabelecimento?</label>
                                <Controller 
                                    name='restoration_description'
                                    control={control}
                                    render={({ field: { onChange, onBlur, value }}) => {
                                        return (
                                            <CustomTextArea
                                                onChange={onChange}
                                                onBlur={onBlur}
                                                value={value}
                                                placeholder='Digite sua observação (Opcional)'
                                                width='100%'
                                                heigth='102px'
                                                id="description"
                                            />
                                        )
                                    }}
                                />
                            </S.Fieldset>
                        </fieldset>      
                        <S.Buttons>
                            <S.Cancel 
                                type='button'
                                onClick={() => {
                                    setCancelModal(!cancelModal)
                                }}
                                id="cancel"
                            >
                                Cancelar
                            </S.Cancel>
                            <S.Submit
                                id='submit'
                                type='submit'
                                disabled={false}
                            >
                                Finalizar ocorrência
                            </S.Submit>
                        </S.Buttons>
                    </S.Form>
                </S.Container>
            </PersonalModal>
            <ModalMsg 
                modalBackground={false}
                height='312px'
                width={469}
                mensage='A ocorrência foi finalizada com sucesso!'
                onClose={() => {
                    setSuccess(false)
                }}
                open={success}
                status="success"
            />

            <ModalDelete
                backgroundColor=''
                mensage='Deseja mesmo cancelar a finalização desta ocorrência?'
                onClose={() => {
                    onHide()
                    setCancelModal(false)
                }}
                open={cancelModal}
                width={469}
                buttonText='Sim, cancelar'
                onDelete={() => {
                    onHide()
                    setCancelModal(false)
                }}
            />
        </>
    );
};

export default FinishOccurence;