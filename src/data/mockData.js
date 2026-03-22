/**
 * src/data/mockData.js
 * ─────────────────────────────────────────
 * Single source of truth for all app data.
 *
 * Contains:
 *  1. EMPLOYEES        → employee records
 *  2. DEPARTMENTS      → department list
 *  3. PAYROLL_HISTORY  → monthly payroll runs
 *  4. TAX_BRACKETS     → Pakistan tax slabs
 *  5. DEDUCTION_TYPES  → deduction categories
 *  6. DASHBOARD_STATS  → summary metrics
 *  7. CHART_DATA       → monthly salary trends
 *  8. RECENT_ACTIVITY  → activity feed
 * ─────────────────────────────────────────
 */


/* ═══════════════════════════════════════
   1. EMPLOYEES
═══════════════════════════════════════ */
const EMPLOYEES = [
  {
    id         : 'EMP-001',
    name       : 'Hafiz Ali Hasnain',
    email      : 'hafiz.ali@corp.pk',
    phone      : '+92 300 1234567',
    department : 'Engineering',
    designation: 'Senior Software Engineer',
    joinDate   : '2021-03-15',
    status     : 'Active',
    avatar     : 'HA',
    avatarColor: 'bg-grad-purple',
    basicSalary: 180000,
    allowances : {
      house     : 54000,
      medical   : 18000,
      transport : 9000,
      fuel      : 7200,
    },
    bankAccount: 'HBL — 0123456789',
    cnic       : '35201-1234567-1',
  },
  {
    id         : 'EMP-002',
    name       : 'Ahmad Raza',
    email      : 'ahmad.raza@corp.pk',
    phone      : '+92 321 9876543',
    department : 'Human Resources',
    designation: 'HR Manager',
    joinDate   : '2020-07-01',
    status     : 'Active',
    avatar     : 'AR',
    avatarColor: 'bg-grad-pink',
    basicSalary: 160000,
    allowances : {
      house     : 48000,
      medical   : 16000,
      transport : 8000,
      fuel      : 6400,
    },
    bankAccount: 'MCB — 9876543210',
    cnic       : '35202-7654321-2',
  },
  {
    id         : 'EMP-003',
    name       : 'Usman Ali',
    email      : 'usman.ali@corp.pk',
    phone      : '+92 333 5556677',
    department : 'Finance',
    designation: 'Financial Analyst',
    joinDate   : '2022-01-10',
    status     : 'Active',
    avatar     : 'UA',
    avatarColor: 'bg-grad-blue',
    basicSalary: 140000,
    allowances : {
      house     : 42000,
      medical   : 14000,
      transport : 7000,
      fuel      : 5600,
    },
    bankAccount: 'UBL — 1122334455',
    cnic       : '35203-2233445-3',
  },
  {
    id         : 'EMP-004',
    name       : 'Faiz Ahmad',
    email      : 'faiz.ahmad@corp.pk',
    phone      : '+92 345 4443322',
    department : 'Marketing',
    designation: 'Marketing Lead',
    joinDate   : '2021-11-20',
    status     : 'Active',
    avatar     : 'FA',
    avatarColor: 'bg-grad-orange',
    basicSalary: 150000,
    allowances : {
      house     : 45000,
      medical   : 15000,
      transport : 7500,
      fuel      : 6000,
    },
    bankAccount: 'Allied — 5544332211',
    cnic       : '35204-3344556-4',
  },
  {
    id         : 'EMP-005',
    name       : 'Bilal Hussain',
    email      : 'bilal.hussain@corp.pk',
    phone      : '+92 311 7778899',
    department : 'Engineering',
    designation: 'DevOps Engineer',
    joinDate   : '2022-06-01',
    status     : 'Active',
    avatar     : 'BH',
    avatarColor: 'bg-grad-green',
    basicSalary: 170000,
    allowances : {
      house     : 51000,
      medical   : 17000,
      transport : 8500,
      fuel      : 6800,
    },
    bankAccount: 'Meezan — 6677889900',
    cnic       : '35205-4455667-5',
  },
  {
    id         : 'EMP-006',
    name       : 'Talha Ahmad',
    email      : 'talha.ahmad@corp.pk',
    phone      : '+92 322 1112233',
    department : 'Design',
    designation: 'UI/UX Designer',
    joinDate   : '2023-02-14',
    status     : 'Active',
    avatar     : 'TA',
    avatarColor: 'bg-grad-pink',
    basicSalary: 130000,
    allowances : {
      house     : 39000,
      medical   : 13000,
      transport : 6500,
      fuel      : 5200,
    },
    bankAccount: 'HBL — 2233445566',
    cnic       : '35206-5566778-6',
  },
  {
    id         : 'EMP-007',
    name       : 'Hamza Sheikh',
    email      : 'hamza.sheikh@corp.pk',
    phone      : '+92 300 9990011',
    department : 'Engineering',
    designation: 'Backend Developer',
    joinDate   : '2020-09-05',
    status     : 'Inactive',
    avatar     : 'HS',
    avatarColor: 'bg-grad-blue',
    basicSalary: 155000,
    allowances : {
      house     : 46500,
      medical   : 15500,
      transport : 7750,
      fuel      : 6200,
    },
    bankAccount: 'MCB — 3344556677',
    cnic       : '35207-6677889-7',
  },
  {
    id         : 'EMP-008',
    name       : 'Zainab Noor',
    email      : 'zainab.noor@corp.pk',
    phone      : '+92 333 2223344',
    department : 'Finance',
    designation: 'Accounts Manager',
    joinDate   : '2021-05-18',
    status     : 'Active',
    avatar     : 'ZN',
    avatarColor: 'bg-grad-purple',
    basicSalary: 145000,
    allowances : {
      house     : 43500,
      medical   : 14500,
      transport : 7250,
      fuel      : 5800,
    },
    bankAccount: 'UBL — 4455667788',
    cnic       : '35208-7788990-8',
  },
];


