import { Navbar } from '../components/Navbar';
import { Toast } from '../components/Toast';
import { useApp } from '../context/AppContext';

export const DashboardLayout = ({ children }) => {
  const { toast, showToast } = useApp();

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="pt-16">
        {children}
      </div>
      <Toast toast={toast} onDismiss={() => showToast(null)} />
    </div>
  );
};
