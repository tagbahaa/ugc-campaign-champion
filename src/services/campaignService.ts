
import { supabase } from "@/lib/supabase";
import { Campaign } from "@/components/CampaignCard";

// Mock data for development when Supabase is not connected
const mockCampaigns: Campaign[] = [
  {
    id: "1",
    title: "Summer Collection Launch",
    status: "active",
    createdAt: new Date("2025-02-15"),
    budget: 5000,
    budgetSpent: 2500,
    estimatedDelivery: new Date("2025-04-30"),
    progress: 50
  },
  {
    id: "2",
    title: "Product Review Series",
    status: "in-review",
    createdAt: new Date("2025-03-01"),
    budget: 3500,
    budgetSpent: 3500,
    estimatedDelivery: new Date("2025-03-15"),
    progress: 100
  },
  {
    id: "3",
    title: "Holiday Season Promotion",
    status: "completed",
    createdAt: new Date("2024-12-01"),
    budget: 7500,
    budgetSpent: 7200,
    estimatedDelivery: new Date("2025-01-05"),
    progress: 100
  }
];

export const getCampaigns = async (): Promise<Campaign[]> => {
  try {
    // First try to get data from Supabase
    const { data, error } = await supabase
      .from("campaigns")
      .select("*");

    if (error) {
      console.warn("Using mock data due to Supabase error:", error);
      return mockCampaigns;
    }

    if (data && data.length > 0) {
      // Transform the data to match the Campaign interface
      return data.map(item => ({
        id: item.id,
        title: item.title,
        status: item.status,
        createdAt: new Date(item.created_at),
        budget: item.budget,
        budgetSpent: item.budget_spent,
        estimatedDelivery: new Date(item.estimated_delivery),
        progress: item.progress || 0
      }));
    }

    // Fall back to mock data if Supabase returns empty data
    console.info("No data found in Supabase, using mock data");
    return mockCampaigns;
  } catch (error) {
    console.warn("Using mock data due to exception:", error);
    return mockCampaigns;
  }
};

export const createCampaign = async (campaign: Omit<Campaign, "id">): Promise<Campaign> => {
  try {
    // Transform the Campaign interface to match the database schema
    const dbCampaign = {
      title: campaign.title,
      status: campaign.status,
      created_at: campaign.createdAt.toISOString(),
      budget: campaign.budget,
      budget_spent: campaign.budgetSpent,
      estimated_delivery: campaign.estimatedDelivery.toISOString(),
      progress: campaign.progress
    };

    const { data, error } = await supabase
      .from("campaigns")
      .insert(dbCampaign)
      .select()
      .single();

    if (error) {
      console.error("Error creating campaign:", error);
      // Generate a mock response for development
      return {
        id: `mock-${Date.now()}`,
        ...campaign
      };
    }

    return {
      id: data.id,
      title: data.title,
      status: data.status,
      createdAt: new Date(data.created_at),
      budget: data.budget,
      budgetSpent: data.budget_spent,
      estimatedDelivery: new Date(data.estimated_delivery),
      progress: data.progress || 0
    };
  } catch (error) {
    console.error("Error creating campaign:", error);
    // Generate a mock response for development
    return {
      id: `mock-${Date.now()}`,
      ...campaign
    };
  }
};
