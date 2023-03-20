// import React, { useEffect, useState } from "react";
// import {
//   Input,
//   Col,
//   Row,
//   Typography,
//   message,
//   Avatar,
//   Breadcrumb,
//   Upload,
//   Button,
// } from "antd";

// import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
// import authService from "../../service/auth.service";

// const { Title, Text } = Typography;
// // const getBase64 = (img, callback) => {
// //   const reader = new FileReader();
// //   reader.addEventListener("load", () => callback(reader.result));
// //   reader.readAsDataURL(img);
// // };

// // const beforeUpload = (file) => {
// //   const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
// //   if (!isJpgOrPng) {
// //     message.error("You can only upload JPG/PNG file!");
// //   }
// //   const isLt2M = file.size / 1024 / 1024 < 2;
// //   if (!isLt2M) {
// //     message.error("Image must smaller than 2MB!");
// //   }
// //   return isJpgOrPng && isLt2M;
// // };

// const UserInfo = () => {
//   const [loading, setLoading] = useState(false);
//   //const [imageUrl, setImageUrl] = useState();
//   const [user, setUser] = useState(null);
//   console.log(user);
// //   const handleChange = (info) => {
// //     if (info.file.status === "uploading") {
// //       setLoading(true);
// //       return;
// //     }
// //     if (info.file.status === "done") {
// //       // Get this url from response in real world.
// //       getBase64(info.file.originFileObj, (url) => {
// //         setLoading(false);
// //         setImageUrl(url);
// //       });
// //     }
// //   };

//   const uploadButton = (
//     <div>
//       {loading ? <LoadingOutlined /> : <PlusOutlined />}
//       <div
//         style={{
//           marginTop: 8,
//         }}
//       >
//         Upload
//       </div>
//     </div>
//   );

//   useEffect(() => {
//     //get info user in local storage
//     setUser(authService.getUser().staff);
//   }, []);
//   return (
//     <div className="site-card-wrapper">
//       <Breadcrumb style={{ marginBottom: "1rem", marginTop: "1rem" }}>
//         <Breadcrumb.Item>Home</Breadcrumb.Item>
//         <Breadcrumb.Item>Thông tin tài khoản</Breadcrumb.Item>
//       </Breadcrumb>

//       <Row
//         style={{
//           width: "100%",
//           backgroundColor: "white",
//           borderRadius: "8px",
//           padding: "24px 24px",
//           minHeight: "100vh",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <Col span={24}>
//           <form>
//             <Row>
//               <Col span={10}></Col>
//               <Col span={14}>
//                 <Upload
//                   name="avatar"
//                   listType="picture-card"
//                   className="avatar-uploader"
//                   showUploadList={false}
//                   action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
//                   beforeUpload={beforeUpload}
//                   onChange={handleChange}
//                 >
//                   {imageUrl ? (
//                     <img
//                       src={imageUrl}
//                       alt="avatar"
//                       style={{
//                         width: "100%",
//                       }}
//                     />
//                   ) : (
//                     uploadButton
//                   )}
//                 </Upload>
//               </Col>
//             </Row>
//             <Row style={{ marginTop: "1rem" }} gutter={16}>
//               <Col
//                 span={10}
//                 style={{ display: "flex", justifyContent: "flex-end" }}
//                 className="gutter-row"
//               >
//                 <p
//                   style={{
//                     color: "#4f4f4f",
//                     fontSize: "13px",
//                     fontWeight: "700",
//                   }}
//                 >
//                   First Name
//                 </p>
//               </Col>
//               <Col span={14}>
//                 <Input
//                   style={{ width: "50%" }}
//                   placeholder="Enter first name"
//                   value={user?.firstName}
//                 />
//               </Col>
//             </Row>
//             <Row style={{ marginTop: "0.5rem" }} gutter={16}>
//               <Col
//                 span={10}
//                 style={{ display: "flex", justifyContent: "flex-end" }}
//                 className="gutter-row"
//               >
//                 <p
//                   style={{
//                     color: "#4f4f4f",
//                     fontSize: "13px",
//                     fontWeight: "700",
//                   }}
//                 >
//                   Last Name
//                 </p>
//               </Col>
//               <Col span={14}>
//                 <Input
//                   style={{ width: "50%" }}
//                   placeholder="Enter last name"
//                   value={user?.lastName}
//                 />
//               </Col>
//             </Row>
//             <Row style={{ marginTop: "0.5rem" }} gutter={16}>
//               <Col
//                 span={10}
//                 style={{ display: "flex", justifyContent: "flex-end" }}
//                 className="gutter-row"
//               >
//                 <p
//                   style={{
//                     color: "#4f4f4f",
//                     fontSize: "13px",
//                     fontWeight: "700",
//                   }}
//                 >
//                   Email
//                 </p>
//               </Col>
//               <Col span={14}>
//                 <Input
//                   style={{ width: "50%" }}
//                   value={user?.email}
//                   placeholder="Enter email"
//                   disabled
//                 />
//               </Col>
//             </Row>
//             <Row style={{ marginTop: "0.5rem" }} gutter={16}>
//               <Col
//                 span={10}
//                 style={{ display: "flex", justifyContent: "flex-end" }}
//                 className="gutter-row"
//               ></Col>
//               <Col span={14}>
//                 <Button type="primary">Save</Button>
//               </Col>
//             </Row>
//           </form>

