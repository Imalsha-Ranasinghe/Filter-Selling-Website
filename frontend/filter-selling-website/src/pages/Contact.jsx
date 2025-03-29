import { motion } from "framer-motion";
import { FiMail, FiMapPin, FiPhone, FiSend, FiClock } from "react-icons/fi";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const Contact = () => {
  const contactMethods = [
    {
      icon: <FiMapPin />,
      title: "Visit Us",
      details: "456 AquaPure Road\nColombo, Western Province\nSri Lanka, 10100",
      link: "https://maps.app.goo.gl/example", // Update with the actual map link for Sri Lanka
    },
    {
      icon: <FiPhone />,
      title: "Call Us",
      details: "+94 11 123 4567\nMon-Fri: 9am - 5pm SLT",
      link: "tel:+94111234567",
    },
    {
      icon: <FiMail />,
      title: "Email Us",
      details: "support@aquapure.lk\nsales@aquapure.lk",
      link: "mailto:support@aquapure.lk",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-teal-400 to-indigo-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            Get in{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-indigo-200">
              Touch
            </span>
          </motion.h1>
          <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto">
            Have questions about water purification solutions? Our team is ready
            to help you find the perfect fit.
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-20">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {contactMethods.map((method, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-teal-500 text-4xl mb-4">{method.icon}</div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                {method.title}
              </h3>
              <p className="text-gray-600 whitespace-pre-line mb-6">
                {method.details}
              </p>
              <Link
                to={method.link}
                className="text-teal-500 hover:text-teal-600 font-medium flex items-center gap-2"
              >
                Contact via {method.title.toLowerCase()}
                <FiSend className="mt-1" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Send Us a Message
            </h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-100 focus:border-teal-500"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-100 focus:border-teal-500"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-100 focus:border-teal-500"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Message</label>
                <textarea
                  rows="5"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-100 focus:border-teal-500"
                  placeholder="Type your message here..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-teal-500 text-white py-3 rounded-lg hover:bg-teal-600 transition-colors flex items-center justify-center gap-2"
              >
                Send Message
                <FiSend className="text-xl" />
              </button>
            </form>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="h-full rounded-2xl overflow-hidden shadow-xl"
          >
            <div className="h-full bg-gray-100">
              <MapContainer
                center={[6.9271, 79.8612]}
                zoom={13}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[6.9271, 79.8612]}>
                  <Popup>
                    AquaPure Headquarters <br /> Visit us in Colombo, Sri Lanka!
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-20 bg-gradient-to-br from-teal-400 to-indigo-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">Connect With Us</h2>
          <div className="flex justify-center gap-6">
            {["Facebook", "Twitter", "LinkedIn", "Instagram"].map(
              (platform, index) => (
                <motion.a
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  href={`https://${platform.toLowerCase()}.com/aquapure`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow text-teal-500 hover:text-teal-600"
                >
                  <span className="sr-only">{platform}</span>
                  {/* Social Media Icons */}
                  {platform === "Facebook" && <FaFacebook size={30} />}
                  {platform === "Twitter" && <FaTwitter size={30} />}
                  {platform === "LinkedIn" && <FaLinkedin size={30} />}
                  {platform === "Instagram" && <FaInstagram size={30} />}
                </motion.a>
              )
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
