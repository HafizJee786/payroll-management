/**
 * src/pages/Taxes.jsx
 * ─────────────────────────────────────────
 * Tax & Deductions page.
 *
 * Features:
 *  1. Pakistan FBR tax slabs table
 *  2. Live tax calculator tool
 *  3. Deduction types reference cards
 *  4. Per-employee tax summary table
 * ─────────────────────────────────────────
 */

const { useState } = React;

const Taxes = () => {

  const [calcIncome,  setCalcIncome]  = useState('');
  const [calcResult,  setCalcResult]  = useState(null);
  const [period,      setPeriod]      = useState('monthly'); // monthly | annual

  /* ── Run live tax calculation ── */
  const handleCalcTax = () => {
    const income = parseFloat(calcIncome);
    if (!income || income < 0) return;

    const annualIncome = period === 'monthly' ? income * 12 : income;
    const annualTax    = calculateTax(annualIncome);
    const monthlyTax   = annualTax / 12;
    const effectiveRate = annualIncome > 0 ? ((annualTax / annualIncome) * 100).toFixed(2) : 0;

    /* Find applicable slab */
    const slab = TAX_BRACKETS.find(b =>
      annualIncome >= b.minAnnual && annualIncome <= b.maxAnnual
    ) || TAX_BRACKETS[TAX_BRACKETS.length - 1];

    setCalcResult({
      annualIncome,
      annualTax,
      monthlyTax,
      effectiveRate,
      slab,
    });
  };

  /* ════════════════════════════════════
     RENDER
  ════════════════════════════════════ */
  return (
    <div className="p-6 space-y-6 animate-fadeUp">

      {/* ══════════════════════════
          PAGE HEADER
      ══════════════════════════ */}
      <div className="page-header">
        <div>
          <h2 className="text-[#FAFAF9] font-bold text-xl" style={{ fontFamily:"'Syne',sans-serif" }}>
            🧾 Tax & Deductions
          </h2>
          <p className="text-[#A8A29E] text-sm mt-1">
            Pakistan FBR tax slabs & deduction reference — FY 2024–25
          </p>
        </div>
        <span className="badge badge-active">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FCBF49]/10 inline-block" />
          FBR 2024–25
        </span>
      </div>

      {/* ══════════════════════════
          TOP ROW — Tax slabs + Calculator
      ══════════════════════════ */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

        {/* ── FBR Tax Slabs Table ── */}
        <div className="xl:col-span-2 glass-card rounded-3xl overflow-hidden"
          style={{ border:'1px solid #004A70' }}>

          <div className="flex items-center justify-between px-5 py-4"
            style={{ borderBottom:'1px solid #004A70' }}>
            <div>
              <h3 className="text-[#FAFAF9] font-bold text-base" style={{ fontFamily:"'Syne',sans-serif" }}>
                FBR Income Tax Slabs
              </h3>
              <p className="text-[#A8A29E] text-xs mt-0.5">Salaried individuals — FY 2024–25</p>
            </div>
            <span className="badge badge-dept">Pakistan</span>
          </div>

          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Slab</th>
                  <th>Annual Income Range</th>
                  <th>Tax Rate</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {TAX_BRACKETS.map((slab, idx) => (
                  <tr key={slab.id}>
                    <td>
                      <div className={`${slab.color} w-8 h-8 rounded-xl flex items-center
                                        justify-center text-[#FAFAF9] text-xs font-bold`}
                        style={{ boxShadow:'0 3px 10px rgba(0,0,0,0.3)' }}>
                        {idx + 1}
                      </div>
                    </td>
                    <td>
                      <p className="text-[#FAFAF9] text-xs font-semibold">
                        {slab.minAnnual === 0 ? 'Up to' : `PKR ${slab.minAnnual.toLocaleString()} –`}
                        {slab.maxAnnual === Infinity
                          ? ' & above'
                          : ` PKR ${slab.maxAnnual.toLocaleString()}`}
                      </p>
                    </td>
                    <td>
                      <span className={`badge ${
                        slab.rate === 0    ? 'badge-active'  :
                        slab.rate <= 0.10  ? 'badge-paid'    :
                        slab.rate <= 0.20  ? 'badge-dept'    :
                        slab.rate <= 0.30  ? 'badge-pending' :
                        'badge-inactive'
                      }`}>
                        {slab.rateLabel}
                      </span>
                    </td>
                    <td className="text-[#A8A29E] text-xs">{slab.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Live Tax Calculator ── */}
        <div className="glass-bright rounded-3xl p-5"
          style={{ border:'1px solid #004A70' }}>

          <h3 className="text-[#FAFAF9] font-bold text-base mb-4" style={{ fontFamily:"'Syne',sans-serif" }}>
            🧮 Tax Calculator
          </h3>

          {/* Period toggle */}
          <div className="flex gap-2 mb-4">
            {['monthly','annual'].map(p => (
              <button
                key={p}
                onClick={() => { setPeriod(p); setCalcResult(null); }}
                className="flex-1 py-2 rounded-xl text-xs font-semibold capitalize transition-all"
                style={{
                  background  : period === p ? 'rgba(247,127,0,0.2)' : 'rgba(255,255,255,0.05)',
                  color       : period === p ? '#F77F00' : '#64748b',
                  border      : period === p ? '1px solid #F77F00' : '1px solid #004A70',
                }}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Income input */}
          <div className="mb-4">
            <label className="form-label">
              {period === 'monthly' ? 'Monthly' : 'Annual'} Income (PKR)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A8A29E] text-xs font-bold">
                PKR
              </span>
              <input
                type="number"
                value={calcIncome}
                onChange={e => { setCalcIncome(e.target.value); setCalcResult(null); }}
                placeholder="e.g. 150000"
                className="form-input pl-12"
              />
            </div>
            {calcIncome && period === 'monthly' && (
              <p className="text-[#A8A29E] text-xs mt-1">
                Annual: PKR {(parseFloat(calcIncome) * 12).toLocaleString()}
              </p>
            )}
          </div>

          <button onClick={handleCalcTax} className="btn-primary w-full justify-center mb-4">
            🧾 Calculate Tax
          </button>

          {/* Results */}
          {calcResult && (
            <div className="space-y-2 animate-fadeUp">
              <div className="divider" />

              {[
                { label:'Annual Income',    value: formatCurrency(calcResult.annualIncome), color:'text-[#FAFAF9]'         },
                { label:'Annual Tax',       value: formatCurrency(calcResult.annualTax),    color:'text-pink-400'      },
                { label:'Monthly Tax',      value: formatCurrency(Math.round(calcResult.monthlyTax)), color:'text-orange-400' },
                { label:'Effective Rate',   value: calcResult.effectiveRate + '%',           color:'text-[#FCBF49]'    },
              ].map(row => (
                <div key={row.label}
                  className="flex justify-between items-center py-2 px-3 rounded-xl hover:bg-white/3">
                  <span className="text-[#A8A29E] text-xs">{row.label}</span>
                  <span className={`text-xs font-bold ${row.color}`}>{row.value}</span>
                </div>
              ))}

              {/* Applicable slab */}
              <div className="mt-3 p-3 rounded-2xl"
                style={{ background:'rgba(247,127,0,0.1)', border:'1px solid #F77F00' }}>
                <p className="text-[#A8A29E] text-xs mb-1">Applicable Slab</p>
                <div className="flex items-center gap-2">
                  <div className={`${calcResult.slab.color} w-7 h-7 rounded-lg flex items-center
                                    justify-center text-[#FAFAF9] text-xs font-bold flex-shrink-0`}>
                    {TAX_BRACKETS.indexOf(calcResult.slab) + 1}
                  </div>
                  <p className="text-[#FAFAF9] text-xs font-semibold">{calcResult.slab.desc}</p>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* ══════════════════════════
          DEDUCTION TYPES CARDS
      ══════════════════════════ */}
      <div>
        <h3 className="text-[#FAFAF9] font-bold text-base mb-3" style={{ fontFamily:"'Syne',sans-serif" }}>
          Deduction Types
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {DEDUCTION_TYPES.map((ded, idx) => (
            <div
              key={ded.id}
              className="glass-card rounded-2xl p-4 animate-fadeUp"
              style={{
                border         : '1px solid #004A70',
                animationDelay : `${idx * 50}ms`,
              }}
            >
              <div className="flex items-start gap-3">
                <div className={`${ded.color} w-10 h-10 rounded-2xl flex items-center
                                  justify-content center text-[#FAFAF9] text-lg flex-shrink-0`}
                  style={{ display:'flex', alignItems:'center', justifyContent:'center',
                           boxShadow:'0 4px 12px rgba(0,0,0,0.3)' }}>
                  {ded.id === 'ded-1' ? '🧾'
                  : ded.id === 'ded-2' ? '🏦'
                  : ded.id === 'ded-3' ? '🛡️'
                  : ded.id === 'ded-4' ? '💼'
                  : ded.id === 'ded-5' ? '🏥'
                  : '💳'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-[#FAFAF9] text-sm font-semibold">{ded.name}</p>
                    <span className={`badge flex-shrink-0 ${
                      ded.type === 'Mandatory' ? 'badge-inactive' :
                      ded.type === 'Voluntary' ? 'badge-active'   : 'badge-pending'
                    }`}>
                      {ded.type}
                    </span>
                  </div>
                  <p className="text-[#A8A29E] text-xs">{ded.basis}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════
          PER-EMPLOYEE TAX TABLE
      ══════════════════════════ */}
      <div className="glass-card rounded-3xl overflow-hidden"
        style={{ border:'1px solid #004A70' }}>

        <div className="flex items-center justify-between px-5 py-4"
          style={{ borderBottom:'1px solid #004A70' }}>
          <div>
            <h3 className="text-[#FAFAF9] font-bold text-base" style={{ fontFamily:"'Syne',sans-serif" }}>
              Employee Tax Summary
            </h3>
            <p className="text-[#A8A29E] text-xs mt-0.5">Monthly tax deductions per employee</p>
          </div>
          <span className="badge badge-dept">Current Month</span>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Gross Salary</th>
                <th>Annual Gross</th>
                <th>Annual Tax</th>
                <th>Monthly Tax</th>
                <th>EOBI</th>
                <th>SESSI</th>
                <th>Provident Fund</th>
                <th>Effective Rate</th>
              </tr>
            </thead>
            <tbody>
              {EMPLOYEES.map((emp, idx) => {
                const p             = computeEmployeePayroll(emp);
                const effectiveRate = p.annualGross > 0
                  ? ((p.annualTax / p.annualGross) * 100).toFixed(2)
                  : '0.00';
                return (
                  <tr key={emp.id} style={{ animationDelay:`${idx*30}ms` }}>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className={`avatar ${emp.avatarColor} text-[#FAFAF9] text-xs`}
                          style={{ width:'30px', height:'30px' }}>
                          {emp.avatar}
                        </div>
                        <div>
                          <p className="text-[#FAFAF9] text-xs font-semibold">{emp.name}</p>
                          <p className="text-[#A8A29E] text-xs">{emp.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="text-[#FAFAF9] text-xs font-semibold">{formatCurrency(p.grossSalary)}</td>
                    <td className="text-[#FCBF49] text-xs">{formatCurrency(p.annualGross)}</td>
                    <td className="text-pink-300 text-xs">{formatCurrency(p.annualTax)}</td>
                    <td className="text-pink-300 text-xs font-bold">{formatCurrency(p.monthlyTax)}</td>
                    <td className="text-orange-300 text-xs">{formatCurrency(p.eobi)}</td>
                    <td className="text-blue-300 text-xs">{formatCurrency(p.sessi)}</td>
                    <td className="text-purple-300 text-xs">{formatCurrency(p.providentFund)}</td>
                    <td>
                      <span className={`badge ${
                        parseFloat(effectiveRate) === 0 ? 'badge-active'  :
                        parseFloat(effectiveRate) < 10  ? 'badge-paid'    :
                        parseFloat(effectiveRate) < 20  ? 'badge-pending' :
                        'badge-inactive'
                      }`}>
                        {effectiveRate}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr style={{ background:'rgba(214,40,40,0.08)', borderTop:'1px solid rgba(214,40,40,0.2)' }}>
                <td className="text-pink-300 font-bold text-xs px-4 py-3">TOTALS</td>
                <td className="text-[#FAFAF9] font-bold text-xs px-4 py-3">
                  {formatCurrency(EMPLOYEES.reduce((s,e) => s + computeEmployeePayroll(e).grossSalary, 0))}
                </td>
                <td className="text-[#FCBF49] text-xs px-4 py-3">
                  {formatCurrency(EMPLOYEES.reduce((s,e) => s + computeEmployeePayroll(e).annualGross, 0))}
                </td>
                <td className="text-pink-300 text-xs px-4 py-3">
                  {formatCurrency(EMPLOYEES.reduce((s,e) => s + computeEmployeePayroll(e).annualTax, 0))}
                </td>
                <td className="text-pink-300 font-bold text-xs px-4 py-3">
                  {formatCurrency(EMPLOYEES.reduce((s,e) => s + computeEmployeePayroll(e).monthlyTax, 0))}
                </td>
                <td className="text-orange-300 text-xs px-4 py-3">
                  {formatCurrency(EMPLOYEES.reduce((s,e) => s + computeEmployeePayroll(e).eobi, 0))}
                </td>
                <td className="text-blue-300 text-xs px-4 py-3">
                  {formatCurrency(EMPLOYEES.reduce((s,e) => s + computeEmployeePayroll(e).sessi, 0))}
                </td>
                <td className="text-purple-300 text-xs px-4 py-3">
                  {formatCurrency(EMPLOYEES.reduce((s,e) => s + computeEmployeePayroll(e).providentFund, 0))}
                </td>
                <td className="text-[#A8A29E] text-xs px-4 py-3">—</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

    </div>
  );
};


