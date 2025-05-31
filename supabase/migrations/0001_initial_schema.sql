-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE,
    email TEXT UNIQUE,
    full_name TEXT,
    avatar_url TEXT,
    updated_at TIMESTAMP WITH TIME ZONE,
    api_quota INTEGER DEFAULT 1000,
    subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'pro', 'enterprise')),
    PRIMARY KEY (id)
);

-- Create RLS policies for profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

-- Create processing quota table
CREATE TABLE IF NOT EXISTS public.processing_quota (
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    audio_minutes INTEGER DEFAULT 60,
    image_count INTEGER DEFAULT 100,
    pdf_pages INTEGER DEFAULT 500,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id)
);

-- Create RLS policies for processing_quota
ALTER TABLE public.processing_quota ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own quota"
    ON public.processing_quota FOR SELECT
    USING (auth.uid() = user_id);

-- Create processing history table
CREATE TABLE IF NOT EXISTS public.processing_history (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    type TEXT CHECK (type IN ('audio', 'image', 'pdf')),
    file_name TEXT NOT NULL,
    file_size INTEGER NOT NULL,
    processing_time BIGINT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create RLS policies for processing_history
ALTER TABLE public.processing_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own processing history"
    ON public.processing_history FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own processing history"
    ON public.processing_history FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Create function to handle user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    -- Create profile
    INSERT INTO public.profiles (id, email, full_name, avatar_url)
    VALUES (
        NEW.id,
        NEW.email,
        NEW.raw_user_meta_data->>'full_name',
        NEW.raw_user_meta_data->>'avatar_url'
    );

    -- Create initial quota
    INSERT INTO public.processing_quota (user_id)
    VALUES (NEW.id);

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user handling
CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create reset quota function
CREATE OR REPLACE FUNCTION public.reset_monthly_quota()
RETURNS void AS $$
BEGIN
    UPDATE public.processing_quota
    SET 
        audio_minutes = CASE 
            WHEN profiles.subscription_tier = 'free' THEN 60
            WHEN profiles.subscription_tier = 'pro' THEN 300
            WHEN profiles.subscription_tier = 'enterprise' THEN 1000
            ELSE 60
        END,
        image_count = CASE 
            WHEN profiles.subscription_tier = 'free' THEN 100
            WHEN profiles.subscription_tier = 'pro' THEN 500
            WHEN profiles.subscription_tier = 'enterprise' THEN 2000
            ELSE 100
        END,
        pdf_pages = CASE 
            WHEN profiles.subscription_tier = 'free' THEN 500
            WHEN profiles.subscription_tier = 'pro' THEN 2000
            WHEN profiles.subscription_tier = 'enterprise' THEN 10000
            ELSE 500
        END,
        updated_at = CURRENT_TIMESTAMP
    FROM public.profiles
    WHERE public.processing_quota.user_id = profiles.id;
