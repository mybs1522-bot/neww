import { Course, Testimonial, FaqItem } from './types';

/* 
  -----------------------------------------------------------------------
  HOW TO UPDATE IMAGES:
  1. Upload your image to Google Drive.
  2. Right click -> Share -> Copy Link (Ensure access is "Anyone with the link").
  3. Paste the link into the 'imageUrl' field below.
  
  The code will automatically convert Google Drive links to work on the website.
  -----------------------------------------------------------------------
*/

const LOCAL_THUMBNAILS: Record<string, string> = {
  '1': '/courses/course-1.jpg',
  '2': '/courses/course-2.jpg',
  '3': '/courses/course-3.jpg',
  '4': '/courses/course-4.jpg',
  '5': '/courses/course-5.jpg',
  '6': '/courses/course-6.jpg',
  '7': '/courses/course-7.jpg',
  '8': '/courses/course-8.jpg',
  '9': '/courses/course-9.png',
  '10': '/courses/course-10.png',
  '11': '/courses/course-11.jpg',
  '12': '/courses/course-12.jpg',
};

const RAW_COURSES: Course[] = [
  {
    id: '5',
    title: 'V-Ray Photorealism',
    software: 'V-Ray',
    description: 'Make your 3D models look like real photos.',
    imageUrl: '/courses/course-5.jpg',
    color: 'from-blue-600 to-indigo-500',
    students: '48k',
    price: 199,
    originalPrice: 999,
    learningPoints: [
      'Set up realistic sunlight and night lighting',
      'Make materials look like real wood and glass',
      'Take "photographs" of your 3D house'
    ],
    workflowImpact: 'Sell your design before it exists.'
  },
  {
    id: '1',
    title: 'AutoCAD Mastery',
    software: 'AutoCAD',
    description: 'Draw accurate 2D floor plans for houses and buildings.',
    imageUrl: '/courses/course-1.jpg',
    color: 'from-red-500 to-red-400',
    students: '42.5k',
    price: 199,
    originalPrice: 999,
    learningPoints: [
      'Draw floor plans and furniture layouts easily',
      'Print your drawings to scale for construction',
      'Use shortcuts to draw 10x faster than others'
    ],
    workflowImpact: 'Create professional blueprints that contractors can actually build from.'
  },
  {
    id: '2',
    title: 'BIM with Revit',
    software: 'Revit',
    description: 'Build smart 3D buildings on your computer.',
    imageUrl: '/courses/course-2.jpg',
    color: 'from-red-600 to-red-500',
    students: '38k',
    price: 199,
    originalPrice: 999,
    learningPoints: [
      'Create 3D buildings with automatic floor plans',
      'Calculate how many bricks and windows you need',
      'Work on big projects with other team members'
    ],
    workflowImpact: 'Save days of work. The software does it for you.'
  },
  {
    id: '3',
    title: 'SketchUp Pro',
    software: 'SketchUp',
    description: 'The easiest way to design 3D houses.',
    imageUrl: '/courses/course-3.jpg',
    color: 'from-blue-500 to-cyan-400',
    students: '55k',
    price: 199,
    originalPrice: 999,
    learningPoints: [
      'Pull simple shapes into 3D houses instantly',
      'Add furniture, colors, and textures easily',
      'Create 3D views to show your clients'
    ],
    workflowImpact: 'Model their dream kitchen or bedroom in just minutes.'
  },
  {
    id: '4',
    title: '3ds Max Advanced',
    software: '3ds Max',
    description: 'Design fancy furniture and luxury interiors.',
    imageUrl: '/courses/course-4.jpg',
    color: 'from-cyan-600 to-blue-500',
    students: '22k',
    price: 199,
    originalPrice: 999,
    learningPoints: [
      'Model complex shapes like twisted towers',
      'Create soft fabrics, pillows, and blankets',
      'Design high-end luxury interior spaces'
    ],
    workflowImpact: 'Charge more for premium, high-detail luxury designs.'
  },
  {
    id: '6',
    title: 'Lumion Cinematic',
    software: 'Lumion',
    description: 'Make movies of your architecture.',
    imageUrl: '/courses/course-6.jpg',
    color: 'from-teal-500 to-emerald-400',
    students: '31k',
    price: 199,
    originalPrice: 999,
    learningPoints: [
      'Add grass, trees, and water instantly',
      'Make people walk and cars drive in your scene',
      'Create a video tour of the house'
    ],
    workflowImpact: 'A 1-minute video sells a house better than 100 drawings.'
  },
  {
    id: '7',
    title: 'D5 Render Realtime',
    software: 'D5 Render',
    description: 'See the final result instantly while you work.',
    imageUrl: '/courses/course-7.jpg',
    color: 'from-purple-500 to-pink-500',
    students: '19k',
    price: 199,
    originalPrice: 999,
    learningPoints: [
      'Real-time lighting (see it as you work)',
      'Drag and drop thousands of free furniture items',
      'Make 4K images in seconds'
    ],
    workflowImpact: 'Change the floor material and see how it looks instantly.'
  },
  {
    id: '8',
    title: 'Enscape VR',
    software: 'Enscape',
    description: 'Walk inside your design using VR.',
    imageUrl: '/courses/course-8.jpg',
    color: 'from-blue-500 to-indigo-600',
    students: '25k',
    price: 199,
    originalPrice: 999,
    learningPoints: [
      'One-click to start walking inside your model',
      'Send a web link so clients can walk around too',
      'Use Virtual Reality (VR) to impress'
    ],
    workflowImpact: 'Spot mistakes before construction starts.'
  },
  {
    id: '9',
    title: 'AI Architecture',
    software: 'Midjourney',
    description: 'Get 100 design ideas in 1 minute with AI.',
    imageUrl: '/courses/course-9.png',
    color: 'from-fuchsia-600 to-purple-600',
    students: '60k',
    price: 199,
    originalPrice: 999,
    learningPoints: [
      'How to write text to get amazing house images',
      'Create mood boards for clients instantly',
      'Combine different styles (e.g., Classic + Modern)'
    ],
    workflowImpact: 'Never run out of ideas.'
  },
  {
    id: '10',
    title: 'Generative Design',
    software: 'Stable Diffusion',
    description: 'Turn a rough sketch into a realistic building using AI.',
    imageUrl: '/courses/course-10.png',
    color: 'from-indigo-500 to-purple-500',
    students: '15k',
    price: 199,
    originalPrice: 999,
    learningPoints: [
      'Turn hand sketches into realistic renders',
      'Change specific parts of an image with AI',
      'Install AI tools on your own computer'
    ],
    workflowImpact: 'Show a client a realistic picture during the first meeting.'
  },
  {
    id: '11',
    title: 'Unreal Engine 5',
    software: 'Unreal Engine',
    description: 'Make your design look like a high-end video game.',
    imageUrl: '/courses/course-11.jpg',
    color: 'from-gray-600 to-gray-400',
    students: '18k',
    price: 199,
    originalPrice: 999,
    learningPoints: [
      'Create interactive lights and doors',
      'Make realistic fire, water, and wind',
      'Package your design as a playable game'
    ],
    workflowImpact: 'Give clients a controller and let them play inside their future home.'
  },
  {
    id: '12',
    title: 'Post Production',
    software: 'Photoshop',
    description: 'Add real sky, birds, and people to your renders.',
    imageUrl: '/courses/course-12.jpg',
    color: 'from-blue-800 to-blue-600',
    students: '72k',
    price: 199,
    originalPrice: 999,
    learningPoints: [
      'Fix lighting and colors easily',
      'Add realistic people and trees',
      'Make your portfolio look professional'
    ],
    workflowImpact: 'Make average renders look like award-winning photography.'
  }
];

