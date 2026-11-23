/* ===================================================
   CatBloodBD – Application Logic (Supabase Edition)
   Clinic-first: find a transfusion-capable clinic, then a donor.
   =================================================== */

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL = 'https://mgtukytgvoodupefhhoj.supabase.co/rest/v1/v';
const SUPABASE_ANON_KEY = 'sb_publishable_ga5Ws__vZRq9clJ4EhM-NQ_vD7Pg-Vn';
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

const PHONE_RE = /^(?:\+8801|01)[3-9]\d{8}$/;
const ALERT_COOLDOWN_MS = 10 * 60 * 1000;

const STRINGS = {
  en: {
    nav_home: 'Home',
    nav_search: 'Search',
    nav_clinics: 'Clinics',
    nav_guide: 'Guide',
    nav_login: 'Login',
    nav_dashboard: 'Dashboard',
    nav_logout: 'Logout',

    hero_tag: '🐾 A cat blood donor network for Bangladesh',
    hero_title: "Every Drop Counts.<br/>Save a Cat's Life Today.",
    hero_sub: 'Find a vet clinic that lists blood transfusion, then connect with a donor cat nearby. Emergency alerts reach donors across your division.',
    hero_cta1: 'Find a Clinic & Donor',
    hero_cta2: 'Register Your Cat',
    hero_trust1: 'Free Forever',
    hero_trust2: 'Clinic-first matching',
    hero_trust3: 'Instant Contact',

    how_title: 'How It Works',
    how_subtitle: 'Three simple steps to save a life',
    step1_title: 'Register Your Cat',
    step1_desc: "Create an account and add your cat's blood type, location, and contact details.",
    step2_title: 'Find a Clinic',
    step2_desc: 'A transfusion needs a vet with the right equipment. Find a listed clinic near you and call first.',
    step3_title: 'Match a Donor & Meet at the Clinic',
    step3_desc: 'Contact a donor in your division and meet at the clinic. The vet screens and cross-matches.',

    stat_donors: 'Donor Cats',
    stat_clinics: 'Clinics Listed',
    stat_alerts: 'Alerts Sent',

    mission_title: 'Our Mission',
    mission_desc: "Cat blood transfusions save lives, but finding a compatible donor in Bangladesh is hard, and not every district has a clinic that can do the procedure. We're building a registry of donors and transfusion-capable clinics so that no cat owner faces that helpless moment alone.",
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
    eligible_subtitle: 'Most donor cats share a few healthy traits. Your vet makes the final call.',
    eligible_card1_title: 'Good Donor Traits',
    eligible_card1_text: 'Usually 1–8 years old, at least 4 kg, healthy, calm, and fully vaccinated.',
    eligible_card2_title: 'Health Checks',
    eligible_card2_text: 'Vets check blood type and screen for FeLV and FIV.',
    eligible_card3_title: 'Best Lifestyle',
    eligible_card3_text: 'Indoor cats with stable health histories are easier to screen.',

    search_title: 'Find a Clinic & Donor',
    search_subtitle: 'Transfusions happen at a vet clinic. Check clinics first, then contact donors nearby.',
    notice_call_first: 'Always call the clinic before you travel. Transfusion availability can change, and the vet must screen and cross-match the donor.',
    label_division: 'Division',
    label_district: 'District',
    label_blood: 'Blood Type',
    opt_all_div: 'All Divisions',
    opt_all_dist: 'All Districts',
    opt_all_blood: 'All Types',
    opt_select_div: 'Select Division',
    opt_select_dist: 'Select District',
    btn_search: 'Search',
    step_clinics: 'Step 1 — Clinics that list blood transfusion',
    step_donors: 'Step 2 — Donor cats',
    available_donors: 'Available donors',
    no_results: 'No donors found. Try changing your filters.',
    no_clinics_at_all: 'No clinics listed yet.',
    no_clinic_district: 'No listed clinic in {district}. Showing clinics in {division} division.',
    no_clinic_division: 'No listed clinic in {division} division yet. Showing clinics elsewhere. A donor may need to travel.',

    clinic_listed: 'Listed on clinic website',
    clinic_confirmed: 'Confirmed by phone',
    clinic_24h: '24/7 emergency',
    last_verified: 'Last verified',
    source: 'Source ↗',
    phone: 'Phone',
    donor_travel: 'Can travel in division',

    urgent_title: '🚨 Need Blood Urgently?',
    urgent_sub: "Post an alert to donors in your division. Call a clinic first, because a donor can't help without one.",
    alert_phone_placeholder: 'Your phone number',
    blood_type: 'Blood Type',
    alert_btn: 'Post Emergency Alert',
    alert_posted: 'Alert posted for {division} division. Now call a clinic below.',

    clinics_title: 'Transfusion Clinics',
    clinics_subtitle: "This list comes from the clinics' own websites. Unless a clinic is marked confirmed by phone, call to check before you go.",
    suggest_title: 'Know a clinic that transfuses cats?',
    suggest_sub: "Tell us and we'll verify it by phone before listing it.",
    sug_name_placeholder: 'Clinic name',
    sug_phone_placeholder: 'Clinic phone (if you have it)',
    sug_note_placeholder: 'Anything else we should know? (optional)',
    btn_suggest: 'Suggest clinic',

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
    privacy_note: "Your phone number is shown to people searching for a donor cat. Only sign up if you're happy with that.",
    btn_signup: 'Create Account',
    signup_switch: 'Already have an account?',
    signup_switch_link: 'Login',

    dash_title: 'Dashboard',
    dash_welcome: 'Welcome',
    dash_mycats: 'My Cats',
    btn_addcat: '+ Add Cat',
    cat_name_placeholder: 'Cat Name',
    cat_breed_placeholder: 'Breed',
    cat_age_placeholder: 'Age (years)',
    cat_weight_placeholder: 'Weight (kg)',
    cat_travel: 'Willing to travel to other districts in my division',
    btn_save: 'Save',
    btn_delete: '🗑️ Delete',
    dash_nocats: "You haven't registered any cats yet.",
    dash_history: 'Emergency Alerts in Your Division',
    dash_noalerts: 'No emergency alerts yet.',
    alert_card_tag: '🚨 Emergency Alert',
    alert_card_seeking: 'Seeking donor in',
    alert_card_blood: 'Blood Type',
    alert_card_phone: 'Seeker Phone',
    alert_card_hint: 'Only contact this person if your cat can donate, and meet at a vet clinic.',

    footer_desc: 'Connecting cat blood donors across Bangladesh since 2026.',
    footer_love: 'Made with ❤️ for cats.',
    calling: '📞 Call',
    contact: 'Owner Contact'
  },

  bn: {
    nav_home: 'হোম',
    nav_search: 'খুঁজুন',
    nav_clinics: 'ক্লিনিক',
    nav_guide: 'গাইড',
    nav_login: 'লগইন',
    nav_dashboard: 'ড্যাশবোর্ড',
    nav_logout: 'লগআউট',

    hero_tag: '🐾 বাংলাদেশের বিড়াল রক্তদাতা নেটওয়ার্ক',
    hero_title: 'প্রতিটি ফোঁটা গুরুত্বপূর্ণ।<br/>আজই একটি বিড়ালের জীবন বাঁচান।',
    hero_sub: 'রক্ত সঞ্চালন তালিকাভুক্ত করেছে এমন ভেট ক্লিনিক খুঁজুন, তারপর কাছের দাতা বিড়ালের সাথে যোগাযোগ করুন। জরুরি সতর্কতা আপনার বিভাগের দাতাদের কাছে পৌঁছায়।',
    hero_cta1: 'ক্লিনিক ও দাতা খুঁজুন',
    hero_cta2: 'আপনার বিড়াল নিবন্ধন করুন',
    hero_trust1: 'সম্পূর্ণ বিনামূল্যে',
    hero_trust2: 'ক্লিনিক-ভিত্তিক ম্যাচিং',
    hero_trust3: 'তাৎক্ষণিক যোগাযোগ',

    how_title: 'কিভাবে কাজ করে',
    how_subtitle: 'তিনটি সহজ ধাপে একটি জীবন বাঁচান',
    step1_title: 'আপনার বিড়াল নিবন্ধন করুন',
    step1_desc: 'অ্যাকাউন্ট তৈরি করুন এবং আপনার বিড়ালের রক্তের ধরন, অবস্থান এবং যোগাযোগের তথ্য যোগ করুন।',
    step2_title: 'ক্লিনিক খুঁজুন',
    step2_desc: 'রক্ত সঞ্চালনের জন্য উপযুক্ত যন্ত্রপাতিসহ ভেট দরকার। কাছের তালিকাভুক্ত ক্লিনিক খুঁজে আগে ফোন করুন।',
    step3_title: 'দাতা মেলান ও ক্লিনিকে দেখা করুন',
    step3_desc: 'আপনার বিভাগের একজন দাতার সাথে যোগাযোগ করুন এবং ক্লিনিকে মিলিত হোন। ভেট স্ক্রিনিং ও ক্রস-ম্যাচ করবেন।',

    stat_donors: 'দাতা বিড়াল',
    stat_clinics: 'তালিকাভুক্ত ক্লিনিক',
    stat_alerts: 'পাঠানো সতর্কতা',

    mission_title: 'আমাদের লক্ষ্য',
    mission_desc: 'বিড়ালের রক্ত সঞ্চালন জীবন বাঁচায়, কিন্তু বাংলাদেশে সামঞ্জস্যপূর্ণ দাতা খুঁজে পাওয়া কঠিন, আর সব জেলায় এই সেবা দেওয়ার মতো ক্লিনিক নেই। আমরা দাতা ও সঞ্চালন-সক্ষম ক্লিনিকের একটি তালিকা তৈরি করছি, যাতে কোনো বিড়ালের মালিককে একা সেই কঠিন মুহূর্তের মুখোমুখি হতে না হয়।',
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
    eligible_subtitle: 'বেশিরভাগ দাতা বিড়ালের কিছু সাধারণ বৈশিষ্ট্য থাকে। চূড়ান্ত সিদ্ধান্ত আপনার ভেটের।',
    eligible_card1_title: 'ভালো দাতার বৈশিষ্ট্য',
    eligible_card1_text: 'সাধারণত ১–৮ বছর বয়সী, কমপক্ষে ৪ কেজি, সুস্থ, শান্ত, ও টিকা দেওয়া।',
    eligible_card2_title: 'স্বাস্থ্য পরীক্ষা',
    eligible_card2_text: 'ভেট রক্তের ধরন, FeLV, ও FIV পরীক্ষা করেন।',
    eligible_card3_title: 'সেরা জীবনধারা',
    eligible_card3_text: 'ইনডোর ও স্থিতিশীল স্বাস্থ্য ইতিহাস থাকলে ভালো।',

    search_title: 'ক্লিনিক ও দাতা খুঁজুন',
    search_subtitle: 'রক্ত সঞ্চালন হয় ভেট ক্লিনিকে। আগে ক্লিনিক দেখুন, তারপর কাছের দাতার সাথে যোগাযোগ করুন।',
    notice_call_first: 'যাওয়ার আগে অবশ্যই ক্লিনিকে ফোন করুন। সঞ্চালনের সুবিধা বদলাতে পারে, আর ভেটকেই দাতাকে স্ক্রিন ও ক্রস-ম্যাচ করতে হবে।',
    label_division: 'বিভাগ',
    label_district: 'জেলা',
    label_blood: 'রক্তের ধরন',
    opt_all_div: 'সব বিভাগ',
    opt_all_dist: 'সব জেলা',
    opt_all_blood: 'সব ধরন',
    opt_select_div: 'বিভাগ নির্বাচন করুন',
    opt_select_dist: 'জেলা নির্বাচন করুন',
    btn_search: 'খুঁজুন',
    step_clinics: 'ধাপ ১ — যে ক্লিনিকগুলো রক্ত সঞ্চালন তালিকাভুক্ত করেছে',
    step_donors: 'ধাপ ২ — দাতা বিড়াল',
    available_donors: 'উপলব্ধ দাতা',
    no_results: 'কোনো দাতা পাওয়া যায়নি। ফিল্টার পরিবর্তন করে দেখুন।',
    no_clinics_at_all: 'এখনও কোনো ক্লিনিক তালিকাভুক্ত হয়নি।',
    no_clinic_district: '{district} জেলায় কোনো তালিকাভুক্ত ক্লিনিক নেই। {division} বিভাগের ক্লিনিক দেখানো হচ্ছে।',
    no_clinic_division: '{division} বিভাগে এখনও কোনো তালিকাভুক্ত ক্লিনিক নেই। অন্য এলাকার ক্লিনিক দেখানো হচ্ছে। দাতাকে ভ্রমণ করতে হতে পারে।',

    clinic_listed: 'ক্লিনিকের ওয়েবসাইটে তালিকাভুক্ত',
    clinic_confirmed: 'ফোনে নিশ্চিত',
    clinic_24h: '২৪/৭ জরুরি সেবা',
    last_verified: 'শেষ যাচাই',
    source: 'সূত্র ↗',
    phone: 'ফোন',
    donor_travel: 'বিভাগের মধ্যে যেতে পারবে',

    urgent_title: '🚨 জরুরি রক্ত দরকার?',
    urgent_sub: 'আপনার বিভাগের দাতাদের জন্য সতর্কতা দিন। আগে একটি ক্লিনিকে ফোন করুন, কারণ ক্লিনিক ছাড়া দাতা সাহায্য করতে পারবে না।',
    alert_phone_placeholder: 'আপনার ফোন নম্বর',
    blood_type: 'রক্তের ধরন',
    alert_btn: 'জরুরি সতর্কতা দিন',
    alert_posted: '{division} বিভাগের জন্য সতর্কতা দেওয়া হয়েছে। এখন নিচের ক্লিনিকে ফোন করুন।',

    clinics_title: 'রক্ত সঞ্চালন ক্লিনিক',
    clinics_subtitle: 'এই তালিকা ক্লিনিকগুলোর নিজস্ব ওয়েবসাইট থেকে নেওয়া। "ফোনে নিশ্চিত" লেখা না থাকলে যাওয়ার আগে ফোন করে নিন।',
    suggest_title: 'কোনো ক্লিনিক কি বিড়ালের রক্ত সঞ্চালন করে?',
    suggest_sub: 'আমাদের জানান, তালিকাভুক্ত করার আগে আমরা ফোনে যাচাই করব।',
    sug_name_placeholder: 'ক্লিনিকের নাম',
    sug_phone_placeholder: 'ক্লিনিকের ফোন (জানা থাকলে)',
    sug_note_placeholder: 'আর কিছু জানানোর থাকলে (ঐচ্ছিক)',
    btn_suggest: 'ক্লিনিক জানান',

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
    privacy_note: 'দাতা খুঁজছেন এমন মানুষদের কাছে আপনার ফোন নম্বর দেখানো হবে। এতে রাজি থাকলেই নিবন্ধন করুন।',
    btn_signup: 'অ্যাকাউন্ট তৈরি করুন',
    signup_switch: 'ইতিমধ্যে অ্যাকাউন্ট আছে?',
    signup_switch_link: 'লগইন',

    dash_title: 'ড্যাশবোর্ড',
    dash_welcome: 'স্বাগতম',
    dash_mycats: 'আমার বিড়ালরা',
    btn_addcat: '+ বিড়াল যোগ করুন',
    cat_name_placeholder: 'বিড়ালের নাম',
    cat_breed_placeholder: 'জাত',
    cat_age_placeholder: 'বয়স (বছর)',
    cat_weight_placeholder: 'ওজন (কেজি)',
    cat_travel: 'আমার বিভাগের মধ্যে অন্য জেলায় যেতে রাজি',
    btn_save: 'সংরক্ষণ করুন',
    btn_delete: '🗑️ মুছুন',
    dash_nocats: 'আপনি এখনও কোনো বিড়াল নিবন্ধন করেননি।',
    dash_history: 'আপনার বিভাগের জরুরি সতর্কতা',
    dash_noalerts: 'এখনও কোনো জরুরি সতর্কতা নেই।',
    alert_card_tag: '🚨 জরুরি সতর্কতা',
    alert_card_seeking: 'দাতা খুঁজছেন',
    alert_card_blood: 'রক্তের ধরন',
    alert_card_phone: 'যোগাযোগের ফোন',
    alert_card_hint: 'আপনার বিড়াল দান করতে পারলেই যোগাযোগ করুন, আর ভেট ক্লিনিকে দেখা করুন।',

    footer_desc: '২০২৬ সাল থেকে বাংলাদেশে বিড়াল রক্তদাতাদের সংযুক্ত করছি।',
    footer_love: 'বিড়ালদের জন্য ❤️ দিয়ে তৈরি।',
    calling: '📞 কল করুন',
    contact: 'মালিকের যোগাযোগ'
  }
};

