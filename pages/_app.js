import "../public/assets/vendor/aos/aos";
import "../public/assets/vendor/bootstrap/css/bootstrap.min.css";
import "../public/assets/vendor/bootstrap-icons/bootstrap-icons.css";
import "../public/assets/vendor/swiper/swiper-bundle.min.css";
import "../public/assets/vendor/glightbox/css/glightbox.min.css";
import "../styles/metamask.css";
import "../public/assets/css/main.css";
import { ThirdwebProvider, useContract } from "@thirdweb-dev/react";
import Layout from "../components/layout/layout.jsx";
import { Sepolia } from "@thirdweb-dev/chains";

function MyApp(props) {
  return (
    <ThirdwebProvider activeChain={Sepolia}>
      <Layout>
        <props.Component {...props.pageProps} />
        <Component />
      </Layout>
    </ThirdwebProvider>
  );
}
function Component() {
  const { contract, isLoading } = useContract(
    "0x82FDF3e77da5317cC6F797921DE147114F16bebc"
  );
}
export default MyApp;
