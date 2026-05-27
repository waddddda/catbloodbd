/* ===================================================
   CatBloodBD – Application Logic (Supabase Edition)
   =================================================== */

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = 'https://yimuprhlpdrawqnpyzxu.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlpbXVwcmhscGRyYXdxbnB5enh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkyNTc5NjAsImV4cCI6MjA5NDgzMzk2MH0.3TTLDQImiNqsD2SJmctME1QK8sj0KtbQA-TUG9VB3sc';
const sb = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const BD_LOCATIONS = {
  Dhaka: ['Dhaka', 'Gazipur', 'Narayanganj', 'Tangail', 'Manikganj', 'Munshiganj', 'Narsingdi', 'Faridpur', 'Madaripur', 'Gopalganj', 'Shariatpur', 'Rajbari', 'Kishoreganj'],
  Chittagong: ['Chittagong', 'Comilla', "Cox's Bazar", 'Rangamati', 'Brahmanbaria', 'Noakhali', 'Feni', 'Chandpur', 'Lakshmipur', 'Bandarban', 'Khagrachari'],
  Rajshahi: ['Rajshahi', 'Pabna', 'Bogra', 'Natore', 'Naogaon', 'Chapainawabganj', 'Sirajganj', 'Joypurhat'],
  Khulna: ['Khulna', 'Jessore', 'Satkhira', 'Bagerhat', 'Narail', 'Kushtia', 'Meherpur', 'Chuadanga', 'Jhenaidah', 'Magura'],
  Barisal: ['Barisal', 'Patuakhali', 'Bhola', 'Pirojpur', 'Barguna', 'Jhalokathi'],
  Sylhet: ['Sylhet', 'Moulvibazar', 'Habiganj', 'Sunamganj'],
  Rangpur: ['Rangpur', 'Dinajpur', 'Kurigram', 'Gaibandha', 'Nilphamari', 'Lalmonirhat', 'Thakurgaon', 'Panchagarh'],
  Mymensingh: ['Mymensingh', 'Jamalpur', 'Netrokona', 'Sherpur']
};