// --- AUTO-FIX LOGIC ---
export const COURSES = RAW_COURSES.map(course => {
  const localImg = LOCAL_THUMBNAILS[course.id];
  let url = localImg || course.imageUrl;
  if (!localImg && url.includes('drive.google.com') && url.includes('/file/d/')) {
    const idMatch = url.match(/\/d\/([^/?]+)/);
    if (idMatch && idMatch[1]) {
      url = `https://drive.google.com/thumbnail?id=${idMatch[1]}&sz=w800`;
    }
  }
  return { ...course, imageUrl: url };
});

export const COURSE_CATEGORIES = [
  {
    title: "Planning",
    ids: ['1', '2']
  },
  {
    title: "Designing",
    ids: ['3', '4', '12']
  },
  {
    title: "Rendering",
    ids: ['5', '6', '7', '8']
  },
  {
    title: "AI & MORE",
    ids: ['9', '10', '11']
  }
];

export const BUNDLE_PRICE = 999;
export const BUNDLE_ORIGINAL_PRICE = 12000;

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    role: 'Principal Architect',
    company: 'Studio Design, Mumbai',
    content: 'Avada transformed our workflow completely. The photorealism achieved in V-Ray and Lumion has helped us win 3 massive residential projects this quarter alone. The ROI was immediate.',
    rating: 5
  },
  {
    id: '2',
    name: 'Priya Sharma',
    role: 'Freelance Interior Designer',
    company: 'Bengaluru',
    content: 'From struggling with client revisions to delivering D5 real-time walkthroughs in hours—this bundle is an absolute game-changer. The AI prompt section alone is worth 10x the price.',
    rating: 5
  },
  {
    id: '3',
    name: 'Amit Patel',
    role: 'BIM Specialist',
    company: 'Ahmedabad',
    content: 'The Revit and 3ds Max courses are structured better than what I was taught in my 4-year degree. Clear, concise, and immediately applicable to real-world Indian projects.',
    rating: 5
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'How do I access the courses after purchase?',
    answer: 'Immediately upon completing your payment via Razorpay, you will receive lifetime access links to our high-speed Google Drive archive on your email and WhatsApp.'
  },
  {
    question: 'Are project files and 3D assets included?',
    answer: 'Yes! You receive over 10,000+ Indian & international 3D models, 5,000+ 4K PBR textures, contractor drawing templates, and full scene files for every single course.'
  },
  {
    question: 'Can I watch on my mobile phone?',
    answer: 'Absolutely. All videos are streamable on both Android and iOS devices, as well as downloadable for offline learning on your PC or Mac.'
  },
  {
    question: 'Do I get a certificate upon completion?',
    answer: 'Yes, an ISO-verified digital skill completion certificate is included with your bundle access at zero additional charge.'
  }
];
