import "../styles/loadingScreen.css";
import bgImage from "../assets/loading_image3.jpg";

export default function LoadingScreen({ fadeOut }) {
  return (
    <div
      className={`loader ${fadeOut ? "fade-out" : ""}`}
      style={{ backgroundImage: `url(${bgImage})` }}
    >
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
