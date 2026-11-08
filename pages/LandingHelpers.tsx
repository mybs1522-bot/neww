import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ShieldCheck, Zap, CheckCircle, CheckCircle2, Users, X, Sparkles, Star, Award, Clock, DollarSign, BookOpen, Gift, Check, Flame, MessageSquare, AlertCircle, Heart, ChevronLeft, ChevronRight } from 'lucide-react';

export const getDriveUrl = (id: string) => `https://drive.google.com/thumbnail?id=${id}&sz=w1600`;

export const RAW_JOINERS = [
  { name: "Priya Sharma", city: "Mumbai", time: "1 min ago", plan: "10-Course Package" },
  { name: "Rahul Verma", city: "New Delhi", time: "3 min ago", plan: "10-Course Package" },
  { name: "Ananya Gupta", city: "Pune", time: "5 min ago", plan: "10-Course Package" },
  { name: "Vikramjit Singh", city: "Jaipur", time: "7 min ago", plan: "10-Course Package" },
  { name: "Meera Iyer", city: "Chennai", time: "9 min ago", plan: "10-Course Package" },
  { name: "Aravind Reddy", city: "Bengaluru", time: "12 min ago", plan: "10-Course Package" },
  { name: "Neha Kulkarni", city: "Nagpur", time: "14 min ago", plan: "10-Course Package" },
  { name: "Rohit Mehta", city: "Ahmedabad", time: "16 min ago", plan: "10-Course Package" },
  { name: "Simran Kaur", city: "Chandigarh", time: "19 min ago", plan: "10-Course Package" },
  { name: "Arjun Deshmukh", city: "Hyderabad", time: "22 min ago", plan: "12-Course Architecture Master Bundle" },
  { name: "Tanmay Bhattacharya", city: "Kolkata", time: "25 min ago", plan: "12-Course Architecture Master Bundle" },
  { name: "Sneha Patel", city: "Surat", time: "28 min ago", plan: "12-Course Architecture Master Bundle" },
  { name: "Deepak Choudhary", city: "Lucknow", time: "31 min ago", plan: "12-Course Architecture Master Bundle" },
  { name: "Pooja Hegde", city: "Mangalore", time: "34 min ago", plan: "12-Course Architecture Master Bundle" },
  { name: "Karan Johar", city: "Indore", time: "38 min ago", plan: "12-Course Architecture Master Bundle" },
];

export const PAIN_TRIGGERS = [
  {
    emoji: "😫",
    title: "Flat & Unrealistic Renders",
    desc: "Lighting looks fake and clients delay or reject milestone payments."
  },
  {
    emoji: "🐢",
    title: "PC Freezes & Render Crashes",
    desc: "Waiting hours for a single frame while software crashes on heavy files."
  },
  {
    emoji: "📉",
    title: "Stuck at Low Junior Salaries",
    desc: "Earning ₹15k–₹25k doing slow 2D CAD drafting work with zero career growth."
  },
  {
    emoji: "🤖",
    title: "Fear of AI Taking 3D Work",
    desc: "Losing clients to modern designers delivering 4K photorealistic concepts in minutes."
  }
];

export const SOLUTION_PILLARS = [
  {
    step: "01",
    badge: "STAGE 1: 2D BLUEPRINTS",
    title: "AutoCAD & Revit BIM Drafting",
    desc: "Draft sanction-ready floor plans and contractor drawings in 60 minutes.",
    icon: "📐",
    result: "Sanction-ready contractor drawings"
  },
  {
    step: "02",
    badge: "STAGE 2: 3D MODELING",
    title: "SketchUp Pro & 3ds Max Interiors",
    desc: "Turn 2D plans into walk-in kitchens, bedrooms & elevations in under 2 hours.",
    icon: "🏛️",
    result: "Fast walk-in 3D spaces"
  },
  {
    step: "03",
    badge: "STAGE 3: PHOTOREALISM",
    title: "V-Ray, Lumion & D5 Render 4K",
    desc: "Master cinematic lighting and natural materials that look like real site photos.",
    icon: "📸",
    result: "Hyper-realistic delivery"
  },
  {
    step: "04",
    badge: "STAGE 4: AI SUPERPOWERS",
    title: "Midjourney & Architecture AI",
    desc: "Generate 50 high-end concept variations in 2 minutes right in front of clients.",
    icon: "⚡",
    result: "Close token advance on Day 1"
  }
];

