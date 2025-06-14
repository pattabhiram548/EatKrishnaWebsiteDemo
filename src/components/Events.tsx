import React from 'react';
import { Card } from '@mui/material';
import { Calendar, Clock, MapPin } from 'lucide-react';

const Events: React.FC = () => {
  const events = [
    {
      title: "Annual Harvest Festival",
      date: "March 15-17, 2024",
      time: "9:00 AM - 6:00 PM",
      location: "Village Center",
      description: "Celebrate our agricultural heritage with traditional performances, food stalls, and cultural exhibitions.",
      type: "Festival",
      color: "bg-orange-500"
    },
    {
      title: "Community Health Camp",
      date: "February 28, 2024",
      time: "8:00 AM - 4:00 PM",
      location: "Primary Health Center",
      description: "Free health checkups, vaccinations, and health awareness programs for all age groups.",
      type: "Health",
      color: "bg-red-500"
    },
    {
      title: "Educational Workshop",
      date: "April 5, 2024",
      time: "10:00 AM - 3:00 PM",
      location: "Community School",
      description: "Digital literacy workshop for adults and skill development programs for youth.",
      type: "Education",
      color: "bg-blue-500"
    },
    {
      title: "Temple Anniversary",
      date: "May 12, 2024",
      time: "5:00 AM - 10:00 PM",
      location: "Village Temple",
      description: "Special prayers, cultural performances, and community feast celebrating our temple's foundation.",
      type: "Religious",
      color: "bg-purple-500"
    }
  ];

  return (
    <section id="events" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Upcoming Events
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Join us in celebrating our community spirit through various cultural, 
            educational, and social events throughout the year.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {events.map((event, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className={`h-2 ${event.color}`}></div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold text-white ${event.color} mb-2`}>
                      {event.type}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900">
                      {event.title}
                    </h3>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="text-sm">{event.date}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    <span className="text-sm">{event.time}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed mb-4">
                  {event.description}
                </p>

                <button className={`w-full py-2 px-4 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity duration-200 ${event.color}`}>
                  Learn More
                </button>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Card className="p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Want to Organize an Event?
            </h3>
            <p className="text-gray-600 mb-6">
              Contact our community coordinators to plan and promote your event.
            </p>
            <button className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors duration-200">
              Contact Organizers
            </button>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Events;