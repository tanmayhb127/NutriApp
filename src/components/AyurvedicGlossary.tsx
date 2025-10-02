import { useState } from 'react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Search, 
  BookOpen, 
  Flower2, 
  Flame, 
  Droplets, 
  Wind,
  Sun,
  Moon,
  Heart,
  Leaf,
  Brain,
  Shield,
  Target,
  Clock,
  Star
} from 'lucide-react';

interface GlossaryTerm {
  term: string;
  category: string;
  pronunciation?: string;
  definition: string;
  description: string;
  relatedTerms?: string[];
  examples?: string[];
  icon?: any;
  significance: string;
}

const glossaryTerms: GlossaryTerm[] = [
  // Doshas
  {
    term: 'Vata',
    category: 'Dosha',
    pronunciation: 'VAH-ta',
    definition: 'The biological energy governing movement and circulation',
    description: 'Vata is composed of air and space elements. It controls breathing, blood circulation, heartbeat, and all movement in the body. When balanced, it promotes creativity and vitality.',
    relatedTerms: ['Pitta', 'Kapha', 'Prakriti', 'Vikriti'],
    examples: ['Dry skin', 'Cold hands and feet', 'Variable appetite', 'Quick thinking'],
    icon: Wind,
    significance: 'Primary dosha that needs to be balanced first for overall health'
  },
  {
    term: 'Pitta',
    category: 'Dosha',
    pronunciation: 'PIT-ta',
    definition: 'The biological energy governing digestion and metabolism',
    description: 'Pitta is composed of fire and water elements. It controls digestion, absorption, metabolism, and body temperature. When balanced, it promotes intelligence and courage.',
    relatedTerms: ['Vata', 'Kapha', 'Agni', 'Tejas'],
    examples: ['Strong appetite', 'Good digestion', 'Sharp intellect', 'Medium build'],
    icon: Flame,
    significance: 'Responsible for all transformations in the body and mind'
  },
  {
    term: 'Kapha',
    category: 'Dosha',
    pronunciation: 'KAH-fa',
    definition: 'The biological energy governing structure and immunity',
    description: 'Kapha is composed of earth and water elements. It provides structure, stability, and immunity. When balanced, it promotes strength and emotional stability.',
    relatedTerms: ['Vata', 'Pitta', 'Ojas', 'Shleshma'],
    examples: ['Strong immunity', 'Stable emotions', 'Thick hair', 'Slow digestion'],
    icon: Droplets,
    significance: 'Foundation of physical strength and emotional resilience'
  },

  // Tastes (Rasa)
  {
    term: 'Rasa',
    category: 'Taste',
    pronunciation: 'RAH-sa',
    definition: 'The six tastes in Ayurveda that affect the doshas',
    description: 'The six tastes are Sweet, Sour, Salty, Pungent, Bitter, and Astringent. Each taste has specific effects on the three doshas and should be included in daily meals.',
    relatedTerms: ['Madhura', 'Amla', 'Lavana', 'Katu', 'Tikta', 'Kashaya'],
    examples: ['Sweet: sugar, rice', 'Sour: lemon, yogurt', 'Salty: sea salt', 'Pungent: chili, ginger'],
    icon: Star,
    significance: 'Foundation of Ayurvedic nutrition and meal planning'
  },
  {
    term: 'Madhura',
    category: 'Taste',
    pronunciation: 'ma-DHU-ra',
    definition: 'Sweet taste - the first of six tastes',
    description: 'Sweet taste increases Kapha, decreases Vata and Pitta. It provides nourishment, satisfaction, and builds tissues. Includes natural sugars, grains, and dairy.',
    relatedTerms: ['Rasa', 'Kapha', 'Ojas'],
    examples: ['Rice', 'Wheat', 'Milk', 'Dates', 'Sweet fruits'],
    icon: Heart,
    significance: 'Most nourishing taste, but should be consumed in moderation'
  },
  {
    term: 'Katu',
    category: 'Taste',
    pronunciation: 'ka-TU',
    definition: 'Pungent taste - hot and spicy',
    description: 'Pungent taste increases Pitta and Vata, decreases Kapha. It stimulates digestion, circulation, and clears congestion. Found in spices and chilies.',
    relatedTerms: ['Rasa', 'Agni', 'Pitta'],
    examples: ['Black pepper', 'Ginger', 'Chili', 'Mustard', 'Garlic'],
    icon: Flame,
    significance: 'Essential for digestive fire but can aggravate heat conditions'
  },

  // Other Important Terms
  {
    term: 'Agni',
    category: 'Digestion',
    pronunciation: 'AG-ni',
    definition: 'Digestive fire responsible for transformation',
    description: 'Agni is the metabolic fire that transforms food into energy and consciousness. Strong agni ensures proper digestion, while weak agni leads to toxin formation.',
    relatedTerms: ['Ama', 'Pitta', 'Mandagni', 'Tikshagni'],
    examples: ['Strong appetite', 'Clear skin', 'Good energy', 'Regular elimination'],
    icon: Flame,
    significance: 'Central to health - all diseases begin with compromised agni'
  },
  {
    term: 'Ama',
    category: 'Toxins',
    pronunciation: 'AH-ma',
    definition: 'Undigested food matter and toxins',
    description: 'Ama is the sticky, toxic substance formed when agni is weak and food is not properly digested. It blocks channels and causes disease.',
    relatedTerms: ['Agni', 'Srotas', 'Detox'],
    examples: ['White coating on tongue', 'Fatigue', 'Poor appetite', 'Joint stiffness'],
    icon: Shield,
    significance: 'Root cause of most diseases in Ayurveda'
  },
  {
    term: 'Ojas',
    category: 'Immunity',
    pronunciation: 'OH-jas',
    definition: 'The essence of immunity and vital energy',
    description: 'Ojas is the refined essence of all tissues, representing immunity, vitality, and spiritual energy. It gives luster to skin and strength to mind.',
    relatedTerms: ['Kapha', 'Immunity', 'Tejas', 'Prana'],
    examples: ['Glowing skin', 'Strong immunity', 'Mental clarity', 'Emotional stability'],
    icon: Star,
    significance: 'Determines longevity and quality of life'
  },
  {
    term: 'Prakriti',
    category: 'Constitution',
    pronunciation: 'pra-KRI-ti',
    definition: 'Individual constitutional type',
    description: 'Prakriti is the unique combination of doshas determined at conception. It remains constant throughout life and determines physical and mental characteristics.',
    relatedTerms: ['Vikriti', 'Dosha', 'Constitution'],
    examples: ['Vata constitution', 'Pitta constitution', 'Kapha constitution', 'Dual types'],
    icon: Target,
    significance: 'Blueprint for personalized health and nutrition'
  },
  {
    term: 'Vikriti',
    category: 'Constitution',
    pronunciation: 'vi-KRI-ti',
    definition: 'Current state of doshic imbalance',
    description: 'Vikriti represents the current state of doshas, which may differ from prakriti due to lifestyle, stress, diet, or environment.',
    relatedTerms: ['Prakriti', 'Dosha', 'Imbalance'],
    examples: ['Vata excess', 'Pitta aggravation', 'Kapha accumulation'],
    icon: Target,
    significance: 'Guide for therapeutic interventions and lifestyle modifications'
  },
  {
    term: 'Virya',
    category: 'Food Property',
    pronunciation: 'VEER-ya',
    definition: 'Heating or cooling potency of foods',
    description: 'Virya is the heating (ushna) or cooling (sheeta) energy of foods and herbs. It affects the body temperature and dosha balance.',
    relatedTerms: ['Rasa', 'Vipaka', 'Prabhava'],
    examples: ['Heating: ginger, pepper', 'Cooling: coconut, cucumber'],
    icon: Sun,
    significance: 'Important for selecting foods according to season and constitution'
  },
  {
    term: 'Vipaka',
    category: 'Food Property',
    pronunciation: 'vi-PA-ka',
    definition: 'Post-digestive effect of foods',
    description: 'Vipaka is the long-term effect of food after digestion is complete. It can be sweet, sour, or pungent, affecting dosha balance.',
    relatedTerms: ['Rasa', 'Virya', 'Digestion'],
    examples: ['Sweet vipaka: grains, dairy', 'Sour vipaka: fruits', 'Pungent vipaka: legumes'],
    icon: Clock,
    significance: 'Determines long-term effects of foods on the body'
  },
  {
    term: 'Srotas',
    category: 'Physiology',
    pronunciation: 'SHRO-tas',
    definition: 'Channels or pathways in the body',
    description: 'Srotas are the micro and macro channels that transport nutrients, waste, and consciousness throughout the body. Blocked srotas cause disease.',
    relatedTerms: ['Ama', 'Circulation', 'Channels'],
    examples: ['Blood vessels', 'Lymphatic system', 'Respiratory tract', 'Digestive tract'],
    icon: Brain,
    significance: 'Health depends on clear, unobstructed flow through all channels'
  },
  {
    term: 'Dinacharya',
    category: 'Lifestyle',
    pronunciation: 'di-na-char-YA',
    definition: 'Daily routine aligned with natural rhythms',
    description: 'Dinacharya is the ideal daily routine that follows natural cycles, promoting health and preventing disease through proper timing of activities.',
    relatedTerms: ['Ritucharya', 'Circadian rhythm', 'Routine'],
    examples: ['Wake before sunrise', 'Exercise in morning', 'Largest meal at noon', 'Early dinner'],
    icon: Sun,
    significance: 'Foundation of preventive healthcare in Ayurveda'
  },
  {
    term: 'Ritucharya',
    category: 'Lifestyle',
    pronunciation: 'ri-tu-char-YA',
    definition: 'Seasonal routine and dietary guidelines',
    description: 'Ritucharya provides guidelines for adjusting diet, lifestyle, and activities according to seasons to maintain doshic balance.',
    relatedTerms: ['Dinacharya', 'Seasons', 'Dosha'],
    examples: ['Warm foods in winter', 'Cooling foods in summer', 'Detox in spring'],
    icon: Leaf,
    significance: 'Helps adapt to seasonal changes and prevent seasonal disorders'
  },
  {
    term: 'Sattvavajaya',
    category: 'Psychology',
    pronunciation: 'sat-tva-va-JA-ya',
    definition: 'Psychotherapy and counseling in Ayurveda',
    description: 'Sattvavajaya is the psychological therapy that addresses mental and emotional imbalances through counseling, meditation, and spiritual practices.',
    relatedTerms: ['Sattva', 'Mental health', 'Consciousness'],
    examples: ['Meditation', 'Counseling', 'Spiritual practices', 'Positive thinking'],
    icon: Brain,
    significance: 'Addresses root psychological causes of disease'
  }
];

