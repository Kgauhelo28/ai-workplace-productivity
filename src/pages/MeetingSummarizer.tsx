import { useState } from 'react';
import { FileText, Sparkles, RotateCcw, ListChecks, Calendar, CheckSquare, Lightbulb, FileBarChart } from 'lucide-react';
import { Card, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Disclaimer } from '@/components/ui/Disclaimer';
import { Loader } from '@/components/ui/Loader';
import { Input, Textarea, Label, CopyButton, Badge } from '@/components/ui/Form';
import { summarizeMeeting, type MeetingResult } from '@/lib/ai/meetingSummarizer';

const sampleNotes = `Weekly Product Sync - September 3
Attendees: Sarah, Mike, Jennifer, Tom

Discussed Q3 product roadmap progress
Sarah presented the new onboarding flow design - team agreed it's ready for development
Mike shared update on API integration - 80% complete, on track for Friday deadline
Reviewed customer feedback from last release - need to prioritize the dashboard performance issue
Action item: Jennifer to finalize onboarding copy by Thursday
Action item: Tom to schedule design review with stakeholders by end of week
Action item: Mike to deploy API changes to staging by Friday
Decided to move the analytics feature to Q4
Agreed to reduce sprint length from 3 weeks to 2 weeks starting next sprint
Need to schedule a team retrospective for next week`;

const priorityColors: Record<string, 'error' | 'warning' | 'success'> = {
  high: 'error',
  medium: 'warning',
  low: 'success',
};

