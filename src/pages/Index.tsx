import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import CampaignCard, { Campaign } from "../components/CampaignCard";
import StatusFilter from "../components/StatusFilter";
import { Search, Filter } from "lucide-react";
import { getCampaigns } from "../services/campaignService";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setLoading(true);
        const data = await getCampaigns();
        setCampaigns(data);
      } catch (error) {
        console.error("Failed to fetch campaigns:", error);
        toast({
          title: "Error fetching campaigns",
          description: "Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, [toast]);

  const filteredCampaigns =
    selectedStatus === "all"
      ? campaigns
      : campaigns.filter((campaign) => campaign.status === selectedStatus);

  const activeCampaignsCount = campaigns.filter(
    (c) => c.status === "active"
  ).length;
  const completedCampaignsCount = campaigns.filter(
    (c) => c.status === "completed"
  ).length;
  const inReviewCampaignsCount = campaigns.filter(
    (c) => c.status === "in-review"
  ).length;

  // Calculate total budget across campaigns
  const totalBudget = campaigns.reduce(
    (total, campaign) => total + campaign.budget,
    0
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Campaigns</h1>
          <p className="text-vairu-muted">
            Track and manage your UGC campaigns
          </p>
        </div>

        {/* Stats overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 mb-1">Active Campaigns</p>
                <p className="text-3xl font-bold">{activeCampaignsCount}</p>
              </div>
              <div className="bg-green-100 p-2 rounded-lg">
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  ></path>
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 mb-1">Completed</p>
                <p className="text-3xl font-bold">{completedCampaignsCount}</p>
              </div>
              <div className="bg-blue-100 p-2 rounded-lg">
                <svg
                  className="w-5 h-5 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 mb-1">In Review</p>
                <p className="text-3xl font-bold">{inReviewCampaignsCount}</p>
              </div>
              <div className="bg-amber-100 p-2 rounded-lg">
                <svg
                  className="w-5 h-5 text-amber-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Budget</p>
                <p className="text-3xl font-bold">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 0,
                  }).format(totalBudget)}
                </p>
              </div>
              <div className="bg-purple-100 p-2 rounded-lg">
                <svg
                  className="w-5 h-5 text-purple-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <StatusFilter
            currentStatus={selectedStatus}
            onStatusChange={setSelectedStatus}
            campaigns={campaigns}
          />

          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search campaigns..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-vairu-primary focus:border-transparent"
              />
            </div>
            <button className="p-2 border border-gray-200 rounded-lg">
              <Filter className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-64 animate-pulse"
              >
                <div className="h-full bg-gray-100"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredCampaigns.length > 0 ? (
              filteredCampaigns.map((campaign) => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <h3 className="text-xl font-medium text-vairu-muted mb-2">
                  No campaigns found
                </h3>
                <p className="text-vairu-muted">
                  {selectedStatus === "all"
                    ? "You don't have any campaigns yet"
                    : `You don't have any ${selectedStatus} campaigns`}
                </p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