let currentLang = 'en';
let currentUser = null;
let alertSending = false;

/* ---------- helpers ---------- */

function t(key) {
  return STRINGS[currentLang]?.[key] || STRINGS.en[key] || key;
}

function tf(key, vars = {}) {
  return Object.entries(vars).reduce(
    (s, [k, v]) => s.replaceAll(`{${k}}`, v),
    t(key)
  );
}

function esc(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function telHref(phone) {
  return 'tel:' + String(phone || '').replace(/[^\d+]/g, '');
}

function val(id) {
  return document.getElementById(id)?.value ?? '';
}

function toast(msg, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const el = document.createElement('div');
  el.className = `toast toast-${type}`;
  el.textContent = msg;
  container.appendChild(el);
  setTimeout(() => el.remove(), 3600);
}

function placeholderOption(key) {
  const opt = document.createElement('option');
  opt.value = '';
  opt.dataset.i18n = key;
  opt.textContent = t(key);
  return opt;
}

/* ---------- i18n ---------- */

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

  const label = currentLang === 'en' ? 'বাং' : 'EN';
  const top = document.getElementById('lang-toggle');
  const mob = document.getElementById('lang-toggle-mobile');
  if (top) top.textContent = label;
  if (mob) mob.textContent = label;
}

function toggleLang() {
  currentLang = currentLang === 'en' ? 'bn' : 'en';
  applyTranslations();
  rerenderCurrentView();
}

