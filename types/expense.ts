export interface Expense {
  amount: number;
  category: {
    name: string;
  };
  className?: string;
  date: Date;
  icon?: React.JSX.Element;
  id: string;
  title: string;
}
