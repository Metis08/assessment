/**
 * Handles all localStorage operations for transaction data
 */
const STORAGE_KEY = 'transactions';

export const saveTransactions = (transactions, month, year) => {
    try {
        const key = month && year ? `${STORAGE_KEY}_${month}_${year}` : STORAGE_KEY;
        localStorage.setItem(key, JSON.stringify(transactions));
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
};


export const loadTransactions = (month, year) => {
    try {
        const key = month && year ? `${STORAGE_KEY}_${month}_${year}` : STORAGE_KEY;
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error loading from localStorage:', error);
        return null;
    }
};


export const clearStorage = () => {
    try {
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith(STORAGE_KEY)) {
                localStorage.removeItem(key);
            }
        });
    } catch (error) {
        console.error('Error clearing localStorage:', error);
    }
};