const STRINGS = {
  en: {
    nav_home: 'Home',
    nav_search: 'Search',
    nav_guide: 'Guide',
    nav_login: 'Login',
    nav_dashboard: 'Dashboard',
    nav_logout: 'Logout',

    hero_tag: "🐾 Bangladesh's First Cat Blood Donor Network",
    hero_title: "Every Drop Counts.<br/>Save a Cat's Life Today.",
    hero_sub: 'Connect with verified cat blood donors across all 8 divisions. Fast search, emergency alerts, and a caring community.',
    hero_cta1: 'Find a Donor',
    hero_cta2: 'Register Your Cat',
    hero_trust1: 'Free Forever',
    hero_trust2: 'All 8 Divisions',
    hero_trust3: 'Instant Contact',

    how_title: 'How It Works',
    how_subtitle: 'Three simple steps to save a life',
    step1_title: 'Register Your Cat',
    step1_desc: "Create an account and add your cat's blood type, location, and contact details.",
    step2_title: 'Search Donors',
    step2_desc: 'Filter by division, district, and blood type to find compatible donors near you.',
    step3_title: 'Contact Directly',
    step3_desc: "Get the donor's phone number and call them directly. No middleman needed.",

    stat_donors: 'Registered Donors',
    stat_divisions: 'Divisions Covered',
    stat_alerts: 'Lives Connected',

    mission_title: 'Our Mission',
    mission_desc: "Cat blood transfusions save lives — but finding a compatible donor in Bangladesh is nearly impossible. We're building the first nationwide registry so that no cat owner ever has to face that helpless moment alone.",
    mission_cta: 'Join the Mission',

    donate_title: 'Why Let Your Cat Donate?',
    donate_subtitle: 'A healthy cat can help save another cat’s life',
    donate_card1_title: 'Save a Life',
    donate_card1_text: 'Your cat may help save another cat in an emergency.',
    donate_card2_title: 'Safe Screening',
    donate_card2_text: 'A vet checks health, weight, and temperament first.',
    donate_card3_title: 'Vet-Supervised',
    donate_card3_text: 'Donation is done carefully to keep donor cats safe.',

    eligible_title: 'Is My Cat Eligible?',
    eligible_subtitle: 'Most donor cats share a few healthy traits',
    eligible_card1_title: 'Good Donor Traits',
    eligible_card1_text: 'Usually 1–8 years old, healthy, calm, and fully vaccinated.',
    eligible_card2_title: 'Health Checks',
    eligible_card2_text: 'Vets check blood type and screen for FeLV and FIV.',
    eligible_card3_title: 'Best Lifestyle',
    eligible_card3_text: 'Indoor cats with stable health histories are easier to screen.',

    search_title: 'Find a Blood Donor',
    search_subtitle: 'Search by location and blood type — get phone numbers instantly',
    label_division: 'Division',
    label_district: 'District',
    label_blood: 'Blood Type',
    opt_all_div: 'All Divisions',
    opt_all_dist: 'All Districts',
    opt_all_blood: 'All Types',
    opt_select_div: 'Select Division',
    opt_select_dist: 'Select District',
    btn_search: 'Search',
    available_donors: 'Available donors',
    no_results: 'No donors found. Try changing your filters.',

    urgent_title: '🚨 Need Blood Urgently?',
    urgent_sub: 'Send an alert to all donors in a district',
    alert_phone_placeholder: 'Your phone number',
    select_district: 'Select District',
    blood_type: 'Blood Type',
    alert_btn: 'Send Emergency Alert',

    guide_title: 'Cat Blood Type Guide',
    guide_subtitle: 'Understanding feline blood compatibility',
    guide_a_title: 'Type A',
    guide_a_desc: 'The most common blood type. Type A cats can safely receive blood from other Type A donors.',
    guide_a_yes: 'Can donate to A',
    guide_a_no: 'Cannot donate to B',
    guide_a_warn: 'Caution with AB',
    guide_b_title: 'Type B',
    guide_b_desc: 'Less common overall but prevalent in certain breeds. Type B cats have strong anti-A antibodies.',
    guide_b_yes: 'Can donate to B',
    guide_b_no: 'Cannot donate to A',
    guide_b_warn: 'Caution with AB',
    guide_ab_title: 'Type AB',
    guide_ab_desc: 'The rarest feline blood type. AB cats are universal recipients and can receive from A, B, or AB donors.',
    guide_ab_yes: 'Can receive from A, B, AB',
    guide_ab_no: 'Should only donate to AB',
    guide_warn_title: '⚠️ Important',
    guide_warn_desc: 'Always consult a veterinarian before any blood transfusion. Cross-matching tests should be performed even between same-type cats.',

    login_title: 'Welcome Back',
    login_sub: 'Log in to manage your donor profile',
    label_email: 'Email',
    label_password: 'Password',
    login_email_placeholder: 'Email',
    login_password_placeholder: 'Password',
    btn_login: 'Login',
    login_switch: "Don't have an account?",
    login_switch_link: 'Sign Up',

    signup_title: 'Create Account',
    signup_sub: 'Join the network and register your cat',
    label_name: 'Full Name',
    label_phone: 'Phone Number',
    signup_name_placeholder: 'Full Name',
    signup_email_placeholder: 'Email',
    signup_password_placeholder: 'Password',
    signup_phone_placeholder: 'Phone Number',
    btn_signup: 'Create Account',
    signup_switch: 'Already have an account?',
    signup_switch_link: 'Login',

    dash_title: 'Dashboard',
    dash_welcome: 'Welcome',
    dash_mycats: 'My Cats',
    btn_addcat: '+ Add Cat',
    cat_name_placeholder: 'Cat Name',
    cat_breed_placeholder: 'Breed',
    cat_age_placeholder: 'Age',
    cat_weight_placeholder: 'Weight',
    btn_save: 'Save',
    btn_cancel: 'Cancel',
    dash_nocats: "You haven't registered any cats yet.",
    dash_history: 'Emergency Alerts',
    dash_noalerts: 'No emergency alerts yet.',

    footer_desc: 'Connecting cat blood donors across Bangladesh since 2026.',
    footer_love: 'Made with ❤️ for cats.',
    calling: '📞 Call',
    contact: 'Owner Contact',
    label_emergency_phone: 'Seeker Phone Number'
  },

  bn: {
    nav_home: 'হোম',
    nav_search: 'খুঁজুন',
    nav_guide: 'গাইড',
    nav_login: 'লগইন',
    nav_dashboard: 'ড্যাশবোর্ড',
    nav_logout: 'লগআউট',

    hero_tag: '🐾 বাংলাদেশের প্রথম বিড়াল রক্তদাতা নেটওয়ার্ক',
    hero_title: 'প্রতিটি ফোঁটা গুরুত্বপূর্ণ।<br/>আজই একটি বিড়ালের জীবন বাঁচান।',
    hero_sub: 'সারা বাংলাদেশে ৮টি বিভাগে যাচাইকৃত বিড়াল রক্তদাতাদের সাথে সংযোগ করুন। দ্রুত খোঁজ, জরুরি সতর্কতা, এবং একটি যত্নশীল কমিউনিটি।',
    hero_cta1: 'দাতা খুঁজুন',
    hero_cta2: 'আপনার বিড়াল নিবন্ধন করুন',
    hero_trust1: 'সম্পূর্ণ বিনামূল্যে',
    hero_trust2: 'সকল ৮ বিভাগ',
    hero_trust3: 'তাৎক্ষণিক যোগাযোগ',

    how_title: 'কিভাবে কাজ করে',
    how_subtitle: 'তিনটি সহজ ধাপে একটি জীবন বাঁচান',
    step1_title: 'আপনার বিড়াল নিবন্ধন করুন',
    step1_desc: 'অ্যাকাউন্ট তৈরি করুন এবং আপনার বিড়ালের রক্তের ধরন, অবস্থান এবং যোগাযোগের তথ্য যোগ করুন।',
    step2_title: 'দাতা খুঁজুন',
    step2_desc: 'কাছাকাছি সামঞ্জস্যপূর্ণ দাতা খুঁজে পেতে বিভাগ, জেলা এবং রক্তের ধরন দিয়ে ফিল্টার করুন।',
    step3_title: 'সরাসরি যোগাযোগ করুন',
    step3_desc: 'দাতার ফোন নম্বর পান এবং সরাসরি কল করুন। কোনো মধ্যস্থতাকারী নেই।',

    stat_donors: 'নিবন্ধিত দাতা',
    stat_divisions: 'বিভাগ কভার',
    stat_alerts: 'সংযুক্ত জীবন',

    mission_title: 'আমাদের লক্ষ্য',
    mission_desc: 'বিড়ালের রক্ত সঞ্চালন জীবন বাঁচায় — কিন্তু বাংলাদেশে একজন সামঞ্জস্যপূর্ণ দাতা খুঁজে পাওয়া প্রায় অসম্ভব। আমরা প্রথম জাতীয় রেজিস্ট্রি তৈরি করছি, যাতে কোনো বিড়ালের মালিককে একা সেই কঠিন মুহূর্তের মুখোমুখি হতে না হয়।',
    mission_cta: 'মিশনে যোগ দিন',

    donate_title: 'আপনার বিড়াল কেন রক্ত দান করবে?',
    donate_subtitle: 'একটি সুস্থ বিড়াল আরেকটি বিড়ালের জীবন বাঁচাতে পারে',
    donate_card1_title: 'একটি জীবন বাঁচান',
    donate_card1_text: 'আপনার বিড়াল জরুরিতে অন্য বিড়ালকে সাহায্য করতে পারে।',
    donate_card2_title: 'নিরাপদ স্ক্রিনিং',
    donate_card2_text: 'ভেট আগে স্বাস্থ্য, ওজন, ও স্বভাব পরীক্ষা করেন।',
    donate_card3_title: 'ভেটের তত্ত্বাবধানে',
    donate_card3_text: 'সতর্কভাবে দান করা হয়, যাতে দাতা বিড়াল নিরাপদ থাকে।',

    eligible_title: 'আমার বিড়াল কি উপযুক্ত?',
    eligible_subtitle: 'বেশিরভাগ দাতা বিড়ালের কিছু সাধারণ বৈশিষ্ট্য থাকে',
    eligible_card1_title: 'ভালো দাতার বৈশিষ্ট্য',
    eligible_card1_text: 'সাধারণত ১–৮ বছর বয়সী, সুস্থ, শান্ত, ও টিকা দেওয়া।',
    eligible_card2_title: 'স্বাস্থ্য পরীক্ষা',
    eligible_card2_text: 'ভেট রক্তের ধরন, FeLV, ও FIV পরীক্ষা করেন।',
    eligible_card3_title: 'সেরা জীবনধারা',
    eligible_card3_text: 'ইনডোর ও স্থিতিশীল স্বাস্থ্য ইতিহাস থাকলে ভালো।',

    search_title: 'রক্তদাতা খুঁজুন',
    search_subtitle: 'অবস্থান এবং রক্তের ধরন দিয়ে খুঁজুন — সাথে সাথে ফোন নম্বর পান',
    label_division: 'বিভাগ',
    label_district: 'জেলা',
    label_blood: 'রক্তের ধরন',
    opt_all_div: 'সব বিভাগ',
    opt_all_dist: 'সব জেলা',
    opt_all_blood: 'সব ধরন',
    opt_select_div: 'বিভাগ নির্বাচন করুন',
    opt_select_dist: 'জেলা নির্বাচন করুন',
    btn_search: 'খুঁজুন',
    available_donors: 'উপলব্ধ দাতা',
    no_results: 'কোনো দাতা পাওয়া যায়নি। ফিল্টার পরিবর্তন করে দেখুন।',

    urgent_title: '🚨 জরুরি রক্ত দরকার?',
    urgent_sub: 'একটি জেলার সব দাতাকে সতর্কতা পাঠান',
    alert_phone_placeholder: 'আপনার ফোন নম্বর',
    select_district: 'জেলা নির্বাচন করুন',
    blood_type: 'রক্তের ধরন',
    alert_btn: 'জরুরি সতর্কতা পাঠান',

    guide_title: 'বিড়ালের রক্তের ধরন গাইড',
    guide_subtitle: 'বিড়ালের রক্তের সামঞ্জস্যতা বোঝা',
    guide_a_title: 'টাইপ A',
    guide_a_desc: 'সবচেয়ে সাধারণ রক্তের ধরন। Type A বিড়াল অন্য Type A দাতার রক্ত নিরাপদে গ্রহণ করতে পারে।',
    guide_a_yes: 'A তে দান করতে পারে',
    guide_a_no: 'B তে দান করতে পারে না',
    guide_a_warn: 'AB এর সাথে সতর্কতা',
    guide_b_title: 'টাইপ B',
    guide_b_desc: 'কম সাধারণ কিন্তু কিছু জাতে প্রচলিত। Type B বিড়ালের শক্তিশালী anti-A অ্যান্টিবডি থাকে।',
    guide_b_yes: 'B তে দান করতে পারে',
    guide_b_no: 'A তে দান করতে পারে না',
    guide_b_warn: 'AB এর সাথে সতর্কতা',
    guide_ab_title: 'টাইপ AB',
    guide_ab_desc: 'সবচেয়ে বিরল রক্তের ধরন। AB বিড়াল A, B, বা AB দাতার রক্ত গ্রহণ করতে পারে।',
    guide_ab_yes: 'A, B, AB থেকে গ্রহণ করতে পারে',
    guide_ab_no: 'শুধুমাত্র AB তে দান করা উচিত',
    guide_warn_title: '⚠️ গুরুত্বপূর্ণ',
    guide_warn_desc: 'যেকোনো রক্ত সঞ্চালনের আগে অবশ্যই একজন পশু চিকিৎসকের সাথে পরামর্শ করুন। একই রক্তের ধরন হলেও cross-matching পরীক্ষা করা উচিত।',

    login_title: 'স্বাগতম',
    login_sub: 'আপনার দাতা প্রোফাইল পরিচালনা করতে লগইন করুন',
    label_email: 'ইমেইল',
    label_password: 'পাসওয়ার্ড',
    login_email_placeholder: 'ইমেইল',
    login_password_placeholder: 'পাসওয়ার্ড',
    btn_login: 'লগইন',
    login_switch: 'অ্যাকাউন্ট নেই?',
    login_switch_link: 'নিবন্ধন করুন',

    signup_title: 'অ্যাকাউন্ট তৈরি করুন',
    signup_sub: 'নেটওয়ার্কে যোগ দিন এবং আপনার বিড়াল নিবন্ধন করুন',
    label_name: 'পূর্ণ নাম',
    label_phone: 'ফোন নম্বর',
    signup_name_placeholder: 'পূর্ণ নাম',
    signup_email_placeholder: 'ইমেইল',
    signup_password_placeholder: 'পাসওয়ার্ড',
    signup_phone_placeholder: 'ফোন নম্বর',
    btn_signup: 'অ্যাকাউন্ট তৈরি করুন',
    signup_switch: 'ইতিমধ্যে অ্যাকাউন্ট আছে?',
    signup_switch_link: 'লগইন',

    dash_title: 'ড্যাশবোর্ড',
    dash_welcome: 'স্বাগতম',
    dash_mycats: 'আমার বিড়ালরা',
    btn_addcat: '+ বিড়াল যোগ করুন',
    cat_name_placeholder: 'বিড়ালের নাম',
    cat_breed_placeholder: 'জাত',
    cat_age_placeholder: 'বয়স',
    cat_weight_placeholder: 'ওজন',
    btn_save: 'সংরক্ষণ করুন',
    btn_cancel: 'বাতিল',
    dash_nocats: 'আপনি এখনও কোনো বিড়াল নিবন্ধন করেননি।',
    dash_history: 'জরুরি সতর্কতা',
    dash_noalerts: 'এখনও কোনো জরুরি সতর্কতা নেই।',

    footer_desc: '২০২৬ সাল থেকে বাংলাদেশে বিড়াল রক্তদাতাদের সংযুক্ত করছি।',
    footer_love: 'বিড়ালদের জন্য ❤️ দিয়ে তৈরি।',
    calling: '📞 কল করুন',
    contact: 'মালিকের যোগাযোগ',
    label_emergency_phone: 'আপনার ফোন নম্বর'
  }
};

