import React from 'react';
import * as S from './style';
import { useSelector } from 'react-redux';
import { RootState } from '../../stores';


const Dashboard: React.FC = () => {
    const { token } = useSelector((state: RootState) => state.clickState);

    return (
        <S.Main>
            
        </S.Main>
    );
};

export default Dashboard;