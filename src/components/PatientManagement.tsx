import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Search, 
  Plus, 
  Edit, 
  Eye, 
  Filter,
  Calendar,
  User,
  Activity,
  FileText
} from 'lucide-react';

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  email: string;
  phone: string;
  address: string;
  dosha: 'Vata' | 'Pitta' | 'Kapha' | 'Vata-Pitta' | 'Pitta-Kapha' | 'Vata-Kapha';
  dietaryHabits: 'Vegetarian' | 'Vegan' | 'Non-Vegetarian' | 'Jain' | 'Eggetarian';
  mealFrequency: number;
  waterIntake: number;
  bowelMovements: 'Regular' | 'Irregular' | 'Constipated' | 'Loose';
  exerciseLevel: 'Sedentary' | 'Light' | 'Moderate' | 'Active' | 'Very Active';
  medicalConditions: string[];
  allergies: string[];
  currentWeight: number;
  targetWeight?: number;
  height: number;
  lastVisit: string;
  status: 'Active' | 'Inactive' | 'Completed';
  notes: string;
}

const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    age: 32,
    gender: 'Female',
    email: 'priya.sharma@email.com',
    phone: '+91 98765 43210',
    address: 'Mumbai, Maharashtra',
    dosha: 'Vata-Pitta',
    dietaryHabits: 'Vegetarian',
    mealFrequency: 4,
    waterIntake: 2.5,
    bowelMovements: 'Regular',
    exerciseLevel: 'Moderate',
    medicalConditions: ['Hypertension'],
    allergies: ['Nuts'],
    currentWeight: 68,
    targetWeight: 60,
    height: 162,
    lastVisit: '2024-09-25',
    status: 'Active',
    notes: 'Responds well to warm foods. Prefers early dinner.'
  },
  {
    id: '2',
    name: 'Rajesh Kumar',
    age: 45,
    gender: 'Male',
    email: 'rajesh.kumar@email.com',
    phone: '+91 87654 32109',
    address: 'Delhi, India',
    dosha: 'Kapha',
    dietaryHabits: 'Non-Vegetarian',
    mealFrequency: 3,
    waterIntake: 3.0,
    bowelMovements: 'Irregular',
    exerciseLevel: 'Light',
    medicalConditions: ['Type 2 Diabetes', 'High Cholesterol'],
    allergies: [],
    currentWeight: 82,
    targetWeight: 75,
    height: 175,
    lastVisit: '2024-09-20',
    status: 'Active',
    notes: 'Needs to increase fiber intake. Avoid refined sugars.'
  },
  {
    id: '3',
    name: 'Anita Patel',
    age: 28,
    gender: 'Female',
    email: 'anita.patel@email.com',
    phone: '+91 76543 21098',
    address: 'Ahmedabad, Gujarat',
    dosha: 'Pitta',
    dietaryHabits: 'Vegan',
    mealFrequency: 5,
    waterIntake: 2.8,
    bowelMovements: 'Regular',
    exerciseLevel: 'Active',
    medicalConditions: [],
    allergies: ['Dairy', 'Gluten'],
    currentWeight: 55,
    height: 158,
    lastVisit: '2024-09-22',
    status: 'Completed',
    notes: 'Excellent progress. Maintaining balanced nutrition.'
  }
];

