import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Calendar, 
  Plus, 
  Clock,
  CheckCircle2,
  AlertTriangle,
  Droplets,
  Scissors,
  Bug
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  category: 'irrigation' | 'pruning' | 'pest-control' | 'harvesting' | 'maintenance' | 'other';
  plotId?: string;
  completed: boolean;
  createdAt: string;
}

export const TaskManager = () => {
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Irrigation System Check',
      description: 'Inspect and maintain drip irrigation lines in North Vineyard',
      dueDate: '2024-01-10',
      priority: 'high',
      category: 'irrigation',
      plotId: '1',
      completed: false,
      createdAt: '2024-01-05'
    },
    {
      id: '2',
      title: 'Winter Pruning',
      description: 'Complete dormant season pruning for all mature vines',
      dueDate: '2024-01-15',
      priority: 'medium',
      category: 'pruning',
      completed: false,
      createdAt: '2024-01-03'
    },
    {
      id: '3',
      title: 'Soil pH Testing',
      description: 'Test soil pH levels across all plots',
      dueDate: '2024-01-08',
      priority: 'low',
      category: 'maintenance',
      completed: true,
      createdAt: '2024-01-01'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium' as const,
    category: 'other' as const
  });

  const handleAddTask = () => {
    if (!newTask.title || !newTask.dueDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in title and due date.",
        variant: "destructive",
      });
      return;
    }

    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      dueDate: newTask.dueDate,
      priority: newTask.priority,
      category: newTask.category,
      completed: false,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setTasks([task, ...tasks]);
    setNewTask({
      title: '',
      description: '',
      dueDate: '',
      priority: 'medium',
      category: 'other'
    });
    setShowAddForm(false);
    
    toast({
      title: "Task Added",
      description: `${task.title} has been scheduled.`,
    });
  };

  const toggleTaskComplete = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, completed: !task.completed }
        : task
    ));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-harvest text-foreground';
      case 'low': return 'bg-forest text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'irrigation': return Droplets;
      case 'pruning': return Scissors;
      case 'pest-control': return Bug;
      case 'harvesting': return CheckCircle2;
      case 'maintenance': return AlertTriangle;
      default: return Calendar;
    }
  };

  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Task Management</h2>
          <p className="text-muted-foreground">Schedule and track your vineyard activities</p>
        </div>
        <Button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-gradient-primary hover:opacity-90"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Task
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Tasks</p>
                <p className="text-2xl font-bold text-grape">{pendingTasks.length}</p>
              </div>
              <Clock className="w-8 h-8 text-grape opacity-60" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-forest">{completedTasks.length}</p>
              </div>
              <CheckCircle2 className="w-8 h-8 text-forest opacity-60" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">High Priority</p>
                <p className="text-2xl font-bold text-destructive">
                  {tasks.filter(t => t.priority === 'high' && !t.completed).length}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-destructive opacity-60" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Task Form */}
      {showAddForm && (
        <Card className="shadow-farm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Plus className="w-5 h-5 text-primary" />
              <span>Add New Task</span>
            </CardTitle>
            <CardDescription>Schedule a new vineyard activity</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Task Title *</Label>
                <Input
                  id="title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  placeholder="e.g., Vine Pruning"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date *</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <select 
                  id="priority"
                  value={newTask.priority}
                  onChange={(e) => setNewTask({...newTask, priority: e.target.value as any})}
                  className="w-full p-2 border border-input rounded-md bg-background"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <select 
                  id="category"
                  value={newTask.category}
                  onChange={(e) => setNewTask({...newTask, category: e.target.value as any})}
                  className="w-full p-2 border border-input rounded-md bg-background"
                >
                  <option value="irrigation">Irrigation</option>
                  <option value="pruning">Pruning</option>
                  <option value="pest-control">Pest Control</option>
                  <option value="harvesting">Harvesting</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newTask.description}
                onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                placeholder="Detailed description of the task..."
                rows={3}
              />
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleAddTask} className="bg-gradient-primary">
                <Plus className="w-4 h-4 mr-2" />
                Add Task
              </Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Pending Tasks */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-foreground">Pending Tasks</h3>
        <div className="space-y-3">
          {pendingTasks.map((task) => {
            const IconComponent = getCategoryIcon(task.category);
            const isOverdue = new Date(task.dueDate) < new Date();
            
            return (
              <Card key={task.id} className={`shadow-card hover:shadow-farm transition-shadow ${isOverdue ? 'border-destructive' : ''}`}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <Checkbox
                        checked={task.completed}
                        onCheckedChange={() => toggleTaskComplete(task.id)}
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <IconComponent className="w-4 h-4 text-grape" />
                          <h4 className="font-semibold text-foreground">{task.title}</h4>
                          <Badge className={getPriorityColor(task.priority)}>
                            {task.priority}
                          </Badge>
                          {isOverdue && (
                            <Badge variant="destructive">Overdue</Badge>
                          )}
                        </div>
                        {task.description && (
                          <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
                        )}
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                          <span>Category: {task.category.replace('-', ' ')}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-4 text-foreground">Completed Tasks</h3>
          <div className="space-y-3">
            {completedTasks.map((task) => {
              const IconComponent = getCategoryIcon(task.category);
              
              return (
                <Card key={task.id} className="shadow-card opacity-75">
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        checked={task.completed}
                        onCheckedChange={() => toggleTaskComplete(task.id)}
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <IconComponent className="w-4 h-4 text-forest" />
                          <h4 className="font-semibold text-foreground line-through">{task.title}</h4>
                          <Badge className="bg-forest text-white">Completed</Badge>
                        </div>
                        {task.description && (
                          <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
                        )}
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>Completed: {new Date(task.dueDate).toLocaleDateString()}</span>
                          <span>Category: {task.category.replace('-', ' ')}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};