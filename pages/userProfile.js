import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import Web3 from "web3";
import {
  useContractRead,
  useContract,
  useAddress,
  useMetamask,
} from "@thirdweb-dev/react";
import moment from "moment";
export default function userProfile() {
  const connect = useMetamask();
  const address = useAddress();
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const { contract } = useContract(
    "0x82FDF3e77da5317cC6F797921DE147114F16bebc"
  );

  const fetchCampaigns = async () => {
    const { data, isLoading1, error } = useContractRead(
      contract,
      "getprojects"
    );
    setIsLoading(true);
    const filteredCampaigns = data.filter((data) => data.owner === address);
    setCampaigns(filteredCampaigns);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [address, contract]);

  const galleryItems = [];
  for (let i = 0; i < campaigns.length; i++) {
    console.log(accountAddress);
    const item = campaigns[i];
    galleryItems.push(
      <div className="col-xl-4 col-lg-4 col-md-6" key={item.id}>
        <div className="gallery-item h-100">
          <img
            style={{ width: 407, height: 432, objectFit: "cover" }}
            src={item.anhBia}
            className="img-fluid"
            alt={item.title}
          />
          <div className="gallery-links d-flex align-items-center justify-content-center">
            <a
              href={item.imageSrc}
              title={item.title}
              className="glightbox preview-link"
            />
            <button>
              <Link
                style={{ color: "#858d8a", margin: "5px" }}
                href={`/projectDetail/${item.id}`}
              >
                chi tiết
              </Link>
            </button>
            <button>
              <Link
                style={{ color: "#858d8a", margin: "5px" }}
                href={`/edit/${item.id}`}
              >
                edit
              </Link>
            </button>
          </div>
          <div className="user_information">
            <progress
              className="my_progress"
              value={item.fundProgress}
              max={100}
            />
            <p>Tên dự án : {item.tenProject}</p>
            <p>Số người đã ủng hộ: {item.supportersCount}</p>
            <p>
              Thời gian còn lại:{" "}
              {moment(item.ngayHetHan, "YYYY-MM-DD").diff(moment(), "day")} ngày
            </p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="page-header d-flex align-items-center">
        <div className="container position-relative">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-6 text-center">
              <h2 className="text-center">Các dự án của bạn</h2>
            </div>
          </div>
        </div>
      </div>
      <section id="gallery" className="gallery">
        <div className="section-header">
          <h2>dự án của bạn</h2>
        </div>
        <div className="container-fluid">
          <div className="row gy-4 justify-content-center">
            {galleryItems}
            {/* End Gallery Item */}
          </div>
        </div>
      </section>
    </>
  );
}
