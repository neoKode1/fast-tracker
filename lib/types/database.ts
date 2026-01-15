export type AccountType = 'checking' | 'savings' | 'credit_card' | 'cash' | 'investment' | 'loan'
export type TransactionType = 'income' | 'expense' | 'transfer'
export type CategoryType = 'income' | 'expense'
export type RecurringFrequency = 'daily' | 'weekly' | 'biweekly' | 'monthly' | 'quarterly' | 'yearly'
export type BudgetPeriod = 'weekly' | 'monthly' | 'yearly'
export type DebtType = 'credit_card' | 'student_loan' | 'auto_loan' | 'mortgage' | 'personal_loan' | 'other'

export interface Category {
  id: string
  user_id: string
  name: string
  type: CategoryType
  color?: string
  icon?: string
  created_at: string
  updated_at: string
}

export interface Account {
  id: string
  user_id: string
  name: string
  type: AccountType
  bank_name?: string
  balance: number
  currency: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Transaction {
  id: string
  user_id: string
  account_id: string
  category_id?: string
  type: TransactionType
  amount: number
  description?: string
  location?: string
  merchant?: string
  notes?: string
  date: string
  tags?: string[]
  recurring_transaction_id?: string
  created_at: string
  updated_at: string
}

export interface RecurringTransaction {
  id: string
  user_id: string
  account_id: string
  category_id?: string
  type: TransactionType
  amount: number
  description?: string
  location?: string
  merchant?: string
  frequency: RecurringFrequency
  start_date: string
  end_date?: string
  next_occurrence: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Budget {
  id: string
  user_id: string
  category_id: string
  amount: number
  period: BudgetPeriod
  start_date: string
  end_date?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface FinancialGoal {
  id: string
  user_id: string
  name: string
  target_amount: number
  current_amount: number
  target_date?: string
  description?: string
  is_completed: boolean
  created_at: string
  updated_at: string
}

export interface Debt {
  id: string
  user_id: string
  name: string
  type: DebtType
  principal_amount: number
  current_balance: number
  interest_rate?: number
  minimum_payment?: number
  due_date?: number
  creditor?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

// Extended types with relations
export interface TransactionWithDetails extends Transaction {
  account?: Account
  category?: Category
}

export interface BudgetWithDetails extends Budget {
  category?: Category
  spent?: number
}

