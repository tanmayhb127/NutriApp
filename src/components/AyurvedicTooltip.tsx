import { ReactNode } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { Badge } from './ui/badge';
import { Flower2, Book, Star } from 'lucide-react';

interface AyurvedicTermDefinition {
  term: string;
  definition: string;
  category: string;
  pronunciation?: string;
  examples?: string[];
  significance?: string;
}

// Comprehensive Ayurvedic terms database
const ayurvedicTerms: Record<string, AyurvedicTermDefinition> = {
  // Doshas
  vata: {
    term: 'Vata',
    definition: 'The biological energy governing movement and circulation in the body',
    category: 'Dosha',
    pronunciation: 'VAH-ta',
    examples: ['Controls breathing', 'Manages circulation', 'Governs nervous system'],
    significance: 'Primary dosha that needs balance for overall health'
  },
  pitta: {
    term: 'Pitta',
    definition: 'The biological energy governing digestion and metabolism',
    category: 'Dosha',
    pronunciation: 'PIT-ta',
    examples: ['Controls digestion', 'Manages body temperature', 'Governs metabolism'],
    significance: 'Responsible for all transformations in body and mind'
  },
  kapha: {
    term: 'Kapha',
    definition: 'The biological energy governing structure and immunity',
    category: 'Dosha',
    pronunciation: 'KAH-fa',
    examples: ['Provides structure', 'Maintains immunity', 'Governs stability'],
    significance: 'Foundation of physical strength and emotional resilience'
  },
  
  // Core Concepts
  agni: {
    term: 'Agni',
    definition: 'Digestive fire responsible for transformation and metabolism',
    category: 'Digestion',
    pronunciation: 'AG-ni',
    examples: ['Strong appetite', 'Clear skin', 'Good energy levels'],
    significance: 'Central to health - all diseases begin with compromised agni'
  },
  ama: {
    term: 'Ama',
    definition: 'Undigested food matter and toxins that accumulate in the body',
    category: 'Toxins',
    pronunciation: 'AH-ma',
    examples: ['White coating on tongue', 'Fatigue after eating', 'Joint stiffness'],
    significance: 'Root cause of most diseases in Ayurveda'
  },
  ojas: {
    term: 'Ojas',
    definition: 'The essence of immunity and vital energy in the body',
    category: 'Immunity',
    pronunciation: 'OH-jas',
    examples: ['Glowing skin', 'Strong immunity', 'Mental clarity'],
    significance: 'Determines longevity and quality of life'
  },
  prana: {
    term: 'Prana',
    definition: 'Life force energy that animates all living beings',
    category: 'Energy',
    pronunciation: 'PRAH-na',
    examples: ['Breath quality', 'Vitality', 'Life energy'],
    significance: 'Essential for all life processes and consciousness'
  },
  
  // Constitution
  prakriti: {
    term: 'Prakriti',
    definition: 'Individual constitutional type determined at conception',
    category: 'Constitution',
    pronunciation: 'pra-KRI-ti',
    examples: ['Vata constitution', 'Pitta constitution', 'Kapha constitution'],
    significance: 'Blueprint for personalized health and nutrition'
  },
  vikriti: {
    term: 'Vikriti',
    definition: 'Current state of doshic imbalance different from natural constitution',
    category: 'Constitution',
    pronunciation: 'vi-KRI-ti',
    examples: ['Vata excess', 'Pitta aggravation', 'Kapha accumulation'],
    significance: 'Guide for therapeutic interventions and lifestyle modifications'
  },
  
  // Tastes
  rasa: {
    term: 'Rasa',
    definition: 'The six tastes that affect the doshas and overall health',
    category: 'Taste',
    pronunciation: 'RAH-sa',
    examples: ['Sweet', 'Sour', 'Salty', 'Pungent', 'Bitter', 'Astringent'],
    significance: 'Foundation of Ayurvedic nutrition and meal planning'
  },
  madhura: {
    term: 'Madhura',
    definition: 'Sweet taste that nourishes and satisfies but can increase Kapha',
    category: 'Taste',
    pronunciation: 'ma-DHU-ra',
    examples: ['Rice', 'Milk', 'Dates', 'Sweet fruits'],
    significance: 'Most nourishing taste but should be consumed in moderation'
  },
  katu: {
    term: 'Katu',
    definition: 'Pungent taste that stimulates digestion and circulation',
    category: 'Taste',
    pronunciation: 'ka-TU',
    examples: ['Ginger', 'Black pepper', 'Chili', 'Garlic'],
    significance: 'Essential for digestive fire but can aggravate heat conditions'
  },
  tikta: {
    term: 'Tikta',
    definition: 'Bitter taste that detoxifies and reduces Pitta and Kapha',
    category: 'Taste',
    pronunciation: 'TIK-ta',
    examples: ['Turmeric', 'Neem', 'Bitter gourd', 'Green leafy vegetables'],
    significance: 'Important for liver health and natural detoxification'
  },
  
  // Food Properties
  virya: {
    term: 'Virya',
    definition: 'Heating or cooling potency of foods and herbs',
    category: 'Food Property',
    pronunciation: 'VEER-ya',
    examples: ['Heating: ginger, pepper', 'Cooling: coconut, cucumber'],
    significance: 'Important for selecting foods according to season and constitution'
  },
  vipaka: {
    term: 'Vipaka',
    definition: 'Post-digestive effect of foods after complete digestion',
    category: 'Food Property',
    pronunciation: 'vi-PA-ka',
    examples: ['Sweet vipaka: grains', 'Sour vipaka: fruits', 'Pungent vipaka: legumes'],
    significance: 'Determines long-term effects of foods on the body'
  },
  
  // Physiology
  srotas: {
    term: 'Srotas',
    definition: 'Channels or pathways that transport nutrients and waste in the body',
    category: 'Physiology',
    pronunciation: 'SHRO-tas',
    examples: ['Blood vessels', 'Lymphatic system', 'Respiratory tract', 'Digestive tract'],
    significance: 'Health depends on clear, unobstructed flow through all channels'
  },
  dhatu: {
    term: 'Dhatu',
    definition: 'The seven tissues that form and maintain the physical body',
    category: 'Physiology',
    pronunciation: 'DHA-tu',
    examples: ['Plasma', 'Blood', 'Muscle', 'Fat', 'Bone', 'Nerve', 'Reproductive'],
    significance: 'Building blocks of physical body requiring proper nutrition'
  },
  
  // Lifestyle
  dinacharya: {
    term: 'Dinacharya',
    definition: 'Daily routine aligned with natural rhythms for optimal health',
    category: 'Lifestyle',
    pronunciation: 'di-na-char-YA',
    examples: ['Wake before sunrise', 'Exercise in morning', 'Largest meal at noon'],
    significance: 'Foundation of preventive healthcare in Ayurveda'
  },
  ritucharya: {
    term: 'Ritucharya',
    definition: 'Seasonal routine and dietary guidelines for maintaining balance',
    category: 'Lifestyle',
    pronunciation: 'ri-tu-char-YA',
    examples: ['Warm foods in winter', 'Cooling foods in summer', 'Detox in spring'],
    significance: 'Helps adapt to seasonal changes and prevent seasonal disorders'
  },
  
  // Mental States
  sattva: {
    term: 'Sattva',
    definition: 'Mental quality representing purity, clarity, and harmony',
    category: 'Mental Quality',
    pronunciation: 'SAT-tva',
    examples: ['Mental clarity', 'Compassion', 'Wisdom', 'Peace'],
    significance: 'Ideal mental state for health and spiritual growth'
  },
  rajas: {
    term: 'Rajas',
    definition: 'Mental quality representing activity, passion, and restlessness',
    category: 'Mental Quality',
    pronunciation: 'RA-jas',
    examples: ['Hyperactivity', 'Ambition', 'Anger', 'Desire'],
    significance: 'Can be motivating but excess leads to stress and imbalance'
  },
  tamas: {
    term: 'Tamas',
    definition: 'Mental quality representing inertia, darkness, and ignorance',
    category: 'Mental Quality',
    pronunciation: 'TA-mas',
    examples: ['Lethargy', 'Depression', 'Confusion', 'Attachment'],
    significance: 'Necessary for rest but excess leads to stagnation and disease'
  }
};

