import Head from "next/head";

import Header from "./Header";
import '../assets/scss/common.scss';
import "antd/dist/antd.css";


const Layout = props => (
  <div>
    <Head>
      <title>Next.js App with Redux</title>
    </Head>

    <Header />
    {props.children}
  </div>
);

export default Layout;
