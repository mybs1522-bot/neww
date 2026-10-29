import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, Star, CheckCircle, CheckCircle2, X, ChevronDown, Sparkles, 
  Download, Mail, Lock, Loader2, ShieldCheck, Zap, Gift, DollarSign, MessageCircle
} from 'lucide-react';
import { COURSES, BUNDLE_PRICE, BUNDLE_ORIGINAL_PRICE } from '../constants';
import { openRazorpayCheckout } from '../services/razorpay';
import {
  Logo, Pattern, SocialProofToast,
  PAIN_TRIGGERS_INDIAN, SOLUTION_PILLARS, WHO_IS_THIS_FOR, TRANSFORMATION_STORIES,
  FREE_BONUSES, VALUE_STACK_ITEMS, TESTIMONIALS_LANDING, FAQ_ITEMS_LANDING,
  PAGE_PREVIEWS_ROW1, PAGE_PREVIEWS_ROW2
} from './LandingHelpers';

/* ─── REUSABLE PREMIUM CTA WITH TIMER ─── */
const CtaWithTimer = ({ 
  timeLeft, 
  onClick, 
  variant = 'default', 
  title = 'Download All 12 Courses + 6 Free Bonuses',
  subtext = 'Instant Google Drive Access • 24/7 WhatsApp Support • Software Links Included'
}: { 
  timeLeft: { h: number; m: number; s: number }; 
  onClick: () => void; 
  variant?: 'default' | 'dark' | 'white';
  title?: string;
  subtext?: string;
}) => {
  const f = (v: number) => v.toString().padStart(2, '0');
  const isDark = variant === 'dark';

  return (
    <div className={`screen-line-before screen-line-after border ${
      isDark ? 'border-zinc-800 bg-zinc-900 text-white' : 'border-zinc-200 bg-zinc-50/90 text-zinc-950'
    } rounded-2xl md:rounded-3xl p-5 md:p-7 relative overflow-hidden max-w-xl mx-auto text-center shadow-xs`}>
      <div className="relative z-10 flex flex-col items-center gap-3">
        
        {/* Urgency Pill + Cursive Callout */}
        <div className="flex flex-col sm:flex-row items-center gap-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 bg-zinc-950 text-white rounded-full text-[10px] md:text-xs font-mono uppercase tracking-wider">
            <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>₹999 Today's Batch Closing</span>
          </div>
          <span className="font-hand text-base md:text-lg text-amber-700 font-bold animate-wiggle">
            ✦ Only ₹83 per course!
          </span>
        </div>

        {/* Countdown Flip Units */}
        <div className="flex items-center justify-center gap-1.5 my-0.5">
          {[
            { val: f(timeLeft.h), label: 'HOURS' },
            { val: f(timeLeft.m), label: 'MINS' },
            { val: f(timeLeft.s), label: 'SECS' }
          ].map((unit, i) => (
            <React.Fragment key={i}>
              <div className="flex flex-col items-center">
                <div className={`font-mono font-bold text-base md:text-lg px-2.5 py-1 rounded-lg border ${
                  isDark ? 'bg-zinc-950 text-white border-zinc-800' : 'bg-white text-zinc-950 border-zinc-200'
                } min-w-[42px] md:min-w-[48px] shadow-xs`}>
                  {unit.val}
                </div>
                <span className="text-[8px] font-mono font-medium text-zinc-500 tracking-wider mt-0.5">{unit.label}</span>
              </div>
              {i < 2 && <span className="text-base font-bold text-zinc-400 mb-3">:</span>}
            </React.Fragment>
          ))}
        </div>

        {/* Pricing Anchor */}
        <div className="flex items-baseline justify-center gap-2 md:gap-3 my-0.5">
          <span className="text-zinc-400 line-through text-xs md:text-sm font-mono">₹{BUNDLE_ORIGINAL_PRICE.toLocaleString('en-IN')}</span>
          <span className={`text-3xl md:text-4xl font-heading font-bold tracking-tight ${isDark ? 'text-white' : 'text-zinc-950'}`}>₹{BUNDLE_PRICE}</span>
          <span className="bg-emerald-500/15 text-emerald-700 border border-emerald-500/30 text-[10px] md:text-xs font-mono font-bold px-2 py-0.5 rounded-full">
            73% OFF
          </span>
        </div>

        {/* Large Action Button */}
        <button
          onClick={onClick}
          className={`w-full py-3.5 md:py-4 px-6 rounded-full font-heading font-semibold text-sm md:text-base transition-all flex items-center justify-center gap-2 group cursor-pointer animate-pulse-slow ${
            isDark 
              ? 'bg-white text-zinc-950 hover:bg-zinc-100 shadow-lg' 
              : 'btn-premium'
          }`}
        >
          <Zap size={16} className={isDark ? 'fill-zinc-950' : 'fill-white'} />
          <span>{title}</span>
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform shrink-0" />
        </button>

        {/* Cursive Risk-Reversal Callout */}
        <div className="font-hand text-base md:text-lg text-emerald-700 font-bold -rotate-1">
          🔒 100% Risk-Free • 7-Day Money-Back Guarantee
        </div>

        {/* Trust Points */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 text-[10px] md:text-[11px] text-zinc-500 font-medium">
          <span className="inline-flex items-center gap-1">
            <CheckCircle2 size={12} className="text-emerald-600" /> Razorpay UPI/Cards
          </span>
          <span>•</span>
          <span className="inline-flex items-center gap-1">
            <CheckCircle2 size={12} className="text-emerald-600" /> Instant Google Drive Link
          </span>
          <span>•</span>
          <span className="inline-flex items-center gap-1">
            <CheckCircle2 size={12} className="text-emerald-600" /> ISO Skill Certificate
          </span>
        </div>
      </div>
    </div>
  );
};

const LandingPage: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(() => {
    const D = (3 * 3600 + 36 * 60 + 20) * 1000, r = D - (Date.now() % D);
    return { h: Math.floor((r / 3600000) % 24), m: Math.floor((r / 60000) % 60), s: Math.floor((r / 1000) % 60) };
  });

  const [showStickyBar, setShowStickyBar] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [calculatorProjects, setCalculatorProjects] = useState<number>(2);
  const [activeCategoryTab, setActiveCategoryTab] = useState<string>('All');
  const [showExitModal, setShowExitModal] = useState(false);
  const [hasShownExitModal, setHasShownExitModal] = useState(false);

  // Payment modal states
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [phoneError, setPhoneError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState<string | null>(null);
  const [studentCount, setStudentCount] = useState(52480);

  // Coupon states
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [showCouponInput, setShowCouponInput] = useState(false);
  const finalPrice = Math.round(BUNDLE_PRICE * (1 - discountPercent / 100));

  useEffect(() => { window.scrollTo(0, 0); }, []);

  // Timer Tick
  useEffect(() => {
    const calc = () => {
      const D = (3 * 3600 + 36 * 60 + 20) * 1000, now = Date.now(), r = D - (now % D);
      setTimeLeft({ h: Math.floor((r / 3600000) % 24), m: Math.floor((r / 60000) % 60), s: Math.floor((r / 1000) % 60) });
    };
    const t = setInterval(calc, 1000); calc(); return () => clearInterval(t);
  }, []);

  // Sticky Bar & Student Count
  useEffect(() => {
    const h = () => setShowStickyBar(window.scrollY > 350);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);
  useEffect(() => {
    const t = setInterval(() => setStudentCount(c => c + 1), 5000);
    return () => clearInterval(t);
  }, []);

  // Exit-Intent Trigger
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShownExitModal && !showPaymentModal && !paymentSuccess) {
        setShowExitModal(true);
        setHasShownExitModal(true);
      }
    };
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasShownExitModal, showPaymentModal, paymentSuccess]);

  const formatTime = (val: number) => val.toString().padStart(2, '0');
  const validateEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim());

  const openPaymentModal = () => {
    setShowExitModal(false);
    setShowPaymentModal(true);
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'InitiateCheckout');
    }
  };

  const handlePayment = () => {
    let hasError = false;
    const cleanPhone = phone.replace(/\D/g, '').replace(/^91/, '').slice(-10);
    const cleanEmail = email.trim();

    if (!cleanPhone || cleanPhone.length < 10) { 
      setPhoneError(true); 
      hasError = true; 
    } else { 
      setPhoneError(false); 
    }

    if (!cleanEmail || !validateEmail(cleanEmail)) { 
      setEmailError(true); 
      hasError = true; 
    } else { 
      setEmailError(false); 
    }

    if (hasError) return;

    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'AddPaymentInfo');
    }

    setIsLoading(true);
    setPaymentError('');

    openRazorpayCheckout({
      amount: finalPrice,
      courseIds: COURSES.map(c => c.id),
      userPhone: cleanPhone,
      userEmail: cleanEmail,
      onSuccess: (paymentId) => {
        setIsLoading(false);
        setPaymentSuccess(paymentId);
        setShowPaymentModal(false);
        
        if (typeof window !== 'undefined' && (window as any).fbq) {
          (window as any).fbq('track', 'Purchase', {
            value: finalPrice,
            currency: 'INR'
          });
        }
      },
      onCancel: () => {
        setIsLoading(false);
      },
      onError: (err) => {
        setIsLoading(false);
        setPaymentError('Payment failed. Please retry with UPI or Card.');
        console.error('Razorpay Error:', err);
      }
    });
  };

  const applyCouponCodeDirect = (code: string) => {
    const coupons: Record<string, number> = {
      'SUNDAY50': 50,
      'GTR50': 50,
      'TRTED70': 70,
      'SPECIAL50': 50,
      'AVADA50': 50
    };
    const upper = code.trim().toUpperCase();
    if (coupons[upper]) {
      setAppliedCoupon(upper);
      setDiscountPercent(coupons[upper]);
      setCouponError(null);
      setShowCouponInput(true);
    } else {
      setCouponError('Invalid Coupon Code');
    }
  };

  const filteredCourses = activeCategoryTab === 'All'
    ? COURSES
    : activeCategoryTab === 'Planning'
    ? COURSES.filter(c => ['1', '2'].includes(c.id))
    : activeCategoryTab === '3D Modeling'
    ? COURSES.filter(c => ['3', '4', '12'].includes(c.id))
    : activeCategoryTab === 'Photorealism'
    ? COURSES.filter(c => ['5', '6', '7', '8'].includes(c.id))
    : COURSES.filter(c => ['9', '10', '11'].includes(c.id));

  return (
    <div className="min-h-screen bg-white text-zinc-950 font-sans overflow-x-hidden selection:bg-zinc-200 selection:text-zinc-900">
      <div className="max-w-screen overflow-x-hidden">
        <div className="mx-auto px-4 md:max-w-4xl">
          <main>
            
            {/* ═══ 1. HERO SECTION (10/10 CONVERSIONS FOR COLD AUDIENCE) ═══ */}
            <section className="screen-line-before screen-line-after border-x border-grid pt-6 sm:pt-10 pb-8 bg-white text-center">
              <div className="px-2 sm:px-4">
                
                {/* Social Proof Pill + Wiggle Cursive */}
                <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-100 border border-zinc-200 rounded-full text-[11px] sm:text-xs font-mono text-zinc-800">
                    <Star size={12} className="fill-amber-400 text-amber-400" />
                    <span>Rated <strong>4.9/5</strong> by <strong>52,000+</strong> Indian Designers</span>
                  </div>
                  <span className="font-hand text-base sm:text-lg text-amber-700 font-bold animate-wiggle">
                    ✦ Complete 12-in-1 Pass
                  </span>
                </div>

                {/* Outcome Headline with Highlighter */}
                <h1 className="font-heading font-bold text-zinc-950 tracking-tight leading-[1.15] mb-3">
                  <span className="block text-2xl sm:text-4xl md:text-5xl">
                    12 Courses to Design <span className="highlight-yellow">Floor Plans, 3D Interiors & Exteriors</span>, <span className="highlight-green">Image & Video renders</span>.
                  </span>
                  <span className="block text-xs sm:text-sm font-medium text-zinc-600 mt-2 uppercase tracking-wide">
                    UNBELIEVABLE PRICE OF JUST <span className="line-through font-mono">₹3,699</span> <strong className="text-zinc-950 font-bold font-mono">₹999 (one-time)</strong>, GUARANTEED FREELANCE PROJECTS FOR ALL STUDENTS.
                  </span>
                </h1>

                {/* Subtitle with High-Impact Highlight */}
                <div className="max-w-2xl mx-auto mb-4">
                  <p className="text-sm sm:text-base text-zinc-700 leading-relaxed font-normal">
                    Stop doing slow, low-paying 2D line work. Learn how to take projects from <strong>scratch to photorealistic delivery</strong> and start closing <span className="highlight-yellow font-bold text-zinc-950">₹25,000 to ₹50,000+</span> client contracts from home!
                  </p>
                  <div className="font-hand text-lg sm:text-xl text-emerald-700 font-bold -rotate-1 mt-1.5">
                    ✨ Zero 3D experience needed • 100% beginner friendly!
                  </div>
                </div>

                {/* Core Category Pills */}
                <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-5">
                  <span className="bg-zinc-50 text-zinc-800 border border-zinc-200 text-xs sm:text-sm font-medium px-3 py-1 rounded-full">
                    📐 2D Floor Planning
                  </span>
                  <span className="bg-zinc-50 text-zinc-800 border border-zinc-200 text-xs sm:text-sm font-medium px-3 py-1 rounded-full">
                    🛋️ 3D Interior Design
                  </span>
                  <span className="bg-zinc-50 text-zinc-800 border border-zinc-200 text-xs sm:text-sm font-medium px-3 py-1 rounded-full">
                    🏛️ 3D Exterior Elevation
                  </span>
                  <span className="bg-zinc-50 text-zinc-800 border border-zinc-200 text-xs sm:text-sm font-medium px-3 py-1 rounded-full">
                    ⚡ 4K Photorealism & AI
                  </span>
                </div>

                {/* Video Player Box */}
                <div className="w-full max-w-3xl mx-auto mb-6 bg-zinc-950 p-2 sm:p-2.5 rounded-2xl shadow-xl border border-zinc-800 relative overflow-hidden">
                  <div className="flex items-center justify-between px-3 py-1.5 text-[11px] text-zinc-400 font-mono border-b border-zinc-800 mb-2">
                    <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                      <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" /> PREVIEW
                    </span>
                    <span>30-Day Step-by-Step Blueprint (Self-Paced)</span>
                  </div>
                  <div className="w-full overflow-hidden rounded-xl bg-black" style={{ position: 'relative', paddingTop: '56.25%' }}>
                    <iframe 
                      src="https://iframe.mediadelivery.net/embed/489113/a214b199-e64a-4eaf-af70-edfbc586e5fd?autoplay=true&loop=true&muted=true&preload=true&responsive=true" 
                      loading="lazy" 
                      style={{ border: 0, position: 'absolute', top: 0, height: '100%', width: '100%' }} 
                      allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;" 
                      allowFullScreen={true} 
                    />
                  </div>
                </div>

                {/* ═══ MOST IMPORTANT SALE POINTS BEFORE 1ST CTA (POINTERS ONLY) ═══ */}
                <div className="max-w-3xl mx-auto mb-6">
                  <div className="text-center mb-3">
                    <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-zinc-600 bg-zinc-100 border border-zinc-200 px-3 py-0.5 rounded-full">
                      ⚡ EVERYTHING YOU GET INSIDE
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-left">
                    {[
                      {
                        icon: '📐',
                        title: 'All 12 Industry Softwares Included',
                        desc: 'AutoCAD, Revit, SketchUp, 3ds Max, V-Ray, D5, Lumion, Midjourney AI',
                        highlight: 'highlight-yellow'
                      },
                      {
                        icon: '🛋️',
                        title: '10,000+ Ready 3D Indian Assets',
                        desc: 'Modular kitchens, wardrobes, luxury beds, sofas, pooja units — drag & drop',
                        highlight: 'highlight-green'
                      },
                      {
                        icon: '⚡',
                        title: 'Zero Experience Needed (Day 1 Blueprint)',
                        desc: 'Takes you from total beginner to creating 4K renders in 30 days',
                        highlight: 'highlight-yellow'
                      },
                      {
                        icon: '📁',
                        title: 'Instant Google Drive Access in 60s',
                        desc: 'Lifetime links sent on email & WhatsApp • Watch on phone or laptop',
                        highlight: 'highlight-green'
                      },
                      {
                        icon: '💬',
                        title: '24/7 Dedicated WhatsApp Doubt Help',
                        desc: 'Never get stuck on software crashes, lighting glitches, or install errors',
                        highlight: 'highlight-orange'
                      },
                      {
                        icon: '📜',
                        title: 'ISO Skill Certificate & Client Kit',
                        desc: 'Quotation templates, price calculator & scripts to lock 50% advance token',
                        highlight: 'highlight-yellow'
                      }
                    ].map((pt, i) => (
                      <div key={i} className="bg-zinc-50 border border-zinc-200/90 rounded-xl p-3 flex items-start gap-2.5 hover:border-zinc-300 transition-all">
                        <span className="text-xl shrink-0 mt-0.5">{pt.icon}</span>
                        <div>
                          <div className="font-heading font-bold text-zinc-950 text-xs sm:text-sm leading-snug">
                            {pt.title}
                          </div>
                          <p className="text-[11px] text-zinc-700 mt-0.5 leading-snug">
                            <span className={pt.highlight}>{pt.desc}</span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Primary Hero CTA (Right below pointers!) */}
                <div className="max-w-xl mx-auto mb-6">
                  <CtaWithTimer 
                    timeLeft={timeLeft} 
                    onClick={openPaymentModal} 
                    variant="default"
                    title="⚡ GET ALL 12 COURSES NOW"
                    subtext="Instant Access in 60 Seconds • UPI / GPay / Cards Accepted"
                  />
                </div>

                {/* Banner Below CTA */}
                <div className="max-w-3xl mx-auto mb-2 text-left">
                  <div className="overflow-hidden rounded-2xl border border-zinc-200 shadow-sm">
                    <img
                      src="/banner-1.jpg"
                      alt="Learn to Design Home, Offices & Villas"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>

              </div>
            </section>

            <Pattern />

            {/* ═══ 12 COURSES INCLUDED (JUST BELOW HERO SECTION) ═══ */}
            <section className="screen-line-before screen-line-after border-x border-grid py-6 sm:py-8 bg-white text-center overflow-hidden">
              <div className="px-3 sm:px-4 mb-4">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-zinc-950 tracking-tight">
                  12 Courses Included
                </h2>
              </div>

              {/* Seamless Infinite Marquee */}
              <div className="relative w-full overflow-hidden">
                <div className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-16 bg-gradient-to-r from-white to-transparent z-10" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-16 bg-gradient-to-l from-white to-transparent z-10" />

                <div className="flex gap-2.5 sm:gap-3.5 animate-scroll-right hover:pause w-max py-2 px-2">
                  {[...COURSES, ...COURSES].map((course, i) => (
                    <div 
                      key={i} 
                      onClick={openPaymentModal}
                      className="w-[130px] sm:w-[150px] shrink-0 bg-white border border-zinc-200/90 rounded-2xl overflow-hidden p-2.5 text-center shadow-2xs hover:shadow-xs hover:border-zinc-300 transition-all cursor-pointer group"
                    >
                      <div className="w-full aspect-square overflow-hidden rounded-xl bg-zinc-100 mb-2 border border-zinc-100">
                        <img 
                          src={course.imageUrl} 
                          alt={course.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            const target = e.currentTarget;
                            if (!target.src.includes('drive.google.com')) {
                              target.src = 'https://drive.google.com/thumbnail?id=' + course.id + '&sz=w800';
                            }
                          }}
                        />
                      </div>
                      <span className="text-xs sm:text-sm font-heading font-bold text-zinc-950 block truncate group-hover:text-zinc-700">
                        {course.title}
                      </span>
                      <span className="text-[10px] sm:text-xs font-mono text-zinc-500 block truncate mt-0.5">
                        {course.software}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <Pattern />

            {/* ═══ 2. INTERACTIVE ROI CALCULATOR (COLD AUDIENCE MONEY MAGNET) ═══ */}
            <section className="screen-line-before screen-line-after border-x border-grid py-8 sm:py-12 bg-zinc-950 text-white relative">
              <div className="px-3 sm:px-6 max-w-3xl mx-auto">
                <div className="text-center mb-5">
                  <div className="flex flex-wrap items-center justify-center gap-2 mb-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-zinc-800 text-zinc-300 text-xs font-mono uppercase tracking-wider border border-zinc-700">
                      <DollarSign size={13} /> Earning Calculator
                    </span>
                    <span className="font-hand text-lg sm:text-xl text-amber-300 font-bold animate-wiggle">
                      ✦ 1 project pays for this 30x over!
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white">
                    How Much Can You Earn As a 3D Designer in India?
                  </h2>
                  <p className="text-zinc-400 text-xs sm:text-sm mt-1">
                    Select how many 3D house elevation or room projects you plan to take per month:
                  </p>
                </div>

                {/* Calculator Box */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-xl">
                  {/* Project buttons */}
                  <div className="grid grid-cols-4 gap-2 mb-4">
                    {[1, 2, 3, 4].map((num) => (
                      <button
                        key={num}
                        onClick={() => setCalculatorProjects(num)}
                        className={`py-2 rounded-xl font-mono text-xs sm:text-sm transition-all cursor-pointer ${
                          calculatorProjects === num 
                            ? 'bg-white text-zinc-950 font-bold shadow-sm' 
                            : 'bg-zinc-800/80 text-zinc-300 border border-zinc-700/60 hover:bg-zinc-800'
                        }`}
                      >
                        {num} {num === 1 ? 'Project' : 'Projects'}/mo
                      </button>
                    ))}
                  </div>

                  {/* Real Earnings math */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-zinc-950 p-4 rounded-xl border border-zinc-800 mb-4">
                    <div className="text-center sm:text-left border-b sm:border-b-0 sm:border-r border-zinc-800 pb-2.5 sm:pb-0 sm:pr-3">
                      <span className="text-[10px] text-zinc-400 font-mono uppercase tracking-wider block">Average Market Rate</span>
                      <span className="text-base sm:text-lg font-bold text-zinc-100 mt-0.5 block">₹25,000 – ₹35,000 / project</span>
                      <span className="text-[11px] text-emerald-400 mt-0.5 block">✓ 2D Floor Plans + 3D Walkthroughs</span>
                    </div>
                    <div className="text-center sm:text-right pt-2 sm:pt-0 sm:pl-3">
                      <span className="text-[10px] text-zinc-400 font-mono uppercase tracking-wider block">Your Monthly Earning</span>
                      <span className="text-2xl sm:text-3xl font-mono font-bold text-white mt-0.5 block">
                        ₹{(calculatorProjects * 30000).toLocaleString('en-IN')}
                        <span className="text-xs text-zinc-400 font-normal">/mo</span>
                      </span>
                      <span className="text-[11px] text-zinc-400 mt-0.5 block">
                        ROI on ₹999 Course: <strong className="text-emerald-400 font-mono">{Math.round(((calculatorProjects * 30000) / 999) * 100).toLocaleString('en-IN')}% in 30 Days</strong>
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={openPaymentModal}
                    className="w-full py-3.5 rounded-full bg-white text-zinc-950 font-heading font-semibold text-sm sm:text-base hover:bg-zinc-100 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md animate-pulse-slow"
                  >
                    <span>Enroll Now & Start Earning</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </section>

            <Pattern />

            {/* ═══ 3. THE 4 PAIN POINTS (PUNCHY & HIGHLIGHTED) ═══ */}
            <section className="screen-line-before screen-line-after border-x border-grid py-8 sm:py-12 bg-white">
              <div className="px-3 sm:px-4">
                <div className="text-center mb-6">
                  <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-zinc-600 bg-zinc-100 border border-zinc-200 px-3 py-0.5 rounded-full">
                    ⚠️ ARE YOU STRUGGLING WITH THIS?
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-heading font-bold text-zinc-950 mt-2">
                    4 Critical Problems Stopping 95% of Indian Designers
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-3.5">
                  {PAIN_TRIGGERS_INDIAN.map((item, idx) => (
                    <div key={idx} className="bg-zinc-50 border border-zinc-200/90 rounded-xl p-3.5 sm:p-4 transition-all hover:border-zinc-400 flex items-start gap-3">
                      <span className="text-2xl shrink-0 p-1.5 bg-white rounded-lg border border-zinc-200">{item.emoji}</span>
                      <div>
                        <h3 className="font-heading font-semibold text-zinc-950 text-sm sm:text-base mb-1 leading-snug">{item.title}</h3>
                        <p className="text-zinc-600 text-xs leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <Pattern />

            {/* ═══ 4. THE 4-STAGE SOLUTION PILLARS ═══ */}
            <section className="screen-line-before screen-line-after border-x border-grid py-8 sm:py-12 bg-zinc-50/50">
              <div className="px-3 sm:px-4">
                <div className="text-center mb-6">
                  <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-zinc-700 bg-zinc-100 border border-zinc-200 px-3 py-0.5 rounded-full">
                    ⭐ THE 4-STAGE EXECUTION BLUEPRINT
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-heading font-bold text-zinc-950 mt-2">
                    From Blank Screen to Final Client Cheque
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {SOLUTION_PILLARS.map((col, idx) => (
                    <div key={idx} className="bg-white border border-zinc-200/90 hover:border-zinc-400 rounded-xl p-4 sm:p-5 transition-all flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-mono font-bold text-zinc-800 bg-zinc-100 border border-zinc-200 px-2 py-0.5 rounded">
                            {col.badge}
                          </span>
                          <span className="text-xl">{col.icon}</span>
                        </div>
                        <h3 className="font-heading font-bold text-zinc-950 text-base mb-1">{col.title}</h3>
                        <p className="text-zinc-600 text-xs leading-relaxed mb-3">{col.desc}</p>
                      </div>
                      
                      <div className="pt-2.5 border-t border-zinc-100 flex items-center gap-1.5 text-xs font-medium text-emerald-800 bg-emerald-50/60 p-2 rounded-lg border border-emerald-100">
                        <CheckCircle2 size={13} className="shrink-0 text-emerald-600" />
                        <span>Result: <strong className="font-semibold">{col.result}</strong></span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick CTA */}
                <div className="text-center mt-6">
                  <button
                    onClick={openPaymentModal}
                    className="btn-premium animate-pulse-slow px-6 py-3 text-xs sm:text-sm font-heading font-semibold inline-flex items-center gap-2 cursor-pointer"
                  >
                    <span>Master All 4 Stages Now</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </section>

            <Pattern />

            {/* ═══ 5. WHO IS THIS FOR ═══ */}
            <section className="screen-line-before screen-line-after border-x border-grid py-8 sm:py-12 bg-white">
              <div className="px-3 sm:px-4">
                <div className="text-center mb-6">
                  <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-zinc-700 bg-zinc-100 border border-zinc-200 px-3 py-0.5 rounded-full">
                    🎯 WHO IS THIS BUNDLE FOR?
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-heading font-bold text-zinc-950 mt-2">
                    Designed for Anyone Who Wants to Design Spaces
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {WHO_IS_THIS_FOR.map((item, idx) => (
                    <div key={idx} className="bg-zinc-50 border border-zinc-200/90 rounded-xl p-4 transition-all flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xl p-1 bg-white rounded-lg border border-zinc-200">{item.icon}</span>
                          <span className="text-[9px] font-mono font-bold uppercase tracking-wider bg-zinc-200/80 text-zinc-800 px-2 py-0.5 rounded border border-zinc-300/60">
                            {item.badge}
                          </span>
                        </div>
                        <h3 className="font-heading font-bold text-zinc-950 text-sm sm:text-base mb-1">{item.role}</h3>
                        <p className="text-zinc-600 text-xs leading-relaxed mb-3">{item.desc}</p>
                      </div>
                      <div className="pt-2 border-t border-zinc-200/60 flex items-center gap-1.5 text-xs font-medium text-emerald-700">
                        <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                        <span><span className="highlight-green">✓ 100% Ideal For You</span></span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <Pattern />

            {/* ═══ 6. ALL 12 MASTERCLASSES SHOWCASE (1:1 SQUARE THUMBNAILS!) ═══ */}
            <section className="screen-line-before screen-line-after border-x border-grid py-8 sm:py-12 bg-white">
              <div className="px-3 sm:px-4">
                <div className="text-center mb-6">
                  <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-zinc-700 bg-zinc-100 border border-zinc-200 px-3 py-0.5 rounded-full">
                    📚 12 FULL MASTERCLASSES
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-heading font-bold text-zinc-950 mt-2">
                    All 12 Industry Masterclasses in One Access Pass
                  </h2>

                  {/* Category Filter Tabs */}
                  <div className="flex flex-wrap items-center justify-center gap-1.5 mt-4">
                    {['All', 'Planning', '3D Modeling', 'Photorealism', 'AI & Unreal'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveCategoryTab(tab)}
                        className={`px-3 py-1 rounded-full text-xs font-mono transition-all cursor-pointer ${
                          activeCategoryTab === tab
                            ? 'bg-zinc-950 text-white font-medium shadow-xs'
                            : 'bg-zinc-100 text-zinc-600 border border-zinc-200 hover:bg-zinc-200'
                        }`}
                      >
                        {tab} ({tab === 'All' ? '12' : tab === 'Planning' ? '2' : tab === '3D Modeling' ? '3' : tab === 'Photorealism' ? '4' : '3'})
                      </button>
                    ))}
                  </div>
                </div>

                {/* Courses Grid with 1:1 SQUARE THUMBNAILS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  {filteredCourses.map((c) => (
                    <div key={c.id} className="bg-white border border-zinc-200 rounded-2xl overflow-hidden hover:border-zinc-400 transition-all flex flex-col justify-between shadow-xs">
                      <div>
                        {/* 1:1 SQUARE THUMBNAIL */}
                        <div className="relative aspect-square overflow-hidden bg-zinc-100 border-b border-zinc-200">
                          <img 
                            src={c.imageUrl} 
                            alt={c.title} 
                            className="w-full h-full object-cover"
                            loading="lazy"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              const target = e.currentTarget;
                              if (!target.src.includes('drive.google.com')) {
                                target.src = 'https://drive.google.com/thumbnail?id=' + c.id + '&sz=w800';
                              }
                            }}
                          />
                          <div className="absolute top-2.5 left-2.5 bg-zinc-950/85 backdrop-blur-xs text-white text-[9px] font-mono font-medium px-2 py-0.5 rounded border border-white/10">
                            {c.software}
                          </div>
                          <div className="absolute top-2.5 right-2.5 bg-emerald-600 text-white text-[9px] font-mono font-medium px-2 py-0.5 rounded shadow-xs">
                            {c.students} Learners
                          </div>
                        </div>

                        {/* Course Content */}
                        <div className="p-3.5 sm:p-4">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-heading font-bold text-zinc-950 text-base">{c.title}</h3>
                            <span className="text-[10px] font-mono font-semibold text-zinc-700 bg-zinc-100 px-1.5 py-0.5 rounded border border-zinc-200">₹{c.price} Val</span>
                          </div>
                          <p className="text-xs text-zinc-600 mb-2.5 line-clamp-2 leading-relaxed">{c.description}</p>

                          <div className="space-y-1 border-t border-zinc-100 pt-2">
                            {c.learningPoints.map((pt, pIdx) => (
                              <div key={pIdx} className="flex items-start gap-1.5 text-[11px] text-zinc-700">
                                <CheckCircle size={12} className="text-zinc-900 shrink-0 mt-0.5" />
                                <span>{pt}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="p-3.5 pt-0">
                        <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-1.5 text-center text-[10px] font-mono text-zinc-700 flex items-center justify-center gap-1.5">
                          <CheckCircle2 size={12} className="text-emerald-600" />
                          <span>Full Lifetime Access Included in ₹999</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </section>

            <Pattern />

            {/* ═══ 7. STUDENT WORK & RENDERS ═══ */}
            <section className="screen-line-before screen-line-after border-x border-grid py-8 sm:py-12 bg-zinc-950 text-white overflow-hidden">
              <div className="px-3 sm:px-4 mb-5 text-center">
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-zinc-300 bg-zinc-800 border border-zinc-700 px-3 py-0.5 rounded-full">
                  📸 100% REAL STUDENT RESULTS
                </span>
                <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white mt-2">
                  See What Beginners Created in Just 30 Days
                </h2>
                <div className="font-hand text-lg sm:text-xl text-amber-400 font-bold animate-wiggle mt-1">
                  ✨ No prior architectural background required!
                </div>
              </div>

              <div className="flex flex-col gap-3">
                {/* ROW 1 */}
                <div className="flex gap-3 animate-scroll-left hover:pause">
                  {[...PAGE_PREVIEWS_ROW1, ...PAGE_PREVIEWS_ROW1].map((img, i) => (
                    <div key={i} className="w-[200px] sm:w-[300px] shrink-0 aspect-video rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900 relative">
                      <img src={img} alt="Student 3D Render" className="w-full h-full object-cover" loading="lazy" />
                      <div className="absolute bottom-2 left-2 bg-black/80 px-2 py-0.5 rounded text-[9px] font-mono text-zinc-300 border border-white/10">
                        Avada Student Project
                      </div>
                    </div>
                  ))}
                </div>

                {/* ROW 2 */}
                <div className="flex gap-3 animate-scroll-right hover:pause">
                  {[...PAGE_PREVIEWS_ROW2, ...PAGE_PREVIEWS_ROW2].map((img, i) => (
                    <div key={i} className="w-[200px] sm:w-[300px] shrink-0 aspect-video rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900 relative">
                      <img src={img} alt="Student 3D Render" className="w-full h-full object-cover" loading="lazy" />
                      <div className="absolute bottom-2 left-2 bg-black/80 px-2 py-0.5 rounded text-[9px] font-mono text-zinc-300 border border-white/10">
                        Avada Student Project
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center mt-6">
                <button
                  onClick={openPaymentModal}
                  className="px-6 py-3 rounded-full bg-white text-zinc-950 font-heading font-semibold text-xs sm:text-sm hover:bg-zinc-100 transition-all cursor-pointer shadow-md animate-pulse-slow"
                >
                  Claim Full Course Access Now
                </button>
              </div>
            </section>

            <Pattern />

            {/* ═══ 8. 6 FREE BONUSES ═══ */}
            <section className="screen-line-before screen-line-after border-x border-grid py-8 sm:py-12 bg-zinc-50/50">
              <div className="px-3 sm:px-4">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 bg-zinc-950 text-white rounded-full text-[10px] sm:text-xs font-mono uppercase tracking-wider mb-1.5">
                    <Gift size={13} /> ₹38,000 WORTH BONUSES FREE TODAY
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-heading font-bold text-zinc-950">
                    Unlock 6 Exclusive Super-Bonuses
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 mb-6">
                  {FREE_BONUSES.map((b) => (
                    <div key={b.id} className="bg-white border border-zinc-200 rounded-xl p-4 hover:border-zinc-400 transition-all flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-2xl">{b.icon}</span>
                          <div className="text-right">
                            <span className="text-[9px] font-mono font-bold uppercase tracking-wider bg-zinc-100 text-zinc-800 px-2 py-0.5 rounded border border-zinc-200 block mb-0.5">{b.badge}</span>
                            <span className="text-[11px] font-mono text-zinc-400 line-through">{b.worth}</span>
                            <span className="text-xs font-mono font-bold text-emerald-600 ml-1">FREE</span>
                          </div>
                        </div>

                        <h3 className="font-heading font-bold text-zinc-950 text-sm sm:text-base mb-1">{b.title}</h3>
                        <p className="text-xs text-zinc-600 leading-relaxed mb-3">{b.desc}</p>
                      </div>

                      <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-1.5 text-center text-xs font-mono text-zinc-700 flex items-center justify-center gap-1">
                        <span className="highlight-green font-bold text-[11px]">✓ Included Free Today</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mid Page CTA Box */}
                <div className="max-w-xl mx-auto">
                  <CtaWithTimer 
                    timeLeft={timeLeft} 
                    onClick={openPaymentModal} 
                    variant="white"
                    title="CLAIM 12 COURSES + ALL 6 BONUSES NOW"
                  />
                </div>
              </div>
            </section>

            <Pattern />

            {/* ═══ 9. OLD WAY vs AVADA PRO 3D WAY ═══ */}
            <section className="screen-line-before screen-line-after border-x border-grid py-8 sm:py-12 bg-white">
              <div className="px-3 sm:px-4">
                <div className="text-center mb-6">
                  <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-zinc-700 bg-zinc-100 border border-zinc-200 px-3 py-0.5 rounded-full">
                    ⚡ VALUE COMPARISON
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-heading font-bold text-zinc-950 mt-2">
                    ₹999 vs ₹1,50,000 Offline Institute
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* The Old Struggle */}
                  <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 sm:p-5">
                    <div className="flex items-center gap-2 mb-3 text-zinc-700 font-heading font-bold text-sm sm:text-base border-b border-zinc-200 pb-2">
                      <X size={16} className="p-0.5 bg-zinc-200 rounded-full text-zinc-600" />
                      <span>The Lonely Struggle (Old Way)</span>
                    </div>
                    <ul className="space-y-2.5 text-xs text-zinc-600">
                      <li className="flex items-start gap-2">
                        <X size={14} className="text-red-500 shrink-0 mt-0.5" />
                        <span>Scattered YouTube videos with no support when V-Ray crashes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <X size={14} className="text-red-500 shrink-0 mt-0.5" />
                        <span>Institutes charging ₹35,000–₹1,50,000 for outdated 2015 syllabus</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <X size={14} className="text-red-500 shrink-0 mt-0.5" />
                        <span>No ready 3D models; wasting 5 hours modeling a single sofa</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <X size={14} className="text-red-500 shrink-0 mt-0.5" />
                        <span>No client contracts, ending up underpaid at ₹1,000 per room</span>
                      </li>
                    </ul>
                  </div>

                  {/* The Avada Way */}
                  <div className="bg-white border-2 border-zinc-950 rounded-xl p-4 sm:p-5 relative">
                    <div className="absolute top-0 right-0 bg-zinc-950 text-white text-[9px] font-mono font-bold px-2 py-0.5 rounded-bl-lg uppercase tracking-wider">
                      PRO METHOD
                    </div>
                    <div className="flex items-center gap-2 mb-3 text-zinc-950 font-heading font-bold text-sm sm:text-base border-b border-zinc-200 pb-2">
                      <CheckCircle2 size={16} className="text-zinc-950" />
                      <span>The Avada PRO 3D Blueprint</span>
                    </div>
                    <ul className="space-y-2.5 text-xs text-zinc-800 font-medium">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 size={14} className="text-zinc-950 shrink-0 mt-0.5" />
                        <span><strong className="text-zinc-950">30-Day Flow:</strong> AutoCAD → SketchUp → V-Ray → D5 → AI</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 size={14} className="text-zinc-950 shrink-0 mt-0.5" />
                        <span><strong className="text-zinc-950">24/7 WhatsApp Team Help:</strong> Instant solutions to crashes & bugs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 size={14} className="text-zinc-950 shrink-0 mt-0.5" />
                        <span><strong className="text-zinc-950">10,000+ Assets:</strong> Drag and drop modular kitchens & luxury decor</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 size={14} className="text-zinc-950 shrink-0 mt-0.5" />
                        <span><strong className="text-zinc-950">Client Proposal Templates:</strong> Lock 50% advance token payments</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <Pattern />

            {/* ═══ 10. REAL INDIAN STUDENT TESTIMONIALS ═══ */}
            <section className="screen-line-before screen-line-after border-x border-grid py-8 sm:py-12 bg-zinc-50/50">
              <div className="px-3 sm:px-4">
                <div className="text-center mb-6">
                  <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-zinc-700 bg-zinc-100 border border-zinc-200 px-3 py-0.5 rounded-full">
                    💬 VERIFIED REVIEWS
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-heading font-bold text-zinc-950 mt-2">
                    What Indian Designers & Architects Say
                  </h2>
                </div>

                {/* Featured Transformation Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mb-6">
                  {TRANSFORMATION_STORIES.map((s, idx) => (
                    <div key={idx} className="bg-white border border-zinc-200 rounded-xl p-4 hover:border-zinc-400 transition-all flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2.5">
                          <div className="flex items-center gap-2">
                            <div className="size-8 rounded-full bg-zinc-900 text-white font-mono font-bold flex items-center justify-center text-xs">
                              {s.name.charAt(0)}
                            </div>
                            <div>
                              <h3 className="font-heading font-bold text-zinc-950 text-sm leading-tight">{s.name}</h3>
                              <span className="text-[10px] text-zinc-500 font-mono">{s.role} • {s.city}</span>
                            </div>
                          </div>
                          <span className="bg-emerald-50 text-emerald-800 text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full border border-emerald-200">
                            {s.incomeIncrease}
                          </span>
                        </div>

                        <div className="space-y-1.5 text-xs my-2.5">
                          <p className="text-zinc-500 bg-zinc-50 p-2 rounded-lg"><strong className="text-zinc-700 font-semibold">Before:</strong> {s.before}</p>
                          <p className="text-zinc-800 bg-zinc-100/70 p-2 rounded-lg"><strong className="text-zinc-950 font-semibold">After:</strong> {s.after}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-zinc-100 text-[11px] text-zinc-400 font-mono">
                        <div className="flex text-amber-400">
                          {[...Array(5)].map((_, i) => <Star key={i} size={11} className="fill-amber-400" />)}
                        </div>
                        <span className="text-emerald-700 font-medium flex items-center gap-1"><CheckCircle size={11} /> Verified Learner</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Testimonials List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {TESTIMONIALS_LANDING.map((t, idx) => (
                    <div key={idx} className="bg-white border border-zinc-200 rounded-xl p-3 flex flex-col justify-between text-xs">
                      <div>
                        <div className="flex text-amber-400 mb-1.5">
                          {[...Array(5)].map((_, i) => <Star key={i} size={11} className="fill-amber-400" />)}
                        </div>
                        <p className="text-zinc-600 leading-relaxed mb-2.5">"{t.content}"</p>
                      </div>
                      <div className="pt-2 border-t border-zinc-100">
                        <span className="font-heading font-semibold text-zinc-950 block truncate">{t.name}</span>
                        <span className="text-[10px] font-mono text-zinc-500 block truncate">{t.role} • {t.location}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mentors Image */}
                <div className="max-w-3xl mx-auto mt-8 text-center">
                  <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white p-2 sm:p-3">
                    <img src="/renders/mentors.png" alt="Industry Mentors" className="w-full h-auto object-contain" loading="lazy" />
                  </div>
                </div>
              </div>
            </section>

            <Pattern />

            {/* ═══ 11. GRAND SLAM VALUE STACK ═══ */}
            <section className="screen-line-before screen-line-after border-x border-grid py-8 sm:py-12 bg-white">
              <div className="max-w-3xl mx-auto px-3 sm:px-4">
                <div className="text-center mb-6">
                  <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-zinc-700 bg-zinc-100 border border-zinc-200 px-3 py-0.5 rounded-full">
                    🎁 EVERYTHING INCLUDED
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-heading font-bold text-zinc-950 mt-2">
                    Everything You Get Inside the ₹999 Bundle
                  </h2>
                  <p className="text-zinc-600 text-xs sm:text-sm mt-1">
                    Normal value if purchased separately: <strong className="font-mono text-zinc-900">₹54,000+</strong>
                  </p>
                </div>

                <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-xs">
                  <div className="divide-y divide-zinc-200 text-xs sm:text-sm">
                    {VALUE_STACK_ITEMS.map((item, i) => (
                      <div key={i} className="flex items-center justify-between px-4 py-2 bg-white hover:bg-zinc-50 transition-colors">
                        <div className="flex items-center gap-2 text-zinc-800 pr-2">
                          <CheckCircle2 size={13} className="text-zinc-900 shrink-0" />
                          <span>{item.name}</span>
                        </div>
                        <span className="font-mono text-zinc-500 text-xs shrink-0">{item.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Total Value Summary Box */}
                  <div className="bg-zinc-950 text-white p-5 sm:p-6 text-center">
                    <p className="text-zinc-400 text-[10px] font-mono uppercase tracking-widest mb-1">Total Real Market Value</p>
                    <p className="text-xl font-mono font-bold text-zinc-400 line-through mb-1">₹54,988</p>
                    <div className="flex items-baseline justify-center gap-2 mb-4">
                      <span className="text-zinc-400 text-xs font-medium">Today's Batch Price:</span>
                      <span className="text-3xl sm:text-4xl font-heading font-bold text-white">₹{BUNDLE_PRICE}</span>
                      <span className="text-emerald-400 text-xs font-mono font-semibold uppercase">(Save ₹53,989)</span>
                    </div>

                    <button
                      onClick={openPaymentModal}
                      className="w-full max-w-md mx-auto py-3.5 rounded-full bg-white text-zinc-950 font-heading font-semibold text-sm sm:text-base hover:bg-zinc-100 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md animate-pulse-slow"
                    >
                      <Download size={16} />
                      <span>Get Instant Access to Everything</span>
                    </button>
                    <p className="text-[10px] text-zinc-400 mt-2 font-mono">⚡ Immediate Google Drive Access Delivered on Email & WhatsApp</p>
                  </div>
                </div>
              </div>
            </section>

            <Pattern />

            {/* ═══ 12. FAQ SECTION ═══ */}
            <section className="screen-line-before screen-line-after border-x border-grid py-8 sm:py-12 bg-zinc-50/50">
              <div className="max-w-3xl mx-auto px-3 sm:px-4">
                <div className="text-center mb-6">
                  <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-zinc-700 bg-zinc-200/80 px-3 py-0.5 rounded-full">
                    ❓ GOT QUESTIONS?
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-heading font-bold text-zinc-950 mt-2">
                    Frequently Asked Questions
                  </h2>
                </div>

                <div className="space-y-2">
                  {FAQ_ITEMS_LANDING.map((faq, i) => (
                    <div 
                      key={i} 
                      className="bg-white border border-zinc-200 rounded-xl overflow-hidden transition-all"
                    >
                      <button
                        onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                        className="w-full flex items-center justify-between p-3.5 sm:p-4 text-left font-heading font-semibold text-zinc-950 text-sm sm:text-base gap-3 cursor-pointer"
                      >
                        <span>{faq.question}</span>
                        <ChevronDown size={16} className={`text-zinc-400 shrink-0 transition-transform duration-200 ${openFaqIndex === i ? 'rotate-180 text-zinc-950' : ''}`} />
                      </button>
                      {openFaqIndex === i && (
                        <div className="px-3.5 sm:px-4 pb-3.5 pt-0 text-zinc-600 text-xs sm:text-sm leading-relaxed border-t border-zinc-100 pt-2">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <Pattern />

            {/* ═══ 13. FINAL CLOSING CTA SECTION ═══ */}
            <section className="screen-line-before screen-line-after border-x border-grid py-10 sm:py-16 bg-zinc-950 text-white relative overflow-hidden text-center">
              <div className="max-w-3xl mx-auto px-4 relative z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-0.5 bg-zinc-800 text-zinc-300 rounded-full text-[10px] sm:text-xs font-mono uppercase tracking-wider mb-2.5 border border-zinc-700">
                  <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" /> LIMITED BATCH INTAKE
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white leading-tight mb-2.5">
                  Don't Let Another Year Pass Wishing You Had Mastered 3D & AI
                </h2>
                <p className="text-zinc-400 text-xs sm:text-sm max-w-lg mx-auto mb-6 leading-relaxed">
                  For less than the price of one dinner, get all 12 courses, 10,000+ 3D models, lifetime updates, and our 24/7 support team.
                </p>

                <CtaWithTimer 
                  timeLeft={timeLeft} 
                  onClick={openPaymentModal} 
                  variant="dark"
                  title="CLAIM YOUR ACCESS PASS NOW"
                />
              </div>
            </section>
          </main>

          <Pattern />

          {/* ═══ FOOTER ═══ */}
          <footer className="screen-line-before border-x border-grid py-8 pb-28 px-4 text-center text-xs bg-white text-zinc-500">
            <div className="max-w-3xl mx-auto flex flex-col items-center gap-2.5">
              <Logo />
              <p className="text-zinc-500 text-[11px] mt-1">
                © 2026 Avada Design & Architecture. All rights reserved. Helping 52,000+ Indian designers succeed.
              </p>
              <div className="flex justify-center gap-3 text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
                <a href="/refund-policy" className="hover:text-zinc-900 transition-colors">Refund Policy</a>
                <span>•</span>
                <a href="https://wa.me/918545015333" target="_blank" rel="noreferrer" className="hover:text-zinc-900 transition-colors">24/7 WhatsApp Support</a>
              </div>
            </div>
          </footer>

        </div>
      </div>

      {/* ═══ WHATSAPP FLOATING BUTTON ═══ */}
      <a 
        href="https://wa.me/918545015333?text=Hi%20Avada%20Team%2C%20I%20have%20a%20question%20about%20the%2012-Course%20Architecture%20Bundle" 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="WhatsApp Support"
        className="fixed bottom-[calc(4.75rem+env(safe-area-inset-bottom,0px))] right-3.5 z-[75] flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-mono font-medium px-3 py-2 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all"
        style={{ boxShadow: '0 4px 16px rgba(37,211,102,0.35)' }}
      >
        <MessageCircle size={16} className="fill-white" />
        <span className="hidden sm:inline">WhatsApp Help</span>
      </a>

      {/* ═══ STICKY BOTTOM BAR ═══ */}
      <div className={`fixed bottom-0 left-0 right-0 z-[70] transition-transform duration-300 bg-white/95 backdrop-blur-md border-t border-zinc-200 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))] ${showStickyBar ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="max-w-4xl mx-auto px-3.5 py-2 flex items-center justify-between gap-3">
          
          <div className="flex flex-col min-w-0">
            <div className="flex items-baseline gap-1.5">
              <span className="text-[11px] text-zinc-400 line-through font-mono">₹3,699</span>
              <span className="text-xl font-heading font-bold text-zinc-950">₹{BUNDLE_PRICE}</span>
              <span className="bg-emerald-500/15 text-emerald-700 border border-emerald-500/30 text-[9px] font-mono font-bold px-1.5 py-0.2 rounded-full">73% OFF</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-zinc-500 font-mono truncate">
              <span>Ends:</span>
              <span className="font-semibold text-zinc-900">{formatTime(timeLeft.h)}:{formatTime(timeLeft.m)}:{formatTime(timeLeft.s)}</span>
              <span className="text-zinc-300">•</span>
              <span className="text-emerald-700 hidden xs:inline">7-Day Refund</span>
            </div>
          </div>

          <button
            onClick={openPaymentModal}
            className="btn-premium animate-pulse-slow py-2.5 px-4 sm:px-6 text-xs sm:text-sm font-heading font-semibold flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
          >
            <Zap size={13} className="fill-white shrink-0" />
            <span>Get All 12 Courses</span>
            <ArrowRight size={13} className="shrink-0" />
          </button>
        </div>
      </div>

      {/* ═══ EXIT-INTENT MODAL ═══ */}
      {showExitModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-[fadeIn_0.2s_ease]">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-5 sm:p-6 text-center border border-zinc-200 overflow-hidden">
            <button 
              onClick={() => setShowExitModal(false)}
              className="absolute top-3 right-3 size-7 rounded-full bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center text-zinc-600 transition-colors cursor-pointer"
            >
              <X size={15} />
            </button>

            <span className="bg-zinc-100 text-zinc-800 text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-zinc-200">
              Wait! Special Offer Active
            </span>

            <h3 className="text-lg sm:text-xl font-heading font-bold text-zinc-950 mt-2 mb-1.5">
              Ruko! Yeh Offer Dobara ₹999 Me Nahi Milega!
            </h3>

            <p className="text-zinc-600 text-xs leading-relaxed mb-3.5">
              Over <strong>52,480+ Indian designers</strong> are already using these 12 courses & 10,000+ 3D models. If you close this page, price will increase to <strong>₹3,699</strong>!
            </p>

            <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-2.5 mb-3.5 text-left text-xs text-zinc-700 space-y-1 font-medium">
              <div className="flex items-center gap-2 text-zinc-900">
                <CheckCircle size={13} className="text-zinc-900 shrink-0" />
                <span>Instant Google Drive Delivery in 60 Secs</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-900">
                <CheckCircle size={13} className="text-zinc-900 shrink-0" />
                <span>24/7 Dedicated WhatsApp Support Team</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-900">
                <CheckCircle size={13} className="text-zinc-900 shrink-0" />
                <span>Official Skill Certificate Included</span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  setShowExitModal(false);
                  openPaymentModal();
                }}
                className="btn-premium animate-pulse-slow w-full py-3 rounded-full font-heading font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Zap size={14} className="fill-white" />
                <span>Lock My Access Now</span>
              </button>

              <button
                onClick={() => setShowExitModal(false)}
                className="text-[11px] text-zinc-400 hover:text-zinc-600 py-0.5 transition-colors font-mono cursor-pointer"
              >
                No thanks, I will pay ₹3,699 later
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══ RAZORPAY CHECKOUT MODAL ═══ */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-3 sm:p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={() => !isLoading && setShowPaymentModal(false)} />
          
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-y-auto max-h-[90vh] z-10 border border-zinc-200">
            
            <button 
              onClick={() => !isLoading && setShowPaymentModal(false)} 
              className="absolute top-3 right-3 z-20 size-7 flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 rounded-full text-white transition-colors cursor-pointer"
            >
              <X size={15} />
            </button>

            {/* Modal Header */}
            <div className="bg-zinc-950 text-white p-4 sm:p-5 border-b border-zinc-800">
              <div className="inline-flex items-center gap-1 text-zinc-400 text-[10px] font-mono uppercase tracking-widest mb-1">
                <Sparkles size={11} className="text-emerald-400" /> Complete 12-Course Architecture Pass
              </div>
              <h3 className="text-lg sm:text-xl font-heading font-bold text-white">Avada PRO 3D Architecture Bundle</h3>
              
              <div className="flex items-baseline gap-2 mt-1.5">
                {discountPercent > 0 ? (
                  <>
                    <span className="text-2xl sm:text-3xl font-heading font-bold text-white">₹{finalPrice}</span>
                    <span className="text-zinc-500 text-xs line-through font-mono">₹{BUNDLE_PRICE}</span>
                    <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-medium px-2 py-0.5 rounded-full border border-emerald-500/30">
                      {discountPercent}% OFF APPLIED
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-2xl sm:text-3xl font-heading font-bold text-white">₹{BUNDLE_PRICE}</span>
                    <span className="text-zinc-500 text-xs line-through font-mono">₹3,699</span>
                    <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-medium px-2 py-0.5 rounded-full border border-emerald-500/30">
                      73% OFF
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-5">
              
              {/* Feature Chips */}
              <div className="grid grid-cols-2 gap-1.5 mb-3.5 text-[10px] sm:text-[11px] font-medium text-zinc-700">
                {['12 Full Software Courses', '10,000+ 3D Indian Models', 'Official Skill Certificate', '24/7 WhatsApp Support'].map((item, i) => (
                  <div key={i} className="flex items-center gap-1.5 bg-zinc-50 p-1.5 rounded-lg border border-zinc-200">
                    <CheckCircle2 size={12} className="text-zinc-900 shrink-0" />
                    <span className="truncate">{item}</span>
                  </div>
                ))}
                <div className="flex items-center gap-1.5 bg-zinc-100 p-1.5 rounded-lg border border-zinc-200 text-zinc-900 font-semibold col-span-2">
                  <Download size={12} className="text-zinc-900 shrink-0" />
                  <span>Direct Software Download Links Included</span>
                </div>
              </div>

              {/* Live Form Inputs */}
              <div className="space-y-2.5 mb-3.5">
                <div>
                  <label className="block text-[10px] font-mono font-semibold text-zinc-700 uppercase tracking-wider mb-1">
                    E-mail
                  </label>
                  <div className="relative">
                    <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <input
                      type="email"
                      placeholder="yourname@gmail.com"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setEmailError(false); }}
                      className={`w-full pl-9 pr-3 py-2 bg-zinc-50 border ${emailError ? 'border-red-500' : 'border-zinc-300 focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900'} rounded-xl text-xs sm:text-sm font-medium outline-none transition-all`}
                    />
                  </div>
                  {emailError && <p className="text-red-500 text-[10px] font-mono mt-0.5">Please enter a valid email address</p>}
                </div>

                <div>
                  <label className="block text-[10px] font-mono font-semibold text-zinc-700 uppercase tracking-wider mb-1">
                    Phone
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 font-mono text-xs">+91</span>
                    <input
                      type="tel"
                      placeholder="10-digit mobile number"
                      value={phone}
                      onChange={(e) => { 
                        let val = e.target.value.replace(/\D/g, '');
                        if (val.length > 10 && val.startsWith('91')) {
                          val = val.slice(2);
                        }
                        setPhone(val.slice(0, 10)); 
                        setPhoneError(false); 
                      }}
                      className={`w-full pl-11 pr-3 py-2 bg-zinc-50 border ${phoneError ? 'border-red-500' : 'border-zinc-300 focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900'} rounded-xl text-xs sm:text-sm font-medium outline-none transition-all`}
                    />
                  </div>
                  {phoneError && <p className="text-red-500 text-[10px] font-mono mt-0.5">Please enter a valid 10-digit mobile number</p>}
                </div>
              </div>

              {/* Coupon Code Section */}
              {!showCouponInput && !appliedCoupon ? (
                <div className="flex justify-end mb-2.5">
                  <button
                    type="button"
                    onClick={() => setShowCouponInput(true)}
                    className="text-[11px] font-mono font-semibold text-zinc-600 hover:text-zinc-950 flex items-center gap-1 cursor-pointer"
                  >
                    <Sparkles size={12} />
                    Have a coupon code?
                  </button>
                </div>
              ) : (
                <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-2.5 mb-2.5">
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between text-xs font-mono font-medium text-emerald-800">
                      <span>Coupon <strong>{appliedCoupon}</strong> Applied! ({discountPercent}% OFF)</span>
                      <button
                        onClick={() => {
                          setAppliedCoupon(null);
                          setDiscountPercent(0);
                          setCouponCode('');
                        }}
                        className="text-zinc-400 hover:text-zinc-600 cursor-pointer"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase">Coupon Code</span>
                        <button onClick={() => setShowCouponInput(false)} className="text-[10px] text-zinc-400 cursor-pointer font-mono">Cancel</button>
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="ENTER CODE"
                          value={couponCode}
                          onChange={(e) => { setCouponCode(e.target.value.toUpperCase()); setCouponError(null); }}
                          className="flex-1 px-2.5 py-1.5 bg-white border border-zinc-300 rounded-lg text-xs font-mono font-bold uppercase outline-none"
                        />
                        <button
                          onClick={() => applyCouponCodeDirect(couponCode)}
                          className="px-3 py-1.5 bg-zinc-950 text-white rounded-lg text-xs font-mono font-medium hover:bg-zinc-800 cursor-pointer"
                        >
                          Apply
                        </button>
                      </div>
                      {couponError && <p className="text-red-500 text-[10px] font-mono mt-0.5">{couponError}</p>}
                    </div>
                  )}
                </div>
              )}

              {paymentError && (
                <p className="text-red-600 text-xs bg-red-50 border border-red-200 p-2.5 rounded-xl text-center mb-3 font-medium">
                  {paymentError}
                </p>
              )}

              {/* Razorpay Action Button */}
              <button
                onClick={handlePayment}
                disabled={isLoading}
                className="btn-premium animate-pulse-slow w-full py-3.5 rounded-full font-heading font-semibold text-sm sm:text-base flex items-center justify-center gap-2 group disabled:opacity-60 cursor-pointer"
              >
                {isLoading ? (
                  <><Loader2 className="animate-spin" size={16} /> Processing...</>
                ) : (
                  <>
                    <Download size={16} className="shrink-0" />
                    <span>Download All</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform shrink-0" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-1.5 mt-2 text-[10px] text-zinc-400 font-mono">
                <Lock size={10} /> 256-Bit SSL Encrypted Razorpay Checkout
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══ PAYMENT SUCCESS OVERLAY ═══ */}
      {paymentSuccess && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 md:p-7 max-w-lg w-full text-center shadow-2xl border border-zinc-200 relative overflow-hidden">
            <div className="size-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle size={28} className="text-emerald-600" />
            </div>

            <h2 className="text-xl sm:text-2xl font-heading font-bold text-zinc-950 mb-1">Payment Successful!</h2>
            <p className="text-zinc-500 text-xs sm:text-sm mb-4">
              Welcome to the Avada PRO 3D Architecture Family! Your access is active.
            </p>

            <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 mb-4 text-left">
              <div className="flex items-center gap-2 mb-1.5">
                <Sparkles size={15} className="text-zinc-900" />
                <h3 className="font-heading font-bold text-zinc-950 text-sm">Instant Google Drive Course Folder:</h3>
              </div>
              <p className="text-xs text-zinc-600 mb-2.5 leading-relaxed">
                Click below to start learning directly on Google Drive (bookmark this link):
              </p>
              <a
                href="https://drive.google.com/drive/folders/1CCyv9u82HiYI8jnyULISfBoGMcbcqd9U?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-premium block w-full py-3 px-4 text-center text-xs sm:text-sm font-heading font-semibold"
              >
                🚀 Open 12 Courses on Google Drive
              </a>
            </div>

            <div className="flex items-center justify-between text-xs text-zinc-600 bg-zinc-50 p-2.5 rounded-xl border border-zinc-200 mb-4 font-mono">
              <span>Payment ID: <strong className="text-zinc-900">{paymentSuccess}</strong></span>
              <a href="https://wa.me/918545015333" target="_blank" rel="noreferrer" className="text-emerald-700 font-semibold">
                WhatsApp Help
              </a>
            </div>

            <button
              onClick={() => setPaymentSuccess(null)}
              className="w-full py-3 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white font-heading font-medium text-xs sm:text-sm transition-all cursor-pointer"
            >
              Close & Start Designing
            </button>
          </div>
        </div>
      )}

      {/* Social proof animated popups */}
      <SocialProofToast />
    </div>
  );
};

export default LandingPage;