export function MeetingSummarizer() {
  const [notes, setNotes] = useState('');
  const [meetingTitle, setMeetingTitle] = useState('');
  const [participants, setParticipants] = useState('');

  const [result, setResult] = useState<MeetingResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSummarize = () => {
    if (!notes.trim()) {
      setError('Please paste your meeting notes');
      return;
    }
    setError('');
    setLoading(true);
    setResult(null);

    setTimeout(() => {
      try {
        const summary = summarizeMeeting({ notes, meetingTitle, participants });
        setResult(summary);
      } catch {
        setError('Something went wrong. Please try again.');
      } finally {
        setLoading(false);
      }
    }, 1400);
  };

  const handleReset = () => {
    setNotes('');
    setMeetingTitle('');
    setParticipants('');
    setResult(null);
    setError('');
  };

  const handleLoadSample = () => {
    setNotes(sampleNotes);
    setMeetingTitle('Weekly Product Sync');
    setParticipants('Sarah, Mike, Jennifer, Tom');
  };

  const fullSummaryText = result
    ? `SUMMARY\n${result.summary}\n\nKEY POINTS\n${result.keyPoints.map((p, i) => `${i + 1}. ${p}`).join('\n')}\n\nACTION ITEMS\n${result.actionItems.map((a) => `- [${a.priority.toUpperCase()}] ${a.task} (Owner: ${a.owner})`).join('\n')}\n\nDEADLINES\n${result.deadlines.map((d) => `- ${d.item}: ${d.date}`).join('\n')}\n\nDECISIONS\n${result.decisions.map((d) => `- ${d}`).join('\n')}`
    : '';

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <Card>
          <CardHeader
            title="Meeting Notes Input"
            description="Paste your raw meeting notes"
            icon={<FileText className="w-5 h-5" />}
            action={
              <button
                onClick={handleLoadSample}
                className="text-xs font-medium text-primary-600 hover:text-primary-700 transition-colors"
              >
                Load Sample
              </button>
            }
          />
          <div className="p-5 space-y-4">
            <div>
              <Label>Meeting Title</Label>
              <Input
                value={meetingTitle}
                onChange={setMeetingTitle}
                placeholder="e.g., Weekly Product Sync"
              />
            </div>

            <div>
              <Label>Participants (comma-separated)</Label>
              <Input
                value={participants}
                onChange={setParticipants}
                placeholder="e.g., Sarah, Mike, Jennifer"
              />
            </div>

            <div>
              <Label>Meeting Notes *</Label>
              <Textarea
                value={notes}
                onChange={setNotes}
                placeholder="Paste your raw meeting notes here..."
                rows={10}
              />
              <p className="text-xs text-slate-400 mt-1.5">
                {notes.trim() ? `${notes.trim().split('\n').length} lines detected` : 'Include action items, decisions, and deadlines for best results'}
              </p>
            </div>

            {error && (
              <div className="px-3 py-2 bg-error-50 border border-error-200 rounded-lg">
                <p className="text-sm text-error-700">{error}</p>
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <Button onClick={handleSummarize} disabled={loading} className="flex-1">
                <Sparkles className="w-4 h-4" />
                {loading ? 'Summarizing...' : 'Summarize Meeting'}
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
            title="Meeting Summary"
            description="AI-extracted insights and actions"
            icon={<FileBarChart className="w-5 h-5" />}
            action={result ? <CopyButton text={fullSummaryText} /> : undefined}
          />
          <div className="p-5 min-h-[400px] max-h-[700px] overflow-y-auto scrollbar-thin">
            {loading ? (
              <Loader label="Analyzing meeting notes..." />
            ) : result ? (
              <div className="space-y-5 animate-fade-in-up">
                {/* Summary */}
                <div className="p-4 bg-primary-50/40 rounded-xl border border-primary-100">
                  <div className="flex items-center gap-2 mb-2">
                    <FileBarChart className="w-4 h-4 text-primary-600" />
                    <h4 className="text-sm font-semibold text-primary-800">Executive Summary</h4>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">{result.summary}</p>
                </div>

                {/* Key Points */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="w-4 h-4 text-amber-500" />
                    <h4 className="text-sm font-semibold text-slate-800">Key Points</h4>
                    <Badge color="slate">{result.keyPoints.length}</Badge>
                  </div>
                  <div className="space-y-2">
                    {result.keyPoints.map((point, i) => (
                      <div key={i} className="flex items-start gap-2.5 p-3 bg-slate-50 rounded-lg">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-100 text-amber-700 text-xs font-bold flex items-center justify-center mt-0.5">
                          {i + 1}
                        </span>
                        <p className="text-sm text-slate-600 leading-relaxed">{point}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Items */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <ListChecks className="w-4 h-4 text-success-600" />
                    <h4 className="text-sm font-semibold text-slate-800">Action Items</h4>
                    <Badge color="success">{result.actionItems.length}</Badge>
                  </div>
                  <div className="space-y-2">
                    {result.actionItems.map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5 p-3 bg-white border border-slate-200 rounded-lg">
                        <CheckSquare className="w-4 h-4 text-slate-300 flex-shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-slate-700 leading-snug">{item.task}</p>
                          <div className="flex items-center gap-2 mt-1.5">
                            <Badge color={priorityColors[item.priority]}>
                              {item.priority} priority
                            </Badge>
                            <span className="text-xs text-slate-400">·</span>
                            <span className="text-xs text-slate-500 font-medium">{item.owner}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Deadlines */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="w-4 h-4 text-error-500" />
                    <h4 className="text-sm font-semibold text-slate-800">Deadlines</h4>
                  </div>
                  <div className="space-y-2">
                    {result.deadlines.map((deadline, i) => (
                      <div key={i} className="flex items-center gap-2.5 p-3 bg-error-50/40 rounded-lg border border-error-100">
                        <Calendar className="w-4 h-4 text-error-400 flex-shrink-0" />
                        <p className="text-sm text-slate-600 flex-1">{deadline.item}</p>
                        <Badge color="error">{deadline.date}</Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Decisions */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <CheckSquare className="w-4 h-4 text-accent-600" />
                    <h4 className="text-sm font-semibold text-slate-800">Decisions Made</h4>
                  </div>
                  <div className="space-y-2">
                    {result.decisions.map((decision, i) => (
                      <div key={i} className="flex items-start gap-2.5 p-3 bg-accent-50/40 rounded-lg border border-accent-100">
                        <div className="w-5 h-5 rounded-full bg-accent-100 text-accent-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckSquare className="w-3 h-3" />
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed">{decision}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <Disclaimer />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary-50 flex items-center justify-center mb-4">
                  <FileText className="w-8 h-8 text-primary-300" />
                </div>
                <p className="text-sm font-medium text-slate-400">Your meeting summary will appear here</p>
                <p className="text-xs text-slate-400 mt-1">Paste notes and click Summarize Meeting</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
