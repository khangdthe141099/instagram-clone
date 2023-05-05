export const OPTION_KEY = {
  QR_CODE: "qrcode",
  LOGOUT: "logout",
  CANCEL: "cancel",
};

export const COLOR = {
  ORANGE: "rgb(253, 141, 50)",
  PURPLE: "purple",
  BLUE: "rgb(84, 215, 255)",
  GREEN: "rgb(112, 192, 80)",
};

export const options = [
  {
    id: 1,
    key: OPTION_KEY.QR_CODE,
    name: "QR Code",
  },
  {
    id: 2,
    key: OPTION_KEY.LOGOUT,
    name: "Log Out",
  },
  {
    id: 3,
    key: OPTION_KEY.CANCEL,
    name: "Cancel",
  },
];

export const listColor = [
  {
    id: 1,
    name: "orange",
    class: "color-item--orange",
    color: COLOR.ORANGE,
  },
  {
    id: 2,
    name: "purple",
    class: "color-item--purple",
    color: COLOR.PURPLE,
  },
  {
    id: 3,
    name: "blue",
    class: "color-item--blue",
    color: COLOR.BLUE,
  },
  {
    id: 4,
    name: "green",
    class: "color-item--green",
    color: COLOR.GREEN,
  },
];
