import type { FileSystemItem } from "../types/content"
import { FolderLottieIcon, FileLottieIcon, UserLottieIcon, MailLottieIcon } from "../components/lottie-icons"

// Example of how to use Lottie icons in your portfolio content
export const portfolioContentWithLottie: FileSystemItem[] = [
  {
    id: "info",
    name: "Info",
    type: "folder",
    icon: <FolderLottieIcon size={14} />,
    selectedIcon: <FolderLottieIcon size={14} />, // You could use a different animation for selected state
    children: [
      {
        id: "about-me",
        name: "About me",
        type: "file",
        icon: <UserLottieIcon size={14} />,
        content: {
          title: "It's me!",
          sections: [
            {
              type: "paragraph",
              content: "deho is short for Derrick Ho - it was the first employee username I ever received. Some things that are sacred to me (in no particular order): Wordle, Chinatown, Kelly's cove, your attention, Secret Santa, and Tom Petty."
            },
            {
              type: "section", 
              title: "Previously, I have:",
              items: [
                { content: "Designed at Watershed", details: "2023 - 2025" },
                { content: "Designed at Common Room", details: "2021 - 2023" },
                { content: "Designed at Robinhood", details: "2020 - 2021" },
                { content: "Designed at Dropbox", details: "2018 - 2020" },
                { content: "Served ice cream at Coldstone", details: "2010-2013" }
              ]
            }
          ]
        }
      },
      {
        id: "contact-me",
        name: "Contact me",
        type: "file",
        icon: <MailLottieIcon size={14} />,
        content: {
          title: "Contact me",
          sections: [
            {
              type: "section",
              title: "For all contact, socials, and whatnot:",
              items: [
                { content: "Email", details: "derrickhho@gmail.com" },
                { content: "LinkedIn", details: "/in/derrickho" },
                { content: "Twitter", details: "@derrickhho" }
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
    icon: <FolderLottieIcon size={14} />,
    selectedIcon: <FolderLottieIcon size={14} />,
    children: [
      {
        id: "watershed",
        name: "Watershed",
        type: "file",
        icon: <FileLottieIcon size={14} />,
        content: {
          title: "Watershed",
          layout: "thumbnail",
          thumbnail: {
            image: "/dropbox.png",
            dateRange: "2023 - 2025",
            description: "Did some things to reduce our world's carbon emissions. Learned a lot about science, regulation, and AI - oh my."
          }
        }
      }
      // ... other work items
    ]
  },
  {
    id: "fun",
    name: "Fun",
    type: "folder",
    icon: <FolderLottieIcon size={14} />,
    selectedIcon: <FolderLottieIcon size={14} />,
    children: [
      {
        id: "doodles",
        name: "Doodles",
        type: "file",
        icon: <FileLottieIcon size={14} />,
        content: {
          title: "Doodles",
          layout: "thumbnail",
          thumbnail: {
            image: "/placeholder.jpg",
            dateRange: "Ongoing",
            description: "A collection of my random sketches and doodles. Sometimes they make sense, sometimes they don't. That's the beauty of it."
          }
        }
      },
      {
        id: "cantonese-taboo",
        name: "Cantonese taboo",
        type: "file",
        icon: <FileLottieIcon size={14} />,
        content: {
          title: "Cantonese taboo",
          layout: "thumbnail",
          thumbnail: {
            image: "/placeholder.jpg",
            dateRange: "Ongoing",
            description: "Exploring the fascinating world of Cantonese language taboos and cultural nuances. From food-related superstitions to number symbolism, there's always something interesting to learn about Cantonese culture."
          }
        }
      }
    ]
  }
]
