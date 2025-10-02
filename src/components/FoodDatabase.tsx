import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { 
  Search, 
  Filter, 
  Plus,
  Leaf,
  Wheat,
  Apple,
  Fish,
  Milk,
  Coffee,
  Eye
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface NutritionalData {
  calories: number;
  protein: number;
  carbohydrates: number;
  fat: number;
  fiber: number;
  calcium: number;
  iron: number;
  vitaminC: number;
  sodium: number;
}

interface AyurvedicProperties {
  rasa: string; // Taste
  virya: string; // Potency
  vipaka: string; // Post-digestive effect
  dosha: string; // Effect on doshas
  season: string[]; // Recommended seasons
}

interface FoodItem {
  id: string;
  name: string;
  category: string;
  cuisine: string;
  description: string;
  servingSize: string;
  nutritionPer100g: NutritionalData;
  ayurvedicProperties: AyurvedicProperties;
  tags: string[];
  allergens: string[];
  imageUrl?: string;
}

const foodCategories = [
  'Grains & Cereals',
  'Legumes & Pulses',
  'Vegetables',
  'Fruits',
  'Dairy Products',
  'Meat & Poultry',
  'Seafood',
  'Nuts & Seeds',
  'Spices & Herbs',
  'Beverages',
  'Oils & Fats',
  'Sweets & Desserts'
];

const cuisineTypes = [
  'Indian',
  'South Indian',
  'North Indian',
  'Gujarati',
  'Bengali',
  'Punjabi',
  'Chinese',
  'Italian',
  'Mediterranean',
  'Continental',
  'Thai',
  'Japanese'
];

// Mock database with comprehensive food items
const mockFoodDatabase: FoodItem[] = [
  {
    id: '1',
    name: 'Basmati Rice (White)',
    category: 'Grains & Cereals',
    cuisine: 'Indian',
    description: 'Long-grain aromatic rice, commonly used in Indian cuisine',
    servingSize: '1 cup cooked (150g)',
    nutritionPer100g: {
      calories: 365,
      protein: 7.1,
      carbohydrates: 78.2,
      fat: 0.9,
      fiber: 1.3,
      calcium: 28,
      iron: 0.8,
      vitaminC: 0,
      sodium: 5
    },
    ayurvedicProperties: {
      rasa: 'Sweet',
      virya: 'Cooling',
      vipaka: 'Sweet',
      dosha: 'Balances Vata and Pitta, may increase Kapha',
      season: ['All seasons']
    },
    tags: ['staple', 'gluten-free', 'vegetarian', 'vegan'],
    allergens: []
  },
  {
    id: '2',
    name: 'Moong Dal (Green Gram)',
    category: 'Legumes & Pulses',
    cuisine: 'Indian',
    description: 'Highly digestible yellow lentil, excellent protein source',
    servingSize: '1 cup cooked (200g)',
    nutritionPer100g: {
      calories: 347,
      protein: 24.5,
      carbohydrates: 59.0,
      fat: 1.2,
      fiber: 16.3,
      calcium: 132,
      iron: 6.7,
      vitaminC: 4.8,
      sodium: 15
    },
    ayurvedicProperties: {
      rasa: 'Sweet, Astringent',
      virya: 'Cooling',
      vipaka: 'Sweet',
      dosha: 'Balances all doshas, especially Pitta',
      season: ['Summer', 'Monsoon']
    },
    tags: ['protein-rich', 'digestible', 'vegetarian', 'vegan', 'gluten-free'],
    allergens: []
  },
  {
    id: '3',
    name: 'Spinach (Palak)',
    category: 'Vegetables',
    cuisine: 'Indian',
    description: 'Iron-rich leafy green vegetable with high nutritional value',
    servingSize: '1 cup raw (30g)',
    nutritionPer100g: {
      calories: 23,
      protein: 2.9,
      carbohydrates: 3.6,
      fat: 0.4,
      fiber: 2.2,
      calcium: 99,
      iron: 2.7,
      vitaminC: 28.1,
      sodium: 79
    },
    ayurvedicProperties: {
      rasa: 'Sweet, Bitter',
      virya: 'Cooling',
      vipaka: 'Sweet',
      dosha: 'Balances Pitta, may increase Vata and Kapha',
      season: ['Winter', 'Spring']
    },
    tags: ['iron-rich', 'leafy-green', 'vegetarian', 'vegan', 'low-calorie'],
    allergens: []
  },
  {
    id: '4',
    name: 'Mango (Alphonso)',
    category: 'Fruits',
    cuisine: 'Indian',
    description: 'Sweet tropical fruit rich in vitamin A and C',
    servingSize: '1 medium (150g)',
    nutritionPer100g: {
      calories: 60,
      protein: 0.8,
      carbohydrates: 15.0,
      fat: 0.4,
      fiber: 1.6,
      calcium: 11,
      iron: 0.16,
      vitaminC: 36.4,
      sodium: 1
    },
    ayurvedicProperties: {
      rasa: 'Sweet, Sour',
      virya: 'Heating',
      vipaka: 'Sweet',
      dosha: 'Increases Pitta and Kapha, balances Vata',
      season: ['Summer']
    },
    tags: ['vitamin-c', 'tropical', 'sweet', 'vegetarian', 'vegan'],
    allergens: []
  },
  {
    id: '5',
    name: 'Paneer (Cottage Cheese)',
    category: 'Dairy Products',
    cuisine: 'Indian',
    description: 'Fresh cheese made from cow or buffalo milk',
    servingSize: '100g',
    nutritionPer100g: {
      calories: 265,
      protein: 18.3,
      carbohydrates: 1.2,
      fat: 20.8,
      fiber: 0,
      calcium: 208,
      iron: 0.2,
      vitaminC: 0,
      sodium: 18
    },
    ayurvedicProperties: {
      rasa: 'Sweet',
      virya: 'Cooling',
      vipaka: 'Sweet',
      dosha: 'Increases Kapha, balances Vata and Pitta',
      season: ['All seasons']
    },
    tags: ['protein-rich', 'calcium-rich', 'vegetarian', 'fresh-cheese'],
    allergens: ['Dairy']
  },
  {
    id: '6',
    name: 'Turmeric (Haldi)',
    category: 'Spices & Herbs',
    cuisine: 'Indian',
    description: 'Golden spice with anti-inflammatory properties',
    servingSize: '1 tsp (2g)',
    nutritionPer100g: {
      calories: 354,
      protein: 7.8,
      carbohydrates: 64.9,
      fat: 9.9,
      fiber: 21.1,
      calcium: 183,
      iron: 41.4,
      vitaminC: 25.9,
      sodium: 38
    },
    ayurvedicProperties: {
      rasa: 'Bitter, Pungent',
      virya: 'Heating',
      vipaka: 'Pungent',
      dosha: 'Balances all doshas, especially Kapha',
      season: ['All seasons']
    },
    tags: ['anti-inflammatory', 'medicinal', 'spice', 'vegetarian', 'vegan'],
    allergens: []
  },
  {
    id: '7',
    name: 'Quinoa',
    category: 'Grains & Cereals',
    cuisine: 'Continental',
    description: 'Complete protein grain, gluten-free superfood',
    servingSize: '1 cup cooked (185g)',
    nutritionPer100g: {
      calories: 368,
      protein: 14.1,
      carbohydrates: 64.2,
      fat: 6.1,
      fiber: 7.0,
      calcium: 47,
      iron: 4.6,
      vitaminC: 0,
      sodium: 5
    },
    ayurvedicProperties: {
      rasa: 'Sweet',
      virya: 'Cooling',
      vipaka: 'Sweet',
      dosha: 'Balances Vata and Pitta, neutral for Kapha',
      season: ['All seasons']
    },
    tags: ['complete-protein', 'gluten-free', 'superfood', 'vegetarian', 'vegan'],
    allergens: []
  },
  {
    id: '8',
    name: 'Salmon',
    category: 'Seafood',
    cuisine: 'Continental',
    description: 'Omega-3 rich fish, excellent protein source',
    servingSize: '100g fillet',
    nutritionPer100g: {
      calories: 208,
      protein: 25.4,
      carbohydrates: 0,
      fat: 12.4,
      fiber: 0,
      calcium: 12,
      iron: 0.8,
      vitaminC: 0,
      sodium: 75
    },
    ayurvedicProperties: {
      rasa: 'Sweet',
      virya: 'Heating',
      vipaka: 'Sweet',
      dosha: 'Increases Pitta, balances Vata, neutral for Kapha',
      season: ['Winter', 'Spring']
    },
    tags: ['omega-3', 'protein-rich', 'non-vegetarian', 'heart-healthy'],
    allergens: ['Fish']
  }
];

export function FoodDatabase() {
  const [foods] = useState<FoodItem[]>(mockFoodDatabase);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCuisine, setSelectedCuisine] = useState<string>('all');
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  const filteredFoods = foods.filter(food => {
    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         food.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         food.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || food.category === selectedCategory;
    const matchesCuisine = selectedCuisine === 'all' || food.cuisine === selectedCuisine;
    
    return matchesSearch && matchesCategory && matchesCuisine;
  });

  const handleViewFood = (food: FoodItem) => {
    setSelectedFood(food);
    setIsDetailDialogOpen(true);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Grains & Cereals': return Wheat;
      case 'Vegetables': case 'Fruits': return Apple;
      case 'Spices & Herbs': return Leaf;
      case 'Dairy Products': return Milk;
      case 'Seafood': case 'Meat & Poultry': return Fish;
      default: return Coffee;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div>
          <h1>Food Database</h1>
          <p className="text-muted-foreground">Comprehensive nutritional database with 8,000+ food items</p>
        </div>
        
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Food Item
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search foods, nutrients, or ingredients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {foodCategories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={selectedCuisine} onValueChange={setSelectedCuisine}>
            <SelectTrigger>
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="All Cuisines" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cuisines</SelectItem>
              {cuisineTypes.map(cuisine => (
                <SelectItem key={cuisine} value={cuisine}>{cuisine}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Food Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFoods.map((food) => {
          const CategoryIcon = getCategoryIcon(food.category);
          
          return (
            <Card key={food.id} className="p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3 mb-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <CategoryIcon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium mb-1">{food.name}</h3>
                  <p className="text-sm text-muted-foreground">{food.description}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Category:</span>
                  <Badge variant="outline">{food.category}</Badge>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Cuisine:</span>
                  <Badge variant="outline">{food.cuisine}</Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Calories:</span>
                    <span>{food.nutritionPer100g.calories} kcal</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Protein:</span>
                    <span>{food.nutritionPer100g.protein}g</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 mt-2">
                  {food.tags.slice(0, 3).map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {food.tags.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{food.tags.length - 3}
                    </Badge>
                  )}
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => handleViewFood(food)}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {filteredFoods.length === 0 && (
        <Card className="p-12 text-center">
          <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No foods found</h3>
          <p className="text-muted-foreground mb-4">Try adjusting your search or filters</p>
          <Button variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Add New Food Item
          </Button>
        </Card>
      )}

      {/* Food Detail Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Food Details</DialogTitle>
          </DialogHeader>
          {selectedFood && <FoodDetailView food={selectedFood} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function FoodDetailView({ food }: { food: FoodItem }) {
  return (
    <Tabs defaultValue="nutrition" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
        <TabsTrigger value="ayurvedic">Ayurvedic Properties</TabsTrigger>
        <TabsTrigger value="usage">Usage & Tips</TabsTrigger>
      </TabsList>
      
      <TabsContent value="nutrition" className="space-y-4">
        <Card className="p-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center text-white">
              <Apple className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-medium">{food.name}</h3>
              <p className="text-muted-foreground">{food.description}</p>
              <p className="text-sm text-muted-foreground mt-1">
                Serving size: {food.servingSize}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Macronutrients (per 100g)</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span>Calories</span>
                  <span className="font-medium">{food.nutritionPer100g.calories} kcal</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span>Protein</span>
                  <span className="font-medium">{food.nutritionPer100g.protein}g</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span>Carbohydrates</span>
                  <span className="font-medium">{food.nutritionPer100g.carbohydrates}g</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span>Fat</span>
                  <span className="font-medium">{food.nutritionPer100g.fat}g</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span>Fiber</span>
                  <span className="font-medium">{food.nutritionPer100g.fiber}g</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Micronutrients (per 100g)</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span>Calcium</span>
                  <span className="font-medium">{food.nutritionPer100g.calcium}mg</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span>Iron</span>
                  <span className="font-medium">{food.nutritionPer100g.iron}mg</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span>Vitamin C</span>
                  <span className="font-medium">{food.nutritionPer100g.vitaminC}mg</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span>Sodium</span>
                  <span className="font-medium">{food.nutritionPer100g.sodium}mg</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4">
            <h4 className="font-medium mb-3">Tags</h4>
            <div className="flex flex-wrap gap-2">
              {food.tags.map(tag => (
                <Badge key={tag} variant="outline">{tag}</Badge>
              ))}
            </div>
          </Card>
          
          {food.allergens.length > 0 && (
            <Card className="p-4">
              <h4 className="font-medium mb-3">Allergens</h4>
              <div className="flex flex-wrap gap-2">
                {food.allergens.map(allergen => (
                  <Badge key={allergen} variant="destructive">{allergen}</Badge>
                ))}
              </div>
            </Card>
          )}
        </div>
      </TabsContent>
      
      <TabsContent value="ayurvedic" className="space-y-4">
        <Card className="p-4">
          <h4 className="font-medium mb-4">Ayurvedic Classification</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                <span className="text-orange-800">Rasa (Taste)</span>
                <span className="font-medium text-orange-800">{food.ayurvedicProperties.rasa}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                <span className="text-red-800">Virya (Potency)</span>
                <span className="font-medium text-red-800">{food.ayurvedicProperties.virya}</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="text-green-800">Vipaka (Effect)</span>
                <span className="font-medium text-green-800">{food.ayurvedicProperties.vipaka}</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <h5 className="font-medium mb-2">Effect on Doshas</h5>
            <p className="p-3 bg-blue-50 rounded-lg text-blue-800">
              {food.ayurvedicProperties.dosha}
            </p>
          </div>
          
          <div className="mt-4">
            <h5 className="font-medium mb-2">Recommended Seasons</h5>
            <div className="flex flex-wrap gap-2">
              {food.ayurvedicProperties.season.map(season => (
                <Badge key={season} variant="outline" className="text-purple-600 border-purple-200">
                  {season}
                </Badge>
              ))}
            </div>
          </div>
        </Card>
      </TabsContent>
      
      <TabsContent value="usage" className="space-y-4">
        <Card className="p-4">
          <h4 className="font-medium mb-3">Usage Guidelines</h4>
          <div className="space-y-4">
            <div>
              <h5 className="font-medium mb-2">Best Time to Consume</h5>
              <p className="text-muted-foreground">
                Based on Ayurvedic principles, this food is best consumed during{' '}
                {food.ayurvedicProperties.season.join(', ').toLowerCase()}.
              </p>
            </div>
            
            <div>
              <h5 className="font-medium mb-2">Preparation Tips</h5>
              <p className="text-muted-foreground">
                This food has {food.ayurvedicProperties.virya.toLowerCase()} potency and{' '}
                {food.ayurvedicProperties.rasa.toLowerCase()} taste. Consider pairing with{' '}
                complementary spices and cooking methods to balance the doshas.
              </p>
            </div>
            
            <div>
              <h5 className="font-medium mb-2">Health Benefits</h5>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Rich in essential nutrients for balanced nutrition</li>
                <li>Supports digestive health when consumed appropriately</li>
                <li>Helps maintain doshic balance when used in moderation</li>
              </ul>
            </div>
          </div>
        </Card>
      </TabsContent>
    </Tabs>
  );
}