import { useState, useEffect } from 'react';
import React from 'react';
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider, SidebarTrigger, SidebarInset } from './components/ui/sidebar';
import { TooltipProvider } from './components/ui/tooltip';
import { Card } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Button } from './components/ui/button';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from './components/ui/command';
import { 
  LayoutDashboard, 
  Users, 
  Database, 
  FileText, 
  Settings,
  Activity,
  Heart,
  Leaf,
  Sun,
  Moon,
  Bell,
  Search,
  Calendar,
  Stethoscope,
  Brain,
  Shield,
  Zap,
  Sparkles,
  BookOpen,
  Flower2,
  Apple,
  Utensils,
  TrendingUp,
  Clock,
  CheckCircle
} from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { PatientManagement } from './components/PatientManagement';
import { FoodDatabase } from './components/FoodDatabase';
import { DietChartGenerator } from './components/DietChartGenerator';
import { AyurvedicGlossary } from './components/AyurvedicGlossary';
import { AyurvedicChatbot } from './components/AyurvedicChatbot';
import { ImageWithFallback } from './components/figma/ImageWithFallback';

type ActiveView = 'dashboard' | 'patients' | 'food-database' | 'diet-generator' | 'glossary' | 'settings';

const navigation = [
  {
    id: 'dashboard' as ActiveView,
    name: 'Dashboard',
    icon: LayoutDashboard,
    description: 'Overview and analytics',
    color: 'text-blue-600'
  },
  {
    id: 'patients' as ActiveView,
    name: 'Patient Management',
    icon: Users,
    description: 'Manage patient profiles',
    color: 'text-green-600'
  },
  {
    id: 'food-database' as ActiveView,
    name: 'Food Database',
    icon: Database,
    description: '8,000+ food items',
    color: 'text-purple-600'
  },
  {
    id: 'diet-generator' as ActiveView,
    name: 'Diet Chart Generator',
    icon: FileText,
    description: 'Create personalized plans',
    color: 'text-orange-600'
  },
  {
    id: 'glossary' as ActiveView,
    name: 'Ayurvedic Glossary',
    icon: BookOpen,
    description: 'Terms & concepts',
    color: 'text-indigo-600'
  },
  {
    id: 'settings' as ActiveView,
    name: 'Settings',
    icon: Settings,
    description: 'Application settings',
    color: 'text-gray-600'
  }
];

