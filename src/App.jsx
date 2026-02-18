import React, { useState, useEffect } from 'react';
import SpotlightCard from './components/SpotlightCard';
import { resumeData } from './data';
import './App.css'; // Ensure your CSS with the twinkle animation is imported here
import { Github, Linkedin, Mail, ExternalLink, MapPin, Phone, FileText, Youtube } from 'lucide-react';

// --- Helper Component for the Twinkling Stars ---
const Sparkle = ({ className, delay }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    // We use the tailwind classes and the custom CSS animation classes here
    className={`absolute text-cyan-200/70 animate-twinkle ${delay} ${className}`}
  >
    {/* A simple 4-pointed star shape */}
    <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" fill="currentColor" />
  </svg>
);
// --- COMPONENT: Full Screen Star Background ---
const StarBackground = () => {
  // Create an array of 50 stars
  const stars = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() > 0.5 ? 'w-1 h-1' : 'w-0.5 h-0.5', // Mix of tiny and small stars
    delay: `${Math.random() * 3}s`, // Random twinkle delay
    duration: `${2 + Math.random() * 3}s` // Random twinkle speed
  }));

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {stars.map((star) => (
        <div
          key={star.id}
          className={`absolute rounded-full bg-slate-200 ${star.size} opacity-20`}
          style={{
            top: star.top,
            left: star.left,
            animation: `twinkle ${star.duration} ease-in-out infinite`,
            animationDelay: star.delay,
          }}
        />
      ))}
    </div>
  );
};
// Helper to extract YouTube ID
const getYouTubeID = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};
function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false); // NEW STATE
const [activeVideo, setActiveVideo] = useState(null);
  useEffect(() => {
    const updateMousePosition = (ev) => {
      // 1. Update React State
      setMousePosition({ x: ev.clientX, y: ev.clientY });
      
      // 2. Update CSS Variables
      document.body.style.setProperty('--x', `${ev.clientX}px`);
      document.body.style.setProperty('--y', `${ev.clientY}px`);

      // 3. Check if hovering over a clickable element
      const hoveredElement = document.elementFromPoint(ev.clientX, ev.clientY);
      
      if (!hoveredElement) return;

      const isLink = 
        hoveredElement.closest('a') ||       // Links
        hoveredElement.closest('button') ||  // Buttons
        hoveredElement.closest('.cursor-pointer'); // <--- THIS IS THE FIX (Skills)

      setIsHovered(!!isLink);
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-400 selection:bg-cyan-900 selection:text-cyan-100 font-sans">
      {/* --- NEW CUSTOM CURSOR --- */}
      <div className={`hidden lg:block reticle-cursor ${isHovered ? 'locked' : ''}`}>
        <div className="reticle-dot"></div>
        <div className="reticle-ring"></div>
      </div>
<StarBackground />
      {/* Global Spotlight Background */}
      <div 
        className="pointer-events-none fixed inset-0 z-0 transition duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`,
        }}
      />

      <div className="relative z-10 mx-auto min-h-screen w-full max-w-[95%] px-2 py-12 md:px-4 md:py-20 lg:px-6 lg:py-0">
        
        <div className="lg:flex lg:justify-between lg:gap-4">
          
          {/* --- LEFT COLUMN: Sidebar (Navigation Only) --- */}
          <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/6 lg:flex-col lg:justify-start lg:py-24">
            <nav className="nav hidden lg:block">
              <h3 className="text-xl font-bold uppercase tracking-widest text-slate-200 mb-8 sticky top-0 backdrop-blur-md py-6 z-10 text-left shadow-lg shadow-slate-950/20 border-b border-slate-800/50">
                Index
              </h3>
                 <ul className="flex flex-col gap-4 w-max">
                   {['Profile', 'Experience', 'Education', 'Projects'].map((item) => (
                     <li key={item}>
                       <a href={`#${item.toLowerCase()}`} className="group flex items-center py-3">
                         <span className="nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-cyan-400"></span>
                         <span className="nav-text text-sm font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-200">
                           {item}
                         </span>
                       </a>
                     </li>
                   ))}
                 </ul>
              {/* 1. DOWNLOAD RESUME (Highlighted) */}
        <a 
            href="/Arindam_Resume.pdf" /* IMPORTANT: Put 'resume.pdf' in your public/ folder */
            target="_blank" 
            rel="noopener noreferrer"
            className="flex mt-20 items-center gap-5 rounded-full border border-cyan-500/50 bg-cyan-900/20 px-4 py-2 text-sm font-semibold text-cyan-300 transition-all hover:bg-cyan-500 hover:text-slate-950 hover:shadow-[0_0_15px_rgba(34,211,238,0.4)]"
        >
            <FileText size={16} />
            <span>Download Resume</span>
        </a>
            </nav>

          </header>

          {/* --- RIGHT COLUMN: Main Content --- */}
          <main className="pt-24 lg:w-5/6 lg:py-24">
            
            {/* 1. NEW PROFILE HEADER (Text Left, Image Right) */}
            <section id="profile" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-20 lg:scroll-mt-24">
                <div className="flex flex-col-reverse gap-8 lg:flex-row lg:items-start lg:justify-between">
                    
                    {/* LEFT SIDE: TEXT INFO */}
                    <div className="flex-1">
                        <h1 className="text-4xl font-bold tracking-tight text-slate-100 sm:text-5xl">
                            {resumeData.personalInfo.name}
                        </h1>
                        <h2 className="mt-3 text-lg font-medium tracking-tight text-cyan-400 sm:text-xl">
                            {resumeData.personalInfo.title}
                        </h2>
                        <p className="mt-4 leading-normal text-slate-400">
                            {resumeData.personalInfo.bio}
                        </p>

                        {/* Contact Section - Updated with Text Labels */}
<div className="mt-8 flex flex-col gap-3">
    
    {/* Row 1: Social Links (styled as clickable pills) */}
    <div className="flex flex-wrap gap-3">

        
        {/* GitHub */}
        <a 
            href={resumeData.personalInfo.github} 
            target="_blank" 
            rel="noreferrer" 
            className="flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/50 px-4 py-2 text-sm text-slate-400 transition-all hover:border-cyan-400 hover:text-cyan-100 hover:shadow-[0_0_10px_rgba(34,211,238,0.2)]"
        >
            <Github size={16} />
            <span>GitHub</span>
        </a>

        {/* LinkedIn */}
        <a 
            href={resumeData.personalInfo.linkedin} 
            target="_blank" 
            rel="noreferrer" 
            className="flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/50 px-4 py-2 text-sm text-slate-400 transition-all hover:border-cyan-400 hover:text-cyan-100 hover:shadow-[0_0_10px_rgba(34,211,238,0.2)]"
        >
            <Linkedin size={16} />
            <span>LinkedIn</span>
        </a>
{/* Phone - CLICK TO CALL */}
        <a 
            href={`tel:${resumeData.personalInfo.phone}`}
            className="flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/50 px-4 py-2 text-sm text-slate-400 transition-all hover:border-cyan-400 hover:text-cyan-100 hover:shadow-[0_0_10px_rgba(34,211,238,0.2)]"
        >
            <Phone size={16} />
            <span>Phone</span>
        </a>
       {/* Email - With Pre-filled Subject Line */}
        <a 
            /* 1. 'mailto:' opens the default email client.
               2. '?subject=' pre-fills the subject line.
               3. '%20' represents a space in URLs.
            */
            href={`mailto:${resumeData.personalInfo.email}`}
            className="flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/50 px-4 py-2 text-sm text-slate-400 transition-all hover:border-cyan-400 hover:text-cyan-100 hover:shadow-[0_0_10px_rgba(34,211,238,0.2)]"
            target="_blank"
        >
            <Mail size={16} />
            <span>Email Me</span>
        </a>
<div className="flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/50 px-4 py-2 text-sm text-slate-400 transition-all hover:border-cyan-400 hover:text-cyan-100 hover:shadow-[0_0_10px_rgba(34,211,238,0.2)]">
        <MapPin size={14} className="text-cyan-400" /> 
        <span>{resumeData.personalInfo.location}</span>
    </div>

    </div>

</div>
{/* Skills Section */}
<div className="mt-8 flex flex-wrap gap-2">
    {resumeData.skills.map((skill, index) => (
        <button 
            key={index} 
            /* CHANGED 'cursor-default' TO 'cursor-pointer' HERE */
            className="flex items-center rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-medium leading-5 text-cyan-300 border border-cyan-900/50 hover:bg-cyan-400/20 transition-colors cursor-pointer"
        >
            {skill}
        </button>
    ))}
</div>                    </div>

                    {/* RIGHT SIDE: LARGE IMAGE WITH TWINKLING STARS */}
                    <div className="relative group shrink-0 lg:w-1/3">
                        <div className="aspect-square w-48 sm:w-64 lg:w-full max-w-[300px] mx-auto relative cursor-pointer z-10">
                            
                             {/* The existing glowing ring effect */}
                            <div className="absolute -inset-5 rounded-full bg-gradient-to-b from-cyan-400 to-blue-1200 opacity-50 blur transition duration-50 group-hover:opacity-50 group-hover:scale-125"></div>
                            
                            {/* The Image */}
                            <img 
                              src="/profile.jpeg" 
                              alt="Profile" 
                              className="relative h-full w-full rounded-full border-2 border-slate-800 bg-slate-900 object-cover shadow-2xl transition-transform duration-300 group-hover:scale-125"
                            />

                            {/* --- TWINKLING STARS --- */}
                            {/* We position these absolutely relative to the container above */}
                            {/* Top Left (Large) */}
                            <Sparkle delay="delay-100" className="w-6 h-6 -top-6 -left-4" />
                            {/* Top Right (Medium) */}
                            <Sparkle delay="delay-300" className="w-4 h-4 -top-2 -right-3" />
                            {/* Bottom Right (Large) */}
                            <Sparkle delay="delay-500" className="w-5 h-5 -bottom-4 -right-4" />
                            {/* Bottom Left (Medium) */}
                            <Sparkle delay="delay-700" className="w-4 h-4 bottom-2 -left-6" />
                             {/* Extra Tiny One */}
                             <Sparkle delay="delay-1000" className="w-2 h-2 top-1/2 -right-5" />

                        </div>
                    </div>

                </div>
            </section>

            {/* 2. Experience Section */}
            <section id="experience" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-12 lg:scroll-mt-24">
              <h3 className="mt-6 text-2xl font-bold uppercase tracking-widest text-slate-200 mb-8 sticky top-0 backdrop-blur-md py-6 z-10 text-left shadow-lg shadow-slate-950/20 border-b border-slate-800/50">
                Experience
              </h3>
              <div className="group/list">
                {resumeData.experience.map((job, index) => (
                  <SpotlightCard key={index} className="mb-4 lg:p-6 lg:hover:!opacity-100 lg:group-hover/list:opacity-20 transition-all border-slate-800 hover:border-slate-400">
                    <div className="grid grid-cols-8 gap-4 md:grid-cols-8">
                      
                      <div className="col-span-8 flex flex-col items-center text-center">
  
  {/* Role & Company */}
  <h3 className="mt-6 font-medium leading-snug text-slate-200">
    <div>
      <span className="text-cyan-400 group-hover:text-cyan-300 font-bold">
        {job.role}
      </span>
      {' · '}
      <span className="text-slate-200">
        {job.company}
      </span>
    </div>
  </h3>

  {/* Description */}
  <p className="mt-2 text-sm leading-normal text-slate-400 max-w-2xl">
    {job.description}
  </p>

  {/* Year - (Cleaned up classes since it's no longer a grid column) */}
  <header className="text-xs font-semibold uppercase tracking-wide text-slate-500 mt-2">
    {job.year}
  </header>

  {/* Tags - Added 'justify-center' to center the pills */}
  <ul className="mt-2 flex flex-wrap justify-center">
    {job.tags.map((tag, i) => (
      <li key={i} className="mr-1.5 mt-2">
        <div className="flex items-center rounded-full bg-cyan-900/30 px-3 py-1 text-xs font-medium leading-5 text-cyan-300">
          {tag}
        </div>
      </li>
    ))}
  </ul>
        <a 
            href={job.certificate} 
            target="_blank" 
            rel="noreferrer" 
            className="flex items-center gap-2 rounded-full mt-8 border border-slate-800 bg-slate-900/50 px-4 py-2 text-sm text-slate-400 transition-all hover:border-cyan-400 hover:text-cyan-100 hover:shadow-[0_0_10px_rgba(34,211,238,0.2)]"
        >
            <span>Certificate Link</span>
<ExternalLink size={14} />
        </a>
</div>
                    </div>
                  </SpotlightCard>
                ))}
              </div>
            </section>

            {/* Education Section */}
<section id="education" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-12 lg:scroll-mt-24">
  <h3 className="mt-6 text-2xl font-bold uppercase tracking-widest text-slate-200 mb-8 sticky top-0 backdrop-blur-md py-6 z-10 text-left shadow-lg shadow-slate-950/20 border-b border-slate-800/50">
    Education
  </h3>
  <div className="group/education">
    {resumeData.education.map((edu, index) => (
      <SpotlightCard key={index} className="mb-4 lg:p-6 lg:hover:!opacity-100 lg:group-hover/education:opacity-20 transition-all border-slate-800 hover:border-slate-400">
        {/* Centered Layout Container */}
        <div className="flex flex-col items-center text-center">
          
          {/* Degree & School */}
          <h3 className="mt-6 font-medium leading-snug text-slate-200">
            <div>
              <span className="text-cyan-400 group-hover:text-cyan-300 font-bold">
                {edu.degree}
              </span>
              {' · '}
              <span className="text-slate-200">
                 {edu.school}
              </span>
            </div>
          </h3>

          {/* Year */}
          <header className="text-xs font-semibold uppercase tracking-wide text-slate-500 mt-2">
            {edu.year}
          </header>

          {/* Location */}
          <div className="mt-1 text-sm leading-normal text-slate-400 flex items-center gap-1">
             <MapPin size={12} />
             {edu.location}
          </div>

        </div>
      </SpotlightCard>
    ))}
  </div>
</section>
            {/* Projects Section */}
<section id="projects" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-12 lg:scroll-mt-24">
  <h3 className="text-2xl font-bold uppercase tracking-widest text-slate-200 mb-8 sticky top-0 backdrop-blur-md py-6 z-10 text-left shadow-lg shadow-slate-950/20 border-b border-slate-800/50">
    Projects
  </h3>
  <div className="group/projects">
      {resumeData.projects.map((project, index) => (
        <SpotlightCard key={index} className="mb-4 lg:p-6 lg:hover:!opacity-100 lg:group-hover/projects:opacity-20 transition-all border-slate-800 hover:border-slate-400">
            {/* Centered Layout Container */}
            <div className="flex flex-col items-center text-center">
                
                {/* Title & Link */}
                <h3 className="mt-6 text-slate-200 font-bold flex items-center gap-2 group-hover:text-cyan-400 transition-colors">
                    {project.title} 
                    <ExternalLink className="h-4 w-4" />
                </h3>

                {/* Description */}
                <p className="mt-2 text-sm leading-normal text-slate-400 max-w-2xl">
                    {project.description}
                </p>


                {/* Tags - Centered */}
                <ul className="mt-2 flex flex-wrap justify-center">
                    {project.tags.map((tag, i) => (
                        <li key={i} className="mr-1.5 mt-2">
                            <div className="flex items-center rounded text-xs font-medium leading-5 text-cyan-300 bg-cyan-900/30 px-3 py-1">
                                #{tag}
                            </div>
                        </li>
                    ))}
                </ul>
<ul className="mt-2 flex flex-wrap justify-center">
{/* --- DYNAMIC YOUTUBE SECTION --- */}
        {project.video && (
            <div className="mt-6 w-full">
                {activeVideo === index ? (
                    // 1. ACTIVE VIDEO VIEW
                    <div className="relative w-full rounded-xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl animate-in fade-in zoom-in duration-300">
                        
                        {/* The Video Player */}
                        <div className="aspect-video w-full">
                            <iframe 
                                className="w-full h-full"
                                src={`https://www.youtube.com/embed/${getYouTubeID(project.video)}?autoplay=1`} 
                                title={project.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowFullScreen
                            ></iframe>
                        </div>

                        {/* Close Button */}
                        <button 
                            onClick={() => setActiveVideo(null)}
                            className="absolute top-2 right-2 rounded-full bg-slate-900/80 p-1.5 text-slate-400 hover:text-white hover:bg-red-500/80 transition-colors backdrop-blur-sm"
                            title="Close Video"
                        >
                            <span className="sr-only">Close</span>
                            {/* Simple X icon (using Lucide's Plus icon rotated 45deg or standard SVG) */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                    </div>

                ) : (
                    // 2. DEFAULT BUTTON VIEW
                    <button 
                        onClick={() => setActiveVideo(index)} 
                        className="flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/50 px-4 py-2 text-sm text-slate-400 transition-all hover:border-red-500 hover:text-red-400 hover:shadow-[0_0_10px_rgba(239,68,68,0.2)] cursor-pointer mx-auto"
                    >
                        <Youtube size={16} />
                        <span>Watch Demo</span>
                    </button>
                )}
            </div>
        )}<a 
            href={project.link} 
            target="_blank" 
            rel="noreferrer" 
            className="flex items-center gap-2 rounded-full mt-8 border border-slate-800 bg-slate-900/50 px-4 py-2 text-sm text-slate-400 transition-all hover:border-cyan-400 hover:text-cyan-100 hover:shadow-[0_0_10px_rgba(34,211,238,0.2)]"
        >
            <span>Show GitHub Repository</span>
<ExternalLink size={14} />
        </a>
</ul>
            </div>
        </SpotlightCard>
      ))}
  </div>
</section>


            {/* FIXED FOOTER */}
<footer className="fixed bottom-0 left-0 z-50 w-full border-t border-slate-800 bg-slate-950/90 backdrop-blur-md py-4 text-center text-sm text-slate-500 shadow-2xl">
    <p>Made by Arindam.</p>
</footer>

          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
