import FinderPortfolio from "../finder-portfolio"

// Example of how to customize colors
const customTheme = {
  background: "#0a0a0a",
  windowBackground: "#262626",
  windowBorder: "#404040",
  headerText: "#ffffff",
  folderButton: {
    selected: {
      background: "#007acc",
      text: "#ffffff",
    },
  },
  content: {
    background: "#262626",
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
