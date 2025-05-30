
import { TrendingUp, Users, Clock, Shield } from 'lucide-react';

export const Stats = () => {
  const stats = [
    {
      icon: Users,
      number: "1.3B+",
      label: "People Need Accessible Content",
      description: "Worldwide disability community"
    },
    {
      icon: Clock,
      number: "3s",
      label: "Average Processing Time",
      description: "Lightning-fast transformations"
    },
    {
      icon: TrendingUp,
      number: "99.2%",
      label: "Accuracy Rate",
      description: "AI-powered precision"
    },
    {
      icon: Shield,
      number: "100%",
      label: "Privacy Protected",
      description: "Zero data storage policy"
    }
  ];

  return (
    <section className="py-16 bg-white border-y border-gray-100">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="h-8 w-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-slate-800 mb-2">{stat.number}</div>
              <div className="font-semibold text-slate-700 mb-1">{stat.label}</div>
              <div className="text-sm text-slate-500">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
