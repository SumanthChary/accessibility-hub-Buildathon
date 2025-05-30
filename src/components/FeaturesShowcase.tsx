
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Zap, Shield, Heart, Globe, Users } from 'lucide-react';

export const FeaturesShowcase = () => {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Transform content in under 3 seconds. No waiting, no delays.",
      color: "from-yellow-400 to-orange-500"
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your data stays yours. Zero storage, maximum security.",
      color: "from-green-400 to-blue-500"
    },
    {
      icon: Globe,
      title: "Universal Support",
      description: "Works with any website, document, or video format.",
      color: "from-blue-400 to-purple-500"
    },
    {
      icon: Users,
      title: "1.3B+ Impact",
      description: "Serving the global accessibility community.",
      color: "from-purple-400 to-pink-500"
    },
    {
      icon: Heart,
      title: "Built with Love",
      description: "Created by accessibility advocates for real impact.",
      color: "from-pink-400 to-red-500"
    },
    {
      icon: Sparkles,
      title: "AI Powered",
      description: "Smart algorithms ensure perfect accessibility every time.",
      color: "from-indigo-400 to-cyan-500"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
            Why Choose AccessibilityHub?
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            The most powerful accessibility platform on the planet. Built for speed, designed for impact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${feature.color} p-0.5`}>
                  <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center">
                    <feature.icon className="h-8 w-8 text-slate-700" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
