export interface TaskInput {
  title: string;
  description: string;
  estimatedHours: number;
  dueDate: string;
  category: string;
}

export interface PlannedTask {
  title: string;
  description: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  priorityScore: number;
  estimatedHours: number;
  dueDate: string;
  category: string;
  suggestedTimeSlot: string;
  rationale: string;
}

export interface TaskPlanResult {
  tasks: PlannedTask[];
  schedule: { timeSlot: string; task: string; category: string }[];
  dailyOverview: string;
  productivityTips: string[];
}

export function planTasks(tasks: TaskInput[]): TaskPlanResult {
  const planned = tasks.map((task) => analyzeTask(task));
  planned.sort((a, b) => b.priorityScore - a.priorityScore);

  const schedule = buildSchedule(planned);
  const dailyOverview = buildOverview(planned);
  const productivityTips = buildTips(planned);

  return { tasks: planned, schedule, dailyOverview, productivityTips };
}

function analyzeTask(task: TaskInput): PlannedTask {
  const { title, description, estimatedHours, dueDate, category } = task;

  const urgencyScore = calcUrgency(dueDate);
  const effortScore = calcEffort(estimatedHours);
  const categoryScore = calcCategory(category);
  const priorityScore = Math.round((urgencyScore * 0.5 + effortScore * 0.3 + categoryScore * 0.2) * 10) / 10;

  const priority: PlannedTask['priority'] =
    priorityScore >= 8 ? 'critical' : priorityScore >= 6 ? 'high' : priorityScore >= 3.5 ? 'medium' : 'low';

  const suggestedTimeSlot = suggestTimeSlot(priority, estimatedHours);
  const rationale = buildRationale(priority, urgencyScore, effortScore, category);

  return {
    title: title.trim() || 'Untitled Task',
    description: description.trim() || 'No description provided.',
    priority,
    priorityScore,
    estimatedHours,
    dueDate,
    category: category || 'General',
    suggestedTimeSlot,
    rationale,
  };
}

function calcUrgency(dueDate: string): number {
  if (!dueDate) return 5;
  const due = new Date(dueDate);
  if (isNaN(due.getTime())) return 5;

  const now = new Date();
  const diffDays = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) return 10;
  if (diffDays <= 1) return 9;
  if (diffDays <= 3) return 7;
  if (diffDays <= 7) return 5;
  if (diffDays <= 14) return 3;
  return 1;
}

function calcEffort(hours: number): number {
  if (hours <= 0) return 3;
  if (hours <= 1) return 6;
  if (hours <= 2) return 7;
  if (hours <= 4) return 8;
  if (hours <= 8) return 6;
  return 4;
}

function calcCategory(category: string): number {
  const categoryMap: Record<string, number> = {
    'critical': 10,
    'client': 9,
    'deadline': 9,
    'meeting': 7,
    'project': 7,
    'review': 6,
    'admin': 4,
    'general': 5,
    'personal': 3,
    'learning': 2,
  };
  const key = category.toLowerCase().trim();
  return categoryMap[key] ?? 5;
}

function suggestTimeSlot(priority: string, hours: number): string {
  if (priority === 'critical') return '9:00 AM – 11:00 AM (Peak focus hours)';
  if (priority === 'high') return hours > 2 ? '9:00 AM – 12:00 PM (Morning deep work)' : '10:00 AM – 12:00 PM (Morning block)';
  if (priority === 'medium') return '1:00 PM – 3:00 PM (Afternoon block)';
  return '3:00 PM – 5:00 PM (Late afternoon)';
}

function buildRationale(priority: string, urgency: number, effort: number, category: string): string {
  const urgencyLabel = urgency >= 8 ? 'highly urgent' : urgency >= 5 ? 'moderately urgent' : 'low urgency';
  const effortLabel = effort >= 7 ? 'requires significant focus' : effort >= 5 ? 'moderate effort needed' : 'quick to complete';

  return `Ranked as ${priority} priority due to ${urgencyLabel} deadline proximity. This task ${effortLabel} and falls under the ${category} category, influencing its position in your daily schedule.`;
}

function buildSchedule(planned: PlannedTask[]): { timeSlot: string; task: string; category: string }[] {
  const slots: { timeSlot: string; task: string; category: string }[] = [];

  const morning = planned.filter((t) => t.priority === 'critical' || t.priority === 'high');
  const afternoon = planned.filter((t) => t.priority === 'medium');
  const evening = planned.filter((t) => t.priority === 'low');

  let morningStart = 9;
  for (const task of morning) {
    const end = morningStart + Math.max(task.estimatedHours, 1);
    slots.push({
      timeSlot: `${formatTime(morningStart)} – ${formatTime(Math.min(end, 12))}`,
      task: task.title,
      category: task.category,
    });
    morningStart = Math.min(end, 12);
    if (morningStart >= 12) break;
  }

  let afternoonStart = 13;
  for (const task of afternoon) {
    const end = afternoonStart + Math.max(task.estimatedHours, 1);
    slots.push({
      timeSlot: `${formatTime(afternoonStart)} – ${formatTime(Math.min(end, 17))}`,
      task: task.title,
      category: task.category,
    });
    afternoonStart = Math.min(end, 17);
    if (afternoonStart >= 17) break;
  }

  let eveningStart = 15;
  for (const task of evening) {
    const end = eveningStart + Math.max(task.estimatedHours, 0.5);
    slots.push({
      timeSlot: `${formatTime(eveningStart)} – ${formatTime(Math.min(end, 17))}`,
      task: task.title,
      category: task.category,
    });
    eveningStart = Math.min(end, 17);
    if (eveningStart >= 17) break;
  }

  return slots;
}

function formatTime(hour: number): string {
  const h = Math.floor(hour);
  const m = Math.round((hour - h) * 60);
  const period = h >= 12 ? 'PM' : 'AM';
  const displayH = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return m > 0 ? `${displayH}:${String(m).padStart(2, '0')} ${period}` : `${displayH}:00 ${period}`;
}

function buildOverview(planned: PlannedTask[]): string {
  const total = planned.length;
  const critical = planned.filter((t) => t.priority === 'critical').length;
  const high = planned.filter((t) => t.priority === 'high').length;
  const totalHours = planned.reduce((sum, t) => sum + t.estimatedHours, 0);

  return `You have ${total} task${total !== 1 ? 's' : ''} scheduled for today, totaling approximately ${totalHours} hour${totalHours !== 1 ? 's' : ''} of work. ${critical} task${critical !== 1 ? 's are' : ' is'} marked as critical and ${high} as high priority. I recommend starting with your most critical tasks during your peak focus hours (9:00–11:00 AM) for maximum productivity.`;
}

function buildTips(planned: PlannedTask[]): string[] {
  const tips: string[] = [];

  const totalHours = planned.reduce((sum, t) => sum + t.estimatedHours, 0);
  if (totalHours > 8) {
    tips.push('Your total estimated workload exceeds 8 hours. Consider deferring low-priority tasks to tomorrow or delegating where possible.');
  }

  const critical = planned.filter((t) => t.priority === 'critical').length;
  if (critical > 2) {
    tips.push('You have multiple critical tasks. Focus on one at a time to maintain quality and avoid context switching.');
  }

  tips.push('Use the Pomodoro technique (25-minute focused sessions with 5-minute breaks) for tasks requiring deep concentration.');
  tips.push('Batch similar tasks together (e.g., all emails, all reviews) to reduce cognitive switching costs.');
  tips.push('Schedule a 15-minute buffer between meetings and deep-work blocks to reset your focus.');

  return tips.slice(0, 5);
}
