import { BrowserRouter } from 'react-router-dom';
import { Footer } from "../shared/components/layout/Footer";
import { Navbar } from "../shared/components/layout/Navbar";
import { Main } from "../shared/components/layout/Main";
import { AppRouter } from "./router";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-primary h-28 border-b-4 border-quaternary">
          <Navbar />
        </header>
        <main className="min-h-screen">
          <Main>
            <AppRouter />
          </Main>
        </main>
        <footer className="bg-white shadow-sm">
          <Footer />
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
