import React from "react";
import * as S from "../style";
import { Poppover, CustomTolltip } from "../../../components";
import { convertDate } from "../../../services/index";
import {
    trusted,
    noTrusted
} from "../../../assets/index";
import parsePhoneNumber from 'libphonenumber-js';
import { Occurrences } from "../../../@types";
import { setStatusName } from "./setStatusName";
import { OccurrencesTableHeader } from "./OccurrencesTableHeader";
import { LoadingSpinner } from "./LoadingSpinner";
import PersonIcon from '@mui/icons-material/Person';
import styled from "styled-components";

/* TODO: This should become a React component in the future */

export function getOccurrencesTable(
    occurrences: Occurrences | undefined, 
    setOccurrenceObj: React.Dispatch<any>, 
    setEditOccurrence: React.Dispatch<React.SetStateAction<boolean>>, 
    editOccurrence: boolean, 
    setViewOccurrence: React.Dispatch<React.SetStateAction<boolean>>, 
    viewOccurrence: boolean, 
    setFinishOccurrence: React.Dispatch<React.SetStateAction<boolean>>, 
    finishOccurrence: boolean, 
    setApproveReprove: React.Dispatch<React.SetStateAction<boolean>>, 
    setIdDelete: React.Dispatch<React.SetStateAction<string>>, 
    setOpenDelete: React.Dispatch<React.SetStateAction<boolean>>, 
    openDelete: boolean,
    isLoading: boolean,
    filterByUserId: string | null,
    setFilterByUserId: React.Dispatch<React.SetStateAction<string | null>>,
    setPage: React.Dispatch<React.SetStateAction<number>>
) {

    const Clickable = styled(PersonIcon)`
        text-align: center;
        cursor: pointer;
        margin-left: 15px;
        color: ${filterByUserId ? "#000": "#ddd"};
    `

    return isLoading ? <LoadingSpinner /> : <S.Table>
        <OccurrencesTableHeader/>
        <tbody>
            {occurrences?.data?.map((id) => {
                return (
                    <tr key={id.id}>
                        <td style={{ width: "226px" }}>
                            <span
                                style={{
                                    marginLeft: "34px",
                                }}
                            >
                                <S.Icon
                                    backgroundColor={id?.service
                                        ?.background_color}
                                >
                                    <img
                                        src={id?.service
                                            ?.image}
                                        alt="" />
                                </S.Icon>
                                {id?.service?.name}
                            </span>
                        </td>
                        <S.User>
                            <span>
                                {id?.user?.name}
                                <CustomTolltip
                                    img={<img
                                        src={id?.user
                                            ?.trusted ==
                                            true
                                            ? trusted
                                            : noTrusted}
                                        alt="" />}
                                    placement="right" />
                            </span>
                        </S.User>
                        <td style={{ width: "50px" }}>
                            <Clickable onClick={() => {setPage(1); setFilterByUserId((prev) => (prev !== null) ? null : id?.user.id)}}>
                            </Clickable>
                        </td>                        
                        <td style={{ width: "187px" }}>
                            <span>
                                {id?.user?.email}
                            </span>
                        </td>
                        <td style={{ width: "187px" }}>
                            <span>
                                {/* TODO: Phone_number may be undefined */}
                                {parsePhoneNumber(id?.user?.phone_number ?? '', 'BR')?.formatNational()}
                            </span>
                        </td>
                        <td style={{ width: "187px" }}>
                            <span>
                                {convertDate(id.createdAt)}
                            </span>
                        </td>
                        <td style={{ width: "auto" }}>
                            <span>{id.address}</span>
                        </td>
                        <S.Status status={id.status}>
                            <span>
                                <p>
                                    {setStatusName(
                                        id.status
                                    )}
                                </p>
                            </span>
                        </S.Status>
                        <S.Finished
                            finished={id.finished_status}
                        >
                            <span
                                style={{
                                    paddingRight: "34px",
                                }}
                            >
                                <p>
                                    {id.finished_status ===
                                        "Yes"
                                        ? "Sim"
                                        : id.finished_status ===
                                            "No"
                                            ? "Não"
                                            : "Abandonado"}
                                </p>
                            </span>
                        </S.Finished>
                        <td style={{ width: "90px" }}>
                            <span>
                                <S.Options>
                                    <Poppover
                                        type="occurrences"
                                        onClick={() => { }}
                                        onEdit={() => {
                                            setOccurrenceObj(
                                                id
                                            );
                                            setEditOccurrence(
                                                !editOccurrence
                                            );
                                        }}
                                        onView={() => {
                                            setOccurrenceObj(
                                                id
                                            );
                                            setViewOccurrence(
                                                !viewOccurrence
                                            );
                                        }}
                                        onFinish={() => {
                                            setOccurrenceObj(
                                                id
                                            );
                                            setFinishOccurrence(
                                                !finishOccurrence
                                            );
                                        }}
                                        onApprove={() => {
                                            setOccurrenceObj(
                                                id
                                            );
                                            setApproveReprove(
                                                true
                                            );
                                        }}
                                        onDelete={() => {
                                            setIdDelete(
                                                id.id
                                            );
                                            setOpenDelete(
                                                !openDelete
                                            );
                                        }} />
                                </S.Options>
                            </span>
                        </td>
                    </tr>
                );
            })}
        </tbody>
    </S.Table>;

}


