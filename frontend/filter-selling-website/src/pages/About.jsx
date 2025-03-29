import { motion } from "framer-motion";
import { FiUsers, FiAward, FiGlobe, FiHeart } from "react-icons/fi";
import { Link } from "react-router-dom";

const About = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "https://img.freepik.com/free-photo/lifestyle-people-emotions-casual-concept-confident-nice-smiling-asian-woman-cross-arms-chest-confident-ready-help-listening-coworkers-taking-part-conversation_1258-59335.jpg",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Lead Engineer",
      image: "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg",
    
     },
    {
      id: 3,
      name: "Emma Wilson",
      role: "Product Designer",
      image: "https://media.istockphoto.com/id/1262199842/photo/profile-picture-of-millennial-asian-girl-posing.jpg?s=612x612&w=0&k=20&c=5ExXDFJNZs101kPocW68ELA-2g7_acsdlE4zteQ7Zhc=",
    },
  ];

  const stats = [
    { id: 1, value: "12+", label: "Years Experience", icon: <FiAward /> },
    { id: 2, value: "5000+", label: "Products Sold", icon: <FiHeart /> },
    { id: 3, value: "50+", label: "Countries Served", icon: <FiGlobe /> },
    { id: 4, value: "98%", label: "Happy Customers", icon: <FiUsers /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-indigo-600 to-teal-500 text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            About{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-indigo-200">
              AquaPure
            </span>
          </motion.h1>
          <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto">
            Pioneering water purification solutions for a healthier tomorrow
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Our Mission
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              To provide accessible, sustainable water purification solutions
              that empower communities worldwide. We combine cutting-edge
              technology with environmental responsibility to deliver pure water
              for all.
            </p>
            <Link
              to="/products"
              className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Explore Products
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative h-80 bg-gray-100 rounded-2xl overflow-hidden shadow-xl"
          >
            <img
              className="w-full h-auto object-cover"
              src="https://media.licdn.com/dms/image/v2/C4E1BAQHMvqjnHiBQ_w/company-background_10000/company-background_10000/0/1585499980564/missionfiltration_cover?e=2147483647&v=beta&t=NT3Ciyb1up_ciPIZbjyB9xhblZuUlePvK_TKc0Qcn7k"
              alt="mission"
            />
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-gray-50 rounded-xl"
            >
              <div className="text-4xl text-indigo-600 mb-4 mx-auto">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

    {/* Team Section */}
<section className="py-20">
  <div className="container mx-auto px-6">
    <h2 className="text-3xl font-bold text-center mb-16 text-gray-800">
      Meet Our Team
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {teamMembers.map((member) => (
        <motion.div
          key={member.id}
          whileHover={{ y: -10 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
        >
          <div className="h-64 bg-gray-100">
            {/* Add the image here */}
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6 text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {member.name}
            </h3>
            <p className="text-gray-600 mb-4">{member.role}</p>
            <div className="flex justify-center space-x-4">
              {/* Add social media icons or any other links here */}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>


      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-600 to-teal-500">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Join Our Clean Water Mission
          </h2>
          <p className="text-gray-100 text-xl mb-8 max-w-2xl mx-auto">
            Together, we can make clean water accessible to everyone. Explore
            our solutions or partner with us to create lasting change.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link
              to="/contact"
              className="bg-white text-indigo-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              Get in Touch
            </Link>
            <Link
              to="/products"
              className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-indigo-600 transition-colors font-semibold"
            >
              View Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
