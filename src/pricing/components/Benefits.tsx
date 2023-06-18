const benefits = [
  {
    title: "One low price",
    subtitle:
      " Save big, Get everything at super low price monthly subscription",
  },
  {
    title: "No limits",
    subtitle: "Get complete access to everything on the site",
  },
  {
    title: "Cancel any time",
    subtitle: "Pause or stop your subscription whenever you like",
  },
];
const Benefits = () => {
  return (
    <div className="bg-lack">
      <div className="column-padding">
        <div className="content-grid xl">
          {benefits.map(({ title, subtitle }) => (
            <div key={title} className="spacing-base">
              <h3>
                {title}
                <br />
              </h3>
              <div>{subtitle}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Benefits;
