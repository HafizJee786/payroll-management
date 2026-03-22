/**
 * src/components/Header.jsx
 * ─────────────────────────────────────────
 * Top header bar component.
 *
 * Features:
 *  - Dynamic page title + breadcrumb
 *  - Live date & time display
 *  - Search bar
 *  - Notification bell with badge
 *  - User profile avatar dropdown
 *
 * Props:
 *  - activePage : string — current page name
 * ─────────────────────────────────────────
 */

const { useState, useEffect } = React;

const Header = ({ activePage }) => {

  /* ── Live clock state ── */
  const [time, setTime]               = useState(new Date());
  const [showNotifs, setShowNotifs]   = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [searchVal, setSearchVal]     = useState('');

  /* ── Tick every second ── */
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  /* ── Close dropdowns on outside click ── */
  useEffect(() => {
    const handler = () => { setShowNotifs(false); setShowProfile(false); };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  /* ── Formatted date & time ── */
  const formattedTime = time.toLocaleTimeString('en-US', {
    hour   : '2-digit',
    minute : '2-digit',
    second : '2-digit',
  });

  const formattedDate = time.toLocaleDateString('en-US', {
    weekday : 'short',
    month   : 'short',
    day     : 'numeric',
    year    : 'numeric',
  });

  /* ── Page meta (title + breadcrumb) ── */
  const pageMeta = {
    Dashboard : {
      title    : 'Dashboard',
      subtitle : 'Welcome back! Here\'s your payroll overview.',
      icon     : '🏠',
    },
    Employees : {
      title    : 'Employee Management',
      subtitle : 'Manage your corporate workforce.',
      icon     : '👥',
    },
    Salary : {
      title    : 'Salary Calculator',
      subtitle : 'Compute & review employee salaries.',
      icon     : '💰',
    },
    Taxes : {
      title    : 'Tax & Deductions',
      subtitle : 'Pakistan FBR tax slabs & deduction breakdown.',
      icon     : '🧾',
    },
    Payslip : {
      title    : 'Payslip Generator',
      subtitle : 'Generate & preview employee payslips.',
      icon     : '📄',
    },
  };

  const meta = pageMeta[activePage] || pageMeta['Dashboard'];

  /* ── Mock notifications ── */
  const notifications = [
    {
      id    : 'n1',
      icon  : '💸',
      iconBg: 'bg-grad-green',
      title : 'Payroll Processed',
      desc  : 'March 2025 payroll completed',
      time  : '2h ago',
      unread: true,
    },
    {
      id    : 'n2',
      icon  : '⚠️',
      iconBg: 'bg-grad-orange',
      title : 'Tax Filing Due',
      desc  : 'Q3 FBR deadline in 5 days',
      time  : '1d ago',
      unread: true,
    },
    {
      id    : 'n3',
      icon  : '👤',
      iconBg: 'bg-grad-orange',
      title : 'New Employee',
      desc  : 'Ali Hamza onboarded',
      time  : '3d ago',
      unread: false,
    },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  /* ════════════════════════════════════
     RENDER
  ════════════════════════════════════ */
  return (
    <header
      className="glass sticky top-0 z-40 px-6 py-4"
      style={{ borderBottom: '1px solid #004A70' }}
    >
      <div className="flex items-center justify-between gap-4">

        {/* ── LEFT: Page Title ── */}
        <div className="flex items-center gap-3 min-w-0">

          {/* Page icon */}
          <div
            className="w-10 h-10 rounded-2xl bg-grad-orange flex items-center justify-center text-lg flex-shrink-0"
            style={{ boxShadow: '0 4px 15px rgba(247,127,0,0.35)' }}
          >
            {meta.icon}
          </div>

          {/* Title + subtitle */}
          <div className="min-w-0">
            <h1
              className="font-display text-[#FAFAF9] font-bold text-lg leading-tight truncate"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              {meta.title}
            </h1>
            <p className="text-[#A8A29E] text-xs truncate hidden sm:block">
              {meta.subtitle}
            </p>
          </div>

        </div>

        {/* ── RIGHT: Actions ── */}
        <div className="flex items-center gap-2 flex-shrink-0">

          {/* ── Search Bar ── */}
          <div className="relative hidden md:block">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A8A29E] text-sm">
              🔍
            </span>
            <input
              type="text"
              placeholder="Search employees..."
              value={searchVal}
              onChange={e => setSearchVal(e.target.value)}
              className="form-input pl-9 pr-4 py-2 text-sm w-52 rounded-xl"
              style={{ paddingTop: '8px', paddingBottom: '8px' }}
            />
          </div>

          {/* ── Live Clock ── */}
          <div
            className="glass-bright hidden lg:flex flex-col items-end px-3 py-1.5 rounded-xl cursor-default"
            style={{ minWidth: '130px' }}
          >
            <span className="text-[#FAFAF9] text-xs font-bold font-mono tracking-wider">
              {formattedTime}
            </span>
            <span className="text-[#A8A29E] text-xs">{formattedDate}</span>
          </div>

          {/* ── Notification Bell ── */}
          <div className="relative" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => { setShowNotifs(!showNotifs); setShowProfile(false); }}
              className="relative w-10 h-10 glass-bright rounded-xl flex items-center justify-center
                         text-[#A8A29E] hover:text-[#FAFAF9] transition-colors duration-150"
            >
              <span className="text-lg">🔔</span>

              {/* Unread badge */}
              {unreadCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 w-5 h-5 bg-grad-orange rounded-full
                             flex items-center justify-center text-[#FAFAF9] text-xs font-bold
                             pulse-ring"
                >
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification dropdown */}
            {showNotifs && (
              <div
                className="absolute right-0 top-12 w-80 glass-bright rounded-2xl overflow-hidden z-50 animate-fadeUp"
                style={{ border: '1px solid #004A70', boxShadow: '0 10px 25px rgba(0,0,0,0.35)' }}
              >
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3"
                  style={{ borderBottom: '1px solid #004A70' }}>
                  <span className="text-[#FAFAF9] font-semibold text-sm">Notifications</span>
                  <span className="badge badge-pending">{unreadCount} New</span>
                </div>

                {/* Notification items */}
                <div>
                  {notifications.map(n => (
                    <div
                      key={n.id}
                      className="flex items-start gap-3 px-4 py-3 hover:bg-white/5 cursor-pointer transition-colors"
                      style={{
                        borderBottom : '1px solid #004A70',
                        background   : n.unread ? 'rgba(247,127,0,0.05)' : 'transparent',
                      }}
                    >
                      {/* Icon */}
                      <div className={`${n.iconBg} w-8 h-8 rounded-xl flex items-center justify-center text-sm flex-shrink-0`}>
                        {n.icon}
                      </div>

                      {/* Text */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-[#FAFAF9] text-xs font-semibold truncate">{n.title}</p>
                          <span className="text-[#A8A29E] text-xs flex-shrink-0">{n.time}</span>
                        </div>
                        <p className="text-[#A8A29E] text-xs mt-0.5">{n.desc}</p>
                      </div>

                      {/* Unread dot */}
                      {n.unread && (
                        <div className="w-2 h-2 bg-violet-500 rounded-full flex-shrink-0 mt-1" />
                      )}
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="px-4 py-2.5 text-center"
                  style={{ borderTop: '1px solid #004A70' }}>
                  <button className="text-[#FCBF49] text-xs font-semibold hover:text-[#FCBF49] transition-colors">
                    View all notifications →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ── Profile Avatar ── */}
          <div className="relative" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => { setShowProfile(!showProfile); setShowNotifs(false); }}
              className="flex items-center gap-2 glass-bright rounded-xl px-2 py-1.5
                         hover:bg-white/10 transition-colors duration-150"
            >
              {/* Avatar */}
              <div
                className="w-8 h-8 bg-grad-orange rounded-lg flex items-center justify-center
                           text-[#FAFAF9] text-xs font-bold"
              >
                SA
              </div>
              {/* Name */}
              <div className="hidden sm:block text-left">
                <p className="text-[#FAFAF9] text-xs font-semibold leading-tight">Super Admin</p>
                <p className="text-[#A8A29E] text-xs leading-tight">admin@corp.pk</p>
              </div>
              {/* Chevron */}
              <span className="text-[#A8A29E] text-xs ml-1 hidden sm:block">▾</span>
            </button>

            {/* Profile dropdown */}
            {showProfile && (
              <div
                className="absolute right-0 top-12 w-56 glass-bright rounded-2xl overflow-hidden z-50 animate-fadeUp"
                style={{ border: '1px solid #004A70', boxShadow: '0 10px 25px rgba(0,0,0,0.35)' }}
              >
                {/* Profile header */}
                <div className="px-4 py-3" style={{ borderBottom: '1px solid #004A70' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-grad-orange rounded-xl flex items-center justify-center text-[#FAFAF9] text-sm font-bold">
                      SA
                    </div>
                    <div>
                      <p className="text-[#FAFAF9] text-sm font-semibold">Super Admin</p>
                      <p className="text-[#A8A29E] text-xs">admin@corp.pk</p>
                    </div>
                  </div>
                </div>

                {/* Menu items */}
                {[
                  { icon: '👤', label: 'My Profile'    },
                  { icon: '⚙️', label: 'Settings'      },
                  { icon: '🔒', label: 'Change Password'},
                  { icon: '📊', label: 'Reports'        },
                ].map(item => (
                  <button
                    key={item.label}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-[#A8A29E]
                               hover:bg-white/5 hover:text-[#FAFAF9] transition-colors text-sm"
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                ))}

                {/* Logout */}
                <div style={{ borderTop: '1px solid #004A70' }}>
                  <button
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-[#D62828]
                               hover:bg-[#D62828]/10 transition-colors text-sm font-medium"
                  >
                    <span>🚪</span>
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};