function currentViewId() {
  return location.hash.replace('#', '') || 'home';
}

function rerenderCurrentView() {
  const v = currentViewId();
  if (v === 'search') runSearch();
  if (v === 'clinics') renderClinicsView();
  if (v === 'dashboard') renderDashboard();
}

/* ---------- auth ---------- */

async function initAuth() {
  const { data: { session } } = await sb.auth.getSession();
  if (session) currentUser = session.user;

  sb.auth.onAuthStateChange((_event, session) => {
    currentUser = session?.user || null;
    updateAuthNav();
  });

  updateAuthNav();
}

function updateAuthNav() {
  const loginLink = document.getElementById('nav-login');
  const dashLink = document.getElementById('nav-dashboard');
  const logoutBtn = document.getElementById('nav-logout');
  if (!loginLink || !dashLink || !logoutBtn) return;

  loginLink.style.display = currentUser ? 'none' : '';
  dashLink.style.display = currentUser ? '' : 'none';
  logoutBtn.style.display = currentUser ? '' : 'none';
}

// Creates the donors row from signup metadata if it doesn't exist yet.
// Needed because signUp() returns no session when email confirmation is on,
// so the insert at signup time can be blocked by row-level security.
async function ensureDonorProfile(user) {
  const { data, error } = await sb.from('donors').select('id').eq('user_id', user.id).limit(1);
  if (error) return { error };
  if (data && data.length) return { data: data[0] };

  const m = user.user_metadata || {};
  const { error: insertError } = await sb.from('donors').insert({
    user_id: user.id,
    phone_number: m.phone_number || null,
    division: m.division || null,
    district: m.district || null,
    email: user.email
  });

  if (insertError && insertError.code !== '23505') return { error: insertError };
  return { data: true };
}

