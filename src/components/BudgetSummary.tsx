import { Campaign } from "./CampaignCard";
import { getTotalInReviewBudget } from "../utils/mockData";

interface BudgetSummaryProps {
  campaigns: Campaign[];
}

const BudgetSummary = ({ campaigns }: BudgetSummaryProps) => {
  const inReviewBudget = getTotalInReviewBudget(campaigns);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="vairu-card p-6 animate-slide-up">
      <h3 className="text-lg font-semibold mb-4">Budget Summary</h3>
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <p className="text-sm text-vairu-muted mb-1">In-Review Campaigns</p>
          <p className="text-2xl font-semibold">
            {formatCurrency(inReviewBudget)}
          </p>
        </div>
        <div className="h-10 w-10 rounded-full bg-vairu-primary bg-opacity-10 flex items-center justify-center">
          <span className="text-vairu-primary font-medium">
            {campaigns.filter((c) => c.status === "in-review").length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BudgetSummary;
