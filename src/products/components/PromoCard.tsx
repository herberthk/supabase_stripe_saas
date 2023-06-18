import Link from "next/link";

const PromoCard = () => {
  return (
    <section>
      <div>
        <div>
          <h4>Get instant access</h4>
          <p style={{ fontSize: "1rem" }}>
            Access this product plus dozens of others when you subscribe
          </p>
        </div>
      </div>
      <Link href="/pricing" className="primary button">
        Purchase
      </Link>
    </section>
  );
};

export default PromoCard;
