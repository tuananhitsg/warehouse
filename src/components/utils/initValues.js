import * as Yup from "yup";

export const loginValues = {
  initial: {
    email: "",
    password: "",
  },
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email("Email không hợp lệ.")
      .required("Email không được bỏ trống."),
    // .email('Email không hợp lệ'),
    password: Yup.string()
      .min(8, "Mật khẩu tối thiểu 8 kí tự")
      .required("Mật khẩu không được bỏ trống.")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/,
        "Ít nhất 1 chữ viết hoa, 1 chữ viết thường, 1 số và 1 ký tự đặc biệt."
      ),
  }),
};

export const forgotValues = {
  initial: {
    email: "",
  },

  validationSchemaUser: Yup.object().shape({
    email: Yup.string()
      .email("Email không hợp lệ.")
      .required("Email không được bỏ trống."),
  }),
};

export const createEmployeeValues = {
  initial: {
    fullName: "",
    email: "",
    role: "",
    password: "",
    passwordconfirm: "",
    sex: "",
  },

  validationSchema: Yup.object().shape({
    fullName: Yup.string().required("Tên không được bỏ trống."),
    email: Yup.string()
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Email không hợp lệ.")
      .required("Email không được bỏ trống."),
    password: Yup.string()
      .min(8, "Mật khẩu tối thiểu 8 kí tự")
      .required("Mật khẩu không được bỏ trống.")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/,
        "Chứa ít nhất 1 chữ viết hoa, 1 chữ viết thường, 1 số và 1 ký tự đặc biệt."
      ),
    passwordconfirm: Yup.string()
      .oneOf([Yup.ref("password"), null], "Mật khẩu không khớp.")
      .required("Mật khẩu không được bỏ trống."),

    role: Yup.string().required("Vui lòng chọn chức vụ."),
    sex: Yup.string()
      .oneOf(["Nam", "Nữ"], "Vui lòng chọn Nam hoặc Nữ.")
      .required("Vui lòng chọn giới tính."),
  }),
};
export const createPartnerValues = {
  initial: {
    name: "",
    phone: "",
    province: "",
    district: "",
    ward: "",
    street: "",
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required("Tên không được bỏ trống."),
    phone: Yup.string()
      .required("Số điện thoại không được bỏ trống")
      .matches(/(09|03|07|08|05])+([0-9]{8})\b/, "Số điện thoại không hợp lệ"),
    province: Yup.string().required("Chưa chọn tỉnh/thành."),
    district: Yup.string().required("Chưa chọn quận/huyện."),
    ward: Yup.string().required("Chưa chọn phường/xã."),
    street: Yup.string().required("Vui lòng nhập địa chỉ."),
  }),
};
export const createCategoryValues = {
  initial: {
    name: "",
    description: "",
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required("Tên không được bỏ trống."),
    description: Yup.string().required("Mô tả không được bỏ trống."),
  }),
};
export const createWarehouseValues = {
  initial: {
    name: "",
    width: "",
    height: "",
    length: "",
    widthShelf: "",
    heightShelf: "",
    lengthShelf: "",
    numberOfFloor: "",
    lengthOfColumn: "",
    province: "",
    district: "",
    ward: "",
    address: "",
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required("Tên không được bỏ trống."),
    width: Yup.number().required("Chiều rộng không được bỏ trống."),
    height: Yup.number().required("Chiều cao không được bỏ trống."),
    length: Yup.number().required("Chiều dài không được bỏ trống."),
    widthShelf: Yup.number().required("Chiều rộng không được bỏ trống."),
    heightShelf: Yup.number().required("Chiều cao không được bỏ trống."),
    lengthShelf: Yup.number().required("Chiều dài không được bỏ trống."),
    numberOfFloor: Yup.number().required("Số tầng không được bỏ trống."),
    lengthOfColumn: Yup.number().required("Chiều dài cột không được bỏ trống."),
    province: Yup.string().required("Chưa chọn tỉnh/thành."),
    district: Yup.string().required("Chưa chọn quận/huyện."),
    ward: Yup.string().required("Chưa chọn phường/xã."),
    address: Yup.string().required("Vui lòng nhập địa chỉ."),
  }),
};
export const selectBin = {
  initial: {
    quantity: "",
    codeWarehouse: "",
  },
  validationSchema: Yup.object().shape({
    quantity: Yup.number().required("Chưa nhập số lượng."),
    codeWarehouse: Yup.string().required("Chưa chọn kho."),
  }),
};
