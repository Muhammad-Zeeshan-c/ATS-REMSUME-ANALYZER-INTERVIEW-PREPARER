import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Toast } from '../components/Toast';
import { useApp } from '../context/AppContext';

export const MainLayout = ({ children }) => {
  const { toast, showToast } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 pt-16">
        {children}
      </main>
      <Footer />
      <Toast toast={toast} onDismiss={() => showToast(null)} />
    </div>
  );
};