let currentLang = 'en';
let currentUser = null;
let alertSending = false;

function t(key) {
  return STRINGS[currentLang]?.[key] || STRINGS.en[key] || key;
}

function applyTranslations() {
  document.documentElement.lang = currentLang;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const text = t(key);

    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = text;
    } else if (el.tagName === 'OPTION') {
      el.textContent = text;
    } else if (el.dataset.i18nHtml === 'true') {
      el.innerHTML = text;
    } else {
      el.textContent = text;
    }
  });

  const top = document.getElementById('lang-toggle');
  const mob = document.getElementById('lang-toggle-mobile');
  const label = currentLang === 'en' ? 'বাং' : 'EN';
  if (top) top.textContent = label;
  if (mob) mob.textContent = label;
}

function toggleLang() {
  currentLang = currentLang === 'en' ? 'bn' : 'en';
  applyTranslations();
}

function toast(msg, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const el = document.createElement('div');
  el.className = `toast toast-${type}`;
  el.textContent = msg;
  container.appendChild(el);
  setTimeout(() => el.remove(), 3200);
}

async function initAuth() {
  const { data: { session } } = await sb.auth.getSession();
  if (session) currentUser = session.user;

  sb.auth.onAuthStateChange((_event, session) => {
    currentUser = session?.user || null;
    updateAuthNav();
    if (currentUser) requestNotificationPermission();
  });

  updateAuthNav();
}

