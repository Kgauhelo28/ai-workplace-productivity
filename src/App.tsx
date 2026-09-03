import { useState } from 'react';
import { Sidebar, type PageId } from '@/components/layout/Sidebar';
import { TopBar } from '@/components/layout/TopBar';
import { Dashboard } from '@/pages/Dashboard';
import { EmailGenerator } from '@/pages/EmailGenerator';
import { MeetingSummarizer } from '@/pages/MeetingSummarizer';
import { TaskPlanner } from '@/pages/TaskPlanner';
import { ResearchAssistant } from '@/pages/ResearchAssistant';
import { Chatbot } from '@/pages/Chatbot';
import { Presentation } from '@/pages/Presentation';

const pageInfo: Record<PageId, { title: string; subtitle: string }> = {
  dashboard: { title: 'Dashboard', subtitle: 'Your AI-powered workspace overview' },
  email: { title: 'Smart Email Generator', subtitle: 'Create professional emails with AI — tone & audience-based' },
  meeting: { title: 'Meeting Notes Summarizer', subtitle: 'Extract key points, action items, and deadlines from raw notes' },
  tasks: { title: 'AI Task Planner', subtitle: 'Prioritize your workload and get an intelligent daily schedule' },
  research: { title: 'AI Research Assistant', subtitle: 'Generate structured research briefings with insights and trends' },
  chat: { title: 'AI Chatbot', subtitle: 'Ask anything about productivity and workplace tasks' },
  presentation: { title: 'Project Presentation', subtitle: 'FlowAI — how it was built and challenges overcome' },
};

function App() {
  const [activePage, setActivePage] = useState<PageId>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleNavigate = (page: PageId) => {
    setActivePage(page);
  };

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} />;
      case 'email':
        return <EmailGenerator />;
      case 'meeting':
        return <MeetingSummarizer />;
      case 'tasks':
        return <TaskPlanner />;
      case 'research':
        return <ResearchAssistant />;
      case 'chat':
        return <Chatbot />;
      case 'presentation':
        return <Presentation />;
      default:
        return <Dashboard onNavigate={handleNavigate} />;
    }
  };

  const info = pageInfo[activePage];

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar
        activePage={activePage}
        onNavigate={handleNavigate}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <TopBar
          onMenuClick={() => setSidebarOpen(true)}
          title={info.title}
          subtitle={info.subtitle}
        />

        <main className={`flex-1 ${activePage === 'presentation' ? 'p-2 lg:p-4' : 'p-4 lg:p-8'} ${activePage === 'presentation' ? 'max-w-[1600px]' : 'max-w-[1400px]'} w-full mx-auto animate-fade-in`} key={activePage}>
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default App;