async function handleLogin(e) {
  e.preventDefault();
  const email = val('login-email').trim().toLowerCase();
  const password = val('login-password');

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
  const { error: donorErr } = await ensureDonorProfile(currentUser);
  if (donorErr) toast('Profile issue: ' + donorErr.message, 'error');

  updateAuthNav();
  toast('Welcome back!', 'success');
  location.hash = 'dashboard';
}

async function handleSignup(e) {
  e.preventDefault();
  const name = val('signup-name').trim();
  const email = val('signup-email').trim().toLowerCase();
  const password = val('signup-password');
  const phone = val('signup-phone').trim().replace(/\s/g, '');
  const division = val('signup-division');
  const district = val('signup-district');

  if (!name || !email || !password || !phone) {
    toast('Please fill all required fields.', 'error');
    return;
  }
  if (!division || !district) {
    toast('Please select both division and district.', 'error');
    return;
  }
  if (!PHONE_RE.test(phone)) {
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

  // With a live session we can create the donor row now. Without one
  // (email confirmation on), ensureDonorProfile() does it at first login.
  if (data.user && data.session) {
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
    toast('Account created! You can now log in.', 'success');
  } else {
    toast('Account created. If you got a confirmation email, confirm it, then log in.', 'success');
  }

  location.hash = 'login';
}

async function logout() {
  await sb.auth.signOut();
  currentUser = null;
  updateAuthNav();
  toast('Logged out successfully.', 'info');
  location.hash = 'home';
}

/* ---------- routing ---------- */

const VIEWS = ['home', 'search', 'clinics', 'guide', 'login', 'signup', 'dashboard'];

function navigateTo(viewId) {
  if (!VIEWS.includes(viewId)) viewId = 'home';

  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.getElementById('view-' + viewId)?.classList.add('active');

  document.querySelectorAll('.nav-link').forEach(a => a.classList.remove('active'));
  document.querySelector(`.nav-link[data-view="${viewId}"]`)?.classList.add('active');

  document.getElementById('nav-links')?.classList.remove('open');
  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (viewId === 'home') renderHomeStats();
  if (viewId === 'search') runSearch();
  if (viewId === 'clinics') renderClinicsView();
  if (viewId === 'dashboard') renderDashboard();
}

function router() {
  const hash = currentViewId();
  if (hash === 'dashboard' && !currentUser) {
    location.hash = 'login';
    return;
  }
  navigateTo(hash);
}

function toggleMobileMenu() {
  document.getElementById('nav-links')?.classList.toggle('open');
}

/* ---------- location selects ---------- */

function populateDivisionSelects() {
  const withAll = ['search-division', 'clinics-division'];
  const withSelect = ['signup-division', 'cat-division', 'alert-division', 'sug-division'];

  [...withAll, ...withSelect].forEach(id => {
    const sel = document.getElementById(id);
    if (!sel) return;
    sel.innerHTML = '';
    sel.appendChild(placeholderOption(withAll.includes(id) ? 'opt_all_div' : 'opt_select_div'));

    Object.keys(BD_LOCATIONS).forEach(div => {
      const opt = document.createElement('option');
      opt.value = div;
      opt.textContent = div;
      sel.appendChild(opt);
    });
  });
}

function fillDistricts(divisionValue, distSel, placeholderKey) {
  if (!distSel) return;
  distSel.innerHTML = '';
  distSel.appendChild(placeholderOption(placeholderKey));

  if (divisionValue && BD_LOCATIONS[divisionValue]) {
    BD_LOCATIONS[divisionValue].forEach(d => {
      const opt = document.createElement('option');
      opt.value = d;
      opt.textContent = d;
      distSel.appendChild(opt);
    });
  }
}

function updateDistricts(forId = 'search-division', toId = 'search-district') {
  const divSel = document.getElementById(forId);
  const distSel = document.getElementById(toId);
  if (!divSel || !distSel) return;
  const key = toId === 'search-district' ? 'opt_all_dist' : 'opt_select_dist';
  fillDistricts(divSel.value, distSel, key);
}

function updateCatDistricts() {
  updateDistricts('cat-division', 'cat-district');
}

/* ---------- clinics ---------- */

async function loadClinics() {
  const { data, error } = await sb.from('clinics')
    .select('*')
    .order('status', { ascending: true }) // 'confirmed' sorts before 'listed'
    .order('name', { ascending: true });
  if (error) {
    console.error(error);
    return [];
  }
  return data || [];
}

// Puts clinics in the right order for a location and says whether to warn.
function rankClinics(all, division, district) {
  const inDistrict = district ? all.filter(c => c.district === district) : [];
  const inDivision = division
    ? all.filter(c => c.division === division && !inDistrict.includes(c))
    : [];
  const rest = all.filter(c => !inDistrict.includes(c) && !inDivision.includes(c));

  if (!division && !district) return { list: all, note: '' };

  if (district) {
    if (inDistrict.length) return { list: [...inDistrict, ...inDivision], note: '' };
    if (inDivision.length) return { list: inDivision, note: 'no_clinic_district' };
    return { list: rest, note: 'no_clinic_division' };
  }

  if (inDivision.length) return { list: inDivision, note: '' };
  return { list: rest, note: 'no_clinic_division' };
}

function safeUrl(u) {
  return /^https?:\/\//i.test(u || '') ? u : '';
}

function clinicCard(c) {
  const confirmed = c.status === 'confirmed';
  const url = safeUrl(c.source_url);
  return `
    <div class="clinic-card">
      <div>
        <div class="donor-name">${esc(c.name)}</div>
        <div class="donor-location">${esc(c.district)}, ${esc(c.division)}${c.address ? ' · ' + esc(c.address) : ''}</div>
      </div>
      <div class="chip-row">
        <span class="chip ${confirmed ? 'chip-ok' : 'chip-warn'}">${esc(confirmed ? t('clinic_confirmed') : t('clinic_listed'))}</span>
        ${c.emergency_24h ? `<span class="chip chip-ok">${esc(t('clinic_24h'))}</span>` : ''}
        ${c.last_verified ? `<span class="chip">${esc(t('last_verified'))}: ${esc(c.last_verified)}</span>` : ''}
      </div>
      ${c.notes ? `<p class="clinic-notes">${esc(c.notes)}</p>` : ''}
      <div class="donor-contact">
        <div class="donor-phone">
          <small>${esc(t('phone'))}</small>
          ${esc(c.phone || '—')}
        </div>
        ${c.phone ? `<a href="${esc(telHref(c.phone))}" class="btn btn-call">${esc(t('calling'))}</a>` : ''}
      </div>
      ${url ? `<a class="clinic-source" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(t('source'))}</a>` : ''}
    </div>
  `;
}

