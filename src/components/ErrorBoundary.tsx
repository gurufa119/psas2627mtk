import React, {Component, ErrorInfo, ReactNode} from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  errorMessage: string;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    errorMessage: '',
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      errorMessage: error.message || 'Terjadi kesalahan saat memuat halaman.',
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Application ErrorBoundary caught:', error, errorInfo);
  }

  private handleReset = () => {
    try {
      localStorage.removeItem('psas_smansaker_latihan');
      localStorage.removeItem('psas_smansaker_tryout');
    } catch {
      // Ignore storage access errors
    }
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-6 text-slate-900 dark:text-slate-100">
          <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-4">
            <h1 className="text-xl font-bold font-display">Halaman Perlu Dimuat Ulang</h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Aplikasi mengalami gangguan tampilan sementara. Anda dapat memuat ulang halaman atau
              mengatur ulang cache progres lokal.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="px-4 py-2 text-sm font-medium rounded-lg bg-blue-700 hover:bg-blue-800 text-white transition-colors"
              >
                Muat Ulang
              </button>
              <button
                type="button"
                onClick={this.handleReset}
                className="px-4 py-2 text-sm font-medium rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Reset Cache & Muat Ulang
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