function updateAuthNav() {
  const loginLink = document.getElementById('nav-login');
  const dashLink = document.getElementById('nav-dashboard');
  const logoutBtn = document.getElementById('nav-logout');
  if (!loginLink || !dashLink || !logoutBtn) return;

  if (currentUser) {
    loginLink.style.display = 'none';
    dashLink.style.display = '';
    logoutBtn.style.display = '';
  } else {
    loginLink.style.display = '';
    dashLink.style.display = 'none';
    logoutBtn.style.display = 'none';
  }
}

async function ensureDonorProfile(userId, email) {
  const { data, error } = await sb.from('donors').select('id').eq('user_id', userId).limit(1);
  const donorData = data && data.length > 0 ? data[0] : null;
  if (!error && donorData) return { data: donorData, error: null };

  const { error: insertError } = await sb.from('donors').insert({
    user_id: userId,
    phone_number: null,
    division: null,
    district: null,
    email
  });

  if (insertError && insertError.code !== '23505') return { data: null, error: insertError };

  const { data: newData, error: readErr } = await sb.from('donors').select('id').eq('user_id', userId).limit(1);
  const newDonor = newData && newData.length > 0 ? newData[0] : null;
  return { data: newDonor, error: readErr };
}

function navigateTo(viewId) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  const target = document.getElementById('view-' + viewId);
  if (target) target.classList.add('active');

  document.querySelectorAll('.nav-link').forEach(a => a.classList.remove('active'));
  const activeLink = document.querySelector(`.nav-link[data-view="${viewId}"]`);
  if (activeLink) activeLink.classList.add('active');

  const nav = document.getElementById('nav-links');
  if (nav) nav.classList.remove('open');

  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (viewId === 'home') renderHomeStats();
  if (viewId === 'search') renderSearchDefaults();
  if (viewId === 'dashboard') renderDashboard();
}