//           <form style={{ marginTop: "2rem" }}>
//             <Row style={{ marginTop: "0.5rem" }} gutter={16}>
//               <Col
//                 span={10}
//                 style={{ display: "flex", justifyContent: "flex-end" }}
//                 className="gutter-row"
//               >
//                 <p
//                   style={{
//                     color: "#4f4f4f",
//                     fontSize: "13px",
//                     fontWeight: "700",
//                   }}
//                 >
//                   Current Password
//                 </p>
//               </Col>
//               <Col span={14}>
//                 <Input.Password
//                   style={{ width: "50%" }}
//                   placeholder="Enter last name"
//                 />
//               </Col>
//             </Row>
//             <Row style={{ marginTop: "0.5rem" }} gutter={16}>
//               <Col
//                 span={10}
//                 style={{ display: "flex", justifyContent: "flex-end" }}
//                 className="gutter-row"
//               >
//                 <p
//                   style={{
//                     color: "#4f4f4f",
//                     fontSize: "13px",
//                     fontWeight: "700",
//                   }}
//                 >
//                   New Password
//                 </p>
//               </Col>
//               <Col span={14}>
//                 <Input.Password
//                   style={{ width: "50%" }}
//                   placeholder="Enter last name"
//                 />
//               </Col>
//             </Row>
//             <Row style={{ marginTop: "0.5rem" }} gutter={16}>
//               <Col
//                 span={10}
//                 style={{ display: "flex", justifyContent: "flex-end" }}
//                 className="gutter-row"
//               >
//                 <p
//                   style={{
//                     color: "#4f4f4f",
//                     fontSize: "13px",
//                     fontWeight: "700",
//                   }}
//                 >
//                   Password Confimation
//                 </p>
//               </Col>
//               <Col span={14}>
//                 <Input.Password
//                   style={{ width: "50%" }}
//                   placeholder="Enter email"
//                 />
//               </Col>
//             </Row>
//             <Row style={{ marginTop: "0.5rem" }} gutter={16}>
//               <Col
//                 span={10}
//                 style={{ display: "flex", justifyContent: "flex-end" }}
//                 className="gutter-row"
//               ></Col>
//               <Col span={14}>
//                 <Button type="primary">Save</Button>
//               </Col>
//             </Row>
//           </form>
//         </Col>
//       </Row>
//     </div>
//   );
// };
// export default UserInfo;
