
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Star, Zap, Crown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';

export const PricingPlans = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handlePlanClick = (planName: string) => {
    if (planName === 'Free') {
      if (!user) {
        navigate('/auth');
      }
      return;
    }
    
    if (planName === 'Pro') {
      navigate('/payments');
      return;
    }
    
    if (planName === 'Enterprise') {
      // For enterprise, you might want to navigate to a contact form
      navigate('/payments');
    }
  };

  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for trying out our platform",
      features: [
        "5 audio transcriptions per month",
        "10 image analyses per month",
        "5 PDF processing per month",
        "Basic accessibility features",
        "Community support"
      ],
      icon: Star,
      buttonText: "Get Started Free",
      popular: false,
      color: "from-gray-400 to-gray-600"
    },
    {
      name: "Pro",
      price: "$29",
      period: "per month",
      description: "For professionals and small teams",
      features: [
        "500 audio transcriptions per month",
        "1000 image analyses per month",
        "200 PDF processing per month",
        "Advanced accessibility features",
        "Priority support",
        "API access",
        "Custom integrations"
      ],
      icon: Zap,
      buttonText: "Start Pro Trial",
      popular: true,
      color: "from-blue-500 to-purple-600"
    },
    {
      name: "Enterprise",
      price: "$99",
      period: "per month",
      description: "For large organizations and teams",
      features: [
        "Unlimited processing",
        "Custom AI models",
        "White-label solution",
        "Dedicated support manager",
        "SLA guarantee",
        "Custom integrations",
        "Advanced analytics",
        "SAML SSO"
      ],
      icon: Crown,
      buttonText: "Contact Sales",
      popular: false,
      color: "from-purple-600 to-pink-600"
    }
  ];

  return (
    <section id="pricing" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-4 sm:mb-6">
            Choose Your Plan
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto">
            Scale your accessibility efforts with plans designed for every need
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm ${
                plan.popular ? 'ring-2 ring-blue-500 scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <CardHeader className="text-center pb-8">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${plan.color} p-0.5`}>
                  <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center">
                    <plan.icon className="h-8 w-8 text-slate-700" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold text-slate-800">
                  {plan.name}
                </CardTitle>
                <div className="mt-4">
                  <span className="text-3xl sm:text-4xl font-bold text-slate-800">{plan.price}</span>
                  <span className="text-slate-600 ml-2">/{plan.period}</span>
                </div>
                <p className="text-slate-600 mt-2">{plan.description}</p>
              </CardHeader>

              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-slate-600 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full mt-8 ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white' 
                      : 'bg-slate-800 hover:bg-slate-900 text-white'
                  }`}
                  size="lg"
                  onClick={() => handlePlanClick(plan.name)}
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-12">
          <p className="text-slate-600">
            All plans include our core accessibility features. Need something custom?{' '}
            <a href="#contact" className="text-blue-600 hover:underline font-semibold">
              Contact us
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};
