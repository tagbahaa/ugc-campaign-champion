import { format } from "date-fns";
import { ArrowRight, CheckCircle, Clock, Video, FileVideo } from "lucide-react";

export interface Campaign {
  id: string;
  title: string;
  status: "active" | "in-review" | "completed";
  createdAt: Date;
  budget: number;
  budgetSpent: number;
  estimatedDelivery: Date;
  progress?: number;
}

interface CampaignCardProps {
  campaign: Campaign;
}

const CampaignCard = ({ campaign }: CampaignCardProps) => {
  const formatDate = (date: Date) => {
    return format(date, "MMM d, yyyy");
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const renderBadge = (status: Campaign["status"]) => {
    switch (status) {
      case "active":
        return (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700">
            Active
          </span>
        );
      case "in-review":
        return (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
            Active
          </span>
        );
      case "completed":
        return (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
            Active
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Card Header */}
      <div className="p-5 border-b border-gray-100">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-lg">{campaign.title}</h3>
          {renderBadge(campaign.status)}
        </div>

        {campaign.status === "active" && (
          <div className="flex items-center gap-3">
            <FileVideo className="h-5 w-5 text-indigo-600" />
            <span className="text-sm text-gray-600">UGC Campaign</span>
            <span className="px-2 py-0.5 rounded bg-green-100 text-green-700 text-xs font-medium">
              On Track
            </span>
          </div>
        )}

        {campaign.status === "in-review" && (
          <div className="flex items-center gap-3">
            <Video className="h-5 w-5 text-indigo-600" />
            <span className="text-sm text-gray-600">Video Campaign</span>
            <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-700 text-xs font-medium flex items-center gap-1">
              <Clock className="h-3 w-3" /> 48h Review
            </span>
          </div>
        )}

        {campaign.status === "completed" && (
          <div className="flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="text-sm text-gray-600">Completed</span>
            <span className="text-sm text-gray-500">
              {formatDate(campaign.estimatedDelivery)}
            </span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-5">
        {campaign.status === "active" && (
          <>
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-gray-600">Campaign Progress</span>
                <span className="font-medium">{campaign.progress}%</span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-600 rounded-full"
                  style={{ width: `${campaign.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Budget Used</p>
                <p className="font-semibold">
                  {formatCurrency(campaign.budgetSpent)}/
                  {formatCurrency(campaign.budget)}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Time Left</p>
                <p className="font-semibold">15 days</p>
              </div>
            </div>
          </>
        )}

        {campaign.status === "in-review" && (
          <>
            <div className="flex items-center justify-center py-3 bg-gray-50 rounded-lg mb-4">
              <Clock className="w-5 h-5 text-gray-400 mr-2" />
              <span className="text-sm font-medium">
                Under Review (48 hours)
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Assigned Budget</p>
                <p className="font-semibold">
                  {formatCurrency(campaign.budget)}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Review Until</p>
                <p className="font-semibold">Mar 15, 2025</p>
              </div>
            </div>
          </>
        )}

        {campaign.status === "completed" && (
          <>
            <div className="flex items-center justify-center py-3 bg-green-50 rounded-lg mb-4 text-green-700">
              <CheckCircle className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">
                Campaign Successfully Delivered
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Total Spent</p>
                <p className="font-semibold">
                  {formatCurrency(campaign.budgetSpent)}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Delivery</p>
                <p className="font-semibold text-green-600">On Time</p>
              </div>
            </div>
          </>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex -space-x-2">
            <div className="h-8 w-8 rounded-full border-2 border-white overflow-hidden bg-gray-200"></div>
            <div className="h-8 w-8 rounded-full border-2 border-white overflow-hidden bg-gray-200"></div>
            <div className="h-8 w-8 rounded-full border-2 border-white overflow-hidden bg-gray-200"></div>
            {campaign.status === "active" && (
              <div className="h-8 w-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs text-gray-500">
                +12
              </div>
            )}
            {campaign.status === "in-review" && (
              <div className="h-8 w-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs text-gray-500">
                +6
              </div>
            )}
            {campaign.status === "completed" && (
              <div className="h-8 w-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs text-gray-500">
                +9
              </div>
            )}
          </div>

          <a
            href="#"
            className="text-indigo-600 text-sm font-medium flex items-center gap-1 hover:underline"
          >
            View Details <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;
