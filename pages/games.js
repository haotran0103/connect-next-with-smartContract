import Link from "next/link";
import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import ProgressBar from "../components/Progress_bar";
import moment from "moment";
import {
  useContractRead,
  useContract,
  useAddress,
  useMetamask,
} from "@thirdweb-dev/react";
export default function arts() {
  const [projects, setProjects] = useState([]);
  const connect = useMetamask();
  const address = useAddress();
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
        donators: category.donators.reduce((a, b) => a + b, 0),
        donations: category.donations.length,
      },
    });
  };
  const { contract } = useContract(
    "0x82FDF3e77da5317cC6F797921DE147114F16bebc"
  );
  const { data, isLoading } = useContractRead(contract, "getprojects");
  useEffect(() => {
    if (data) {
      const techProjects = data.filter(
        (project) => project.theLoai === "games"
      );
      setProjects(techProjects);
      console.log("aaaa", techProjects[0]);
    }
  }, [data]);

  const galleryItems = [];
  for (let i = 1; i < projects.length; i++) {
    const item = projects[i];
    galleryItems.push(
      <div className="col-xl-4 col-lg-4 col-md-6" key={item.id}>
        <div className="gallery-item h-100">
          <img
            src={item.anhBia}
            className="img-fluid"
            alt={item.title}
            style={{ width: 407, height: 432, objectFit: "cover" }}
          />
          <div className="gallery-links d-flex align-items-center justify-content-center">
            <a
              href={item.imageSrc}
              title={item.title}
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
            <progress
              className="my_progress"
              value={item.fundProgress}
              max={100}
            />
            <p>Tên dự án: {item.tenProject}</p>
            <p>Số người đã ủng hộ: {item.supportersCount}</p>
            <p>
              Thời gian còn lại:{" "}
              {Math.floor((item.deadline - Date.now()) / (1000 * 60 * 60 * 24))}
            </p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <main id="main" data-aos="fade" data-aos-delay={1500}>
        {/* ======= End Page Header ======= */}
        <div className="page-header d-flex align-items-center">
          <div className="container position-relative">
            <div className="row d-flex justify-content-center">
              <div className="col-lg-6 text-center">
                <h2>Games</h2>
                <p>
                  Chúng tôi tin rằng trò chơi không chỉ là một hình thức giải
                  trí mà còn là một cuộc phiêu lưu đầy thử thách và cơ hội.
                  Chúng tôi không chỉ tạo ra những trò chơi đẹp mắt và hấp dẫn
                  mà còn đảm bảo tính chất giải trí và giáo dục.
                </p>
                <Link className="cta-btn" href="/create-project">
                  bắt đầu dự án đầu tiên
                </Link>
              </div>
            </div>
          </div>
        </div>
        {projects.length !== 0 ? (
          <>
            <div className="container">
              <div className="row gy-4 justify-content-center">
                <div className="col-lg-6">
                  <img
                    src={projects[0].image}
                    className="img-fluid"
                    alt=""
                    style={{ width: 407, height: 432, objectFit: "cover" }}
                  />
                </div>
                <div className="col-lg-5 content">
                  <h2>{projects[0].title}</h2>
                  <ProgressBar
                    bgcolor="orange"
                    progress={Math.floor(
                      (projects[0].donations.reduce((a, b) => a + b, 0) /
                        projects[0].target || 0) * 100
                    )}
                    height={20}
                  />
                  <p className="fst-italic py-3">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: projects[0].description,
                      }}
                    />
                  </p>
                  <div className="row">
                    <h4>Thông tin cuộc gọi vốn</h4>
                    <div className="col-lg-6">
                      <ul>
                        <li>
                          <i className="bi bi-chevron-right" />{" "}
                          <strong>mã ví:</strong>{" "}
                          <span>{projects[0].owner}</span>
                        </li>
                        <li>
                          <i className="bi bi-chevron-right" />{" "}
                          <strong>ngày còn lại:</strong>{" "}
                          <span>
                            {Math.floor(
                              (projects[0].deadline - Date.now()) /
                                (1000 * 60 * 60 * 24)
                            )}{" "}
                            Ngày
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <p className="py-3"></p>
                  <h4>Kế hoạch dùng tiền</h4>
                  <div
                    dangerouslySetInnerHTML={{ __html: projects[0].keHoach }}
                  />
                  <p />
                  <p className="py-3"></p>
                  <p onClick={() => handleDetailsClick(projects[0], index)}>
                    <h5 style={{ cursor: "pointer" }}>xem chi tiết</h5>
                  </p>
                  <p />
                </div>
              </div>
            </div>
            <section id="gallery" className="gallery">
              <div className="section-header">
                <h2>Arts</h2>
                <p>Tiêu biểu khác</p>
              </div>
              <div className="container-fluid">
                <div className="row gy-4 justify-content-center">
                  {galleryItems}
                </div>
              </div>
            </section>
          </>
        ) : (
          <h2 className="row gy-4 justify-content-center">
            hiện tại chủ đề này chưa có dự án nào cả
          </h2>
        )}
      </main>
    </>
  );
}
