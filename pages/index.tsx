import { NextPage } from "../data";
import { Logo } from "../data";
import { Image, Link } from "../components";

const Home: NextPage = () => {
  return (
    <div>
      <Image src={Logo} width={150} height={100} />
      <ul>
        <li>
          <Link href="/auth/login">Login</Link>
        </li>
        <li>
          <Link href="/auth/signup">Signup</Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