export const WHO_IS_THIS_FOR = [
  {
    icon: "🎓",
    role: "Architecture & Civil Students",
    badge: "College to Job Ready",
    desc: "Build a job-ready 4K 3D portfolio and crack high-paying studio placements."
  },
  {
    icon: "🛋️",
    role: "Interior Designers & Freelancers",
    badge: "Close Clients 10x Faster",
    desc: "Stop outsourcing 3D work. Present walk-in concepts and charge ₹25k–₹50k+."
  },
  {
    icon: "🏗️",
    role: "Builders, Contractors & Engineers",
    badge: "Prevent Site Errors",
    desc: "Show clients exact photorealistic 3D views before laying a single brick."
  },
  {
    icon: "🚀",
    role: "Complete Beginners (Zero Experience)",
    badge: "Day 1 Step-by-Step",
    desc: "Start from complete scratch. No design background or prior 3D experience needed."
  }
];

export const TRANSFORMATION_STORIES = [
  {
    name: "Priya Patel",
    city: "Mumbai, MH",
    role: "Freelance Interior Designer",
    before: "Was struggling with slow YouTube tutorials. Renders looked cartoonish, PC kept crashing on V-Ray, and clients bargained for ₹1,500 per view.",
    after: "Mastered D5 Render + AI workflow in 12 days. Now charges ₹8,500 per render and closed a ₹1.8 Lakh full 3BHK interior project in Bandra.",
    incomeIncrease: "4.5x Income Growth",
    emoji: "✨",
    rating: 5
  },
  {
    name: "Rahul Varma",
    city: "Delhi NCR",
    role: "Architecture Graduate",
    before: "Zero practical studio knowledge from college. Terrified of interviews because his portfolio had outdated AutoCAD line drawings.",
    after: "Built a jaw-dropping 15-project 4K portfolio with Unreal Engine 5 VR and Lumion. Landed a ₹6.8 LPA junior architect role at a top Gurugram firm.",
    incomeIncrease: "Top Studio Placement",
    emoji: "🎓",
    rating: 5
  },
  {
    name: "Aravind Sharma",
    city: "Bengaluru, KA",
    role: "Studio Principal / Architect",
    before: "Team took 4-5 days to deliver one design proposal. Lost lucrative tech-founder villa projects to fast visualization studios.",
    after: "Trained his 4 draftsmen using this bundle. Proposal speed jumped from 5 days to 6 hours. Studio revenue crossed ₹8 Lakhs/month.",
    incomeIncrease: "300% Studio Output",
    emoji: "🚀",
    rating: 5
  },
  {
    name: "Meera Iyer",
    city: "Chennai, TN",
    role: "3D Visualizer & NRI Freelancer",
    before: "Working 12-hour shifts at a drafting agency for ₹22,000/month with zero creative freedom.",
    after: "Created an Upwork & Instagram portfolio targeting Dubai & US real-estate builders. Now earns $1,800+/month working from home.",
    incomeIncrease: "Earns in Dollars ($)",
    emoji: "💎",
    rating: 5
  }
];

export const PAGE_PREVIEWS_ROW1 = [
  '/renders/RENDER-1.jpg', '/renders/RENDER-2.jpg', '/renders/RENDER-3.jpg',
  '/renders/RENDER-4.jpg', '/renders/RENDER-5.jpg', '/renders/RENDER-6.jpg',
  '/renders/RENDER-7.jpg', '/renders/RENDER-8.jpg', '/renders/RENDER-9.jpg',
  '/renders/RENDER-10.jpg', '/renders/RENDER-11.jpg', '/renders/RENDER-12.jpg',
  '/renders/RENDER-13.jpg',
];

export const PAGE_PREVIEWS_ROW2 = [
  '/renders/RENDER-14.jpg', '/renders/RENDER-15.jpg', '/renders/RENDER-16.jpg',
  '/renders/RENDER-17.jpg', '/renders/RENDER-18.jpg', '/renders/RENDER-19.jpg',
  '/renders/RENDER-20.jpg', '/renders/RENDER-21.jpg', '/renders/RENDER-22.jpg',
  '/renders/RENDER-23.jpg', '/renders/RENDER-24.jpg', '/renders/RENDER-25.jpg',
];

export const FEAR_STATS = [
  { stat: '52,480+', label: 'Architects & Designers Enrolled with 4.9★ Rating', icon: '🎓' },
  { stat: '10x Faster', label: 'Client Approvals with Real-time D5 + Lumion + AI Workflow', icon: '⚡' },
  { stat: '₹50k - ₹1.5L', label: 'Average Monthly Freelance Earning Potential post completion', icon: '💰' },
  { stat: '30 Days', label: 'Step-by-step from beginner to creating 4K magazine-grade 3D designs', icon: '⏱️' },
];

