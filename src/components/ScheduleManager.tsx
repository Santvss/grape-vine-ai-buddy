import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Plus, 
  Droplets,
  Sparkles,
  Clock,
  MapPin
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Plot {
  id: string;
  name: string;
  variety: string;
  winterPruningDate?: string;
  summerPruningDate?: string;
}

interface Schedule {
  id: string;
  plotId: string;
  type: 'spraying' | 'tasks' | 'fertigation';
  title: string;
  daysFromPruning: number;
  pruningType: 'winter' | 'summer';
  description: string;
}

export const ScheduleManager = () => {
  const { toast } = useToast();
  
  // Mock plots data - in real app, this would come from PlotManager
  const [plots] = useState<Plot[]>([
    {
      id: '1',
      name: 'North Vineyard',
      variety: 'Cabernet Sauvignon',
      winterPruningDate: '2024-01-15',
      summerPruningDate: '2024-06-15'
    },
    {
      id: '2',
      name: 'South Plot',
      variety: 'Chardonnay',
      winterPruningDate: '2024-01-20',
      summerPruningDate: '2024-06-20'
    }
  ]);

  const [schedules, setSchedules] = useState<Schedule[]>([
    {
      id: '1',
      plotId: '1',
      type: 'spraying',
      title: 'Fungicide Application',
      daysFromPruning: 30,
      pruningType: 'winter',
      description: 'Apply copper-based fungicide'
    }
  ]);

  const [selectedPlot, setSelectedPlot] = useState<string>('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSchedule, setNewSchedule] = useState({
    type: 'spraying' as Schedule['type'],
    title: '',
    daysFromPruning: '',
    pruningType: 'winter' as Schedule['pruningType'],
    description: ''
  });

  const handleAddSchedule = () => {
    if (!selectedPlot || !newSchedule.title || !newSchedule.daysFromPruning) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const schedule: Schedule = {
      id: Date.now().toString(),
      plotId: selectedPlot,
      type: newSchedule.type,
      title: newSchedule.title,
      daysFromPruning: parseInt(newSchedule.daysFromPruning),
      pruningType: newSchedule.pruningType,
      description: newSchedule.description
    };

    setSchedules([...schedules, schedule]);
    setNewSchedule({
      type: 'spraying',
      title: '',
      daysFromPruning: '',
      pruningType: 'winter',
      description: ''
    });
    setShowAddForm(false);
    
    toast({
      title: "Schedule Added",
      description: `${schedule.title} has been scheduled successfully.`,
    });
  };

  const getScheduleIcon = (type: Schedule['type']) => {
    switch (type) {
      case 'spraying': return <Sparkles className="w-4 h-4" />;
      case 'fertigation': return <Droplets className="w-4 h-4" />;
      case 'tasks': return <Clock className="w-4 h-4" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };

  const getScheduleColor = (type: Schedule['type']) => {
    switch (type) {
      case 'spraying': return 'bg-harvest text-foreground';
      case 'fertigation': return 'bg-sky text-foreground';
      case 'tasks': return 'bg-forest text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const calculateScheduleDate = (plotId: string, daysFromPruning: number, pruningType: 'winter' | 'summer') => {
    const plot = plots.find(p => p.id === plotId);
    if (!plot) return null;
    
    const pruningDate = pruningType === 'winter' ? plot.winterPruningDate : plot.summerPruningDate;
    if (!pruningDate) return null;
    
    const date = new Date(pruningDate);
    date.setDate(date.getDate() + daysFromPruning);
    return date.toLocaleDateString();
  };

  const filteredSchedules = selectedPlot 
    ? schedules.filter(s => s.plotId === selectedPlot)
    : schedules;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Schedule Management</h2>
          <p className="text-muted-foreground">Plan your vineyard activities based on pruning dates</p>
        </div>
        <Button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-gradient-primary hover:opacity-90"
          disabled={!selectedPlot}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Schedule
        </Button>
      </div>

      {/* Plot Selection */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-grape" />
            <span>Select Plot</span>
          </CardTitle>
          <CardDescription>Choose a plot to view and manage its schedules</CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={selectedPlot} onValueChange={setSelectedPlot}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a plot..." />
            </SelectTrigger>
            <SelectContent>
              {plots.map((plot) => (
                <SelectItem key={plot.id} value={plot.id}>
                  {plot.name} - {plot.variety}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Add Schedule Form */}
      {showAddForm && selectedPlot && (
        <Card className="shadow-farm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Plus className="w-5 h-5 text-primary" />
              <span>Add New Schedule</span>
            </CardTitle>
            <CardDescription>Create a schedule based on pruning dates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Schedule Type *</Label>
                <Select value={newSchedule.type} onValueChange={(value) => setNewSchedule({...newSchedule, type: value as Schedule['type']})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="spraying">Spraying Schedule</SelectItem>
                    <SelectItem value="fertigation">Drip & Fertigation</SelectItem>
                    <SelectItem value="tasks">Tasks Schedule</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="pruningType">Pruning Type *</Label>
                <Select value={newSchedule.pruningType} onValueChange={(value) => setNewSchedule({...newSchedule, pruningType: value as Schedule['pruningType']})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="winter">Winter Pruning</SelectItem>
                    <SelectItem value="summer">Summer Pruning</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Activity Title *</Label>
                <Input
                  id="title"
                  value={newSchedule.title}
                  onChange={(e) => setNewSchedule({...newSchedule, title: e.target.value})}
                  placeholder="e.g., Fungicide Application"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="daysFromPruning">Days from Pruning *</Label>
                <Input
                  id="daysFromPruning"
                  type="number"
                  value={newSchedule.daysFromPruning}
                  onChange={(e) => setNewSchedule({...newSchedule, daysFromPruning: e.target.value})}
                  placeholder="e.g., 30"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={newSchedule.description}
                onChange={(e) => setNewSchedule({...newSchedule, description: e.target.value})}
                placeholder="Additional details about this activity..."
              />
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleAddSchedule} className="bg-gradient-primary">
                <Plus className="w-4 h-4 mr-2" />
                Add Schedule
              </Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Schedules List */}
      {selectedPlot && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">
            Schedules for {plots.find(p => p.id === selectedPlot)?.name}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSchedules.map((schedule) => (
              <Card key={schedule.id} className="shadow-card hover:shadow-farm transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2 text-sm">
                      {getScheduleIcon(schedule.type)}
                      <span>{schedule.title}</span>
                    </CardTitle>
                    <Badge className={getScheduleColor(schedule.type)}>
                      {schedule.type}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Pruning:</span>
                      <span className="font-medium capitalize">{schedule.pruningType}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Days after:</span>
                      <span className="font-medium">{schedule.daysFromPruning} days</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Scheduled date:</span>
                      <span className="font-medium text-grape">
                        {calculateScheduleDate(schedule.plotId, schedule.daysFromPruning, schedule.pruningType) || 'Not set'}
                      </span>
                    </div>
                  </div>
                  {schedule.description && (
                    <div className="pt-2 border-t">
                      <p className="text-sm text-muted-foreground">{schedule.description}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredSchedules.length === 0 && (
            <Card className="shadow-card text-center py-8">
              <CardContent>
                <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <h3 className="text-lg font-semibold mb-2">No Schedules Yet</h3>
                <p className="text-muted-foreground mb-4">Start by adding your first schedule for this plot</p>
                <Button onClick={() => setShowAddForm(true)} className="bg-gradient-primary">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Schedule
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {!selectedPlot && (
        <Card className="shadow-card text-center py-12">
          <CardContent>
            <MapPin className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Select a Plot</h3>
            <p className="text-muted-foreground">Choose a plot above to view and manage its schedules</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};