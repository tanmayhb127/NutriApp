import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { 
  Users, 
  Database, 
  FileText, 
  TrendingUp, 
  Calendar,
  Activity,
  Heart,
  Clock,
  Zap,
  Target,
  Star,
  CheckCircle,
  AlertCircle,
  Plus,
  Eye,
  Brain,
  Shield,
  Sparkles,
  Search,
  X
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { AyurvedicText } from './AyurvedicTooltip';

interface DashboardProps {
  onNavigate?: (view: 'patients' | 'food-database' | 'diet-generator') => void;
}

const stats = [
  {
    title: 'Total Patients',
    value: '248',
    change: '+12%',
    trend: 'up',
    icon: Users,
    color: 'text-blue-600'
  },
  {
    title: 'Active Diet Plans',
    value: '156',
    change: '+8%',
    trend: 'up',
    icon: FileText,
    color: 'text-green-600'
  },
  {
    title: 'Food Database Items',
    value: '8,247',
    change: '+45',
    trend: 'up',
    icon: Database,
    color: 'text-purple-600'
  },
  {
    title: 'Consultations Today',
    value: '23',
    change: '+5%',
    trend: 'up',
    icon: Activity,
    color: 'text-orange-600'
  }
];

const recentPatients = [
  {
    name: 'Priya Sharma',
    age: 32,
    gender: 'Female',
    condition: 'Weight Management',
    lastVisit: '2 days ago',
    status: 'Active'
  },
  {
    name: 'Rajesh Kumar',
    age: 45,
    gender: 'Male',
    condition: 'Diabetes Management',
    lastVisit: '1 week ago',
    status: 'Active'
  },
  {
    name: 'Anita Patel',
    age: 28,
    gender: 'Female',
    condition: 'Digestive Issues',
    lastVisit: '3 days ago',
    status: 'Completed'
  },
  {
    name: 'Vikram Singh',
    age: 38,
    gender: 'Male',
    condition: 'Hypertension',
    lastVisit: '5 days ago',
    status: 'Active'
  }
];

const upcomingAppointments = [
  {
    time: '10:00 AM',
    patient: 'Meera Joshi',
    type: 'Follow-up',
    duration: '30 min'
  },
  {
    time: '11:30 AM',
    patient: 'Arjun Reddy',
    type: 'New Consultation',
    duration: '45 min'
  },
  {
    time: '2:00 PM',
    patient: 'Kavitha Nair',
    type: 'Diet Review',
    duration: '30 min'
  },
  {
    time: '3:30 PM',
    patient: 'Rohit Gupta',
    type: 'Progress Check',
    duration: '20 min'
  }
];

export function Dashboard({ onNavigate }: DashboardProps = {}) {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter function
  const filterData = () => {
    const query = searchQuery.toLowerCase();
    
    const filteredStats = stats.filter(stat => 
      stat.title.toLowerCase().includes(query) || 
      stat.value.toLowerCase().includes(query)
    );
    
    const filteredPatients = recentPatients.filter(patient => 
      patient.name.toLowerCase().includes(query) || 
      patient.condition.toLowerCase().includes(query) ||
      patient.status.toLowerCase().includes(query) ||
      patient.gender.toLowerCase().includes(query)
    );
    
    const filteredAppointments = upcomingAppointments.filter(appointment => 
      appointment.patient.toLowerCase().includes(query) || 
      appointment.type.toLowerCase().includes(query) ||
      appointment.time.toLowerCase().includes(query)
    );
    
    return {
      stats: filteredStats,
      patients: filteredPatients,
      appointments: filteredAppointments,
      showStats: searchQuery === '' || filteredStats.length > 0,
      showPatients: searchQuery === '' || filteredPatients.length > 0,
      showAppointments: searchQuery === '' || filteredAppointments.length > 0
    };
  };

  const filtered = filterData();

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      {/* <Card className="p-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20 border-2 border-primary/10 shadow-lg">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl shadow-md">
            <Search className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1 relative">
            <Input 
              type="text"
              placeholder="Search patients, conditions, appointments, statistics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-14 pl-6 pr-12 text-lg border-2 border-primary/20 focus:border-primary/40 bg-background shadow-sm"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 p-0 hover:bg-destructive/10 rounded-full"
              >
                <X className="w-5 h-5 text-muted-foreground hover:text-destructive" />
              </Button>
            )}
          </div>
          <div className="hidden lg:flex items-center gap-2 px-4 py-3 bg-background/50 rounded-lg border border-primary/20">
            <Sparkles className="w-5 h-5 text-yellow-500" />
            <span className="font-medium text-sm">AI-Powered Search</span>
          </div>
        </div>
        {searchQuery && (
          <div className="mt-4 flex items-center gap-2 text-sm">
            <Badge variant="secondary" className="flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              {filtered.stats.length + filtered.patients.length + filtered.appointments.length} results found
            </Badge>
            {filtered.stats.length > 0 && (
              <Badge variant="outline" className="flex items-center gap-1">
                <Activity className="w-3 h-3" />
                {filtered.stats.length} stats
              </Badge>
            )}
            {filtered.patients.length > 0 && (
              <Badge variant="outline" className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                {filtered.patients.length} patients
              </Badge>
            )}
            {filtered.appointments.length > 0 && (
              <Badge variant="outline" className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {filtered.appointments.length} appointments
              </Badge>
            )}
          </div>
        )}
      </Card> */}

      {/* Welcome Section */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="mb-0">Welcome to AyurNutri Pro</h1>
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <Brain className="w-4 h-4" />
                AI-Powered Ayurvedic Nutrition Platform
              </p>
            </div>
          </div>
          {/* <p className="text-muted-foreground mt-2 mb-6">
            Your comprehensive Ayurvedic nutrition management system. Monitor patients, generate personalized diet charts, and track nutritional progress with intelligent insights.
          </p> */}
          <div className="flex flex-wrap gap-3">
            <Button 
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-200"
              onClick={() => onNavigate?.('patients')}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Patient
            </Button>
            <Button 
              variant="outline" 
              className="hover:bg-orange-50 hover:border-orange-200 hover:text-orange-700 transition-colors"
              onClick={() => onNavigate?.('diet-generator')}
            >
              <FileText className="w-4 h-4 mr-2" />
              Generate Diet Chart
            </Button>
            <Button 
              variant="outline"
              className="hover:bg-purple-50 hover:border-purple-200 hover:text-purple-700 transition-colors"
              onClick={() => onNavigate?.('food-database')}
            >
              <Eye className="w-4 h-4 mr-2" />
              Browse Database
            </Button>
          </div>
        </div>
        <div className="lg:w-80">
          <Card className="p-4 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-green-900/20 dark:via-blue-900/20 dark:to-purple-900/20 border-0 relative overflow-hidden">
            <div className="absolute top-2 right-2">
              <Star className="w-4 h-4 text-yellow-500" />
            </div>
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1677599082447-6549af4c5454?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxheXVydmVkaWMlMjBoZXJicyUyMHNwaWNlc3xlbnwxfHx8fDE3NTg5NjA5MTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Ayurvedic herbs and spices"
              className="w-full h-32 object-cover rounded-lg mb-3"
            />
            <div className="flex items-center gap-2 mb-2">
              <Heart className="w-5 h-5 text-green-600" />
              <h3 className="font-medium text-green-800 dark:text-green-300">Ayurvedic Wisdom</h3>
            </div>
            <p className="text-sm text-green-700 dark:text-green-400 mb-3">
              <AyurvedicText>Balance the doshas through personalized nutrition and holistic wellness practices.</AyurvedicText>
            </p>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground flex items-center gap-1">
                <Shield className="w-3 h-3" />
                5000+ Years
              </span>
              <span className="text-muted-foreground flex items-center gap-1">
                <Target className="w-3 h-3" />
                Proven Results
              </span>
            </div>
          </Card>
        </div>
      </div>

      {/* Statistics Cards */}
      {filtered.showStats && filtered.stats.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-200 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/5 to-transparent rounded-full -translate-y-10 translate-x-10"></div>
                <div className="flex items-center justify-between relative">
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary/30 rounded-full"></div>
                      {stat.title}
                    </p>
                    <h3 className="text-3xl font-medium mt-2">{stat.value}</h3>
                    <div className="flex items-center gap-1 mt-3">
                      <div className="p-1 bg-green-100 dark:bg-green-900/30 rounded-full">
                        <TrendingUp className="w-3 h-3 text-green-600" />
                      </div>
                      <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                      <span className="text-xs text-muted-foreground">vs last month</span>
                    </div>
                  </div>
                  <div className={`p-4 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 ${stat.color} shadow-sm`}>
                    <Icon className="w-8 h-8" />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Patients */}
        {filtered.showPatients && (
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <h3>Recent Patients</h3>
              </div>
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                View All
              </Button>
            </div>
            {filtered.patients.length === 0 ? (
              <div className="text-center py-12">
                <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                <p className="text-muted-foreground">No patients found matching "{searchQuery}"</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filtered.patients.map((patient, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-xl border border-border/50 hover:border-primary/20 hover:bg-primary/5 transition-all duration-200 group">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-medium relative shadow-md">
                        {patient.name.split(' ').map(n => n[0]).join('')}
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-background flex items-center justify-center">
                          <CheckCircle className="w-2.5 h-2.5 text-green-800" />
                        </div>
                      </div>
                      <div>
                        <p className="font-medium group-hover:text-primary transition-colors">{patient.name}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{patient.age} years</span>
                          <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                          <span>{patient.gender}</span>
                          <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                          <span className="flex items-center gap-1">
                            <Heart className="w-3 h-3" />
                            {patient.condition}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge 
                        variant={patient.status === 'Active' ? 'default' : patient.status === 'Completed' ? 'secondary' : 'outline'}
                        className="mb-1"
                      >
                        {patient.status === 'Active' && <Zap className="w-3 h-3 mr-1" />}
                        {patient.status === 'Completed' && <CheckCircle className="w-3 h-3 mr-1" />}
                        {patient.status}
                      </Badge>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {patient.lastVisit}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        )}

        {/* Today's Appointments */}
        {filtered.showAppointments && (
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                  <Calendar className="w-6 h-6 text-orange-600" />
                </div>
                <h3>Today's Appointments</h3>
              </div>
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Schedule
              </Button>
            </div>
            {filtered.appointments.length === 0 ? (
              <div className="text-center py-12">
                <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                <p className="text-muted-foreground">No appointments found matching "{searchQuery}"</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filtered.appointments.map((appointment, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 rounded-xl border border-border/50 hover:border-orange-200 hover:bg-orange-50/50 dark:hover:bg-orange-900/10 transition-all duration-200 group">
                    <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 group-hover:scale-105 transition-transform shadow-md">
                      <Clock className="w-7 h-7 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium group-hover:text-orange-700 dark:group-hover:text-orange-400 transition-colors">{appointment.patient}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        {appointment.type === 'New Consultation' && <Star className="w-4 h-4 text-yellow-500" />}
                        {appointment.type === 'Follow-up' && <CheckCircle className="w-4 h-4 text-green-500" />}
                        {appointment.type === 'Diet Review' && <FileText className="w-4 h-4 text-blue-500" />}
                        {appointment.type === 'Progress Check' && <TrendingUp className="w-4 h-4 text-purple-500" />}
                        <span>{appointment.type}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <p className="font-medium text-lg">{appointment.time}</p>
                      </div>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {appointment.duration}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        )}
      </div>

      {/* Quick Actions */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
            <Zap className="w-6 h-6 text-yellow-500" />
          </div>
          <h3>Quick Actions</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Button 
            variant="outline" 
            className="h-auto p-8 flex flex-col items-start gap-4 hover:bg-red-50 hover:border-red-200 dark:hover:bg-red-900/10 dark:hover:border-red-800 transition-all duration-200 group hover:shadow-lg"
            onClick={() => onNavigate?.('patients')}
          >
            <div className="p-5 bg-red-100 dark:bg-red-900/30 rounded-xl group-hover:scale-110 transition-transform shadow-md">
              <Heart className="w-9 h-9 text-red-500" />
            </div>
            <div className="text-left">
              <p className="font-semibold flex items-center gap-2 text-lg mb-2">
                Patient Health Assessment
                <Star className="w-5 h-5 text-yellow-500" />
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                <AyurvedicText>Complete dosha analysis and comprehensive health evaluation</AyurvedicText>
              </p>
            </div>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-auto p-8 flex flex-col items-start gap-4 hover:bg-blue-50 hover:border-blue-200 dark:hover:bg-blue-900/10 dark:hover:border-blue-800 transition-all duration-200 group hover:shadow-lg"
            onClick={() => onNavigate?.('food-database')}
          >
            <div className="p-5 bg-blue-100 dark:bg-blue-900/30 rounded-xl group-hover:scale-110 transition-transform shadow-md">
              <Database className="w-9 h-9 text-blue-500" />
            </div>
            <div className="text-left">
              <p className="font-semibold flex items-center gap-2 text-lg mb-2">
                Food Database Search
                <Brain className="w-5 h-5 text-purple-500" />
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">Browse 8000+ food items with AI-powered nutritional insights</p>
            </div>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-auto p-8 flex flex-col items-start gap-4 hover:bg-green-50 hover:border-green-200 dark:hover:bg-green-900/10 dark:hover:border-green-800 transition-all duration-200 group hover:shadow-lg"
            onClick={() => onNavigate?.('diet-generator')}
          >
            <div className="p-5 bg-green-100 dark:bg-green-900/30 rounded-xl group-hover:scale-110 transition-transform shadow-md">
              <FileText className="w-9 h-9 text-green-500" />
            </div>
            <div className="text-left">
              <p className="font-semibold flex items-center gap-2 text-lg mb-2">
                Generate Diet Plan
                <Sparkles className="w-5 h-5 text-yellow-500" />
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                <AyurvedicText>Create personalized Ayurvedic diet charts with intelligent recommendations</AyurvedicText>
              </p>
            </div>
          </Button>
        </div>
      </Card>
    </div>
  );
}