import { Campaign } from "./CampaignCard";

interface StatusFilterProps {
  currentStatus: string;
  onStatusChange: (status: string) => void;
  campaigns: Campaign[];
}

const StatusFilter = ({
  currentStatus,
  onStatusChange,
  campaigns,
}: StatusFilterProps) => {
  const activeCount = campaigns.filter((c) => c.status === "active").length;
  const inReviewCount = campaigns.filter(
    (c) => c.status === "in-review"
  ).length;
  const completedCount = campaigns.filter(
    (c) => c.status === "completed"
  ).length;

  return (
    <div className="flex">
      <button
        onClick={() => onStatusChange("active")}
        className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
          currentStatus === "active"
            ? "bg-indigo-600 text-white"
            : "bg-white text-gray-700 hover:bg-gray-100"
        }`}
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white bg-opacity-20">
          <span
            className={
              currentStatus === "active" ? "text-white" : "text-indigo-600"
            }
          >
            {activeCount}
          </span>
        </span>
        <span>Active</span>
      </button>

      <button
        onClick={() => onStatusChange("in-review")}
        className={`flex items-center gap-2 px-4 py-2 rounded-md ml-2 transition-colors ${
          currentStatus === "in-review"
            ? "bg-indigo-600 text-white"
            : "bg-white text-gray-700 hover:bg-gray-100"
        }`}
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white bg-opacity-20">
          <span
            className={
              currentStatus === "in-review" ? "text-white" : "text-indigo-600"
            }
          >
            {inReviewCount}
          </span>
        </span>
        <span>In Review</span>
      </button>

      <button
        onClick={() => onStatusChange("completed")}
        className={`flex items-center gap-2 px-4 py-2 rounded-md ml-2 transition-colors ${
          currentStatus === "completed"
            ? "bg-indigo-600 text-white"
            : "bg-white text-gray-700 hover:bg-gray-100"
        }`}
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white bg-opacity-20">
          <span
            className={
              currentStatus === "completed" ? "text-white" : "text-indigo-600"
            }
          >
            {completedCount}
          </span>
        </span>
        <span>Completed</span>
      </button>
    </div>
  );
};

export default StatusFilter;
