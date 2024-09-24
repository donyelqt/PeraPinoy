import ExpenseAlerts from './component/ExpenseAlerts';

export default function Home() {
  return (
    <div>
      <h1 className="text-4xl md:text-5xl font-semibold text-tertiary text-center mt-8 ">Expense Alerts</h1>
      <ExpenseAlerts />
    </div>
  );
}