export const FREE_BONUSES = [
  {
    id: "b1",
    title: "10,000+ Ready & Modern 3D Models Library",
    worth: "₹14,999",
    desc: "Ready-to-use Modular Kitchens, Godrej Wardrobes, Mandir / Pooja Units, Luxury Italian Sofas, Master Beds & Ceiling Light Fixtures. Drag & drop directly into SketchUp / 3ds Max.",
    icon: "🛋️",
    badge: "MOST POPULAR"
  },
  {
    id: "b2",
    title: "5,000+ Ultra HD 4K PBR Materials & Textures",
    worth: "₹7,999",
    desc: "Italian Statuario Marble, Teak & Walnut Wood, Fluted Charcoal Panels, Fabric Textures, Terrazzo, Corian & Gold Brass Accents in 4K resolution.",
    icon: "🎨",
    badge: "FREE TODAY"
  },
  {
    id: "b3",
    title: "Client Quotation & Freelance Contract Toolkit",
    worth: "₹4,999",
    desc: "Word/PDF editable contract templates, price quotation sheets (per sq. ft. & per room), and script to demand 50% advance token without resistance.",
    icon: "📋",
    badge: "HIGH EARNING"
  },
  {
    id: "b4",
    title: "150+ Master AI Architecture Prompts Bible",
    worth: "₹3,999",
    desc: "Secret copy-paste text prompts for Midjourney & Stable Diffusion to create hyper-realistic elevations, luxury washrooms, and commercial interiors in seconds.",
    icon: "🪄",
    badge: "AI POWER"
  },
  {
    id: "b5",
    title: "ISO-Verified Digital Skill Certificate",
    worth: "₹2,999",
    desc: "Shareable skill credential to boost your LinkedIn profile, resume, and studio portfolio to impress clients and recruiters.",
    icon: "📜",
    badge: "CAREER BOOSTER"
  },
  {
    id: "b6",
    title: "24/7 Dedicated WhatsApp Support & Installation Links",
    worth: "Priceless",
    desc: "Stuck on software installation? Render crashing? Message our expert tech team on WhatsApp anytime for prompt, friendly resolution.",
    icon: "💬",
    badge: "LIFETIME VIP"
  }
];

export const VALUE_STACK_ITEMS = [
  { name: '1. AutoCAD Precision Drafting & Floor Plan Mastery', value: '₹4,999' },
  { name: '2. Autodesk Revit BIM Architecture Masterclass', value: '₹5,999' },
  { name: '3. SketchUp Pro 3D Fast Modeling Blueprint', value: '₹4,999' },
  { name: '4. 3ds Max Luxury Interior Design & Parametric Modeling', value: '₹6,999' },
  { name: '5. V-Ray Photorealism Lighting & Material Masterclass', value: '₹5,999' },
  { name: '6. Lumion Cinematic Video Walkthroughs', value: '₹4,999' },
  { name: '7. D5 Render Real-Time 4K Rendering Suite', value: '₹4,999' },
  { name: '8. Enscape Interactive Client VR Presentations', value: '₹3,999' },
  { name: '9. Midjourney AI Architecture Speed Concepting', value: '₹4,999' },
  { name: '10. Stable Diffusion Sketch-to-Render AI Generator', value: '₹4,999' },
  { name: '11. Unreal Engine 5 Real-Time Virtual Architecture', value: '₹6,999' },
  { name: '12. Photoshop Architectural Post-Production & Touch-ups', value: '₹3,999' },
  { name: 'BONUS #1: 10,000+ 3D Furniture & Interior Models', value: '₹14,999' },
  { name: 'BONUS #2: 5,000+ 4K PBR Materials & Textures Pack', value: '₹7,999' },
  { name: 'BONUS #3: Client Quotation & Legal Contract Kit', value: '₹4,999' },
  { name: 'BONUS #4: 150+ Secret AI Architecture Prompts Bible', value: '₹3,999' },
  { name: 'BONUS #5: Official Skill Certificate for Resume & Portfolio', value: '₹2,999' },
  { name: 'BONUS #6: Lifetime Updates + Safe Software Download Guides', value: 'Included' },
  { name: 'BONUS #7: 24/7 Priority WhatsApp Doubt-Solving Team Access', value: 'Included' },
];

