import { HomePage } from "../pages/HomePage";
import { Footer } from "../shared/components/layout/Footer";
import { Navbar } from "../shared/components/layout/Navbar";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-primary h-28 border-b-4 border-quaternary">
        <Navbar />
      </header>
      <main className="min-h-screen">
        <HomePage />
      </main>
      <footer className="bg-white shadow-sm">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
