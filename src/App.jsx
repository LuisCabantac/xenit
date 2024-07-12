import { CurrencyProvider } from "./context/CurrencyContext";
import { LogoMessageHeader } from "./components/LogoMessageHeader";
import { Labels } from "./components/Labels";
import { FromSection } from "./components/FromSection";
import { Footer } from "./components/Footer";
import { ToChoice } from "./components/ToChoice";
import { ResultSection } from "./components/ResultSection";

function App() {
  return (
    <CurrencyProvider>
      <div className="container">
        <LogoMessageHeader />
        <main className="conversion_section">
          <Labels />
          <div className="main_content">
            <FromSection />
            <ToChoice />
          </div>
          <ResultSection />
        </main>
        <Footer />
      </div>
    </CurrencyProvider>
  );
}

export default App;
