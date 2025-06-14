import React from 'react';
import { Card } from '@mui/material';

const Heritage: React.FC = () => {
  const heritageItems = [
    {
      title: "Ancient Temple",
      description: "Our centuries-old temple stands as the spiritual heart of our community, hosting daily prayers and major festivals.",
      icon: "🏛️",
      color: "orange"
    },
    {
      title: "Traditional Crafts",
      description: "Local artisans continue to practice age-old crafts, creating beautiful pottery, textiles, and wooden artifacts.",
      icon: "🎨",
      color: "blue"
    },
    {
      title: "Folk Music & Dance",
      description: "Our traditional music and dance forms are performed during festivals, preserving our cultural expressions.",
      icon: "🎭",
      color: "green"
    },
    {
      title: "Agricultural Heritage",
      description: "Traditional farming methods combined with modern techniques ensure sustainable agriculture for our community.",
      icon: "🌾",
      color: "yellow"
    },
    {
      title: "Historical Architecture",
      description: "Well-preserved historical buildings showcase the architectural heritage of our ancestors.",
      icon: "🏛️",
      color: "purple"
    },
    {
      title: "Cultural Festivals",
      description: "Annual festivals bring the entire community together, celebrating our traditions with joy and unity.",
      icon: "🎊",
      color: "red"
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      orange: "bg-orange-100 text-orange-600",
      blue: "bg-blue-100 text-blue-600",
      green: "bg-green-100 text-green-600",
      yellow: "bg-yellow-100 text-yellow-600",
      purple: "bg-purple-100 text-purple-600",
      red: "bg-red-100 text-red-600"
    };
    return colorMap[color as keyof typeof colorMap] || "bg-gray-100 text-gray-600";
  };

  return (
    <section id="heritage" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Rich Heritage
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover the cultural treasures and traditions that make EatKrishna 
            a unique and vibrant community with deep historical roots.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {heritageItems.map((item, index) => (
            <Card 
              key={index} 
              className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${getColorClasses(item.color)}`}>
                <span className="text-2xl">{item.icon}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                {item.title}
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                {item.description}
              </p>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Card className="p-8 bg-gradient-to-r from-orange-500 to-yellow-500 text-white">
            <h3 className="text-2xl font-bold mb-4">Preserve Our Heritage</h3>
            <p className="text-lg mb-6">
              Join us in preserving and promoting our cultural heritage for future generations.
            </p>
            <button className="bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
              Get Involved
            </button>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Heritage;