import { getBusinessTransactions } from '../utils/mockData';
import { loadTransactions, saveTransactions } from '../utils/storage';

/**
 * Simulates an asynchronous API call to fetch transactions
 * @param {string} filter - 'Today' | 'Monthly' | 'Annually'
 * @param {string} month - Current selected month
 * @param {string} year - Current selected year
 * @returns {Promise<Array>} - A promise that resolves to the transactions list
 */
export const fetchTransactions = async (filter, month, year) => {
    return new Promise((resolve) => {
        // Simulate network delay (500–1000ms)
        const delay = Math.floor(Math.random() * 500) + 500;

        setTimeout(() => {
            // 1. Check localStorage first
            let data = loadTransactions(month, year);

            // 2. If no data in localStorage, fallback to mock data
            if (!data || !Array.isArray(data) || data.length === 0) {
                data = getBusinessTransactions(filter, month, year);
                // Persist the fallback data so next refresh loads this
                saveTransactions(data, month, year);
            }


            // NOTE: In a real app, we might perform filtering on the server/API.
            // Here we assume the "API" returns the relevant data for the current view.
            resolve(data);
        }, delay);
    });
};

/**
 * Updates a transaction in the "backend" (localStorage)
 */
export const updateTransaction = async (updatedTransaction) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const currentData = loadTransactions() || [];
            const newData = currentData.map(t => t.id === updatedTransaction.id ? updatedTransaction : t);
            saveTransactions(newData);
            resolve(updatedTransaction);
        }, 300);
    });
};

/**
 * Deletes a transaction in the "backend" (localStorage)
 */
export const deleteTransaction = async (id) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const currentData = loadTransactions() || [];
            const newData = currentData.filter(t => t.id !== id);
            saveTransactions(newData);
            resolve();
        }, 300);
    });
};

/**
 * Creates a new transaction in the "backend" (localStorage)
 */
export const createTransaction = async (newTransaction, month, year) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const key = month && year ? `transactions_${month}_${year}` : 'transactions';
            const data = localStorage.getItem(key);
            const currentData = data ? JSON.parse(data) : [];

            // Add new transaction to the beginning
            const newData = [newTransaction, ...currentData];
            localStorage.setItem(key, JSON.stringify(newData));
            resolve(newTransaction);
        }, 500);
    });
};
