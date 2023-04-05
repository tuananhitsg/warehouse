// import React, { useState } from "react";
// import {
//   Breadcrumb,
//   Layout,
//   Menu,
//   theme,
//   Avatar,
//   Dropdown,
//   Button,
//   Space,
//   Typography,
//   Modal,
// } from "antd";
// import {
//   LoginOutlined,
//   LogoutOutlined,
//   BarChartOutlined,
//   UserOutlined,
//   HomeOutlined,
//   TagsOutlined,
//   ShoppingCartOutlined,
//   InboxOutlined,
//   DashboardOutlined,
//   SettingOutlined,
//   ProfileOutlined,
//   ContainerOutlined,
// } from "@ant-design/icons";

// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import authService from "../service/auth.service";
// import { setUser } from "../redux/userSlice";
// const { Text } = Typography;

// const Header = () => {
//     const {
//         token: { colorBgContainer },
//       } = theme.useToken();
//   return (
//     <div
//       style={{
//         padding: 0,
//         background: colorBgContainer,
//       }}
//     >
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           height: "100%",
//           padding: "0 1rem",
//         }}
//       >
//         <div></div>
//         <div style={{ display: "flex", alignItems: "center" }}>
//           <Dropdown
//             overlay={
//               <>
//                 <Menu onClick={onClickMenuUser}>
//                   <Menu.Item
//                     key="info"
//                     style={{
//                       padding: " 12px 12px",
//                     }}
//                   >
//                     {" "}
//                     <div onClick={() => handleUserInfo()}>
//                       <ProfileOutlined />
//                       <Text style={{ marginLeft: "12px" }}>Thông tin</Text>
//                     </div>
//                     <div>
//                       <Text
//                       // style={{
//                       //   marginLeft: "12px",
//                       // }}
//                       ></Text>
//                     </div>
//                   </Menu.Item>
//                   <Menu.Item
//                     key="logout"
//                     style={{
//                       padding: " 12px 12px",
//                     }}
//                   >
//                     <div onClick={() => showModal()}>
//                       <LogoutOutlined />
//                       <Text
//                         style={{
//                           marginLeft: "12px",
//                         }}
//                       >
//                         Đăng xuất
//                       </Text>
//                     </div>
//                   </Menu.Item>
//                 </Menu>
//               </>
//             }
//             trigger={["click"]}
//           >
//             <div
//               className="avt_group"
//               onClick={(e) => e.preventDefault()}
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 //marginLeft: "0.5rem",
//                 justifyContent: "space-between",
//               }}
//             >
//               <Avatar
//                 style={{
//                   color: "#f56a00",
//                   backgroundColor: "#fde3cf",

//                   width: "35px",
//                   height: "35px",
//                   marginRight: "6px",
//                 }}
//               >
//                 {/* {user?.lastName[0]} */}A
//               </Avatar>
//               <div style={{ display: "flex", flexDirection: "column" }}>
//                 <Text style={{ fontWeight: "500", color: "#333" }}>
//                   {user?.fullName}
//                 </Text>
//                 <Text
//                   style={{
//                     fontSize: "12px",
//                     fontWeight: "400",
//                     color: "#abb4bc",
//                   }}
//                 >
//                   {user?.roles}
//                 </Text>
//               </div>
//             </div>
//           </Dropdown>
//         </div>
//       </div>
//     </div>
//   );
// };
