export interface Expense {
  amount: number;
  category: {
    id: string;
    name: string;
    icon: string;
    className: string;
  };
  date: Date;
  icon?: React.JSX.Element;
  id: string;
  title: string;
}
