/**
 * src/components/Sidebar.jsx
 * ─────────────────────────────────────────
 * Left navigation sidebar component.
 *
 * Features:
 *  - Animated brand logo & company name
 *  - Navigation links with active state
 *  - Department quick-stats section
 *  - Payroll status widget at bottom
 *  - Collapse/expand toggle (mobile)
 *
 * Props:
 *  - activePage    : string  — current active page
 *  - onNavigate    : fn      — page change handler
 * ─────────────────────────────────────────
 */

const { useState } = React;

const Sidebar = ({ activePage, onNavigate, collapsed, onToggleCollapse }) => {

  /* ── Navigation items ── */
  const navItems = [
    {
      id    : 'Dashboard',
      label : 'Dashboard',
      icon  : '🏠',
      iconBg: 'bg-grad-orange',
      badge : null,
    },
    {
      id    : 'Employees',
      label : 'Employees',
      icon  : '👥',
      iconBg: 'bg-grad-orange',
      badge : '8',
    },
    {
      id    : 'Salary',
      label : 'Salary Calculator',
      icon  : '💰',
      iconBg: 'bg-grad-green',
      badge : null,
    },
    {
      id    : 'Taxes',
      label : 'Tax & Deductions',
      icon  : '🧾',
      iconBg: 'bg-grad-orange',
      badge : null,
    },
    {
      id    : 'Payslip',
      label : 'Payslip Generator',
      icon  : '📄',
      iconBg: 'bg-grad-orange',
      badge : null,
    },
  ];

  /* ── Quick-stat items ── */
  const quickStats = [
    { label: 'Active Staff',    value: '7',        color: 'text-[#FCBF49]' },
    { label: 'This Month',      value: 'PKR 1.51M', color: 'text-[#FCBF49]'  },
    { label: 'Pending Payslips',value: '0',         color: 'text-[#FCBF49]'     },
  ];

  /* ════════════════════════════════════
     RENDER
  ════════════════════════════════════ */
  return (
    <aside
      className="sidebar flex flex-col h-screen"
      style={{
        width     : collapsed ? '72px' : 'var(--sidebar-width)',
        transition: 'width 0.3s ease',
      }}
    >

      {/* ══════════════════════════
          BRAND LOGO (Fixed Top)
      ══════════════════════════ */}
      <div
        className="flex items-center gap-3 px-4 py-5 flex-shrink-0"
        style={{ borderBottom: '1px solid rgba(214, 40, 40, 0.2)' }}
      >
        {/* Logo mark */}
        <div
          className="w-10 h-10 bg-grad-orange rounded-2xl flex items-center justify-center
                     text-[#FAFAF9] font-bold text-base flex-shrink-0"
          style={{ boxShadow: '0 4px 20px rgba(247,127,0,0.4)', fontFamily: "'Syne',sans-serif" }}
        >
          P
        </div>

        {/* Brand name — hidden when collapsed */}
        {!collapsed && (
          <div className="min-w-0 animate-fadeUp">
            <h2
              className="shimmer font-display font-bold text-base leading-tight"
              style={{ fontFamily: "'Syne', sans-serif", whiteSpace: 'nowrap' }}
            >
              PayRoll Pro
            </h2>
            <p className="text-[#A8A29E] text-xs" style={{ whiteSpace: 'nowrap' }}>
              Corporate Edition
            </p>
          </div>
        )}

        {/* Collapse toggle */}
        <button
          onClick={onToggleCollapse}
          className="ml-auto text-[#A8A29E] hover:text-gray-200 transition-colors
                     w-6 h-6 flex items-center justify-center rounded-lg
                     hover:bg-white/10 flex-shrink-0 text-sm"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? '›' : '‹'}
        </button>
      </div>

      {/* ── Scrollable Area ── */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar flex flex-col min-h-0">
        {/* ══════════════════════════
            NAVIGATION LINKS
        ══════════════════════════ */}
        <nav className="flex-1 px-3 py-4">

          {/* Section label */}
          {!collapsed && (
            <p className="text-[#A8A29E] text-xs font-bold uppercase tracking-widest px-3 mb-3">
              Main Menu
            </p>
          )}

          {/* Nav items */}
          <ul className="space-y-1">
            {navItems.map((item, index) => {
              const isActive = activePage === item.id;

              return (
                <li key={item.id}>
                  <button
                    onClick={() => onNavigate(item.id)}
                    className={`sidebar-link w-full text-left ${isActive ? 'active' : ''}`}
                    style={{
                      justifyContent : collapsed ? 'center' : 'flex-start',
                      padding        : collapsed ? '10px'   : '10px 12px',
                      animationDelay : `${index * 50}ms`,
                    }}
                    title={collapsed ? item.label : ''}
                  >
                    {/* Icon */}
                    <div
                      className={`sidebar-icon ${item.iconBg} text-[#FAFAF9]`}
                      style={{
                        boxShadow: isActive ? '0 4px 12px rgba(0,0,0,0.3)' : 'none',
                      }}
                    >
                      {item.icon}
                    </div>

                    {/* Label + badge — hidden when collapsed */}
                    {!collapsed && (
                      <div className="flex items-center justify-between flex-1 min-w-0">
                        <span className="truncate">{item.label}</span>

                        {/* Badge */}
                        {item.badge && (
                          <span
                            className="ml-2 px-2 py-0.5 rounded-full text-xs font-bold flex-shrink-0"
                            style={{
                              background : isActive
                                ? 'rgba(255,255,255,0.2)'
                                : 'rgba(247,127,0,0.2)',
                              color      : isActive ? '#fff' : '#F77F00',
                            }}
                          >
                            {item.badge}
                          </span>
                        )}

                        {/* Active indicator dot */}
                        {isActive && (
                          <span
                            className="w-1.5 h-1.5 rounded-full bg-[#F77F00] flex-shrink-0 ml-2"
                          />
                        )}
                      </div>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* ── Divider ── */}
          <div className="divider mx-2" />

          {/* ── Quick Stats section ── */}
          {!collapsed && (
            <div className="animate-fadeUp">
              <p className="text-[#A8A29E] text-xs font-bold uppercase tracking-widest px-3 mb-3">
                Quick Stats
              </p>

              <div
                className="glass rounded-2xl p-4 mx-1 space-y-3"
                style={{ border: '1px solid rgba(252, 191, 73, 0.15)', background: 'rgba(255, 255, 255, 0.02)' }}
              >
                {quickStats.map(stat => (
                  <div key={stat.label} className="flex items-center justify-between">
                    <span className="text-[#A8A29E] text-xs">{stat.label}</span>
                    <span className={`text-xs font-bold ${stat.color}`}>{stat.value}</span>
                  </div>
                ))}

                {/* Mini progress bar */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-[#A8A29E] text-xs">Payroll Progress</span>
                    <span className="text-[#FCBF49] text-xs font-bold">100%</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-grad-green"
                      style={{ width: '100%', transition: 'width 1s ease' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── Departments section ── */}
          {!collapsed && (
            <div className="mt-4 animate-fadeUp">
              <p className="text-[#A8A29E] text-xs font-bold uppercase tracking-widest px-3 mb-3">
                Departments
              </p>

              <div className="space-y-1 mx-1">
                {DEPARTMENTS.map(dept => (
                  <div
                    key={dept.id}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl
                               hover:bg-white/5 cursor-default transition-colors group"
                  >
                    {/* Dept icon */}
                    <div
                      className={`${dept.color} w-6 h-6 rounded-lg flex items-center
                                  justify-content center text-xs flex-shrink-0`}
                      style={{ display:'flex', alignItems:'center', justifyContent:'center' }}
                    >
                      {dept.icon}
                    </div>

                    {/* Dept name */}
                    <span className="text-[#A8A29E] text-xs flex-1 truncate
                                     group-hover:text-slate-200 transition-colors">
                      {dept.name}
                    </span>

                    {/* Head count badge */}
                    <span
                      className="text-xs font-bold px-1.5 py-0.5 rounded-md flex-shrink-0"
                      style={{
                        background : 'rgba(255,255,255,0.06)',
                        color      : '#64748b',
                      }}
                    >
                      {dept.headCount}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </nav>

        {/* ══════════════════════════
            FOOTER — Payroll Status
        ══════════════════════════ */}
        {!collapsed && (
          <div
            className="px-4 py-4 flex-shrink-0 mt-auto"
            style={{ borderTop: '1px solid rgba(247, 127, 0, 0.2)' }}
          >
            {/* Next payroll card */}
            <div
              className="rounded-2xl p-3 relative overflow-hidden"
              style={{
                background : 'linear-gradient(135deg, rgba(247,127,0,0.2), rgba(0,48,73,0.15))',
                border     : '1px solid #F77F00',
              }}
            >
              {/* Decorative orb */}
              <div
                className="absolute -top-4 -right-4 w-16 h-16 rounded-full opacity-20 blur-xl"
                style={{ background: '#D62828' }}
              />

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-sm">📅</span>
                  <span className="text-[#FAFAF9] text-xs font-bold">Next Payroll</span>
                  <span className="badge badge-pending ml-auto text-xs">Apr 2025</span>
                </div>

                <p className="text-gray-200 text-xs mb-2">
                  Due in <span className="text-[#FCBF49] font-bold">16 days</span>
                </p>

                <button
                  onClick={() => onNavigate('Salary')}
                  className="btn-primary w-full justify-center text-xs py-2"
                >
                  <span>⚡</span> Run Payroll
                </button>
              </div>
            </div>

            {/* App version */}
            <p className="text-slate-700 text-xs text-center mt-3">
              PayRoll Pro v1.0.0
            </p>
          </div>
        )}

        {/* Collapsed footer icon */}
        {collapsed && (
          <div
            className="px-3 py-4 flex-shrink-0 flex justify-center mt-auto"
            style={{ borderTop: '1px solid rgba(247, 127, 0, 0.2)' }}
          >
            <button
              onClick={() => onNavigate('Salary')}
              className="w-10 h-10 bg-grad-orange rounded-xl flex items-center justify-center
                         text-[#FAFAF9] text-sm hover:opacity-90 transition-opacity"
              title="Run Payroll"
            >
              ⚡
            </button>
          </div>
        )}
      </div>

    </aside>
  );
};