async function renderClinicsView() {
  const division = val('clinics-division');
  const all = await loadClinics();
  const list = division ? all.filter(c => c.division === division) : all;

  const el = document.getElementById('clinics-list');
  const empty = document.getElementById('clinics-empty');
  if (el) el.innerHTML = list.map(clinicCard).join('');
  if (empty) empty.style.display = list.length ? 'none' : 'block';
}

async function handleClinicSuggestion(e) {
  e.preventDefault();
  const name = val('sug-name').trim();
  const division = val('sug-division');
  const district = val('sug-district');
  const phone = val('sug-phone').trim();
  const note = val('sug-note').trim();

  if (!name || !division || !district) {
    toast('Please add a clinic name, division and district.', 'error');
    return;
  }

  const { error } = await sb.from('clinic_suggestions').insert({
    name: name.slice(0, 120),
    division,
    district,
    phone: phone.slice(0, 40) || null,
    note: note.slice(0, 500) || null
  });

  if (error) {
    toast('Could not send suggestion: ' + error.message, 'error');
    return;
  }

  e.target.reset();
  fillDistricts('', document.getElementById('sug-district'), 'opt_select_dist');
  toast('Thanks! We will verify this clinic by phone before listing it.', 'success');
}

/* ---------- home stats ---------- */

