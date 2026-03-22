/**
 * src/pages/Employees.jsx
 * ─────────────────────────────────────────
 * Employee Management page.
 *
 * Features:
 *  1. Search & filter bar
 *  2. Department filter tabs
 *  3. Employees table with full details
 *  4. Add Employee modal form
 *  5. View Employee detail modal
 *  6. Department summary cards
 * ─────────────────────────────────────────
 */

const { useState, useEffect } = React;

/* ═══════════════════════════════════════
   ADD EMPLOYEE MODAL
═══════════════════════════════════════ */
const AddEmployeeModal = ({ onClose }) => {

  const [form, setForm] = useState({
    name        : '',
    email       : '',
    phone       : '',
    department  : '',
    designation : '',
    joinDate    : '',
    basicSalary : '',
    bankAccount : '',
    cnic        : '',
    status      : 'Active',
  });

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    alert('Employee added successfully! (Demo — no backend)');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div
        className="glass-bright rounded-3xl w-full max-w-2xl max-h-screen overflow-y-auto animate-fadeUp"
        style={{ border: '1px solid #004A70', boxShadow: '0 30px 80px rgba(0,0,0,0.6)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Modal header */}
        <div
          className="flex items-center justify-between px-6 py-5"
          style={{ borderBottom: '1px solid #004A70' }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-grad-orange rounded-2xl flex items-center justify-center text-xl">
              👤
            </div>
            <div>
              <h2 className="text-[#FAFAF9] font-bold text-base" style={{ fontFamily: "'Syne',sans-serif" }}>
                Add New Employee
              </h2>
              <p className="text-[#A8A29E] text-xs">Fill in all required details</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl glass flex items-center justify-center
                       text-[#A8A29E] hover:text-[#FAFAF9] hover:bg-white/10 transition-all text-lg"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">

          {/* Row 1 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Full Name *</label>
              <input name="name" value={form.name} onChange={handleChange}
                placeholder="e.g. Ahmad Raza" required className="form-input" />
            </div>
            <div>
              <label className="form-label">Email Address *</label>
              <input name="email" type="email" value={form.email} onChange={handleChange}
                placeholder="name@corp.pk" required className="form-input" />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Phone Number</label>
              <input name="phone" value={form.phone} onChange={handleChange}
                placeholder="+92 300 1234567" className="form-input" />
            </div>
            <div>
              <label className="form-label">CNIC</label>
              <input name="cnic" value={form.cnic} onChange={handleChange}
                placeholder="35201-1234567-1" className="form-input" />
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Department *</label>
              <select name="department" value={form.department} onChange={handleChange}
                required className="form-input">
                <option value="">Select Department</option>
                {DEPARTMENTS.map(d => (
                  <option key={d.id} value={d.name}>{d.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="form-label">Designation *</label>
              <input name="designation" value={form.designation} onChange={handleChange}
                placeholder="e.g. Software Engineer" required className="form-input" />
            </div>
          </div>

          {/* Row 4 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Join Date *</label>
              <input name="joinDate" type="date" value={form.joinDate} onChange={handleChange}
                required className="form-input" />
            </div>
            <div>
              <label className="form-label">Status</label>
              <select name="status" value={form.status} onChange={handleChange} className="form-input">
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Row 5 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Basic Salary (PKR) *</label>
              <input name="basicSalary" type="number" value={form.basicSalary} onChange={handleChange}
                placeholder="e.g. 150000" required className="form-input" />
            </div>
            <div>
              <label className="form-label">Bank Account</label>
              <input name="bankAccount" value={form.bankAccount} onChange={handleChange}
                placeholder="Bank — Account No." className="form-input" />
            </div>
          </div>

          {/* Divider */}
          <div className="divider" />

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3">
            <button type="button" onClick={onClose} className="btn-ghost">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              <span>✓</span> Add Employee
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};


/* ═══════════════════════════════════════
   EMPLOYEE DETAIL MODAL
═══════════════════════════════════════ */
const EmployeeDetailModal = ({ employee, onClose }) => {

  if (!employee) return null;

  const payroll = computeEmployeePayroll(employee);

  /* Allowance rows */
  const allowanceRows = [
    { label: 'House Rent Allowance', value: employee.allowances.house    },
    { label: 'Medical Allowance',    value: employee.allowances.medical  },
    { label: 'Transport Allowance',  value: employee.allowances.transport},
    { label: 'Fuel Allowance',       value: employee.allowances.fuel     },
  ];

  /* Deduction rows */
  const deductionRows = [
    { label: 'Income Tax (FBR)',  value: payroll.monthlyTax,      color: 'text-pink-400'   },
    { label: 'EOBI',              value: payroll.eobi,            color: 'text-orange-400' },
    { label: 'SESSI/PESSI',       value: payroll.sessi,           color: 'text-blue-400'   },
    { label: 'Provident Fund',    value: payroll.providentFund,   color: 'text-purple-400' },
    { label: 'Health Insurance',  value: payroll.healthInsurance, color: 'text-green-400'  },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div
        className="glass-bright rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-fadeUp"
        style={{ border: '1px solid #004A70', boxShadow: '0 30px 80px rgba(0,0,0,0.6)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Modal header */}
        <div
          className="flex items-center justify-between px-6 py-5"
          style={{ borderBottom: '1px solid #004A70' }}
        >
          <div className="flex items-center gap-3">
            <div className={`avatar ${employee.avatarColor} text-[#FAFAF9] text-base`}
              style={{ width: '44px', height: '44px', boxShadow: '0 4px 15px rgba(0,0,0,0.35)' }}>
              {employee.avatar}
            </div>
            <div>
              <h2 className="text-[#FAFAF9] font-bold text-base" style={{ fontFamily: "'Syne',sans-serif" }}>
                {employee.name}
              </h2>
              <p className="text-[#A8A29E] text-xs">{employee.id} · {employee.designation}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`badge ${employee.status === 'Active' ? 'badge-active' : 'badge-inactive'}`}>
              {employee.status}
            </span>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-xl glass flex items-center justify-center
                         text-[#A8A29E] hover:text-[#FAFAF9] hover:bg-white/10 transition-all text-lg ml-2"
            >×</button>
          </div>
        </div>

        <div className="p-6 space-y-5">

          {/* Personal Info Grid */}
          <div>
            <p className="text-[#A8A29E] text-xs font-bold uppercase tracking-widest mb-3">
              Personal Information
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Email',       value: employee.email,       icon: '📧' },
                { label: 'Phone',       value: employee.phone,       icon: '📱' },
                { label: 'Department',  value: employee.department,  icon: '🏢' },
                { label: 'Join Date',   value: employee.joinDate,    icon: '📅' },
                { label: 'CNIC',        value: employee.cnic,        icon: '🪪'  },
                { label: 'Bank',        value: employee.bankAccount, icon: '🏦' },
              ].map(item => (
                <div key={item.label}
                  className="glass rounded-2xl p-3"
                  style={{ border: '1px solid #004A70' }}>
                  <p className="text-[#A8A29E] text-xs mb-1">{item.icon} {item.label}</p>
                  <p className="text-[#FAFAF9] text-xs font-semibold truncate">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Salary Breakdown */}
          <div>
            <p className="text-[#A8A29E] text-xs font-bold uppercase tracking-widest mb-3">
              Salary Breakdown
            </p>
            <div className="glass rounded-2xl overflow-hidden"
              style={{ border: '1px solid #004A70' }}>

              {/* Basic salary */}
              <div className="flex justify-between items-center px-4 py-3"
                style={{ borderBottom: '1px solid #004A70' }}>
                <span className="text-[#A8A29E] text-sm">Basic Salary</span>
                <span className="text-[#FAFAF9] font-bold text-sm">{formatCurrency(employee.basicSalary)}</span>
              </div>

              {/* Allowances */}
              {allowanceRows.map(row => (
                <div key={row.label} className="flex justify-between items-center px-4 py-2.5"
                  style={{ borderBottom: '1px solid #004A70' }}>
                  <span className="text-[#A8A29E] text-xs">+ {row.label}</span>
                  <span className="text-[#FCBF49] text-xs font-semibold">{formatCurrency(row.value)}</span>
                </div>
              ))}

              {/* Gross total */}
              <div className="flex justify-between items-center px-4 py-3 bg-violet-500/10"
                style={{ borderTop: '1px solid #F77F00', borderBottom: '1px solid #F77F00' }}>
                <span className="text-[#FCBF49] text-sm font-bold">Gross Salary</span>
                <span className="text-[#FCBF49] font-bold text-sm">{formatCurrency(payroll.grossSalary)}</span>
              </div>

              {/* Deductions */}
              {deductionRows.map(row => (
                <div key={row.label} className="flex justify-between items-center px-4 py-2.5"
                  style={{ borderBottom: '1px solid #004A70' }}>
                  <span className="text-[#A8A29E] text-xs">− {row.label}</span>
                  <span className={`text-xs font-semibold ${row.color}`}>({formatCurrency(row.value)})</span>
                </div>
              ))}

              {/* Net salary */}
              <div className="flex justify-between items-center px-4 py-3.5 bg-[#FCBF49]/10"
                style={{ borderTop: '1px solid rgba(252,191,73,0.2)' }}>
                <span className="text-emerald-300 font-bold text-sm">Net Salary</span>
                <span className="text-emerald-300 font-bold text-base">{formatCurrency(payroll.netSalary)}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};


/* ═══════════════════════════════════════
   MAIN EMPLOYEES PAGE
═══════════════════════════════════════ */
const Employees = () => {

  const [search,       setSearch]       = useState('');
  const [deptFilter,   setDeptFilter]   = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedEmp,  setSelectedEmp]  = useState(null);

  /* ── Filtered employees ── */
  const filtered = EMPLOYEES.filter(emp => {
    const matchSearch = emp.name.toLowerCase().includes(search.toLowerCase())
      || emp.id.toLowerCase().includes(search.toLowerCase())
      || emp.designation.toLowerCase().includes(search.toLowerCase());
    const matchDept   = deptFilter === 'All'   || emp.department === deptFilter;
    const matchStatus = statusFilter === 'All' || emp.status === statusFilter;
    return matchSearch && matchDept && matchStatus;
  });

  /* ── Department tabs ── */
  const deptTabs = ['All', ...DEPARTMENTS.map(d => d.name)];

  /* ════════════════════════════════════
     RENDER
  ════════════════════════════════════ */
  return (
    <div className="p-6 space-y-5 animate-fadeUp">

      {/* ══════════════════════════
          DEPARTMENT SUMMARY CARDS
      ══════════════════════════ */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {DEPARTMENTS.map((dept, idx) => (
          <div
            key={dept.id}
            onClick={() => setDeptFilter(dept.name)}
            className="glass-card rounded-2xl p-4 cursor-pointer text-center animate-fadeUp"
            style={{
              border         : deptFilter === dept.name
                ? '1px solid #F77F00'
                : '1px solid #004A70',
              background     : deptFilter === dept.name
                ? 'rgba(247,127,0,0.1)' : undefined,
              animationDelay : `${idx * 50}ms`,
            }}
          >
            <div
              className={`${dept.color} w-10 h-10 rounded-xl flex items-center justify-center
                          text-xl mx-auto mb-2`}
              style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}
            >
              {dept.icon}
            </div>
            <p className="text-[#FAFAF9] text-xs font-semibold leading-tight">{dept.name}</p>
            <p className="text-[#A8A29E] text-xs mt-0.5">{dept.headCount} staff</p>
          </div>
        ))}
      </div>

      {/* ══════════════════════════
          FILTER & SEARCH BAR
      ══════════════════════════ */}
      <div
        className="glass-bright rounded-2xl px-5 py-4"
        style={{ border: '1px solid #004A70' }}
      >
        <div className="flex flex-wrap items-center gap-3">

          {/* Search */}
          <div className="relative flex-1 min-w-48">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A8A29E] text-sm">🔍</span>
            <input
              type="text"
              placeholder="Search by name, ID or designation..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="form-input pl-9"
            />
          </div>

          {/* Status filter */}
          <div className="flex items-center gap-2">
            {['All', 'Active', 'Inactive'].map(s => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className="px-3 py-2 rounded-xl text-xs font-semibold transition-all"
                style={{
                  background  : statusFilter === s ? 'rgba(247,127,0,0.2)' : 'rgba(255,255,255,0.05)',
                  color       : statusFilter === s ? '#F77F00' : '#64748b',
                  border      : statusFilter === s ? '1px solid #F77F00' : '1px solid #004A70',
                }}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Reset filter */}
          {(search || deptFilter !== 'All' || statusFilter !== 'All') && (
            <button
              onClick={() => { setSearch(''); setDeptFilter('All'); setStatusFilter('All'); }}
              className="btn-ghost text-xs py-2"
            >
              ✕ Clear
            </button>
          )}

          {/* Add employee */}
          <button
            onClick={() => setShowAddModal(true)}
            className="btn-primary ml-auto"
          >
            <span>+</span> Add Employee
          </button>

        </div>

        {/* Dept filter tabs */}
        <div className="flex flex-wrap gap-2 mt-3">
          {deptTabs.map(tab => (
            <button
              key={tab}
              onClick={() => setDeptFilter(tab)}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
              style={{
                background : deptFilter === tab ? 'rgba(247,127,0,0.2)' : 'transparent',
                color      : deptFilter === tab ? '#F77F00'               : '#475569',
                border     : deptFilter === tab
                  ? '1px solid #F77F00'
                  : '1px solid transparent',
              }}
            >
              {tab}
              {tab !== 'All' && (
                <span className="ml-1.5 opacity-60">
                  {EMPLOYEES.filter(e => e.department === tab).length}
                </span>
              )}
            </button>
          ))}
        </div>

      </div>

      {/* ══════════════════════════
          EMPLOYEES TABLE
      ══════════════════════════ */}
      <div
        className="glass-card rounded-3xl overflow-hidden"
        style={{ border: '1px solid #004A70' }}
      >
        {/* Table header bar */}
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{ borderBottom: '1px solid #004A70' }}
        >
          <div>
            <h3 className="text-[#FAFAF9] font-bold text-base" style={{ fontFamily: "'Syne',sans-serif" }}>
              All Employees
            </h3>
            <p className="text-[#A8A29E] text-xs mt-0.5">
              Showing {filtered.length} of {EMPLOYEES.length} employees
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="badge badge-active">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FCBF49]/10 inline-block" />
              {EMPLOYEES.filter(e => e.status === 'Active').length} Active
            </span>
            <span className="badge badge-inactive">
              {EMPLOYEES.filter(e => e.status === 'Inactive').length} Inactive
            </span>
          </div>
        </div>

        {/* Table */}
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Join Date</th>
                <th>Basic Salary</th>
                <th>Gross Salary</th>
                <th>Net Salary</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center py-12 text-[#A8A29E]">
                    <div className="text-4xl mb-2">🔍</div>
                    <p>No employees match your search.</p>
                  </td>
                </tr>
              ) : (
                filtered.map((emp, idx) => {
                  const payroll = computeEmployeePayroll(emp);
                  return (
                    <tr key={emp.id} style={{ animationDelay: `${idx * 30}ms` }}>

                      {/* Employee */}
                      <td>
                        <div className="flex items-center gap-3">
                          <div
                            className={`avatar ${emp.avatarColor} text-[#FAFAF9] text-xs`}
                            style={{ boxShadow: '0 3px 10px rgba(0,0,0,0.3)' }}
                          >
                            {emp.avatar}
                          </div>
                          <div>
                            <p className="text-[#FAFAF9] text-xs font-semibold">{emp.name}</p>
                            <p className="text-[#A8A29E] text-xs">{emp.id}</p>
                          </div>
                        </div>
                      </td>

                      {/* Department */}
                      <td>
                        <span className="badge badge-dept">{emp.department}</span>
                      </td>

                      {/* Designation */}
                      <td className="text-[#A8A29E] text-xs">{emp.designation}</td>

                      {/* Join Date */}
                      <td className="text-[#A8A29E] text-xs">{emp.joinDate}</td>

                      {/* Basic Salary */}
                      <td className="text-[#FAFAF9] text-xs font-semibold">
                        {formatCurrency(emp.basicSalary)}
                      </td>

                      {/* Gross */}
                      <td className="text-[#FCBF49] text-xs font-semibold">
                        {formatCurrency(payroll.grossSalary)}
                      </td>

                      {/* Net */}
                      <td className="text-emerald-300 text-xs font-bold">
                        {formatCurrency(payroll.netSalary)}
                      </td>

                      {/* Status */}
                      <td>
                        <span className={`badge ${emp.status === 'Active' ? 'badge-active' : 'badge-inactive'}`}>
                          {emp.status}
                        </span>
                      </td>

                      {/* Action */}
                      <td>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedEmp(emp)}
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                            style={{
                              background : 'rgba(99,102,241,0.15)',
                              color      : '#818cf8',
                              border     : '1px solid rgba(99,102,241,0.25)',
                            }}
                          >
                            👁 View
                          </button>
                          <button className="btn-danger py-1.5">
                            🗑
                          </button>
                        </div>
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Table footer */}
        <div
          className="flex items-center justify-between px-5 py-3"
          style={{ borderTop: '1px solid #004A70' }}
        >
          <p className="text-[#A8A29E] text-xs">
            Total monthly payroll:{' '}
            <span className="text-[#FCBF49] font-bold">
              {formatCurrency(EMPLOYEES.reduce((sum, e) => sum + computeEmployeePayroll(e).grossSalary, 0))}
            </span>
          </p>
          <p className="text-[#A8A29E] text-xs">
            Total net disbursed:{' '}
            <span className="text-[#FCBF49] font-bold">
              {formatCurrency(EMPLOYEES.reduce((sum, e) => sum + computeEmployeePayroll(e).netSalary, 0))}
            </span>
          </p>
        </div>

      </div>

      {/* ── Modals ── */}
      {showAddModal  && <AddEmployeeModal    onClose={() => setShowAddModal(false)} />}
      {selectedEmp   && <EmployeeDetailModal employee={selectedEmp} onClose={() => setSelectedEmp(null)} />}

    </div>
  );
};