// Function to detect and wrap Ayurvedic terms in text
export function wrapAyurvedicTerms(text: string): ReactNode {
  const words = text.split(/(\s+)/);
  
  return words.map((word, index) => {
    const cleanWord = word.toLowerCase().replace(/[^\w]/g, '');
    const termData = ayurvedicTerms[cleanWord];
    
    if (termData) {
      return (
        <AyurvedicTooltip key={index} termData={termData}>
          <span className="cursor-help underline decoration-dotted decoration-orange-500 hover:decoration-solid hover:text-orange-700 dark:hover:text-orange-400 transition-colors">
            {word}
          </span>
        </AyurvedicTooltip>
      );
    }
    
    return <span key={index}>{word}</span>;
  });
}

interface AyurvedicTooltipProps {
  children: ReactNode;
  termData: AyurvedicTermDefinition;
}

function AyurvedicTooltip({ children, termData }: AyurvedicTooltipProps) {
  const getCategoryColor = (category: string) => {
    const colors = {
      'Dosha': 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/20 dark:text-orange-300',
      'Taste': 'bg-pink-100 text-pink-800 border-pink-200 dark:bg-pink-900/20 dark:text-pink-300',
      'Digestion': 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300',
      'Constitution': 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300',
      'Food Property': 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300',
      'Physiology': 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300',
      'Lifestyle': 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300',
      'Mental Quality': 'bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-300',
      'Toxins': 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-300',
      'Immunity': 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300',
      'Energy': 'bg-cyan-100 text-cyan-800 border-cyan-200 dark:bg-cyan-900/20 dark:text-cyan-300'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent className="max-w-sm p-0 bg-white dark:bg-gray-900 border-0 shadow-2xl">
          <div className="p-4 space-y-3">
            {/* Header */}
            <div className="flex items-center gap-3 pb-2 border-b">
              <div className="p-1.5 bg-gradient-to-br from-orange-500 to-red-500 rounded-md">
                <Flower2 className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">{termData.term}</h4>
                  <Badge className={`text-xs ${getCategoryColor(termData.category)}`}>
                    {termData.category}
                  </Badge>
                </div>
                {termData.pronunciation && (
                  <p className="text-xs text-muted-foreground italic">
                    /{termData.pronunciation}/
                  </p>
                )}
              </div>
            </div>
            
            {/* Definition */}
            <div>
              <h5 className="text-xs font-medium flex items-center gap-1 mb-1">
                <Book className="w-3 h-3" />
                Definition
              </h5>
              <p className="text-sm text-muted-foreground">
                {termData.definition}
              </p>
            </div>
            
            {/* Examples */}
            {termData.examples && termData.examples.length > 0 && (
              <div>
                <h5 className="text-xs font-medium mb-1">Examples</h5>
                <div className="flex flex-wrap gap-1">
                  {termData.examples.slice(0, 3).map((example, index) => (
                    <span key={index} className="text-xs bg-muted px-2 py-0.5 rounded">
                      {example}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Significance */}
            {termData.significance && (
              <div>
                <h5 className="text-xs font-medium flex items-center gap-1 mb-1">
                  <Star className="w-3 h-3" />
                  Significance
                </h5>
                <p className="text-xs text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 p-2 rounded">
                  {termData.significance}
                </p>
              </div>
            )}
            
            {/* Footer */}
            <div className="pt-2 border-t">
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Flower2 className="w-3 h-3 text-orange-500" />
                Ancient Ayurvedic Wisdom
              </p>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

// Utility component for wrapping text content
interface AyurvedicTextProps {
  children: string;
  className?: string;
}

export function AyurvedicText({ children, className }: AyurvedicTextProps) {
  return (
    <span className={className}>
      {wrapAyurvedicTerms(children)}
    </span>
  );
}

export { AyurvedicTooltip, ayurvedicTerms };