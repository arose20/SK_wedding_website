import { useState } from "react";
import "./Home.css";

export default function Home() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    attending: "",
    guests: 1,
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("RSVP Submitted:", form);
    setSubmitted(true);
  };

  const profiles = [
    { id: 1, name: "Zoe Limon", title: "Maid of Honor", img: "https://via.placeholder.com/150" },
    { id: 2, name: "Liam Smith", title: "Best Man", img: "https://via.placeholder.com/150" },
    { id: 3, name: "Emma Brown", title: "Bridesmaid", img: "https://via.placeholder.com/150" },
    { id: 4, name: "Noah Lee", title: "Groomsman", img: "https://via.placeholder.com/150" },
  ];

  return (
    <main className="home">
      {/* HERO */}
      <section className="section hero">
        <h1 className="couple-name">Sophie & Kieran</h1>
        <p className="subtitle">ARE GETTING MARRIED</p>
        <span className="scroll-hint">Scroll ↓</span>
      </section>

      {/* PEOPLE */}
      <section className="section people">
        <h2 className="section-title">With Love & Support From</h2>

        <div className="people-container">
          {profiles.map((person) => (
            <div key={person.id} className="person-card">
              <div className="person-image">
                <img src={person.img} alt={person.name} />
              </div>
              <h3>{person.name}</h3>
              <p>{person.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* RSVP */}
      <section className="section rsvp">
        <h2 className="section-title">RSVP</h2>

        {submitted ? (
          <p className="thank-you">Thank you for your response 💕</p>
        ) : (
          <form className="rsvp-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
            />

            <select
              name="attending"
              value={form.attending}
              onChange={handleChange}
              required
            >
              <option value="">Will you attend?</option>
              <option value="yes">Yes, gladly!</option>
              <option value="no">Sorry, can’t make it</option>
            </select>

            <input
              type="number"
              name="guests"
              min="1"
              max="5"
              value={form.guests}
              onChange={handleChange}
            />

            <textarea
              name="message"
              placeholder="Leave a message (optional)"
              rows="4"
              value={form.message}
              onChange={handleChange}
            />

            <button type="submit">Submit RSVP</button>
          </form>
        )}
      </section>
    </main>
  );
}