function router() {
  const hash = location.hash.replace('#', '') || 'home';
  if (hash === 'dashboard' && !currentUser) {
    location.hash = 'login';
    return;
  }
  navigateTo(hash);
}

function toggleMobileMenu() {
  const nav = document.getElementById('nav-links');
  if (nav) nav.classList.toggle('open');
}

function populateDivisionSelects() {
  ['search-division', 'signup-division', 'cat-division'].forEach(id => {
    const sel = document.getElementById(id);
    if (!sel) return;
    sel.innerHTML = '';
    const firstOpt = document.createElement('option');
    firstOpt.value = '';
    firstOpt.textContent = t('opt_select_div');
    sel.appendChild(firstOpt);

    Object.keys(BD_LOCATIONS).forEach(div => {
      const opt = document.createElement('option');
      opt.value = div;
      opt.textContent = div;
      sel.appendChild(opt);
    });
  });
}

function populateAlertDistricts() {
  const sel = document.getElementById('alert-district');
  if (!sel) return;
  sel.innerHTML = '';
  const firstOpt = document.createElement('option');
  firstOpt.value = '';
  firstOpt.textContent = t('select_district');
  sel.appendChild(firstOpt);

  Object.values(BD_LOCATIONS).flat().sort().forEach(d => {
    const opt = document.createElement('option');
    opt.value = d;
    opt.textContent = d;
    sel.appendChild(opt);
  });
}

function updateDistricts(forId = 'search-division', toId = 'search-district') {
  const divSel = document.getElementById(forId);
  const distSel = document.getElementById(toId);
  if (!divSel || !distSel) return;

  const div = divSel.value;
  distSel.innerHTML = '';

  const firstOpt = document.createElement('option');
  firstOpt.value = '';
  firstOpt.textContent = t('opt_select_dist');
  distSel.appendChild(firstOpt);

  if (div && BD_LOCATIONS[div]) {
    BD_LOCATIONS[div].forEach(d => {
      const opt = document.createElement('option');
      opt.value = d;
      opt.textContent = d;
      distSel.appendChild(opt);
    });
  }
}

