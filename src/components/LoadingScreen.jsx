import "../styles/loadingScreen.css";
import bgImage from "../assets/flowers.jpg";

export default function LoadingScreen({ fadeOut }) {
  return (
    <div className={`loader ${fadeOut ? "fade-out" : ""}`}>
      {/* Fullscreen image */}
      <img src={bgImage} alt="Loading" className="loader-img" />

      {/* Overlay text + dots */}
      <div className="overlay">
        <h2 className="welcome-text">Welcome to</h2>
        <h1 className="wedding-text">Sophie and Kieran's Wedding</h1>
        <div className="dots">
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}
