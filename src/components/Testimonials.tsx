
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';

export const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Accessibility Consultant",
      company: "Microsoft",
      content: "This tool has revolutionized how we approach accessibility. What used to take hours now takes minutes.",
      rating: 5,
      avatar: "SC"
    },
    {
      name: "Marcus Rodriguez", 
      role: "UX Designer",
      company: "Google",
      content: "Absolutely game-changing. The AI-powered features are incredibly accurate and save us countless hours.",
      rating: 5,
      avatar: "MR"
    },
    {
      name: "Dr. Emily Watson",
      role: "Disability Rights Advocate",
      company: "W3C",
      content: "Finally, a tool that truly understands accessibility. This is the future we've been waiting for.",
      rating: 5,
      avatar: "EW"
    },
    {
      name: "Alex Kim",
      role: "Frontend Developer",
      company: "Airbnb",
      content: "The speed and accuracy are unmatched. Our entire team now uses this for every project.",
      rating: 5,
      avatar: "AK"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
            Loved by Accessibility Experts
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Join thousands of developers, designers, and advocates who trust AccessibilityHub
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <Quote className="h-8 w-8 text-blue-500 opacity-50" />
                </div>
                
                <p className="text-slate-700 text-lg leading-relaxed mb-6 italic">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">{testimonial.name}</h4>
                    <p className="text-slate-600 text-sm">{testimonial.role} at {testimonial.company}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
