
import { supabase } from '../lib/supabase';
import { mockCampaigns } from './mockData';

/**
 * This is a utility script that can be run to seed the Supabase database with mock campaign data.
 * Note: This is not meant to be run in production, but rather as a development tool.
 */
async function seedCampaigns() {
  // First, let's format the data to match our Supabase schema
  const campaignsToInsert = mockCampaigns.map(campaign => ({
    id: campaign.id,
    title: campaign.title,
    status: campaign.status,
    created_at: campaign.createdAt.toISOString(),
    budget: campaign.budget,
    budget_spent: campaign.budgetSpent,
    estimated_delivery: campaign.estimatedDelivery.toISOString(),
    progress: campaign.progress || null,
  }));

  // Insert the campaigns into Supabase
  const { data, error } = await supabase
    .from('campaigns')
    .upsert(campaignsToInsert, { onConflict: 'id' });

  if (error) {
    console.error('Error seeding campaigns:', error);
    return;
  }

  console.log('Successfully seeded campaigns:', data);
}

// You can run this function manually from the browser console or a script
export { seedCampaigns };