async function renderHomeStats() {
  // Counts come from a database function because alerts aren't publicly readable.
  const { data, error } = await sb.rpc('site_stats');
  if (error) console.error(error);
  const set = (id, n) => {
    const el = document.getElementById(id);
    if (el) el.textContent = n || 0;
  };
  set('stat-donors', data?.cats);
  set('stat-clinics', data?.clinics);
  set('stat-alerts', data?.alerts);
}

/* ---------- search (clinics first, then donors) ---------- */

function handleSearch(e) {
  e.preventDefault();
  runSearch();
}

async function runSearch() {
  const division = val('search-division');
  const district = val('search-district');
  const blood = val('search-blood');

  let catQuery = sb.from('cats')
    .select('*, donors(phone_number, division, district)')
    .order('created_at', { ascending: false });
  if (blood) catQuery = catQuery.eq('blood_type', blood);

  const [allClinics, catRes] = await Promise.all([loadClinics(), catQuery]);

  // Step 1: clinics
  const { list: clinics, note } = rankClinics(allClinics, division, district);
  const clinicEl = document.getElementById('search-clinics');
  const noClinics = document.getElementById('no-clinics');
  const noteEl = document.getElementById('clinic-note');

  if (clinicEl) clinicEl.innerHTML = clinics.map(clinicCard).join('');
  if (noClinics) noClinics.style.display = clinics.length ? 'none' : 'block';
  if (noteEl) {
    if (note && clinics.length) {
      noteEl.textContent = tf(note, { district, division });
      noteEl.style.display = 'block';
    } else {
      noteEl.style.display = 'none';
    }
  }

  // Step 2: donors
  if (catRes.error) {
    console.error(catRes.error);
    toast('Donor search failed.', 'error');
    return;
  }

  let cats = catRes.data || [];
  if (district) {
    // Same district, plus anyone in the division who said they can travel.
    cats = cats.filter(c => c.district === district || (c.division === division && c.travel_ok));
    cats.sort((a, b) => (b.district === district) - (a.district === district));
  } else if (division) {
    cats = cats.filter(c => c.division === division);
  }

  renderDonorCards(cats, 'search-results', district);
  const countEl = document.getElementById('result-count');
  if (countEl) countEl.textContent = cats.length ? String(cats.length) : '';
  const noRes = document.getElementById('no-results');
  if (noRes) noRes.style.display = cats.length ? 'none' : 'block';
}

