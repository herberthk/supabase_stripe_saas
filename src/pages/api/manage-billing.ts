import { getURL } from "@/src/core/utils";
import { stripe } from "@/src/pricing/utils/stripe";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const supabaseSeverClient = createServerSupabaseClient({
    req,
    res,
  });
  const {
    data: { user },
  } = await supabaseSeverClient.auth.getUser();
  if (!user) {
    return res.status(401).send("Un authorized");
  }
  const { data: profile } = await supabaseSeverClient
    .from("profile")
    .select("stripe_customer_id")
    .eq("user_id", user.id)
    .single();

  const session = await stripe.billingPortal.sessions.create({
    //@ts-ignore
    customer: profile.stripe_customer_id,
    return_url: getURL(),
  });
  // console.log("session from server", session);
  res.send({ url: session.url });
}
