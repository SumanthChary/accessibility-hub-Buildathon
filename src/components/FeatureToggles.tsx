
import { Switch } from '@/components/ui/switch';
import { 
  Captions, 
  Eye, 
  Volume2, 
  FileText,
  AccessibilityIcon
} from 'lucide-react';

interface Feature {
  key: string;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface FeatureTogglesProps {
  features: {
    captions: boolean;
    signLanguage: boolean;
    highContrast: boolean;
    textToSpeech: boolean;
    plainLanguage: boolean;
  };
  onToggle: (feature: string) => void;
}

const featureList: Feature[] = [
  {
    key: 'captions',
    label: 'Captions',
    description: 'Auto-generated captions for videos',
    icon: Captions,
  },
  {
    key: 'signLanguage',
    label: 'Sign Language',
    description: 'Sign language interpretation overlay',
    icon: AccessibilityIcon,
  },
  {
    key: 'highContrast',
    label: 'High Contrast',
    description: 'Enhanced visual clarity',
    icon: Eye,
  },
  {
    key: 'textToSpeech',
    label: 'Text-to-Speech',
    description: 'Audio narration support',
    icon: Volume2,
  },
  {
    key: 'plainLanguage',
    label: 'Plain Language',
    description: 'Simplified, clear language',
    icon: FileText,
  },
];

export const FeatureToggles = ({ features, onToggle }: FeatureTogglesProps) => {
  return (
    <section className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-semibold text-slate-800">
          Choose Accessibility Features
        </h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Select the features that will make your content accessible to everyone.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureList.map((feature) => {
            const IconComponent = feature.icon;
            const isActive = features[feature.key as keyof typeof features];
            
            return (
              <div
                key={feature.key}
                className={`p-6 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                  isActive 
                    ? 'border-blue-200 bg-blue-50 shadow-md' 
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                }`}
                onClick={() => onToggle(feature.key)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onToggle(feature.key);
                  }
                }}
                aria-pressed={isActive}
                aria-label={`${isActive ? 'Disable' : 'Enable'} ${feature.label}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg ${
                    isActive ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    <IconComponent className={`h-6 w-6 ${
                      isActive ? 'text-blue-600' : 'text-slate-600'
                    }`} />
                  </div>
                  <Switch
                    checked={isActive}
                    onCheckedChange={() => onToggle(feature.key)}
                    className="data-[state=checked]:bg-blue-600"
                    aria-label={`Toggle ${feature.label}`}
                  />
                </div>
                
                <div className="space-y-2">
                  <h3 className={`font-semibold ${
                    isActive ? 'text-blue-900' : 'text-slate-800'
                  }`}>
                    {feature.label}
                  </h3>
                  <p className={`text-sm ${
                    isActive ? 'text-blue-700' : 'text-slate-600'
                  }`}>
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
