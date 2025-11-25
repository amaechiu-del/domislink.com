import { useEffect } from "react";

function App() {
  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;

    fetch(`${apiUrl}/api/health`)
      .then(res => res.json())
      .then(data => console.log(data));
  }, []);

  return <h1>Frontend Connected to Backend</h1>;
}

export default App;
