import Link from "next/link";
import Web3 from "web3";
import {
  useContractRead,
  useContract,
  useAddress,
  useMetamask,
} from "@thirdweb-dev/react";
import React, { useState } from "react";

const Header = () => {
  const [showNav, setShowNav] = useState(true);
  const [showMenuMobie, setShowMenuMobie] = useState(false);
  const connect = useMetamask();
  const address = useAddress();

  const toggleNav = () => {
    setShowNav(!showNav);
  };

  const toggleMobileMenu = () => {
    setShowMenuMobie(!showMenuMobie);
  };

  return (
    <header
      id="header"
      className="header d-flex align-items-center fixed-top"
      style={{ maxHeight: "50px", paddingTop: "50px" }}
    >
      <div className="container-fluid d-flex align-items-center justify-content-between">
        <div className="logo-header">
          <Link href="/" style={{ paddingRight: "50px" }}>
            <img src="assets/img/logo2.png" alt="logo" />
          </Link>
        </div>
        <nav
          id="navbar"
          className={`navbar ${showNav ? "navbar-show" : "navbar-hide"} ${
            showMenuMobie ? "navbar-mobile-show" : "navbar-mobile-hide"
          }`}
        >
          <ul>
            <li>
              <Link href="/arts">Nghệ thuật</Link>
            </li>
            <li>
              <Link href="/comics-and-illustration">Truyện & truyện Tranh</Link>
            </li>
            <li>
              <Link href="/design-tech">Thiết kế và công nghệ</Link>
            </li>
            <li>
              <Link href="/film">Phim</Link>
            </li>
            <li>
              <Link href="/games">Games</Link>
            </li>
            <li style={{ paddingRight: "50px" }}>
              <Link href="/tuThien">Từ thiện</Link>
            </li>
            <li>
              <div
                style={{
                  marginTop: "1px",
                  marginLeft: "70px",
                  cursor: "pointer",
                }}
              >
                {address ? (
                  <Link href={`/userProfile`}>Trang cá nhân</Link>
                ) : (
                  <a onClick={() => connect()}>Đăng nhập</a>
                )}
              </div>
            </li>
          </ul>
        </nav>
        {/* <i
          className={`mobile-nav-toggle ${
            showMenuMobie ? "bi bi-x" : "bi bi-list"
          }`}
          onClick={toggleMobileMenu}
        /> */}
      </div>
    </header>
  );
};

export default Header;
