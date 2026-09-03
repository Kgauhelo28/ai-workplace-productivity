import { useState } from 'react';
import { Mail, Sparkles, RotateCcw, Send } from 'lucide-react';
import { Card, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Disclaimer } from '@/components/ui/Disclaimer';
import { Loader, SkeletonCard } from '@/components/ui/Loader';
import { Input, Textarea, Select, Label, CopyButton, Badge } from '@/components/ui/Form';
import { generateEmail, type EmailTone, type EmailAudience, type EmailResult } from '@/lib/ai/emailGenerator';

const toneOptions = [
  { value: 'professional', label: 'Professional' },
  { value: 'friendly', label: 'Friendly' },
  { value: 'persuasive', label: 'Persuasive' },
  { value: 'urgent', label: 'Urgent' },
  { value: 'apologetic', label: 'Apologetic' },
  { value: 'appreciative', label: 'Appreciative' },
];

const audienceOptions = [
  { value: 'client', label: 'Client' },
  { value: 'team', label: 'Team' },
  { value: 'manager', label: 'Manager' },
  { value: 'stakeholder', label: 'Stakeholder' },
  { value: 'vendor', label: 'Vendor' },
  { value: 'general', label: 'General' },
];

const toneColors: Record<EmailTone, string> = {
  professional: 'primary',
  friendly: 'accent',
  persuasive: 'warning',
  urgent: 'error',
  apologetic: 'slate',
  appreciative: 'success',
};

export function EmailGenerator() {
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState<EmailTone>('professional');
  const [audience, setAudience] = useState<EmailAudience>('client');
  const [keyPoints, setKeyPoints] = useState('');
  const [callToAction, setCallToAction] = useState('');
  const [senderName, setSenderName] = useState('');

  const [result, setResult] = useState<EmailResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = () => {
    if (!topic.trim()) {
      setError('Please enter an email topic');
      return;
    }
    setError('');
    setLoading(true);
    setResult(null);

    setTimeout(() => {
      try {
        const email = generateEmail({ topic, tone, audience, keyPoints, callToAction, senderName });
        setResult(email);
      } catch {
        setError('Something went wrong. Please try again.');
      } finally {
        setLoading(false);
      }
    }, 1200);
  };

  const handleReset = () => {
    setTopic('');
    setKeyPoints('');
    setCallToAction('');
    setSenderName('');
    setTone('professional');
    setAudience('client');
    setResult(null);
    setError('');
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <Card>
          <CardHeader
            title="Email Configuration"
            description="Set the parameters for your email"
            icon={<Mail className="w-5 h-5" />}
          />
          <div className="p-5 space-y-4">
            <div>
              <Label>Topic / Subject Matter *</Label>
              <Input
                value={topic}
                onChange={setTopic}
                placeholder="e.g., Q4 project update and timeline revision"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Tone</Label>
                <Select
                  value={tone}
                  onChange={(v) => setTone(v as EmailTone)}
                  options={toneOptions}
                />
              </div>
              <div>
                <Label>Audience</Label>
                <Select
                  value={audience}
                  onChange={(v) => setAudience(v as EmailAudience)}
                  options={audienceOptions}
                />
              </div>
            </div>

            <div>
              <Label>Key Points (one per line or comma-separated)</Label>
              <Textarea
                value={keyPoints}
                onChange={setKeyPoints}
                placeholder={"e.g., Project is on track for December delivery\nBudget is 5% under forecast\nNeed approval for additional resource"}
                rows={4}
              />
            </div>

            <div>
              <Label>Call to Action</Label>
              <Input
                value={callToAction}
                onChange={setCallToAction}
                placeholder="e.g., Please review and respond by Friday"
              />
            </div>

            <div>
              <Label>Your Name (for signature)</Label>
              <Input
                value={senderName}
                onChange={setSenderName}
                placeholder="e.g., Jordan Davis"
              />
            </div>

            {error && (
              <div className="px-3 py-2 bg-error-50 border border-error-200 rounded-lg">
                <p className="text-sm text-error-700">{error}</p>
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <Button onClick={handleGenerate} disabled={loading} className="flex-1">
                <Sparkles className="w-4 h-4" />
                {loading ? 'Generating...' : 'Generate Email'}
              </Button>
              <Button variant="outline" onClick={handleReset} disabled={loading}>
                <RotateCcw className="w-4 h-4" />
                Reset
              </Button>
            </div>
          </div>
        </Card>

        {/* Output Panel */}
        <Card>
          <CardHeader
            title="Generated Email"
            description="AI-crafted professional email"
            icon={<Send className="w-5 h-5" />}
            action={result ? <CopyButton text={result.fullEmail} /> : undefined}
          />
          <div className="p-5 min-h-[400px]">
            {loading ? (
              <div className="space-y-4">
                <Loader label="Crafting your email..." />
                <SkeletonCard />
              </div>
            ) : result ? (
              <div className="space-y-4 animate-fade-in-up">
                {/* Meta badges */}
                <div className="flex flex-wrap gap-2">
                  <Badge color={toneColors[tone] as 'primary'}>
                    {toneOptions.find((t) => t.value === tone)?.label} tone
                  </Badge>
                  <Badge color="slate">
                    For: {audienceOptions.find((a) => a.value === audience)?.label}
                  </Badge>
                </div>

                {/* Subject */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Subject Line</p>
                  <p className="text-sm font-semibold text-slate-800">{result.subject}</p>
                </div>

                {/* Email body */}
                <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-3">
                  <p className="text-sm text-slate-700 font-medium">{result.greeting}</p>
                  {result.body.map((paragraph, i) => (
                    <p key={i} className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                      {paragraph}
                    </p>
                  ))}
                  <p className="text-sm text-slate-600 leading-relaxed">{result.closing}</p>
                  <p className="text-sm text-slate-700 font-medium whitespace-pre-line pt-1">{result.signature}</p>
                </div>

                <Disclaimer />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary-50 flex items-center justify-center mb-4">
                  <Mail className="w-8 h-8 text-primary-300" />
                </div>
                <p className="text-sm font-medium text-slate-400">Your generated email will appear here</p>
                <p className="text-xs text-slate-400 mt-1">Fill in the form and click Generate Email</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