function updateCatDistricts() {
  const div = document.getElementById('cat-division')?.value;
  const sel = document.getElementById('cat-district');
  if (!sel) return;

  sel.innerHTML = '';
  const firstOpt = document.createElement('option');
  firstOpt.value = '';
  firstOpt.textContent = t('opt_select_dist');
  sel.appendChild(firstOpt);

  if (div && BD_LOCATIONS[div]) {
    BD_LOCATIONS[div].forEach(d => {
      const opt = document.createElement('option');
      opt.value = d;
      opt.textContent = d;
      sel.appendChild(opt);
    });
  }
}

async function renderHomeStats() {
  const { count: donorCount } = await sb.from('cats').select('*', { count: 'exact', head: true });
  const { count: alertCount } = await sb.from('emergency_alerts').select('*', { count: 'exact', head: true });
  const d = document.getElementById('stat-donors');
  const a = document.getElementById('stat-alerts');
  if (d) d.textContent = donorCount || 0;
  if (a) a.textContent = alertCount || 0;
}

async function renderSearchDefaults() {
  const { data, error } = await sb.from('cats')
    .select('*, donors(phone_number, division, district)')
    .order('created_at', { ascending: false });

  if (error) {
    console.error(error);
    return;
  }

  renderDonorCards(data || [], 'search-results');
  const noRes = document.getElementById('no-results');
  if (noRes) noRes.style.display = (data && data.length) ? 'none' : 'block';
}

async function handleSearch(e) {
  e.preventDefault();
  const division = document.getElementById('search-division').value;
  const district = document.getElementById('search-district').value;
  const blood = document.getElementById('search-blood').value;

  let query = sb.from('cats')
    .select('*, donors(phone_number, division, district)')
    .order('created_at', { ascending: false });

  if (blood) query = query.eq('blood_type', blood);

  const { data, error } = await query;
  if (error) {
    toast('Search failed.', 'error');
    return;
  }

  let results = data || [];
  if (division) results = results.filter(c => c.division === division);
  if (district) results = results.filter(c => c.district === district);

  renderDonorCards(results, 'search-results');
  const noRes = document.getElementById('no-results');
  if (noRes) noRes.style.display = results.length ? 'none' : 'block';
}

function renderDonorCards(cats, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  if (cats.length === 0) {
    container.innerHTML = '';
    return;
  }

  container.innerHTML = cats.map(c => `
    <div class="donor-card">
      <div class="donor-card-header">
        <div class="donor-avatar">🐱</div>
        <div>
          <div class="donor-name">${esc(c.name)}</div>
          <div class="donor-location">${esc(c.division || '')} → ${esc(c.district || '')}</div>
        </div>
      </div>
      <div class="donor-details">
        <span class="donor-tag blood">🩸 Type ${esc(c.blood_type)}</span>
        <span class="donor-tag age">🎂 ${esc(String(c.age || ''))} yr</span>
        <span class="donor-tag weight">⚖️ ${esc(String(c.weight || ''))} kg</span>
      </div>
      <div class="donor-contact">
        <div class="donor-phone">
          <small>${t('contact')}</small>
          ${esc(c.donors?.phone_number || 'Not provided')}
        </div>
        <a href="tel:${esc(c.donors?.phone_number || '')}" class="btn btn-call">${t('calling')}</a>
      </div>
    </div>
  `).join('');
}

async function requestNotificationPermission() {
  if (!('Notification' in window)) return false;
  if (Notification.permission === 'granted') return true;
  if (Notification.permission === 'denied') return false;
  const permission = await Notification.requestPermission();
  return permission === 'granted';
}

async function notifyDonorsEmail(district, bloodType, seekerPhone) {
  if (typeof emailjs === 'undefined') {
    toast('Alert saved, but email failed. EmailJS not loaded.', 'error');
    return;
  }

  const { data: donors, error: fetchError } = await sb.from('donors')
    .select('email')
    .eq('district', district);

  if (fetchError || !donors?.length) return;

  const validDonors = donors.filter(d => d.email && d.email.trim());
  if (validDonors.length === 0) {
    toast('Alert saved, but no donors have emails yet.', 'warning');
    return;
  }

  const EMAILJS_SERVICE_ID = 'service_f8fudhp';
  const EMAILJS_TEMPLATE_ID = 'template_l2khfjj';

  let sentCount = 0;

  for (const donor of validDonors) {
    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        to_email: donor.email,
        district,
        blood_type: bloodType,
        seeker_phone: seekerPhone
      });
      sentCount++;
    } catch (error) {
      console.error(error);
    }
  }

  toast(`✅ Emergency alert sent! ${sentCount} donor(s) notified.`, 'success');
}

