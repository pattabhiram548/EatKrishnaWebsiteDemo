import React from 'react';
import { Card } from '@mui/material';
import { Award, Heart, Leaf, Users } from 'lucide-react';

const About: React.FC = () => {
  const features = [
    {
      icon: Award,
      title: "Premium Quality",
      description: "We use only the finest ingredients and traditional methods to ensure exceptional quality in every product.",
      color: "text-yellow-600"
    },
    {
      icon: Heart,
      title: "Made with Love",
      description: "Each product is crafted with care and passion, following recipes passed down through generations.",
      color: "text-red-600"
    },
    {
      icon: Leaf,
      title: "Natural & Healthy",
      description: "Our millet-based products are naturally nutritious, free from artificial preservatives and additives.",
      color: "text-green-600"
    },
    {
      icon: Users,
      title: "Family Tradition",
      description: "A family business rooted in tradition, bringing authentic flavors from our kitchen to yours.",
      color: "text-blue-600"
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            About EatKrishna
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover the story behind our authentic millet foods and the passion 
            that drives us to bring you the finest traditional sweets and snacks.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <Card className="p-8 h-full shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Story</h3>
              <div className="space-y-4 text-gray-700">
                <p>
                  EatKrishna began as a small family venture with a simple mission: 
                  to share the authentic taste of traditional millet-based foods with 
                  the world. Our journey started in our grandmother's kitchen, where 
                  age-old recipes were carefully preserved and perfected.
                </p>
                <p>
                  Today, we continue this legacy by combining traditional cooking 
                  methods with modern food safety standards. Every laddu, every snack 
                  is made with the same love and attention to detail that has been 
                  our hallmark for generations.
                </p>
                <p>
                  We believe in the power of millets - these ancient grains that are 
                  not only delicious but also incredibly nutritious. Our products 
                  are a testament to the rich culinary heritage of our region.
                </p>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="text-3xl font-bold text-orange-600 mb-2">50+</div>
              <div className="text-gray-700">Product Varieties</div>
            </Card>
            <Card className="p-6 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
              <div className="text-gray-700">Natural Ingredients</div>
            </Card>
            <Card className="p-6 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="text-3xl font-bold text-blue-600 mb-2">25+</div>
              <div className="text-gray-700">Years Experience</div>
            </Card>
            <Card className="p-6 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="text-3xl font-bold text-purple-600 mb-2">1000+</div>
              <div className="text-gray-700">Happy Customers</div>
            </Card>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow duration-300">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-gray-50 ${feature.color}`}>
                <feature.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;