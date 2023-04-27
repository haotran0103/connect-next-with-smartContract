import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Web3 from "web3";
import moment from "moment";
import { useRouter } from "next/router";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../components/Progress_bar";
import {
  useContractRead,
  useContract,
  useAddress,
  useMetamask,
} from "@thirdweb-dev/react";
import { daysLeft } from "../utils";
import { ca } from "date-fns/locale";
export default function Home() {
  const [projects, setProjects] = useState([]);
  const connect = useMetamask();
  const address = useAddress();
  const router = useRouter();

  const handleDetailsClick = (category, index) => {
    console.log(category, index);
    router.push({
      pathname: `/detail/${category.title}`,
      query: {
        pId: index,
        title: category.title,
        description: category.description,
        owner: category.owner,
        loiHua: category.loiHua,
        keHoach: category.keHoach,
        theLoai: category.theLoai,
        target: category.target,
        deadline: Math.floor(
          (category.deadline - Date.now()) / (1000 * 60 * 60 * 24)
        ),
        amountCollected: category.amountCollected,
        image: category.image,
        viddeo: category.viddeo,
        donators: category.donators.length,
        donations: category.donations.reduce((a, b) => a + b, 0),
      },
    });
  };

  const { contract } = useContract(
    "0x82FDF3e77da5317cC6F797921DE147114F16bebc"
  );
  const { data, isLoading, error } = useContractRead(contract, "getprojects");
  useEffect(() => {
    if (data) {
      console.log(data);
      setProjects(data);
    }
  }, [data]);
  return (
    <>
      <Head>
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <title>Cryptic Titan</title>
        <meta content="" name="description" />
        <meta content="" name="keywords" />
        {/* Favicons */}
        <link href="assets/img/favicon.png" rel="icon" />
        <link href="assets/img/apple-touch-icon.png" rel="apple-touch-icon" />
        {/* Google Fonts */}
      </Head>

      <section
        id="hero"
        className="hero d-flex flex-column justify-content-center align-items-center"
        data-aos="fade"
        data-aos-delay={1500}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 text-center">
              <h2 style={{ fontFamily: "auto" }}>
                Chúng tôi là
                <hao style={{ color: "#e3b11e ", padding: "6px" }}>
                  Cryptic Titan
                </hao>
                nơi khởi nguồn của các nhà đầu tư triệu đô
              </h2>
              <p>
                Đầu tư theo cách bạn muốn, hãy đầu tư vào các dự án khởi nghiệp
                ở đây, bạn sẽ trở thành tỉ phú ngay bâu giờ hoặc không bao giờ
              </p>
              {address ? (
                <Link href="/createProject" className="btn-get-started">
                  Tạo dự án đầu tiên ngay
                </Link>
              ) : (
                <button className="btn-get-started" onClick={() => connect()}>
                  Kết nối ví ngay
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
      <main id="main" data-aos="fade">
        {/* ======= Gallery Section ======= */}
        <section id="gallery" className="gallery">
          <div className="container-fluid">
            <div className="row gy-4 justify-content-center">
              {projects !== [] ? (
                projects &&
                Array.isArray(data) &&
                projects.map((category, index) => (
                  <div className="col-xl-4 col-lg-4 col-md-6" key={category.id}>
                    <div className="gallery-item h-100">
                      <img
                        src={category.image}
                        className="img-fluid"
                        alt=""
                        style={{ width: 407, height: 432, objectFit: "cover" }}
                      />
                      <div className="gallery-links d-flex align-items-center justify-content-center">
                        <a
                          href={category.anhBia}
                          title="Gallery 2"
                          className="glightbox preview-link"
                        />
                        <button
                          className="details-link"
                          onClick={() => handleDetailsClick(category, index)}
                        >
                          <i className="bi bi-link-45deg" />
                        </button>
                      </div>
                      <div className="user_information">
                        <ProgressBar
                          bgcolor="orange"
                          progress={Math.floor(
                            (category.donations.reduce((a, b) => a + b, 0) /
                              category.target) *
                              100
                          )}
                          height={20}
                        />
                        <p>Tên dự án : {category.title}</p>
                        <p>Số người đã ủng hộ: {category.donators.length}</p>
                        <p>
                          Thời gian còn lại :{" "}
                          {Math.floor(
                            (category.deadline - Date.now()) /
                              (1000 * 60 * 60 * 24)
                          )}{" "}
                          ngày
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <h1>'Hiện tại chưa có cập nhật mới'</h1>
              )}
            </div>
          </div>
        </section>
        {/* End Gallery Section */}
        {/* ======= Testimonials Section ======= */}
        <section id="testimonials" className="testimonials">
          <div className="container">
            <div className="section-header">
              <h2>những người khởi tạo</h2>
              <p>họ nói gì</p>
            </div>
            <div className="slides-3 swiper">
              <div className="swiper-wrapper">
                <div className="testimonial-item">
                  <div className="stars">
                    <i className="bi bi-star-fill" />
                    <i className="bi bi-star-fill" />
                    <i className="bi bi-star-fill" />
                    <i className="bi bi-star-fill" />
                    <i className="bi bi-star-fill" />
                  </div>
                  <p>
                    Những khoảng đầu tư nên minh bạch nhất có thể để đảm bảo lợi
                    ích của các bên
                  </p>
                  <div className="profile mt-auto">
                    <img
                      src="assets/img/testimonials/testimonials-6.jpg"
                      className="testimonial-img"
                      alt=""
                    />
                    <h3>Trần Quốc Hào</h3>
                    <h4>Ceo &amp; Founder</h4>
                  </div>
                </div>

                {/* End testimonial item */}

                <div className="testimonial-item">
                  <div className="stars">
                    <i className="bi bi-star-fill" />
                    <i className="bi bi-star-fill" />
                    <i className="bi bi-star-fill" />
                    <i className="bi bi-star-fill" />
                    <i className="bi bi-star-fill" />
                  </div>
                  <p>
                    Đến năm 2025, Khoa Công nghệ Thông tin - Đại học Nguyễn Tất
                    Thành là nơi uy tín về đào tạo và cung cấp nguồn nhân lực
                    công nghệ thông tin có trình độ và chất lượng tiên tiến
                    trong khu vực để đáp ứng các yêu cầu về quản lý, sản xuất,
                    dịch vụ và ứng dụng của công nghệ thông tin trong nước và
                    quốc tế
                  </p>
                  <div className="profile mt-auto">
                    <img
                      src="assets/img/testimonials/testimonials-8.jpg"
                      className="testimonial-img"
                      alt=""
                    />
                    <h3>NTTU</h3>
                    <h4>nhà đầu tư chính</h4>
                  </div>
                </div>
                {/* End testimonial item */}

                <div className="testimonial-item">
                  <div className="stars">
                    <i className="bi bi-star-fill" />
                    <i className="bi bi-star-fill" />
                    <i className="bi bi-star-fill" />
                    <i className="bi bi-star-fill" />
                    <i className="bi bi-star-fill" />
                  </div>
                  <p>
                    Hãy đầu ngay khi bạn có thể hoặc về già bạn chả có cái gì
                    hết ngoài bộ xương
                  </p>
                  <div className="profile mt-auto">
                    <img
                      src="assets/img/testimonials/testimonials-7.jpg"
                      className="testimonial-img"
                      alt=""
                    />
                    <h3>Hoài Fong</h3>
                    <h4>Designer</h4>
                  </div>
                </div>

                {/* End testimonial item */}
              </div>
              <div className="swiper-pagination" />
            </div>
          </div>
        </section>
        {/* End Testimonials Section */}
      </main>
    </>
  );
}
