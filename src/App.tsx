import React, { useEffect, useReducer, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Aside, Header } from './components';
import AuthRoutes from './routes/Auth.routes';
import { Container, Content } from './style';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './services/index';
import PublicRoutes from './routes/Public.routes';

const App: React.FC = () => {
  const token = window.localStorage.getItem('token');

  return (
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          {token === null ?
            <PublicRoutes />
            :
            <Container>
              <Header />
              <Aside />
              <Content>
                <AuthRoutes />
              </Content>
            </Container>
          }
        </BrowserRouter>
      </QueryClientProvider>
  );
}

export default App;