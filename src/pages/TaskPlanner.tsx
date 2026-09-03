import { useState } from 'react';
import { ListTodo, Sparkles, RotateCcw, Plus, Trash2, Clock, TrendingUp, Calendar, Lightbulb, GripVertical } from 'lucide-react';
import { Card, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Disclaimer } from '@/components/ui/Disclaimer';
import { Loader } from '@/components/ui/Loader';
import { Input, Textarea, Select, Label, Badge } from '@/components/ui/Form';
import { planTasks, type TaskInput, type TaskPlanResult } from '@/lib/ai/taskPlanner';

const categoryOptions = [
  { value: 'critical', label: 'Critical' },
  { value: 'client', label: 'Client' },
  { value: 'project', label: 'Project' },
  { value: 'meeting', label: 'Meeting' },
  { value: 'review', label: 'Review' },
  { value: 'admin', label: 'Admin' },
  { value: 'general', label: 'General' },
  { value: 'personal', label: 'Personal' },
  { value: 'learning', label: 'Learning' },
];

const priorityConfig: Record<string, { color: 'error' | 'warning' | 'primary' | 'slate'; label: string; barColor: string }> = {
  critical: { color: 'error', label: 'Critical', barColor: 'bg-error-500' },
  high: { color: 'warning', label: 'High', barColor: 'bg-warning-500' },
  medium: { color: 'primary', label: 'Medium', barColor: 'bg-primary-500' },
  low: { color: 'slate', label: 'Low', barColor: 'bg-slate-400' },
};

const sampleTasks: TaskInput[] = [
  { title: 'Finalize Q4 budget proposal', description: 'Complete the budget draft and prepare for executive review', estimatedHours: 3, dueDate: getTomorrow(), category: 'critical' },
  { title: 'Client presentation prep', description: 'Prepare slides for Thursday client demo', estimatedHours: 2, dueDate: getInDays(2), category: 'client' },
  { title: 'Code review for API refactor', description: 'Review PR from Mike and provide feedback', estimatedHours: 1, dueDate: getTomorrow(), category: 'review' },
  { title: 'Update project documentation', description: 'Update the wiki with latest architecture changes', estimatedHours: 1.5, dueDate: getInDays(5), category: 'project' },
  { title: 'Team 1-on-1s', description: 'Weekly check-ins with team members', estimatedHours: 2, dueDate: getInDays(3), category: 'meeting' },
];

function getTomorrow(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
}
function getInDays(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString().split('T')[0];
}

