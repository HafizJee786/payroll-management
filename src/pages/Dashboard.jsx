/**
 * src/pages/Dashboard.jsx
 * ─────────────────────────────────────────
 * Main dashboard overview page.
 *
 * Sections:
 *  1. Stat Cards Grid
 *  2. Monthly Salary Trend Chart (Line)
 *  3. Department Payroll Chart (Doughnut)
 *  4. Payroll History Table
 *  5. Recent Activity Feed
 * ─────────────────────────────────────────
 */

const { useEffect, useRef, useState } = React;

const Dashboard = ({ onNavigate }) => {

  const lineChartRef   = useRef(null);
  const donutChartRef  = useRef(null);
  const lineChartInst  = useRef(null);
  const donutChartInst = useRef(null);

  /* ══════════════════════════════════
     CHART SETUP
  ══════════════════════════════════ */
  useEffect(() => {

    /* ── Shared Chart.js defaults ── */
    Chart.defaults.color          = '#64748b';
    Chart.defaults.font.family    = "'Plus Jakarta Sans', sans-serif";
    Chart.defaults.font.size      = 11;

    /* ── Destroy old instances on re-render ── */
    if (lineChartInst.current)  lineChartInst.current.destroy();
    if (donutChartInst.current) donutChartInst.current.destroy();

    const { labels, gross, net, tax } = CHART_DATA.monthly;

    /* ═══════════════════════════
       LINE CHART — Monthly Trend
    ═══════════════════════════ */
    const lineCtx = lineChartRef.current.getContext('2d');

    /* Gradient fills */
    const gradGross = lineCtx.createLinearGradient(0, 0, 0, 280);
    gradGross.addColorStop(0,   'rgba(247,127,0,0.35)');
    gradGross.addColorStop(1,   'rgba(247,127,0,0.00)');

    const gradNet = lineCtx.createLinearGradient(0, 0, 0, 280);
    gradNet.addColorStop(0,   'rgba(252,191,73,0.30)');
    gradNet.addColorStop(1,   'rgba(252,191,73,0.00)');

    const gradTax = lineCtx.createLinearGradient(0, 0, 0, 280);
    gradTax.addColorStop(0,   'rgba(214,40,40,0.25)');
    gradTax.addColorStop(1,   'rgba(214,40,40,0.00)');

    lineChartInst.current = new Chart(lineCtx, {
      type : 'line',
      data : {
        labels,
        datasets: [
          {
            label           : 'Gross Salary',
            data            : gross,
            borderColor     : '#F77F00',
            backgroundColor : gradGross,
            borderWidth     : 2.5,
            pointBackgroundColor: '#F77F00',
            pointBorderColor    : '#020817',
            pointBorderWidth    : 2,
            pointRadius         : 5,
            pointHoverRadius    : 7,
            tension         : 0.4,
            fill            : true,
          },
          {
            label           : 'Net Salary',
            data            : net,
            borderColor     : '#FCBF49',
            backgroundColor : gradNet,
            borderWidth     : 2.5,
            pointBackgroundColor: '#FCBF49',
            pointBorderColor    : '#020817',
            pointBorderWidth    : 2,
            pointRadius         : 5,
            pointHoverRadius    : 7,
            tension         : 0.4,
            fill            : true,
          },
          {
            label           : 'Tax Deducted',
            data            : tax,
            borderColor     : '#D62828',
            backgroundColor : gradTax,
            borderWidth     : 2,
            pointBackgroundColor: '#D62828',
            pointBorderColor    : '#020817',
            pointBorderWidth    : 2,
            pointRadius         : 4,
            pointHoverRadius    : 6,
            tension         : 0.4,
            fill            : true,
          },
        ],
      },
      options: {
        responsive         : true,
        maintainAspectRatio: false,
        interaction        : { mode: 'index', intersect: false },
        plugins: {
          legend: {
            position : 'top',
            align    : 'end',
            labels   : {
              boxWidth     : 10,
              boxHeight    : 10,
              borderRadius : 5,
              useBorderRadius: true,
              padding      : 16,
              color        : '#94a3b8',
              font         : { size: 11, weight: '500' },
            },
          },
          tooltip: {
            backgroundColor : 'rgba(15,23,42,0.95)',
            borderColor     : 'rgba(255,255,255,0.1)',
            borderWidth     : 1,
            padding         : 12,
            titleColor      : '#e2e8f0',
            bodyColor       : '#94a3b8',
            titleFont       : { size: 12, weight: '700' },
            bodyFont        : { size: 11 },
            callbacks: {
              label: ctx => ` ${ctx.dataset.label}: PKR ${ctx.parsed.y.toLocaleString()}`,
            },
          },
        },
        scales: {
          x: {
            grid : { color: 'rgba(255,255,255,0.04)', drawBorder: false },
            ticks: { color: '#475569', padding: 8 },
          },
          y: {
            grid : { color: 'rgba(255,255,255,0.04)', drawBorder: false },
            ticks: {
              color   : '#475569',
              padding : 8,
              callback: v => 'PKR ' + (v / 1000000).toFixed(1) + 'M',
            },
          },
        },
      },
    });

    /* ═══════════════════════════
       DOUGHNUT CHART — By Dept
    ═══════════════════════════ */
    const donutCtx = donutChartRef.current.getContext('2d');

    donutChartInst.current = new Chart(donutCtx, {
      type : 'doughnut',
      data : {
        labels  : CHART_DATA.department.labels,
        datasets: [{
          data            : CHART_DATA.department.values,
          backgroundColor : CHART_DATA.department.colors,
          borderColor     : '#020817',
          borderWidth     : 3,
          hoverOffset     : 8,
        }],
      },
      options: {
        responsive         : true,
        maintainAspectRatio: false,
        cutout             : '72%',
        plugins: {
          legend: {
            position : 'bottom',
            labels   : {
              boxWidth     : 10,
              boxHeight    : 10,
              borderRadius : 5,
              useBorderRadius: true,
              padding      : 14,
              color        : '#94a3b8',
              font         : { size: 11, weight: '500' },
            },
          },
          tooltip: {
            backgroundColor : 'rgba(15,23,42,0.95)',
            borderColor     : 'rgba(255,255,255,0.1)',
            borderWidth     : 1,
            padding         : 12,
            titleColor      : '#e2e8f0',
            bodyColor       : '#94a3b8',
            callbacks: {
              label: ctx => ` PKR ${ctx.parsed.toLocaleString()}`,
            },
          },
        },
      },
    });

    return () => {
      if (lineChartInst.current)  lineChartInst.current.destroy();
      if (donutChartInst.current) donutChartInst.current.destroy();
    };
  }, []);

  /* ════════════════════════════════════
     RENDER
  ════════════════════════════════════ */
  return (
    <div className="p-6 space-y-6 animate-fadeUp">

      {/* ══════════════════════════
          1. STAT CARDS
      ══════════════════════════ */}
      <StatCardsGrid />

      {/* ══════════════════════════
          2. CHARTS ROW
      ══════════════════════════ */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

        {/* ── Line Chart (spans 2 cols) ── */}
        <div
          className="glass-card rounded-3xl p-5 xl:col-span-2"
          style={{ border: '1px solid #004A70' }}
        >
          {/* Card header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3
                className="text-[#FAFAF9] font-bold text-base"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Salary Trend
              </h3>
              <p className="text-[#A8A29E] text-xs mt-0.5">Last 6 months overview</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="badge badge-paid">Monthly</span>
              <button
                onClick={() => onNavigate('Salary')}
                className="btn-ghost text-xs py-1.5 px-3"
              >
                Details →
              </button>
            </div>
          </div>

          {/* Chart */}
          <div className="chart-container" style={{ height: '260px' }}>
            <canvas ref={lineChartRef} />
          </div>
        </div>

        {/* ── Doughnut Chart (1 col) ── */}
        <div
          className="glass-card rounded-3xl p-5"
          style={{ border: '1px solid #004A70' }}
        >
          {/* Card header */}
          <div className="mb-4">
            <h3
              className="text-[#FAFAF9] font-bold text-base"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              By Department
            </h3>
            <p className="text-[#A8A29E] text-xs mt-0.5">Payroll distribution</p>
          </div>

          {/* Chart */}
          <div className="chart-container" style={{ height: '260px' }}>
            <canvas ref={donutChartRef} />
          </div>
        </div>

      </div>

      {/* ══════════════════════════
          3. BOTTOM ROW
      ══════════════════════════ */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

        {/* ── Payroll History Table ── */}
        <div
          className="glass-card rounded-3xl xl:col-span-2 overflow-hidden"
          style={{ border: '1px solid #004A70' }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-5 py-4"
            style={{ borderBottom: '1px solid #004A70' }}
          >
            <div>
              <h3
                className="text-[#FAFAF9] font-bold text-base"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Payroll History
              </h3>
              <p className="text-[#A8A29E] text-xs mt-0.5">Recent payroll runs</p>
            </div>
            <span className="badge badge-active">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FCBF49]/10 inline-block" />
              All Paid
            </span>
          </div>

          {/* Table */}
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Employees</th>
                  <th>Gross</th>
                  <th>Tax</th>
                  <th>Net Paid</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {PAYROLL_HISTORY.map(row => (
                  <tr key={row.id}>
                    <td>
                      <div>
                        <p className="text-[#FAFAF9] text-xs font-semibold">{row.month}</p>
                        <p className="text-[#A8A29E] text-xs">{row.processedOn}</p>
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-dept">{row.employees} staff</span>
                    </td>
                    <td className="text-[#FCBF49] font-semibold text-xs">
                      {formatCurrency(row.totalGross)}
                    </td>
                    <td className="text-pink-300 font-semibold text-xs">
                      {formatCurrency(row.totalTax)}
                    </td>
                    <td className="text-emerald-300 font-semibold text-xs">
                      {formatCurrency(row.totalNet)}
                    </td>
                    <td>
                      <span className={`badge ${row.status === 'Paid' ? 'badge-active' : 'badge-pending'}`}>
                        {row.status === 'Paid' ? '✓' : '⏳'} {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Recent Activity Feed ── */}
        <div
          className="glass-card rounded-3xl overflow-hidden"
          style={{ border: '1px solid #004A70' }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-5 py-4"
            style={{ borderBottom: '1px solid #004A70' }}
          >
            <div>
              <h3
                className="text-[#FAFAF9] font-bold text-base"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Recent Activity
              </h3>
              <p className="text-[#A8A29E] text-xs mt-0.5">Latest system events</p>
            </div>
            <div className="w-2 h-2 rounded-full bg-[#FCBF49]/10 pulse-ring" />
          </div>

          {/* Activity list */}
          <div className="divide-y" style={{ '--tw-divide-opacity': 1 }}>
            {RECENT_ACTIVITY.map((act, idx) => (
              <div
                key={act.id}
                className="flex items-start gap-3 px-5 py-3.5 hover:bg-white/3
                           transition-colors cursor-default"
                style={{
                  borderBottom      : idx < RECENT_ACTIVITY.length - 1
                    ? '1px solid #004A70' : 'none',
                  animationDelay    : `${idx * 60}ms`,
                }}
              >
                {/* Icon */}
                <div
                  className={`${act.iconBg} w-8 h-8 rounded-xl flex items-center
                              justify-center text-sm flex-shrink-0 mt-0.5`}
                  style={{ boxShadow: '0 4px 10px rgba(0,0,0,0.25)' }}
                >
                  {act.icon}
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <p className="text-[#FAFAF9] text-xs font-semibold leading-snug">
                    {act.text}
                  </p>
                  <p className="text-[#A8A29E] text-xs mt-0.5 truncate">{act.sub}</p>
                  <p className="text-[#A8A29E] text-xs mt-1">{act.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div
            className="px-5 py-3 text-center"
            style={{ borderTop: '1px solid #004A70' }}
          >
            <button className="text-[#FCBF49] text-xs font-semibold hover:text-[#FCBF49] transition-colors">
              View all activity →
            </button>
          </div>
        </div>

      </div>

      {/* ══════════════════════════
          4. EMPLOYEE SNAPSHOT
      ══════════════════════════ */}
      <div
        className="glass-card rounded-3xl overflow-hidden"
        style={{ border: '1px solid #004A70' }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{ borderBottom: '1px solid #004A70' }}
        >
          <div>
            <h3
              className="text-[#FAFAF9] font-bold text-base"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Employee Snapshot
            </h3>
            <p className="text-[#A8A29E] text-xs mt-0.5">Quick view of all staff</p>
          </div>
          <button
            onClick={() => onNavigate('Employees')}
            className="btn-primary text-xs py-2 px-4"
          >
            👥 Manage Employees
          </button>
        </div>

        {/* Employee cards grid */}
        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {EMPLOYEES.slice(0, 8).map((emp, idx) => {
            const payroll = computeEmployeePayroll(emp);
            return (
              <div
                key={emp.id}
                className="glass rounded-2xl p-4 hover:bg-white/8 transition-all
                           cursor-default group"
                style={{
                  border         : '1px solid #004A70',
                  animationDelay : `${idx * 40}ms`,
                }}
              >
                {/* Avatar + status */}
                <div className="flex items-start justify-between mb-3">
                  <div
                    className={`avatar ${emp.avatarColor} text-[#FAFAF9]`}
                    style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}
                  >
                    {emp.avatar}
                  </div>
                  <span className={`badge ${emp.status === 'Active' ? 'badge-active' : 'badge-inactive'}`}>
                    {emp.status}
                  </span>
                </div>

                {/* Name & designation */}
                <p className="text-[#FAFAF9] text-sm font-semibold leading-tight truncate">
                  {emp.name}
                </p>
                <p className="text-[#A8A29E] text-xs truncate mt-0.5">{emp.designation}</p>

                {/* Department badge */}
                <span className="badge badge-dept mt-2 text-xs">{emp.department}</span>

                {/* Net salary */}
                <div
                  className="mt-3 pt-2.5"
                  style={{ borderTop: '1px solid #004A70' }}
                >
                  <p className="text-[#A8A29E] text-xs">Net Monthly</p>
                  <p className="text-[#FCBF49] text-xs font-bold mt-0.5">
                    {formatCurrency(payroll.netSalary)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};



