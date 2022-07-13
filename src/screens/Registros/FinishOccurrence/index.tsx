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

interface IProps {
    onHide: () => void,
    isModal: boolean,
    itemEdit: any
}

const FinishOccurence: React.FC<IProps> = ({ onHide, isModal, itemEdit }) => {
    const { token } = useSelector((state: RootState) => state.clickState);
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

        putOccurrences(token, itemEdit.id, obj).then(() => {
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
                width={1280}
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
                            <div>
                                <div>
                                    <p>Registrador por</p>
                                    <p>{itemEdit?.user?.name}</p>
                                </div>
                                <div>
                                    <p>Fonte do serviço</p>
                                    <p>{itemEdit?.source?.name}</p>
                                </div>
                                {itemEdit?.source?.name === 'Outra fonte' && (
                                <div>
                                    <p>Nome da fonte</p>
                                    <p>{itemEdit?.source_name}</p>
                                </div>
                                )}
                                {itemEdit?.service?.name === 'Energia' && (
                                    <div>
                                        <p>O imóvel possui medidor de energia elétrica?</p>
                                        <p>{itemEdit?.have_energy_meter === 'Yes' ? 'Sim' : 'Não'}</p>
                                    </div>
                                )}
                                {itemEdit?.service?.name === 'Água' && (
                                    <>
                                        <div>
                                            <p>O imóvel possui hidrômetro (relógio)?</p>
                                            <p>{itemEdit?.have_hydrometer === 'Yes' ? 'Sim' : 'Não'}</p>
                                        </div>
                                        <span>
                                            <p>Você também faz uso de um reservatório, cisterna ou caixa d'água para armazenamento?</p>
                                            <p>{itemEdit?.have_reservoir === 'Yes' ? 'Sim' : 'Não'}</p>
                                        </span>
                                    </>
                                )}
                            </div>
                            <div>
                                <div>
                                    <p>Data e hora da ocorrência</p>
                                    <p>{convertDate(itemEdit?.date)}</p>
                                </div>
                                <div>
                                    <p>A ocorrência é em uma localização especial?</p>
                                    <p>{itemEdit?.special_place === 'Yes' ? 'Sim' : 'Não'}</p>
                                </div>
                                {itemEdit?.special_place === 'Yes' && (
                                    <div>
                                        <p>Qual é o tipo de localização especial</p>
                                        <p>{itemEdit?.type_place}</p>
                                    </div>
                                )}
                            </div>
                            <div>
                                <div>
                                    <p>Endereço/Logradouro</p>
                                    <p>{itemEdit?.address}</p>
                                </div>
                                <div>
                                    <p>Em que escala é a área afetada?</p>
                                    <p>{itemEdit?.area}</p>
                                </div>
                                {itemEdit?.area === 'House' && (
                                    <div>
                                        <p>Quantos moradores vivem no domicílio afetado?</p>
                                        <p>{itemEdit?.number_residents}</p>
                                    </div>
                                )}
                            </div>
                            <div>
                                <img src={mapsDefault} alt="" />
                                <div>
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
                            <div>
                                <div>
                                    <p>Caso entrem outras queixas da sua região, você autoriza que as informações da sua reclamação sejam juntadas à elas e compartilhadas com as autoridades competentes para solicitar que o abastecimento da sua residência seja feito pelas agências competentes.</p>
                                    <p>{itemEdit?.agree_share === 'Yes' ? 'Sim' : 'Não'}</p>
                                </div>
                            </div>
                        </S.Section>
                    </div>
                    <S.Form onSubmit={handleSubmit(onSubmit)}>
                        <fieldset>
                            <fieldset>
                                <label>Data e hora do restabelecimento:</label>
                                <div>
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
                                                    width="372px"
                                                    id='date_time'
                                                />
                                            )
                                        }}
                                    />
                                </div>
                            </fieldset>     
                            <fieldset>
                                <label>Alguma observação sobre o restabelecimento?</label>
                                <div>
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
                                                    width='636px'
                                                    heigth='102px'
                                                    id="description"
                                                />
                                            )
                                        }}
                                    />
                                </div>
                            </fieldset>
                        </fieldset>      
                        <fieldset>
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
                                disabled={!isDirty || !isValid}
                            >
                                Finalizar ocorrência
                            </S.Submit>
                        </fieldset>
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