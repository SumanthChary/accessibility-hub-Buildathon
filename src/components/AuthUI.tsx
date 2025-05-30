import { useState } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

export const AuthUI = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const appearance = {
    theme: ThemeSupa,
    variables: {
      default: {
        colors: {
          brand: '#2563eb',
          brandAccent: '#1d4ed8',
        },
      },
    },
    className: {
      container: 'w-full',
      button: 'w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700',
      input: 'w-full px-3 py-2 border rounded',
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Welcome to Accessibility Hub
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in or create an account to continue
          </p>
        </div>

        <Auth
          supabaseClient={supabase}
          appearance={appearance}
          providers={['google', 'github']}
          view="magic_link"
          showLinks={true}
          redirectTo={`${window.location.origin}/auth/callback`}
          magicLink={true}
          onlyThirdPartyProviders={false}
        />
      </div>
    </div>
  );
};
