export const getMonthlyData = (month) => {
    const monthIndex = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ].indexOf(month);

    // Seed base values on month index to ensure consistency for each month
    const seed = monthIndex + 1;

    // 1. Balance Trend Data
    const balanceTrend = [
        { day: '1', display: '01', balance: 8000 + seed * 200, b2: 6000, b3: 4000 },
        { day: '2', display: '02', balance: 8500 + seed * 300, b2: 6500, b3: 4500 },
        { day: '3', display: '03', balance: 8200 + seed * 250, b2: 6200, b3: 4200 },
        { day: '4', display: '04', balance: 9500 + seed * 400, b2: 7500, b3: 5500 },
        { day: '5', display: '05', balance: 9000 + seed * 350, b2: 7000, b3: 5000 },
        { day: '6', display: '06', balance: 10500 + seed * 500, b2: 8500, b3: 6500 },
        { day: '7', display: '07', balance: 9800 + seed * 450, b2: 7800, b3: 5800 },
    ];

    // 2. Expense Trend Data
    const expenseTrend = [
        { time: '1', display: '01', expense: 3000 + seed * 100, e2: 2000, e3: 1000 },
        { time: '2', display: '02', expense: 4000 + seed * 150, e2: 3000, e3: 2000 },
        { time: '3', display: '03', expense: 2500 + seed * 100, e2: 1500, e3: 800 },
        { time: '4', display: '04', expense: 4500 + seed * 200, e2: 3500, e3: 2500 },
        { time: '5', display: '05', expense: 3500 + seed * 150, e2: 2500, e3: 1500 },
        { time: '6', display: '06', expense: 5500 + seed * 250, e2: 4500, e3: 3000 },
        { time: '7', display: '07', expense: 4800 + seed * 200, e2: 3800, e3: 2800 },
    ];

    // 3. Daily Performance Data (30 days)
    const dailyPerformance = [];
    const baseIncome = 4000 + seed * 500;
    const baseExpense = 3000 + seed * 400;
    for (let i = 1; i <= 30; i++) {
        const dayIncome = baseIncome + Math.sin(i * 0.5) * 1000;
        const dayExpense = baseExpense + Math.cos(i * 0.5) * 800;
        dailyPerformance.push({
            day: i,
            income: Math.round(dayIncome),
            in2: Math.round(dayIncome * 0.7),
            in3: Math.round(dayIncome * 0.4),
            net: Math.round(dayIncome - dayExpense),
            n2: Math.round((dayIncome - dayExpense) * 0.6),
            n3: Math.round((dayIncome - dayExpense) * 0.3),
        });
    }

    // 4. Categorical Data
    const categories = [
        { name: 'Marketing', value: 300 + seed * 50, color: '#fb923c' },
        { name: 'Research', value: 200 + seed * 40, color: '#60a5fa' },
        { name: 'Personnel', value: 400 + seed * 60, color: '#f472b6' },
        { name: 'Infrastructure', value: 150 + seed * 30, color: '#d9f99d' },
        { name: 'Operations', value: 250 + seed * 40, color: '#4ade80' },
        { name: 'Legal', value: 100 + seed * 20, color: '#fef08a' },
    ];

    // 5. Transactions (Enhanced for Transactions Page)
    const transactionPool = [
        { name: 'Apple Store', category: 'Shopping', icon: 'ShoppingBag' },
        { name: 'Amazon Prime', category: 'Entertainment', icon: 'Play' },
        { name: 'Starbucks', category: 'Food', icon: 'Coffee' },
        { name: 'Uber Technologies', category: 'Transport', icon: 'Car' },
        { name: 'Salary Credit', category: 'Income', icon: 'Wallet' },
        { name: 'Netflix Subscription', category: 'Entertainment', icon: 'Tv' },
        { name: 'Airbnb Booking', category: 'Travel', icon: 'MapPin' },
        { name: 'Zomato Order', category: 'Food', icon: 'Utensils' },
        { name: 'Gym Membership', category: 'Health', icon: 'Activity' },
        { name: 'Freelance Payment', category: 'Income', icon: 'Briefcase' },
    ];

    const statuses = ['Completed', 'Pending', 'Processing'];
    const types = ['credited', 'debited'];

    const transactions = [];
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const formatDate = (date) => date.toISOString().split('T')[0];

    for (let i = 1; i <= 25; i++) {
        const base = transactionPool[i % transactionPool.length];
        const isToday = i <= 5;
        const isYesterday = i > 5 && i <= 10;

        let date;
        if (isToday) date = formatDate(today);
        else if (isYesterday) date = formatDate(yesterday);
        else date = `2024-${(monthIndex + 1).toString().padStart(2, '0')}-${(Math.max(1, 28 - i)).toString().padStart(2, '0')}`;

        const type = base.category === 'Income' ? 'credited' : 'debited';

        transactions.push({
            id: i,
            name: base.name,
            category: base.category,
            icon: base.icon,
            date: date,
            time: `${Math.floor(Math.random() * 24).toString().padStart(2, '0')}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
            amount: type === 'credited' ? 1000 + (i * 100) : 50 + (i * 20),
            type: type,
            status: statuses[i % statuses.length],
        });
    }

    // Stats
    const stats = {
        totalBalance: 10000 + seed * 2000,
        income: 50000 + seed * 5000,
        expenses: 25000 + seed * 3000,
    };

    return { balanceTrend, expenseTrend, dailyPerformance, categories, transactions, stats };
};

export const getBusinessTransactions = (filter, selectedMonth = 'April', selectedYear = '2026') => {
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const monthIndex = monthNames.indexOf(selectedMonth);
    const yearNum = parseInt(selectedYear);

    const startupPool = [
        { name: 'AWS Cloud Services', category: 'Infrastructure', icon: 'Cpu' },
        { name: 'Slack Technologies', category: 'Communication', icon: 'Tv' },
        { name: 'GitHub Enterprise', category: 'DevTools', icon: 'Briefcase' },
        { name: 'Vercel Inc.', category: 'Infrastructure', icon: 'Briefcase' },
        { name: 'Google Workspace', category: 'Operations', icon: 'Briefcase' },
        { name: 'Zoom Video', category: 'Communication', icon: 'Play' },
        { name: 'Stripe Payout', category: 'Revenue', icon: 'Wallet' },
        { name: 'Figma Design', category: 'Design', icon: 'Activity' },
    ];

    const operationsPool = [
        { name: 'WeWork Office Rent', category: 'Rent', icon: 'MapPin' },
        { name: 'Employee Health Insurance', category: 'Benefits', icon: 'Activity' },
        { name: 'Quarterly Tax (GST)', category: 'Legal', icon: 'Activity' },
        { name: 'Corporate Legal Fees', category: 'Legal', icon: 'Briefcase' },
        { name: 'Annual Server Maintenance', category: 'Maintenance', icon: 'Cpu' },
        { name: 'Series A Funding Round', category: 'Investments', icon: 'Wallet' },
    ];

    const today = new Date();
    const formatDate = (date) => date.toISOString().split('T')[0];

    let count = 15;
    let pool = [];
    let baseAmountMult = 1;

    if (filter === 'Today') {
        pool = startupPool.slice(0, 5);
        count = 5;
        baseAmountMult = 1;
    } else if (filter === 'Monthly') {
        pool = [...startupPool, ...operationsPool.slice(0, 3)];
        count = 15;
        baseAmountMult = 10;
    } else {
        pool = operationsPool;
        count = 12;
        baseAmountMult = 100;
    }

    const transactions = [];
    for (let i = 1; i <= count; i++) {
        // Variation: Shift pool based on month and year to change the "highest" category
        const shiftedIndex = (i + monthIndex * 3 + (yearNum % 10) * 2) % pool.length;
        const item = pool[shiftedIndex];
        const type = (item.category === 'Revenue' || item.category === 'Investments') ? 'credited' : 'debited';

        let date;
        if (filter === 'Today') {
            date = formatDate(today);
        } else if (filter === 'Monthly') {
            // Generate dates within the selected month and current year
            const day = Math.min(28, Math.max(1, 28 - i));
            date = `${yearNum}-${(monthIndex + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        } else {
            // Generate dates across the selected year
            const month = (i % 12) + 1;
            date = `${yearNum}-${month.toString().padStart(2, '0')}-15`;
        }

        // Amount variation based on month and year to make each period unique
        const amountVariance = 1 + (Math.sin(i + monthIndex + (yearNum % 100)) * 0.25);
        const baseAmount = type === 'credited' ? (5000 * baseAmountMult) : (500 * baseAmountMult);
        const dynamicAmount = Math.round((baseAmount + (i * 200)) * amountVariance);

        transactions.push({
            id: `${filter}-${selectedMonth}-${selectedYear}-${i}`,
            name: item.name,
            category: item.category,
            icon: item.icon,
            date: date,
            time: `${Math.floor(Math.random() * 24).toString().padStart(2, '0')}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
            amount: dynamicAmount,
            type: type,
            status: i % 7 === 0 ? 'Processing' : i % 5 === 0 ? 'Pending' : 'Completed',
        });
    }


    return transactions;
};