/* ═══════════════════════════════════════
   2. DEPARTMENTS
═══════════════════════════════════════ */
const DEPARTMENTS = [
  { id: 'dept-1', name: 'Engineering',     headCount: 3, color: 'bg-grad-purple', icon: '💻' },
  { id: 'dept-2', name: 'Human Resources', headCount: 1, color: 'bg-grad-pink',   icon: '👥' },
  { id: 'dept-3', name: 'Finance',         headCount: 2, color: 'bg-grad-green',  icon: '💰' },
  { id: 'dept-4', name: 'Marketing',       headCount: 1, color: 'bg-grad-orange', icon: '📣' },
  { id: 'dept-5', name: 'Design',          headCount: 1, color: 'bg-grad-blue',   icon: '🎨' },
];


/* ═══════════════════════════════════════
   3. PAYROLL HISTORY
═══════════════════════════════════════ */
const PAYROLL_HISTORY = [
  {
    id        : 'PAY-2025-03',
    month     : 'March 2025',
    processedOn: '2025-03-28',
    totalGross: 1510000,
    totalTax  : 196300,
    totalNet  : 1313700,
    status    : 'Paid',
    employees : 8,
  },
  {
    id        : 'PAY-2025-02',
    month     : 'February 2025',
    processedOn: '2025-02-26',
    totalGross: 1510000,
    totalTax  : 196300,
    totalNet  : 1313700,
    status    : 'Paid',
    employees : 8,
  },
  {
    id        : 'PAY-2025-01',
    month     : 'January 2025',
    processedOn: '2025-01-29',
    totalGross: 1480000,
    totalTax  : 192400,
    totalNet  : 1287600,
    status    : 'Paid',
    employees : 8,
  },
  {
    id        : 'PAY-2024-12',
    month     : 'December 2024',
    processedOn: '2024-12-27',
    totalGross: 1490000,
    totalTax  : 193700,
    totalNet  : 1296300,
    status    : 'Paid',
    employees : 8,
  },
  {
    id        : 'PAY-2024-11',
    month     : 'November 2024',
    processedOn: '2024-11-28',
    totalGross: 1460000,
    totalTax  : 189800,
    totalNet  : 1270200,
    status    : 'Paid',
    employees : 7,
  },
  {
    id        : 'PAY-2024-10',
    month     : 'October 2024',
    processedOn: '2024-10-29',
    totalGross: 1440000,
    totalTax  : 187200,
    totalNet  : 1252800,
    status    : 'Paid',
    employees : 7,
  },
];


