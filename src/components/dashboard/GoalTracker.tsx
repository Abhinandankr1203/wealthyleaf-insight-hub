import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Target, Plus, Calendar, DollarSign, TrendingUp, AlertCircle, CheckCircle } from "lucide-react";

interface Goal {
  id: number;
  name: string;
  target: number;
  current: number;
  deadline: string;
  category: 'emergency' | 'vacation' | 'retirement' | 'house' | 'education' | 'other';
  priority: 'low' | 'medium' | 'high';
  monthlyContribution?: number;
}

interface GoalTrackerProps {
  goals: Goal[];
  onGoalUpdate?: (goalId: number, newAmount: number) => void;
  onGoalAdd?: (goal: Omit<Goal, 'id'>) => void;
}

const GoalTracker = ({ goals, onGoalUpdate, onGoalAdd }: GoalTrackerProps) => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newGoal, setNewGoal] = useState({
    name: '',
    target: 0,
    current: 0,
    deadline: '',
    category: 'other' as Goal['category'],
    priority: 'medium' as Goal['priority'],
    monthlyContribution: 0
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getGoalProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getDaysRemaining = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'emergency':
        return <AlertCircle className="w-4 h-4" />;
      case 'vacation':
        return <Calendar className="w-4 h-4" />;
      case 'retirement':
        return <TrendingUp className="w-4 h-4" />;
      case 'house':
        return <DollarSign className="w-4 h-4" />;
      default:
        return <Target className="w-4 h-4" />;
    }
  };

  const handleAddGoal = () => {
    if (onGoalAdd && newGoal.name && newGoal.target > 0) {
      onGoalAdd(newGoal);
      setNewGoal({
        name: '',
        target: 0,
        current: 0,
        deadline: '',
        category: 'other',
        priority: 'medium',
        monthlyContribution: 0
      });
      setIsAddDialogOpen(false);
    }
  };

  const sortedGoals = [...goals].sort((a, b) => {
    // Sort by priority first, then by deadline
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    const aPriority = priorityOrder[a.priority as keyof typeof priorityOrder];
    const bPriority = priorityOrder[b.priority as keyof typeof priorityOrder];
    
    if (aPriority !== bPriority) {
      return bPriority - aPriority;
    }
    
    return getDaysRemaining(a.deadline) - getDaysRemaining(b.deadline);
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-blue-500" />
              <span>Investment Goals</span>
            </CardTitle>
            <CardDescription>Track your financial objectives and progress</CardDescription>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Goal
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Goal</DialogTitle>
                <DialogDescription>
                  Create a new financial goal to track your progress.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="goal-name">Goal Name</Label>
                  <Input
                    id="goal-name"
                    value={newGoal.name}
                    onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
                    placeholder="e.g., Emergency Fund"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="goal-target">Target Amount</Label>
                    <Input
                      id="goal-target"
                      type="number"
                      value={newGoal.target}
                      onChange={(e) => setNewGoal({ ...newGoal, target: Number(e.target.value) })}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="goal-current">Current Amount</Label>
                    <Input
                      id="goal-current"
                      type="number"
                      value={newGoal.current}
                      onChange={(e) => setNewGoal({ ...newGoal, current: Number(e.target.value) })}
                      placeholder="0"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="goal-deadline">Deadline</Label>
                  <Input
                    id="goal-deadline"
                    type="date"
                    value={newGoal.deadline}
                    onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="goal-monthly">Monthly Contribution</Label>
                  <Input
                    id="goal-monthly"
                    type="number"
                    value={newGoal.monthlyContribution}
                    onChange={(e) => setNewGoal({ ...newGoal, monthlyContribution: Number(e.target.value) })}
                    placeholder="0"
                  />
                </div>
                <div className="flex space-x-4">
                  <Button onClick={handleAddGoal} className="flex-1">
                    Add Goal
                  </Button>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="flex-1">
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-6">
          {sortedGoals.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Target className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No goals set yet. Create your first financial goal to get started!</p>
            </div>
          ) : (
            sortedGoals.map((goal) => {
              const progress = getGoalProgress(goal.current, goal.target);
              const daysRemaining = getDaysRemaining(goal.deadline);
              const isOverdue = daysRemaining < 0;
              const isNearDeadline = daysRemaining <= 30 && daysRemaining >= 0;
              
              return (
                <div key={goal.id} className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        {getCategoryIcon(goal.category)}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium">{goal.name}</h3>
                          <Badge className={getPriorityColor(goal.priority)}>
                            {goal.priority}
                          </Badge>
                          {progress >= 100 && (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          )}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          Due: {new Date(goal.deadline).toLocaleDateString()}
                          {isOverdue && (
                            <span className="text-red-500 ml-2">(Overdue)</span>
                          )}
                          {isNearDeadline && !isOverdue && (
                            <span className="text-yellow-500 ml-2">({daysRemaining} days left)</span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-medium">{formatCurrency(goal.current)}</div>
                      <div className="text-sm text-gray-500">of {formatCurrency(goal.target)}</div>
                      {goal.monthlyContribution && goal.monthlyContribution > 0 && (
                        <div className="text-xs text-gray-400">
                          +{formatCurrency(goal.monthlyContribution)}/month
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <Progress value={progress} className="h-3" />
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">
                      {progress.toFixed(1)}% complete
                    </span>
                    <span className="text-gray-500">
                      {formatCurrency(goal.target - goal.current)} remaining
                    </span>
                  </div>
                  
                  {goal.monthlyContribution && goal.monthlyContribution > 0 && (
                    <div className="text-xs text-gray-400">
                      At current rate, you'll reach your goal in{' '}
                      {Math.ceil((goal.target - goal.current) / goal.monthlyContribution)} months
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
        
        {goals.length > 0 && (
          <div className="mt-6 pt-4 border-t">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {goals.filter(g => getGoalProgress(g.current, g.target) >= 100).length}
                </div>
                <div className="text-sm text-gray-500">Completed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-600">
                  {goals.filter(g => {
                    const days = getDaysRemaining(g.deadline);
                    return days <= 30 && days >= 0;
                  }).length}
                </div>
                <div className="text-sm text-gray-500">Due Soon</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {formatCurrency(goals.reduce((sum, g) => sum + g.current, 0))}
                </div>
                <div className="text-sm text-gray-500">Total Saved</div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GoalTracker; 