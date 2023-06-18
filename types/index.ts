export interface Product {
  name: string;
  slug: string;
  description: string;
  category: string;
  id: number;
  product_content_id: number;
}

type Recuring = {
  aggregate_usage: string | null;
  interval: string;
  interval_count: number;
  usage_type: string;
};

type StripePriceData = {
  id: string;
  object: string;
  active: boolean;
  billing_scheme: string;
  created: number;
  currency: string;
  custom_unit_amount: number | null;
  livemode: boolean;
  lookup_key: string | null;
  metadata: {};
  nickname: string | null;
  product: string;
  recurring: Recuring;
  tax_behavior: string;
  tiers_mode: null;
  transform_quantity: string | null;
  type: string;
  unit_amount: number;
  unit_amount_decimal: string;
};

export interface StripePrice {
  object: string;
  url: string;
  has_more: boolean;
  data: StripePriceData[];
}

export interface Plan {
  name: string;
  id: string;
  price: number | null;
  interval: string;
}

export interface ProductContent {
  id: number;
  created_at: string;
  video_url: string | null;
  download_url: string | null;
}
