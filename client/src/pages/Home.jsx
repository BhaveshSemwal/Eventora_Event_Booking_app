import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../utils/axios";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaSearch,
  FaRegClock,
  FaTicketAlt,
  FaShieldAlt,
} from "react-icons/fa";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchEvents();
    }, 400);
    return () => clearTimeout(timeoutId);
  }, [search]);

  const fetchEvents = async () => {
    try {
      const { data } = await api.get(`/events?search=${search}`);
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* HERO */}
      <div className="relative bg-black text-white rounded-3xl overflow-hidden mb-16 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
        <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=3000&auto=format&fit=crop')] bg-cover bg-center"></div>

        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-black to-black"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>

        <div className="relative p-10 md:p-20 text-center flex flex-col items-center z-10">
          <span className="bg-white/20 text-white backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6 border border-white/20">
            Welcome to Eventora
          </span>

          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight tracking-tight drop-shadow-2xl">
            Find Your Next <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">
              Unforgettable
            </span>{" "}
            Experience
          </h1>

          <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Discover the best tech conferences, late-night music festivals, and
            hands-on workshops happening directly in your area.
          </p>

          {/* SEARCH */}
          <div className="w-full max-w-2xl mx-auto relative flex items-center shadow-2xl group">
            <FaSearch className="absolute left-6 text-gray-500 text-xl group-focus-within:text-black transition-colors" />
            <input
              type="text"
              placeholder="Search events by title..."
              className="w-full pl-16 pr-6 py-5 rounded-full text-lg text-black bg-white/95 backdrop-blur-sm border-2 border-transparent focus:border-gray-500 focus:outline-none transition-all duration-300 focus:scale-[1.02] placeholder-gray-400 font-medium"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 px-4">
        {[
          {
            icon: <FaRegClock />,
            title: "Fast Booking",
            desc: "Secure your tickets instantly with our fast streamlined booking system.",
          },
          {
            icon: <FaTicketAlt />,
            title: "Seamless Access",
            desc: "Download tickets instantly or manage them easily from dashboard.",
          },
          {
            icon: <FaShieldAlt />,
            title: "Secure Platform",
            desc: "All transactions are protected with advanced security systems.",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:-translate-y-2 hover:shadow-xl hover:shadow-gray-300/40 transition-all duration-300"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-black text-white rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-lg">
              {item.icon}
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">
              {item.title}
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* HEADER */}
      <div className="flex items-center justify-between mb-8 px-2 border-b border-gray-200 pb-4">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Upcoming Events
        </h2>
        <div className="text-gray-500 font-medium">
          {events.length} results found
        </div>
      </div>

      {/* EVENTS */}
      {loading ? (
        <div className="text-center py-20 text-xl font-semibold text-gray-600">
          Loading events...
        </div>
      ) : events.length === 0 ? (
        <div className="text-center py-20 text-xl text-gray-500">
          No events found matching your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div
              key={event._id}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col border border-gray-100"
            >
              {/* IMAGE */}
              <div className="h-48 bg-gray-200 overflow-hidden relative">
                {event.image ? (
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-600 font-bold text-2xl">
                    {event.category || "Event"}
                  </div>
                )}

                <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full text-sm font-bold shadow-md border border-white/30">
                  {event.ticketPrice === 0 ? (
                    <span className="text-green-600">FREE</span>
                  ) : (
                    <span className="text-gray-900">₹{event.ticketPrice}</span>
                  )}
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-6 flex-grow flex flex-col group-hover:bg-gray-50 transition duration-300">
                <div className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  {event.category}
                </div>

                <h2 className="text-xl font-bold text-gray-800 mb-3">
                  {event.title}
                </h2>

                <div className="flex flex-col gap-2 mb-4 text-gray-600 text-sm">
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-gray-400" />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-gray-400" />
                    <span>{event.location}</span>
                  </div>
                </div>

                {/* PROGRESS */}
                <div className="mt-auto">
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-gray-700 to-black h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${(event.availableSeats / event.totalSeats) * 100}%`,
                      }}
                    ></div>
                  </div>

                  <p className="text-xs text-gray-500 mb-4">
                    {event.availableSeats} of {event.totalSeats} seats remaining
                  </p>

                  <Link
                    to={`/events/${event._id}`}
                    className="block w-full text-center bg-gray-900 hover:bg-black text-white font-semibold py-2 rounded-lg transition duration-300 hover:shadow-lg hover:scale-[1.02]"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* FOOTER */}
      <footer className="mt-auto pt-16 pb-8 border-t border-gray-200 text-center">
        <div className="flex justify-center items-center gap-2 mb-4">
          <FaTicketAlt className="text-gray-800 text-2xl" />
          <span className="text-xl font-bold text-gray-900">Eventora</span>
        </div>

        <p className="text-gray-500 text-sm mb-6 max-w-md mx-auto">
          The simplest way to discover and manage world-class events.
        </p>

        {/* Author Credit */}
        <div className="mb-4 text-sm text-gray-600">
          Built by
          <span className="font-semibold text-gray-800 hover:text-black transition duration-300 cursor-pointer ml-1">
            Bhavesh Semwal
          </span>
        </div>

        <div className="text-xs text-gray-400 font-medium uppercase tracking-wider">
          &copy; {new Date().getFullYear()} Eventora Platform. All rights
          reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;
