import { useState } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaPaperPlane,
} from "react-icons/fa";

function Contact() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Message sent successfully!");

    setForm({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="bg-white min-h-screen">

      {/* HERO */}
      <section className="bg-slate-50 py-20">

        <div className="max-w-4xl mx-auto px-6 text-center">

          <p className="text-blue-600 font-semibold uppercase tracking-wider text-sm">
            Contact Us
          </p>

          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mt-3">
            We'd Love To Hear From You
          </h1>

          <p className="text-lg text-slate-500 mt-5 leading-8">
            Have a question, suggestion or feedback?
            Send us a message and we'll get back to you.
          </p>

        </div>

      </section>

      {/* CONTACT */}
      <section className="py-20">

        <div className="max-w-7xl mx-auto px-6">

          <div className="grid lg:grid-cols-2 gap-12">

            {/* INFO */}
            <div>

              <h2 className="text-3xl font-bold text-slate-900">
                Get In Touch
              </h2>

              <p className="text-slate-500 leading-7 mt-4">
                Our team is here to help you with ResumeAI and your
                career journey.
              </p>

              <div className="space-y-6 mt-10">

                <ContactInfo
                  icon={<FaEnvelope />}
                  title="Email"
                  text="support@resumeai.com"
                />

                <ContactInfo
                  icon={<FaPhone />}
                  title="Phone"
                  text="+91 98765 43210"
                />

                <ContactInfo
                  icon={<FaMapMarkerAlt />}
                  title="Location"
                  text="Pune, Maharashtra, India"
                />

              </div>

            </div>

            {/* FORM */}
            <div className="bg-white border border-slate-100 shadow-xl rounded-2xl p-8">

              <h2 className="text-2xl font-bold text-slate-900">
                Send Us A Message
              </h2>

              <form
                onSubmit={handleSubmit}
                className="space-y-5 mt-7"
              >

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500"
                />

                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  rows="6"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />

                <button
                  type="submit"
                  className="w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition"
                >
                  Send Message
                  <FaPaperPlane />
                </button>

              </form>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

function ContactInfo({ icon, title, text }) {
  return (
    <div className="flex items-center gap-4">

      <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
        {icon}
      </div>

      <div>
        <h3 className="font-semibold text-slate-900">
          {title}
        </h3>

        <p className="text-slate-500 mt-1">
          {text}
        </p>
      </div>

    </div>
  );
}

export default Contact;