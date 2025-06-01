
import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  CreditCard, 
  ArrowLeft, 
  Check, 
  Star, 
  Zap, 
  Shield, 
  Users,
  Crown,
  Sparkles
} from 'lucide-react';

export const Payments = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState<string | null>(null);

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for getting started',
      features: [
        '5 transformations per month',
        'Basic accessibility features',
        'Email support',
        'Community access'
      ],
      icon: Users,
      popular: false,
      current: true
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '$19',
      period: 'per month',
      description: 'For professionals and small teams',
      features: [
        'Unlimited transformations',
        'Advanced AI features',
        'Priority support',
        'Custom integrations',
        'Analytics dashboard',
        'API access'
      ],
      icon: Zap,
      popular: true,
      current: false
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '$99',
      period: 'per month',
      description: 'For large organizations',
      features: [
        'Everything in Pro',
        'White-label solution',
        'Dedicated support',
        'Custom training',
        'SLA guarantee',
        'On-premise deployment'
      ],
      icon: Crown,
      popular: false,
      current: false
    }
  ];

  const handleSubscribe = async (planId: string) => {
    if (!user) {
      navigate('/auth');
      return;
    }

    setLoading(planId);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: 'Subscription Updated',
        description: `Successfully subscribed to ${plans.find(p => p.id === planId)?.name} plan!`,
      });
    } catch (error) {
      toast({
        title: 'Subscription Failed',
        description: 'Failed to update subscription. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Select the perfect plan for your accessibility needs. Upgrade or downgrade anytime.
            </p>
          </div>
        </div>

        {/* Current Plan Status */}
        {user && (
          <Card className="mb-8 border-blue-200 bg-blue-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Current Plan: Free</h3>
                    <p className="text-sm text-gray-600">3 of 5 transformations used this month</p>
                  </div>
                </div>
                <Badge variant="secondary">Active</Badge>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <Card 
                key={plan.id} 
                className={`relative ${plan.popular ? 'border-blue-500 shadow-lg scale-105' : ''} ${plan.current ? 'border-green-500' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white px-3 py-1">
                      <Star className="h-3 w-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                {plan.current && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-green-600 text-white px-3 py-1">
                      <Check className="h-3 w-3 mr-1" />
                      Current Plan
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-2">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-6 w-6 text-gray-700" />
                  </div>
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <div className="text-3xl font-bold text-gray-900">
                    {plan.price}
                    <span className="text-sm font-normal text-gray-500">/{plan.period}</span>
                  </div>
                  <CardDescription className="text-sm">{plan.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="pt-2">
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Button
                    className={`w-full ${plan.current ? 'bg-gray-400' : plan.popular ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                    variant={plan.current ? 'secondary' : plan.popular ? 'default' : 'outline'}
                    disabled={plan.current || loading === plan.id}
                    onClick={() => handleSubscribe(plan.id)}
                  >
                    {loading === plan.id ? (
                      'Processing...'
                    ) : plan.current ? (
                      'Current Plan'
                    ) : plan.id === 'free' ? (
                      'Downgrade'
                    ) : (
                      'Upgrade Now'
                    )}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Features Comparison */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              Why Choose Pro?
            </CardTitle>
            <CardDescription>
              Unlock the full potential of accessibility transformation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <Shield className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Enterprise Security</h3>
                <p className="text-sm text-gray-600">SOC 2 compliant with enterprise-grade security</p>
              </div>
              <div className="text-center">
                <Zap className="h-8 w-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Lightning Fast</h3>
                <p className="text-sm text-gray-600">Process files up to 10x faster with priority queues</p>
              </div>
              <div className="text-center">
                <Users className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Team Collaboration</h3>
                <p className="text-sm text-gray-600">Share projects and collaborate with your team</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};
