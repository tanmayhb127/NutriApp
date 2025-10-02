import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { 
  FileText, 
  Download, 
  Printer, 
  Calendar,
  Clock,
  Users,
  Target,
  Activity,
  Utensils,
  ChefHat
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { AyurvedicText } from './AyurvedicTooltip';

interface DietPlan {
  id: string;
  patientName: string;
  age: number;
  gender: string;
  dosha: string;
  goal: string;
  duration: string;
  meals: {
    [key: string]: {
      time: string;
      foods: {
        name: string;
        quantity: string;
        calories: number;
        notes?: string;
      }[];
      totalCalories: number;
      ayurvedicNotes: string;
    };
  };
  dailyTotals: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
  };
  guidelines: string[];
  restrictions: string[];
  supplements?: string[];
}

const mockDietPlan: DietPlan = {
  id: '1',
  patientName: 'Priya Sharma',
  age: 32,
  gender: 'Female',
  dosha: 'Vata-Pitta',
  goal: 'Weight Management',
  duration: '4 weeks',
  meals: {
    'Early Morning': {
      time: '6:30 AM',
      foods: [
        { name: 'Warm Water with Lemon', quantity: '1 glass (250ml)', calories: 10 },
        { name: 'Soaked Almonds', quantity: '5 pieces', calories: 35 }
      ],
      totalCalories: 45,
      ayurvedicNotes: 'Warm water stimulates digestion and balances Vata'
    },
    'Breakfast': {
      time: '8:00 AM',
      foods: [
        { name: 'Oats Porridge with Milk', quantity: '1 bowl (150g)', calories: 220 },
        { name: 'Mixed Berries', quantity: '1/2 cup', calories: 40 },
        { name: 'Walnuts', quantity: '4 halves', calories: 52 },
        { name: 'Cinnamon Powder', quantity: '1 pinch', calories: 2 }
      ],
      totalCalories: 314,
      ayurvedicNotes: 'Warm, nourishing breakfast suitable for both Vata and Pitta'
    },
    'Mid-Morning': {
      time: '10:30 AM',
      foods: [
        { name: 'Coconut Water', quantity: '1 glass (200ml)', calories: 45 },
        { name: 'Dates', quantity: '2 pieces', calories: 40 }
      ],
      totalCalories: 85,
      ayurvedicNotes: 'Cooling and hydrating for Pitta, grounding for Vata'
    },
    'Lunch': {
      time: '12:30 PM',
      foods: [
        { name: 'Brown Rice', quantity: '3/4 cup cooked', calories: 170 },
        { name: 'Moong Dal', quantity: '1/2 cup cooked', calories: 115 },
        { name: 'Mixed Vegetable Curry', quantity: '1 cup', calories: 120 },
        { name: 'Cucumber Raita', quantity: '1/2 cup', calories: 45 },
        { name: 'Ghee', quantity: '1 tsp', calories: 40 }
      ],
      totalCalories: 490,
      ayurvedicNotes: 'Complete meal with all six rasa, agni is strongest at noon'
    },
    'Evening Snack': {
      time: '4:00 PM',
      foods: [
        { name: 'Herbal Tea (Ginger-Tulsi)', quantity: '1 cup', calories: 5 },
        { name: 'Roasted Chickpeas', quantity: '1/4 cup', calories: 75 }
      ],
      totalCalories: 80,
      ayurvedicNotes: 'Light, warming snack to maintain energy levels'
    },
    'Dinner': {
      time: '7:00 PM',
      foods: [
        { name: 'Quinoa', quantity: '1/2 cup cooked', calories: 110 },
        { name: 'Steamed Broccoli & Carrots', quantity: '1 cup', calories: 55 },
        { name: 'Paneer Tikka', quantity: '50g', calories: 135 },
        { name: 'Mint Chutney', quantity: '1 tbsp', calories: 15 }
      ],
      totalCalories: 315,
      ayurvedicNotes: 'Light, easily digestible dinner consumed before sunset'
    }
  },
  dailyTotals: {
    calories: 1329,
    protein: 65,
    carbs: 180,
    fat: 45,
    fiber: 28
  },
  guidelines: [
    'Eat meals at regular times to balance vata',
    'Include warm, cooked foods to support agni',
    'Drink warm water throughout the day',
    'Avoid cold drinks and raw foods in excess',
    'Practice mindful eating in a peaceful environment',
    'Include all six rasa in main meals',
    'Follow proper dinacharya for optimal health'
  ],
  restrictions: [
    'Limit spicy and acidic foods (pitta aggravating)',
    'Avoid carbonated drinks and processed foods that create ama',
    'Reduce coffee intake (maximum 1 cup/day)',
    'Minimize refined sugar and white flour'
  ],
  supplements: [
    'Triphala powder - 1 tsp with warm water before bed',
    'Vitamin D3 - 1000 IU daily',
    'Omega-3 supplement - As per physician advice'
  ]
};

