export interface TypographyStyle {
  fontSize: string
  fontWeight: string
  lineHeight: string
  letterSpacing?: string
}

export interface FinderTypography {
  h1: TypographyStyle
  h2: TypographyStyle
  h3: TypographyStyle
  body: TypographyStyle
  bodySmall: TypographyStyle
  caption: TypographyStyle
  button: TypographyStyle
}

export interface FinderTheme {
  background: string
  windowBackground: string
  windowBorder: string
  headerText: string
  typography: FinderTypography
  folderButton: {
    default: {
      background: string
      text: string
      hover: string
      active: string
    }
    selected: {
      background: string
      text: string
    }
    selectedDesktop: {
      background: string
      text: string
    }
    fileSelected: {
      background: string
      text: string
    }
  }
  fileButton: {
    default: {
      background: string
      text: string
      hover: string
      active: string
    }
    selected: {
      background: string
      text: string
    }
  }
  column: {
    background: string
    border: string
  }
  content: {
    background: string
    titleText: string
    bodyText: string
    mutedText: string
  }
}
