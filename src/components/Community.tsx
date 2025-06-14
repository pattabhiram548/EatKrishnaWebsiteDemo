import React from 'react';
import { Card } from '@mui/material';
import { Users, GraduationCap, Heart, Leaf } from 'lucide-react';

const Community: React.FC = () => {
  const communityFeatures = [
    {
      icon: Users,
      title: "Village Council",
      description: "Democratic governance ensuring every voice is heard in community decisions and development planning.",
      color: "text-blue-600"
    },
    {
      icon: GraduationCap,
      title: "Education Center",
      description: "Modern school facilities providing quality education from primary to higher secondary levels.",
      color: "text-green-600"
    },
    {
      icon: Heart,
      title: "Healthcare Services",
      description: "Primary healthcare center with qualified medical staff serving our community's health needs.",
      color: "text-red-600"
    },
    {
      icon: Leaf,
      title: "Environmental Care",
      description: "Community-led initiatives for water conservation, waste management, and sustainable practices.",
      color: "text-emerald-600"
    }
  ];

  return (
    <section id="community" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Community
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A thriving community built on cooperation, mutual support, and shared 
            vision for a better tomorrow.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {communityFeatures.map((feature, index) => (
            <Card key={index} className="p-8 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-start space-x-4">
                <div className={`flex-shrink-0 p-3 rounded-lg bg-gray-50 ${feature.color}`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <Card className="p-6 text-center hover:shadow-lg transition-shadow duration-300">
            <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">👨‍👩‍👧‍👦</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Family Values</h3>
            <p className="text-gray-600">Strong family bonds and respect for elders form the foundation of our community.</p>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow duration-300">
            <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🤝</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Mutual Support</h3>
            <p className="text-gray-600">Neighbors helping neighbors in times of need, celebrating together in joy.</p>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow duration-300">
            <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🌟</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Shared Vision</h3>
            <p className="text-gray-600">Working together towards sustainable development and prosperity for all.</p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Community;