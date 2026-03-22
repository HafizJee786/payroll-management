/**
 * src/components/StatCard.jsx
 * ─────────────────────────────────────────
 * Reusable metric / stat card component.
 *
 * Props:
 *  - label     : string  — card title
 *  - value     : string  — main metric value
 *  - change    : string  — sub-label / trend text
 *  - trend     : 'up' | 'down' | 'neutral'
 *  - color     : 'purple'|'blue'|'pink'|'green'|'orange'
 *  - icon      : string  — emoji icon
 *  - iconBg    : string  — CSS class for icon bg gradient
 *  - index     : number  — for stagger animation delay
 * ─────────────────────────────────────────
 */

const StatCard = ({ label, value, change, trend, color, icon, iconBg, index = 0 }) => {

  /* ── Trend arrow & color ── */
  const trendConfig = {
    up      : { arrow: '↑', textColor: 'text-[#FCBF49]', bgColor: 'bg-[#FCBF49]/10' },
    down    : { arrow: '↓', textColor: 'text-[#D62828]',     bgColor: 'bg-[#D62828]/10'     },
    neutral : { arrow: '→', textColor: 'text-[#A8A29E]',   bgColor: 'bg-slate-400/10'   },
  };

  const tc = trendConfig[trend] || trendConfig.neutral;

  /* ── Stagger delay map ── */
  const delays = ['0ms', '60ms', '120ms', '180ms', '240ms'];
  const delay  = delays[index] || '0ms';

  return (
    <div
      className={`stat-card ${color} animate-fadeUp`}
      style={{ animationDelay: delay, animationFillMode: 'forwards', opacity: 0 }}
    >
      {/* ── Card Body ── */}
      <div className="p-5">

        {/* Top Row — icon + trend badge */}
        <div className="flex items-start justify-between mb-4">

          {/* Icon container */}
          <div
            className={`${iconBg} w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-lg`}
            style={{ boxShadow: '0 8px 20px rgba(0,0,0,0.3)' }}
          >
            {icon}
          </div>

          {/* Trend badge */}
          <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full ${tc.bgColor}`}>
            <span className={`text-xs font-bold ${tc.textColor}`}>{tc.arrow}</span>
            <span className={`text-xs font-semibold ${tc.textColor}`}>
              {trend === 'up' ? 'Up' : trend === 'down' ? 'Down' : 'Stable'}
            </span>
          </div>

        </div>

        {/* Value */}
        <div className="mb-1">
          <span
            className={`font-display text-2xl font-800 text-gradient-${color}`}
            style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}
          >
            {value}
          </span>
        </div>

        {/* Label */}
        <p className="text-[#A8A29E] text-sm font-medium mb-3">{label}</p>

        {/* Divider */}
        <div className="divider" style={{ margin: '0 0 10px 0' }} />

        {/* Change text */}
        <p className={`text-xs font-semibold ${tc.textColor} flex items-center gap-1.5`}>
          <span className={`w-1.5 h-1.5 rounded-full ${tc.bgColor.replace('/10', '')}`}
            style={{ display: 'inline-block', background: tc.textColor.includes('emerald') ? '#FCBF49' : tc.textColor.includes('red') ? '#D62828' : '#94a3b8' }}
          />
          {change}
        </p>

      </div>

      {/* ── Decorative glow blob (bottom-right) ── */}
      <div
        className="absolute bottom-0 right-0 w-24 h-24 rounded-full opacity-10 blur-2xl pointer-events-none"
        style={{
          background: color === 'purple' ? '#D62828'
                    : color === 'blue'   ? '#F77F00'
                    : color === 'pink'   ? '#BA2020'
                    : color === 'green'  ? '#FCBF49'
                    : '#F77F00',
        }}
      />

    </div>
  );
};


/* ═══════════════════════════════════════
   STAT CARDS GRID
   Renders all 4 stat cards from data
═══════════════════════════════════════ */
const StatCardsGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {DASHBOARD_STATS.map((stat, index) => (
        <StatCard
          key={stat.id}
          label={stat.label}
          value={stat.value}
          change={stat.change}
          trend={stat.trend}
          color={stat.color}
          icon={stat.icon}
          iconBg={stat.iconBg}
          index={index}
        />
      ))}
    </div>
  );
};


