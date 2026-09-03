import {
  LayoutDashboard,
  Mail,
  FileText,
  ListTodo,
  Search,
  MessageSquare,
  Sparkles,
  X,
} from 'lucide-react';
import { type ReactNode } from 'react';

export type PageId = 'dashboard' | 'email' | 'meeting' | 'tasks' | 'research' | 'chat';

interface NavItem {
  id: PageId;
  label: string;
  icon: ReactNode;
  description: string;
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-[18px] h-[18px]" />, description: 'Overview & stats' },
  { id: 'email', label: 'Email Generator', icon: <Mail className="w-[18px] h-[18px]" />, description: 'Tone & audience-based' },
  { id: 'meeting', label: 'Meeting Summarizer', icon: <FileText className="w-[18px] h-[18px]" />, description: 'Key points & actions' },
  { id: 'tasks', label: 'Task Planner', icon: <ListTodo className="w-[18px] h-[18px]" />, description: 'Prioritize & schedule' },
  { id: 'research', label: 'Research Assistant', icon: <Search className="w-[18px] h-[18px]" />, description: 'Insights & summaries' },
  { id: 'chat', label: 'AI Chatbot', icon: <MessageSquare className="w-[18px] h-[18px]" />, description: 'Ask anything' },
];

interface SidebarProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ activePage, onNavigate, isOpen, onClose }: SidebarProps) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-72 bg-white border-r border-slate-200/80 z-40 flex flex-col transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo / Brand */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-600 to-accent-600 flex items-center justify-center shadow-sm">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-display font-bold text-slate-900 text-lg leading-none">FlowAI</h1>
              <p className="text-[11px] text-slate-400 font-medium mt-0.5">Productivity Assistant</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto scrollbar-thin">
          <p className="px-3 py-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Workspace</p>
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  onClose();
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <span className={`flex-shrink-0 transition-colors ${isActive ? 'text-primary-600' : 'text-slate-400 group-hover:text-slate-600'}`}>
                  {item.icon}
                </span>
                <div className="flex-1 text-left min-w-0">
                  <p className={`text-sm font-medium leading-tight ${isActive ? 'text-primary-700' : ''}`}>{item.label}</p>
                  <p className="text-[11px] text-slate-400 leading-tight mt-0.5 truncate">{item.description}</p>
                </div>
                {isActive && <div className="w-1.5 h-1.5 rounded-full bg-primary-500 flex-shrink-0" />}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-3 py-4 border-t border-slate-100">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-slate-50">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-sm font-semibold">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-700 truncate">Jordan Davis</p>
              <p className="text-[11px] text-slate-400 truncate">Pro Workspace</p>
            </div>
            <div className="w-2 h-2 rounded-full bg-success-500" />
          </div>
        </div>
      </aside>
    </>
  );
}