export const TESTIMONIALS_LANDING = [
  {
    name: 'Priya Patel',
    role: 'Interior Designer & Studio Founder',
    location: 'Mumbai, Maharashtra',
    content: 'Honestly, I was scared of 3ds Max and V-Ray settings. This course explained lighting in such simple everyday terms! Last week I closed a 3BHK flat interior design project in Powai for ₹1.65 Lakh. Best ₹799 investment of my life.',
    rating: 5,
    verified: true
  },
  {
    name: 'Arjun Reddy',
    role: 'Senior Architect',
    location: 'Bengaluru, Karnataka',
    content: 'The D5 Render and Lumion cinematic walkthrough module changed how we pitch to villa buyers in Whitefield. Clients don’t even ask for discounts when they see a 4K video tour of their unbuilt house. Total game changer.',
    rating: 5,
    verified: true
  },
  {
    name: 'Rahul Varma',
    role: 'Architecture Student',
    location: 'Delhi NCR',
    content: 'My college faculty were teaching outdated AutoCAD commands. Within 10 days of watching these modules, my 3D renders were miles ahead of my entire batch. Landed a paid internship on my first interview!',
    rating: 5,
    verified: true
  },
  {
    name: 'Ananya Gupta',
    role: 'Freelance Visualizer',
    location: 'Pune, Maharashtra',
    content: 'The 10,000+ ready 3D models library alone saved me hundreds of hours. I just drag modular kitchens and sofas into SketchUp and render in D5. The WhatsApp support team replied within 10 minutes when my setup had a glitch.',
    rating: 5,
    verified: true
  },
  {
    name: 'Vikramjit Singh',
    role: 'Civil Engineer & Builder',
    location: 'Jaipur, Rajasthan',
    content: 'As a builder, I used to pay outside 3D artists ₹4,000 per view. Now I and my team generate custom elevations and floor plans in-house within hours. The return on investment is easily 500x.',
    rating: 5,
    verified: true
  },
  {
    name: 'Meera Iyer',
    role: '3D Artist',
    location: 'Chennai, Tamil Nadu',
    content: 'The AI Midjourney + Stable Diffusion section is pure magic. Showing 10 mood boards to NRI clients in 5 minutes helps me lock the deal before anyone else even sends a preliminary sketch.',
    rating: 5,
    verified: true
  },
  {
    name: 'Rohit Mehta',
    role: 'Turnkey Interior Contractor',
    location: 'Ahmedabad, Gujarat',
    content: 'Guaranteed value for all project conditions! Client quotation templates and contract formats are so practical. No client disputes anymore because 3D clarity is 100%. Highly recommended to everyone in the construction field.',
    rating: 5,
    verified: true
  },
  {
    name: 'Simran Kaur',
    role: 'Junior Architect',
    location: 'Chandigarh',
    content: 'I switched from ₹18,000 monthly job to full-time remote freelancing. I now work with 3 interior studios across India and earn over ₹75,000 every single month from home. Thank you Avada team!',
    rating: 5,
    verified: true
  }
];

export const FAQ_ITEMS_LANDING = [
  {
    question: "How will I receive the courses immediately after payment?",
    answer: "Instant Automatic Delivery! Within 60 seconds of completing your payment on Razorpay (UPI, GPay, PhonePe, Paytm, or Card), you will receive direct Google Drive lifetime access links on your Email and on your screen. You can also message our 24/7 WhatsApp support anytime."
  },
  {
    question: "I am a complete beginner with zero 3D experience. Can I learn this easily?",
    answer: "Yes, 100%! All courses are structured from zero level (from where to click, how to set up files, shortcut keys) up to advanced 4K photorealism. Everything is explained step-by-step in easy-to-understand Hindi & English."
  },
  {
    question: "Do I need an expensive high-end gaming PC to run these tools?",
    answer: "No. The bundle covers tools for all PC configurations: SketchUp, AutoCAD, and Photoshop run smoothly even on standard laptops. For rendering, we teach cloud AI tools and lightweight real-time renderers like D5 that run smoothly without breaking the bank."
  },
  {
    question: "Are software download links and installation guides included?",
    answer: "Yes! We provide complete safe download assistance and video installation tutorials for all required software versions so you never have to struggle or pay expensive commercial licenses when starting out."
  },
  {
    question: "What if I get stuck while practicing or software throws an error?",
    answer: "You are never alone! You get exclusive direct access to our 24/7 WhatsApp Support Team. Whenever you face a doubt, software crash, or lighting glitch, message us on WhatsApp and our team will guide you step-by-step."
  },
  {
    question: "Is there a Skill Certificate provided for my resume and portfolio?",
    answer: "Yes, an official verified Skill Certificate is included at zero extra charge. You can proudly add it to your CV, LinkedIn, and client portfolio."
  },
  {
    question: "Why is the price only ₹799 instead of ₹3,699?",
    answer: "We want every aspiring designer, student, and studio owner to have access to world-class 3D education without paying lakhs to coaching institutes. This ₹799 promotional price is strictly valid for the current batch and will increase to ₹3,699 once the current batch closes."
  }
];