export function DietChartGenerator() {
  const [selectedPatient, setSelectedPatient] = useState('');
  const [generatedPlan, setGeneratedPlan] = useState<DietPlan | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateDietPlan = async () => {
    if (!selectedPatient) return;
    
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setGeneratedPlan(mockDietPlan);
      setIsGenerating(false);
    }, 2000);
  };

  const printDietChart = () => {
    window.print();
  };

  const downloadDietChart = () => {
    // In a real app, this would generate a PDF
    alert('Diet chart download functionality would be implemented here');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div>
          <h1>Diet Chart Generator</h1>
          <p className="text-muted-foreground">Generate personalized Ayurvedic diet plans</p>
        </div>
      </div>

      {/* Diet Plan Configuration */}
      <Card className="p-6">
        <h3 className="mb-4">Generate New Diet Plan</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div>
            <Label htmlFor="patient">Select Patient *</Label>
            <Select value={selectedPatient} onValueChange={setSelectedPatient}>
              <SelectTrigger>
                <Users className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Choose patient" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="priya">Priya Sharma (32F, Vata-Pitta)</SelectItem>
                <SelectItem value="rajesh">Rajesh Kumar (45M, Kapha)</SelectItem>
                <SelectItem value="anita">Anita Patel (28F, Pitta)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="goal">Health Goal</Label>
            <Select>
              <SelectTrigger>
                <Target className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Select goal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weight-loss">Weight Loss</SelectItem>
                <SelectItem value="weight-gain">Weight Gain</SelectItem>
                <SelectItem value="maintenance">Weight Maintenance</SelectItem>
                <SelectItem value="diabetes">Diabetes Management</SelectItem>
                <SelectItem value="hypertension">Hypertension Control</SelectItem>
                <SelectItem value="digestive">Digestive Health</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="duration">Duration</Label>
            <Select>
              <SelectTrigger>
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-week">1 Week</SelectItem>
                <SelectItem value="2-weeks">2 Weeks</SelectItem>
                <SelectItem value="4-weeks">4 Weeks</SelectItem>
                <SelectItem value="8-weeks">8 Weeks</SelectItem>
                <SelectItem value="12-weeks">12 Weeks</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <Label htmlFor="activity-level">Activity Level</Label>
            <Select>
              <SelectTrigger>
                <Activity className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Select activity level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sedentary">Sedentary</SelectItem>
                <SelectItem value="light">Light Activity</SelectItem>
                <SelectItem value="moderate">Moderate Activity</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="very-active">Very Active</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="meal-preference">Meal Preference</Label>
            <Select>
              <SelectTrigger>
                <Utensils className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Select preference" />
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
        </div>
        
        <Button 
          onClick={generateDietPlan} 
          disabled={!selectedPatient || isGenerating}
          className="w-full md:w-auto"
        >
          <FileText className="w-4 h-4 mr-2" />
          {isGenerating ? 'Generating Plan...' : 'Generate Diet Plan'}
        </Button>
      </Card>

      {/* Generated Diet Plan */}
      {generatedPlan && (
        <div className="space-y-6">
          {/* Plan Header */}
          <Card className="p-6">
            <div className="flex flex-col lg:flex-row gap-6 items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center text-white">
                    <ChefHat className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-medium">Personalized Diet Plan</h2>
                    <p className="text-muted-foreground">Generated on {new Date().toLocaleDateString()}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Patient</p>
                    <p className="font-medium">{generatedPlan.patientName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Age & Gender</p>
                    <p className="font-medium">{generatedPlan.age}Y, {generatedPlan.gender}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Dosha Type</p>
                    <Badge variant="outline">{generatedPlan.dosha}</Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Goal</p>
                    <Badge>{generatedPlan.goal}</Badge>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" onClick={printDietChart}>
                  <Printer className="w-4 h-4 mr-2" />
                  Print
                </Button>
                <Button variant="outline" onClick={downloadDietChart}>
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </div>
          </Card>

          {/* Daily Nutrition Summary */}
          <Card className="p-6">
            <h3 className="mb-4">Daily Nutrition Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-medium text-blue-600">{generatedPlan.dailyTotals.calories}</p>
                <p className="text-sm text-blue-600">Calories</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-medium text-green-600">{generatedPlan.dailyTotals.protein}g</p>
                <p className="text-sm text-green-600">Protein</p>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <p className="text-2xl font-medium text-yellow-600">{generatedPlan.dailyTotals.carbs}g</p>
                <p className="text-sm text-yellow-600">Carbs</p>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <p className="text-2xl font-medium text-orange-600">{generatedPlan.dailyTotals.fat}g</p>
                <p className="text-sm text-orange-600">Fat</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <p className="text-2xl font-medium text-purple-600">{generatedPlan.dailyTotals.fiber}g</p>
                <p className="text-sm text-purple-600">Fiber</p>
              </div>
            </div>
          </Card>

          {/* Meal Plan */}
          <Card className="p-6">
            <h3 className="mb-6">Daily Meal Plan</h3>
            <div className="space-y-6">
              {Object.entries(generatedPlan.meals).map(([mealName, meal]) => (
                <div key={mealName} className="border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-primary" />
                      <div>
                        <h4 className="font-medium">{mealName}</h4>
                        <p className="text-sm text-muted-foreground">{meal.time}</p>
                      </div>
                    </div>
                    <Badge variant="outline">{meal.totalCalories} kcal</Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium mb-2">Food Items</h5>
                      <div className="space-y-2">
                        {meal.foods.map((food, index) => (
                          <div key={index} className="flex justify-between items-center text-sm">
                            <div>
                              <span>{food.name}</span>
                              <p className="text-muted-foreground">{food.quantity}</p>
                            </div>
                            <span className="font-medium">{food.calories} kcal</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="font-medium mb-2">Ayurvedic Notes</h5>
                      <p className="text-sm text-muted-foreground bg-orange-50 p-3 rounded-lg">
                        {meal.ayurvedicNotes}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Guidelines and Restrictions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="mb-4 text-green-600">Dietary Guidelines</h3>
              <ul className="space-y-2">
                {generatedPlan.guidelines.map((guideline, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{guideline}</span>
                  </li>
                ))}
              </ul>
            </Card>
            
            <Card className="p-6">
              <h3 className="mb-4 text-red-600">Restrictions & Cautions</h3>
              <ul className="space-y-2">
                {generatedPlan.restrictions.map((restriction, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{restriction}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Supplements */}
          {generatedPlan.supplements && generatedPlan.supplements.length > 0 && (
            <Card className="p-6">
              <h3 className="mb-4">Recommended Supplements</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {generatedPlan.supplements.map((supplement, index) => (
                  <div key={index} className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">{supplement}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                * Please consult with your healthcare provider before starting any supplements
              </p>
            </Card>
          )}

          {/* Footer */}
          <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50 border-0">
            <div className="flex items-center gap-4">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1641301547846-2cf73f58fdca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxudXRyaXRpb24lMjBmb29kJTIwaGVhbHRoeSUyMG1lYWx8ZW58MXx8fHwxNzU4OTYwOTEzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Healthy nutrition"
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div>
                <h4 className="font-medium text-green-800">Follow for Best Results</h4>
                <p className="text-sm text-green-700 mt-1">
                  This plan is designed according to Ayurvedic principles. Regular follow-ups and adjustments will ensure optimal health benefits.
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}