import type { FileSystemItem } from "../types/content"
import { 
  FolderLottieIcon, 
  UserLottieIcon, 
  ContactLottieIcon, 
  DesignLottieIcon, 
  PictureLottieIcon, 
  TranslationLottieIcon,
  MailLottieIcon,
  FileLottieIcon
} from "../components/central-icons"



export const portfolioContent: FileSystemItem[] = [
  {
    id: "info",
    name: "Info",
    type: "folder",
    icon: <FolderLottieIcon size={16} />,
    selectedIcon: <FolderLottieIcon size={16} />,
    children: [
      {
        id: "about-me",
        name: "About me",
        type: "file",
        icon: <UserLottieIcon size={16} />,
        content: {
          title: "It's me!",
          blocks: [
            {
              type: "paragraph",
              content: "Currently designing at [Harvey](https://harvey.ai) in San Francisco. Previously learned about climate at [Watershed](https://watershed.com), launched from stealth at [Common Room](https://commonroom.io), shipped through GME and IPO at [Robinhood](https://robinhood.com), and designed Dropbox Paper and Sharing at [Dropbox](https://dropbox.com)."
            },
            {
              type: "list", 
              title: "Timeline:",
              items: [
                { content: "Watershed", details: "2023 - 2025" },
                { content: "Common Room", details: "2021 - 2023" },
                { content: "Robinhood", details: "2020 - 2021" },
                { content: "Dropbox", details: "2018 - 2020" },
              ]
            }
          ]
        }
      },
      {
        id: "contact-me",
        name: "Contact me",
        type: "file",
        icon: <ContactLottieIcon size={16} />,
        content: {
          title: "Contact me",
          blocks: [
            {
              type: "list",
              title: "Reach me via:",
              items: [
                { content: "Email", details: "derrickhho@gmail.com", url: "mailto:derrickhho@gmail.com" },
                { content: "LinkedIn", details: "/in/derrickhho", url: "https://linkedin.com/in/derrickhho" },
                { content: "Twitter", details: "@derrickhho", url: "https://x.com/derrickhho" }
              ]
            }
          ]
        }
      }
    ]
  },
  {
    id: "work",
    name: "Work",
    type: "folder",
    icon: <FolderLottieIcon size={16} />,
    selectedIcon: <FolderLottieIcon size={16} />,
    children: [
      {
        id: "harvey",
        name: "Harvey",
        type: "file",
        icon: <DesignLottieIcon size={16} />,
        content: {
          title: "Harvey",
          blocks: [
            {
              type: "thumbnail",
              dateRange: "2026 - Present",
              description: "Building the Agent experience and learning a lot about the law"
            }
          ]
        }
      },
      {
        id: "watershed",
        name: "Watershed",
        type: "file",
        icon: <DesignLottieIcon size={16} />,
        content: {
          title: "Watershed",
          blocks: [
            {
              type: "thumbnail",
              dateRange: "2023 - 2025",
              description: "Did some things to reduce our world's carbon emissions. Learned a lot about science, regulation, and AI - oh my."
            }
          ]
        }
      },
      {
        id: "common-room",
        name: "Common Room",
        type: "file",
        icon: <DesignLottieIcon size={16} />,
        content: {
          title: "Common Room",
          blocks: [
            {
              type: "thumbnail",
              dateRange: "2021 - 2023",
              description: "Worked on a little bit of everything. Launched a product from zero to GA and learned a lot about B2B and the art of customer obsession."
            }
          ]
        }
      },
      {
        id: "robinhood",
        name: "Robinhood",
        type: "file",
        icon: <DesignLottieIcon size={16} />,
        content: {
          title: "Robinhood",
          blocks: [
            {
              type: "thumbnail",
              dateRange: "2020 - 2021",
              description: "Worked on the onboarding experience. This was critical (and extremely fun) in shipping through GameStop and an IPO."
            }
          ]
        }
      },
      {
        id: "dropbox",
        name: "Dropbox",
        type: "file",
        icon: <DesignLottieIcon size={16} />,
        content: {
          title: "Dropbox",
          blocks: [
            {
              type: "thumbnail",
              dateRange: "2018 - 2020",
              description: "Worked on The-Sharing-Experience™ and Dropbox Paper :'). Learned a lot and made a lot of lifelong friends."
            }
          ]
        }
      }
    ]
  },
  {
    id: "fun",
    name: "Fun",
    type: "folder",
    icon: <FolderLottieIcon size={16} />,
    selectedIcon: <FolderLottieIcon size={16} />,
    children: [
      {
        id: "doodles",
        name: "Doodles",
        type: "file",
        icon: <PictureLottieIcon size={16} />,
        content: {
          title: "Doodles",
          blocks: [
            {
              type: "thumbnail",
              image: "/doodles.png",
              description: "Sometimes I like to draw."
            },
            {
              type: "list",
              items: [
                { content: "Store", details: "derrickdoodles.com", url: "https://derrickdoodles.com" },
                { content: "Instagram", details: "instagram.com/derrick.doodles", url: "https://instagram.com/derrick.doodles" }
              ]
            }
          ]
        }
      },
      {
        id: "cantonese-taboo",
        name: "Cantonese taboo",
        type: "file",
        icon: <TranslationLottieIcon size={16} />,
        content: {
          title: "Cantonese taboo",
          blocks: [
            {
              type: "thumbnail",
              image: "/taboo.png",
              description: "Dabbled in print and made this game for learning cantonese."
            },
            {
              type: "list",
              items: [
                { content: "Abacus Row", details: "abacusrow.com", url: "https://www.abacusrow.com/products/derrick-ho-game-card-aiya" },
                { content: "On Waverly", details: "onwaverly.com", url: "https://www.onwaverly.com/products/aiya-card-game?srsltid=AfmBOoridaGZRfnfJ7DTnBGXyi2o6VJ3VH7TM18CMMBtk8WNz1zSkDkA" }
              ]
            }
          ]
        }
      }
    ]
  }
]

// Helper function to get content by ID
export function getContentById(id: string): FileSystemItem | undefined {
  function search(items: FileSystemItem[]): FileSystemItem | undefined {
    for (const item of items) {
      if (item.id === id) return item
      if (item.children) {
        const found = search(item.children)
        if (found) return found
      }
    }
    return undefined
  }
  return search(portfolioContent)
}

// Helper function to get folder by ID
export function getFolderById(id: string): FileSystemItem | undefined {
  const item = getContentById(id)
  return item?.type === "folder" ? item : undefined
}

// Helper function to get file by ID
export function getFileById(id: string): FileSystemItem | undefined {
  const item = getContentById(id)
  return item?.type === "file" ? item : undefined
}
