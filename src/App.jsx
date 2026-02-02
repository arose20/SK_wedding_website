import { useEffect, useState } from "react";
import Home from "./components/Home";
import LoadingScreen from "./components/LoadingScreen";

function App() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const minDuration = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setLoading(false), 800); // fade duration
    }, 2500); // loader stays for 2.5 seconds
    return () => clearTimeout(minDuration);
  }, []);

  return (
    <>
      {loading && <LoadingScreen fadeOut={fadeOut} />}
      {!loading && <Home />}
    </>
  );
}

export default App;
