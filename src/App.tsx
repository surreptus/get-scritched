import { Route, Routes } from "react-router";
import { Game, Home, Setup } from "./pages";
import { AppBar } from "./components/AppBar";

function App() {

  return (
    <div>
      <AppBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/setup" element={<Setup />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </div>
  );
}

export default App;
