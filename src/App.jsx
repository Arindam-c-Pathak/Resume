import React, { useState, useEffect, useCallback } from 'react';
import SpotlightCard from './components/SpotlightCard';
import { resumeData } from './data';
import { Github, Linkedin, Mail, ExternalLink, MapPin, Phone, FileText, Youtube, X, ChevronUp } from 'lucide-react';
import './App.css';

// --- 1. HELPER COMPONENTS ---

const Sparkle = ({ className, delay }) => (
  <svg 
    viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" 
    className={`absolute text-cyan-200/70 animate-twinkle ${delay} ${className}`}
  >
    <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" fill="currentColor" />
  </svg>
);

const StarBackground = () => {
  const stars = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() > 0.5 ? 'w-1 h-1' : 'w-0.5 h-0.5',
    delay: `${Math.random() * 3}s`,
    duration: `${2 + Math.random() * 3}s`
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
const Header = () => {
   return (
    <header className="lg:hidden sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md px-6 py-4">
      <div className="flex items-center justify-between">
        <span className="text-xl font-bold tracking-tight text-slate-100">
          Arindam.<p className="mt-3 text-lg font-medium text-cyan-400">Computer Science Student</p>
        </span>
        
        {/* Back to Top Button */}
        <button 
          className="flex items-center justify-center p-2 rounded-full border border-slate-700 bg-slate-900/50 text-cyan-400 hover:border-cyan-400 hover:bg-cyan-400/10 transition-all active:scale-95"
          aria-label="Scroll to top"
        ><a href="#profile">
          <ChevronUp size={20} /></a>
        </button>
      </div>
    </header>
  );
};

const Footer = () => (
  <footer className="mt-24 border-t border-slate-800 py-12 px-6">
    <div className="flex flex-col items-center gap-6 text-center">
      <div className="flex gap-6">
        <a href={resumeData.personalInfo.github} className="text-slate-500 hover:text-cyan-400 transition-colors"><Github size={20} /></a>
        <a href={resumeData.personalInfo.linkedin} className="text-slate-500 hover:text-cyan-400 transition-colors"><Linkedin size={20} /></a>
        <a href={`mailto:${resumeData.personalInfo.email}`} className="text-slate-500 hover:text-cyan-400 transition-colors"><Mail size={20} /></a>
      </div>
      
      <p className="text-sm text-slate-500 max-w-md">
        Built with <span className="text-cyan-400">React</span> & <span className="text-cyan-400">Tailwind CSS</span>. 
        Deployed on Vercel.
      </p>
      
      <p className="text-xs text-slate-600 uppercase tracking-widest">
        © 2026 Arindam Pathak
      </p>
      
      <button 
        className="mt-4 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-cyan-400 transition-all"
      >
        <a href="#profile" className="flex items-center gap-1">
          <ChevronUp size={12} className="text-cyan-400" />
          Back to Top
        </a>
      </button>
    </div>
  </footer>
);

// --- 2. UTILITY FUNCTIONS ---

const getYouTubeID = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const handleScroll = (e, id) => {
  e.preventDefault();
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

// --- 3. MAIN APP ---

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    const updateMouse = (ev) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
      document.body.style.setProperty('--x', `${ev.clientX}px`);
      document.body.style.setProperty('--y', `${ev.clientY}px`);

      // Detect hover for reticle state
      const el = document.elementFromPoint(ev.clientX, ev.clientY);
      const isClickable = el?.closest('a, button, .cursor-pointer');
      setIsHovered(!!isClickable);
    };

    window.addEventListener('mousemove', updateMouse);
    return () => window.removeEventListener('mousemove', updateMouse);
  }, []);

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-400 selection:bg-cyan-900 selection:text-cyan-100 font-sans">
      <Header />
      {/* Visual Effects Layer */}
      <div className={`hidden md:block reticle-cursor ${isHovered ? 'locked' : ''}`}>
        <div className="reticle-dot" />
        <div className="reticle-ring" />
      </div>
      <StarBackground />
      
      <div className="relative z-10 mx-auto max-w-[95%] px-4">
        <div className="lg:flex lg:justify-between lg:gap-4">
          
          {/* LEFT: Sidebar */}
          <header className="hidden md:block lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/4 lg:flex-col lg:justify-between lg:py-24">
            <div>
              <h2 className="mt-3 text-2xl font-medium text-cyan-400">
                Navigation
              </h2>
              
              <nav className="mt-16 hidden lg:block">
                <ul className="flex flex-col gap-4">
                  {['Profile', 'Experience', 'Education', 'Projects'].map((item) => (
                    <li key={item}>
                      <a 
                        href={`#${item.toLowerCase()}`} 
                        className="group flex items-center py-3" 
                        onClick={(e) => handleScroll(e, item.toLowerCase())}
                      >
                        <span className="nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-cyan-400" />
                        <span className="text-s font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-200">
                          {item}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <a href="/Arindam_Resume.pdf" target="_blank" download='Arindam_Resume.pdf' className="flex w-fit items-center gap-3 rounded-full border border-cyan-500/50 bg-cyan-900/20 px-6 py-3 text-sm font-semibold text-cyan-300 hover:bg-cyan-500 hover:text-slate-950 transition-all">
              <FileText size={18} /> Download Resume
            </a>
          </header>

          {/* RIGHT: Main Content */}
          <main className="lg:w-3/4 lg:py-24">
            
            {/* Profile Section */}
            <section id="profile" className="mb-24 scroll-mt-24">
              <div className="flex flex-col-reverse lg:flex-row gap-12">
                <div className="flex-1">
                  <h1 className="text-4xl font-bold tracking-tight text-slate-100 sm:text-5xl">
                    {resumeData.personalInfo.name}
                  </h1>
                  <h2 className="mt-3 text-lg font-medium text-cyan-400">
                    {resumeData.personalInfo.title}
                  </h2>
                  <p className="leading-relaxed">{resumeData.personalInfo.bio}</p>
                  
                  {/* Contact Pills */}
                  <div className="mt-8 flex flex-wrap gap-3">
                    <ContactLink icon={<Github size={16}/>} label="GitHub" href={resumeData.personalInfo.github} />
                    <ContactLink icon={<Linkedin size={16}/>} label="LinkedIn" href={resumeData.personalInfo.linkedin} />
                    <ContactLink icon={<Mail size={16}/>} label="Email" href={`mailto:${resumeData.personalInfo.email}`} />
                    <ContactLink icon={<Phone size={16}/>} label="Phone" href={`tel:${resumeData.personalInfo.phone}`} />
                  </div>

                  {/* Skills */}
                  <div className="mt-8 flex flex-wrap gap-2">
                    {resumeData.skills.map((skill, i) => (
                      <span key={i} className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-300 border border-cyan-900/50 cursor-pointer hover:bg-cyan-400/20">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Avatar */}
                <div className="relative group shrink-0 mx-auto lg:mx-0">
                  <div className="absolute -inset-8 rounded-full bg-cyan-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <img src="/profile.jpeg" alt="Profile" className="relative h-48 w-48 rounded-full border-2 border-slate-800 object-cover group-hover:scale-150 transition-transform duration-300" />
                  <Sparkle delay="delay-100" className="w-6 h-6 -top-4 -left-2" />
                  <Sparkle delay="delay-500" className="w-4 h-4 -bottom-2 -right-2" />
                </div>
              </div>
            <a href="/Arindam_Resume.pdf" target="_blank" download='Arindam_Resume.pdf' className="block md:hidden mt-5 flex w-fit items-center gap-3 rounded-full border border-cyan-500/50 bg-cyan-900/20 px-6 py-3 text-sm font-semibold text-cyan-300 hover:bg-cyan-500 hover:text-slate-950 transition-all">
              <FileText size={18} /> Download Resume
            </a>
            </section>

            {/* Content Sections */}
            <DataSection id="experience" title="Experience" data={resumeData.experience} type="work" />
            <DataSection id="education" title="Education" data={resumeData.education} type="edu" />
            
            {/* Project Section */}
            <section id="projects" className="scroll-mt-24">
              <SectionHeader title="Projects" />
              <div className="group/list">
                {resumeData.projects.map((project, i) => (
                  <ProjectCard 
                    key={i} 
                    project={project} 
                    isActive={activeVideo === i} 
                    onVideoToggle={() => setActiveVideo(activeVideo === i ? null : i)}
                  />
                ))}
              </div>
            </section>
            <Footer />

          </main>
        </div>
      </div>
    </div>
  );
}

// --- 4. MINI UI COMPONENTS (Internal to App) ---

const ContactLink = ({ icon, label, href }) => (
  <a href={href} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/50 px-4 py-2 text-sm hover:border-cyan-400 hover:text-cyan-100 transition-all">
    {icon} <span>{label}</span>
  </a>
);

const SectionHeader = ({ title }) => (
  <h3 className="sticky top-0 z-20 py-6 text-2xl font-bold uppercase tracking-widest text-slate-200 backdrop-blur-md border-b border-slate-800/50 mb-8">
    {title}
  </h3>
);

const ProjectCard = ({ project, isActive, onVideoToggle }) => (
  <SpotlightCard className="mb-8 p-4 lg:p-6 hover:!opacity-100 group-hover/list:opacity-50 transition-all border-slate-800 hover:border-slate-400">
    <div className="flex flex-col items-center text-center w-full">
      
      {/* Titles */}
      <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2 group-hover:text-cyan-400 transition-colors">
        {project.title}
      </h3>

      {/* Descriptions */}
      <p className="mt-4 text-sm max-w-xl mx-auto text-slate-400 whitespace-pre-line text-center">
        {project.description}
      </p>
      
      {/* tags used*/}
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {project.tags.map((tag, i) => (
          <span key={i} className="text-[10px] uppercase tracking-wider text-cyan-300 bg-cyan-900/20 px-3 py-1 rounded border border-cyan-900/50">
            #{tag}
          </span>
        ))}
      </div>

      {/* demo link */}
      <div className="mt-8 flex flex-col items-center gap-6 w-full max-w-xl">
        {project.video && (
          <div className="w-full">
            {isActive ? (
              <div className="aspect-video relative rounded-xl overflow-hidden border border-slate-700 shadow-2xl animate-in fade-in zoom-in duration-300">
                <iframe 
                  className="w-full h-full" 
                  src={`https://www.youtube.com/embed/${getYouTubeID(project.video)}?autoplay=1`} 
                  allowFullScreen 
                />
                <button 
                  onClick={onVideoToggle} 
                  className="absolute top-2 right-2 bg-black/60 p-2 rounded-full hover:bg-red-500/80 transition-colors"
                >
                  <X size={20} className="text-white"/>
                </button>
              </div>
            ) : (
              <button 
                onClick={onVideoToggle} 
                className="flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900 px-6 py-2 text-sm text-slate-400 hover:border-red-500 hover:text-red-400 transition-all cursor-pointer mx-auto"
              >
                <Youtube size={18} /> 
                <span>Watch Demo</span>
              </button>
            )}
          </div>
        )}
        <a 
          href={project.link} 
          target="_blank" 
          rel="noreferrer" 
          className="flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/50 px-6 py-2 text-sm text-slate-400 transition-all hover:border-cyan-400 hover:text-cyan-100 hover:shadow-[0_0_15px_rgba(34,211,238,0.2)]"
        >
          <span>Show GitHub Repository</span>
          <ExternalLink size={14} />
        </a>
      </div>
    </div>
  </SpotlightCard>
);

const DataSection = ({ id, title, data, type }) => (
  <section id={id} className="mb-24 scroll-mt-24">
    <SectionHeader title={title} />
    <div className="group/list">
      {data.map((item, i) => (
        <SpotlightCard key={i} className="mb-6 p-8 lg:p-8 hover:!opacity-100 group-hover/list:opacity-50 transition-all">
          <div className=" text-center flex flex-col items-center">
            <span className="text-cyan-400 font-bold text-xl">{type === 'work' ? item.role : item.degree}</span>
            <span className="text-slate-300 text-lg">{type === 'work' ? item.company : item.school}</span>
            <span className="text-sm text-slate-500 uppercase mt-2">{item.year}</span>
            <span className="text-slate-300 mt-3 mb-3"><p className="mt-4 text-sm max-w-xl mx-auto text-slate-400 whitespace-pre-line text-center">{type === 'work' ? item.description : item.location}</p></span>
            {item.tags && (
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {item.tags.map((tag, index) => (
                  <span 
                    key={index} 
                    className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-300 border border-cyan-900/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            {item.certificate && (<a href={item.certificate} target="_blank" rel="noreferrer" className="mt-5 flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/50 px-6 py-2 text-sm text-slate-400 transition-all hover:border-cyan-400 hover:text-cyan-100 hover:shadow-[0_0_15px_rgba(34,211,238,0.2)]"> View Certificate <ExternalLink size={14} /></a>)}
          </div>
        </SpotlightCard>
      ))}
    </div>
  </section>
);

export default App;
