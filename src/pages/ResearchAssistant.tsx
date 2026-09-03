import { useState } from 'react';
import { Search, Sparkles, RotateCcw, TrendingUp, Lightbulb, CheckCircle2, BookOpen, FileBarChart, Quote } from 'lucide-react';
import { Card, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Disclaimer } from '@/components/ui/Disclaimer';
import { Loader } from '@/components/ui/Loader';
import { Input, Textarea, Select, Label, CopyButton, Badge } from '@/components/ui/Form';
import { generateResearch, type ResearchResult } from '@/lib/ai/researchAssistant';

const depthOptions = [
  { value: 'brief', label: 'Brief — Quick overview' },
  { value: 'standard', label: 'Standard — Detailed analysis' },
  { value: 'comprehensive', label: 'Comprehensive — In-depth briefing' },
];

const sampleTopics = [
  'AI adoption in enterprise',
  'Remote work productivity trends',
  'Sustainable business practices',
  'Digital transformation strategies',
];

export function ResearchAssistant() {
  const [topic, setTopic] = useState('');
  const [depth, setDepth] = useState<'brief' | 'standard' | 'comprehensive'>('standard');
  const [focus, setFocus] = useState('');

  const [result, setResult] = useState<ResearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleResearch = () => {
    if (!topic.trim()) {
      setError('Please enter a research topic');
      return;
    }
    setError('');
    setLoading(true);
    setResult(null);

    setTimeout(() => {
      try {
        const research = generateResearch({ topic, depth, focus });
        setResult(research);
      } catch {
        setError('Something went wrong. Please try again.');
      } finally {
        setLoading(false);
      }
    }, 1600);
  };

  const handleReset = () => {
    setTopic('');
    setFocus('');
    setDepth('standard');
    setResult(null);
    setError('');
  };

  const fullResearchText = result
    ? `RESEARCH BRIEFING: ${topic}\n\nOVERVIEW\n${result.overview}\n\nKEY INSIGHTS\n${result.keyInsights.map((i) => `• ${i.title}: ${i.detail}`).join('\n\n')}\n\nTRENDS\n${result.trends.map((t) => `• ${t}`).join('\n')}\n\nRECOMMENDATIONS\n${result.recommendations.map((r) => `• ${r}`).join('\n')}\n\nSUMMARY\n${result.summary}\n\nSOURCES\n${result.sources.map((s) => `• ${s}`).join('\n')}`
    : '';

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <Card>
          <CardHeader
            title="Research Parameters"
            description="Define your research query"
            icon={<Search className="w-5 h-5" />}
          />
          <div className="p-5 space-y-4">
            <div>
              <Label>Research Topic *</Label>
              <Input
                value={topic}
                onChange={setTopic}
                placeholder="e.g., AI adoption in enterprise"
              />
              <div className="flex flex-wrap gap-1.5 mt-2">
                {sampleTopics.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTopic(t)}
                    className="px-2.5 py-1 text-xs font-medium bg-slate-100 text-slate-600 rounded-lg hover:bg-primary-50 hover:text-primary-600 transition-colors"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label>Research Depth</Label>
              <Select
                value={depth}
                onChange={(v) => setDepth(v as 'brief' | 'standard' | 'comprehensive')}
                options={depthOptions}
              />
            </div>

            <div>
              <Label>Specific Focus / Angle</Label>
              <Textarea
                value={focus}
                onChange={setFocus}
                placeholder="e.g., Focus on adoption barriers and ROI for mid-size companies"
                rows={3}
              />
            </div>

            {error && (
              <div className="px-3 py-2 bg-error-50 border border-error-200 rounded-lg">
                <p className="text-sm text-error-700">{error}</p>
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <Button onClick={handleResearch} disabled={loading} className="flex-1">
                <Sparkles className="w-4 h-4" />
                {loading ? 'Researching...' : 'Generate Research'}
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
            title="Research Briefing"
            description="AI-generated insights and analysis"
            icon={<FileBarChart className="w-5 h-5" />}
            action={result ? <CopyButton text={fullResearchText} /> : undefined}
          />
          <div className="p-5 min-h-[400px] max-h-[750px] overflow-y-auto scrollbar-thin">
            {loading ? (
              <Loader label="Conducting research..." />
            ) : result ? (
              <div className="space-y-5 animate-fade-in-up">
                {/* Overview */}
                <div className="p-4 bg-primary-50/40 rounded-xl border border-primary-100">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="w-4 h-4 text-primary-600" />
                    <h4 className="text-sm font-semibold text-primary-800">Overview</h4>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">{result.overview}</p>
                </div>

                {/* Key Insights */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="w-4 h-4 text-amber-500" />
                    <h4 className="text-sm font-semibold text-slate-800">Key Insights</h4>
                    <Badge color="warning">{result.keyInsights.length}</Badge>
                  </div>
                  <div className="space-y-2.5">
                    {result.keyInsights.map((insight, i) => (
                      <div key={i} className="p-3.5 bg-white border border-slate-200 rounded-xl">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-amber-100 text-amber-700 text-xs font-bold flex items-center justify-center">
                            {i + 1}
                          </span>
                          <h5 className="text-sm font-semibold text-slate-800">{insight.title}</h5>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed pl-8">{insight.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Trends */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="w-4 h-4 text-accent-600" />
                    <h4 className="text-sm font-semibold text-slate-800">Emerging Trends</h4>
                  </div>
                  <div className="space-y-2">
                    {result.trends.map((trend, i) => (
                      <div key={i} className="flex items-start gap-2.5 p-3 bg-accent-50/40 rounded-lg border border-accent-100">
                        <TrendingUp className="w-4 h-4 text-accent-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-slate-600 leading-relaxed">{trend}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 className="w-4 h-4 text-success-600" />
                    <h4 className="text-sm font-semibold text-slate-800">Recommendations</h4>
                  </div>
                  <div className="space-y-2">
                    {result.recommendations.map((rec, i) => (
                      <div key={i} className="flex items-start gap-2.5 p-3 bg-success-50/40 rounded-lg border border-success-100">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-success-100 text-success-700 text-xs font-bold flex items-center justify-center mt-0.5">
                          {i + 1}
                        </span>
                        <p className="text-sm text-slate-600 leading-relaxed">{rec}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Summary */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <h4 className="text-sm font-semibold text-slate-800 mb-2">Executive Summary</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">{result.summary}</p>
                </div>

                {/* Sources */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Quote className="w-4 h-4 text-slate-400" />
                    <h4 className="text-sm font-semibold text-slate-800">Source Types</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {result.sources.map((source, i) => (
                      <span key={i} className="px-3 py-1.5 text-xs font-medium bg-slate-100 text-slate-600 rounded-lg">
                        {source}
                      </span>
                    ))}
                  </div>
                </div>

                <Disclaimer />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary-50 flex items-center justify-center mb-4">
                  <Search className="w-8 h-8 text-primary-300" />
                </div>
                <p className="text-sm font-medium text-slate-400">Your research briefing will appear here</p>
                <p className="text-xs text-slate-400 mt-1">Enter a topic and click Generate Research</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