const categories = ['All', 'Dosha', 'Taste', 'Digestion', 'Constitution', 'Food Property', 'Physiology', 'Lifestyle', 'Psychology', 'Toxins', 'Immunity'];

export function AyurvedicGlossary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredTerms = glossaryTerms.filter(term => {
    const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         term.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         term.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || term.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    const colors = {
      'Dosha': 'bg-orange-100 text-orange-800 border-orange-200',
      'Taste': 'bg-pink-100 text-pink-800 border-pink-200',
      'Digestion': 'bg-red-100 text-red-800 border-red-200',
      'Constitution': 'bg-blue-100 text-blue-800 border-blue-200',
      'Food Property': 'bg-green-100 text-green-800 border-green-200',
      'Physiology': 'bg-purple-100 text-purple-800 border-purple-200',
      'Lifestyle': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Psychology': 'bg-indigo-100 text-indigo-800 border-indigo-200',
      'Toxins': 'bg-gray-100 text-gray-800 border-gray-200',
      'Immunity': 'bg-emerald-100 text-emerald-800 border-emerald-200'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="mb-0">Ayurvedic Glossary</h1>
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <Flower2 className="w-4 h-4" />
                Essential Terms & Concepts in Ayurveda
              </p>
            </div>
          </div>
          <p className="text-muted-foreground">
            Comprehensive guide to Ayurvedic terminology, concepts, and principles used throughout the platform. 
            Understanding these terms will enhance your journey towards holistic wellness.
          </p>
        </div>
        
        <div className="lg:w-80">
          <Card className="p-4 bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 dark:from-orange-900/20 dark:via-yellow-900/20 dark:to-red-900/20 border-0">
            <div className="flex items-center gap-3 mb-3">
              <Flower2 className="w-8 h-8 text-orange-600" />
              <div>
                <h3 className="font-medium text-orange-800 dark:text-orange-300">Ancient Wisdom</h3>
                <p className="text-sm text-orange-700 dark:text-orange-400">5000+ Years of Knowledge</p>
              </div>
            </div>
            <p className="text-sm text-orange-700 dark:text-orange-400">
              Ayurveda, the "science of life," offers time-tested principles for optimal health and wellness.
            </p>
          </Card>
        </div>
      </div>

      {/* Search and Filter */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search terms, definitions, or concepts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </Card>

      {/* Category Tabs */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-11 h-auto p-1">
          {categories.map(category => (
            <TabsTrigger 
              key={category} 
              value={category}
              className="text-xs px-2 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={selectedCategory} className="mt-6">
          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-2xl font-medium">{filteredTerms.length}</p>
              <p className="text-sm text-muted-foreground">Terms Found</p>
            </Card>
            <Card className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Flame className="w-5 h-5 text-orange-600" />
              </div>
              <p className="text-2xl font-medium">{glossaryTerms.filter(t => t.category === 'Dosha').length}</p>
              <p className="text-sm text-muted-foreground">Dosha Terms</p>
            </Card>
            <Card className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Star className="w-5 h-5 text-pink-600" />
              </div>
              <p className="text-2xl font-medium">{glossaryTerms.filter(t => t.category === 'Taste').length}</p>
              <p className="text-sm text-muted-foreground">Taste Categories</p>
            </Card>
            <Card className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Leaf className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-2xl font-medium">{glossaryTerms.filter(t => t.category === 'Lifestyle').length}</p>
              <p className="text-sm text-muted-foreground">Lifestyle Terms</p>
            </Card>
          </div>

          {/* Terms Grid */}
          <div className="grid gap-6">
            {filteredTerms.map((term) => {
              const IconComponent = term.icon;
              
              return (
                <Card key={term.term} className="p-6 hover:shadow-lg transition-shadow duration-200">
                  <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      {IconComponent && (
                        <div className="p-3 rounded-xl bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30">
                          <IconComponent className="w-6 h-6 text-orange-600" />
                        </div>
                      )}
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-xl font-medium">{term.term}</h3>
                          <Badge className={`text-xs ${getCategoryColor(term.category)}`}>
                            {term.category}
                          </Badge>
                          {term.pronunciation && (
                            <span className="text-sm text-muted-foreground italic">
                              /{term.pronunciation}/
                            </span>
                          )}
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-medium text-sm mb-1">Definition</h4>
                            <p className="text-sm text-muted-foreground bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                              {term.definition}
                            </p>
                          </div>
                          
                          <div>
                            <h4 className="font-medium text-sm mb-1">Description</h4>
                            <p className="text-sm text-muted-foreground">
                              {term.description}
                            </p>
                          </div>
                          
                          <div>
                            <h4 className="font-medium text-sm mb-1">Significance</h4>
                            <p className="text-sm text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                              {term.significance}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="lg:w-80 space-y-4">
                      {term.examples && term.examples.length > 0 && (
                        <div>
                          <h4 className="font-medium text-sm mb-2">Examples</h4>
                          <div className="space-y-1">
                            {term.examples.map((example, index) => (
                              <div key={index} className="text-xs bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-2 py-1 rounded">
                                {example}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {term.relatedTerms && term.relatedTerms.length > 0 && (
                        <div>
                          <h4 className="font-medium text-sm mb-2">Related Terms</h4>
                          <div className="flex flex-wrap gap-1">
                            {term.relatedTerms.map((relatedTerm, index) => (
                              <Badge key={index} variant="outline" className="text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground">
                                {relatedTerm}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {filteredTerms.length === 0 && (
            <Card className="p-12 text-center">
              <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No terms found</h3>
              <p className="text-muted-foreground">Try adjusting your search or selecting a different category</p>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Quick Reference Footer */}
      <Card className="p-6 bg-gradient-to-r from-orange-50 via-yellow-50 to-red-50 dark:from-orange-900/10 dark:via-yellow-900/10 dark:to-red-900/10 border-0">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg">
            <Flower2 className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="font-medium text-orange-800 dark:text-orange-300 mb-2">Quick Reference Guide</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-medium text-orange-700 dark:text-orange-400">Three Doshas:</span>
                <span className="text-orange-600 dark:text-orange-500"> Vata (Air+Space), Pitta (Fire+Water), Kapha (Earth+Water)</span>
              </div>
              <div>
                <span className="font-medium text-orange-700 dark:text-orange-400">Six Tastes:</span>
                <span className="text-orange-600 dark:text-orange-500"> Sweet, Sour, Salty, Pungent, Bitter, Astringent</span>
              </div>
              <div>
                <span className="font-medium text-orange-700 dark:text-orange-400">Core Principles:</span>
                <span className="text-orange-600 dark:text-orange-500"> Agni (Digestive Fire), Ojas (Immunity), Ama (Toxins)</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}