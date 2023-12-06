import { createTheme } from "@mui/material/styles";
import { colors } from "@mui/material";

//提供了兩個主題模式
export const themeModes = {
  dark: "dark",
  light: "light",
};

const themeConfig = {
  //根據傳入的 mode 參數返回相應的主題配置。
  custom: ({ mode }) => {
    const customPalette =
      mode === themeModes.dark
        ? {
            primary: {
              main: "#ff0000",
              contrastText: "#fffff",
            },
            secondary: {
              main: "#f44336",
              contrastText: "#fffff",
            },
            background: {
              default: "#00000",
              paper: "#131313",
            },
          }
        : {
            primary: {
              main: "#ff0000",
            },
            secondary: {
              main: "#f44336",
            },
            background: {
              default: colors.grey["100"],
            },
          };
    //使用 createTheme 函式建立主題
    return createTheme({
      //指定主題的模式和自定義調色板。
      palette: {
        mode,
        ...customPalette,
      },
      components: {
        MuiButton: {
          defaultProps: { disableElevation: true }, //這表示按鈕的海拔效果被禁用。
        },
      },
    });
  },
};

export default themeConfig;
