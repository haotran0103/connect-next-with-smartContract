import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import React, { useState, useRef } from "react";
import { initializeApp } from "firebase/app";
import { useEffect } from "react";
import Web3 from "web3";
import {
  getStorage,
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { Editor } from "@tinymce/tinymce-react";
import serviceAccount from "../configs/serviceAccountKey.json";
import { resolveProperties } from "ethers/lib/utils.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import Loading from "react-loading";
import { useContractWrite, useContract, useAddress } from "@thirdweb-dev/react";
const firebaseConfig = {
  credential: serviceAccount,
  storageBucket: "blockchainweb-5f8bb.appspot.com",
};
initializeApp(firebaseConfig);
const storage = getStorage();
export default function CreateCampaign() {
  const { contract } = useContract(
    "0x82FDF3e77da5317cC6F797921DE147114F16bebc"
  );
  const { mutateAsync: createproject, isLoading } = useContractWrite(
    contract,
    "createproject"
  );
  const [selectedFile1, setSelectedFile1] = useState(null);
  const [imageUrl1, setImageUrl1] = useState("");
  const [message, setMessage] = useState("");
  const [userName, setuserName] = useState("");
  const [loading, setLoading] = useState(false);
  const [projecttitle, setprojecttitle] = useState("");
  const [Amounts, setAmounts] = useState("");
  const [loiHua, setloiHua] = useState("");
  const [theLoai, settheLoai] = useState("");
  const [moTaDuAn, setmoTaDuAn] = useState("");
  const [tienDo, settienDo] = useState("");
  const [anhBia, setanhBia] = useState(null);
  const [video, setVideo] = useState(null);
  const currentDate = moment().format("DD/MM/YYYY");
  const [startDate, setStartDate] = useState(new Date());
  const disabledDates = [new Date(currentDate)];
  const [accountAddress, setAccountAddress] = useState("");
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      setmoTaDuAn(editorRef.current.getContent());
    }
  };
  const getAccountAddress = async () => {
    if (typeof window !== "object") {
      // xử lý lỗi hoặc thực hiện các hành động khác
      return;
    }

    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    if (accounts.length > 0) {
      setAccountAddress(accounts[0]);
    }
  };

  getAccountAddress();
  const [isLoading1, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    console.log("a");
    setIsLoading(true);
    e.preventDefault();

    const projectImageRef = storageRef(
      storage,
      `projectImages/${selectedFile1.name}`
    );
    console.log("a");
    const projectImageSnapshot = await uploadBytesResumable(
      projectImageRef,
      selectedFile1
    );
    console.log("a");
    const projectImageUrl = await getDownloadURL(projectImageSnapshot.ref);
    const projectVideoRef = storageRef(storage, `projectVideos/${video.name}`);
    const projectVideoSnapshot = await uploadBytesResumable(
      projectVideoRef,
      video
    );
    const projectVideoUrl = await getDownloadURL(projectVideoSnapshot.ref);
    console.log(
      accountAddress,
      projecttitle,
      moTaDuAn,
      loiHua,
      tienDo,
      theLoai,
      projectVideoUrl,
      ethers.utils.parseUnits(Amounts, 18),
      moment(startDate, "YYYY-MM-DD"),
      projectImageUrl
    );
    const call = async () => {
      console.log("a");
      try {
        if (createproject) {
          console.log("a");
          // check if createproject is defined
          const data = await createproject({
            args: [
              accountAddress,
              projecttitle,
              moTaDuAn,
              loiHua,
              tienDo,
              theLoai,
              projectVideoUrl,
              ethers.utils.parseUnits(Amounts, 18),
              new Date(moment(startDate, "YYYY-MM-DD")).getTime(),
              projectImageUrl,
            ],
          });
          console.log("contract call successs", data);
          setIsLoading(false);
        }
      } catch (err) {
        setIsLoading(false);
        console.error("contract call failure", err);
      }
    };
    call();
  };
  const handleFileInputChange1 = (event) => {
    const file = event.target.files[0];
    setSelectedFile1(file);
    setImageUrl1(URL.createObjectURL(file));
    setanhBia(event.target.files[0]);
  };
  return (
    <>
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
            </div>
          </div>
        </div>
      </section>
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-md-12 col-lg-8 col-xl-8 offset-xl-1">
            <form onSubmit={handleSubmit}>
              {/* Email input */}
              <div className="form-outline mb-4">
                <label style={{ color: "white" }}>
                  {" "}
                  tên người tạo dự án:
                  <input
                    type="text"
                    onChange={(e) => setuserName(e.target.value)}
                    value={userName}
                    id="userName"
                    className="form-control form-control-lg"
                    placeholder="nhập vào tên của bạn"
                    required
                    style={{ width: "200%" }}
                  />
                </label>
              </div>
              <div className="form-outline mb-4">
                <label style={{ color: "white" }}>
                  {" "}
                  tên dự án
                  <input
                    type="text"
                    onChange={(e) => setprojecttitle(e.target.value)}
                    value={projecttitle}
                    id="TenProject"
                    className="form-control form-control-lg"
                    placeholder="nhập vào tên dự án của bạn"
                    required
                    style={{ width: "200%" }}
                  />
                </label>
              </div>
              <div className="form-outline mb-4">
                <label style={{ color: "white" }}>
                  {" "}
                  số tiền muốn huy động
                  <input
                    type="text"
                    id="soTien"
                    onChange={(e) => setAmounts(e.target.value)}
                    value={Amounts}
                    className="form-control form-control-lg"
                    placeholder="nhập vào số tiền muốn huy động"
                    required
                    style={{ width: "200%" }}
                  />
                </label>
              </div>
              <div className="form-outline mb-4">
                <label style={{ color: "white" }}>
                  ảnh bìa
                  <input
                    type="file"
                    id="anhbia"
                    required
                    accept="image/*"
                    className="form-control form-control-lg"
                    placeholder="upload hình ảnh đánh giá"
                    onChange={handleFileInputChange1}
                  />
                </label>
                {selectedFile1 && (
                  <img
                    style={{ width: "100%", height: "100%" }}
                    src={imageUrl1}
                    alt="Selected file"
                  />
                )}
              </div>

              <div className="form-outline mb-4">
                <label style={{ color: "white" }}>
                  video:
                  <input
                    type="file"
                    required
                    accept="video/*"
                    onChange={(e) => setVideo(e.target.files[0])}
                  />
                </label>
              </div>
              <label htmlFor="comment">
                Mô Tả Dự Án:
                <Editor
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  initialValue=""
                  init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                      "advlist autolink lists link image charmap print preview anchor",
                      "searchreplace visualblocks code fullscreen",
                      "insertdatetime media table paste code help wordcount",
                    ],
                    toolbar:
                      "undo redo | formatselect | " +
                      "bold italic backcolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist outdent indent | " +
                      "removeformat | help",
                    content_style:
                      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  }}
                  onChange={(event, editor) => {
                    const content = editor.getContent();
                    setmoTaDuAn(content);
                  }}
                />
              </label>
              <label htmlFor="comment">
                lời hứa của người tạo dự án:
                <Editor
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  initialValue=""
                  init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                      "advlist autolink lists link image charmap print preview anchor",
                      "searchreplace visualblocks code fullscreen",
                      "insertdatetime media table paste code help wordcount",
                    ],
                    toolbar:
                      "undo redo | formatselect | " +
                      "bold italic backcolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist outdent indent | " +
                      "removeformat | help",
                    content_style:
                      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  }}
                  onChange={(event, editor) => {
                    const content = editor.getContent();
                    setloiHua(content);
                  }}
                />
              </label>
              <label htmlFor="comment">
                tiến độ và cách dùng tiền kêu gọi:
                <Editor
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  initialValue=""
                  init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                      "advlist autolink lists link image charmap print preview anchor",
                      "searchreplace visualblocks code fullscreen",
                      "insertdatetime media table paste code help wordcount",
                    ],
                    toolbar:
                      "undo redo | formatselect | " +
                      "bold italic backcolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist outdent indent | " +
                      "removeformat | help",
                    content_style:
                      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  }}
                  onChange={(event, editor) => {
                    const content = editor.getContent();
                    settienDo(content);
                  }}
                />
              </label>
              <h1>{message}</h1>
              <select
                className="form-outline mb-4"
                aria-label="Default select example"
                id="theLoai"
                onChange={(e) => settheLoai(e.target.value)}
                value={theLoai}
              >
                <option key="a" disabled value="">
                  chọn loại dự án
                </option>
                <option key="1" value="ngheThuat">
                  NGHỆ THUẬT
                </option>
                <option key="2" value="truyen">
                  TRUYỆN & TRUYỆN TRANH
                </option>
                <option key="3" value="tech">
                  THIẾT KẾ VÀ CÔNG NGHỆ
                </option>
                <option key="4" value="phim">
                  phim
                </option>
                <option key="5" value="games">
                  Games
                </option>
                <option key="6" value="tuThien">
                  Từ Thiện
                </option>
              </select>

              <div className="col-sm-6">
                <div className="form-group">
                  <label style={{ color: "white" }}>
                    {" "}
                    thời gian kết thúc gọi vốn:
                    <div>
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        disabled={false}
                        excludeDates={disabledDates}
                      />
                    </div>
                  </label>
                </div>
              </div>

              <div className="text-center text-lg-start mt-4 pt-2 justify-content-center">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                >
                  tạo dự án
                </button>
              </div>
            </form>
          </div>

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
        </div>
      </div>
    </>
  );
}
