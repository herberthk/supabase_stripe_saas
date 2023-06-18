import { FC } from "react";

type Props = {
  submited: string;
};
const LoginSubmitted: FC<Props> = ({ submited }) => {
  return (
    <div className="content-grid home-hero">
      <h1>Link sent!</h1>
      <p>Check your email {submited} to finish your login</p>
    </div>
  );
};

export default LoginSubmitted;
