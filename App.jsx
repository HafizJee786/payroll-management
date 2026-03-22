/**
 * src/App.jsx
 * ─────────────────────────────────────────
 * Main entry point.
 * Ties together Sidebar, Header, and Pages.
 * ─────────────────────────────────────────
 */

const { useState } = React;

const App = () => {
  const [activePage, setActivePage] = useState('Dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950 font-body text-gray-200 antialiased">
      
      {/* ── Left Sidebar ── */}
      <Sidebar 
        activePage={activePage} 
        onNavigate={setActivePage} 
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* ── Main Content Area ── */}
      <div 
        className="flex-1 flex flex-col min-w-0 relative h-full"
        style={{
          marginLeft: sidebarCollapsed ? '72px' : 'var(--sidebar-width)',
          transition: 'margin-left 0.3s ease'
        }}
      >
        
        {/* Top Header */}
        <Header activePage={activePage} />

        {/* Scrollable Page Container */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto relative scroll-smooth flex flex-col">
          {activePage === 'Dashboard' && <Dashboard onNavigate={setActivePage} />}
          {activePage === 'Employees' && <Employees />}
          {activePage === 'Salary'    && <Salary />}
          {activePage === 'Taxes'     && <Taxes />}
          {activePage === 'Payslip'   && <Payslip />}
        </main>

      </div>

    </div>
  );
};

// Mount App
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
} else {
  console.error("No element with id 'root' found to mount React.");
}


