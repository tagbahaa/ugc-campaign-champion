
import { Campaign } from '../components/CampaignCard';
import { addDays } from 'date-fns';

// Helper to create a date with an offset of days from now
const dateFromNow = (days: number) => {
  return addDays(new Date(), days);
};

// Create some mock campaign data
export const mockCampaigns: Campaign[] = [
  {
    id: '1',
    title: 'Summer Collection Showcase',
    status: 'active',
    createdAt: dateFromNow(-10),
    budget: 3000,
    budgetSpent: 1200,
    estimatedDelivery: dateFromNow(15),
    progress: 40,
  },
  {
    id: '2',
    title: 'New Product Launch - Eco Series',
    status: 'active',
    createdAt: dateFromNow(-7),
    budget: 5000,
    budgetSpent: 2500,
    estimatedDelivery: dateFromNow(10),
    progress: 50,
  },
  {
    id: '3',
    title: 'Holiday Special Campaign',
    status: 'in-review',
    createdAt: dateFromNow(-5),
    budget: 2000,
    budgetSpent: 2000,
    estimatedDelivery: dateFromNow(2),
  },
  {
    id: '4',
    title: 'Fall Collection Teaser',
    status: 'in-review',
    createdAt: dateFromNow(-3),
    budget: 1500,
    budgetSpent: 1500,
    estimatedDelivery: dateFromNow(2),
  },
  {
    id: '5',
    title: 'Brand Awareness Campaign',
    status: 'completed',
    createdAt: dateFromNow(-30),
    budget: 3500,
    budgetSpent: 3500,
    estimatedDelivery: dateFromNow(-5),
  },
  {
    id: '6',
    title: 'Social Media Takeover',
    status: 'completed',
    createdAt: dateFromNow(-45),
    budget: 4000,
    budgetSpent: 3800,
    estimatedDelivery: dateFromNow(-15),
  },
];

// Helper function to get the total budget of in-review campaigns
export const getTotalInReviewBudget = (campaigns: Campaign[]): number => {
  return campaigns
    .filter(campaign => campaign.status === 'in-review')
    .reduce((total, campaign) => total + campaign.budget, 0);
};

// Helper function to get campaigns by status
export const getCampaignsByStatus = (campaigns: Campaign[], status: Campaign['status']): Campaign[] => {
  return campaigns.filter(campaign => campaign.status === status);
};
