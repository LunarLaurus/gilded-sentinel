import React, { ReactNode, ErrorInfo } from 'react';

interface ErrorBoundaryProps {
    children: ReactNode; // The children wrapped by the error boundary
    fallbackUI?: ReactNode; // Custom fallback UI component
    onError?: (error: Error, errorInfo: ErrorInfo) => void; // Optional error logging callback
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null; // Store the actual error
    errorInfo: ErrorInfo | null; // Store additional error information
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state: ErrorBoundaryState = {
        hasError: false,
        error: null,
        errorInfo: null,
    };

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        // Update state so the next render will show the fallback UI
        return { hasError: true, error, errorInfo: null };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.error('ErrorBoundary caught an error:', error, errorInfo);

        // If an onError callback is provided, invoke it with error details
        if (this.props.onError) {
            this.props.onError(error, errorInfo);
        }

        // Update state to include error details for rendering
        this.setState({ error, errorInfo });
    }

    handleRetry = () => {
        // Reset the state to allow retry
        this.setState({ hasError: false, error: null, errorInfo: null });
    };

    render() {
        const { hasError, error, errorInfo } = this.state;
        const { fallbackUI, children } = this.props;

        if (hasError) {
            // Render custom fallback UI if provided, otherwise show default fallback UI
            return fallbackUI ? (
                fallbackUI
            ) : (
                <div style={{ padding: '2rem', textAlign: 'center', backgroundColor: '#f8d7da', color: '#721c24' }}>
                    <h1>Oops! Something went wrong.</h1>
                    {error && <p><strong>Error:</strong> {error.message}</p>}
                    {errorInfo && <pre style={{ whiteSpace: 'pre-wrap', textAlign: 'left' }}>{errorInfo.componentStack}</pre>}
                    <button
                        onClick={this.handleRetry}
                        style={{
                            padding: '0.5rem 1rem',
                            marginTop: '1rem',
                            fontSize: '1rem',
                            backgroundColor: '#007bff',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                        }}
                    >
                        Retry
                    </button>
                </div>
            );
        }

        return children;
    }
}

export default ErrorBoundary;
