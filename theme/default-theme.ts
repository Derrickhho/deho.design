import type { FinderTheme } from "../types/theme"

export const lightTheme: FinderTheme = {
  background: "#f2f2f2",
  windowBackground: "#ffffff",
  windowBorder: "#EDEDED",
  headerText: "#828282",
  typography: {
    h1: {
      fontSize: "24px",
      fontWeight: "400",
      lineHeight: "1.2",
    },
    h2: {
      fontSize: "18px",
      fontWeight: "400",
      lineHeight: "1.3",
    },
    h3: {
      fontSize: "12px",
      fontWeight: "500",
      lineHeight: "2",
    },
    body: {
      fontSize: "12px",
      fontWeight: "300",
      lineHeight: "1.65",
    },
    bodySmall: {
      fontSize: "12px",
      fontWeight: "400",
      lineHeight: "1.4",
    },
    caption: {
      fontSize: "12px",
      fontWeight: "400",
      lineHeight: "1.3",
    },
    button: {
      fontSize: "12px",
      fontWeight: "300",
      lineHeight: "1.2",
    },
  },
  folderButton: {
    default: {
      background: "transparent",
      text: "#202020",
      hover: "#EDEDED",
      active: "#D1D1D1",
    },
    selected: {
      background: "#2D75E0",
      text: "#ffffff",
    },
    selectedDesktop: {
      background: "#EDEDED",
      text: "#202020",
    },
    fileSelected: {
      background: "#EDEDED",
      text: "#202020",
    },
  },
  fileButton: {
    default: {
      background: "transparent",
      text: "#202020",
      hover: "#EDEDED",
      active: "#D1D1D1",
    },
    selected: {
      background: "#2D75E0",
      text: "#ffffff",
    },
  },
  column: {
    background: "#ffffff",
    border: "#EDEDED",
  },
  content: {
    background: "#ffffff",
    titleText: "#202020",
    bodyText: "#202020",
    mutedText: "#828282",
  },
}

export const darkTheme: FinderTheme = {
  background: "#1a1a1a",
  windowBackground: "#2d2d2d",
  windowBorder: "#404040",
  headerText: "#a0a0a0",
  typography: {
    h1: {
      fontSize: "24px",
      fontWeight: "400",
      lineHeight: "1.2",
    },
    h2: {
      fontSize: "18px",
      fontWeight: "400",
      lineHeight: "1.3",
    },
    h3: {
      fontSize: "12px",
      fontWeight: "500",
      lineHeight: "2",
    },
    body: {
      fontSize: "12px",
      fontWeight: "300",
      lineHeight: "1.65",
    },
    bodySmall: {
      fontSize: "12px",
      fontWeight: "400",
      lineHeight: "1.4",
    },
    caption: {
      fontSize: "12px",
      fontWeight: "400",
      lineHeight: "1.3",
    },
    button: {
      fontSize: "12px",
      fontWeight: "300",
      lineHeight: "1.2",
    },
  },
  folderButton: {
    default: {
      background: "transparent",
      text: "#e0e0e0",
      hover: "#404040",
      active: "#505050",
    },
    selected: {
      background: "#007acc",
      text: "#ffffff",
    },
    selectedDesktop: {
      background: "#404040",
      text: "#e0e0e0",
    },
    fileSelected: {
      background: "#404040",
      text: "#e0e0e0",
    },
  },
  fileButton: {
    default: {
      background: "transparent",
      text: "#e0e0e0",
      hover: "#404040",
      active: "#505050",
    },
    selected: {
      background: "#007acc",
      text: "#ffffff",
    },
  },
  column: {
    background: "#2d2d2d",
    border: "#404040",
  },
  content: {
    background: "#2d2d2d",
    titleText: "#ffffff",
    bodyText: "#e0e0e0",
    mutedText: "#a0a0a0",
  },
}

// Default theme (dark)
export const defaultTheme = darkTheme
