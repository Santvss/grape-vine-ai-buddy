import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Plus, 
  Edit2,
  Trash2,
  Grape,
  Calendar,
  BarChart3
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Plot {
  id: string;
  name: string;
  area: number;
  variety: string;
  plantingDate: string;
  location: string;
  notes: string;
  status: 'active' | 'dormant' | 'harvesting';
}

export const PlotManager = () => {
  const { toast } = useToast();
  const [plots, setPlots] = useState<Plot[]>([
    {
      id: '1',
      name: 'North Vineyard',
      area: 2.5,
      variety: 'Cabernet Sauvignon',
      plantingDate: '2020-03-15',
      location: 'North Field',
      notes: 'Premium grape variety, excellent drainage',
      status: 'active'
    },
    {
      id: '2',
      name: 'South Plot',
      area: 1.8,
      variety: 'Chardonnay',
      plantingDate: '2019-04-10',
      location: 'South Field',
      notes: 'White grape variety, morning sun exposure',
      status: 'active'
    },
    {
      id: '3',
      name: 'East Garden',
      area: 3.2,
      variety: 'Pinot Noir',
      plantingDate: '2021-02-20',
      location: 'East Field',
      notes: 'Young vines, requires careful monitoring',
      status: 'dormant'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newPlot, setNewPlot] = useState({
    name: '',
    area: '',
    variety: '',
    plantingDate: '',
    location: '',
    notes: ''
  });

  const handleAddPlot = () => {
    if (!newPlot.name || !newPlot.area || !newPlot.variety) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const plot: Plot = {
      id: Date.now().toString(),
      name: newPlot.name,
      area: parseFloat(newPlot.area),
      variety: newPlot.variety,
      plantingDate: newPlot.plantingDate,
      location: newPlot.location,
      notes: newPlot.notes,
      status: 'active'
    };

    setPlots([...plots, plot]);
    setNewPlot({
      name: '',
      area: '',
      variety: '',
      plantingDate: '',
      location: '',
      notes: ''
    });
    setShowAddForm(false);
    
    toast({
      title: "Plot Added",
      description: `${plot.name} has been added successfully.`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-forest text-white';
      case 'dormant': return 'bg-earth text-white';
      case 'harvesting': return 'bg-harvest text-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Plot Management</h2>
          <p className="text-muted-foreground">Manage your vineyard plots and grape varieties</p>
        </div>
        <Button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-gradient-primary hover:opacity-90"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Plot
        </Button>
      </div>

      {/* Add Plot Form */}
      {showAddForm && (
        <Card className="shadow-farm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Plus className="w-5 h-5 text-primary" />
              <span>Add New Plot</span>
            </CardTitle>
            <CardDescription>Create a new vineyard plot entry</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Plot Name *</Label>
                <Input
                  id="name"
                  value={newPlot.name}
                  onChange={(e) => setNewPlot({...newPlot, name: e.target.value})}
                  placeholder="e.g., North Vineyard"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="area">Area (hectares) *</Label>
                <Input
                  id="area"
                  type="number"
                  step="0.1"
                  value={newPlot.area}
                  onChange={(e) => setNewPlot({...newPlot, area: e.target.value})}
                  placeholder="e.g., 2.5"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="variety">Grape Variety *</Label>
                <Input
                  id="variety"
                  value={newPlot.variety}
                  onChange={(e) => setNewPlot({...newPlot, variety: e.target.value})}
                  placeholder="e.g., Cabernet Sauvignon"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="plantingDate">Planting Date</Label>
                <Input
                  id="plantingDate"
                  type="date"
                  value={newPlot.plantingDate}
                  onChange={(e) => setNewPlot({...newPlot, plantingDate: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={newPlot.location}
                  onChange={(e) => setNewPlot({...newPlot, location: e.target.value})}
                  placeholder="e.g., North Field"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={newPlot.notes}
                onChange={(e) => setNewPlot({...newPlot, notes: e.target.value})}
                placeholder="Additional notes about this plot..."
                rows={3}
              />
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleAddPlot} className="bg-gradient-primary">
                <Plus className="w-4 h-4 mr-2" />
                Add Plot
              </Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Plots Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plots.map((plot) => (
          <Card key={plot.id} className="shadow-card hover:shadow-farm transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Grape className="w-5 h-5 text-grape" />
                  <span>{plot.name}</span>
                </CardTitle>
                <Badge className={getStatusColor(plot.status)}>
                  {plot.status}
                </Badge>
              </div>
              <div className="flex items-center space-x-1 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{plot.location || 'Location not set'}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Variety:</span>
                  <span className="text-sm font-medium text-grape">{plot.variety}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Area:</span>
                  <span className="text-sm font-medium">{plot.area} ha</span>
                </div>
                {plot.plantingDate && (
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Planted:</span>
                    <span className="text-sm font-medium">
                      {new Date(plot.plantingDate).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
              
              {plot.notes && (
                <div className="pt-2 border-t">
                  <p className="text-sm text-muted-foreground">{plot.notes}</p>
                </div>
              )}

              <div className="flex space-x-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit2 className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <BarChart3 className="w-4 h-4 mr-1" />
                  Stats
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {plots.length === 0 && (
        <Card className="shadow-card text-center py-12">
          <CardContent>
            <Grape className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Plots Yet</h3>
            <p className="text-muted-foreground mb-4">Start by adding your first vineyard plot</p>
            <Button onClick={() => setShowAddForm(true)} className="bg-gradient-primary">
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Plot
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};