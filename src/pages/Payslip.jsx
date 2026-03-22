/**
 * src/pages/Payslip.jsx
 * ─────────────────────────────────────────
 * Payslip Generator page.
 *
 * Features:
 *  1. Employee + month selector
 *  2. Beautiful payslip preview card
 *  3. Print / Download button
 *  4. Recent payslips history list
 * ─────────────────────────────────────────
 */

const { useState } = React;

const Payslip = () => {

  const [selectedId, setSelectedId] = useState(EMPLOYEES[0].id);
  const [month,      setMonth]      = useState('March 2025');
  const [generated,  setGenerated]  = useState(false);

  const months = [
    'March 2025','February 2025','January 2025',
    'December 2024','November 2024','October 2024',
  ];

  const emp     = EMPLOYEES.find(e => e.id === selectedId) || EMPLOYEES[0];
  const payroll = computeEmployeePayroll(emp);

  const handleGenerate = () => setGenerated(true);

  const handlePrint = () => {
    const printContent = document.getElementById('payslip-preview');
    const win = window.open('', '_blank');
    win.document.write(`
      <html>
        <head>
          <title>Payslip — ${emp.name} — ${month}</title>
          <style>
            * { box-sizing:border-box; margin:0; padding:0; }
            body { font-family:'Plus Jakarta Sans',sans-serif; background:#fff; color:#1e293b; padding:20px; }
            .payslip { max-width:720px; margin:0 auto; border:1px solid #e2e8f0; border-radius:12px; overflow:hidden; }
            .header  { background:linear-gradient(135deg,#D62828,#6366f1); color:#fff; padding:24px; }
            .header h1 { font-size:20px; font-weight:800; }
            .header p  { font-size:12px; opacity:0.8; margin-top:4px; }
            .info-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; padding:20px; background:#f8fafc; }
            .info-item label { font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:.05em; color:#94a3b8; }
            .info-item p     { font-size:13px; font-weight:600; color:#1e293b; margin-top:2px; }
            .section { padding:20px; }
            .section h3 { font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.07em; color:#94a3b8; margin-bottom:12px; }
            .row { display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid #f1f5f9; font-size:13px; }
            .row:last-child { border-bottom:none; }
            .total-row { background:#f8fafc; padding:12px 16px; border-radius:8px; display:flex; justify-content:space-between; font-weight:700; font-size:14px; margin-top:8px; }
            .net-row   { background:#ecfdf5; padding:14px 16px; border-radius:8px; display:flex; justify-content:space-between; font-weight:800; font-size:16px; color:#059669; margin-top:8px; }
            .footer { background:#f8fafc; padding:16px 20px; text-align:center; font-size:11px; color:#94a3b8; border-top:1px solid #e2e8f0; }
            @media print { body { padding:0; } }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
        </body>
      </html>
    `);
    win.document.close();
    win.print();
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
            📄 Payslip Generator
          </h2>
          <p className="text-[#A8A29E] text-sm mt-1">
            Generate and preview employee payslips
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

        {/* ══════════════════════════
            LEFT — CONTROLS
        ══════════════════════════ */}
        <div className="space-y-4">

          {/* Employee selector */}
          <div className="glass-bright rounded-3xl p-5"
            style={{ border:'1px solid #004A70' }}>

            <p className="text-[#A8A29E] text-xs font-bold uppercase tracking-widest mb-3">
              Select Employee
            </p>

            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {EMPLOYEES.map(e => (
                <button
                  key={e.id}
                  onClick={() => { setSelectedId(e.id); setGenerated(false); }}
                  className="w-full flex items-center gap-3 p-3 rounded-2xl transition-all text-left"
                  style={{
                    background  : selectedId === e.id ? 'rgba(247,127,0,0.15)' : 'rgba(255,255,255,0.03)',
                    border      : selectedId === e.id ? '1px solid #F77F00' : '1px solid #004A70',
                  }}
                >
                  <div className={`avatar ${e.avatarColor} text-[#FAFAF9] text-xs flex-shrink-0`}
                    style={{ width:'34px', height:'34px' }}>
                    {e.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[#FAFAF9] text-xs font-semibold truncate">{e.name}</p>
                    <p className="text-[#A8A29E] text-xs truncate">{e.department}</p>
                  </div>
                  {selectedId === e.id && (
                    <span className="w-2 h-2 rounded-full bg-[#F77F00] flex-shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Month selector */}
          <div className="glass-bright rounded-3xl p-5"
            style={{ border:'1px solid #004A70' }}>

            <p className="text-[#A8A29E] text-xs font-bold uppercase tracking-widest mb-3">
              Payslip Month
            </p>

            <div className="space-y-2">
              {months.map(m => (
                <button
                  key={m}
                  onClick={() => { setMonth(m); setGenerated(false); }}
                  className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl transition-all"
                  style={{
                    background  : month === m ? 'rgba(247,127,0,0.15)' : 'rgba(255,255,255,0.03)',
                    border      : month === m ? '1px solid #F77F00' : '1px solid #004A70',
                  }}
                >
                  <span className={`text-xs font-semibold ${month === m ? 'text-[#FCBF49]' : 'text-[#A8A29E]'}`}>
                    📅 {m}
                  </span>
                  {month === m && <span className="text-[#FCBF49] text-xs">✓</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Generate button */}
          <button onClick={handleGenerate} className="btn-primary w-full justify-center py-3.5 text-base">
            📄 Generate Payslip
          </button>

          {/* Print button — only when generated */}
          {generated && (
            <button
              onClick={handlePrint}
              className="btn-ghost w-full justify-center py-3 animate-fadeUp"
            >
              🖨️ Print / Download
            </button>
          )}

          {/* Recent payslips */}
          <div className="glass-bright rounded-3xl p-5"
            style={{ border:'1px solid #004A70' }}>

            <p className="text-[#A8A29E] text-xs font-bold uppercase tracking-widest mb-3">
              Recent Payslips
            </p>

            <div className="space-y-2">
              {PAYROLL_HISTORY.slice(0, 4).map(h => (
                <div
                  key={h.id}
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/5 cursor-pointer transition-colors"
                >
                  <div className="w-8 h-8 bg-grad-orange rounded-xl flex items-center justify-center text-sm flex-shrink-0">
                    📄
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[#FAFAF9] text-xs font-semibold">{h.month}</p>
                    <p className="text-[#A8A29E] text-xs">{h.employees} employees</p>
                  </div>
                  <span className="badge badge-active text-xs">
                    {h.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══════════════════════════
            RIGHT — PAYSLIP PREVIEW
        ══════════════════════════ */}
        <div className="xl:col-span-2">

          {!generated ? (
            /* Empty state */
            <div className="glass rounded-3xl p-16 flex flex-col items-center justify-center text-center h-full"
              style={{ border:'1px solid #004A70', minHeight:'500px' }}>
              <div className="text-6xl mb-4">📄</div>
              <p className="text-[#FAFAF9] font-semibold text-lg mb-2">No Payslip Generated</p>
              <p className="text-[#A8A29E] text-sm max-w-xs">
                Select an employee and month, then click
                <span className="text-[#FCBF49] font-semibold"> Generate Payslip</span> to preview it here.
              </p>
            </div>
          ) : (
            /* Payslip preview */
            <div className="animate-fadeUp">

              {/* Preview wrapper — printable area */}
              <div id="payslip-preview">
                <div
                  className="rounded-3xl overflow-hidden"
                  style={{
                    background  : '#fff',
                    boxShadow   : '0 30px 80px rgba(0,0,0,0.5)',
                    border      : '1px solid #004A70',
                  }}
                >

                  {/* ── Payslip Header ── */}
                  <div style={{ background:'linear-gradient(135deg,#D62828,#6366f1)', padding:'28px 24px' }}>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                      <div>
                        <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'8px' }}>
                          <div style={{
                            width:'40px', height:'40px', background:'rgba(255,255,255,0.2)',
                            borderRadius:'12px', display:'flex', alignItems:'center',
                            justifyContent:'center', fontSize:'18px', fontWeight:'800', color:'#fff',
                            fontFamily:"'Syne',sans-serif",
                          }}>P</div>
                          <div>
                            <h1 style={{ color:'#fff', fontSize:'18px', fontWeight:'800', fontFamily:"'Syne',sans-serif" }}>
                              PayRoll Pro
                            </h1>
                            <p style={{ color:'rgba(255,255,255,0.7)', fontSize:'11px' }}>
                              Corporate Edition
                            </p>
                          </div>
                        </div>
                        <p style={{ color:'rgba(255,255,255,0.6)', fontSize:'11px', marginTop:'4px' }}>
                          123 Business Avenue, Lahore, Pakistan
                        </p>
                      </div>
                      <div style={{ textAlign:'right' }}>
                        <div style={{
                          background:'rgba(255,255,255,0.15)', padding:'6px 14px',
                          borderRadius:'20px', display:'inline-block', marginBottom:'8px',
                        }}>
                          <span style={{ color:'#fff', fontSize:'11px', fontWeight:'700' }}>PAYSLIP</span>
                        </div>
                        <p style={{ color:'rgba(255,255,255,0.8)', fontSize:'12px', fontWeight:'600' }}>
                          {month}
                        </p>
                        <p style={{ color:'rgba(255,255,255,0.5)', fontSize:'10px', marginTop:'2px' }}>
                          Ref: {emp.id}-{month.replace(' ','-')}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* ── Employee Info Grid ── */}
                  <div style={{
                    display:'grid', gridTemplateColumns:'1fr 1fr',
                    gap:'0', background:'#f8fafc',
                    borderBottom:'1px solid #e2e8f0',
                  }}>
                    {[
                      { label:'Employee Name',  value: emp.name         },
                      { label:'Employee ID',    value: emp.id           },
                      { label:'Designation',    value: emp.designation  },
                      { label:'Department',     value: emp.department   },
                      { label:'Join Date',      value: emp.joinDate     },
                      { label:'Bank Account',   value: emp.bankAccount  },
                    ].map((item, i) => (
                      <div key={item.label} style={{
                        padding:'12px 20px',
                        borderRight  : i % 2 === 0 ? '1px solid #e2e8f0' : 'none',
                        borderBottom : i < 4 ? '1px solid #e2e8f0' : 'none',
                      }}>
                        <p style={{ fontSize:'10px', fontWeight:'700', textTransform:'uppercase',
                          letterSpacing:'.05em', color:'#94a3b8', marginBottom:'3px' }}>
                          {item.label}
                        </p>
                        <p style={{ fontSize:'13px', fontWeight:'600', color:'#1e293b' }}>
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* ── Earnings & Deductions ── */}
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0' }}>

                    {/* Earnings column */}
                    <div style={{ padding:'20px', borderRight:'1px solid #e2e8f0' }}>
                      <h3 style={{ fontSize:'11px', fontWeight:'700', textTransform:'uppercase',
                        letterSpacing:'.07em', color:'#D62828', marginBottom:'12px' }}>
                        Earnings
                      </h3>
                      {[
                        { label:'Basic Salary',         value: emp.basicSalary           },
                        { label:'House Rent Allowance', value: emp.allowances.house      },
                        { label:'Medical Allowance',    value: emp.allowances.medical    },
                        { label:'Transport Allowance',  value: emp.allowances.transport  },
                        { label:'Fuel Allowance',       value: emp.allowances.fuel       },
                      ].map(row => (
                        <div key={row.label} style={{
                          display:'flex', justifyContent:'space-between',
                          padding:'7px 0', borderBottom:'1px solid #f1f5f9', fontSize:'12px',
                        }}>
                          <span style={{ color:'#64748b' }}>{row.label}</span>
                          <span style={{ color:'#1e293b', fontWeight:'600' }}>
                            {formatCurrency(row.value)}
                          </span>
                        </div>
                      ))}
                      <div style={{
                        display:'flex', justifyContent:'space-between',
                        marginTop:'10px', padding:'10px 12px',
                        background:'rgba(247,127,0,0.08)',
                        borderRadius:'8px', fontWeight:'700', fontSize:'13px',
                      }}>
                        <span style={{ color:'#D62828' }}>Gross Salary</span>
                        <span style={{ color:'#D62828' }}>{formatCurrency(payroll.grossSalary)}</span>
                      </div>
                    </div>

                    {/* Deductions column */}
                    <div style={{ padding:'20px' }}>
                      <h3 style={{ fontSize:'11px', fontWeight:'700', textTransform:'uppercase',
                        letterSpacing:'.07em', color:'#ef4444', marginBottom:'12px' }}>
                        Deductions
                      </h3>
                      {[
                        { label:'Income Tax (FBR)', value: payroll.monthlyTax      },
                        { label:'EOBI (1%)',         value: payroll.eobi            },
                        { label:'SESSI/PESSI (1%)',  value: payroll.sessi           },
                        { label:'Provident Fund',   value: payroll.providentFund   },
                        { label:'Health Insurance', value: payroll.healthInsurance },
                      ].map(row => (
                        <div key={row.label} style={{
                          display:'flex', justifyContent:'space-between',
                          padding:'7px 0', borderBottom:'1px solid #f1f5f9', fontSize:'12px',
                        }}>
                          <span style={{ color:'#64748b' }}>{row.label}</span>
                          <span style={{ color:'#ef4444', fontWeight:'600' }}>
                            ({formatCurrency(row.value)})
                          </span>
                        </div>
                      ))}
                      <div style={{
                        display:'flex', justifyContent:'space-between',
                        marginTop:'10px', padding:'10px 12px',
                        background:'rgba(214,40,40,0.07)',
                        borderRadius:'8px', fontWeight:'700', fontSize:'13px',
                      }}>
                        <span style={{ color:'#ef4444' }}>Total Deductions</span>
                        <span style={{ color:'#ef4444' }}>({formatCurrency(payroll.totalDeductions)})</span>
                      </div>
                    </div>

                  </div>

                  {/* ── Net Salary Banner ── */}
                  <div style={{
                    background  : 'linear-gradient(135deg,rgba(252,191,73,0.12),rgba(252,191,73,0.08))',
                    borderTop   : '2px solid rgba(252,191,73,0.3)',
                    padding     : '18px 24px',
                    display     : 'flex',
                    justifyContent:'space-between',
                    alignItems  : 'center',
                  }}>
                    <div>
                      <p style={{ color:'#059669', fontSize:'11px', fontWeight:'700',
                        textTransform:'uppercase', letterSpacing:'.07em' }}>
                        Net Salary Payable
                      </p>
                      <p style={{ color:'#6b7280', fontSize:'11px', marginTop:'2px' }}>
                        After all deductions for {month}
                      </p>
                    </div>
                    <p style={{ color:'#059669', fontSize:'24px', fontWeight:'800',
                      fontFamily:"'Syne',sans-serif" }}>
                      {formatCurrency(payroll.netSalary)}
                    </p>
                  </div>

                  {/* ── Footer ── */}
                  <div style={{
                    background:'#f8fafc', padding:'14px 24px',
                    borderTop:'1px solid #e2e8f0',
                    display:'flex', justifyContent:'space-between', alignItems:'center',
                  }}>
                    <p style={{ color:'#94a3b8', fontSize:'10px' }}>
                      This is a computer-generated payslip — no signature required.
                    </p>
                    <p style={{ color:'#94a3b8', fontSize:'10px' }}>
                      Generated: {new Date().toLocaleDateString('en-PK')}
                    </p>
                  </div>

                </div>
              </div>

              {/* Print button below preview */}
              <button onClick={handlePrint}
                className="btn-primary w-full justify-center mt-4 py-3">
                🖨️ Print / Download Payslip
              </button>

            </div>
          )}
        </div>
      </div>
    </div>
  );
};