function AppSidebar({ activeView, setActiveView }: { activeView: ActiveView, setActiveView: (view: ActiveView) => void }) {
  return (
    <Sidebar className="border-r">
      <SidebarHeader className="border-b px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg overflow-hidden relative shadow-md">
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1577229940083-869a39a5d362?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxheXVydmVkYSUyMGxvdHVzJTIwbWVkaXRhdGlvbiUyMHNwaXJpdHVhbCUyMHdlbGxuZXNzfGVufDF8fHx8MTc1OTEzODM5MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Ayurvedic lotus symbol"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-green-500/20 to-purple-500/20"></div>
            <Flower2 className="w-5 h-5 text-white absolute inset-0 m-auto drop-shadow-sm" />
          </div>
          <div>
            <h2 className="text-xl font-medium flex items-center gap-2 text-foreground">
              AyurNutri Pro
              <span className="text-xs bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full font-medium shadow-sm">✨ AYURVEDA</span>
            </h2>
            <p className="text-sm text-muted-foreground font-medium">Holistic Nutrition & Wellness</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="flex flex-col">
        <div className="flex-1 overflow-y-auto">
          <SidebarMenu className="px-2 py-4">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    asChild
                    className={`w-full justify-start px-4 py-3 text-left hover:bg-sidebar-accent transition-all duration-200 cursor-pointer rounded-lg mb-1 ${
                      isActive ? 'bg-sidebar-accent border-l-4 border-l-primary shadow-sm' : ''
                    }`}
                  >
                    <button onClick={() => setActiveView(item.id)} className="flex items-center w-full">
                      <div className={`p-2 rounded-lg mr-3 transition-all duration-200 ${
                        isActive ? 'bg-primary/15 shadow-md' : 'bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}>
                        <Icon className={`w-5 h-5 ${isActive ? item.color : 'text-muted-foreground'}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`font-medium text-sm ${isActive ? 'text-foreground' : 'text-sidebar-foreground'}`}>{item.name}</p>
                      </div>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </div>
        
        {/* Sidebar Footer */}
        <div className="p-4 space-y-3 border-t border-sidebar-border mt-auto">
          <Card className="p-4 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-green-900/20 dark:via-blue-900/20 dark:to-purple-900/20 border-0 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Heart className="w-7 h-7 text-green-600" />
                <Brain className="w-4 h-4 text-blue-600 absolute -top-1 -right-1 bg-white dark:bg-gray-900 rounded-full p-0.5" />
              </div>
              <div>
                <p className="font-semibold text-green-800 dark:text-green-300 text-sm">Holistic Wellness</p>
                <p className="text-xs text-green-700 dark:text-green-400">Mind, body & spirit</p>
              </div>
            </div>
          </Card>
          
          <div className="flex items-center justify-between text-xs text-muted-foreground font-medium">
            <div className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-blue-500" />
              <span>HIPAA</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-yellow-500" />
              <span>AI Powered</span>
            </div>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}

function SettingsView({ isDarkMode, toggleDarkMode }: { isDarkMode: boolean, toggleDarkMode: () => void }) {
  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto">
        <p className="text-lg text-muted-foreground">
          Customize your AyurNutri Pro experience to match your preferences and workflow requirements.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-8 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Activity className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold">Profile Settings</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 via-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white relative">
                <Stethoscope className="w-8 h-8" />
                <Badge className="absolute -top-2 -right-2 h-6 w-6 p-0 text-xs">MD</Badge>
              </div>
              <div>
                <p className="font-medium">Dr. Ayurvedic Practitioner</p>
                <p className="text-sm text-muted-foreground">Certified Ayurvedic Dietitian</p>
                <div className="flex gap-2 mt-2">
                  <Badge variant="outline" className="text-xs">Professional</Badge>
                  <Badge variant="outline" className="text-xs">Verified</Badge>
                </div>
              </div>
            </div>
          </div>
        </Card>
        
        <Card className="p-8 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
              <Sun className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="text-xl font-semibold">Appearance</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {isDarkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                <span>Dark Mode</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={toggleDarkMode}
                className="h-8"
              >
                {isDarkMode ? 'Disable' : 'Enable'}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Switch between light and dark themes for better comfort during different times of day.
            </p>
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-8 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Database className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold">System Information</h3>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground flex items-center gap-2">
                <Zap className="w-3 h-3" />
                Version:
              </span>
              <Badge variant="outline">1.0.0</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground flex items-center gap-2">
                <Database className="w-3 h-3" />
                Database:
              </span>
              <span>8,247 food items</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground flex items-center gap-2">
                <Calendar className="w-3 h-3" />
                Last Updated:
              </span>
              <span>{new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground flex items-center gap-2">
                <Shield className="w-3 h-3" />
                Security:
              </span>
              <Badge variant="outline" className="text-green-600 border-green-200">Secured</Badge>
            </div>
          </div>
        </Card>
        
        <Card className="p-8 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
              <Bell className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold">Notifications</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Patient Updates</span>
              <Badge variant="outline" className="text-xs">Enabled</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Diet Plan Reminders</span>
              <Badge variant="outline" className="text-xs">Enabled</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">System Updates</span>
              <Badge variant="outline" className="text-xs">Enabled</Badge>
            </div>
          </div>
        </Card>
      </div>
      
      <Card className="p-8 hover:shadow-lg transition-shadow">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <Shield className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold">Data & Privacy</h3>
        </div>
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-blue-600" />
              <h4 className="font-medium text-blue-800 dark:text-blue-300">HIPAA Compliance</h4>
            </div>
            <p className="text-sm text-blue-700 dark:text-blue-400">
              This application is designed to support HIPAA compliance for patient data protection. 
              Ensure proper access controls and data encryption are in place.
            </p>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-green-600" />
              <h4 className="font-medium text-green-800 dark:text-green-300">Secure Data Storage</h4>
            </div>
            <p className="text-sm text-green-700 dark:text-green-400">
              Patient information and medical data are protected with enterprise-grade security measures.
            </p>
          </div>
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
            <div className="flex items-center gap-2 mb-2">
              <Brain className="w-4 h-4 text-purple-600" />
              <h4 className="font-medium text-purple-800 dark:text-purple-300">AI-Enhanced Analytics</h4>
            </div>
            <p className="text-sm text-purple-700 dark:text-purple-400">
              Advanced algorithms help generate personalized diet recommendations based on Ayurvedic principles.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

// Mock data for search
const mockPatients = [
  { name: 'Priya Sharma', condition: 'Weight Management', section: 'patients' as ActiveView },
  { name: 'Rajesh Kumar', condition: 'Diabetes Management', section: 'patients' as ActiveView },
  { name: 'Anita Patel', condition: 'Digestive Issues', section: 'patients' as ActiveView },
  { name: 'Vikram Singh', condition: 'Hypertension', section: 'patients' as ActiveView },
  { name: 'Meera Joshi', condition: 'Weight Management', section: 'patients' as ActiveView },
  { name: 'Arjun Reddy', condition: 'Diabetes Control', section: 'patients' as ActiveView },
];

const mockFoods = [
  { name: 'Brown Rice', category: 'Grains', section: 'food-database' as ActiveView },
  { name: 'Quinoa', category: 'Grains', section: 'food-database' as ActiveView },
  { name: 'Chickpeas', category: 'Legumes', section: 'food-database' as ActiveView },
  { name: 'Lentils', category: 'Legumes', section: 'food-database' as ActiveView },
  { name: 'Spinach', category: 'Vegetables', section: 'food-database' as ActiveView },
  { name: 'Sweet Potato', category: 'Vegetables', section: 'food-database' as ActiveView },
  { name: 'Almonds', category: 'Nuts', section: 'food-database' as ActiveView },
  { name: 'Walnuts', category: 'Nuts', section: 'food-database' as ActiveView },
  { name: 'Turmeric', category: 'Spices', section: 'food-database' as ActiveView },
  { name: 'Ginger', category: 'Spices', section: 'food-database' as ActiveView },
  { name: 'Cumin', category: 'Spices', section: 'food-database' as ActiveView },
  { name: 'Mango', category: 'Fruits', section: 'food-database' as ActiveView },
  { name: 'Papaya', category: 'Fruits', section: 'food-database' as ActiveView },
  { name: 'Ghee', category: 'Oils', section: 'food-database' as ActiveView },
];

const mockRecipes = [
  { name: 'Kitchari - Cleansing Bowl', type: 'Detox Recipe', section: 'diet-generator' as ActiveView },
  { name: 'Ayurvedic Golden Milk', type: 'Beverage', section: 'diet-generator' as ActiveView },
  { name: 'Vata Balancing Breakfast', type: 'Morning Meal', section: 'diet-generator' as ActiveView },
  { name: 'Pitta Cooling Salad', type: 'Lunch', section: 'diet-generator' as ActiveView },
  { name: 'Kapha Energizing Soup', type: 'Dinner', section: 'diet-generator' as ActiveView },
  { name: 'Digestive Spice Mix', type: 'Supplement', section: 'diet-generator' as ActiveView },
];

export default function App() {
  const [activeView, setActiveView] = useState<ActiveView>('dashboard');
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('darkMode');
      return saved ? JSON.parse(saved) : false;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [isDarkMode]);

  // Keyboard shortcut for search (Cmd+K / Ctrl+K)
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleNavigateFromDashboard = (view: 'patients' | 'food-database' | 'diet-generator') => {
    setActiveView(view);
  };

  const handleSearchSelect = (section: ActiveView) => {
    setActiveView(section);
    setSearchOpen(false);
    setSearchQuery('');
  };

  // Filter search results
  const filteredPatients = mockPatients.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.condition.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredFoods = mockFoods.filter(f => 
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredRecipes = mockRecipes.filter(r => 
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderActiveView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigateFromDashboard} />;
      case 'patients':
        return <PatientManagement />;
      case 'food-database':
        return <FoodDatabase />;
      case 'diet-generator':
        return <DietChartGenerator />;
      case 'glossary':
        return <AyurvedicGlossary />;
      case 'settings':
        return <SettingsView isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />;
      default:
        return <Dashboard onNavigate={handleNavigateFromDashboard} />;
    }
  };

  return (
    <TooltipProvider>
      <SidebarProvider>
        <div className="flex h-screen w-full">
        <AppSidebar activeView={activeView} setActiveView={setActiveView} />
        <SidebarInset className="flex-1">
          <header className="sticky top-0 z-10 flex h-20 items-center gap-4 border-b bg-background/95 backdrop-blur-md px-6 shadow-sm">
            <SidebarTrigger className="h-10 w-10" />
            
            <div className="flex items-center gap-4 flex-1">
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-3 bg-muted/50 rounded-lg px-4 py-2 hover:bg-muted/70 transition-all duration-200 cursor-pointer hover:shadow-sm w-full max-w-md group"
              >
                <Search className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                <span className="text-sm text-muted-foreground group-hover:text-foreground hidden sm:inline font-medium transition-colors">
                  Quick search for patients, foods, recipes...
                </span>
                <Badge variant="outline" className="ml-auto hidden lg:flex text-xs px-2 py-0.5">
                  <span className="mr-1">⌘</span>K
                </Badge>
              </button>
            </div>
            
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleDarkMode}
                className="h-10 w-10 p-0 hover:bg-muted rounded-lg"
                title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
              
              <Button variant="ghost" size="sm" className="h-10 w-10 p-0 relative hover:bg-muted rounded-lg" title="Notifications">
                <Bell className="w-5 h-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              </Button>
              
              <Badge variant="outline" className="hidden sm:flex items-center gap-2 px-3 py-2 bg-primary/5 border-primary/20">
                <Database className="w-4 h-4 text-primary" />
                <span className="font-medium">8,247 Foods</span>
              </Badge>
              
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 rounded-full flex items-center justify-center relative shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                <Flower2 className="w-5 h-5 text-white" />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-background animate-pulse flex items-center justify-center">
                  <div className="w-2 h-2 bg-green-700 rounded-full"></div>
                </div>
              </div>
            </div>
          </header>
          
          <main className="flex-1 overflow-auto bg-background">
            <div className="p-8 max-w-7xl mx-auto">
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  {navigation.find(nav => nav.id === activeView) && (
                    <>
                      <div className="p-2 bg-primary/10 rounded-lg">
                        {React.createElement(navigation.find(nav => nav.id === activeView)!.icon, { 
                          className: `w-6 h-6 ${navigation.find(nav => nav.id === activeView)!.color}` 
                        })}
                      </div>
                      <div>
                        <h1 className="text-2xl font-semibold text-foreground">
                          {navigation.find(nav => nav.id === activeView)!.name}
                        </h1>
                        <p className="text-muted-foreground">
                          {navigation.find(nav => nav.id === activeView)!.description}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
              {renderActiveView()}
            </div>
          </main>
        </SidebarInset>
        
        {/* Ayurvedic Chatbot */}
        <AyurvedicChatbot />

        {/* Global Search Dialog */}
        <CommandDialog open={searchOpen} onOpenChange={setSearchOpen}>
          <div className="border-b px-4 py-3 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20">
            <div className="flex items-center gap-2">
              <Search className="w-5 h-5 text-primary" />
              <h3 className="font-semibold flex items-center gap-2">
                Quick Search
                <Badge variant="secondary" className="text-xs">
                  <Sparkles className="w-3 h-3 mr-1" />
                  AI-Powered
                </Badge>
              </h3>
            </div>
          </div>
          <CommandInput 
            placeholder="Search patients, foods, recipes, and more..." 
            value={searchQuery}
            onValueChange={setSearchQuery}
            className="h-14 text-base"
          />
          <CommandList className="max-h-96">
            <CommandEmpty>
              <div className="py-8 text-center">
                <Database className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                <p className="text-muted-foreground">No results found.</p>
                <p className="text-sm text-muted-foreground mt-1">Try searching for patients, foods, or recipes</p>
              </div>
            </CommandEmpty>

            {/* Navigation Shortcuts */}
            {searchQuery === '' && (
              <>
                <CommandGroup heading="Quick Navigation">
                  {navigation.map((item) => {
                    const Icon = item.icon;
                    return (
                      <CommandItem
                        key={item.id}
                        onSelect={() => handleSearchSelect(item.id)}
                        className="flex items-center gap-3 px-4 py-3 cursor-pointer"
                      >
                        <div className={`p-2 rounded-lg bg-gray-50 dark:bg-gray-800`}>
                          <Icon className={`w-4 h-4 ${item.color}`} />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{item.description}</p>
                        </div>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
                <CommandSeparator />
              </>
            )}

            {/* Patients Results */}
            {filteredPatients.length > 0 && (
              <>
                <CommandGroup heading="Patients">
                  {filteredPatients.slice(0, 5).map((patient, index) => (
                    <CommandItem
                      key={index}
                      onSelect={() => handleSearchSelect(patient.section)}
                      className="flex items-center gap-3 px-4 py-3 cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-medium">
                        {patient.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{patient.name}</p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Heart className="w-3 h-3" />
                          {patient.condition}
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        <Users className="w-3 h-3 mr-1" />
                        Patient
                      </Badge>
                    </CommandItem>
                  ))}
                </CommandGroup>
                <CommandSeparator />
              </>
            )}

            {/* Food Items Results */}
            {filteredFoods.length > 0 && (
              <>
                <CommandGroup heading="Food Database">
                  {filteredFoods.slice(0, 6).map((food, index) => (
                    <CommandItem
                      key={index}
                      onSelect={() => handleSearchSelect(food.section)}
                      className="flex items-center gap-3 px-4 py-3 cursor-pointer"
                    >
                      <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
                        <Apple className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{food.name}</p>
                        <p className="text-xs text-muted-foreground">{food.category}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        <Database className="w-3 h-3 mr-1" />
                        Food
                      </Badge>
                    </CommandItem>
                  ))}
                </CommandGroup>
                <CommandSeparator />
              </>
            )}

            {/* Recipes Results */}
            {filteredRecipes.length > 0 && (
              <>
                <CommandGroup heading="Recipes & Diet Plans">
                  {filteredRecipes.slice(0, 5).map((recipe, index) => (
                    <CommandItem
                      key={index}
                      onSelect={() => handleSearchSelect(recipe.section)}
                      className="flex items-center gap-3 px-4 py-3 cursor-pointer"
                    >
                      <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/30">
                        <Utensils className="w-5 h-5 text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{recipe.name}</p>
                        <p className="text-xs text-muted-foreground">{recipe.type}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        <FileText className="w-3 h-3 mr-1" />
                        Recipe
                      </Badge>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}
          </CommandList>
          <div className="border-t px-4 py-2 bg-muted/30">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-background border rounded text-xs">↑↓</kbd>
                <span>Navigate</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-background border rounded text-xs">↵</kbd>
                <span>Select</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-background border rounded text-xs">ESC</kbd>
                <span>Close</span>
              </div>
            </div>
          </div>
        </CommandDialog>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  );
}