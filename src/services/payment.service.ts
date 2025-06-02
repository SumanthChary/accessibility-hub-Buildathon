
import { supabase } from '@/integrations/supabase/client';

export interface PaymentPlan {
  id: string;
  name: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
}

export const createCheckoutSession = async (planId: string, isSubscription: boolean = true) => {
  try {
    const { data, error } = await supabase.functions.invoke('create-checkout-session', {
      body: {
        planId,
        isSubscription,
        successUrl: `${window.location.origin}/payments?success=true`,
        cancelUrl: `${window.location.origin}/payments?canceled=true`,
      },
    });

    if (error) throw error;

    if (data?.url) {
      // Open Stripe checkout in same window for better UX
      window.location.href = data.url;
    }

    return data;
  } catch (error) {
    console.error('Payment error:', error);
    throw error;
  }
};

export const createOneTimePayment = async (amount: number, description: string) => {
  try {
    const { data, error } = await supabase.functions.invoke('create-checkout-session', {
      body: {
        planId: 'one_time',
        amount: amount * 100, // Convert to cents
        description,
        isSubscription: false,
        successUrl: `${window.location.origin}/payments?success=true`,
        cancelUrl: `${window.location.origin}/payments?canceled=true`,
      },
    });

    if (error) throw error;

    if (data?.url) {
      window.location.href = data.url;
    }

    return data;
  } catch (error) {
    console.error('Payment error:', error);
    throw error;
  }
};
