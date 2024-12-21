import { Route, Routes } from "react-router";
import { Game, Home, Setup } from "./pages";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/setup" element={<Setup />} />
      <Route path="/game" element={<Game />} />
    </Routes>
  );
}

export default App;
