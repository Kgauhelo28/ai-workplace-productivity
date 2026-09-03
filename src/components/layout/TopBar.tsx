import { Menu, Bell, Search } from 'lucide-react';

interface TopBarProps {
  onMenuClick: () => void;
  title: string;
  subtitle?: string;
}

export function TopBar({ onMenuClick, title, subtitle }: TopBarProps) {
  return (
    <header className="sticky top-0 z-20 glass border-b border-slate-200/60">
      <div className="flex items-center justify-between px-4 lg:px-8 py-3.5">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div>
            <h2 className="font-display font-bold text-slate-900 text-lg lg:text-xl leading-tight">{title}</h2>
            {subtitle && <p className="text-xs text-slate-500 mt-0.5 hidden sm:block">{subtitle}</p>}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-slate-100 rounded-xl text-slate-400 w-64">
            <Search className="w-4 h-4 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search workspace..."
              className="bg-transparent text-sm text-slate-600 placeholder:text-slate-400 focus:outline-none w-full"
            />
          </div>
          <button className="relative p-2.5 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-error-500 ring-2 ring-white" />
          </button>
        </div>
      </div>
    </header>
  );
}