export const INCOME_TIERS = [
  {
    label: 'Single 3D Room Render',
    before: 'Struggling at ₹500 - ₹1,000',
    after: 'Confidently charging ₹4,500 - ₹8,000+',
    icon: '🖼️',
    tip: 'Deliver in 2 hours with D5 + AI'
  },
  {
    label: 'Complete 3BHK Flat 3D Design',
    before: 'Rejected or underpaid at ₹10,000',
    after: 'Closing ₹50,000 - ₹1,20,000 contracts',
    icon: '🏠',
    tip: 'Full walkthrough + VR presentation'
  },
  {
    label: 'Client Project Approval Speed',
    before: '2-3 Weeks of messy revisions',
    after: 'Approved on First Meeting (AI Concepts)',
    icon: '⚡',
    tip: 'Show 10 instant variations on the spot'
  },
  {
    label: 'Monthly Earning Potential',
    before: '₹15,000 - ₹25,000 Fixed Salary',
    after: '₹75,000 - ₹1,50,000+ (Freelance/Studio)',
    icon: '💼',
    tip: 'Work with local & international NRI clients'
  }
];

/* ─── LOGO (MINIMAL ARCHITECTURAL) ─── */
export const Logo = () => (
  <div className="flex items-center gap-2.5 cursor-pointer group" onClick={() => window.location.href = '/'}>
    <div className="size-7 rounded-md bg-zinc-950 text-white font-mono font-bold text-xs flex items-center justify-center tracking-tighter">
      AV
    </div>
    <div className="flex flex-col leading-none text-left">
      <div className="flex items-center gap-1.5">
        <span className="font-heading font-semibold text-base tracking-tight text-zinc-950">AVADA</span>
        <span className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded border border-zinc-200 bg-zinc-100 text-zinc-800">PRO 3D</span>
      </div>
      <span className="text-[9px] font-mono uppercase tracking-wider text-zinc-500 mt-0.5">Architecture & Interior AI</span>
    </div>
  </div>
);

/* ─── PATTERN DIVIDER ─── */
export const Pattern = ({ className = '' }: { className?: string }) => (
  <div className={`crosshatch-pattern ${className}`} />
);

/* ─── SOCIAL PROOF TOAST (CLEAN MINIMAL) ─── */
export const SocialProofToast: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const show = () => {
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
        setTimeout(() => setIdx(p => (p + 1) % RAW_JOINERS.length), 400);
      }, 3500);
    };
    const t1 = setTimeout(show, 3000);
    const t2 = setInterval(show, 11000);
    return () => { clearTimeout(t1); clearInterval(t2); };
  }, []);
  const j = RAW_JOINERS[idx];
  return (
    <div className={`fixed bottom-20 sm:bottom-24 left-3 z-[70] max-w-[320px] transition-all duration-500 ease-out ${visible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-95 pointer-events-none'}`}>
      <div className="bg-white/95 text-zinc-900 backdrop-blur-md border border-zinc-200 rounded-xl p-2.5 shadow-lg flex items-center gap-2.5">
        <div className="size-8 rounded-lg bg-zinc-900 text-white flex items-center justify-center font-mono font-bold text-xs shrink-0">
          {j.name.charAt(0)}
        </div>
        <div className="overflow-hidden min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <p className="text-xs font-semibold text-zinc-900 truncate">{j.name}</p>
            <span className="text-[10px] text-zinc-500 font-mono shrink-0">• {j.city}</span>
          </div>
          <p className="text-[10px] text-zinc-500 truncate">Enrolled in 10-Course Package • <span className="text-emerald-600 font-medium font-mono">{j.time}</span></p>
        </div>
        <div className="shrink-0 size-2 rounded-full bg-emerald-500 animate-pulse"></div>
      </div>
    </div>
  );
};

