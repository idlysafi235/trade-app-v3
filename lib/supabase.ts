import { createClient } from '@supabase/supabase-js';

// These will be replaced with actual values when you connect to Supabase
const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co';
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-public-key';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: false, // Disable auth persistence for demo app
  },
});

// Database types
export interface Signal {
  id: string;
  pair: string;
  type: 'BUY' | 'SELL';
  entry_price: number;
  current_price?: number;
  take_profit_levels: number[];
  stop_loss: number;
  status: 'active' | 'closed' | 'pending';
  accuracy: number;
  timestamp: string;
  description?: string;
  risk_reward?: string;
  pnl?: number;
  created_at: string;
}

export interface MarketData {
  pair: string;
  price: number;
  change: number;
  change_percent: number;
  high: number;
  low: number;
  volume: string;
}