async function sendEmergencyAlert(e) {
  e.preventDefault();

  if (alertSending) {
    toast('⚠️ Alert already sending, please wait...', 'error');
    return;
  }

  alertSending = true;

  try {
    const phone = document.getElementById('alert-phone').value.trim();
    const district = document.getElementById('alert-district').value;
    const blood = document.getElementById('alert-blood').value;

    if (!phone || !district || !blood) {
      toast('Please fill all fields.', 'error');
      return;
    }

    const confirmEl = document.getElementById('alert-confirm');
    if (confirmEl) {
      confirmEl.style.display = 'block';
      confirmEl.innerHTML = '<p style="color:#666;">🔄 Sending to all donors...</p>';
    }

    const { error } = await sb.from('emergency_alerts').insert({
      user_id: null,
      district,
      blood_type: blood,
      seeker_phone_number: phone,
      seeker_message: `Urgent: Type ${blood} blood needed in ${district}`,
      created_at: new Date().toISOString(),
      resolved: false
    });

    if (error) {
      toast('Failed to send alert: ' + error.message, 'error');
      if (confirmEl) confirmEl.innerHTML = '<p style="color:#e74c3c;">❌ Error saving alert</p>';
      return;
    }

    await notifyDonorsEmail(district, blood, phone);

    if (confirmEl) {
      confirmEl.innerHTML = `✅ Alert recorded for ${esc(district)}! Emails sent to donors.`;
    }

    toast(`✅ Emergency alert sent for ${district}! Donors will be notified.`, 'success');
    e.target.reset();
  } finally {
    alertSending = false;
  }
}

async function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value.trim().toLowerCase();
  const password = document.getElementById('login-password').value;

  if (!email || !password) {
    toast('Please enter email and password.', 'error');
    return;
  }

  const { data, error } = await sb.auth.signInWithPassword({ email, password });
  if (error) {
    toast('Login failed: ' + error.message, 'error');
    return;
  }

  currentUser = data.user;
  const { error: donorErr } = await ensureDonorProfile(currentUser.id, email);
  if (donorErr) toast('Profile issue: ' + donorErr.message, 'error');

  updateAuthNav();
  toast('Welcome back!', 'success');
  location.hash = 'dashboard';
}

async function handleSignup(e) {
  e.preventDefault();
  const name = document.getElementById('signup-name').value.trim();
  const email = document.getElementById('signup-email').value.trim();
  const password = document.getElementById('signup-password').value;
  const phone = document.getElementById('signup-phone').value.trim();
  const division = document.getElementById('signup-division').value;
  const district = document.getElementById('signup-district').value;

  if (!name || !email || !password || !phone) {
    toast('Please fill all required fields.', 'error');
    return;
  }
  if (!division || !district) {
    toast('Please select both division and district.', 'error');
    return;
  }

  const phoneClean = phone.replace(/\s/g, '');
  if (!/^(?:\+8801|01)[3-9]\d{8}$/.test(phoneClean)) {
    toast('Please enter a valid Bangladeshi phone number.', 'error');
    return;
  }
  if (password.length < 6) {
    toast('Password must be at least 6 characters.', 'error');
    return;
  }

  const { data, error } = await sb.auth.signUp({
    email,
    password,
    options: { data: { name, phone_number: phone, division, district } }
  });

  if (error) {
    toast('Signup failed: ' + error.message, 'error');
    return;
  }

  if (data.user) {
    const { error: donorError } = await sb.from('donors').insert({
      user_id: data.user.id,
      phone_number: phone,
      division,
      district,
      email
    });

    if (donorError && donorError.code !== '23505') {
      toast('Profile save failed: ' + donorError.message, 'error');
      return;
    }
  }

  toast('Account created! You can now log in.', 'success');
  location.hash = 'login';
}

async function logout() {
  await sb.auth.signOut();
  currentUser = null;
  updateAuthNav();
  toast('Logged out successfully.', 'info');
  location.hash = 'home';
}

async function renderDashboard() {
  if (!currentUser) return;
  const welcomeEl = document.getElementById('dash-welcome');
  if (welcomeEl) welcomeEl.textContent = `${t('dash_welcome')}, ${currentUser.email}!`;
  await renderMyCats();
  await renderDashAlerts();
}

async function renderMyCats() {
  const { data, error: donorErr } = await sb.from('donors').select('id').eq('user_id', currentUser.id).limit(1);
  const donorData = data && data.length > 0 ? data[0] : null;

  const container = document.getElementById('cat-list');
  const noCats = document.getElementById('no-cats');

  if (donorErr || !donorData) {
    if (container) container.innerHTML = '';
    if (noCats) noCats.style.display = 'block';
    return;
  }

  const { data: cats } = await sb.from('cats').select('*').eq('donor_id', donorData.id);
  if (noCats) noCats.style.display = 'none';

  if (!cats || cats.length === 0) {
    if (container) container.innerHTML = '';
    if (noCats) noCats.style.display = 'block';
    return;
  }

  container.innerHTML = cats.map(c => `
    <div class="donor-card">
      <div class="donor-card-header">
        <div class="donor-avatar">🐱</div>
        <div>
          <div class="donor-name">${esc(c.name)}</div>
          <div class="donor-location">${esc(c.division || '')} → ${esc(c.district || '')}</div>
        </div>
      </div>
      <div class="donor-details">
        <span class="donor-tag blood">🩸 Type ${esc(c.blood_type)}</span>
        <span class="donor-tag age">🎂 ${esc(String(c.age || ''))} yr</span>
        <span class="donor-tag weight">⚖️ ${esc(String(c.weight || ''))} kg</span>
      </div>
      <div class="donor-actions">
        <button type="button" class="btn btn-ghost btn-sm" style="color:var(--red);" onclick="deleteCat('${c.id}')">🗑️ Delete</button>
      </div>
    </div>
  `).join('');
}

