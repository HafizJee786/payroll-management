/**
 * src/pages/Salary.jsx
 * ─────────────────────────────────────────
 * Salary Calculator page.
 *
 * Features:
 *  1. Employee selector dropdown
 *  2. Live salary breakdown panel
 *  3. Editable allowances
 *  4. Gross → Deductions → Net summary
 *  5. All-employees payroll summary table
 * ─────────────────────────────────────────
 */

const { useState, useEffect } = React;

const Salary = ({ onNavigate }) => {

  const [selectedId,   setSelectedId]   = useState(EMPLOYEES[0].id);
  const [allowances,   setAllowances]   = useState({ ...EMPLOYEES[0].allowances });
  const [basicSalary,  setBasicSalary]  = useState(EMPLOYEES[0].basicSalary);
  const [calculated,   setCalculated]   = useState(null);

  /* ── Sync when employee changes ── */
  useEffect(() => {
    const emp = getEmployeeById(selectedId);
    if (emp) {
      setBasicSalary(emp.basicSalary);
      setAllowances({ ...emp.allowances });
      setCalculated(null);
    }
  }, [selectedId]);

  const selectedEmp = getEmployeeById(selectedId);

  /* ── Handle allowance change ── */
  const handleAllowanceChange = (key, val) => {
    setAllowances(prev => ({ ...prev, [key]: parseInt(val) || 0 }));
    setCalculated(null);
  };

  /* ── Calculate ── */
  const handleCalculate = () => {
    const emp     = { ...selectedEmp, basicSalary, allowances };
    const result  = computeEmployeePayroll(emp);
    setCalculated(result);
  };

  /* ── Allowance config ── */
  const allowanceConfig = [
    { key: 'house',     label: 'House Rent Allowance', icon: '🏠', color: 'text-[#FCBF49]' },
    { key: 'medical',   label: 'Medical Allowance',    icon: '🏥', color: 'text-pink-400'   },
    { key: 'transport', label: 'Transport Allowance',  icon: '🚗', color: 'text-blue-400'   },
    { key: 'fuel',      label: 'Fuel Allowance',       icon: '⛽', color: 'text-orange-400' },
  ];

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
          <h2 className="text-[#FAFAF9] font-bold text-xl" style={{ fontFamily: "'Syne',sans-serif" }}>
            💰 Salary Calculator
          </h2>
          <p className="text-[#A8A29E] text-sm mt-1">
            Select an employee and compute their full salary breakdown
          </p>
        </div>
        <button onClick={() => onNavigate('Payslip')} className="btn-primary">
          📄 Generate Payslip
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-5">

        {/* ══════════════════════════
            LEFT — INPUT PANEL
        ══════════════════════════ */}
        <div className="xl:col-span-2 space-y-4">

          {/* Employee Selector */}
          <div className="glass-bright rounded-3xl p-5"
            style={{ border: '1px solid #004A70' }}>

            <p className="text-[#A8A29E] text-xs font-bold uppercase tracking-widest mb-3">
              Select Employee
            </p>

            {/* Employee cards */}
            <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
              {EMPLOYEES.map(emp => (
                <button
                  key={emp.id}
                  onClick={() => setSelectedId(emp.id)}
                  className="w-full flex items-center gap-3 p-3 rounded-2xl transition-all text-left"
                  style={{
                    background  : selectedId === emp.id
                      ? 'rgba(247,127,0,0.15)' : 'rgba(255,255,255,0.03)',
                    border      : selectedId === emp.id
                      ? '1px solid #F77F00' : '1px solid #004A70',
                  }}
                >
                  <div className={`avatar ${emp.avatarColor} text-[#FAFAF9] text-xs flex-shrink-0`}
                    style={{ width:'34px', height:'34px' }}>
                    {emp.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[#FAFAF9] text-xs font-semibold truncate">{emp.name}</p>
                    <p className="text-[#A8A29E] text-xs truncate">{emp.designation}</p>
                  </div>
                  <span className={`badge ${emp.status === 'Active' ? 'badge-active' : 'badge-inactive'} flex-shrink-0`}>
                    {emp.status}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Basic Salary Input */}
          <div className="glass-bright rounded-3xl p-5"
            style={{ border: '1px solid #004A70' }}>

            <p className="text-[#A8A29E] text-xs font-bold uppercase tracking-widest mb-3">
              Basic Salary
            </p>

            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A8A29E] text-xs font-bold">
                PKR
              </span>
              <input
                type="number"
                value={basicSalary}
                onChange={e => { setBasicSalary(parseInt(e.target.value) || 0); setCalculated(null); }}
                className="form-input pl-12 text-lg font-bold text-[#FAFAF9]"
                style={{ fontSize: '1.1rem' }}
              />
            </div>

            <p className="text-[#A8A29E] text-xs mt-2">
              Annual: {formatCurrency(basicSalary * 12)}
            </p>
          </div>

          {/* Allowances */}
          <div className="glass-bright rounded-3xl p-5"
            style={{ border: '1px solid #004A70' }}>

            <p className="text-[#A8A29E] text-xs font-bold uppercase tracking-widest mb-3">
              Allowances
            </p>

            <div className="space-y-3">
              {allowanceConfig.map(({ key, label, icon, color }) => (
                <div key={key}>
                  <label className="flex items-center gap-1.5 mb-1.5">
                    <span className="text-sm">{icon}</span>
                    <span className={`text-xs font-semibold ${color}`}>{label}</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A8A29E] text-xs">PKR</span>
                    <input
                      type="number"
                      value={allowances[key]}
                      onChange={e => handleAllowanceChange(key, e.target.value)}
                      className="form-input pl-10 text-sm"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Total allowances */}
            <div className="mt-4 pt-3 flex justify-between items-center"
              style={{ borderTop: '1px solid #004A70' }}>
              <span className="text-[#A8A29E] text-xs">Total Allowances</span>
              <span className="text-[#FCBF49] font-bold text-sm">
                {formatCurrency(Object.values(allowances).reduce((a, b) => a + b, 0))}
              </span>
            </div>
          </div>

          {/* Calculate button */}
          <button onClick={handleCalculate} className="btn-primary w-full justify-center py-3.5 text-base">
            ⚡ Calculate Salary
          </button>

        </div>

        {/* ══════════════════════════
            RIGHT — RESULTS PANEL
        ══════════════════════════ */}
        <div className="xl:col-span-3 space-y-4">

          {/* Employee info card */}
          {selectedEmp && (
            <div className="glass-bright rounded-3xl p-5"
              style={{ border: '1px solid #004A70' }}>
              <div className="flex items-center gap-4">
                <div className={`avatar ${selectedEmp.avatarColor} text-[#FAFAF9] text-lg`}
                  style={{ width:'52px', height:'52px', borderRadius:'16px', boxShadow:'0 6px 20px rgba(0,0,0,0.4)' }}>
                  {selectedEmp.avatar}
                </div>
                <div className="flex-1">
                  <h3 className="text-[#FAFAF9] font-bold text-lg" style={{ fontFamily:"'Syne',sans-serif" }}>
                    {selectedEmp.name}
                  </h3>
                  <p className="text-[#A8A29E] text-sm">{selectedEmp.designation} · {selectedEmp.department}</p>
                  <p className="text-[#A8A29E] text-xs mt-0.5">{selectedEmp.id} · Joined {selectedEmp.joinDate}</p>
                </div>
                <span className={`badge ${selectedEmp.status === 'Active' ? 'badge-active' : 'badge-inactive'}`}>
                  {selectedEmp.status}
                </span>
              </div>
            </div>
          )}

          {/* Results */}
          {!calculated ? (
            <div className="glass rounded-3xl p-12 flex flex-col items-center justify-center text-center"
              style={{ border: '1px solid #004A70', minHeight: '300px' }}>
              <div className="text-5xl mb-4">⚡</div>
              <p className="text-[#FAFAF9] font-semibold text-base mb-2">Ready to Calculate</p>
              <p className="text-[#A8A29E] text-sm">
                Adjust the salary & allowances, then click <br />
                <span className="text-[#FCBF49] font-semibold">Calculate Salary</span> to see the breakdown.
              </p>
            </div>
          ) : (
            <div className="space-y-4 animate-fadeUp">

              {/* 3 metric cards */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label:'Gross Salary',    value: calculated.grossSalary,    color:'purple', icon:'💼' },
                  { label:'Total Deductions',value: calculated.totalDeductions, color:'pink',   icon:'📉' },
                  { label:'Net Salary',      value: calculated.netSalary,       color:'green',  icon:'✅' },
                ].map(m => (
                  <div key={m.label}
                    className={`stat-card ${m.color} p-4 text-center`}>
                    <div className="text-2xl mb-2">{m.icon}</div>
                    <p className={`font-display font-bold text-sm text-gradient-${m.color}`}
                      style={{ fontFamily:"'Syne',sans-serif" }}>
                      {formatCurrency(m.value)}
                    </p>
                    <p className="text-[#A8A29E] text-xs mt-1">{m.label}</p>
                  </div>
                ))}
              </div>

              {/* Full breakdown */}
              <div className="glass-bright rounded-3xl overflow-hidden"
                style={{ border: '1px solid #004A70' }}>

                <div className="px-5 py-4" style={{ borderBottom:'1px solid #004A70' }}>
                  <h3 className="text-[#FAFAF9] font-bold text-sm" style={{ fontFamily:"'Syne',sans-serif" }}>
                    Full Salary Breakdown
                  </h3>
                </div>

                <div className="p-5 space-y-2">

                  {/* Earnings section */}
                  <p className="text-[#A8A29E] text-xs font-bold uppercase tracking-widest mb-2">Earnings</p>

                  {[
                    { label:'Basic Salary',            value: basicSalary,                  color:'text-[#FAFAF9]'     },
                    { label:'House Rent Allowance',    value: allowances.house,              color:'text-[#FCBF49]'},
                    { label:'Medical Allowance',       value: allowances.medical,            color:'text-[#FCBF49]'},
                    { label:'Transport Allowance',     value: allowances.transport,          color:'text-[#FCBF49]'},
                    { label:'Fuel Allowance',          value: allowances.fuel,               color:'text-[#FCBF49]'},
                  ].map(row => (
                    <div key={row.label} className="flex justify-between items-center py-2 px-3 rounded-xl hover:bg-white/3">
                      <span className="text-[#A8A29E] text-xs">{row.label}</span>
                      <span className={`text-xs font-semibold ${row.color}`}>{formatCurrency(row.value)}</span>
                    </div>
                  ))}

                  {/* Gross */}
                  <div className="flex justify-between items-center py-2.5 px-3 rounded-xl mt-1"
                    style={{ background:'rgba(247,127,0,0.1)', border:'1px solid #F77F00' }}>
                    <span className="text-[#FCBF49] text-sm font-bold">Gross Salary</span>
                    <span className="text-[#FCBF49] font-bold text-sm">{formatCurrency(calculated.grossSalary)}</span>
                  </div>

                  <div className="divider" />

                  {/* Deductions section */}
                  <p className="text-[#A8A29E] text-xs font-bold uppercase tracking-widest mb-2">Deductions</p>

                  {[
                    { label:`Income Tax (Annual: ${formatCurrency(calculated.annualTax)})`, value: calculated.monthlyTax,      color:'text-pink-400'   },
                    { label:'EOBI Contribution (1%)',                                        value: calculated.eobi,            color:'text-orange-400' },
                    { label:'SESSI/PESSI (1%)',                                              value: calculated.sessi,           color:'text-blue-400'   },
                    { label:'Provident Fund (8.33%)',                                        value: calculated.providentFund,   color:'text-purple-400' },
                    { label:'Health Insurance (Fixed)',                                      value: calculated.healthInsurance, color:'text-green-400'  },
                  ].map(row => (
                    <div key={row.label} className="flex justify-between items-center py-2 px-3 rounded-xl hover:bg-white/3">
                      <span className="text-[#A8A29E] text-xs">{row.label}</span>
                      <span className={`text-xs font-semibold ${row.color}`}>({formatCurrency(row.value)})</span>
                    </div>
                  ))}

                  {/* Net */}
                  <div className="flex justify-between items-center py-3 px-3 rounded-xl mt-1"
                    style={{ background:'rgba(252,191,73,0.1)', border:'1px solid rgba(252,191,73,0.2)' }}>
                    <span className="text-emerald-300 font-bold text-base">Net Salary</span>
                    <span className="text-emerald-300 font-bold text-lg">{formatCurrency(calculated.netSalary)}</span>
                  </div>

                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3">
                <button onClick={() => onNavigate('Payslip')} className="btn-primary flex-1 justify-center">
                  📄 Generate Payslip
                </button>
                <button onClick={() => setCalculated(null)} className="btn-ghost">
                  ↺ Reset
                </button>
              </div>

            </div>
          )}
        </div>
      </div>

      {/* ══════════════════════════
          ALL EMPLOYEES SUMMARY
      ══════════════════════════ */}
      <div className="glass-card rounded-3xl overflow-hidden"
        style={{ border:'1px solid #004A70' }}>

        <div className="flex items-center justify-between px-5 py-4"
          style={{ borderBottom:'1px solid #004A70' }}>
          <div>
            <h3 className="text-[#FAFAF9] font-bold text-base" style={{ fontFamily:"'Syne',sans-serif" }}>
              All Employees — Salary Summary
            </h3>
            <p className="text-[#A8A29E] text-xs mt-0.5">Monthly payroll overview for all staff</p>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Basic</th>
                <th>Allowances</th>
                <th>Gross</th>
                <th>Tax</th>
                <th>EOBI</th>
                <th>PF</th>
                <th>Total Deductions</th>
                <th>Net Salary</th>
              </tr>
            </thead>
            <tbody>
              {EMPLOYEES.map((emp, idx) => {
                const p = computeEmployeePayroll(emp);
                return (
                  <tr key={emp.id} style={{ animationDelay:`${idx * 30}ms` }}>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className={`avatar ${emp.avatarColor} text-[#FAFAF9] text-xs`}
                          style={{ width:'30px', height:'30px' }}>
                          {emp.avatar}
                        </div>
                        <div>
                          <p className="text-[#FAFAF9] text-xs font-semibold">{emp.name}</p>
                          <p className="text-[#A8A29E] text-xs">{emp.department}</p>
                        </div>
                      </div>
                    </td>
                    <td className="text-[#FAFAF9] text-xs font-semibold">{formatCurrency(emp.basicSalary)}</td>
                    <td className="text-[#FCBF49] text-xs">{formatCurrency(p.totalAllowances)}</td>
                    <td className="text-[#FCBF49] text-xs font-bold">{formatCurrency(p.grossSalary)}</td>
                    <td className="text-pink-300 text-xs">{formatCurrency(p.monthlyTax)}</td>
                    <td className="text-orange-300 text-xs">{formatCurrency(p.eobi)}</td>
                    <td className="text-purple-300 text-xs">{formatCurrency(p.providentFund)}</td>
                    <td className="text-[#D62828] text-xs font-semibold">{formatCurrency(p.totalDeductions)}</td>
                    <td className="text-emerald-300 text-xs font-bold">{formatCurrency(p.netSalary)}</td>
                  </tr>
                );
              })}
            </tbody>
            {/* Totals row */}
            <tfoot>
              <tr style={{ background:'rgba(247,127,0,0.08)', borderTop:'1px solid #F77F00' }}>
                <td className="text-[#FCBF49] font-bold text-xs px-4 py-3">TOTALS</td>
                <td className="text-[#FAFAF9] font-bold text-xs px-4 py-3">
                  {formatCurrency(EMPLOYEES.reduce((s,e) => s + e.basicSalary, 0))}
                </td>
                <td className="text-[#FCBF49] text-xs px-4 py-3">
                  {formatCurrency(EMPLOYEES.reduce((s,e) => s + Object.values(e.allowances).reduce((a,b)=>a+b,0), 0))}
                </td>
                <td className="text-[#FCBF49] font-bold text-xs px-4 py-3">
                  {formatCurrency(EMPLOYEES.reduce((s,e) => s + computeEmployeePayroll(e).grossSalary, 0))}
                </td>
                <td className="text-pink-300 text-xs px-4 py-3">
                  {formatCurrency(EMPLOYEES.reduce((s,e) => s + computeEmployeePayroll(e).monthlyTax, 0))}
                </td>
                <td className="text-orange-300 text-xs px-4 py-3">
                  {formatCurrency(EMPLOYEES.reduce((s,e) => s + computeEmployeePayroll(e).eobi, 0))}
                </td>
                <td className="text-purple-300 text-xs px-4 py-3">
                  {formatCurrency(EMPLOYEES.reduce((s,e) => s + computeEmployeePayroll(e).providentFund, 0))}
                </td>
                <td className="text-[#D62828] font-bold text-xs px-4 py-3">
                  {formatCurrency(EMPLOYEES.reduce((s,e) => s + computeEmployeePayroll(e).totalDeductions, 0))}
                </td>
                <td className="text-emerald-300 font-bold text-xs px-4 py-3">
                  {formatCurrency(EMPLOYEES.reduce((s,e) => s + computeEmployeePayroll(e).netSalary, 0))}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

    </div>
  );
};


