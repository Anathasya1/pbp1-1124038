import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from '@emotion/react';
import { createTheme, CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';
import { AppRoutes } from './config/AppRoutes.tsx';
import { Layout } from './components/Layout.tsx';

const theme = createTheme();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        {/* <Provider store={store}> */}
          <BrowserRouter>
            <Layout>
              <AppRoutes />
            </Layout>
          </BrowserRouter>
        {/* </Provider> */}
      </ThemeProvider>
    </StrictMode>
)
