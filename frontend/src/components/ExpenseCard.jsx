import React from 'react';
import { Edit2, Trash2, TrendingUp, TrendingDown, Calendar } from 'lucide-react';
import './ExpenseCard.css';

const ExpenseCard = ({ 
  expense, 
  onEdit, 
  onDelete, 
  showActions = true 
}) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const isIncome = expense.type === 'income';
  const amountColor = isIncome ? '#10b981' : '#ef4444';
  const AmountIcon = isIncome ? TrendingUp : TrendingDown;

  return (
    <div className={`expense-card ${isIncome ? 'income' : 'expense'}`}>
      <div className="expense-card-header">
        <div className="expense-card-title">
          <h3>{expense.title}</h3>
          <span className="expense-card-category">
            {expense.category}
          </span>
        </div>
        <div className="expense-card-amount">
          <div className={`amount-icon ${isIncome ? 'income' : 'expense'}`}>
            <AmountIcon size={16} />
          </div>
          <span className={`amount-value ${isIncome ? 'income' : 'expense'}`}>
            {formatAmount(expense.amount)}
          </span>
        </div>
      </div>
      
      <div className="expense-card-body">
        {expense.description && (
          <p className="expense-card-description">
            {expense.description}
          </p>
        )}
        
        <div className="expense-card-meta">
          <span className="expense-card-date">
            <Calendar size={14} />
            {formatDate(expense.date)}
          </span>
          <span className={`expense-card-type ${isIncome ? 'income' : 'expense'}`}>
            {isIncome ? 'Income' : 'Expense'}
          </span>
        </div>
      </div>

      {showActions && (
        <div className="expense-card-actions">
          <button 
            className="action-btn edit-btn"
            onClick={() => onEdit(expense)}
            title="Edit expense"
          >
            <Edit2 size={16} />
          </button>
          <button 
            className="action-btn delete-btn"
            onClick={() => onDelete(expense)}
            title="Delete expense"
          >
            <Trash2 size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ExpenseCard;
