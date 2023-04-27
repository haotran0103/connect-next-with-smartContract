import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { format } from "date-fns";
import { ethers } from "ethers";
import { useLocation, useNavigate } from "react-router-dom";
import Web3 from "web3";
import { BigNumber } from "ethers";
import {
  useContractRead,
  useContract,
  useAddress,
  useMetamask,
  useContractWrite,
} from "@thirdweb-dev/react";
const DetailProject = () => {
  const router = useRouter();
  const {
    pId,
    title,
    description,
    owner,
    loiHua,
    keHoach,
    theLoai,
    target,
    deadline,
    amountCollected,
    image,
    viddeo,
    donators,
    donations,
  } = router.query;
  const connect = useMetamask();
  const address = useAddress();
  const [isMounted, setIsMounted] = useState(false);
  const [amounts, setAmounts] = useState("");
  const [isLoading1, setIsLoading] = useState(false);
  const { contract } = useContract(
    "0x82FDF3e77da5317cC6F797921DE147114F16bebc"
  );
  const donationsArray = Array.of(donations);
  const totalDonations = donationsArray
    .map((donation) => donation.toString())
    .reduce((acc, cur) => acc + cur, "0");
  const progressPercentage = parseFloat(totalDonations).toFixed(3);

  const { mutateAsync: donateToproject, isLoading } = useContractWrite(
    contract,
    "donateToproject"
  );

  const handleSubmit = async (pId, amounts) => {
    const a = ethers.utils.parseEther(amounts);
    console.log(a);
    try {
      const data = await donateToproject({
        args: [pId],
        value: a,
      });
      console.log("Contract call success", data);
    } catch (err) {
      console.log("Contract call failure", err);
    }
  };
  const handleDonate = async (pId, amounts) => {
    console.log(pId, amounts);
    setIsLoading(true);
    const data = await contract.call("donateToproject", pId, {
      value: ethers.utils.parseEther(amounts),
    });

    setIsLoading(false);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return (
    <main id="main" data-aos="fade" data-aos-delay={1500}>
      {/* ======= End Page Header ======= */}
      <div className="page-header d-flex align-items-center">
        <div className="container position-relative">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-6 text-center">
              <h2>Chi Tiết Dự Án</h2>
              <h4>{title}</h4>
            </div>
          </div>
        </div>
      </div>
      {/* End Page Header */}
      {/* ======= Gallery Single Section ======= */}
      <section id="gallery-single" className="gallery-single">
        <div className="container">
          <div className="position-relative h-100">
            <div className="slides-1 portfolio-details-slider swiper">
              <div className="swiper-wrapper align-items-center">
                <div
                  className="video-container"
                  style={{ height: "100vh", width: "100vw" }}
                >
                  <ReactPlayer
                    url={viddeo}
                    controls={true}
                    width="100%"
                    height="100%"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row justify-content-between gy-4 mt-4">
            <div className="col-lg-8">
              <div className="portfolio-description">
                <h2>{title}</h2>
                <p>
                  Mô tả:{" "}
                  <div dangerouslySetInnerHTML={{ __html: description }} />
                </p>
                <div className="testimonial-item">
                  <p>
                    <i
                      style={{ maxHeight: "80%", maxWidth: "80%" }}
                      className="bi bi-quote quote-icon-left"
                    />
                    <div dangerouslySetInnerHTML={{ __html: loiHua }} />
                    <i
                      style={{ maxHeight: "80%", maxWidth: "80%" }}
                      className="bi bi-quote quote-icon-right"
                    />
                  </p>
                  <div>
                    <img src={image} className="testimonial-img" alt="" />
                    <h3>mã ví : {owner}</h3>
                  </div>
                </div>
                <p>
                  Kế hoạch sử dụng tiền kêu gọi:{" "}
                  <div dangerouslySetInnerHTML={{ __html: keHoach }} />
                </p>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="portfolio-info">
                <h3>Thông tin dự án</h3>
                <ul>
                  <li>
                    <strong>Loại dự án</strong> <span>{theLoai}</span>
                  </li>
                  <li>
                    <strong>Số tiền huy động</strong> <span>{target}</span>
                  </li>
                  <li>
                    <strong>Số tiền đã huy động</strong>{" "}
                    <span>{progressPercentage}</span>
                  </li>
                  <li>
                    <strong>Số người đóng góp</strong> <span>{donators}</span>
                  </li>
                  <li>
                    <strong>Số ngày còn lại</strong> {deadline} Ngày
                  </li>
                  <li>
                    <div className="form-outline mb-4">
                      <label style={{ color: "white" }}>
                        {" "}
                        Nhập vào số tiền muốn đóng góp
                        <input
                          type="text"
                          step="0.01"
                          id="soTien"
                          value={amounts}
                          onChange={(e) => setAmounts(e.target.value)}
                          className="form-control form-control-lg"
                          placeholder="ETH 0.1"
                          required
                          // style={{ width: "200%" }}
                        />
                      </label>
                    </div>
                    {address ? (
                      <button
                        style={{ color: "#ada9a9" }}
                        className="btn-visit align-self-start"
                        onClick={() => handleDonate(pId, amounts)}
                      >
                        tham gia dự án
                      </button>
                    ) : (
                      <button
                        style={{ color: "#ada9a9" }}
                        className="btn-visit align-self-start"
                        onClick={() => connect()}
                      >
                        tham gia dự án
                      </button>
                    )}
                    {isLoading1 && (
                      <div
                        style={{
                          position: "fixed",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: "rgba(0, 0, 0, 0.5)",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          zIndex: 999,
                        }}
                      >
                        <div className="spinner" />
                        <p style={{ color: "white", marginLeft: 10 }}>
                          Vui lòng đợi trong giây lát...
                        </p>
                      </div>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Gallery Single Section */}
    </main>
  );
};
export default DetailProject;
