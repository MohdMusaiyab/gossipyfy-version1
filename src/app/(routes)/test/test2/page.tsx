  // pages/deepSpacePage.js
  const DeepSpacePage = () => {
    return (
      <div className="min-h-screen flex flex-col"
        style={{
          background: 'linear-gradient(135deg, #090919, #161837)',
          color: '#fff'
        }}>
        <header className="w-full px-8 py-6">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-4xl font-bold text-purple-400">Nebula</h1>
            <nav className="flex gap-8">
              {['Home', 'Features', 'About', 'Contact'].map((item) => (
                <a key={item} href="#" 
                   className="text-lg text-purple-200/80 hover:text-purple-400 transition-colors">
                  {item}
                </a>
              ))}
            </nav>
          </div>
        </header>
  
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="max-w-3xl text-center space-y-8">
            <h2 className="text-6xl font-bold">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400">
                Explore The Unknown
              </span>
            </h2>
            <p className="text-xl text-purple-200/80">
              Journey through digital galaxies of innovation.
              Your next breakthrough awaits.
            </p>
            <button className="group px-10 py-4 rounded-full relative overflow-hidden">
              <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-600 transition-all"></span>
              <span className="relative text-white font-semibold">Launch Project</span>
            </button>
          </div>
        </main>
      </div>
    );
  };
  
  // pages/midnightOceanPage.js
  const MidnightOceanPage = () => {
    return (
      <div className="min-h-screen flex flex-col"
        style={{
          background: 'linear-gradient(to bottom, #0a192f, #112240)',
          color: '#fff'
        }}>
        <header className="w-full px-8 py-6 bg-gradient-to-b from-black/20 to-transparent">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-4xl font-bold text-sky-400">DeepBlue</h1>
            <nav className="flex gap-8">
              {['Home', 'Solutions', 'Team', 'Contact'].map((item) => (
                <a key={item} href="#" 
                   className="text-lg text-sky-200/80 hover:text-sky-400 transition-colors">
                  {item}
                </a>
              ))}
            </nav>
          </div>
        </header>
  
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="max-w-3xl text-center space-y-8">
            <h2 className="text-6xl font-bold text-white">
              Dive Into
              <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-blue-500">
                Digital Depths
              </span>
            </h2>
            <p className="text-xl text-sky-200/80">
              Navigate the vast ocean of possibilities.
              Let innovation guide your journey.
            </p>
            <div className="flex gap-6 justify-center">
              <button className="px-8 py-4 rounded-lg border border-sky-400/50 hover:bg-sky-400/10 text-sky-400 font-semibold transition-all">
                Learn More
              </button>
              <button className="px-8 py-4 rounded-lg bg-sky-500 hover:bg-sky-600 text-white font-semibold transition-all">
                Get Started
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  };
  
export default DeepSpacePage;