function catDetails(c) {
  return `
    <div class="donor-details">
      <span class="donor-tag blood">🩸 Type ${esc(c.blood_type)}</span>
      <span class="donor-tag age">🎂 ${esc(c.age ?? '')} yr</span>
      <span class="donor-tag weight">⚖️ ${esc(c.weight ?? '')} kg</span>
    </div>
  `;
}

function renderDonorCards(cats, containerId, searchedDistrict = '') {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = cats.map(c => {
    const travelling = searchedDistrict && c.district !== searchedDistrict;
    const phone = c.donors?.phone_number;
    return `
      <div class="donor-card">
        <div class="donor-card-header">
          <div class="donor-avatar">🐱</div>
          <div>
            <div class="donor-name">${esc(c.name)}</div>
            <div class="donor-location">${esc(c.division || '')} → ${esc(c.district || '')}</div>
          </div>
        </div>
        ${catDetails(c)}
        ${travelling ? `<div class="chip-row"><span class="chip chip-ok">${esc(t('donor_travel'))}</span></div>` : ''}
        <div class="donor-contact">
          <div class="donor-phone">
            <small>${esc(t('contact'))}</small>
            ${esc(phone || '—')}
          </div>
          ${phone ? `<a href="${esc(telHref(phone))}" class="btn btn-call">${esc(t('calling'))}</a>` : ''}
        </div>
      </div>
    `;
  }).join('');
}

/* ---------- emergency alert ---------- */

async function sendEmergencyAlert(e) {
  e.preventDefault();
  if (alertSending) return;

  const phone = val('alert-phone').trim().replace(/\s/g, '');
  const division = val('alert-division');
  const blood = val('alert-blood');

  if (!phone || !division || !blood) {
    toast('Please fill all fields.', 'error');
    return;
  }
  if (!PHONE_RE.test(phone)) {
    toast('Please enter a valid Bangladeshi phone number.', 'error');
    return;
  }

  // Light client-side brake against accidental double posts. Not real
  // abuse protection: that has to live in Supabase (rate limits / RLS).
  try {
    const last = Number(localStorage.getItem('cbbd_last_alert') || 0);
    if (Date.now() - last < ALERT_COOLDOWN_MS) {
      toast('You posted an alert a few minutes ago. Please wait before posting another.', 'warning');
      return;
    }
  } catch (_) { /* storage blocked: skip the brake */ }

  alertSending = true;
  const confirmEl = document.getElementById('alert-confirm');

  try {
    const { error } = await sb.from('emergency_alerts').insert({
      user_id: null,
      division,
      district: 'Any',
      blood_type: blood,
      seeker_phone_number: phone,
      seeker_message: `Urgent: Type ${blood} blood needed in ${division} division`,
      created_at: new Date().toISOString(),
      resolved: false
    });

    if (error) {
      toast('Failed to post alert: ' + error.message, 'error');
      return;
    }

    try { localStorage.setItem('cbbd_last_alert', String(Date.now())); } catch (_) { /* ignore */ }

    // Show clinics straight away: a donor can't help without one.
    const { list } = rankClinics(await loadClinics(), division, '');
    if (confirmEl) {
      confirmEl.style.display = 'block';
      confirmEl.innerHTML = `
        <div class="notice notice-info">${esc(tf('alert_posted', { division }))}</div>
        <div class="clinic-grid">${list.map(clinicCard).join('')}</div>
      `;
    }

    toast(tf('alert_posted', { division }), 'success');
    e.target.reset();
  } finally {
    alertSending = false;
  }
}

/* ---------- dashboard ---------- */

async function getMyDonor(columns = 'id') {
  const { data, error } = await sb.from('donors')
    .select(columns)
    .eq('user_id', currentUser.id)
    .limit(1);
  return { donor: data && data.length ? data[0] : null, error };
}

