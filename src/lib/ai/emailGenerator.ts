export type EmailTone = 'professional' | 'friendly' | 'persuasive' | 'urgent' | 'apologetic' | 'appreciative';
export type EmailAudience = 'client' | 'team' | 'manager' | 'stakeholder' | 'vendor' | 'general';

export interface EmailParams {
  topic: string;
  tone: EmailTone;
  audience: EmailAudience;
  keyPoints: string;
  callToAction: string;
  senderName: string;
}

export interface EmailResult {
  subject: string;
  greeting: string;
  body: string[];
  closing: string;
  signature: string;
  fullEmail: string;
}

const toneDescriptors: Record<EmailTone, { style: string; vocabulary: string }> = {
  professional: { style: 'formal and authoritative', vocabulary: 'clear, business-appropriate language' },
  friendly: { style: 'warm and approachable', vocabulary: 'conversational yet professional language' },
  persuasive: { style: 'compelling and confident', vocabulary: 'persuasive language with clear benefits' },
  urgent: { style: 'direct and time-sensitive', vocabulary: 'concise, action-oriented language' },
  apologetic: { style: 'empathetic and sincere', vocabulary: 'thoughtful, reassuring language' },
  appreciative: { style: 'grateful and positive', vocabulary: 'warm, recognition-focused language' },
};

const audienceContext: Record<EmailAudience, { label: string; address: string }> = {
  client: { label: 'a valued client', address: 'Dear' },
  team: { label: 'your team', address: 'Hi everyone' },
  manager: { label: 'your manager', address: 'Dear' },
  stakeholder: { label: 'key stakeholders', address: 'Dear' },
  vendor: { label: 'a business partner', address: 'Dear' },
  general: { label: 'the recipient', address: 'Hello' },
};

function splitKeyPoints(keyPoints: string): string[] {
  return keyPoints
    .split(/[\n,;]+/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0)
    .slice(0, 6);
}

export function generateEmail(params: EmailParams): EmailResult {
  const { topic, tone, audience, keyPoints, callToAction, senderName } = params;
  const toneInfo = toneDescriptors[tone];
  const audInfo = audienceContext[audience];
  const points = splitKeyPoints(keyPoints);

  const subject = buildSubject(topic, tone);
  const greeting = audInfo.address === 'Hi everyone' ? 'Hi everyone,' : `${audInfo.address} ${audInfo.label.charAt(0).toUpperCase() + audInfo.label.slice(1)},`;

  const intro = buildIntro(topic, tone, audience);
  const bodyParagraphs = buildBodyParagraphs(points, topic, tone);
  const ctaParagraph = callToAction
    ? `\n${buildCTA(callToAction, tone)}`
    : '';

  const closing = buildClosing(tone);
  const signature = senderName ? `Best regards,\n${senderName}` : 'Best regards,';

  const body = [intro, ...bodyParagraphs];
  if (callToAction) body.push(buildCTA(callToAction, tone));

  const fullEmail = `${subject}\n\n${greeting}\n\n${body.join('\n\n')}\n\n${closing}\n\n${signature}`;

  return { subject, greeting, body, closing, signature, fullEmail };
}

function buildSubject(topic: string, tone: EmailTone): string {
  const prefix: Record<EmailTone, string> = {
    professional: '',
    friendly: '',
    persuasive: '',
    urgent: 'URGENT: ',
    apologetic: '',
    appreciative: '',
  };
  const cleanTopic = topic.trim() || 'Project Update';
  return `${prefix[tone]}${cleanTopic.charAt(0).toUpperCase() + cleanTopic.slice(1)}`;
}

function buildIntro(topic: string, tone: EmailTone, audience: EmailAudience): string {
  const topicClean = topic.trim() || 'this matter';
  const intros: Record<string, string> = {
    professional: `I hope this message finds you well. I am writing to share important updates regarding ${topicClean}.`,
    friendly: `I hope you're having a great week! I wanted to reach out about ${topicClean} and share some updates.`,
    persuasive: `I wanted to bring something to your attention that I believe presents a significant opportunity regarding ${topicClean}.`,
    urgent: `I need to bring an important and time-sensitive matter to your attention regarding ${topicClean}.`,
    apologetic: `I am writing to sincerely address a situation related to ${topicClean} and to make things right.`,
    appreciative: `I wanted to take a moment to express my gratitude in connection with ${topicClean}.`,
  };
  return intros[tone] || intros.professional;
}

function buildBodyParagraphs(points: string[], topic: string, tone: EmailTone): string[] {
  if (points.length === 0) {
    return [
      `After careful consideration, I want to highlight the key aspects of this matter. We have made meaningful progress and there are several important points to communicate.`,
      `I believe these developments will have a positive impact on our shared goals, and I am confident we are moving in the right direction.`,
    ];
  }

  const paragraphs: string[] = [];

  if (points.length <= 3) {
    paragraphs.push(
      `Here are the key points I want to share:\n${points.map((p, i) => `  ${i + 1}. ${p}`).join('\n')}`
    );
  } else {
    const first = points.slice(0, Math.ceil(points.length / 2));
    const second = points.slice(Math.ceil(points.length / 2));
    paragraphs.push(
      `To begin, here are the primary points:\n${first.map((p, i) => `  ${i + 1}. ${p}`).join('\n')}`
    );
    paragraphs.push(
      `Additionally, there are several more details to note:\n${second.map((p, i) => `  ${i + 1}. ${p}`).join('\n')}`
    );
  }

  paragraphs.push(
    `These points reflect our current understanding and approach. I am happy to discuss any of them in further detail at your convenience.`
  );

  return paragraphs;
}

function buildCTA(cta: string, tone: EmailTone): string {
  const templates: Record<string, string> = {
    professional: `Please let me know if you have any questions or would like to discuss this further. ${cta}`,
    friendly: `I'd love to hear your thoughts! ${cta}`,
    persuasive: `I encourage you to consider this opportunity seriously. ${cta}`,
    urgent: `Please review and respond at your earliest convenience. ${cta}`,
    apologetic: `I would appreciate the opportunity to discuss this with you. ${cta}`,
    appreciative: `Thank you again for your time and consideration. ${cta}`,
  };
  return templates[tone] || templates.professional;
}

function buildClosing(tone: EmailTone): string {
  const closings: Record<string, string> = {
    professional: 'Thank you for your time and attention to this matter.',
    friendly: 'Looking forward to connecting soon!',
    persuasive: 'I look forward to your favorable response.',
    urgent: 'Thank you for your prompt attention to this matter.',
    apologetic: 'Thank you for your understanding and patience.',
    appreciative: 'With sincere thanks,',
  };
  return closings[tone] || closings.professional;
}
