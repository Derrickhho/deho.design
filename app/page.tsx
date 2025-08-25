import FinderPortfolio from "../finder-portfolio"

// Example of how to customize colors
const customTheme = {
  background: "#1a1a1a",
  windowBackground: "#2d2d2d",
  windowBorder: "#404040",
  headerText: "#ffffff",
  folderButton: {
    selected: {
      background: "#007acc",
      text: "#ffffff",
    },
  },
  content: {
    background: "#2d2d2d",
    titleText: "#ffffff",
    bodyText: "#e0e0e0",
    mutedText: "#888888",
  },
}

export default function Page() {
  // Use default theme
  return <FinderPortfolio />

  // Or use custom theme
  // return <FinderPortfolio theme={customTheme} />
}