async function renderDashboard() {
  if (!currentUser) return;
  const welcomeEl = document.getElementById('dash-welcome');
  if (welcomeEl) welcomeEl.textContent = `${t('dash_welcome')}, ${currentUser.email}!`;
  await renderMyCats();
  await renderDashAlerts();
}

async function renderMyCats() {
  const container = document.getElementById('cat-list');
  const noCats = document.getElementById('no-cats');
  const { donor, error } = await getMyDonor();

  if (error || !donor) {
    if (container) container.innerHTML = '';
    if (noCats) noCats.style.display = 'block';
    return;
  }

  const { data: cats } = await sb.from('cats').select('*').eq('donor_id', donor.id);

  if (!cats || cats.length === 0) {
    if (container) container.innerHTML = '';
    if (noCats) noCats.style.display = 'block';
    return;
  }
  if (noCats) noCats.style.display = 'none';

  container.innerHTML = cats.map(c => `
    <div class="donor-card">
      <div class="donor-card-header">
        <div class="donor-avatar">🐱</div>
        <div>
          <div class="donor-name">${esc(c.name)}</div>
          <div class="donor-location">${esc(c.division || '')} → ${esc(c.district || '')}</div>
        </div>
      </div>
      ${catDetails(c)}
      ${c.travel_ok ? `<div class="chip-row"><span class="chip chip-ok">${esc(t('donor_travel'))}</span></div>` : ''}
      <div class="donor-actions">
        <button type="button" class="btn btn-ghost btn-sm" style="color:var(--red);" data-delete-cat="${esc(c.id)}">${esc(t('btn_delete'))}</button>
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

  const name = val('cat-name').trim();
  const breed = val('cat-breed').trim();
  const age = Number(val('cat-age'));
  const weight = Number(val('cat-weight'));
  const division = val('cat-division');
  const district = val('cat-district');
  const bloodType = val('cat-blood');
  const travelOk = !!document.getElementById('cat-travel')?.checked;

  if (!name || !age || !weight || !bloodType || !division || !district) {
    toast('Please fill in all fields.', 'error');
    return;
  }
  if (age < 1 || age > 8 || weight < 4) {
    toast('Donor cats are usually 1–8 years old and at least 4 kg. Ask your vet if you are unsure.', 'warning');
    return;
  }

  const { donor, error: donorErr } = await getMyDonor();
  if (donorErr || !donor) {
    toast('Donor profile not found. Please log out and log in again.', 'error');
    return;
  }

  const { error } = await sb.from('cats').insert({
    donor_id: donor.id,
    name,
    breed,
    age,
    weight,
    blood_type: bloodType,
    location: `${division}, ${district}`,
    division,
    district,
    travel_ok: travelOk
  });

  if (error) {
    toast('Failed to register cat: ' + error.message, 'error');
    return;
  }

  e.target.reset();
  fillDistricts('', document.getElementById('cat-district'), 'opt_select_dist');
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

  const { donor } = await getMyDonor('id, division');
  const division = donor?.division;

  let data = [];
  if (division) {
    const res = await sb.from('emergency_alerts')
      .select('*')
      .eq('division', division)
      .order('created_at', { ascending: false })
      .limit(10);
    data = res.data || [];
  }

  if (data.length === 0) {
    if (container) container.innerHTML = '';
    if (noAlerts) noAlerts.style.display = 'block';
    return;
  }
  if (noAlerts) noAlerts.style.display = 'none';

  container.innerHTML = data.map(a => `
    <div class="alert-card">
      <p class="alert-tag">${esc(t('alert_card_tag'))}</p>
      <p><strong>${esc(t('alert_card_seeking'))}:</strong> ${esc(a.division)}</p>
      <p><strong>${esc(t('alert_card_blood'))}:</strong> ${esc(a.blood_type)}</p>
      <p><strong>${esc(t('alert_card_phone'))}:</strong> ${esc(a.seeker_phone_number || '—')}</p>
      <p class="alert-hint">${esc(t('alert_card_hint'))}</p>
      <small>${esc(new Date(a.created_at).toLocaleString())}</small>
    </div>
  `).join('');
}

/* ---------- boot ---------- */

window.addEventListener('DOMContentLoaded', async () => {
  populateDivisionSelects();
  applyTranslations();
  await initAuth();
  router();

  // Delegated so cat ids never get interpolated into inline JS.
  document.getElementById('cat-list')?.addEventListener('click', ev => {
    const btn = ev.target.closest('[data-delete-cat]');
    if (btn) deleteCat(btn.dataset.deleteCat);
  });
});

window.addEventListener('hashchange', router);
window.addEventListener('scroll', () => {
  document.getElementById('navbar')?.classList.toggle('scrolled', window.scrollY > 10);
});

Object.assign(window, {
  handleSearch,
  handleAddCat,
  handleLogin,
  handleSignup,
  handleClinicSuggestion,
  sendEmergencyAlert,
  renderClinicsView,
  logout,
  toggleCatForm,
  toggleMobileMenu,
  toggleLang,
  updateDistricts,
  updateCatDistricts
});
