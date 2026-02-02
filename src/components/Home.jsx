import { useState } from "react";
import "./Home.css";
import MapDisplay from "./MapDisplay";

const people = [
  { name: "Zoe Limon", role: "Maid of Honor", img: "https://via.placeholder.com/150" },
  { name: "Liam James", role: "Best Man", img: "https://via.placeholder.com/150" },
];

export default function Home() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    rsvp: "",
    starter: "",
    main: "",
    dessert: "",
    dietary: "",
    afterParty: "",
    guests: [],
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e, guestIndex = null, field = null) => {
    if (guestIndex !== null && field) {
      const updatedGuests = [...form.guests];
      updatedGuests[guestIndex][field] = e.target.value;
      setForm({ ...form, guests: updatedGuests });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const addGuest = () => {
    setForm({
      ...form,
      guests: [
        ...form.guests,
        {
          firstName: "",
          lastName: "",
          starter: "",
          main: "",
          dessert: "",
          dietary: "",
          afterParty: "",
        },
      ],
    });
  };

  const removeGuest = (index) => {
    setForm({
      ...form,
      guests: form.guests.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("RSVP Submitted:", form);
    setSubmitted(true);
  };

  return (
    <main className="home">

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">Sophie & Kieran</div>
        <ul className="nav-links">
          <li><a href="#people">Wedding Party</a></li>
          <li><a href="#schedule">Schedule</a></li>
          <li><a href="#directions">Directions</a></li>
          <li><a href="#rsvp">RSVP</a></li>
        </ul>
      </nav>

      {/* HERO */}
      <section className="section hero">
        <h1 className="couple-name">Sophie & Kieran</h1>
        <p className="subtitle">
          Together with their families, Sophie Louise Limon and Kieran Ryan,
          invite you to celebrate their marriage on 6th September 2026
        </p>
      </section>

      {/* PEOPLE */}
      <section id="people" className="section people">
        <h2 className="section-title">With Love & Support From</h2>
        <div className="people-container">
          {people.map((person, i) => (
            <div className="person-card" key={i}>
              <img src={person.img} alt={person.name} />
              <h3>{person.name}</h3>
              <p>{person.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SCHEDULE */}
      <section id="schedule" className="section schedule">
        <h2 className="section-title">Wedding Schedule</h2>
        <ul className="schedule-list">
          <li><strong>2:00 PM</strong> – Ceremony</li>
          <li><strong>3:30 PM</strong> – Cocktail Hour</li>
          <li><strong>5:00 PM</strong> – Reception</li>
        </ul>
      </section>

      {/* DIRECTIONS */}
      <section id="directions" className="section directions">
        <h2 className="section-title">Directions</h2>
        <p className="directions-text">
          Rushpool Hall Wedding Venue<br />
          Saltburn Ln<br />
          Saltburn-by-the-Sea<br />
          TS12 1HD
        </p>
        <div className="map-container">
          <MapDisplay />
        </div>
      </section>

      {/* RSVP */}
      <section id="rsvp" className="section rsvp">
        <h2 className="section-title">RSVP</h2>

        {submitted ? (
          <div className="success-screen">
            <div className="confetti" />
            <h3>Thank you for your response 💕</h3>
            <p>We’re so grateful you took the time to reply.</p>
          </div>
        ) : (
          <form className="rsvp-form" onSubmit={handleSubmit}>

            {/* Guest Info */}
            <div className="rsvp-card">
              <h3>Guest Information</h3>
              <div className="input-group">
                <input name="firstName" placeholder="First Name *" required value={form.firstName} onChange={handleChange} />
                <input name="lastName" placeholder="Last Name *" required value={form.lastName} onChange={handleChange} />
              </div>
              <input type="email" name="email" placeholder="Email *" required value={form.email} onChange={handleChange} />
            </div>

            {/* RSVP */}
            <div className="rsvp-card">
              <h3>Your RSVP</h3>
              <label className="option">
                <input type="radio" name="rsvp" value="yes" onChange={handleChange} />
                <span>I’ll Be There ✅</span>
              </label>
              <label className="option">
                <input type="radio" name="rsvp" value="no" onChange={handleChange} />
                <span>Can’t Make It ❌</span>
              </label>
            </div>

            {/* NOT ATTENDING */}
            {form.rsvp === "no" && (
              <div className="rsvp-card">
                <p>
                  We’ll miss you on the day, but thank you so much for letting us know 💕  
                  If you’d like to leave us a message, we’d love to read it.
                </p>
                <textarea
                  name="message"
                  rows="4"
                  placeholder="Leave us a message…"
                  value={form.message}
                  onChange={handleChange}
                />
              </div>
            )}

            {/* ATTENDING */}
            {form.rsvp === "yes" && (
              <>
                {/* MAIN GUEST MENU */}
                <div className="rsvp-card">
                  <h3>Menu Selection</h3>

                  <h4>Starter</h4>
                  <label className="option"><input type="radio" name="starter" value="carrot-soup" onChange={handleChange} /><span>Vegetarian – Carrot Soup</span></label>
                  <label className="option"><input type="radio" name="starter" value="oysters" onChange={handleChange} /><span>Non-Vegetarian – Oysters</span></label>

                  <h4>Main</h4>
                  <label className="option"><input type="radio" name="main" value="super-salad" onChange={handleChange} /><span>Vegetarian – Super Salad</span></label>
                  <label className="option"><input type="radio" name="main" value="sunday-dinner" onChange={handleChange} /><span>Non-Vegetarian – Sunday Dinner</span></label>

                  <h4>Dessert</h4>
                  <label className="option"><input type="radio" name="dessert" value="sticky-toffee" onChange={handleChange} /><span>Sticky Toffee Pudding</span></label>
                  <label className="option"><input type="radio" name="dessert" value="chocolate-cake" onChange={handleChange} /><span>Chocolate Cake</span></label>

                  <input
                    className="dietary-input"
                    name="dietary"
                    placeholder="Dietary restrictions (optional)"
                    value={form.dietary}
                    onChange={handleChange}
                  />
                </div>

                {/* MAIN AFTER PARTY */}
                <div className="rsvp-card">
                  <h3>After Party</h3>
                  <label className="option"><input type="radio" name="afterParty" value="yes" onChange={handleChange} /><span>Yes, I’ll join 🎉</span></label>
                  <label className="option"><input type="radio" name="afterParty" value="no" onChange={handleChange} /><span>No, I’ll head home</span></label>
                </div>

                {/* ADDITIONAL GUESTS */}
                {form.guests.map((guest, index) => (
                  <div className="rsvp-card guest-card" key={index}>
                    <div className="guest-header">
                      <h4>Additional Guest {index + 1}</h4>
                      <button type="button" className="remove-guest" onClick={() => removeGuest(index)}>Remove</button>
                    </div>

                    <div className="input-group">
                      <input placeholder="First Name" value={guest.firstName} onChange={(e) => handleChange(e, index, "firstName")} />
                      <input placeholder="Last Name" value={guest.lastName} onChange={(e) => handleChange(e, index, "lastName")} />
                    </div>

                    <h4>Starter</h4>
                    <label className="option"><input type="radio" name={`guest-${index}-starter`} value="carrot-soup" onChange={(e) => handleChange(e, index, "starter")} /><span>Vegetarian – Carrot Soup</span></label>
                    <label className="option"><input type="radio" name={`guest-${index}-starter`} value="oysters" onChange={(e) => handleChange(e, index, "starter")} /><span>Non-Vegetarian – Oysters</span></label>

                    <h4>Main</h4>
                    <label className="option"><input type="radio" name={`guest-${index}-main`} value="super-salad" onChange={(e) => handleChange(e, index, "main")} /><span>Vegetarian – Super Salad</span></label>
                    <label className="option"><input type="radio" name={`guest-${index}-main`} value="sunday-dinner" onChange={(e) => handleChange(e, index, "main")} /><span>Non-Vegetarian – Sunday Dinner</span></label>

                    <h4>Dessert</h4>
                    <label className="option"><input type="radio" name={`guest-${index}-dessert`} value="sticky-toffee" onChange={(e) => handleChange(e, index, "dessert")} /><span>Sticky Toffee Pudding</span></label>
                    <label className="option"><input type="radio" name={`guest-${index}-dessert`} value="chocolate-cake" onChange={(e) => handleChange(e, index, "dessert")} /><span>Chocolate Cake</span></label>

                    <input
                      className="dietary-input"
                      placeholder="Dietary restrictions (optional)"
                      value={guest.dietary}
                      onChange={(e) => handleChange(e, index, "dietary")}
                    />

                    <h4>After Party</h4>
                    <label className="option"><input type="radio" name={`guest-${index}-afterParty`} value="yes" onChange={(e) => handleChange(e, index, "afterParty")} /><span>Attending 🎉</span></label>
                    <label className="option"><input type="radio" name={`guest-${index}-afterParty`} value="no" onChange={(e) => handleChange(e, index, "afterParty")} /><span>Not attending</span></label>
                  </div>
                ))}

                <button type="button" className="add-guest" onClick={addGuest}>
                  + Add Guest
                </button>
              </>
            )}

            <button type="submit" className="rsvp-submit">Submit RSVP</button>
          </form>
        )}
      </section>
    </main>
  );
}
