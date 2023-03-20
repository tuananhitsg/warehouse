// import React, { useEffect, useState } from "react";
// import {
//   Button,
//   Col,
//   Drawer,
//   Form,
//   Input,
//   message,
//   Row,
//   Select,
//   Space,
// } from "antd";

// import employeeApi from "../../../api/employeeApi";
// import { setReload } from "../../../redux/reloadSlice";
// import { useDispatch, useSelector } from "react-redux";

// const ModalAddEmployee = ({
//   showModalAddEmployee,
//   setShowModalAddEmployee,
// }) => {
//   const dispatch = useDispatch();
//   const reload = useSelector((state) => state.reloadReducer.reload);
//   const [form] = Form.useForm();
//   // const [isLoading, setIsLoading] = useState(false);

//   const onClose = () => {
//     setShowModalAddEmployee(false);
//   };

//   const handleSubmit = async (params) => {
//     console.log("submit", params);
//     console.log("reload", reload);
//     const { description, name } = params;
//     console.log("name", name);

//     const data = new FormData();
//     data.append("description", description ? description : "");
//     data.append("name", name ? name : "");

//     try {
//       const res = await categoryApi.addCategory(data);
//       console.log(res);
//       if (res) {
//         onClose();
//         dispatch(setReload(!reload));
//         form.resetFields();
//         setTimeout(() => {
//           message.success("Thêm loại sản phẩm thành công!");
//         }, 500);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <>
//       <Drawer
//         title="Thông tin loại sản phẩm"
//         width={720}
//         onClose={onClose}
//         open={showModalAddEmployee}
//         bodyStyle={{
//           paddingBottom: 80,
//         }}
//         extra={
//           <Space>
//             <Button onClick={onClose}>Huỷ</Button>
//             <Button form="myForm" htmlType="submit" type="primary">
//               Xác nhận
//             </Button>
//           </Space>
//         }
//       >
//         <Form form={form} onFinish={handleSubmit} id="myForm" layout="vertical">
//           <Row gutter={16}>
//             <Col span={12}>
//               <Form.Item name="name" label="Tên sản phẩm">
//                 <Input />
//               </Form.Item>
//             </Col>
//             <Col span={12}></Col>
//           </Row>
//           <Row gutter={16}>
//             <Col span={24}>
//               <Form.Item name="description" label="Mô tả">
//                 <Input.TextArea rows={4} placeholder="Nhập mô tả..." />
//               </Form.Item>
//             </Col>
//           </Row>
//         </Form>
//       </Drawer>
//     </>
//   );
// };
// export default ModalAddEmployee;
