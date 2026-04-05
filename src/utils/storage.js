/**
 * Handles all localStorage operations for transaction data
 */
const STORAGE_KEY = 'transactions';

export const saveTransactions = (transactions) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
};

export const loadTransactions = () => {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error loading from localStorage:', error);
        return null;
    }
};

export const clearStorage = () => {
    localStorage.removeItem(STORAGE_KEY);
};
