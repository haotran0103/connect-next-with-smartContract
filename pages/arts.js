import Link from "next/link";
import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import ProgressBar from "../components/Progress_bar";
import { useRouter } from "next/router";
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
  const router = useRouter();
  const handleDetailsClick = (category, index) => {
    console.log("aaa", category, index);
    router.push({
      pathname: `/detailcate/${category.title}`,
      query: {
        category,
        index,
      },
    });
  };
  const { contract } = useContract(
    "0x82FDF3e77da5317cC6F797921DE147114F16bebc"
  );
  function findProjectIndex(project) {
    const index = projects.findIndex((item) => item.title === project.title);
    return index;
  }

  const { data, isLoading } = useContractRead(contract, "getprojects");
  useEffect(() => {
    if (data) {
      const techProjects = data.filter(
        (project) => project.theLoai === "ngheThuat"
      );
      console.log(techProjects);
      setProjects(techProjects);
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
            <a href={item.detailsUrl} className="details-link">
              <i className="bi bi-link-45deg" />
            </a>
            <button>Join</button>
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
                <h2>Nghệ thuật</h2>
                <p>
                  Đề tài nghệ thuật là một chủ đề mà người ta thường khám phá và
                  sáng tạo để tạo ra các tác phẩm có tính thẩm mỹ cao, bao gồm
                  nhiều lĩnh vực như hội họa, điêu khắc, âm nhạc, vũ đạo và
                  nhiếp ảnh. Nó có thể phản ánh tâm trạng, suy nghĩ, tư duy, hay
                  đơn giản là thể hiện sự đam mê và khát khao của người sáng
                  tác. Từ những tác phẩm nghệ thuật đa dạng này, ta có thể cảm
                  nhận được sự đa dạng và sáng tạo của con người trong việc thể
                  hiện nghệ thuật.
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
                  <p
                    onClick={() =>
                      handleDetailsClick(
                        projects[0],
                        findProjectIndex(projects[0])
                      )
                    }
                  >
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
