export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface ChatContext {
  messages: ChatMessage[];
}

const knowledgeBase: { keywords: string[]; response: (input: string) => string }[] = [
  {
    keywords: ['email', 'write email', 'draft email', 'compose'],
    response: () =>
      `I can help you write professional emails! Here are some tips for effective workplace emails:\n\n1. Start with a clear, descriptive subject line\n2. Open with a friendly but professional greeting\n3. State your purpose in the first sentence\n4. Use short paragraphs and bullet points for readability\n5. End with a clear call to action\n6. Proofread before sending\n\nWould you like me to help you draft a specific email? You can use the Smart Email Generator in the sidebar for a structured approach.`,
  },
  {
    keywords: ['meeting', 'notes', 'summarize meeting', 'minutes'],
    response: () =>
      `Meeting notes are most effective when they capture decisions, action items, and deadlines. Here's a best-practice structure:\n\n• Meeting title and attendees\n• Key discussion points\n• Decisions made\n• Action items with owners and due dates\n• Next steps\n\nYou can use the Meeting Notes Summarizer in the sidebar — just paste your raw notes and it will extract key points, action items, and deadlines automatically.`,
  },
  {
    keywords: ['task', 'prioritize', 'schedule', 'plan', 'productivity', 'time management'],
    response: () =>
      `Effective task prioritization comes down to balancing urgency and effort. I recommend:\n\n1. List all tasks with estimated time and deadlines\n2. Score each by urgency (deadline proximity) and effort\n3. Tackle critical tasks during peak focus hours (typically 9–11 AM)\n4. Batch similar tasks to reduce context switching\n5. Schedule breaks — the Pomodoro technique works well\n\nTry the AI Task Planner in the sidebar — it will automatically prioritize and schedule your tasks for the day.`,
  },
  {
    keywords: ['research', 'analyze', 'study', 'investigate', 'report'],
    response: () =>
      `When conducting research, structure is key. Start with a clear question, gather diverse sources, and synthesize findings into:\n\n• An overview of the landscape\n• Key insights and findings\n• Emerging trends\n• Actionable recommendations\n\nThe AI Research Assistant in the sidebar can generate a structured research briefing on any topic — give it a try!`,
  },
  {
    keywords: ['stress', 'overwhelmed', 'burnout', 'work life balance', 'tired'],
    response: () =>
      `It's important to manage workload sustainably. Here are some strategies:\n\n• Prioritize ruthlessly — not everything is urgent\n• Block focus time and protect it from interruptions\n• Take regular breaks (try 25/5 Pomodoro intervals)\n• Delegate where possible\n• Set boundaries on after-hours communication\n\nIf you're feeling consistently overwhelmed, consider talking with your manager about workload rebalancing. Would you like help planning your day to reduce stress?`,
  },
  {
    keywords: ['presentation', 'slides', 'pitch', 'deck'],
    response: () =>
      `Great presentations tell a story. Here's a framework:\n\n1. Start with the key message (what should the audience remember?)\n2. Structure: Problem → Solution → Evidence → Call to Action\n3. One idea per slide, minimal text\n4. Use visuals over words where possible\n5. Practice your delivery — confidence matters\n\nWould you like help structuring a specific presentation?`,
  },
  {
    keywords: ['hello', 'hi', 'hey', 'greetings'],
    response: () =>
      `Hello! I'm your AI Workplace Productivity Assistant. I can help you with:\n\n• Writing professional emails\n• Summarizing meeting notes\n• Planning and prioritizing tasks\n• Conducting research\n• General productivity advice\n\nWhat would you like help with today?`,
  },
  {
    keywords: ['thank', 'thanks', 'appreciate'],
    response: () =>
      `You're welcome! I'm always here to help. Is there anything else you'd like assistance with? You can also explore the tools in the sidebar for more structured AI-powered features.`,
  },
  {
    keywords: ['help', 'what can you do', 'features', 'capabilities'],
    response: () =>
      `I'm your AI Workplace Productivity Assistant! Here's what I can do:\n\n📧 Smart Email Generator — Create professional emails with adjustable tone and audience\n📝 Meeting Notes Summarizer — Extract key points, action items, and deadlines from raw notes\n📋 AI Task Planner — Prioritize and schedule your tasks intelligently\n🔍 AI Research Assistant — Generate structured research briefings on any topic\n💬 AI Chatbot — Ask me anything about productivity and workplace tasks\n\nUse the sidebar to access each tool, or just ask me here!`,
  },
];

export function generateChatResponse(input: string, context: ChatContext): string {
  const lowerInput = input.toLowerCase().trim();

  for (const entry of knowledgeBase) {
    if (entry.keywords.some((kw) => lowerInput.includes(kw))) {
      return entry.response(input);
    }
  }

  const lastMessages = context.messages.slice(-4);
  const hasQuestion = /\?|how|what|why|when|where|which|can you|could you/i.test(input);

  if (hasQuestion) {
    return `That's a great question. While I specialize in workplace productivity topics like email writing, meeting summaries, task planning, and research, here's my general take:\n\n${generateContextualResponse(input, lastMessages)}\n\nFor more structured help, try one of the dedicated tools in the sidebar — they're designed to produce professional, ready-to-use outputs for specific workplace tasks.`;
  }

  return `I understand you're asking about "${input.trim()}". Here's what I'd suggest:\n\n${generateContextualResponse(input, lastMessages)}\n\nIf this is related to emails, meetings, tasks, or research, try the corresponding tool in the sidebar for a more detailed, structured result. Is there anything specific I can help you with?`;
}

function generateContextualResponse(input: string, history: ChatMessage[]): string {
  const responses = [
    `Based on your question, I'd recommend approaching this systematically: break the problem into smaller parts, identify what you already know, and tackle each component methodically. This approach works well for most workplace challenges.`,
    `Here's a practical approach: start by clarifying your goal, then identify the resources and information you need, and finally create a simple action plan with clear next steps. Don't hesitate to iterate as you learn more.`,
    `I'd suggest considering this from multiple angles: what's the desired outcome, what constraints are you working within, and what's the simplest path to get there? Often the most straightforward approach is the most effective.`,
    `For this type of challenge, it helps to focus on the fundamentals: define success clearly, gather the right information, and take consistent action. Small, deliberate steps often lead to the best results.`,
  ];

  const index = (input.length + history.length) % responses.length;
  return responses[index];
}

export function generateWelcomeMessage(): string {
  return `Hello! I'm your AI Workplace Productivity Assistant. I can help you with writing emails, summarizing meetings, planning tasks, conducting research, and answering general productivity questions.\n\nWhat would you like help with today?`;
}