/* ═══════════════════════════════════════
   4. TAX BRACKETS (Pakistan FBR 2024-25)
═══════════════════════════════════════ */
const TAX_BRACKETS = [
  {
    id      : 'slab-1',
    label   : 'Slab 1',
    minAnnual: 0,
    maxAnnual: 600000,
    rate    : 0,
    rateLabel: '0%',
    color   : 'bg-grad-green',
    desc    : 'No tax on annual income up to PKR 600,000',
  },
  {
    id      : 'slab-2',
    label   : 'Slab 2',
    minAnnual: 600001,
    maxAnnual: 1200000,
    rate    : 0.05,
    rateLabel: '5%',
    color   : 'bg-grad-blue',
    desc    : '5% on income between PKR 600,001 – 1,200,000',
  },
  {
    id      : 'slab-3',
    label   : 'Slab 3',
    minAnnual: 1200001,
    maxAnnual: 2400000,
    rate    : 0.15,
    rateLabel: '15%',
    color   : 'bg-grad-purple',
    desc    : '15% on income between PKR 1,200,001 – 2,400,000',
  },
  {
    id      : 'slab-4',
    label   : 'Slab 4',
    minAnnual: 2400001,
    maxAnnual: 3600000,
    rate    : 0.25,
    rateLabel: '25%',
    color   : 'bg-grad-orange',
    desc    : '25% on income between PKR 2,400,001 – 3,600,000',
  },
  {
    id      : 'slab-5',
    label   : 'Slab 5',
    minAnnual: 3600001,
    maxAnnual: 6000000,
    rate    : 0.30,
    rateLabel: '30%',
    color   : 'bg-grad-pink',
    desc    : '30% on income between PKR 3,600,001 – 6,000,000',
  },
  {
    id      : 'slab-6',
    label   : 'Slab 6',
    minAnnual: 6000001,
    maxAnnual: Infinity,
    rate    : 0.35,
    rateLabel: '35%',
    color   : 'bg-grad-pink',
    desc    : '35% on income above PKR 6,000,000',
  },
];


/* ═══════════════════════════════════════
   5. DEDUCTION TYPES
═══════════════════════════════════════ */
const DEDUCTION_TYPES = [
  {
    id    : 'ded-1',
    name  : 'Income Tax (FBR)',
    type  : 'Mandatory',
    basis : 'Progressive slab-based',
    color : 'bg-grad-pink',
  },
  {
    id    : 'ded-2',
    name  : 'EOBI Contribution',
    type  : 'Mandatory',
    basis : '1% of basic salary (min PKR 370)',
    color : 'bg-grad-orange',
  },
  {
    id    : 'ded-3',
    name  : 'SESSI / PESSI',
    type  : 'Mandatory',
    basis : '1% of gross salary',
    color : 'bg-grad-blue',
  },
  {
    id    : 'ded-4',
    name  : 'Provident Fund',
    type  : 'Voluntary',
    basis : '8.33% of basic salary',
    color : 'bg-grad-purple',
  },
  {
    id    : 'ded-5',
    name  : 'Health Insurance',
    type  : 'Voluntary',
    basis : 'Fixed PKR 3,000 / month',
    color : 'bg-grad-green',
  },
  {
    id    : 'ded-6',
    name  : 'Loan Installment',
    type  : 'Variable',
    basis : 'As per loan agreement',
    color : 'bg-grad-orange',
  },
];


/* ═══════════════════════════════════════
   6. DASHBOARD STATS
═══════════════════════════════════════ */
const DASHBOARD_STATS = [
  {
    id      : 'stat-1',
    label   : 'Total Employees',
    value   : '8',
    change  : '+1 this month',
    trend   : 'up',
    color   : 'purple',
    icon    : '👥',
    iconBg  : 'bg-grad-purple',
  },
  {
    id      : 'stat-2',
    label   : 'Monthly Payroll',
    value   : 'PKR 1.51M',
    change  : '+2.1% vs last month',
    trend   : 'up',
    color   : 'blue',
    icon    : '💰',
    iconBg  : 'bg-grad-blue',
  },
  {
    id      : 'stat-3',
    label   : 'Total Tax Deducted',
    value   : 'PKR 196K',
    change  : 'Current month',
    trend   : 'neutral',
    color   : 'pink',
    icon    : '🧾',
    iconBg  : 'bg-grad-pink',
  },
  {
    id      : 'stat-4',
    label   : 'Net Disbursed',
    value   : 'PKR 1.31M',
    change  : 'After all deductions',
    trend   : 'up',
    color   : 'green',
    icon    : '✅',
    iconBg  : 'bg-grad-green',
  },
];


/* ═══════════════════════════════════════
   7. CHART DATA (Monthly Salary Trends)
═══════════════════════════════════════ */
const CHART_DATA = {
  monthly: {
    labels  : ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
    gross   : [1440000, 1460000, 1490000, 1480000, 1510000, 1510000],
    net     : [1252800, 1270200, 1296300, 1287600, 1313700, 1313700],
    tax     : [187200,  189800,  193700,  192400,  196300,  196300],
  },
  department: {
    labels  : ['Engineering', 'HR', 'Finance', 'Marketing', 'Design'],
    values  : [505000, 160000, 285000, 150000, 130000],
    colors  : [
      'rgba(247,127,0,0.8)',
      'rgba(214,40,40,0.8)',
      'rgba(252,191,73,0.8)',
      'rgba(252,191,73,0.8)',
      'rgba(96,165,250,0.8)',
    ],
  },
};


