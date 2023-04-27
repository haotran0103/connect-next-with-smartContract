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
import Progress_bar from "../components/Progress_bar";

export default function userProfile() {
  const connect = useMetamask();
  const address = useAddress();
  const [isLoading1, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [project, setproject] = useState([]);
  const { contract } = useContract(
    "0x82FDF3e77da5317cC6F797921DE147114F16bebc"
  );
  const { data, isLoading, error } = useContractRead(contract, "getprojects");
  useEffect(() => {
    if (data) {
      console.log(data);
      setproject(data);
    }
  }, [data]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      console.log("aa", project);
      if (project) {
        const filteredCampaigns = project.filter(
          (project) => project.owner === address
        );
        setCampaigns(filteredCampaigns);
        console.log("aa", filteredCampaigns);
        setIsLoading(false);
      }
    };
    fetchCampaigns();
  }, [project, address]);

  console.log(campaigns.length);
  const galleryItems = [];
  for (let i = 0; i < campaigns.length; i++) {
    const item = campaigns[i];
    galleryItems.push(
      <div className="col-xl-4 col-lg-4 col-md-6" key={item.id}>
        <div className="gallery-item h-100">
          <img
            style={{ width: 407, height: 432, objectFit: "cover" }}
            src={item.image}
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
          </div>
          <div className="user_information">
            <Progress_bar
              bgcolor="orange"
              progress={Math.floor(
                (item.donations.reduce((a, b) => a + b, 0) /
                  item.target) *
                  100
              )}
              height={20}
            />
            <p>Tên dự án : {item.title}</p>
            <p>Số người đã ủng hộ: {item.donators.length}</p>
            <p>
              Thời gian còn lại:{" "}
              {Math.floor((item.deadline - Date.now()) / (1000 * 60 * 60 * 24))}{" "}
              ngày
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