export function TaskPlanner() {
  const [tasks, setTasks] = useState<TaskInput[]>([
    { title: '', description: '', estimatedHours: 1, dueDate: getTomorrow(), category: 'general' },
  ]);

  const [result, setResult] = useState<TaskPlanResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const updateTask = (index: number, field: keyof TaskInput, value: string | number) => {
    const updated = [...tasks];
    updated[index] = { ...updated[index], [field]: value };
    setTasks(updated);
  };

  const addTask = () => {
    setTasks([...tasks, { title: '', description: '', estimatedHours: 1, dueDate: getTomorrow(), category: 'general' }]);
  };

  const removeTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const loadSample = () => {
    setTasks(sampleTasks);
  };

  const handlePlan = () => {
    const validTasks = tasks.filter((t) => t.title.trim());
    if (validTasks.length === 0) {
      setError('Please add at least one task with a title');
      return;
    }
    setError('');
    setLoading(true);
    setResult(null);

    setTimeout(() => {
      try {
        const plan = planTasks(validTasks);
        setResult(plan);
      } catch {
        setError('Something went wrong. Please try again.');
      } finally {
        setLoading(false);
      }
    }, 1400);
  };

  const handleReset = () => {
    setTasks([{ title: '', description: '', estimatedHours: 1, dueDate: getTomorrow(), category: 'general' }]);
    setResult(null);
    setError('');
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <Card>
          <CardHeader
            title="Your Tasks"
            description="Add tasks you need to plan"
            icon={<ListTodo className="w-5 h-5" />}
            action={
              <button
                onClick={loadSample}
                className="text-xs font-medium text-primary-600 hover:text-primary-700 transition-colors"
              >
                Load Sample
              </button>
            }
          />
          <div className="p-5 space-y-4">
            <div className="space-y-3 max-h-[450px] overflow-y-auto scrollbar-thin pr-1">
              {tasks.map((task, index) => (
                <div key={index} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 animate-fade-in">
                  <div className="flex items-start gap-2">
                    <GripVertical className="w-4 h-4 text-slate-300 flex-shrink-0 mt-2" />
                    <div className="flex-1 space-y-3">
                      <div>
                        <Input
                          value={task.title}
                          onChange={(v) => updateTask(index, 'title', v)}
                          placeholder="Task title..."
                        />
                      </div>
                      <Textarea
                        value={task.description}
                        onChange={(v) => updateTask(index, 'description', v)}
                        placeholder="Brief description..."
                        rows={2}
                      />
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <Label className="text-xs">Hours</Label>
                          <Input
                            type="number"
                            value={String(task.estimatedHours)}
                            onChange={(v) => updateTask(index, 'estimatedHours', parseFloat(v) || 0)}
                          />
                        </div>
                        <div>
                          <Label className="text-xs">Due Date</Label>
                          <Input
                            type="date"
                            value={task.dueDate}
                            onChange={(v) => updateTask(index, 'dueDate', v)}
                          />
                        </div>
                        <div>
                          <Label className="text-xs">Category</Label>
                          <Select
                            value={task.category}
                            onChange={(v) => updateTask(index, 'category', v)}
                            options={categoryOptions}
                          />
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => removeTask(index)}
                      disabled={tasks.length === 1}
                      className="p-1.5 rounded-lg text-slate-400 hover:bg-error-50 hover:text-error-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex-shrink-0 mt-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={addTask}
              className="w-full flex items-center justify-center gap-2 py-2.5 border-2 border-dashed border-slate-200 rounded-xl text-sm font-medium text-slate-500 hover:border-primary-300 hover:text-primary-600 hover:bg-primary-50/30 transition-all duration-200"
            >
              <Plus className="w-4 h-4" />
              Add Task
            </button>

            {error && (
              <div className="px-3 py-2 bg-error-50 border border-error-200 rounded-lg">
                <p className="text-sm text-error-700">{error}</p>
              </div>
            )}

            <div className="flex gap-3 pt-1">
              <Button onClick={handlePlan} disabled={loading} className="flex-1">
                <Sparkles className="w-4 h-4" />
                {loading ? 'Planning...' : 'Plan My Day'}
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
            title="AI-Optimized Plan"
            description="Prioritized tasks & daily schedule"
            icon={<TrendingUp className="w-5 h-5" />}
          />
          <div className="p-5 min-h-[400px] max-h-[700px] overflow-y-auto scrollbar-thin">
            {loading ? (
              <Loader label="Optimizing your schedule..." />
            ) : result ? (
              <div className="space-y-5 animate-fade-in-up">
                {/* Overview */}
                <div className="p-4 bg-primary-50/40 rounded-xl border border-primary-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-primary-600" />
                    <h4 className="text-sm font-semibold text-primary-800">Daily Overview</h4>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">{result.dailyOverview}</p>
                </div>

                {/* Prioritized Tasks */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
                    <ListTodo className="w-4 h-4 text-slate-500" />
                    Prioritized Tasks
                  </h4>
                  <div className="space-y-2.5">
                    {result.tasks.map((task, i) => {
                      const config = priorityConfig[task.priority];
                      return (
                        <div key={i} className="relative p-4 bg-white border border-slate-200 rounded-xl overflow-hidden">
                          <div className={`absolute left-0 top-0 bottom-0 w-1 ${config.barColor}`} />
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-bold text-slate-400">#{i + 1}</span>
                                <Badge color={config.color}>{config.label}</Badge>
                                <Badge color="slate">{task.category}</Badge>
                              </div>
                              <h5 className="text-sm font-semibold text-slate-800">{task.title}</h5>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <div className="flex items-center gap-1 text-xs text-slate-500">
                                <Clock className="w-3.5 h-3.5" />
                                {task.estimatedHours}h
                              </div>
                              <div className="text-xs text-slate-400 mt-0.5">{task.dueDate || 'No deadline'}</div>
                            </div>
                          </div>
                          <p className="text-xs text-slate-500 leading-relaxed mb-2">{task.description}</p>
                          <div className="flex items-center gap-2 pt-2 border-t border-slate-50">
                            <Clock className="w-3.5 h-3.5 text-primary-400 flex-shrink-0" />
                            <p className="text-xs font-medium text-primary-600">{task.suggestedTimeSlot}</p>
                          </div>
                          <p className="text-xs text-slate-400 mt-1.5 italic">{task.rationale}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Schedule Timeline */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-500" />
                    Suggested Schedule
                  </h4>
                  <div className="relative pl-4 space-y-3">
                    <div className="absolute left-1.5 top-2 bottom-2 w-px bg-slate-200" />
                    {result.schedule.map((slot, i) => (
                      <div key={i} className="relative">
                        <div className="absolute -left-3.5 top-1.5 w-3 h-3 rounded-full bg-primary-500 ring-2 ring-white" />
                        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                          <div className="flex-shrink-0 text-xs font-mono font-semibold text-primary-600 min-w-[110px]">
                            {slot.timeSlot}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-slate-700 truncate">{slot.task}</p>
                            <p className="text-xs text-slate-400">{slot.category}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Productivity Tips */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-500" />
                    Productivity Tips
                  </h4>
                  <div className="space-y-2">
                    {result.productivityTips.map((tip, i) => (
                      <div key={i} className="flex items-start gap-2.5 p-3 bg-amber-50/40 rounded-lg border border-amber-100">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-100 text-amber-700 text-xs font-bold flex items-center justify-center mt-0.5">
                          {i + 1}
                        </span>
                        <p className="text-sm text-slate-600 leading-relaxed">{tip}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <Disclaimer />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary-50 flex items-center justify-center mb-4">
                  <ListTodo className="w-8 h-8 text-primary-300" />
                </div>
                <p className="text-sm font-medium text-slate-400">Your optimized plan will appear here</p>
                <p className="text-xs text-slate-400 mt-1">Add tasks and click Plan My Day</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
