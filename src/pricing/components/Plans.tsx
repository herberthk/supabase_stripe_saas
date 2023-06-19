import { getURL } from "@/src/core/utils";
import { Plan } from "@/types";
import { loadStripe } from "@stripe/stripe-js";
import { FC, useState } from "react";

interface Props {
  plans: Plan[];
}
const Plans: FC<Props> = ({ plans }) => {
  const [selected, setSelected] = useState("month");
  const [redirecting, setRedirecting] = useState(false);

  const plan = plans.find((plan) => plan.interval === selected);
  const togglePlan = () => {
    const interval = selected === "month" ? "year" : "month";
    setSelected(interval);
  };
  const onCheckout = async () => {
    setRedirecting(true);
    const response = await fetch(`${getURL()}/api/checkout/${plan?.id}`);
    const data = await response.json();
    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    );
    await stripe?.redirectToCheckout({ sessionId: data.id });
    setRedirecting(false);
  };
  return (
    <div className="bg-salmon border-right">
      <div className="column-padding centered">
        <div className="callout-wrap">
          <div className="plan">
            <div className="plan-wrap">
              <div className="plan-content">
                <div className="plan-switch">
                  Monthly
                  <label className="switch">
                    <input onChange={togglePlan} type="checkbox" />
                    <span className="slider"></span>
                  </label>
                  Yearly
                </div>
                <h2 className="plan-name">{plan?.name}</h2>
                <div>
                  Just {plan?.price} / {plan?.interval}
                </div>
                <div>
                  <button
                    disabled={redirecting}
                    onClick={onCheckout}
                    className="large-button"
                  >
                    <div className="large-button-text">
                      {redirecting ? "Please wait..." : "Buy now"}
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Plans;
