
import { supabase } from "@/lib/supabase";
import { Campaign } from "@/components/CampaignCard";

export const getCampaigns = async (): Promise<Campaign[]> => {
  try {
    const { data, error } = await supabase
      .from("campaigns")
      .select("*");

    if (error) {
      console.error("Error fetching campaigns from Supabase:", error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error("Error fetching campaigns from Supabase:", error);
    throw error;
  }
};

export const createCampaign = async (campaign: Omit<Campaign, "id">): Promise<Campaign> => {
  try {
    const { data, error } = await supabase
      .from("campaigns")
      .insert(campaign)
      .select()
      .single();

    if (error) {
      console.error("Error creating campaign:", error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error creating campaign:", error);
    throw error;
  }
};
