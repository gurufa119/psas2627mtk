import React, {useState} from 'react';
import {Menu, Moon, Sun, X} from 'lucide-react';

export type ActiveRoute = 'home' | 'kisi-kisi' | 'latihan' | 'tryout' | 'laporan';

interface HeaderProps {
  activeRoute: ActiveRoute;
  onNavigate: (route: ActiveRoute) => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

const NAV_ITEMS: {id: ActiveRoute; label: string}[] = [
  {id: 'home', label: 'Beranda'},
  {id: 'kisi-kisi', label: 'Kisi-Kisi Soal'},
  {id: 'latihan', label: 'Paket Latihan'},
  {id: 'tryout', label: 'TryOut PSAS'},
  {id: 'laporan', label: 'Laporan'},
];

export const Header: React.FC<HeaderProps> = ({
  activeRoute,
  onNavigate,
  isDark,
  onToggleTheme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (route: ActiveRoute) => {
    onNavigate(route);
    setMobileMenuOpen(false);
  };

  return (
    <header className="no-print sticky top-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (single line, no attached pills) */}
        <button
          type="button"
          onClick={() => handleNav('home')}
          className="text-left text-base sm:text-lg font-bold font-display tracking-tight text-slate-900 dark:text-slate-100 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded"
        >
          SMA Negeri 1 Kersana
        </button>

        {/* Zone 2: Concise single-line navigation links */}
        <nav
          aria-label="Navigasi Utama"
          className="hidden md:flex items-center gap-6 text-sm font-medium"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeRoute === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNav(item.id)}
                className={`py-1.5 whitespace-nowrap shrink-0 border-b-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-t ${
                  isActive
                    ? 'border-blue-700 dark:border-blue-400 text-slate-900 dark:text-slate-100 font-semibold'
                    : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary Action (Dark Mode Toggle) + Mobile Menu Trigger */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={isDark ? 'Aktifkan mode terang' : 'Aktifkan mode gelap'}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            <span>{isDark ? 'Mode Terang' : 'Mode Gelap'}</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={mobileMenuOpen}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <nav
          aria-label="Navigasi Seluler"
          className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-3 space-y-1"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeRoute === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNav(item.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-800 dark:text-blue-200 font-semibold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      )}
    </header>
  );
};

export default Header;
