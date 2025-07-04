import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Grape, 
  Calendar, 
  CloudSun, 
  Bot, 
  Plus,
  MapPin,
  Droplets,
  Thermometer,
  Wind
} from "lucide-react";
import { PlotManager } from "@/components/PlotManager";
import { TaskManager } from "@/components/TaskManager";
import { WeatherWidget } from "@/components/WeatherWidget";
import { AIAssistant } from "@/components/AIAssistant";
import heroImage from "@/assets/vineyard-hero.jpg";

type ViewType = 'dashboard' | 'plots' | 'tasks' | 'weather' | 'assistant';

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');

  const renderContent = () => {
    switch (currentView) {
      case 'plots':
        return <PlotManager />;
      case 'tasks':
        return <TaskManager />;
      case 'weather':
        return <WeatherWidget />;
      case 'assistant':
        return <AIAssistant />;
      default:
        return <Dashboard setCurrentView={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-earth">
      {/* Navigation Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b shadow-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Grape className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">VineManager</h1>
                <p className="text-sm text-muted-foreground">Grape Farm Management</p>
              </div>
            </div>
          </div>
          
          {/* Navigation Tabs */}
          <nav className="flex space-x-2 mt-4 overflow-x-auto">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: Grape },
              { id: 'plots', label: 'Plots', icon: MapPin },
              { id: 'tasks', label: 'Tasks', icon: Calendar },
              { id: 'weather', label: 'Weather', icon: CloudSun },
              { id: 'assistant', label: 'AI Assistant', icon: Bot },
            ].map(({ id, label, icon: Icon }) => (
              <Button
                key={id}
                variant={currentView === id ? "default" : "ghost"}
                onClick={() => setCurrentView(id as ViewType)}
                className="flex items-center space-x-2 whitespace-nowrap"
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </Button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {renderContent()}
      </main>
    </div>
  );
};

const Dashboard = ({ setCurrentView }: { setCurrentView: (view: ViewType) => void }) => {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative rounded-xl overflow-hidden shadow-farm">
        <div 
          className="h-48 md:h-64 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/60" />
          <div className="relative h-full flex items-center justify-center text-center">
            <div className="text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Welcome to Your Vineyard</h2>
              <p className="text-lg opacity-90">Manage your grape cultivation with precision</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-card hover:shadow-farm transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Plots</CardTitle>
            <MapPin className="h-4 w-4 text-grape" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-grape">3</div>
            <p className="text-xs text-muted-foreground">Active vineyard plots</p>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-farm transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
            <Calendar className="h-4 w-4 text-forest" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-forest">8</div>
            <p className="text-xs text-muted-foreground">Tasks due this week</p>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-farm transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weather</CardTitle>
            <Thermometer className="h-4 w-4 text-harvest" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-harvest">22°C</div>
            <p className="text-xs text-muted-foreground">Perfect growing conditions</p>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-farm transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Harvest Status</CardTitle>
            <Grape className="h-4 w-4 text-grape-light" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-grape-light">85%</div>
            <p className="text-xs text-muted-foreground">Maturity achieved</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Plus className="w-5 h-5 text-primary" />
              <span>Quick Actions</span>
            </CardTitle>
            <CardDescription>Common vineyard management tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              onClick={() => setCurrentView('plots')} 
              className="w-full justify-start" 
              variant="outline"
            >
              <MapPin className="w-4 h-4 mr-2" />
              Add New Plot
            </Button>
            <Button 
              onClick={() => setCurrentView('tasks')} 
              className="w-full justify-start" 
              variant="outline"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Create Task
            </Button>
            <Button 
              onClick={() => setCurrentView('weather')} 
              className="w-full justify-start" 
              variant="outline"
            >
              <CloudSun className="w-4 h-4 mr-2" />
              Check Weather
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates from your vineyard</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-forest rounded-full" />
              <div className="flex-1">
                <p className="text-sm">Irrigation completed - North Plot</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-harvest rounded-full" />
              <div className="flex-1">
                <p className="text-sm">Soil moisture monitored</p>
                <p className="text-xs text-muted-foreground">6 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-grape rounded-full" />
              <div className="flex-1">
                <p className="text-sm">Pruning scheduled for tomorrow</p>
                <p className="text-xs text-muted-foreground">1 day ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;