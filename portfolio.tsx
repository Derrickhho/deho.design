import { Folder, User, Mail } from "lucide-react"

export default function Component() {
  return (
    <div className="min-h-screen bg-[#f2f2f2] p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-[#828282] text-2xl font-normal">deho.design</h1>
        </header>

        {/* Main Layout */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <div className="col-span-2">
            <nav className="space-y-2">
              <div className="flex items-center gap-2 p-2 text-[#828282] hover:bg-[#ededed] rounded">
                <Folder className="w-4 h-4" />
                <span className="text-sm">Info</span>
              </div>
              <div className="flex items-center gap-2 p-2 text-[#828282] hover:bg-[#ededed] rounded">
                <Folder className="w-4 h-4" />
                <span className="text-sm">Work</span>
              </div>
              <div className="flex items-center gap-2 p-2 text-[#828282] hover:bg-[#ededed] rounded">
                <Folder className="w-4 h-4" />
                <span className="text-sm">Fun</span>
              </div>
            </nav>
          </div>

          {/* Center Sidebar */}
          <div className="col-span-3">
            <div className="space-y-2">
              <div className="bg-[#656565] text-white p-3 rounded flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="text-sm">About me</span>
              </div>
              <div className="flex items-center gap-2 p-3 text-[#828282] hover:bg-[#ededed] rounded">
                <Mail className="w-4 h-4" />
                <span className="text-sm">Contact me</span>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-7">
            <div className="bg-white p-8 rounded-lg">
              <h2 className="text-[#202020] text-xl font-medium mb-6">{"It's me!"}</h2>

              <div className="space-y-6 text-[#202020] text-sm leading-relaxed">
                <p>
                  deho is short for Derrick Ho - it was the first employee username I ever received. Some things that
                  are sacred to me (in no particular order): Wordle, Chinatown,
                  {"Kelly's Cove"}, your attention, Secret Santa, and Tom Petty.
                </p>

                <div className="space-y-4">
                  <div>
                    <p className="font-medium mb-2">Currently, I am:</p>
                    <div className="flex justify-between">
                      <span>N/A</span>
                      <span className="text-[#828282]">Taking a break</span>
                    </div>
                  </div>

                  <div>
                    <p className="font-medium mb-3">Previously, I have:</p>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Designed at Watershed</span>
                        <span className="text-[#828282]">2023 - 2025</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Designed at Common Room</span>
                        <span className="text-[#828282]">2021 - 2023</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Designed at Robinhood</span>
                        <span className="text-[#828282]">2020 - 2021</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Designed at Dropbox</span>
                        <span className="text-[#828282]">2018 - 2020</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Serviced ice cream at Coldstone</span>
                        <span className="text-[#828282]">2010-2013</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
