import { Header } from '@/sections/Header';
import { Hero } from '@/sections/Hero';
import { Advantages } from '@/sections/Advantages';
import { Services } from '@/sections/Services';
import { Process } from '@/sections/Process';
import { Cases } from '@/sections/Cases';
import { Footer } from '@/sections/Footer';

function App() {
  return (
    <div className="min-h-screen bg-[#FEF9F4] text-slate-900 font-sans selection:bg-coral-200 selection:text-coral-900">
      <Header />
      <main>
        <Hero />
        <Advantages />
        <Services />
        <Process />
        <Cases />
      </main>
      <Footer />
    </div>
  );
}

export default App;
