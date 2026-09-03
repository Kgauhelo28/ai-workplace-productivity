import { type ReactNode } from 'react';
import {
  Sparkles,
  Mail,
  FileText,
  ListTodo,
  Search,
  MessageSquare,
  LayoutDashboard,
  Code2,
  Palette,
  Layers,
  Database,
  GitBranch,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  Rocket,
  Target,
  Zap,
  TrendingUp,
  Cpu,
  Wrench,
  Shield,
  ArrowRight,
} from 'lucide-react';

export interface SlideData {
  id: number;
  type: 'title' | 'section' | 'content' | 'features' | 'tech' | 'problems' | 'closing';
  theme: 'dark' | 'light' | 'gradient';
  title?: string;
  subtitle?: string;
  content?: ReactNode;
  icon?: ReactNode;
}

export const slides: SlideData[] = [
  // Slide 1 — Title
  {
    id: 1,
    type: 'title',
    theme: 'gradient',
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-2xl mb-8 animate-fade-in-up">
          <Sparkles className="w-10 h-10 text-white" />
        </div>
        <h1 className="font-display font-extrabold text-white text-4xl lg:text-6xl leading-tight mb-4 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          FlowAI
        </h1>
        <p className="text-white/80 text-lg lg:text-2xl font-medium mb-2 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          AI Workplace Productivity Assistant
        </p>
        <p className="text-white/60 text-sm lg:text-base max-w-2xl leading-relaxed animate-fade-in-up" style={{ animationDelay: '300ms' }}>
          A modern web application that helps professionals automate daily work tasks using AI
        </p>
        <div className="flex items-center gap-3 mt-8 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
          <div className="px-4 py-2 bg-white/15 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium border border-white/20">
            Project Presentation
          </div>
          <div className="px-4 py-2 bg-white/15 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium border border-white/20">
            September 2026
          </div>
        </div>
      </div>
    ),
  },

  // Slide 2 — Agenda
  {
    id: 2,
    type: 'content',
    theme: 'light',
    title: 'Presentation Overview',
    subtitle: 'What we will cover today',
    icon: <Target className="w-5 h-5" />,
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {[
          { num: '01', title: 'Project Overview', desc: 'What FlowAI is and who it serves', icon: <Sparkles className="w-5 h-5" /> },
          { num: '02', title: 'Core Features', desc: 'Five AI-powered productivity tools', icon: <Layers className="w-5 h-5" /> },
          { num: '03', title: 'Architecture & Tech Stack', desc: 'How the application was built', icon: <Code2 className="w-5 h-5" /> },
          { num: '04', title: 'Development Process', desc: 'Step-by-step creation journey', icon: <GitBranch className="w-5 h-5" /> },
          { num: '05', title: 'Challenges & Solutions', desc: 'Problems encountered and overcome', icon: <AlertCircle className="w-5 h-5" /> },
          { num: '06', title: 'Key Takeaways', desc: 'Lessons learned and future plans', icon: <Rocket className="w-5 h-5" /> },
        ].map((item, i) => (
          <div
            key={item.num}
            className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-slate-200 shadow-soft animate-fade-in-up"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center">
              {item.icon}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono font-bold text-primary-500">{item.num}</span>
                <h3 className="font-display font-semibold text-slate-900">{item.title}</h3>
              </div>
              <p className="text-sm text-slate-500">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    ),
  },

  // Slide 3 — Project Overview
  {
    id: 3,
    type: 'content',
    theme: 'light',
    title: 'Project Overview',
    subtitle: 'The problem we set out to solve',
    icon: <Target className="w-5 h-5" />,
    content: (
      <div className="mt-8 space-y-6">
        <div className="p-6 bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl border border-primary-100">
          <div className="flex items-start gap-3 mb-4">
            <AlertCircle className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-display font-semibold text-slate-900 text-lg mb-1">The Challenge</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Professionals spend hours each day on repetitive tasks — drafting emails, summarizing meetings, planning their day, and conducting research. These tasks consume valuable time that could be spent on higher-value work.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: <Zap className="w-5 h-5" />, stat: '2.5 hrs', label: 'Daily time spent on email', color: 'primary' },
            { icon: <FileText className="w-5 h-5" />, stat: '31%', label: 'Of meetings lack clear action items', color: 'accent' },
            { icon: <TrendingUp className="w-5 h-5" />, stat: '40%', label: 'Of worktime lost to low-value tasks', color: 'warning' },
          ].map((stat, i) => (
            <div key={i} className="p-5 bg-white rounded-2xl border border-slate-200 shadow-soft animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
              <div className={`w-10 h-10 rounded-xl bg-${stat.color}-50 text-${stat.color}-600 flex items-center justify-center mb-3`}>
                {stat.icon}
              </div>
              <p className="font-display font-bold text-slate-900 text-2xl">{stat.stat}</p>
              <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="p-5 bg-slate-900 rounded-2xl">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-accent-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-display font-semibold text-white text-base mb-1">Our Solution</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                FlowAI — a single, unified workspace where AI automates five core productivity tasks, producing professional, structured outputs in seconds rather than minutes.
              </p>
            </div>
          </div>
        </div>
      </div>
    ),
  },

  // Slide 4 — Core Features Section
  {
    id: 4,
    type: 'section',
    theme: 'dark',
    title: 'Core Features',
    subtitle: 'Five AI-powered tools in one workspace',
    icon: <Layers className="w-6 h-6" />,
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-6 animate-fade-in-up">
          <Layers className="w-8 h-8 text-white" />
        </div>
        <h2 className="font-display font-bold text-white text-3xl lg:text-5xl mb-3 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          Core Features
        </h2>
        <p className="text-white/60 text-lg max-w-xl animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          Five AI-powered productivity tools, each with structured prompt engineering for professional output
        </p>
      </div>
    ),
  },

  // Slide 5 — Feature: Email Generator
  {
    id: 5,
    type: 'features',
    theme: 'light',
    title: 'Smart Email Generator',
    subtitle: 'Tone & audience-based professional email creation',
    icon: <Mail className="w-5 h-5" />,
    content: (
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-soft">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="font-display font-semibold text-slate-900">How It Works</h3>
            </div>
            <ul className="space-y-3">
              {[
                'User selects a tone: Professional, Friendly, Persuasive, Urgent, Apologetic, or Appreciative',
                'User selects an audience: Client, Team, Manager, Stakeholder, Vendor, or General',
                'User enters topic, key points, call to action, and sender name',
                'AI generates structured email with subject line, greeting, body paragraphs, and signature',
              ].map((point, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-success-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-600 leading-relaxed">{point}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="space-y-4">
          <div className="p-5 bg-primary-50/40 rounded-2xl border border-primary-100">
            <h4 className="font-display font-semibold text-primary-800 text-sm mb-3">Prompt Engineering Approach</h4>
            <div className="space-y-2 text-xs text-slate-600">
              <div className="p-3 bg-white rounded-lg border border-primary-100">
                <span className="font-mono text-primary-600">TONE_LAYER:</span> Maps each tone to a writing style and vocabulary descriptor that shapes sentence structure and word choice.
              </div>
              <div className="p-3 bg-white rounded-lg border border-primary-100">
                <span className="font-mono text-primary-600">AUDIENCE_LAYER:</span> Adjusts greeting formality and address style based on the recipient relationship.
              </div>
              <div className="p-3 bg-white rounded-lg border border-primary-100">
                <span className="font-mono text-primary-600">STRUCTURE_LAYER:</span> Enforces a 4-part email structure: intro, body with key points, CTA, and closing.
              </div>
            </div>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <p className="text-xs text-slate-500 leading-relaxed">
              <span className="font-semibold text-slate-700">Output quality:</span> Every generated email follows professional formatting conventions, with tone-appropriate language and audience-aware structure. One-click copy to clipboard.
            </p>
          </div>
        </div>
      </div>
    ),
  },

  // Slide 6 — Feature: Meeting Summarizer
  {
    id: 6,
    type: 'features',
    theme: 'light',
    title: 'Meeting Notes Summarizer',
    subtitle: 'Key points, action items, and deadlines extraction',
    icon: <FileText className="w-5 h-5" />,
    content: (
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-soft">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-accent-50 text-accent-600 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-display font-semibold text-slate-900">How It Works</h3>
            </div>
            <ul className="space-y-3">
              {[
                'User pastes raw, unstructured meeting notes',
                'AI parses line-by-line using keyword and pattern matching',
                'Extracts key discussion points, decisions, and action items',
                'Identifies deadlines and assigns priority levels (high/medium/low)',
                'Matches action items to participants by name detection',
              ].map((point, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-success-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-600 leading-relaxed">{point}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="space-y-4">
          <div className="p-5 bg-accent-50/40 rounded-2xl border border-accent-100">
            <h4 className="font-display font-semibold text-accent-800 text-sm mb-3">Prompt Engineering Approach</h4>
            <div className="space-y-2 text-xs text-slate-600">
              <div className="p-3 bg-white rounded-lg border border-accent-100">
                <span className="font-mono text-accent-600">KEYWORD_FILTER:</span> Uses regex patterns to classify lines as discussion, action, decision, or deadline based on trigger words.
              </div>
              <div className="p-3 bg-white rounded-lg border border-accent-100">
                <span className="font-mono text-accent-600">OWNER_MATCHING:</span> Cross-references participant names against action item text to auto-assign ownership.
              </div>
              <div className="p-3 bg-white rounded-lg border border-accent-100">
                <span className="font-mono text-accent-600">PRIORITY_SCORING:</span> Detects urgency keywords ("urgent", "ASAP", "critical") to assign priority levels.
              </div>
            </div>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <p className="text-xs text-slate-500 leading-relaxed">
              <span className="font-semibold text-slate-700">Output quality:</span> Structured into five clear sections — executive summary, key points, action items with owners, deadlines, and decisions — ready to share with the team.
            </p>
          </div>
        </div>
      </div>
    ),
  },

  // Slide 7 — Feature: Task Planner
  {
    id: 7,
    type: 'features',
    theme: 'light',
    title: 'AI Task Planner',
    subtitle: 'Prioritization + intelligent daily scheduling',
    icon: <ListTodo className="w-5 h-5" />,
    content: (
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-soft">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-success-50 text-success-600 flex items-center justify-center">
                <ListTodo className="w-5 h-5" />
              </div>
              <h3 className="font-display font-semibold text-slate-900">How It Works</h3>
            </div>
            <ul className="space-y-3">
              {[
                'User adds tasks with title, description, estimated hours, due date, and category',
                'AI scores each task on urgency (50%), effort (30%), and category weight (20%)',
                'Tasks are ranked and assigned priority: Critical, High, Medium, or Low',
                'AI generates a time-blocked daily schedule using peak focus hours',
                'Personalized productivity tips are generated based on workload analysis',
              ].map((point, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-success-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-600 leading-relaxed">{point}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="space-y-4">
          <div className="p-5 bg-success-50/40 rounded-2xl border border-success-100">
            <h4 className="font-display font-semibold text-success-800 text-sm mb-3">Prompt Engineering Approach</h4>
            <div className="space-y-2 text-xs text-slate-600">
              <div className="p-3 bg-white rounded-lg border border-success-100">
                <span className="font-mono text-success-600">URGENCY_SCORE:</span> Calculates days until deadline and maps to a 1–10 urgency scale (overdue = 10, 2+ weeks = 1).
              </div>
              <div className="p-3 bg-white rounded-lg border border-success-100">
                <span className="font-mono text-success-600">EFFORT_SCORE:</span> Weighs estimated hours — medium tasks (2–4h) score highest as they fit focus blocks best.
              </div>
              <div className="p-3 bg-white rounded-lg border border-success-100">
                <span className="font-mono text-success-600">SCHEDULE_ENGINE:</span> Assigns critical tasks to 9–11 AM (peak focus), medium to afternoon, low to late afternoon.
              </div>
            </div>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <p className="text-xs text-slate-500 leading-relaxed">
              <span className="font-semibold text-slate-700">Output quality:</span> Prioritized task list with rationale, visual time-blocked schedule timeline, and adaptive productivity recommendations based on total workload.
            </p>
          </div>
        </div>
      </div>
    ),
  },

  // Slide 8 — Feature: Research Assistant
  {
    id: 8,
    type: 'features',
    theme: 'light',
    title: 'AI Research Assistant',
    subtitle: 'Structured research briefings with insights and trends',
    icon: <Search className="w-5 h-5" />,
    content: (
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-soft">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-warning-50 text-warning-600 flex items-center justify-center">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="font-display font-semibold text-slate-900">How It Works</h3>
            </div>
            <ul className="space-y-3">
              {[
                'User enters a research topic and optional focus angle',
                'User selects depth: Brief (3 insights), Standard (5), or Comprehensive (7)',
                'AI generates overview, key insights, emerging trends, and recommendations',
                'Includes executive summary and categorized source types',
                'Suggested topics provided for quick exploration',
              ].map((point, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-success-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-600 leading-relaxed">{point}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="space-y-4">
          <div className="p-5 bg-warning-50/40 rounded-2xl border border-warning-100">
            <h4 className="font-display font-semibold text-warning-800 text-sm mb-3">Prompt Engineering Approach</h4>
            <div className="space-y-2 text-xs text-slate-600">
              <div className="p-3 bg-white rounded-lg border border-warning-100">
                <span className="font-mono text-warning-600">TEMPLATE_LIBRARY:</span> Pre-structured insight templates (landscape, drivers, risks, opportunities) populated with topic-specific content.
              </div>
              <div className="p-3 bg-white rounded-lg border border-warning-100">
                <span className="font-mono text-warning-600">DEPTH_CONTROL:</span> Insight count scales with selected depth — brief gives essentials, comprehensive covers future outlook.
              </div>
              <div className="p-3 bg-white rounded-lg border border-warning-100">
                <span className="font-mono text-warning-600">FOCUS_INJECTION:</span> User-specified focus angle is woven into overview and recommendations for relevance.
              </div>
            </div>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <p className="text-xs text-slate-500 leading-relaxed">
              <span className="font-semibold text-slate-700">Output quality:</span> Professional research briefing format with six structured sections, suitable for sharing with stakeholders and decision-makers.
            </p>
          </div>
        </div>
      </div>
    ),
  },

  // Slide 9 — Feature: Chatbot
  {
    id: 9,
    type: 'features',
    theme: 'light',
    title: 'AI Chatbot Interface',
    subtitle: 'Conversational productivity assistant',
    icon: <MessageSquare className="w-5 h-5" />,
    content: (
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-soft">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="font-display font-semibold text-slate-900">How It Works</h3>
            </div>
            <ul className="space-y-3">
              {[
                'Conversational interface with message bubbles and typing indicators',
                'Knowledge base covers email, meetings, tasks, research, and productivity topics',
                'Keyword matching routes questions to specialized response generators',
                'Context-aware — considers conversation history for follow-up questions',
                'Suggested prompt chips for quick-start conversations',
              ].map((point, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-success-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-600 leading-relaxed">{point}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="space-y-4">
          <div className="p-5 bg-primary-50/40 rounded-2xl border border-primary-100">
            <h4 className="font-display font-semibold text-primary-800 text-sm mb-3">Prompt Engineering Approach</h4>
            <div className="space-y-2 text-xs text-slate-600">
              <div className="p-3 bg-white rounded-lg border border-primary-100">
                <span className="font-mono text-primary-600">KEYWORD_ROUTING:</span> Input is matched against keyword arrays to route to the correct domain-specific response generator.
              </div>
              <div className="p-3 bg-white rounded-lg border border-primary-100">
                <span className="font-mono text-primary-600">CONTEXT_WINDOW:</span> Last 4 messages are passed to the response engine for conversational continuity.
              </div>
              <div className="p-3 bg-white rounded-lg border border-primary-100">
                <span className="font-mono text-primary-600">FALLBACK_ENGINE:</span> Unmatched queries get contextual responses using deterministic rotation based on input length and history.
              </div>
            </div>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <p className="text-xs text-slate-500 leading-relaxed">
              <span className="font-semibold text-slate-700">Output quality:</span> Natural, helpful responses with structured advice. Cross-references other tools in the workspace for a unified experience.
            </p>
          </div>
        </div>
      </div>
    ),
  },

  // Slide 10 — Tech Stack Section
  {
    id: 10,
    type: 'section',
    theme: 'dark',
    title: 'Architecture & Tech Stack',
    subtitle: 'The technologies behind FlowAI',
    icon: <Cpu className="w-6 h-6" />,
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-6 animate-fade-in-up">
          <Cpu className="w-8 h-8 text-white" />
        </div>
        <h2 className="font-display font-bold text-white text-3xl lg:text-5xl mb-3 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          Architecture & Tech Stack
        </h2>
        <p className="text-white/60 text-lg max-w-xl animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          Built with a modern, component-driven frontend stack
        </p>
      </div>
    ),
  },

  // Slide 11 — Tech Stack Details
  {
    id: 11,
    type: 'tech',
    theme: 'light',
    title: 'Technology Stack',
    subtitle: 'Tools and frameworks used to build FlowAI',
    icon: <Code2 className="w-5 h-5" />,
    content: (
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { name: 'React 18', role: 'UI Library', desc: 'Component-based architecture with hooks for state management', icon: <Code2 className="w-5 h-5" />, color: 'primary' },
          { name: 'TypeScript', role: 'Language', desc: 'Type-safe development with strict mode and full type coverage', icon: <Shield className="w-5 h-5" />, color: 'accent' },
          { name: 'Vite', role: 'Build Tool', desc: 'Fast dev server and optimized production builds', icon: <Zap className="w-5 h-5" />, color: 'warning' },
          { name: 'Tailwind CSS', role: 'Styling', desc: 'Utility-first CSS with custom design system and animations', icon: <Palette className="w-5 h-5" />, color: 'primary' },
          { name: 'Lucide React', role: 'Icon System', desc: 'Consistent, lightweight icon library for all UI elements', icon: <Layers className="w-5 h-5" />, color: 'accent' },
          { name: 'Supabase', role: 'Backend (Available)', desc: 'Postgres database and auth ready for data persistence', icon: <Database className="w-5 h-5" />, color: 'success' },
        ].map((tech, i) => (
          <div
            key={tech.name}
            className="p-5 bg-white rounded-2xl border border-slate-200 shadow-soft animate-fade-in-up"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className={`w-10 h-10 rounded-xl bg-${tech.color}-50 text-${tech.color}-600 flex items-center justify-center mb-3`}>
              {tech.icon}
            </div>
            <h3 className="font-display font-semibold text-slate-900 text-base">{tech.name}</h3>
            <p className={`text-xs font-medium text-${tech.color}-600 mt-0.5`}>{tech.role}</p>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">{tech.desc}</p>
          </div>
        ))}
      </div>
    ),
  },

  // Slide 12 — Architecture Diagram
  {
    id: 12,
    type: 'content',
    theme: 'light',
    title: 'Application Architecture',
    subtitle: 'How the pieces fit together',
    icon: <Layers className="w-5 h-5" />,
    content: (
      <div className="mt-8 space-y-4">
        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-soft">
          <div className="space-y-3">
            {/* Layer 1 */}
            <div className="p-4 bg-primary-50 rounded-xl border border-primary-200">
              <div className="flex items-center gap-2 mb-2">
                <LayoutDashboard className="w-4 h-4 text-primary-600" />
                <span className="text-sm font-semibold text-primary-800">Presentation Layer — UI Components</span>
              </div>
              <p className="text-xs text-slate-600 ml-6">Sidebar navigation, TopBar, page layouts, Card/Button/Form/Loader/Disclaimer components</p>
            </div>
            <div className="flex justify-center">
              <ArrowRight className="w-5 h-5 text-slate-300 rotate-90" />
            </div>
            {/* Layer 2 */}
            <div className="p-4 bg-accent-50 rounded-xl border border-accent-200">
              <div className="flex items-center gap-2 mb-2">
                <Layers className="w-4 h-4 text-accent-600" />
                <span className="text-sm font-semibold text-accent-800">Page Layer — Feature Pages</span>
              </div>
              <p className="text-xs text-slate-600 ml-6">Dashboard, EmailGenerator, MeetingSummarizer, TaskPlanner, ResearchAssistant, Chatbot</p>
            </div>
            <div className="flex justify-center">
              <ArrowRight className="w-5 h-5 text-slate-300 rotate-90" />
            </div>
            {/* Layer 3 */}
            <div className="p-4 bg-success-50 rounded-xl border border-success-200">
              <div className="flex items-center gap-2 mb-2">
                <Cpu className="w-4 h-4 text-success-600" />
                <span className="text-sm font-semibold text-success-800">AI Engine Layer — Prompt Engineering</span>
              </div>
              <p className="text-xs text-slate-600 ml-6">emailGenerator.ts, meetingSummarizer.ts, taskPlanner.ts, researchAssistant.ts, chatbot.ts</p>
            </div>
            <div className="flex justify-center">
              <ArrowRight className="w-5 h-5 text-slate-300 rotate-90" />
            </div>
            {/* Layer 4 */}
            <div className="p-4 bg-slate-100 rounded-xl border border-slate-300">
              <div className="flex items-center gap-2 mb-2">
                <Database className="w-4 h-4 text-slate-600" />
                <span className="text-sm font-semibold text-slate-700">Data Layer — Supabase (Available)</span>
              </div>
              <p className="text-xs text-slate-500 ml-6">Postgres database ready for user accounts, saved outputs, and history persistence</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 bg-slate-50 rounded-xl text-center">
            <p className="font-display font-bold text-slate-900 text-xl">35+</p>
            <p className="text-xs text-slate-500">Source files</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl text-center">
            <p className="font-display font-bold text-slate-900 text-xl">5</p>
            <p className="text-xs text-slate-500">AI engines</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl text-center">
            <p className="font-display font-bold text-slate-900 text-xl">100%</p>
            <p className="text-xs text-slate-500">Type-safe</p>
          </div>
        </div>
      </div>
    ),
  },

  // Slide 13 — Development Process
  {
    id: 13,
    type: 'content',
    theme: 'light',
    title: 'Development Process',
    subtitle: 'How FlowAI was built, step by step',
    icon: <GitBranch className="w-5 h-5" />,
    content: (
      <div className="mt-8">
        <div className="relative">
          <div className="absolute left-6 top-2 bottom-2 w-px bg-slate-200" />
          <div className="space-y-4">
            {[
              { step: '01', title: 'Design System Setup', desc: 'Configured Tailwind CSS with custom color ramps (primary, accent, success, warning, error), Inter + Plus Jakarta Sans fonts, custom animations, and shadow system.', icon: <Palette className="w-4 h-4" /> },
              { step: '02', title: 'AI Engine Development', desc: 'Built five TypeScript modules with structured prompt engineering — each producing professional, deterministic outputs from user inputs.', icon: <Cpu className="w-4 h-4" /> },
              { step: '03', title: 'Shared UI Components', desc: 'Created reusable Button, Card, Form (Input, Textarea, Select, Label, Badge, CopyButton), Loader, and Disclaimer components.', icon: <Layers className="w-4 h-4" /> },
              { step: '04', title: 'Layout Shell', desc: 'Built responsive Sidebar with mobile drawer, TopBar with search and notifications, and main content area with page transitions.', icon: <LayoutDashboard className="w-4 h-4" /> },
              { step: '05', title: 'Feature Pages', desc: 'Implemented all five feature pages with input forms, loading states, structured output panels, and copy-to-clipboard.', icon: <Code2 className="w-4 h-4" /> },
              { step: '06', title: 'Dashboard & Integration', desc: 'Created dashboard with stats, feature cards, and activity feed. Wired all pages into App.tsx with state-based routing.', icon: <Rocket className="w-4 h-4" /> },
              { step: '07', title: 'Build & Type Verification', desc: 'Ran production build and TypeScript type checking — both passed cleanly with zero errors.', icon: <CheckCircle2 className="w-4 h-4" /> },
            ].map((item, i) => (
              <div
                key={item.step}
                className="relative flex items-start gap-4 animate-fade-in-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="relative z-10 flex-shrink-0 w-12 h-12 rounded-xl bg-white border-2 border-primary-200 flex items-center justify-center text-primary-600 shadow-soft">
                  {item.icon}
                </div>
                <div className="flex-1 p-4 bg-white rounded-xl border border-slate-200 shadow-soft">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold text-primary-500">{item.step}</span>
                    <h3 className="font-display font-semibold text-slate-900 text-sm">{item.title}</h3>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },

  // Slide 14 — Problems Section
  {
    id: 14,
    type: 'section',
    theme: 'dark',
    title: 'Challenges & Solutions',
    subtitle: 'Problems encountered during development',
    icon: <AlertCircle className="w-6 h-6" />,
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-6 animate-fade-in-up">
          <AlertCircle className="w-8 h-8 text-white" />
        </div>
        <h2 className="font-display font-bold text-white text-3xl lg:text-5xl mb-3 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          Challenges & Solutions
        </h2>
        <p className="text-white/60 text-lg max-w-xl animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          Every problem encountered was an opportunity to build something more robust
        </p>
      </div>
    ),
  },

  // Slide 15 — Problem 1
  {
    id: 15,
    type: 'problems',
    theme: 'light',
    title: 'Challenge 1: AI Output Quality',
    subtitle: 'Generating consistently professional, structured results',
    icon: <AlertCircle className="w-5 h-5" />,
    content: (
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 bg-error-50/40 rounded-2xl border border-error-200">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="w-5 h-5 text-error-500" />
            <h3 className="font-display font-semibold text-error-700">The Problem</h3>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            Without access to a live LLM API, generating AI-like outputs that feel professional and structured was a significant challenge. Simple template-based approaches produced generic, repetitive results that didn't feel intelligent or adaptive to user input.
          </p>
        </div>
        <div className="p-6 bg-success-50/40 rounded-2xl border border-success-200">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="w-5 h-5 text-success-500" />
            <h3 className="font-display font-semibold text-success-700">The Solution</h3>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            Built a multi-layered prompt engineering system in TypeScript. Each AI module uses tone descriptors, audience context maps, keyword-based classification, and scoring algorithms to produce deterministic but varied, professional outputs that adapt to user inputs.
          </p>
        </div>
      </div>
    ),
  },

  // Slide 16 — Problem 2
  {
    id: 16,
    type: 'problems',
    theme: 'light',
    title: 'Challenge 2: Meeting Note Parsing',
    subtitle: 'Extracting structure from unstructured text',
    icon: <AlertCircle className="w-5 h-5" />,
    content: (
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 bg-error-50/40 rounded-2xl border border-error-200">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="w-5 h-5 text-error-500" />
            <h3 className="font-display font-semibold text-error-700">The Problem</h3>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            Meeting notes come in wildly different formats — some are bullet points, some are paragraphs, some mix action items with discussion points. Reliably extracting action items, owners, deadlines, and decisions from arbitrary text was difficult. Initial attempts missed items or miscategorized them.
          </p>
        </div>
        <div className="p-6 bg-success-50/40 rounded-2xl border border-success-200">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="w-5 h-5 text-success-500" />
            <h3 className="font-display font-semibold text-success-700">The Solution</h3>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            Implemented a regex-based classification engine with four keyword filters (action, decision, deadline, discussion). Each line is tested against multiple patterns, and participant names are cross-referenced for owner assignment. Priority is detected via urgency keywords. Fallbacks ensure output is never empty.
          </p>
        </div>
      </div>
    ),
  },

  // Slide 17 — Problem 3
  {
    id: 17,
    type: 'problems',
    theme: 'light',
    title: 'Challenge 3: Task Prioritization Logic',
    subtitle: 'Creating a fair, useful scoring algorithm',
    icon: <AlertCircle className="w-5 h-5" />,
    content: (
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 bg-error-50/40 rounded-2xl border border-error-200">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="w-5 h-5 text-error-500" />
            <h3 className="font-display font-semibold text-error-700">The Problem</h3>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            Designing a prioritization algorithm that felt intelligent was harder than expected. Early versions over-weighted urgency, causing all near-deadline tasks to cluster as "critical" regardless of effort or importance. The schedule also needed to respect realistic working hours.
          </p>
        </div>
        <div className="p-6 bg-success-50/40 rounded-2xl border border-success-200">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="w-5 h-5 text-success-500" />
            <h3 className="font-display font-semibold text-success-700">The Solution</h3>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            Developed a weighted scoring model: urgency (50%), effort (30%), category importance (20%). Effort scoring rewards medium-duration tasks (2–4 hours) as they fit focus blocks best. The schedule engine respects 9 AM–5 PM boundaries and assigns tasks to peak focus hours by priority.
          </p>
        </div>
      </div>
    ),
  },

  // Slide 18 — Problem 4
  {
    id: 18,
    type: 'problems',
    theme: 'light',
    title: 'Challenge 4: Responsive Design',
    subtitle: 'Making a complex dashboard work on all screens',
    icon: <AlertCircle className="w-5 h-5" />,
    content: (
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 bg-error-50/40 rounded-2xl border border-error-200">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="w-5 h-5 text-error-500" />
            <h3 className="font-display font-semibold text-error-700">The Problem</h3>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            The dashboard layout with a fixed sidebar, multi-column grids, and complex output panels was challenging to make responsive. On mobile, the sidebar took too much space, grids didn't reflow properly, and the chat interface needed a different layout entirely.
          </p>
        </div>
        <div className="p-6 bg-success-50/40 rounded-2xl border border-success-200">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="w-5 h-5 text-success-500" />
            <h3 className="font-display font-semibold text-success-700">The Solution</h3>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            Used a hybrid sidebar approach — sticky on desktop, slide-in drawer with overlay on mobile. Grids use responsive column counts (1/2/3/4 at breakpoints). All feature pages use a 2-column layout that collapses to 1 on smaller screens. Custom scrollbar styling and max-height with overflow for long outputs.
          </p>
        </div>
      </div>
    ),
  },

  // Slide 19 — Problem 5
  {
    id: 19,
    type: 'problems',
    theme: 'light',
    title: 'Challenge 5: TypeScript Strict Mode',
    subtitle: 'Maintaining full type safety across modules',
    icon: <AlertCircle className="w-5 h-5" />,
    content: (
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 bg-error-50/40 rounded-2xl border border-error-200">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="w-5 h-5 text-error-500" />
            <h3 className="font-display font-semibold text-error-700">The Problem</h3>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            With strict TypeScript enabled, the AI engine modules required precise typing for all function parameters, return types, and intermediate values. Dynamic operations like regex matching, object key indexing, and union type narrowing produced type errors that were time-consuming to resolve correctly.
          </p>
        </div>
        <div className="p-6 bg-success-50/40 rounded-2xl border border-success-200">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="w-5 h-5 text-success-500" />
            <h3 className="font-display font-semibold text-success-700">The Solution</h3>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            Defined explicit interfaces for every AI input and output type. Used discriminated unions for priority levels and tone options. Avoided implicit any by typing all function parameters upfront. The final typecheck passes with zero errors, giving full confidence in type safety across the codebase.
          </p>
        </div>
      </div>
    ),
  },

  // Slide 20 — Key Takeaways
  {
    id: 20,
    type: 'content',
    theme: 'light',
    title: 'Key Takeaways',
    subtitle: 'Lessons learned from building FlowAI',
    icon: <Lightbulb className="w-5 h-5" />,
    content: (
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { icon: <Cpu className="w-5 h-5" />, title: 'Structured Prompts Beat Templates', desc: 'Multi-layered prompt engineering with tone, audience, and structure layers produces far more professional and varied outputs than simple templates.', color: 'primary' },
          { icon: <Wrench className="w-5 h-5" />, title: 'Fallbacks Are Essential', desc: 'Every AI module includes fallback outputs so users never see an empty result. This builds trust and ensures the app always feels functional.', color: 'accent' },
          { icon: <Palette className="w-5 h-5" />, title: 'Design System First', desc: 'Setting up the color ramps, fonts, shadows, and animations before building features made every subsequent component consistent and faster to build.', color: 'warning' },
          { icon: <Shield className="w-5 h-5" />, title: 'Type Safety Pays Off', desc: 'Investing in strict TypeScript upfront caught bugs early and made refactoring safe. The zero-error typecheck gave confidence in the final build.', color: 'success' },
          { icon: <Layers className="w-5 h-5" />, title: 'Component Reuse Matters', desc: 'Building shared UI components (Button, Card, Form, Loader) once and reusing them across all five features saved significant development time.', color: 'primary' },
          { icon: <TrendingUp className="w-5 h-5" />, title: 'Loading States Build Trust', desc: 'Animated loading indicators and skeleton screens make the app feel responsive and professional, even when processing takes a moment.', color: 'accent' },
        ].map((item, i) => (
          <div
            key={i}
            className="p-5 bg-white rounded-2xl border border-slate-200 shadow-soft animate-fade-in-up"
            style={{ animationDelay: `${i * 70}ms` }}
          >
            <div className={`w-10 h-10 rounded-xl bg-${item.color}-50 text-${item.color}-600 flex items-center justify-center mb-3`}>
              {item.icon}
            </div>
            <h3 className="font-display font-semibold text-slate-900 text-base mb-1.5">{item.title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    ),
  },

  // Slide 21 — Future Roadmap
  {
    id: 21,
    type: 'content',
    theme: 'light',
    title: 'Future Roadmap',
    subtitle: 'Where FlowAI goes next',
    icon: <Rocket className="w-5 h-5" />,
    content: (
      <div className="mt-8 space-y-4">
        {[
          { phase: 'Phase 1', title: 'Live AI Integration', desc: 'Connect AI engines to a real LLM API (OpenAI, Anthropic) for dynamic, context-aware text generation instead of deterministic engines.', icon: <Cpu className="w-4 h-4" />, status: 'Planned' },
          { phase: 'Phase 2', title: 'User Accounts & Persistence', desc: 'Enable Supabase authentication and store generated emails, meeting summaries, and task plans to user accounts for history and reuse.', icon: <Database className="w-4 h-4" />, status: 'Planned' },
          { phase: 'Phase 3', title: 'Team Collaboration', desc: 'Share meeting summaries and task plans with team members, assign action items, and track completion across the team.', icon: <Layers className="w-4 h-4" />, status: 'Future' },
          { phase: 'Phase 4', title: 'Calendar Integration', desc: 'Sync the AI-generated daily schedule with Google Calendar and Outlook. Auto-create events from task planner output.', icon: <TrendingUp className="w-4 h-4" />, status: 'Future' },
        ].map((item, i) => (
          <div
            key={i}
            className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-slate-200 shadow-soft animate-fade-in-up"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center">
              {item.icon}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono font-bold text-primary-500">{item.phase}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${item.status === 'Planned' ? 'bg-warning-100 text-warning-700' : 'bg-slate-100 text-slate-500'}`}>
                  {item.status}
                </span>
              </div>
              <h3 className="font-display font-semibold text-slate-900 text-base mb-1">{item.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    ),
  },

  // Slide 22 — Closing
  {
    id: 22,
    type: 'closing',
    theme: 'gradient',
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <div className="w-20 h-20 rounded-3xl bg-white/15 backdrop-blur-sm flex items-center justify-center shadow-2xl mb-8 animate-fade-in-up border border-white/20">
          <Sparkles className="w-10 h-10 text-white" />
        </div>
        <h1 className="font-display font-extrabold text-white text-4xl lg:text-5xl mb-4 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          Thank You
        </h1>
        <p className="text-white/80 text-lg lg:text-xl font-medium mb-2 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          FlowAI — AI Workplace Productivity Assistant
        </p>
        <p className="text-white/60 text-sm lg:text-base max-w-xl animate-fade-in-up" style={{ animationDelay: '300ms' }}>
          Automating daily work tasks with structured AI prompt engineering
        </p>
        <div className="flex items-center gap-3 mt-8 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
          <div className="px-5 py-2.5 bg-white/15 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium border border-white/20">
            React + TypeScript + Tailwind CSS
          </div>
        </div>
        <p className="text-white/40 text-xs mt-8 animate-fade-in-up" style={{ animationDelay: '500ms' }}>
          AI-generated content may require human review
        </p>
      </div>
    ),
  },
];
