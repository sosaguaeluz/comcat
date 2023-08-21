import React from "react";
import * as S from "../style";


export function OccurrencesTableHeader() {
    return <S.TableHead>
        <tr>
            <th style={{ width: "226px" }}>
                <span
                    style={{ marginLeft: "24px" }}
                >
                    Serviço interrompido
                </span>
            </th>
            <th style={{ width: "226px" }}>
                <span>
                    Registrado por usuário
                </span>
            </th>
            <th style={{ width: "50px" }}>
                <span>
                    Filtrar
                </span>
            </th>            
            <th style={{ width: "187px" }}>
                <span>
                    E-mail do usuário
                </span>
            </th>   
            <th style={{ width: "187px" }}>
                <span>
                    Celular do usuário
                </span>
            </th>
            <th style={{ width: "187px" }}>
                <span>Hora da ocorrência</span>
            </th>
            <th style={{ width: "auto" }}>
                <span>Endereço</span>
            </th>
            <th style={{ width: "215px" }}>
                <span>
                    Status ocorrência
                </span>
            </th>
            <th style={{ width: "158px" }}>
                <span>Já foi finalizada?</span>
            </th>
            <th style={{ width: "90px" }}>
                <span>Ações</span>
            </th>
        </tr>
    </S.TableHead>;
}
