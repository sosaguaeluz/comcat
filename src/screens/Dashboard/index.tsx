import React, { useState } from 'react';
import { DoubleButton } from '../../components';
import DashOccurrences from './Occurrences';
import * as S from './style';
import DashUsers from './Users';

const Dashboard: React.FC = () => {
    const [ dashOccurrences, setDashOccurrences ] = useState(true);
    const [ dashUsers, setDashUsers ] = useState(false);

    return (
        <S.Main>
            <S.Navigation>
                <div>
                    <DoubleButton 
                        onSelect={() => {
                            setDashOccurrences(true)
                            setDashUsers(false)
                        }}
                        selected={dashOccurrences}
                        text="Ocorrências"
                        id='dash-occurrences'
                    />
                    <DoubleButton 
                        onSelect={() => {
                            setDashOccurrences(false)
                            setDashUsers(true)
                        }}
                        selected={dashUsers}
                        text="Usuários"
                        id='dash-users'
                    />
                </div>
            </S.Navigation>

            {dashOccurrences === true && <DashOccurrences />}
            {dashUsers === true && <DashUsers />}
        </S.Main>
    );
};

export default Dashboard;