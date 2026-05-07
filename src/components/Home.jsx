import { useState } from "react";
import "./Home.css";
import MapDisplay from "./MapDisplay";
import personIcon from "../assets/person-icon-1682.png";
import sketchImg from "../assets/sketch_with_background.png";

const people = [
  { name: "Sophie Limon", role: "Bride", img: personIcon },
  { name: "Kieran Ryan", role: "Groom", img: personIcon },
  { name: "Zoe Limon", role: "Bridesmaid", img: personIcon },
  { name: "Cameron Crawshaw", role: "Best Man", img: personIcon },
];

const MAX_GUESTS = 2;

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
    if (form.guests.length >= MAX_GUESTS) return;

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

  // ✅ Validate that all required fields are filled
  const isFormValid = () => {
    if (form.rsvp !== "yes") return true; // No need for menu if not attending

    // Main guest fields
    if (!form.firstName.trim() || !form.lastName.trim() || !form.email.trim()) return false;
    if (!form.starter || !form.main || !form.dessert || !form.afterParty) return false;

    // Additional guests
    for (let guest of form.guests) {
      if (
        !guest.firstName.trim() ||
        !guest.lastName.trim() ||
        !guest.starter ||
        !guest.main ||
        !guest.dessert ||
        !guest.afterParty
      ) {
        return false;
      }
    }

    return true;
  };

  return (
    <main className="home">

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="navbar-inner">
          <div className="logo">Sophie & Kieran</div>
          <ul className="nav-links">
            <li><a href="#people">Wedding Party</a></li>
            <li><a href="#schedule">Schedule</a></li>
            <li><a href="#directions">Directions</a></li>
            <li><a href="#accommodation">Accommodation</a></li>
            <li><a href="#rsvp">RSVP</a></li>
          </ul>
        </div>
      </nav>

      {/* HERO */}
      <section className="section hero">
        <div className="hero-content">
        <img src={sketchImg} alt="Sophie and Kieran" className="hero-image" />

        <h1 className="couple-name">
          Sophie & Kieran <br />
          are getting married!
        </h1>
        <p className="subtitle">
          Sophie Limon and Kieran Ryan,<br />
          invite you to celebrate their marriage <br />
          on 6th September 2026<br />
          at Rushpool Hall.
        </p>
      </div>
      </section>


      {/* remove bullet point so looks nice, music off half 11 */}
      {/* SCHEDULE */}
      <section id="schedule" className="section schedule">
        <div className="container">
        <h2 className="section-title">Wedding Schedule</h2>
        <ul className="schedule-list">
          <li><strong>12:30 </strong> – Arrival</li>
          <li><strong>13:30 </strong> – Ceremony begins</li>
          <li><strong>14:00 </strong> – Drinks reception</li>
          <li><strong>15:45 </strong> – Ballroom attendance</li>
          <li><strong>16:00 </strong> – Speeches</li>
          <li><strong>16:30 </strong> – Dinner</li>
          <li><strong>19:00 </strong> – Evening guests arrive</li>
          <li><strong>19:30 </strong> – Cake cut and first dance</li>
          <li><strong>20:00 </strong> – Evening food</li>
          <li><strong>23:30 </strong> – Music off and bar close</li>
          <li><strong>00:00 </strong> – Carriages</li>
        </ul>
        </div>
      </section>


      {/* PEOPLE */}
      <section id="people" className="section people">
        <div className="container">
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
        </div>
      </section>

      

      {/* DIRECTIONS */}
      <section id="directions" className="section directions">
        <div className="container">
        <h1 className="section-title">Directions</h1>
        <p className="directions-text">
          Rushpool Hall Wedding Venue<br />
          Saltburn Ln<br />
          Saltburn-by-the-Sea<br />
          TS12 1HD
        </p>
        <div className="map-container">
          <MapDisplay />
        </div>
        </div>
      </section>
      
      {/* Accommodation */}
      <section id="accommodation" className="section accommodation">
      <div className="container">
        <h1 className="section-title">Accommodation</h1>

        <p className="directions-text">
          Limited rooms are available at Rushpool Hall. Please click <a href="https://app.thebookingfactory.com/rushpool-hall/book/060926-kieran-sophie#/" target="_blank" rel="noopener noreferrer">here</a> to view available rooms.<br /><br />

          Check in is open from 3pm and check out time is 10:30am for all guests.<br /><br />

          Please refer to the wedding invite for the unique code.
        </p>
      </div>
    </section>


      {/* RSVP <- add message so couple fill out once*/}
      <section id="rsvp" className="section rsvp">
        <div className="container">
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
                <input
                  name="firstName"
                  placeholder="First Name *"
                  required
                  value={form.firstName}
                  onChange={handleChange}
                />
                <input
                  name="lastName"
                  placeholder="Last Name *"
                  required
                  value={form.lastName}
                  onChange={handleChange}
                />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email *"
                required
                value={form.email}
                onChange={handleChange}
              />
            </div>

            {/* RSVP */}
            <div className="rsvp-card">
              <h3>Your RSVP</h3>
              <label className="option">
                <input type="radio" name="rsvp" value="yes" onChange={handleChange} />
                <span>I’ll Be There</span>
              </label>
              <label className="option">
                <input type="radio" name="rsvp" value="no" onChange={handleChange} />
                <span>Can’t Make It</span>
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
                  <p>Seasonal Soup</p>

                  <h4>Main</h4>
                  <p>Roast dinner: served with creamy mash, vegetables and Yorkshire pudding</p>
                  <label className="option">
                    <input type="radio" name="main" value="Chicken" onChange={handleChange} required />
                    <span>Chicken</span>
                  </label>
                  <label className="option">
                    <input type="radio" name="main" value="Beef" onChange={handleChange} />
                    <span>Beef</span>
                  </label>
                  <label className="option">
                    <input type="radio" name="main" value="V" onChange={handleChange} />
                    <span>Baked Wellington (V)</span>
                  </label>

                  <h4>Dessert</h4>
                  <p>Fresh lemon tart</p>

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
                  <label className="option">
                    <input type="radio" name="afterParty" value="yes" onChange={handleChange} required />
                    <span>Yes, I’ll join 🎉</span>
                  </label>
                  <label className="option">
                    <input type="radio" name="afterParty" value="no" onChange={handleChange} />
                    <span>No, I’ll head home</span>
                  </label>
                </div>

                <p>Please add information for additional guests which are listed on your invitation.</p>

                {/* ADDITIONAL GUESTS <- set limit to 2 extra*/}
                {form.guests.map((guest, index) => (
                  <div className="rsvp-card guest-card" key={index}>
                    <div className="guest-header">
                      <h4>Additional Guest {index + 2}</h4>
                      <button type="button" className="remove-guest" onClick={() => removeGuest(index)}>Remove</button>
                    </div>

                    <div className="input-group">
                      <input placeholder="First Name *" value={guest.firstName} onChange={(e) => handleChange(e, index, "firstName")} required />
                      <input placeholder="Last Name *" value={guest.lastName} onChange={(e) => handleChange(e, index, "lastName")} required />
                    </div>

                    <h4>Starter</h4>
                    <p>Seasonal Soup</p>

                    <h4>Main</h4>
                    <p>Roast dinner: served with creamy mash, vegetables and Yorkshire pudding</p>
                    <label className="option">
                      <input type="radio" name="main" value="Chicken" onChange={handleChange} required />
                      <span>Chicken</span>
                    </label>
                    <label className="option">
                      <input type="radio" name="main" value="Beef" onChange={handleChange} />
                      <span>Beef</span>
                    </label>
                    <label className="option">
                      <input type="radio" name="main" value="V" onChange={handleChange} />
                      <span>Baked Wellington (V)</span>
                    </label>

                    <h4>Dessert</h4>
                    <p>Fresh lemon tart</p>

                    <input
                      className="dietary-input"
                      name="dietary"
                      placeholder="Dietary restrictions (optional)"
                      value={form.dietary}
                      onChange={handleChange}
                    />

                    <h4>After Party</h4>
                    <label className="option">
                      <input type="radio" name={`guest-${index}-afterParty`} value="yes" onChange={(e) => handleChange(e, index, "afterParty")} required />
                      <span>Attending 🎉</span>
                    </label>
                    <label className="option">
                      <input type="radio" name={`guest-${index}-afterParty`} value="no" onChange={(e) => handleChange(e, index, "afterParty")} />
                      <span>Not attending</span>
                    </label>
                  </div>
                ))}

                {form.guests.length < MAX_GUESTS && (
                  <button type="button" className="add-guest" onClick={addGuest}>
                    + Add Guest
                  </button>
                )}
              </>
            )}

            <button
              type="submit"
              className="rsvp-submit"
              disabled={
                !form.rsvp || (form.rsvp === "yes" && !isFormValid())
              }
            >
              Submit RSVP
            </button>

          </form>
        )}
        </div>
      </section>
    </main>
  );
}
