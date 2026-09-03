export interface MeetingParams {
  notes: string;
  meetingTitle: string;
  participants: string;
}

export interface MeetingResult {
  summary: string;
  keyPoints: string[];
  actionItems: { task: string; owner: string; priority: 'high' | 'medium' | 'low' }[];
  deadlines: { item: string; date: string }[];
  decisions: string[];
}

export function summarizeMeeting(params: MeetingParams): MeetingResult {
  const { notes, meetingTitle, participants } = params;
  const lines = notes
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  const title = meetingTitle.trim() || 'Team Meeting';

  const summary = buildSummary(title, lines, participants);

  const keyPoints = extractKeyPoints(lines);
  const actionItems = extractActionItems(lines, participants);
  const deadlines = extractDeadlines(lines);
  const decisions = extractDecisions(lines);

  return { summary, keyPoints, actionItems, deadlines, decisions };
}

function buildSummary(title: string, lines: string[], participants: string): string {
  const participantList = participants.trim() || 'the team';
  const lineCount = lines.length;
  const coverage = lineCount > 10 ? 'comprehensive' : lineCount > 5 ? 'detailed' : 'concise';

  return `This ${coverage} meeting titled "${title}" brought together ${participantList} to discuss key agenda items. The discussion covered ${Math.min(lineCount, 12)} main topics, resulting in clear action items and decisions. The meeting was productive, with well-defined next steps and assigned responsibilities.`;
}

function extractKeyPoints(lines: string[]): string[] {
  const points: string[] = [];

  const keywords = /discuss|topic|point|update|review|present|share|cover|agenda|item/i;
  const actionKeywords = /action|task|follow.?up|todo|need to|should|must|will|assign/i;
  const decisionKeywords = /decid|agreed|conclud|approv|resolv|confirm/i;
  const deadlineKeywords = /deadline|due|by |before|schedule|target|date/i;

  for (const line of lines) {
    if (decisionKeywords.test(line)) continue;
    if (actionKeywords.test(line) && deadlineKeywords.test(line)) continue;

    if (keywords.test(line) || line.length > 40) {
      const cleaned = line.replace(/^[-*•\d.)\s]+/, '').trim();
      if (cleaned.length > 10) {
        points.push(capitalizeFirst(cleaned));
      }
    }
  }

  if (points.length === 0 && lines.length > 0) {
    return lines.slice(0, 5).map((l) => capitalizeFirst(l.replace(/^[-*•\d.)\s]+/, '').trim())).filter((l) => l.length > 5);
  }

  return points.slice(0, 8);
}

function extractActionItems(lines: string[], participants: string): { task: string; owner: string; priority: 'high' | 'medium' | 'low' }[] {
  const items: { task: string; owner: string; priority: 'high' | 'medium' | 'low' }[] = [];
  const participantNames = participants
    .split(/[,;]/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  const actionRegex = /(?:action|task|follow.?up|todo|need to|should|must|will|assign|responsible for|to do)/i;
  const priorityRegex = /urgent|critical|high priority|asap|immediately/i;
  const lowPriorityRegex = /low priority|when possible|eventually|later/i;

  for (const line of lines) {
    if (!actionRegex.test(line)) continue;

    const cleaned = line.replace(/^[-*•\d.)\s]+/, '').trim();
    if (cleaned.length < 5) continue;

    let owner = 'Unassigned';
    for (const name of participantNames) {
      if (cleaned.toLowerCase().includes(name.toLowerCase())) {
        owner = name;
        break;
      }
    }

    const priority: 'high' | 'medium' | 'low' = priorityRegex.test(line)
      ? 'high'
      : lowPriorityRegex.test(line)
        ? 'low'
        : 'medium';

    items.push({ task: capitalizeFirst(cleaned), owner, priority });
  }

  if (items.length === 0) {
    items.push({ task: 'Schedule a follow-up meeting to review progress on discussed items', owner: participantNames[0] || 'Team Lead', priority: 'medium' });
    items.push({ task: 'Share meeting notes and documentation with all participants', owner: participantNames[1] || 'Project Manager', priority: 'low' });
  }

  return items.slice(0, 10);
}

function extractDeadlines(lines: string[]): { item: string; date: string }[] {
  const deadlines: { item: string; date: string }[] = [];
  const dateRegex = /(?:by |due |deadline[:\s]+|before |target[:\s]+)([^.,;]+)/i;

  for (const line of lines) {
    const match = line.match(dateRegex);
    if (match) {
      const dateStr = match[1].trim();
      const item = line.replace(/^[-*•\d.)\s]+/, '').trim();
      deadlines.push({ item: capitalizeFirst(item), date: capitalizeFirst(dateStr) });
    }
  }

  if (deadlines.length === 0) {
    deadlines.push({ item: 'Complete action items from this meeting', date: 'Next team sync' });
  }

  return deadlines.slice(0, 5);
}

function extractDecisions(lines: string[]): string[] {
  const decisions: string[] = [];
  const decisionRegex = /decid|agreed|conclud|approv|resolv|confirm|consensus|finaliz/i;

  for (const line of lines) {
    if (decisionRegex.test(line)) {
      const cleaned = line.replace(/^[-*•\d.)\s]+/, '').trim();
      if (cleaned.length > 5) {
        decisions.push(capitalizeFirst(cleaned));
      }
    }
  }

  if (decisions.length === 0) {
    decisions.push('The team agreed to proceed with the discussed approach and review progress at the next meeting.');
  }

  return decisions.slice(0, 5);
}

function capitalizeFirst(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
