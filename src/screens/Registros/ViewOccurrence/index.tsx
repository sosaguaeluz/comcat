import React from 'react';
import * as S from './style';
import { PersonalModal } from '../../../components';
import { convertDate } from '../../../services';
import { mapsDefault } from '../../../assets/index';
import { Grid } from '@mui/material';
import { Flex } from '../../../components/Navigation/Aside/style';
import { AREA } from '../../../constants/area';
import { TYPE_LOCAL } from '../../../constants/typeLocal';

interface IProps {
    onHide: () => void,
    isModal: boolean,
    itemEdit: any
}

const ViewOccurrence: React.FC<IProps> = ({ onHide, isModal, itemEdit }) => {
    return (
        <>
            <PersonalModal
                modalBackground={false}
                padding={6}
                width='auto'
                height='auto'
                open={isModal}
                onClose={onHide}
            >
                <S.Container>
                    <h1>Visualizar ocorrência</h1>
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
                                        <p>Registrado por</p>
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
                                            <p>Qual é o tipo de localização especial?</p>
                                            <p>{AREA.find(i => i.value === itemEdit?.type_place)?.label}</p>
                                        </Grid>
                                    )}                                
                                </Grid>
                                <Grid item flexWrap='wrap' container >
                                    <Grid item xs sm md lg xl>
                                        <p>Endereço/Logradouro</p>
                                        <p>{itemEdit?.address}</p>
                                    </Grid>
                                    <Grid item xs sm md lg xl>
                                        <p>Em que escala é a área afetada?</p>
                                        <p>{TYPE_LOCAL.find(i => i.value === itemEdit?.area)?.label}</p>
                                    </Grid>
                                    {itemEdit?.area === 'House' && (
                                        <Grid item xs sm md lg xl>
                                            <p>Quantos moradores vivem no domicílio afetado?</p>
                                            <p>{itemEdit?.number_residents}</p>
                                        </Grid>
                                    )}
                                </Grid>
                                <div style={{display: 'Flex', justifyContent: 'flex-start', flexWrap: 'nowrap'}}>
                                    <div>
                                        <img src={mapsDefault} alt="" />
                                    </div>
                                    <div style={{width:"250px"}}>
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
                                        <p>Caso entrem outras queixas da sua região, você autoriza que as informações da sua reclamação sejam juntadas à elas e compartilhadas com as autoridades competentes para solicitar que o abastecimento da sua residência seja feito pelas agências competentes?</p>
                                        <p>{itemEdit?.agree_share === 'Yes' ? 'Sim' : 'Não'}</p>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </S.Section>
                    </div>
                    <S.Cancel 
                        type='button'
                        onClick={() => {
                            onHide()
                        }}
                        id="cancel"
                    >
                        Fechar
                    </S.Cancel>
                </S.Container>
            </PersonalModal>
        </>
    );
};

export default ViewOccurrence;