function toggleCatForm() {
  const form = document.getElementById('cat-form');
  if (form) form.style.display = form.style.display === 'none' ? 'block' : 'none';
}

async function handleAddCat(e) {
  e.preventDefault();

  if (!currentUser?.id) {
    toast('Please log in first.', 'error');
    return;
  }

  const name = document.getElementById('cat-name')?.value.trim();
  const breed = document.getElementById('cat-breed')?.value.trim() || '';
  const age = +document.getElementById('cat-age')?.value;
  const weight = +document.getElementById('cat-weight')?.value;
  const division = document.getElementById('cat-division')?.value;
  const district = document.getElementById('cat-district')?.value;
  const bloodType = document.getElementById('cat-blood')?.value;

  if (!name || !age || !weight || !bloodType || !division || !district) {
    toast('Please fill in all fields.', 'error');
    return;
  }

  const { data, error: donorErr } = await sb.from('donors').select('id').eq('user_id', currentUser.id).limit(1);
  const donorData = data && data.length > 0 ? data[0] : null;

  if (donorErr || !donorData) {
    toast('Donor profile not found. Please complete your profile.', 'error');
    return;
  }

  const { error } = await sb.from('cats').insert({
    donor_id: donorData.id,
    name,
    breed,
    age,
    weight,
    blood_type: bloodType,
    location: `${division}, ${district}`,
    division,
    district
  });

  if (error) {
    toast('Failed to register cat: ' + error.message, 'error');
    return;
  }

  e.target.reset();
  toggleCatForm();
  toast(`${name} registered as a donor!`, 'success');
  await renderMyCats();
}

async function deleteCat(id) {
  if (!confirm('Are you sure you want to remove this cat?')) return;
  const { error } = await sb.from('cats').delete().eq('id', id);
  if (error) {
    toast('Failed to delete: ' + error.message, 'error');
    return;
  }
  toast('Cat removed.', 'info');
  await renderMyCats();
}

async function renderDashAlerts() {
  const container = document.getElementById('dash-alerts');
  const noAlerts = document.getElementById('no-alerts');
  const { data } = await sb.from('emergency_alerts')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(10);

  if (!data || data.length === 0) {
    if (container) container.innerHTML = '';
    if (noAlerts) noAlerts.style.display = 'block';
    return;
  }
  if (noAlerts) noAlerts.style.display = 'none';

  container.innerHTML = data.map(a => {
    const time = new Date(a.created_at).toLocaleString();
    const phone = a.seeker_phone_number || 'Not provided';

    return `
      <div class="alert-card">
        <div class="alert-inner">
          <p class="alert-tag" style="margin:0 0 5px 0;color:#e04f4f;">🚨 Emergency Alert</p>
          <p style="margin:2px 0;color:#1a1a1a;">
            <strong>Seeking donor in:</strong>
            <span style="color:#0066cc;font-weight:bold;">${esc(a.district)}</span>
          </p>
          <p style="margin:2px 0;"><strong>Blood Type:</strong> ${esc(a.blood_type)}</p>
          <p style="margin:2px 0 0 0;"><strong>Seeker Phone:</strong> ${esc(phone)}</p>
          <p style="margin:10px 0 5px 0;color:#777;font-size:0.9em;">Please contact this seeker only if you know a cat donor in this district.</p>
          <small style="color:#999;">${time}</small>
        </div>
      </div>
    `;
  }).join('');
}

function esc(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = String(str);
  return div.innerHTML;
}

window.addEventListener('DOMContentLoaded', async () => {
  await initAuth();
  populateDivisionSelects();
  populateAlertDistricts();
  applyTranslations();
  router();
});

window.addEventListener('hashchange', router);
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 10);
});

window.handleSearch = handleSearch;
window.handleAddCat = handleAddCat;
window.handleLogin = handleLogin;
window.handleSignup = handleSignup;
window.sendEmergencyAlert = sendEmergencyAlert;
window.deleteCat = deleteCat;
window.logout = logout;
window.toggleCatForm = toggleCatForm;
window.toggleMobileMenu = toggleMobileMenu;
window.toggleLang = toggleLang;
window.updateDistricts = updateDistricts;
window.updateCatDistricts = updateCatDistricts;
