import {
  Mail,
  FileText,
  ListTodo,
  Search,
  MessageSquare,
  TrendingUp,
  Clock,
  CheckCircle2,
  Zap,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Disclaimer } from '@/components/ui/Disclaimer';
import { Badge } from '@/components/ui/Form';
import type { PageId } from '@/components/layout/Sidebar';

interface DashboardProps {
  onNavigate: (page: PageId) => void;
}

const stats = [
  { label: 'Emails Generated', value: '24', change: '+12%', icon: Mail, color: 'primary' },
  { label: 'Meetings Summarized', value: '18', change: '+8%', icon: FileText, color: 'accent' },
  { label: 'Tasks Planned', value: '47', change: '+23%', icon: ListTodo, color: 'success' },
  { label: 'Research Reports', value: '9', change: '+15%', icon: Search, color: 'warning' },
];

const features: { id: PageId; title: string; description: string; icon: typeof Mail; color: string; gradient: string }[] = [
  {
    id: 'email',
    title: 'Smart Email Generator',
    description: 'Craft professional emails with adjustable tone and audience targeting in seconds.',
    icon: Mail,
    color: 'primary',
    gradient: 'from-primary-500 to-primary-700',
  },
  {
    id: 'meeting',
    title: 'Meeting Notes Summarizer',
    description: 'Transform raw meeting notes into key points, action items, and deadlines.',
    icon: FileText,
    color: 'accent',
    gradient: 'from-accent-500 to-accent-700',
  },
  {
    id: 'tasks',
    title: 'AI Task Planner',
    description: 'Prioritize your workload and get an intelligent daily schedule with time blocks.',
    icon: ListTodo,
    color: 'success',
    gradient: 'from-success-500 to-success-700',
  },
  {
    id: 'research',
    title: 'AI Research Assistant',
    description: 'Generate structured research briefings with insights, trends, and recommendations.',
    icon: Search,
    color: 'warning',
    gradient: 'from-warning-500 to-warning-700',
  },
  {
    id: 'chat',
    title: 'AI Chatbot Interface',
    description: 'Ask anything about productivity, workplace tasks, and best practices.',
    icon: MessageSquare,
    color: 'primary',
    gradient: 'from-primary-500 to-accent-600',
  },
];

const recentActivity = [
  { action: 'Generated client follow-up email', time: '2 hours ago', type: 'email' },
  { action: 'Summarized Q3 planning meeting', time: '5 hours ago', type: 'meeting' },
  { action: 'Planned 6 tasks for today', time: 'Yesterday', type: 'tasks' },
  { action: 'Researched market trends report', time: 'Yesterday', type: 'research' },
  { action: 'Chatbot productivity session', time: '2 days ago', type: 'chat' },
];

const activityIcons: Record<string, typeof Mail> = {
  email: Mail,
  meeting: FileText,
  tasks: ListTodo,
  research: Search,
  chat: MessageSquare,
};

export function Dashboard({ onNavigate }: DashboardProps) {
  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-600 via-primary-700 to-accent-700 p-6 lg:p-8 shadow-elevated animate-fade-in-up">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl" />
        <div className="absolute bottom-0 left-1/3 w-48 h-48 bg-accent-400/20 rounded-full translate-y-1/2 blur-2xl" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-white/90" />
            <Badge color="primary" className="bg-white/15 text-white border-0 backdrop-blur-sm">
              AI-Powered Workspace
            </Badge>
          </div>
          <h1 className="font-display font-bold text-white text-2xl lg:text-3xl leading-tight mb-2">
            Good morning, Jordan
          </h1>
          <p className="text-white/80 text-sm lg:text-base max-w-xl leading-relaxed">
            Automate your daily work tasks with AI. Generate emails, summarize meetings, plan your day, and conduct research — all in one place.
          </p>
          <div className="flex flex-wrap gap-3 mt-5">
            <button
              onClick={() => onNavigate('email')}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-primary-700 rounded-xl text-sm font-semibold hover:bg-white/90 transition-all duration-200 shadow-sm"
            >
              <Zap className="w-4 h-4" />
              Get Started
            </button>
            <button
              onClick={() => onNavigate('chat')}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/15 text-white rounded-xl text-sm font-semibold hover:bg-white/25 transition-all duration-200 backdrop-blur-sm border border-white/20"
            >
              <MessageSquare className="w-4 h-4" />
              Ask AI Assistant
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} hover className="animate-fade-in-up" >
              <div className="p-5" style={{ animationDelay: `${i * 50}ms` }}>
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl bg-${stat.color}-50 text-${stat.color}-600 flex items-center justify-center`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-1 text-xs font-medium text-success-600">
                    <TrendingUp className="w-3.5 h-3.5" />
                    {stat.change}
                  </div>
                </div>
                <p className="font-display font-bold text-slate-900 text-2xl">{stat.value}</p>
                <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Feature Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-display font-bold text-slate-900 text-lg">AI Tools</h3>
            <p className="text-sm text-slate-500 mt-0.5">Choose a tool to get started</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <button
                key={feature.id}
                onClick={() => onNavigate(feature.id)}
                className="group text-left animate-fade-in-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <Card hover className="h-full overflow-hidden">
                  <div className="p-5">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-display font-semibold text-slate-900 text-base mb-1.5 group-hover:text-primary-600 transition-colors">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-slate-500 leading-relaxed mb-4">{feature.description}</p>
                    <div className="flex items-center gap-1.5 text-sm font-medium text-primary-600 group-hover:gap-2.5 transition-all duration-200">
                      Open tool
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Card>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Row: Activity + Quick Tips */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <div className="p-5 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-400" />
              <h3 className="font-display font-semibold text-slate-900">Recent Activity</h3>
            </div>
          </div>
          <div className="divide-y divide-slate-50">
            {recentActivity.map((activity, i) => {
              const Icon = activityIcons[activity.type];
              return (
                <div key={i} className="flex items-center gap-3 px-5 py-3.5 hover:bg-slate-50/50 transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-slate-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-700 truncate">{activity.action}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{activity.time}</p>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-success-400 flex-shrink-0" />
                </div>
              );
            })}
          </div>
        </Card>

        {/* Productivity Tip */}
        <Card>
          <div className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-accent-50 text-accent-600 flex items-center justify-center">
                <Zap className="w-4 h-4" />
              </div>
              <h3 className="font-display font-semibold text-slate-900">Tip of the Day</h3>
            </div>
            <div className="space-y-3">
              <div className="p-3.5 bg-slate-50 rounded-xl">
                <p className="text-sm text-slate-600 leading-relaxed">
                  <span className="font-semibold text-slate-800">Batch your emails.</span> Instead of checking throughout the day, process emails in 2–3 dedicated blocks. This reduces context switching and preserves deep-work time.
                </p>
              </div>
              <div className="p-3.5 bg-primary-50/50 rounded-xl">
                <p className="text-sm text-slate-600 leading-relaxed">
                  <span className="font-semibold text-primary-700">Use the 2-minute rule.</span> If a task takes less than 2 minutes, do it now rather than scheduling it.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Disclaimer */}
      <Disclaimer variant="banner" />
    </div>
  );
}