/* ─── SOCIAL PLATFORM ICONS (SUBTLE & CRISP) ─── */
export const InstagramIcon = ({ className = "size-3.5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

export const FacebookIcon = ({ className = "size-3.5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

export const XIcon = ({ className = "size-3" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

/* ─── 14 REALISTIC SOCIAL COMMUNITY COMMENTS ─── */
export const SOCIAL_COMMENTS = [
  {
    name: "Karan Sharma",
    handle: "@karan.archstudio",
    platform: "instagram" as const,
    gradient: "from-purple-500 via-pink-500 to-orange-400",
    comment: "The D5 real-time walkthrough workflow saved me 20+ hours on my first villa project. Client approved on the spot 🔥",
    time: "2h ago",
    likes: 54,
    verified: true
  },
  {
    name: "Neha Verma",
    handle: "@neha_interiors",
    platform: "x" as const,
    gradient: "from-zinc-700 to-zinc-950",
    comment: "Institutes were asking ₹45k for outdated CAD & 3ds Max. Got all 10 courses here for ₹799. Best investment of 2026 honestly.",
    time: "5h ago",
    likes: 112,
    verified: true
  },
  {
    name: "Rohit Mehta",
    handle: "@rohit.contractor",
    platform: "facebook" as const,
    gradient: "from-blue-600 to-indigo-700",
    comment: "The client quotation & contract kit alone helped me lock a 50% advance token. No more client payment disputes 🙏",
    time: "1d ago",
    likes: 38,
    verified: false
  },
  {
    name: "Ananya Iyer",
    handle: "@ananya.3dspace",
    platform: "instagram" as const,
    gradient: "from-pink-500 to-rose-600",
    comment: "10,000+ 3D models library is insane quality! Modular kitchens and luxury sofas just drag and drop into SketchUp.",
    time: "3h ago",
    likes: 89,
    verified: true
  },
  {
    name: "Vikramaditya S.",
    handle: "@vikram_renderlab",
    platform: "x" as const,
    gradient: "from-emerald-600 to-teal-800",
    comment: "From zero 3D experience to photorealistic living room renders in 12 days. Even my senior architect was shocked.",
    time: "8h ago",
    likes: 76,
    verified: false
  },
  {
    name: "Tanvi Kulkarni",
    handle: "@tanvi_creativestudio",
    platform: "instagram" as const,
    gradient: "from-amber-500 to-orange-600",
    comment: "V-Ray lighting was a nightmare before this. Finally understood dome light & HDRI setup simply without 40hrs of fluff.",
    time: "1d ago",
    likes: 43,
    verified: true
  },
  {
    name: "Siddharth Rao",
    handle: "@siddharth.bim",
    platform: "facebook" as const,
    gradient: "from-blue-500 to-blue-700",
    comment: "Got stuck during Revit to Lumion live sync at 11 PM. WhatsApp support team replied in 4 mins and solved it!",
    time: "2d ago",
    likes: 67,
    verified: false
  },
  {
    name: "Pooja Deshmukh",
    handle: "@pooja_archconcept",
    platform: "instagram" as const,
    gradient: "from-violet-500 to-purple-600",
    comment: "The AI prompt bible is like a cheat code. Generated 6 exterior variations in front of client during our zoom call 🤯",
    time: "4h ago",
    likes: 95,
    verified: true
  },
  {
    name: "Aditya Nair",
    handle: "@aditya_visuals",
    platform: "x" as const,
    gradient: "from-cyan-600 to-blue-700",
    comment: "Made my ₹799 back 15x over on my very first Upwork rendering gig. Google Drive access link arrived in 30 seconds.",
    time: "12h ago",
    likes: 140,
    verified: true
  },
  {
    name: "Ritika Sen",
    handle: "@ritika_interiorcraft",
    platform: "instagram" as const,
    gradient: "from-rose-500 to-red-600",
    comment: "Enscape walkthroughs with VR presentation closed my biggest turnkey flat project. Highly recommend to all students.",
    time: "6h ago",
    likes: 62,
    verified: true
  },
  {
    name: "Manish Gupta",
    handle: "@manish.civilinfra",
    platform: "facebook" as const,
    gradient: "from-blue-700 to-blue-900",
    comment: "Civil engineer here with zero creative background. The step-by-step Hindi/English explanation made 3D modeling so simple.",
    time: "3d ago",
    likes: 51,
    verified: false
  },
  {
    name: "Divya Reddy",
    handle: "@divya_elevations",
    platform: "instagram" as const,
    gradient: "from-amber-600 to-pink-600",
    comment: "Course 10 (AI Render generator) + SketchUp is magic. Render draft that used to take 5 hours now takes 2 minutes.",
    time: "7h ago",
    likes: 83,
    verified: true
  },
  {
    name: "Harsh Vardhan",
    handle: "@harsh_designstudio",
    platform: "x" as const,
    gradient: "from-zinc-800 to-black",
    comment: "Software download and installation guides worked seamlessly without license errors on Windows 11. 10/10 execution.",
    time: "1d ago",
    likes: 91,
    verified: false
  },
  {
    name: "Shreya Mukherjee",
    handle: "@shreya.spaceplanner",
    platform: "instagram" as const,
    gradient: "from-fuchsia-600 to-pink-500",
    comment: "Got verified skill certificate for my portfolio. Added to my LinkedIn and already got 2 freelance inquiries!",
    time: "10h ago",
    likes: 104,
    verified: true
  }
];

/* ─── INSTAGRAM / X / FACEBOOK COMMENT SLIDER COMPONENT ─── */
export const SocialCommentsSlider: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const touchStartXRef = useRef<number | null>(null);
  const currentDragRef = useRef<number>(0);
  const resumeTimerRef = useRef<any>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    setIsPaused(true);
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartXRef.current !== null) {
      const diff = e.touches[0].clientX - touchStartXRef.current;
      currentDragRef.current = diff;
      setDragOffset(diff);
    }
  };

  const handleTouchEnd = () => {
    touchStartXRef.current = null;
    resumeTimerRef.current = setTimeout(() => {
      setDragOffset(0);
      currentDragRef.current = 0;
      setIsPaused(false);
    }, 1600);
  };

  const nudge = (direction: 'left' | 'right') => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    setIsPaused(true);
    const shift = direction === 'left' ? -280 : 280;
    setDragOffset(prev => prev + shift);
    resumeTimerRef.current = setTimeout(() => {
      setDragOffset(0);
      setIsPaused(false);
    }, 2500);
  };

  return (
    <div className="w-full my-6 overflow-hidden select-none">
      {/* Header Badge with subtle mobile navigation arrows */}
      <div className="flex items-center justify-center gap-2 mb-3 px-3 text-center">
        <button
          type="button"
          onClick={() => nudge('right')}
          className="size-6 rounded-full bg-zinc-100 hover:bg-zinc-200 border border-zinc-200/90 text-zinc-600 flex items-center justify-center transition-transform active:scale-90 shadow-2xs cursor-pointer"
          aria-label="Previous review"
          title="Previous"
        >
          <ChevronLeft className="size-3.5" />
        </button>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200/90 text-[11px] font-heading font-semibold text-zinc-800 shadow-2xs">
          <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Student's Write</span>
          <span className="text-zinc-300">•</span>
          <span className="inline-flex items-center gap-1.5 text-zinc-500">
            <InstagramIcon className="size-3 text-[#E1306C]" />
            <XIcon className="size-2.5 text-zinc-900" />
            <FacebookIcon className="size-3 text-[#1877F2]" />
          </span>
        </span>

        <button
          type="button"
          onClick={() => nudge('left')}
          className="size-6 rounded-full bg-zinc-100 hover:bg-zinc-200 border border-zinc-200/90 text-zinc-600 flex items-center justify-center transition-transform active:scale-90 shadow-2xs cursor-pointer"
          aria-label="Next review"
          title="Next"
        >
          <ChevronRight className="size-3.5" />
        </button>
      </div>

      {/* Infinite scrolling ticker with touch & swipe support */}
      <div 
        className="relative w-full overflow-hidden touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-16 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-16 bg-gradient-to-l from-white to-transparent z-10" />

        <div 
          className="flex gap-3 animate-scroll-left hover:pause w-max py-1.5 px-2 transition-transform duration-200 ease-out"
          style={{
            animationPlayState: isPaused ? 'paused' : 'running',
            transform: dragOffset !== 0 ? `translate3d(${dragOffset}px, 0, 0)` : undefined,
          }}
        >
          {[...SOCIAL_COMMENTS, ...SOCIAL_COMMENTS].map((item, idx) => (
            <div 
              key={idx} 
              className="w-[270px] sm:w-[290px] shrink-0 bg-white border border-zinc-200/90 rounded-2xl p-3 shadow-2xs hover:shadow-xs hover:border-zinc-300 text-left flex flex-col justify-between"
              style={{ contain: 'content' }}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className={`size-7 rounded-full bg-gradient-to-tr ${item.gradient} text-white flex items-center justify-center font-heading font-bold text-[11px] shrink-0 shadow-2xs`}>
                      {item.name.charAt(0)}
                    </div>
                    <div className="min-w-0 leading-tight">
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-heading font-bold text-zinc-950 truncate">{item.name}</span>
                        {item.verified && (
                          <span className="text-blue-500 text-[10px] leading-none" title="Verified Designer">✓</span>
                        )}
                      </div>
                      <span className="text-[10px] font-mono text-zinc-400 block truncate">{item.handle}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="text-[10px] font-mono text-zinc-400">{item.time}</span>
                    <span className="shrink-0">
                      {item.platform === 'instagram' && <InstagramIcon className="size-3.5 text-[#E1306C]" />}
                      {item.platform === 'facebook' && <FacebookIcon className="size-3.5 text-[#1877F2]" />}
                      {item.platform === 'x' && <XIcon className="size-3 text-zinc-900" />}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-zinc-700 leading-snug line-clamp-3">
                  {item.comment}
                </p>
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 mt-2.5 pt-1.5 border-t border-zinc-100">
                <span className="text-emerald-700 font-medium">✓ Enrolled Student</span>
                <span className="flex items-center gap-1 text-zinc-500">
                  <Heart size={10} className="fill-red-500 text-red-500" />
                  <span>{item.likes}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ─── STUDENT RENDERS SHOWCASE WITH BATTERY SAVER & TOUCH SWIPE OPTIMIZATION ─── */
export const StudentRendersShowcase: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [dragOffset1, setDragOffset1] = useState(0);
  const [dragOffset2, setDragOffset2] = useState(0);
  const touchStartXRef = useRef<number | null>(null);
  const resumeTimerRef = useRef<any>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    setIsPaused(true);
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartXRef.current !== null) {
      const diff = e.touches[0].clientX - touchStartXRef.current;
      setDragOffset1(diff);
      setDragOffset2(-diff);
    }
  };

  const handleTouchEnd = () => {
    touchStartXRef.current = null;
    resumeTimerRef.current = setTimeout(() => {
      setDragOffset1(0);
      setDragOffset2(0);
      setIsPaused(false);
    }, 1600);
  };

  const nudge = (direction: 'left' | 'right') => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    setIsPaused(true);
    const shift = direction === 'left' ? -280 : 280;
    setDragOffset1(prev => prev + shift);
    setDragOffset2(prev => prev - shift);
    resumeTimerRef.current = setTimeout(() => {
      setDragOffset1(0);
      setDragOffset2(0);
      setIsPaused(false);
    }, 2500);
  };

  const BADGES_ROW1 = ['D5 Render 4K', 'SketchUp + V-Ray', '3ds Max + Corona', 'Lumion Pro', 'Enscape Architecture', 'D5 Exterior Villa', 'Revit to 3D', 'V-Ray Photorealism'];
  const BADGES_ROW2 = ['SketchUp + D5', 'V-Ray Interior', 'Lumion Cinematic', '3ds Max Architecture', 'Enscape Realtime', 'D5 Luxury Living', 'AutoCAD to 3D', 'AI Render Workflow'];

  return (
    <div className="w-full">
      {/* Header Badge with subtle interactive nudge buttons */}
      <div className="px-3 sm:px-4 mb-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-1.5">
          <button
            type="button"
            onClick={() => nudge('right')}
            className="size-6 rounded-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 flex items-center justify-center transition-transform active:scale-90 shadow-2xs cursor-pointer"
            aria-label="Previous renders"
            title="Previous"
          >
            <ChevronLeft className="size-3.5" />
          </button>

          <span className="text-[10px] sm:text-xs font-mono font-medium text-zinc-300 bg-zinc-800 border border-zinc-700 px-3 py-0.5 rounded-full">
            Student Results
          </span>

          <button
            type="button"
            onClick={() => nudge('left')}
            className="size-6 rounded-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 flex items-center justify-center transition-transform active:scale-90 shadow-2xs cursor-pointer"
            aria-label="Next renders"
            title="Next"
          >
            <ChevronRight className="size-3.5" />
          </button>
        </div>

        <div className="font-hand text-lg sm:text-xl text-amber-400 font-bold animate-wiggle">
          ✨ No prior architectural background required!
        </div>
      </div>

      <div 
        className="flex flex-col gap-3 touch-pan-y select-none"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
      >
        {/* ROW 1 */}
        <div 
          className="flex gap-3 animate-scroll-left hover:pause transition-transform duration-200 ease-out"
          style={{
            animationPlayState: isPaused ? 'paused' : 'running',
            transform: dragOffset1 !== 0 ? `translate3d(${dragOffset1}px, 0, 0)` : undefined,
          }}
        >
          {[...PAGE_PREVIEWS_ROW1, ...PAGE_PREVIEWS_ROW1].map((img, i) => (
            <div 
              key={i} 
              className="w-[200px] sm:w-[300px] shrink-0 aspect-video rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900 relative shadow-sm"
              style={{ contain: 'content' }}
            >
              <img 
                src={img} 
                alt="3D Architecture & Interior Render" 
                className="w-full h-full object-cover" 
                decoding="async"
              />
              <div className="absolute bottom-2 left-2 bg-black/80 backdrop-blur-xs px-2 py-0.5 rounded text-[9px] font-mono text-zinc-200 border border-white/10 flex items-center gap-1 pointer-events-none">
                <span className="size-1 rounded-full bg-emerald-400" />
                <span>{BADGES_ROW1[i % BADGES_ROW1.length]}</span>
              </div>
            </div>
          ))}
        </div>

        {/* ROW 2 */}
        <div 
          className="flex gap-3 animate-scroll-right hover:pause transition-transform duration-200 ease-out"
          style={{
            animationPlayState: isPaused ? 'paused' : 'running',
            transform: dragOffset2 !== 0 ? `translate3d(${dragOffset2}px, 0, 0)` : undefined,
          }}
        >
          {[...PAGE_PREVIEWS_ROW2, ...PAGE_PREVIEWS_ROW2].map((img, i) => (
            <div 
              key={i} 
              className="w-[200px] sm:w-[300px] shrink-0 aspect-video rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900 relative shadow-sm"
              style={{ contain: 'content' }}
            >
              <img 
                src={img} 
                alt="3D Architecture & Interior Render" 
                className="w-full h-full object-cover" 
                decoding="async"
              />
              <div className="absolute bottom-2 left-2 bg-black/80 backdrop-blur-xs px-2 py-0.5 rounded text-[9px] font-mono text-zinc-200 border border-white/10 flex items-center gap-1 pointer-events-none">
                <span className="size-1 rounded-full bg-emerald-400" />
                <span>{BADGES_ROW2[i % BADGES_ROW2.length]}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