export function PatientManagement() {
  const [patients, setPatients] = useState<Patient[]>(mockPatients);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.phone.includes(searchTerm);
    const matchesStatus = filterStatus === 'all' || patient.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleViewPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsViewDialogOpen(true);
  };

  const getBMI = (weight: number, height: number) => {
    const heightInMeters = height / 100;
    return (weight / (heightInMeters * heightInMeters)).toFixed(1);
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: 'Underweight', color: 'text-blue-600' };
    if (bmi < 25) return { category: 'Normal', color: 'text-green-600' };
    if (bmi < 30) return { category: 'Overweight', color: 'text-yellow-600' };
    return { category: 'Obese', color: 'text-red-600' };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div>
          <h1>Patient Management</h1>
          <p className="text-muted-foreground">Manage patient profiles and health data</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add New Patient
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Patient</DialogTitle>
            </DialogHeader>
            <AddPatientForm onClose={() => setIsAddDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search patients by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Patients List */}
      <div className="grid gap-4">
        {filteredPatients.map((patient) => {
          const bmi = parseFloat(getBMI(patient.currentWeight, patient.height));
          const bmiInfo = getBMICategory(bmi);
          
          return (
            <Card key={patient.id} className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white">
                    {patient.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-medium">{patient.name}</h3>
                      <Badge variant={patient.status === 'Active' ? 'default' : patient.status === 'Completed' ? 'secondary' : 'outline'}>
                        {patient.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-muted-foreground">
                      <span>{patient.age} years • {patient.gender}</span>
                      <span>Dosha: {patient.dosha}</span>
                      <span>BMI: {bmi} ({bmiInfo.category})</span>
                      <span>Last visit: {new Date(patient.lastVisit).toLocaleDateString()}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-3">
                      <Badge variant="outline" className="text-xs">
                        {patient.dietaryHabits}
                      </Badge>
                      {patient.medicalConditions.length > 0 && (
                        <Badge variant="outline" className="text-xs">
                          {patient.medicalConditions.length} condition(s)
                        </Badge>
                      )}
                      {patient.allergies.length > 0 && (
                        <Badge variant="outline" className="text-xs">
                          {patient.allergies.length} allergy(ies)
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleViewPatient(patient)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <FileText className="w-4 h-4 mr-2" />
                    Diet Plan
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {filteredPatients.length === 0 && (
        <Card className="p-12 text-center">
          <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No patients found</h3>
          <p className="text-muted-foreground mb-4">Try adjusting your search or filters</p>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add New Patient
          </Button>
        </Card>
      )}

      {/* Patient Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Patient Details</DialogTitle>
          </DialogHeader>
          {selectedPatient && <PatientDetailsView patient={selectedPatient} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function AddPatientForm({ onClose }: { onClose: () => void }) {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="health">Health Data</TabsTrigger>
          <TabsTrigger value="dietary">Dietary Info</TabsTrigger>
        </TabsList>
        
        <TabsContent value="basic" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input id="name" placeholder="Enter full name" />
            </div>
            <div>
              <Label htmlFor="age">Age *</Label>
              <Input id="age" type="number" placeholder="Enter age" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="gender">Gender *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="dosha">Dosha Type *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select dosha" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vata">Vata</SelectItem>
                  <SelectItem value="pitta">Pitta</SelectItem>
                  <SelectItem value="kapha">Kapha</SelectItem>
                  <SelectItem value="vata-pitta">Vata-Pitta</SelectItem>
                  <SelectItem value="pitta-kapha">Pitta-Kapha</SelectItem>
                  <SelectItem value="vata-kapha">Vata-Kapha</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter email" />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" placeholder="Enter phone number" />
            </div>
          </div>
          
          <div>
            <Label htmlFor="address">Address</Label>
            <Textarea id="address" placeholder="Enter address" />
          </div>
        </TabsContent>
        
        <TabsContent value="health" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="weight">Current Weight (kg) *</Label>
              <Input id="weight" type="number" placeholder="Enter weight" />
            </div>
            <div>
              <Label htmlFor="height">Height (cm) *</Label>
              <Input id="height" type="number" placeholder="Enter height" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="target-weight">Target Weight (kg)</Label>
              <Input id="target-weight" type="number" placeholder="Enter target weight" />
            </div>
            <div>
              <Label htmlFor="exercise">Exercise Level</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select exercise level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">Sedentary</SelectItem>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="very-active">Very Active</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="water-intake">Water Intake (liters/day)</Label>
              <Input id="water-intake" type="number" step="0.1" placeholder="Enter water intake" />
            </div>
            <div>
              <Label htmlFor="bowel">Bowel Movements</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select bowel pattern" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="regular">Regular</SelectItem>
                  <SelectItem value="irregular">Irregular</SelectItem>
                  <SelectItem value="constipated">Constipated</SelectItem>
                  <SelectItem value="loose">Loose</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <Label htmlFor="conditions">Medical Conditions</Label>
            <Textarea id="conditions" placeholder="List any medical conditions (comma-separated)" />
          </div>
          
          <div>
            <Label htmlFor="allergies">Allergies</Label>
            <Textarea id="allergies" placeholder="List any allergies (comma-separated)" />
          </div>
        </TabsContent>
        
        <TabsContent value="dietary" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="dietary-habits">Dietary Habits *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select dietary preference" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vegetarian">Vegetarian</SelectItem>
                  <SelectItem value="vegan">Vegan</SelectItem>
                  <SelectItem value="non-vegetarian">Non-Vegetarian</SelectItem>
                  <SelectItem value="jain">Jain</SelectItem>
                  <SelectItem value="eggetarian">Eggetarian</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="meal-frequency">Meal Frequency (per day)</Label>
              <Input id="meal-frequency" type="number" placeholder="Enter meal frequency" />
            </div>
          </div>
          
          <div>
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea 
              id="notes" 
              placeholder="Any additional information about the patient's dietary preferences, lifestyle, or health goals..."
              rows={4}
            />
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button onClick={onClose}>Add Patient</Button>
      </div>
    </div>
  );
}

function PatientDetailsView({ patient }: { patient: Patient }) {
  const bmi = parseFloat(getBMI(patient.currentWeight, patient.height));
  const bmiInfo = getBMICategory(bmi);
  
  function getBMI(weight: number, height: number) {
    const heightInMeters = height / 100;
    return (weight / (heightInMeters * heightInMeters)).toFixed(1);
  }

  function getBMICategory(bmi: number) {
    if (bmi < 18.5) return { category: 'Underweight', color: 'text-blue-600' };
    if (bmi < 25) return { category: 'Normal', color: 'text-green-600' };
    if (bmi < 30) return { category: 'Overweight', color: 'text-yellow-600' };
    return { category: 'Obese', color: 'text-red-600' };
  }

  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="health">Health Data</TabsTrigger>
        <TabsTrigger value="diet">Diet Info</TabsTrigger>
        <TabsTrigger value="history">History</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-4">
            <h4 className="font-medium mb-3">Basic Information</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Name:</span>
                <span>{patient.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Age:</span>
                <span>{patient.age} years</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Gender:</span>
                <span>{patient.gender}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Dosha:</span>
                <Badge variant="outline">{patient.dosha}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <Badge variant={patient.status === 'Active' ? 'default' : 'secondary'}>
                  {patient.status}
                </Badge>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <h4 className="font-medium mb-3">Contact Information</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email:</span>
                <span>{patient.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Phone:</span>
                <span>{patient.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Address:</span>
                <span className="text-right">{patient.address}</span>
              </div>
            </div>
          </Card>
        </div>
      </TabsContent>
      
      <TabsContent value="health" className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-4">
            <h4 className="font-medium mb-3">Physical Metrics</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Height:</span>
                <span>{patient.height} cm</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Current Weight:</span>
                <span>{patient.currentWeight} kg</span>
              </div>
              {patient.targetWeight && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Target Weight:</span>
                  <span>{patient.targetWeight} kg</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">BMI:</span>
                <span className={bmiInfo.color}>{bmi} ({bmiInfo.category})</span>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <h4 className="font-medium mb-3">Health Parameters</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Exercise Level:</span>
                <span>{patient.exerciseLevel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Water Intake:</span>
                <span>{patient.waterIntake} L/day</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Bowel Movements:</span>
                <span>{patient.bowelMovements}</span>
              </div>
            </div>
          </Card>
        </div>
        
        {(patient.medicalConditions.length > 0 || patient.allergies.length > 0) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {patient.medicalConditions.length > 0 && (
              <Card className="p-4">
                <h4 className="font-medium mb-3">Medical Conditions</h4>
                <div className="flex flex-wrap gap-2">
                  {patient.medicalConditions.map((condition, index) => (
                    <Badge key={index} variant="outline">{condition}</Badge>
                  ))}
                </div>
              </Card>
            )}
            
            {patient.allergies.length > 0 && (
              <Card className="p-4">
                <h4 className="font-medium mb-3">Allergies</h4>
                <div className="flex flex-wrap gap-2">
                  {patient.allergies.map((allergy, index) => (
                    <Badge key={index} variant="outline" className="text-red-600 border-red-200">
                      {allergy}
                    </Badge>
                  ))}
                </div>
              </Card>
            )}
          </div>
        )}
      </TabsContent>
      
      <TabsContent value="diet" className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-4">
            <h4 className="font-medium mb-3">Dietary Preferences</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Dietary Habits:</span>
                <Badge variant="outline">{patient.dietaryHabits}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Meal Frequency:</span>
                <span>{patient.mealFrequency} meals/day</span>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <h4 className="font-medium mb-3">Notes</h4>
            <p className="text-sm text-muted-foreground">
              {patient.notes || 'No additional notes available.'}
            </p>
          </Card>
        </div>
      </TabsContent>
      
      <TabsContent value="history" className="space-y-4">
        <Card className="p-4">
          <h4 className="font-medium mb-3">Visit History</h4>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <div className="flex-1">
                <p className="font-medium">Initial Consultation</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(patient.lastVisit).toLocaleDateString()} - Comprehensive health assessment and dosha analysis
                </p>
              </div>
            </div>
          </div>
        </Card>
      </TabsContent>
    </Tabs>
  );
}