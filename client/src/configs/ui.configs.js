const uiConfigs = {
  style: {
    //定義了兩種主題模式下的漸層背景圖片樣式。
    gradientBgImage: {
      dark: {
        backgroundImage:
          "Linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0))",
      },
      light: {
        backgroundImage:
          "Linear-gradient(to top, rgba(245,245,245,1), rgba(0,0,0,0))",
      },
    },
    //定義了兩種主題模式下水平方向的漸層。
    horizontalGradientBgImage: {
      dark: {
        backgroundImage:
          "Linear-gradient(to right, rgba(0,0,0,1), rgba(0,0,0,0))",
      },
      light: {
        backgroundImage:
          "Linear-gradient(to right, rgba(245,245,245,1), rgba(0,0,0,0))",
      },
    },
    //根據傳入的行數和文本對齊方式，返回相應的樣式，通常用於實現多行文本的截斷顯示。
    typoLines: (lines, textAlign) => ({
      textAlign: textAlign || "justify",
      display: "-webkit-box",
      overflow: "hidden",
      WebkitBoxOrient: "vertical",
      WebkitLineClamp: lines,
    }),
    //定義了主要內容區域的樣式
    mainContent: {
      maxWidth: "1366px",
      margin: "auto",
      padding: 2,
    },
    //接受一個圖片路徑，返回一個包含背景圖片樣式的物件。
    backgroundImage: (imgPath) => ({
      position: "relative",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundColor: "darkgrey",
      backgroundImage: `url(${imgPath})`,
    }),
  },
  //定義了側邊欄的寬度及內容區域的最大寬度
  size: {
    sidebarWidth: "300px",
    contentMaxWidth: "1366px",
  },
};

export default uiConfigs;