/* ═══════════════════════════════════════
   8. RECENT ACTIVITY FEED
═══════════════════════════════════════ */
const RECENT_ACTIVITY = [
  {
    id     : 'act-1',
    type   : 'payroll',
    icon   : '💸',
    iconBg : 'bg-grad-green',
    text   : 'March 2025 payroll processed successfully',
    time   : '2 hours ago',
    sub    : 'PKR 1,313,700 disbursed to 8 employees',
  },
  {
    id     : 'act-2',
    type   : 'employee',
    icon   : '👤',
    iconBg : 'bg-grad-purple',
    text   : 'New employee Fatima Zahra onboarded',
    time   : '3 days ago',
    sub    : 'Design department — UI/UX Designer',
  },
  {
    id     : 'act-3',
    type   : 'salary',
    icon   : '📈',
    iconBg : 'bg-grad-blue',
    text   : 'Salary revised for Ahmad Raza',
    time   : '1 week ago',
    sub    : 'Increment: PKR 15,000',
  },
  {
    id     : 'act-4',
    type   : 'tax',
    icon   : '🧾',
    iconBg : 'bg-grad-pink',
    text   : 'Tax challans submitted to FBR',
    time   : '1 week ago',
    sub    : 'Total tax: PKR 196,300',
  },
  {
    id     : 'act-5',
    type   : 'payslip',
    icon   : '📄',
    iconBg : 'bg-grad-orange',
    text   : 'Payslips generated & emailed',
    time   : '2 weeks ago',
    sub    : 'February 2025 — all 8 employees',
  },
];


/* ═══════════════════════════════════════
   HELPER FUNCTIONS
═══════════════════════════════════════ */

/**
 * calculateTax
 * Computes annual income tax using Pakistan
 * FBR progressive slab system.
 *
 * @param {number} annualIncome  — annual gross salary
 * @returns {number}             — annual tax amount
 */
function calculateTax(annualIncome) {
  if (annualIncome <= 600000) return 0;
  if (annualIncome <= 1200000) return (annualIncome - 600000) * 0.05;
  if (annualIncome <= 2400000) return 30000 + (annualIncome - 1200000) * 0.15;
  if (annualIncome <= 3600000) return 210000 + (annualIncome - 2400000) * 0.25;
  if (annualIncome <= 6000000) return 510000 + (annualIncome - 3600000) * 0.30;
  return 1230000 + (annualIncome - 6000000) * 0.35;
}


/**
 * computeEmployeePayroll
 * Computes full payroll breakdown for a
 * single employee for one month.
 *
 * @param {object} employee  — from EMPLOYEES array
 * @returns {object}         — full payroll breakdown
 */
function computeEmployeePayroll(employee) {
  const { basicSalary, allowances } = employee;

  // Gross salary
  const totalAllowances = Object.values(allowances).reduce((a, b) => a + b, 0);
  const grossSalary     = basicSalary + totalAllowances;

  // Annual figures
  const annualGross = grossSalary * 12;
  const annualTax   = calculateTax(annualGross);
  const monthlyTax  = Math.round(annualTax / 12);

  // Mandatory deductions
  const eobi          = Math.max(370, Math.round(basicSalary * 0.01));
  const sessi         = Math.round(grossSalary * 0.01);

  // Optional deductions
  const providentFund = Math.round(basicSalary * 0.0833);
  const healthInsurance = 3000;

  // Total deductions
  const totalDeductions = monthlyTax + eobi + sessi + providentFund + healthInsurance;

  // Net salary
  const netSalary = grossSalary - totalDeductions;

  return {
    basicSalary,
    allowances,
    totalAllowances,
    grossSalary,
    annualGross,
    annualTax,
    monthlyTax,
    eobi,
    sessi,
    providentFund,
    healthInsurance,
    totalDeductions,
    netSalary,
  };
}


/**
 * formatCurrency
 * Formats a number as PKR currency string.
 *
 * @param {number} amount
 * @returns {string}  — e.g. "PKR 1,80,000"
 */
function formatCurrency(amount) {
  return 'PKR ' + amount.toLocaleString('en-PK');
}


/**
 * getEmployeeById
 * @param {string} id
 * @returns {object|undefined}
 */
function getEmployeeById(id) {
  return EMPLOYEES.find(e => e.id === id);
}