import React from 'react';
import './styles/styles.css';
import { Routes } from 'react-router-dom';
import { RoutesConfig } from './RoutesConfig';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './components/primary/Header';
import Footer from './components/primary/Footer';
import ErrorBoundary from './pages/system/ErrorBoundary';

export const API_URL: string =
  window.env?.REACT_APP_API_URL ||
  process.env.REACT_APP_API_URL ||
  'http://localhost:35550';

console.log('API_URL is set to:', API_URL);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <div className="global-container" id="global-container">
          <Header />
          <main>
            <Routes>
              {RoutesConfig()}
            </Routes>
          </main>
          <Footer />
        </div>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
