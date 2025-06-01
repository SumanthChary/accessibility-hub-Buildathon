
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

export const Testimonials = () => {
  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'UX Director',
      company: 'TechFlow Inc',
      content: 'This platform transformed how we approach accessibility. Setup took minutes, impact was immediate.',
      rating: 5,
      avatar: 'SC'
    },
    {
      name: 'Marcus Johnson',
      role: 'Accessibility Consultant',
      company: 'Digital Inclusion Co',
      content: 'Finally, a tool that makes accessibility implementation straightforward and effective.',
      rating: 5,
      avatar: 'MJ'
    },
    {
      name: 'Elena Rodriguez',
      role: 'Product Manager',
      company: 'EduTech Solutions',
      content: 'The AI-powered features are incredibly accurate. Our users love the improved experience.',
      rating: 5,
      avatar: 'ER'
    },
    {
      name: 'David Kim',
      role: 'Frontend Developer',
      company: 'WebCraft Studio',
      content: 'Integration was seamless. The documentation is clear and the support team is responsive.',
      rating: 5,
      avatar: 'DK'
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Loved by Developers & Designers
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of professionals making the web more accessible
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium mr-3">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-xs text-gray-500">{testimonial.role}</p>
                    <p className="text-xs text-blue-600">{testimonial.company}</p>
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
