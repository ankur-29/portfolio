import Preloader from "@/components/ui/Preloader";
import BackgroundCanvas from "@/components/three/BackgroundCanvas";

export const unstable_instant = false;

export default function HomePage() {
  return (
    <>
      {/* 1. Page Preloader Overlay */}
      <Preloader />

      {/* 2. Global 3D Background Canvas */}
      <BackgroundCanvas />

      {/* 3. Transparent Scrollable Section Overlays */}
      <div className="relative z-10 flex flex-col min-h-screen bg-transparent select-none">
        
        {/* Home / Hero Section */}
        <section
          id="home"
          className="min-h-screen flex flex-col items-center justify-center text-center p-8 relative"
        >
          <div className="flex flex-col gap-4 max-w-xl">
            <span className="text-xs font-mono tracking-widest text-primary uppercase">Phase 1 Setup</span>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-tight">
              Ankur Anand
            </h1>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
              Senior Full Stack MERN Developer. Scroll down to test the 3D camera movements and scroll-dependent cosmic particle drift.
            </p>
            <div className="w-5 h-8 border-2 border-zinc-700 rounded-full flex justify-center p-1 mx-auto mt-6">
              <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" />
            </div>
          </div>
        </section>

        {/* About Section */}
        <section
          id="about"
          className="min-h-screen flex flex-col items-center justify-center text-center p-8 border-t border-zinc-900/10"
        >
          <div className="max-w-xl">
            <span className="text-xs font-mono tracking-widest text-primary uppercase">About</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mt-2">Digital Identity</h2>
            <p className="text-zinc-400 text-sm mt-3">
              Observe how the camera pans slightly to the left and shifts angle to align with the profile card focus.
            </p>
          </div>
        </section>

        {/* Experience Section */}
        <section
          id="experience"
          className="min-h-screen flex flex-col items-center justify-center text-center p-8 border-t border-zinc-900/10"
        >
          <div className="max-w-xl">
            <span className="text-xs font-mono tracking-widest text-primary uppercase">Experience</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mt-2">Career Timeline</h2>
            <p className="text-zinc-400 text-sm mt-3">
              The background camera shifts to the right and angles downward, preparing to show Git workflow branches.
            </p>
          </div>
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          className="min-h-screen flex flex-col items-center justify-center text-center p-8 border-t border-zinc-900/10"
        >
          <div className="max-w-xl">
            <span className="text-xs font-mono tracking-widest text-primary uppercase">Works</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mt-2">Selected Projects</h2>
            <p className="text-zinc-400 text-sm mt-3">
              Camera orbits back towards the bottom-left view, focusing on product metrics and catalogs.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="min-h-screen flex flex-col items-center justify-center text-center p-8 border-t border-zinc-900/10"
        >
          <div className="max-w-xl">
            <span className="text-xs font-mono tracking-widest text-primary uppercase">Contact</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mt-2">Let&apos;s Collaborate</h2>
            <p className="text-zinc-400 text-sm mt-3">
              Camera centers itself and tilts upward, bringing the terminal window into high visual focus.
            </p>
          </div>
        </section>

      </div>
    </>
  );
}