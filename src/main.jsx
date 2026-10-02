import React, { useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const jobs = [
  { id: 'northstar-customer', title: 'Customer Success Associate', company: 'Northstar Health', location: 'Austin, TX', distance: '3.2 mi', pay: '$22–$27/hr', payValue: 24.5, schedule: 'Full-time', type: 'Customer service', posted: '2h ago', postedValue: 2, badge: 'Verified pay', accent: 'teal', remote: false, logo: 'N', description: 'Help members navigate a better healthcare experience from a team that cares about the whole person.', tags: ['Benefits from day one', 'No weekends'], responsibilities: ['Guide members through account and benefit questions', 'Partner with clinical teams to resolve complex requests', 'Turn recurring questions into clearer self-serve resources'], qualifications: ['1+ year in customer support or hospitality', 'Clear, empathetic written and verbal communication', 'Comfort with learning new software quickly'], benefits: ['Medical, dental & vision', '401(k) with company match', 'Annual learning stipend'] },
  { id: 'lumen-warehouse', title: 'Warehouse Associate — Evening Shift', company: 'Lumen Logistics', location: 'Phoenix, AZ', distance: '5.8 mi', pay: '$19.50/hr', payValue: 19.5, schedule: 'Part-time', type: 'Warehouse', posted: '4h ago', postedValue: 4, badge: 'Hiring now', accent: 'orange', remote: false, logo: 'L', description: 'Keep essentials moving with a safety-first logistics team and predictable evening hours.', tags: ['Weekly pay', '4-day schedule'], responsibilities: ['Pick and pack orders accurately', 'Load outbound shipments with a small crew', 'Keep work areas organized and safe'], qualifications: ['Able to lift up to 50 lbs', 'Reliable transportation to the facility', 'Warehouse experience is helpful, not required'], benefits: ['Weekly direct deposit', 'Shift differential', 'Growth path into lead roles'] },
  { id: 'harbor-retail', title: 'Retail Team Lead', company: 'Harbor & Pine', location: 'Chicago, IL', distance: '1.4 mi', pay: '$18–$21/hr', payValue: 19.5, schedule: 'Full-time', type: 'Retail', posted: '1d ago', postedValue: 24, badge: 'Top employer', accent: 'navy', remote: false, logo: 'H', description: 'Lead a thoughtful retail team for a neighborhood brand known for quality goods and kind service.', tags: ['Growth opportunity', 'Paid time off'], responsibilities: ['Coach a team of 6–8 associates on the floor', 'Own opening and closing routines', 'Create a warm, on-brand customer experience'], qualifications: ['2+ years in retail or service leadership', 'Comfort coaching and giving feedback', 'Weekend availability preferred'], benefits: ['Store discount', 'Paid volunteer hours', 'Quarterly performance bonus'] },
  { id: 'brightline-product', title: 'Product Support Specialist', company: 'Brightline Software', location: 'Remote · United States', distance: 'Remote', pay: '$54,000–$68,000/yr', payValue: 58, schedule: 'Full-time', type: 'Technology', posted: '1d ago', postedValue: 25, badge: 'Remote', accent: 'purple', remote: true, logo: 'B', description: 'Make software feel simple for the people who use it every day. Join a small, generous support team.', tags: ['Remote-first', 'Home office budget'], responsibilities: ['Solve product questions through chat and email', 'Share patterns with product and engineering', 'Create short, friendly help-center articles'], qualifications: ['2+ years in SaaS support or customer success', 'Strong writing and troubleshooting skills', 'Curiosity and a collaborative mindset'], benefits: ['Fully remote within the US', 'Home office budget', 'Flexible PTO'] },
  { id: 'cedar-barista', title: 'Barista — Morning Crew', company: 'Cedar & Co. Coffee', location: 'Denver, CO', distance: '2.7 mi', pay: '$16.75–$19/hr + tips', payValue: 17.8, schedule: 'Part-time', type: 'Food & beverage', posted: '2d ago', postedValue: 48, badge: 'Fast response', accent: 'coral', remote: false, logo: 'C', description: 'Start the day with a close-knit crew, good coffee, and regulars who know your name.', tags: ['Tips daily', 'Free shift meal'], responsibilities: ['Craft coffee and tea drinks with care', 'Welcome guests and keep the bar moving', 'Reset the station for the next shift'], qualifications: ['A warm, reliable approach to service', 'Morning availability three days a week', 'Coffee experience is welcome, not required'], benefits: ['Daily tips', 'Free drinks on shift', 'Flexible scheduling'] },
  { id: 'atlas-nurse', title: 'Registered Nurse — Primary Care', company: 'Atlas Community Clinic', location: 'Nashville, TN', distance: '6.1 mi', pay: '$36–$43/hr', payValue: 39.5, schedule: 'Full-time', type: 'Healthcare', posted: '3d ago', postedValue: 72, badge: 'Benefits included', accent: 'blue', remote: false, logo: 'A', description: 'Bring whole-person care to a welcoming community clinic with a low patient-to-provider ratio.', tags: ['4-day work week', 'Sign-on bonus'], responsibilities: ['Provide compassionate primary care support', 'Coordinate referrals and follow-up', 'Educate patients and families on care plans'], qualifications: ['Active RN license in Tennessee', '2+ years primary care experience', 'Calm, clear communication style'], benefits: ['4-day work week', 'CEU allowance', 'Employer-paid family coverage'] }
]

const categories = [
  { label: 'Customer service', search: 'customer', icon: 'chat', count: '8,420 roles', color: 'mint' },
  { label: 'Warehouse & delivery', search: 'warehouse', icon: 'box', count: '6,180 roles', color: 'peach' },
  { label: 'Healthcare', search: 'healthcare', icon: 'heart', count: '5,920 roles', color: 'lavender' },
  { label: 'Retail', search: 'retail', icon: 'store', count: '4,760 roles', color: 'sand' },
  { label: 'Food & hospitality', search: 'food', icon: 'cup', count: '4,210 roles', color: 'bluewash' }
]

const featuredJobs = [
  ['StartACareerToday - Cleaning Jobs', 'https://exoticlead.com/track.php?offer_id=104&aff_id=4342'],
  ['StartACareerToday - Amazon Flex *Exclusive*', 'https://exoticlead.com/track.php?offer_id=108&aff_id=4342'],
  ['StartACareerToday - Aldi', 'https://exoticlead.com/track.php?offer_id=111&aff_id=4342'],
  ['StartACareerToday - Tesla', 'https://exoticlead.com/track.php?offer_id=112&aff_id=4342'],
  ['StartACareerToday - Walmart - (US)', 'https://exoticlead.com/track.php?offer_id=114&aff_id=4342'],
  ['StartACareerToday - FedEx Jobs - (US)', 'https://exoticlead.com/track.php?offer_id=115&aff_id=4342'],
  ['JobsListings - Airport Jobs - (US)', 'https://exoticlead.com/track.php?offer_id=124&aff_id=4342'],
  ['OnlyGreatJobs - Food Taster - (US)', 'https://exoticlead.com/track.php?offer_id=125&aff_id=4342'],
  ['StartACareerToday - Work From Home - (US)', 'https://exoticlead.com/track.php?offer_id=116&aff_id=4342'],
  ['StartACareerToday - Pepsi', 'https://exoticlead.com/track.php?offer_id=113&aff_id=4342'],
  ['DailyJobs - Netflix Jobs - (US)', 'https://exoticlead.com/track.php?offer_id=118&aff_id=4342'],
  ['JobsListings - Medical Jobs - (US)', 'https://exoticlead.com/track.php?offer_id=120&aff_id=4342'],
  ['JobsListings - Waste Management - (US)', 'https://exoticlead.com/track.php?offer_id=121&aff_id=4342'],
  ['DailyJobs - Part Time Jobs - (US)', 'https://exoticlead.com/track.php?offer_id=119&aff_id=4342'],
  ['JobsListings - Construction Jobs - (US)', 'https://exoticlead.com/track.php?offer_id=123&aff_id=4342'],
  ['Amazon Warehouse Jobs - (US)', 'https://exoticlead.com/track.php?offer_id=128&aff_id=4342'],
  ['JobsListings - Housekeeping - (US)', 'https://exoticlead.com/track.php?offer_id=122&aff_id=4342'],
  ['Product Testers - AirPods Pro - (US)', 'https://exoticlead.com/track.php?offer_id=130&aff_id=4342'],
  ['JobsListings - Driver Jobs - (US)', 'https://exoticlead.com/track.php?offer_id=126&aff_id=4342'],
  ['JobsListings - Nurse Jobs - (US)', 'https://exoticlead.com/track.php?offer_id=127&aff_id=4342']
].map(([title, href], index) => ({
  id: `partner-${index}`,
  title,
  href,
  image: {
    'StartACareerToday - Cleaning Jobs': '/assets/job-poster/StartACareerToday-CleaningJobs.webp',
    'StartACareerToday - Amazon Flex *Exclusive*': '/assets/job-poster/StartACareerToday-AmazonFlexExclusive.webp',
    'StartACareerToday - Aldi': '/assets/job-poster/StartACareerToday-Aldi.webp',
    'StartACareerToday - Tesla': '/assets/job-poster/StartACareerToday-Tesla.webp',
    'StartACareerToday - Walmart - (US)': '/assets/job-poster/StartACareerToday-Walmart-US.webp',
    'StartACareerToday - FedEx Jobs - (US)': '/assets/job-poster/StartACareerToday - FedEx Jobs - (US).webp',
    'JobsListings - Airport Jobs - (US)': '/assets/job-poster/JobsListings - Airport Jobs - (US).webp',
    'OnlyGreatJobs - Food Taster - (US)': '/assets/job-poster/OnlyGreatJobs - Food Taster - (US).webp',
    'StartACareerToday - Work From Home - (US)': '/assets/job-poster/StartACareerToday - Work From Home - (US).webp',
    'StartACareerToday - Pepsi': '/assets/job-poster/StartACareerToday - Pepsi.webp',
    'DailyJobs - Netflix Jobs - (US)': '/assets/job-poster/DailyJobs - Netflix Jobs - (US).webp',
    'JobsListings - Medical Jobs - (US)': '/assets/job-poster/JobsListings - Medical Jobs - (US).webp',
    'JobsListings - Waste Management - (US)': '/assets/job-poster/JobsListings - Waste Management - (US).webp',
    'DailyJobs - Part Time Jobs - (US)': '/assets/job-poster/DailyJobs - Part Time Jobs - (US).webp',
    'JobsListings - Construction Jobs - (US)': '/assets/job-poster/JobsListings - Construction Jobs - (US).webp',
    'Amazon Warehouse Jobs - (US)': '/assets/job-poster/Amazon Warehouse Jobs - (US).webp',
    'JobsListings - Housekeeping - (US)': '/assets/job-poster/JobsListings - Housekeeping - (US).webp',
    'Product Testers - AirPods Pro - (US)': '/assets/job-poster/Product Testers - AirPods Pro - (US).webp',
    'JobsListings - Driver Jobs - (US)': '/assets/job-poster/JobsListings - Driver Jobs - (US).webp',
    'JobsListings - Nurse Jobs - (US)': '/assets/job-poster/JobsListings - Nurse Jobs - (US).webp'
  }[title] || '',
  accent: ['teal', 'orange', 'navy', 'purple', 'coral', 'blue'][index % 6]
}))

const featuredAdLinks = [
  'https://eatingjudgelos.com/ueiq7tue?key=3199bce6f9c152d9bab772d7cf879cf0',
  'https://eatingjudgelos.com/izgpxyjj9?key=3f0d3461e12c63b9522bf5c9f235e514',
  'https://eatingjudgelos.com/yk40evw0td?key=43a52e04f8163d827937e8d5a0cffaed',
  'https://eatingjudgelos.com/ueiq7tue?key=3199bce6f9c152d9bab772d7cf879cf0' // Replace with the fourth Ads Sterra URL when ready.
]
const featuredImageFallback = '/assets/banner/banner-01.png'
const popularPartnerJobs = [12, 13, 14, 15, 16, 17, 18, 19].map((index) => featuredJobs[index])
const partnerDetails = {
  'partner-12': { company: 'JobsListings', location: 'United States', pay: '$18–$28/hr', schedule: 'Full-time & Part-time', badge: 'Hiring now', description: 'Explore waste management roles helping communities stay clean, safe, and sustainable through dependable daily operations.', responsibilities: ['Collect, sort, and move waste materials safely', 'Keep routes, equipment, and work areas organized', 'Follow safety and environmental procedures'], qualifications: ['Reliable attendance and a safety-first mindset', 'Ability to work outdoors and lift job-related materials', 'Valid identification and dependable transportation'], benefits: ['Weekly pay options', 'Training provided', 'Growth opportunities'] },
  'partner-14': { company: 'JobsListings', location: 'United States', pay: '$20–$36/hr', schedule: 'Full-time', badge: 'Popular listing', description: 'Find construction opportunities with teams building commercial, residential, and infrastructure projects across the US.', responsibilities: ['Support skilled crews on active job sites', 'Prepare tools, materials, and work areas', 'Follow site safety rules and supervisor direction'], qualifications: ['Comfort working on a physical job site', 'Strong teamwork and punctuality', 'Construction experience is helpful, not required'], benefits: ['On-the-job training', 'Overtime opportunities', 'Career advancement paths'] },
  'partner-15': { company: 'Amazon Warehouse Jobs', location: 'United States', pay: '$18–$24/hr', schedule: 'Part-time & Full-time', badge: 'Hiring now', description: 'Keep customer orders moving in a fast-paced warehouse environment with flexible shift options and clear training.', responsibilities: ['Pick, pack, and stage customer orders', 'Scan inventory accurately using handheld devices', 'Maintain a clean and safe work area'], qualifications: ['Able to stand and move for an entire shift', 'Reliable and detail-oriented work style', 'No previous warehouse experience required'], benefits: ['Flexible shifts', 'Weekly pay options', 'Training provided'] },
  'partner-16': { company: 'JobsListings', location: 'United States', pay: '$16–$25/hr', schedule: 'Full-time & Part-time', badge: 'Flexible work', description: 'Help hotels, homes, and facilities stay welcoming with housekeeping roles offering flexible schedules and hands-on work.', responsibilities: ['Clean and reset assigned rooms or spaces', 'Restock supplies and report maintenance issues', 'Follow quality and safety checklists'], qualifications: ['Strong attention to detail', 'Able to work independently and on your feet', 'Professional and dependable approach'], benefits: ['Flexible scheduling', 'Training available', 'Local opportunities'] },
  'partner-18': { company: 'JobsListings', location: 'United States', pay: '$19–$32/hr', schedule: 'Full-time & Part-time', badge: 'Popular listing', description: 'Discover driver opportunities delivering people, packages, and essential goods with schedules that fit your routine.', responsibilities: ['Complete assigned routes safely and on time', 'Provide courteous customer service', 'Maintain vehicle and delivery records'], qualifications: ['Valid driver license and safe driving record', 'Reliable transportation where required', 'Comfort using navigation apps'], benefits: ['Flexible routes', 'Weekly pay options', 'Multiple shift choices'] },
  'partner-19': { company: 'JobsListings', location: 'United States', pay: '$28–$48/hr', schedule: 'Full-time & Part-time', badge: 'Healthcare roles', description: 'Connect with nurse opportunities supporting patients and care teams in hospitals, clinics, and community settings.', responsibilities: ['Provide compassionate patient support', 'Document care and communicate with the care team', 'Follow clinical, privacy, and safety standards'], qualifications: ['Relevant nursing credentials for the selected role', 'Clear communication and calm judgment', 'Current authorization to work in the US'], benefits: ['Competitive pay ranges', 'Multiple care settings', 'Career growth opportunities'] },
  'partner-13': { company: 'DailyJobs', location: 'United States', pay: '$16–$26/hr', schedule: 'Part-time', badge: 'Flexible work', description: 'Find part-time opportunities across customer service, retail, delivery, and local operations with schedules designed around your life.', responsibilities: ['Complete assigned shift responsibilities reliably', 'Work with teammates to keep daily operations moving', 'Follow workplace safety and service standards'], qualifications: ['Reliable attendance and a positive attitude', 'Clear communication and willingness to learn', 'Ability to work the selected part-time schedule'], benefits: ['Flexible shifts', 'Weekly pay options', 'Local opportunities'] },
  'partner-17': { company: 'Product Testers', location: 'United States', pay: 'Product testing rewards', schedule: 'Flexible / Part-time', badge: 'Popular listing', description: 'Explore product tester opportunities and share feedback on consumer products through a flexible partner program.', responsibilities: ['Review product instructions carefully', 'Complete surveys or feedback tasks accurately', 'Share clear, honest product feedback'], qualifications: ['Attention to detail', 'Reliable internet access for online tasks', 'Eligible US participant for the selected offer'], benefits: ['Flexible timing', 'Work from home options', 'No fixed shift required'] }
}

const partnerDescriptions = {
  'partner-0': `Make a visible difference in the spaces people rely on every day. Cleaning associates help keep offices, homes, hotels, and other facilities fresh, orderly, and ready for the people who use them.

A typical shift may include vacuuming or sweeping floors, sanitizing high-touch surfaces, cleaning restrooms, resetting rooms, and restocking supplies. The work suits someone dependable who notices the details and takes pride in leaving a space in good shape.

Worksite, equipment, hours, physical requirements, and experience expectations vary by employer. Review those details in the full posting. If the work and schedule fit what you are looking for, apply directly.`,
  'partner-1': `Like staying active and working independently? Amazon Flex delivery partners use the Flex app to pick up orders, plan a route, and complete deliveries during available blocks.

The work may include checking in at a pickup location, confirming packages in the app, following delivery directions, and documenting issues that affect a drop-off. It can suit someone who is organized, comfortable on the road, and able to manage time independently.

This is not guaranteed work, schedule, or income. Eligibility, vehicle and insurance requirements, block availability, and payment terms vary by location. Review the official Amazon Flex terms and local openings; if you meet the requirements, continue through the verified application process.`,
  'partner-2': `Help Aldi customers get in, find what they need, and get on with their day. Store team members contribute to a quick, friendly shopping experience and help keep the store organized.

Depending on the opening, a shift may include stocking and rotating products, assisting shoppers, operating a register, unloading deliveries, or tidying the sales floor. Warehouse and support positions have different responsibilities, so check the title and duties carefully.

Location, schedule, physical requirements, and experience expectations vary by role. Review the complete posting to see what the team needs. If the opening matches your availability and strengths, apply directly.`,
  'partner-3': `Bring your skills to work that helps build, service, or support Tesla products and operations. Openings may span manufacturing, vehicle service, sales, logistics, and business teams.

Day-to-day work depends on the position. It may involve following safety and quality procedures, troubleshooting an issue, supporting a customer, or coordinating with teammates to keep work moving. Each team has its own tools, pace, and qualifications.

Confirm the hiring team, worksite, schedule, and required experience in the official posting. If the role lines up with your background and goals, review the application details and apply.`,
  'partner-4': `Find a role where dependable work helps customers and teams get what they need. Walmart opportunities may be based in stores, fulfillment centers, distribution facilities, or support teams.

Store work can include helping shoppers, stocking merchandise, and keeping shared areas organized. Fulfillment roles may focus on locating items, preparing online orders, and moving them safely through the facility. The day-to-day experience depends on the specific team.

Compare the location, schedule, physical requirements, and qualifications in the full posting. If the job fits your availability and the kind of work you want to do, apply through the listed employer.`,
  'partner-5': `Keep packages moving and help connect customers with the deliveries they count on. FedEx operations roles may support pickup, sorting, transportation, or delivery.

Depending on the opening, a shift could include scanning and sorting shipments, loading or unloading equipment, completing a delivery route, or assisting customers at a facility. Many operations roles are active and rely on teamwork, attention to detail, and safe work habits.

Availability, location, physical requirements, and any driver license requirements vary by position. Check the full posting for the exact duties and schedule. If the work fits your strengths, use Apply Now to review the opportunity and continue your application.`,
  'partner-6': `Help make a busy airport run smoothly for travelers and the teams who serve them. Airport opportunities may include passenger assistance, baggage handling, ground operations, concessions, cleaning, or facility support.

The work can be fast-paced and team-oriented. Depending on the role, you may assist travelers, move or organize items, prepare a service area, or help maintain a clean and safe facility. Some positions involve outdoor work or changing shift times.

The employer, duties, schedule, screening, and airport access requirements vary by opening. Read the full listing before applying. If the role matches your experience and availability, follow the listed application steps.`,
  'partner-7': `Have a curious palate and an eye for detail? Food-tasting studies invite participants to sample products and share clear, honest feedback on qualities such as flavor, texture, or packaging.

A study may involve reviewing instructions, tasting one or more samples, and completing a short survey or guided discussion. Careful attention and straightforward feedback help make the results useful. The exact activity depends on the product and study design.

Eligibility, location, time commitment, product handling, and compensation vary by study. Read all instructions and food-safety guidance first. If the opportunity is a fit and the terms are clear, apply to participate.`,
  'partner-8': `Put your communication and organization skills to work from home. Remote opportunities may include customer support, sales, scheduling, data entry, and other work handled through online tools.

Depending on the role, you could answer customer questions, update records, coordinate appointments, or help resolve routine requests. Clear writing, reliable follow-through, and comfort learning digital systems are useful in many remote positions.

Remote does not always mean work-from-anywhere. Location, equipment, internet, hours, and experience requirements vary by employer. Check those details and confirm who is hiring. If the role works for you, review the application and apply.`,
  'partner-9': `Help keep products and customer accounts moving across a fast-paced operation. Pepsi-related opportunities may support production, warehouse work, route delivery, sales, or customer service.

Depending on the position, work may include preparing or moving products, maintaining an orderly work area, assisting retail accounts, or coordinating with a team. Some roles may have physical requirements, set route schedules, or require a valid license.

The hiring employer, location, schedule, and qualifications vary by opening. Review the complete posting so you know what the role involves. If the opportunity matches your experience and availability, follow the listed steps to apply.`,
  'partner-10': `Interested in work connected to entertainment and streaming? First, confirm that this listing is genuine and verify who is hiring.

Netflix openings, when available, can span technology, production, marketing, and business operations. Those teams have very different responsibilities, work locations, and qualifications, so the exact job description matters more than the company name alone.

Look for the position on Netflix's official careers site or a clearly identified employer page before applying. Never pay a recruiting fee or share financial account details. If you verify the role and it fits your skills, continue through the official application channel.`,
  'partner-11': `Use your skills to support patients and the people who care for them. Healthcare opportunities may be clinical, administrative, or community-based, serving patients at different points in their care.

Depending on the position, work may include scheduling visits, maintaining accurate records, assisting with patient needs, coordinating with a care team, or providing licensed care. Respectful communication, attention to detail, and privacy awareness matter across many healthcare settings.

Credentials, experience, physical requirements, and shifts are specific to each opening. Confirm required state licenses or certifications in the full posting. If your qualifications match, review the application details and apply.`,
  'partner-12': `Do work that helps neighborhoods, businesses, and public spaces stay clean and safe. Waste management teams support the collection, sorting, and movement of materials so communities can keep daily operations running.

Depending on the assignment, a shift may include supporting a route crew, handling materials, operating approved equipment, or keeping vehicles and work areas orderly. Many roles are hands-on and outdoors, making teamwork, safe work habits, and dependable attendance important.

Physical requirements, route, schedule, training, and employer vary by opening. Review the full posting for those details. If you are comfortable with the work and requirements, apply to the position that fits.`,
  'partner-13': `Looking for work that leaves room for the rest of your week? Part-time openings may be available in customer service, retail, food service, delivery, and local operations.

Responsibilities depend on the employer and could include helping customers, preparing orders, keeping a work area organized, or supporting a small team during busy periods. Some positions are ongoing; others may be seasonal or tied to specific shifts.

Check the expected weekly hours, days and times, location, training, and length of the role before applying. If the schedule and responsibilities fit your plans, review the full listing and take the next step.`,
  'partner-14': `Help build and maintain the places people live, work, and travel. Construction crews work on projects ranging from homes and commercial spaces to roads and public infrastructure.

Depending on the opening, you may help prepare a job site, move materials, organize tools, assist skilled trades, or keep the work area safe and orderly. Many roles involve outdoor, physical work and close coordination with a crew; duties change as the project moves forward.

Project location, start time, equipment, certifications, and experience requirements vary. Review the contractor's full posting so you know what to expect. If the role fits your skills and availability, apply directly.`,
  'partner-15': `Be part of the team that gets customer orders ready to go. Warehouse associates help receive, organize, and prepare products so they can move through the facility accurately and on time.

A shift may involve scanning inventory, picking and packing items, moving cartons or totes, and keeping aisles clear. The work is active and may require extended standing, walking, or lifting, with safety and accuracy important throughout the day.

Facility, shift options, physical requirements, and any experience expectations vary by opening. Read the official posting and check whether the work fits your needs. If it does, follow the listed steps to apply.`,
  'partner-16': `Create a clean, comfortable welcome for guests and the people who use shared spaces. Housekeeping team members help rooms and facilities feel ready, cared for, and consistent from one visit to the next.

Daily work may include cleaning and resetting rooms, changing linens, replenishing supplies, and reporting maintenance concerns. The role calls for a steady pace, discretion, and attention to a quality checklist; some shifts involve being on your feet and moving supplies throughout the day.

Property, workload, schedule, and experience requirements vary. Review the full listing for the expected room count and shift details. If the role sounds right for you, apply through the employer's process.`,
  'partner-17': `Turn your feedback into something product teams can use. Product testing opportunities may ask you to try an eligible item, follow study instructions, and share a candid review through a survey or research activity.

The experience depends on the program: you may answer questions, describe how a product works for you, or complete a guided task. Clear, thoughtful feedback and following the study directions are key to participating.

Selection, product availability, time commitment, privacy terms, and compensation are set by the program. Read the terms before enrolling, and never pay an unexpected fee to receive or test a product. If the process is clear and the study fits, apply to participate.`,
  'partner-18': `Put your time on the road to work with a driving role that matches your experience. Openings may involve local deliveries, passenger trips, or supporting a business route.

Common duties include following an assigned route, completing stops safely, communicating professionally, and keeping required trip or delivery records. A valid license and safe driving history are often important; some roles may also require a personal vehicle, insurance, or a commercial license.

Route expectations, vehicle costs, schedule, and pay terms vary by employer. Review the full posting before committing. If the requirements and working arrangement fit, continue to the application.`,
  'partner-19': `Bring compassionate, skilled care to patients and the teams around them. Nursing roles support people through treatment, recovery, and ongoing care in a range of healthcare settings.

Depending on the unit and scope of practice, responsibilities may include assessing patient needs, documenting care, carrying out ordered treatments, educating patients, and communicating changes to the care team. Good judgment, clear communication, and careful attention to safety are essential.

The required license, specialty experience, schedule, and patient setting vary by position and state. Check the full posting for the credentials and shift details. If your qualifications align, review the employer information and apply directly.`
}


const partnerRoleContent = {
  'partner-0': {
    responsibilities: ['Clean and reset assigned rooms or work areas based on the site checklist.', 'Sanitize high-touch surfaces, restock supplies, and handle waste according to site procedures.', 'Report supply shortages, maintenance needs, or safety concerns to the appropriate contact.'],
    qualifications: ['Dependable attendance and a careful, detail-focused work style.', 'Ability to follow site-specific cleaning and safety instructions.', 'Comfort with the physical tasks described in the specific opening.']
  },
  'partner-1': {
    responsibilities: ['Use the Flex app to review available blocks, pickup instructions, and delivery routes.', 'Handle packages carefully and complete drop-offs according to app instructions.', 'Document delivery issues through the approved app workflow.'],
    qualifications: ['Meet the program eligibility, vehicle, and insurance requirements for your area.', 'Comfort driving independently and using smartphone navigation.', 'Ability to manage time and follow delivery instructions.']
  },
  'partner-2': {
    responsibilities: ['Stock and rotate merchandise to help keep shelves organized.', 'Assist shoppers and support checkout or other assigned store tasks.', 'Keep the sales floor orderly and help with deliveries as assigned.'],
    qualifications: ['Friendly communication and a helpful approach with customers.', 'Reliable teamwork and attention to store procedures.', 'Comfort with the schedule and active duties listed for the role.']
  },
  'partner-3': {
    responsibilities: ['Follow the safety, quality, and operating procedures for the assigned team.', 'Support manufacturing, service, logistics, sales, or another function as described in the posting.', 'Communicate progress and coordinate work with teammates or customers.'],
    qualifications: ['Relevant experience or training for the specific department.', 'Careful attention to safety, quality, and documented procedures.', 'Willingness to learn role-specific tools and systems.']
  },
  'partner-4': {
    responsibilities: ['Help customers, stock merchandise, or prepare orders depending on the team.', 'Keep assigned work areas clean, organized, and ready for the next task.', 'Follow store or facility procedures for safe and accurate work.'],
    qualifications: ['Dependability and a customer-aware, team-oriented approach.', 'Ability to follow instructions and work at the pace of the assigned area.', 'Comfort with any schedule or physical requirements listed for the opening.']
  },
  'partner-5': {
    responsibilities: ['Scan, sort, load, or unload packages according to facility procedures.', 'Support pickup, delivery, route, or customer-service tasks as assigned.', 'Work with the team to keep shipments moving safely and accurately.'],
    qualifications: ['Dependable attendance and attention to package and route details.', 'Ability to meet the physical and availability requirements in the posting.', 'A valid driver license only when required for the specific position.']
  },
  'partner-6': {
    responsibilities: ['Assist travelers, support baggage or ground operations, or maintain a service area.', 'Follow airport, employer, and safety procedures while completing assigned work.', 'Coordinate with coworkers to keep passenger and facility operations moving.'],
    qualifications: ['Clear communication, punctuality, and a service-minded approach.', 'Ability to meet the schedule and worksite requirements for the role.', 'Airport screening or access credentials if required by the employer.']
  },
  'partner-7': {
    responsibilities: ['Review study instructions and follow the product-handling guidance.', 'Evaluate assigned samples and note relevant product qualities.', 'Submit clear, honest feedback through the study survey or discussion.'],
    qualifications: ['Meet the study-specific age, location, and eligibility criteria.', 'Attention to detail and ability to follow instructions.', 'Willingness to disclose relevant dietary restrictions when requested.']
  },
  'partner-8': {
    responsibilities: ['Respond to customer or team requests through the channels used by the employer.', 'Update records, coordinate schedules, or complete other role-specific online tasks.', 'Protect private information and follow remote-work procedures.'],
    qualifications: ['Clear written communication and reliable follow-through.', 'Comfort using computers and learning role-specific software.', 'Internet, equipment, location, and schedule requirements as stated in the posting.']
  },
  'partner-9': {
    responsibilities: ['Support production, warehouse, delivery, sales, or service tasks as assigned.', 'Handle products or customer requests according to team procedures.', 'Communicate with coworkers and keep assigned work areas organized.'],
    qualifications: ['Dependability and attention to safety and product-handling procedures.', 'Relevant license, experience, or physical ability only when the role requires it.', 'Ability to meet the employer\'s stated schedule and location requirements.']
  },
  'partner-10': {
    responsibilities: ['Confirm the role, department, and hiring organization on an official source.', 'Review the verified posting for its actual duties and prepare relevant application materials.', 'Use the employer\'s official application process if the opening is confirmed.'],
    qualifications: ['Experience and skills relevant to the specific, verified position.', 'Ability to meet the requirements listed by the hiring team.', 'Care in verifying the employer before sharing personal information.']
  },
  'partner-11': {
    responsibilities: ['Support patient care, scheduling, records, or clinical operations as assigned.', 'Communicate clearly with patients and members of the care team.', 'Follow privacy, safety, and documentation procedures for the setting.'],
    qualifications: ['Required license or certification for the specific clinical role.', 'Relevant experience and communication skills described by the employer.', 'Ability to meet the worksite, shift, and patient-care requirements in the posting.']
  }
}

const partnerBenefitsNotice = 'Benefits, if offered, vary by employer and position. Check the full posting for health coverage, paid leave, retirement options, and other perks; none are confirmed in this partner listing.'

function getPartnerDescription(jobId) {
  return partnerDescriptions[jobId] || partnerDetails[jobId]?.description || ''
}

function getPartnerSummary(jobId) {
  const description = getPartnerDescription(jobId)
  const summaryEnd = description.search(/[.!?](?:\s|$)/)
  return summaryEnd === -1 ? description : description.slice(0, summaryEnd + 1)
}

const browseJobs = [12, 13, 14, 15, 16, 17, 18, 19].map((index) => {
  const offer = featuredJobs[index]
  const details = partnerDetails[offer.id]
  return { ...offer, location: details.location, distance: 'Nationwide', pay: details.pay, payValue: Number.parseFloat(details.pay.replace(/[^0-9.]/g, '')), schedule: details.schedule, type: offer.title.split(' - ')[1] || 'Partner opportunity', posted: 'Hiring now', postedValue: 1, badge: details.badge, remote: false, logo: details.company.charAt(0), description: details.description, tags: details.benefits.slice(0, 2), responsibilities: details.responsibilities, qualifications: details.qualifications, benefits: details.benefits }
})

const cities = ['Austin, TX', 'Chicago, IL', 'Denver, CO', 'Nashville, TN', 'Phoenix, AZ', 'Remote — US']
const employers = ['Northstar Health', 'Harbor & Pine', 'Lumen Logistics', 'Brightline Software', 'Atlas Community Clinic', 'Cedar & Co. Coffee']

function Icon({ name, size = 20, stroke = 1.8 }) {
  const paths = {
    search: [['circle', 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z'], ['path', 'm21 21-4.3-4.3']],
    pin: [['path', 'M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z'], ['circle', 'M12 10a2.5 2.5 0 1 0 0 .01']],
    chevron: [['path', 'm9 18 6-6-6-6']],
    arrow: [['path', 'M5 12h14'], ['path', 'm13 6 6 6-6 6']],
    bookmark: [['path', 'M6 4.7A1.7 1.7 0 0 1 7.7 3h8.6A1.7 1.7 0 0 1 18 4.7V21l-6-3.6L6 21V4.7Z']],
    check: [['path', 'm5 12 4 4L19 6']],
    shield: [['path', 'M12 22s8-3.7 8-10V5l-8-3-8 3v7c0 6.3 8 10 8 10Z'], ['path', 'm9 12 2 2 4-4']],
    menu: [['path', 'M4 7h16'], ['path', 'M4 12h16'], ['path', 'M4 17h16']],
    close: [['path', 'm6 6 12 12'], ['path', 'm18 6-12 12']],
    arrowUp: [['path', 'm5 12 7-7 7 7'], ['path', 'M12 19V5']],
    briefcase: [['rect', 'M4 7h16v12H4z'], ['path', 'M9 7V5h6v2'], ['path', 'M4 12h16'], ['path', 'M10 12v2h4v-2']],
    spark: [['path', 'm12 2 1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2Z']],
    heart: [['path', 'M20.8 8.7c0 5.5-8.8 11.2-8.8 11.2S3.2 14.2 3.2 8.7A4.7 4.7 0 0 1 12 6a4.7 4.7 0 0 1 8.8 2.7Z']],
    chat: [['path', 'M20 11.2a7.7 7.7 0 0 1-8 7.5 8.3 8.3 0 0 1-3.6-.8L4 19l1.2-3.8A7.2 7.2 0 0 1 4 11.2a7.7 7.7 0 0 1 8-7.5 7.7 7.7 0 0 1 8 7.5Z']],
    box: [['path', 'm4 8 8-4 8 4-8 4-8-4Z'], ['path', 'M4 8v8l8 4 8-4V8'], ['path', 'M12 12v8']],
    store: [['path', 'M4 10v10h16V10'], ['path', 'M3 10l2-6h14l2 6'], ['path', 'M3 10a3 3 0 0 0 5 0 3 3 0 0 0 5 0 3 3 0 0 0 5 0 3 3 0 0 0 2 0']],
    cup: [['path', 'M5 8h11v6a5 5 0 0 1-5 5H10a5 5 0 0 1-5-5V8Z'], ['path', 'M16 10h2a3 3 0 0 1 0 6h-2'], ['path', 'M8 4v2'], ['path', 'M12 3v3']],
    clock: [['circle', 'M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0-18 0'], ['path', 'M12 7v5l3 2']],
    dollar: [['circle', 'M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0-18 0'], ['path', 'M14.5 8.5c-.6-.5-1.4-.8-2.4-.8-1.4 0-2.4.7-2.4 1.8 0 2.8 5.2 1.2 5.2 4.1 0 1.2-1.1 1.9-2.7 1.9-1.1 0-2-.3-2.7-.9'], ['path', 'M12 6v12']],
    users: [['path', 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2'], ['circle', 'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z'], ['path', 'M22 21v-2a4 4 0 0 0-3-3.9'], ['path', 'M16 3.1a4 4 0 0 1 0 7.8']],
    target: [['circle', 'M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0-18 0'], ['circle', 'M12 12m-5 0a5 5 0 1 0 10 0a5 5 0 1 0-10 0'], ['circle', 'M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0']],
    plus: [['path', 'M12 5v14'], ['path', 'M5 12h14']],
    info: [['circle', 'M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0-18 0'], ['path', 'M12 8h.01'], ['path', 'M11 12h1v4h1']],
    external: [['path', 'M14 3h7v7'], ['path', 'M10 14 21 3'], ['path', 'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6']]
  }
  const shapes = paths[name] || paths.spark
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">{shapes.map(([tag, d], index) => tag === 'rect' ? <rect key={index} x="4" y="7" width="16" height="12" d={d} /> : <path key={index} d={d} />)}</svg>
}

function Logo({ light = false }) {
  return <button className={`logo ${light ? 'logo-light' : ''}`} onClick={() => navigate('/') } aria-label="Workly home"><span className="logo-mark"><span></span><span></span><i></i></span><span>workly</span></button>
}

function navigate(path) {
  window.history.pushState({}, '', path)
  window.dispatchEvent(new PopStateEvent('popstate'))
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function Header({ compact = false }) {
  const [menuOpen, setMenuOpen] = useState(false)
  return <header className={`site-header ${compact ? 'site-header-compact' : ''}`}>
    <div className="header-inner">
      <Logo />
      <nav className={`primary-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Primary navigation">
        <button onClick={() => { navigate('/jobs'); setMenuOpen(false) }}>Find jobs</button>
        <button onClick={() => { document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false) }}>How Workly works</button>
        <button onClick={() => { document.getElementById('employers')?.scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false) }}>For employers</button>
      </nav>
      <div className="header-actions">
        <button className="text-button" onClick={() => navigate('/signin')}>Sign in</button>
        <button className="button button-dark button-small" onClick={() => navigate('/create-profile')}>Create profile</button>
      </div>
      <button className="menu-toggle" aria-label="Toggle menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><Icon name={menuOpen ? 'close' : 'menu'} /></button>
    </div>
  </header>
}

function SearchBar({ initialQuery = '', initialLocation = '', large = false, onSearch }) {
  const [query, setQuery] = useState(initialQuery)
  const [location, setLocation] = useState(initialLocation)
  const submit = (event) => {
    event.preventDefault()
    onSearch({ query, location })
  }
  return <form className={`search-bar ${large ? 'search-bar-large' : ''}`} onSubmit={submit} role="search">
    <div className="search-field search-keyword"><Icon name="search" size={large ? 22 : 19} /><div><label htmlFor="job-query">What</label><input id="job-query" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Job title, skill, or company" /></div></div>
    <div className="search-divider"></div>
    <div className="search-field"><Icon name="pin" size={large ? 22 : 19} /><div><label htmlFor="job-location">Where</label><input id="job-location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="City, state, or ZIP" /></div></div>
    <button className="button button-teal search-submit" type="submit"><span>Search jobs</span><Icon name="arrow" size={18} /></button>
  </form>
}

function EmployerMonogram({ job, large = false }) {
  return <div className={`employer-monogram monogram-${job.accent} ${large ? 'monogram-large' : ''}`} aria-hidden="true">{job.logo}</div>
}

function JobCard({ job, onSelect, onSave, saved }) {
  return <article className={`job-card ${job.image ? 'job-card-with-poster' : ''}`}>
    {job.image ? <img className="job-card-poster" src={job.image} alt={`${job.title} job poster`} loading="lazy" /> : null}
    <div className="job-card-top"><EmployerMonogram job={job} /><div className="job-card-meta"><span className="eyebrow">{job.company}</span><span className="job-age"><Icon name="clock" size={13} /> {job.posted}</span></div><button className={`save-button ${saved ? 'is-saved' : ''}`} onClick={() => onSave(job.id)} aria-label={saved ? `Unsave ${job.title}` : `Save ${job.title}`}><Icon name="bookmark" size={19} /></button></div>
    <button className="job-card-title" onClick={() => onSelect(job.id)}>{job.title}</button>
    <div className="job-card-pay"><strong>{job.pay}</strong><span className="verified"><Icon name="check" size={13} /> {job.badge}</span></div>
    <div className="job-card-location"><Icon name="pin" size={15} /> {job.location} <span>·</span> {job.distance}</div>
    <div className="job-card-tags">{job.tags.slice(0, 2).map((tag) => <span key={tag}>{tag}</span>)}</div>
    <div className="job-card-bottom"><span className="schedule-tag">{job.schedule}</span><button className="arrow-link" onClick={() => onSelect(job.id)}>View job <Icon name="arrow" size={15} /></button></div>
  </article>
}

function CpaJobCard({ job, onDetails }) {
  const image = job.image || featuredImageFallback
  return <article className={`cpa-job-card cpa-${job.accent}`} style={{ backgroundImage: `linear-gradient(180deg, rgba(16,36,43,.08), rgba(16,36,43,.88)), url("${image}")`, backgroundPosition: job.image ? 'left center' : 'center' }}>
    <div className="cpa-job-shade"></div>
    <div className="cpa-job-content"><span className="cpa-job-label">Featured opportunity</span><h3>{job.title}</h3><p className="cpa-job-note">{getPartnerSummary(job.id)}</p><div className="cpa-actions"><button className="button button-light cpa-apply" onClick={() => onDetails(job.id)}>View Details <Icon name="arrow" size={15} /></button><a className="cpa-direct-link" href={job.href} target="_blank" rel="sponsored noopener noreferrer">Apply Now <Icon name="external" size={13} /></a></div></div>
  </article>
}

function AdsterraAd({ placement }) {
  const unit = placement === 'leaderboard'
    ? { key: 'bcc76527761554b164affc2e87d91398', width: 728, height: 90 }
    : { key: 'a021e0b4634a0214f0d4f24780845261', width: 160, height: 600 }
  const options = JSON.stringify({ key: unit.key, format: 'iframe', height: unit.height, width: unit.width, params: {} })
  const srcDoc = `<!doctype html><html><head><meta name="viewport" content="width=device-width, initial-scale=1"><style>html,body{margin:0;width:100%;height:100%;overflow:hidden}iframe{border:0;max-width:100%}</style></head><body><script>window.atOptions=${options};<\/script><script src="https://eatingjudgelos.com/${unit.key}/invoke.js"><\/script></body></html>`
  return <iframe className="adsterra-ad-frame" title={`Advertisement ${unit.width} by ${unit.height}`} width={unit.width} height={unit.height} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" srcDoc={srcDoc} />
}

function FeaturedAdSlot() {
  return <div className="featured-ad-link"><div className="featured-ad-slot"><AdsterraAd placement="leaderboard" /></div></div>
}

function TallAdSlot() {
  return <div className="tall-ad-slot"><AdsterraAd placement="skyscraper" /></div>
}

function SignalArtwork() {
  return <div className="signal-art" aria-label="A visual pattern of connected opportunities" role="img"><div className="art-grid"></div><div className="art-orbit orbit-one"></div><div className="art-orbit orbit-two"></div><div className="art-line line-one"></div><div className="art-line line-two"></div><div className="art-node node-one"><Icon name="briefcase" size={19} /></div><div className="art-node node-two"><Icon name="spark" size={18} /></div><div className="art-node node-three"><Icon name="pin" size={18} /></div><div className="art-card floating-card"><div className="mini-avatar">N</div><div><strong>Great match</strong><span>Customer Success · Austin</span></div><Icon name="check" size={16} /></div><div className="art-card floating-card two"><span className="mini-pulse"></span><div><strong>4 new roles</strong><span>within 5 miles</span></div></div></div>
}

function HomePage({ onSearch, onSelect, onSave, saved }) {
  return <>
    <Header />
    <main>
      <section className="hero-section hero-banner-section" style={{ backgroundImage: `url(${featuredImageFallback})` }}>
        <div className="hero-inner page-width">
          <div className="hero-copy"><div className="status-kicker"><span className="live-dot"></span> The clearer way to find your next move</div><h1>Work that fits<br /><em>your real life.</em></h1><p className="hero-subtitle">Search opportunities with transparent pay, real employers, and the flexibility you actually need.</p><SearchBar large onSearch={onSearch} /><div className="hero-trust"><span><Icon name="shield" size={16} /> Verified opportunities</span><span><Icon name="check" size={16} /> No guesswork</span><span><Icon name="users" size={16} /> 2.4M+ people hired</span></div></div><SignalArtwork /></div>
        <div className="hero-wave"></div>
      </section>

      <section className="stat-strip"><div className="page-width stat-grid"><div><strong>2.4M<span>+</span></strong><span>people connected to work</span></div><div><strong>86<span>%</span></strong><span>of roles show pay up front</span></div><div><strong>4.8<span>/5</span></strong><span>job seeker experience rating</span></div><div><strong>48<span> states</span></strong><span>and growing every day</span></div></div></section>

      <section className="section page-width" id="how-it-works"><div className="section-heading"><div><span className="section-label">A better search, by design</span><h2>Start with what<br /><em>matters to you.</em></h2></div><p>Whether you want a fast start, a flexible schedule, or a place to grow, Workly keeps the important details in view.</p></div><div className="steps-grid"><div className="step-card"><span className="step-number">01</span><div className="step-icon mint-icon"><Icon name="target" size={24} /></div><h3>Tell us your kind of work</h3><p>Search by role, skill, company, or the life you want your schedule to support.</p><button className="text-arrow" onClick={() => navigate('/jobs')}>Explore roles <Icon name="arrow" size={15} /></button></div><div className="step-card featured-step"><span className="step-number">02</span><div className="step-icon navy-icon"><Icon name="spark" size={24} /></div><h3>See the full picture</h3><p>Transparent pay, schedule, distance, and benefits help you decide with confidence.</p><button className="text-arrow" onClick={() => navigate('/jobs')}>See how it works <Icon name="arrow" size={15} /></button></div><div className="step-card"><span className="step-number">03</span><div className="step-icon peach-icon"><Icon name="briefcase" size={24} /></div><h3>Make your next move</h3><p>Save the roles that feel right and apply when you’re ready—no pressure, no clutter.</p><button className="text-arrow" onClick={() => alert('Your Workly profile will make applying even easier.')}>Create your profile <Icon name="arrow" size={15} /></button></div></div></section>

      <section className="section jobs-section"><div className="section-heading compact-heading"><div><span className="section-label">Featured CPA opportunities</span><h2>Jobs hiring <em>now.</em></h2></div><button className="outline-button" onClick={() => navigate('/jobs')}>Browse all jobs <Icon name="arrow" size={16} /></button></div><div className="cpa-jobs-grid">{featuredJobs.slice(0, 12).map((job, index) => <React.Fragment key={job.title}><CpaJobCard job={job} onDetails={(id) => navigate(`/jobs/partner/${id}`)} />{index % 3 === 2 ? <FeaturedAdSlot href={featuredAdLinks[Math.floor(index / 3)]} /> : null}</React.Fragment>)}</div><p className="featured-jobs-note">Featured opportunities are provided by external partners. Select View Details to review the listing, then apply through the partner link.</p></section>

      <section className="section category-section"><div className="section-heading compact-heading"><div><span className="section-label">Find your lane</span><h2>Popular <em>right now.</em></h2></div><button className="text-arrow" onClick={() => navigate('/jobs')}>View all categories <Icon name="arrow" size={15} /></button></div><div className="category-scroller">{categories.map((category) => <button className={`category-card category-${category.color}`} key={category.label} onClick={() => onSearch({ query: category.search, location: '' })}><div className="category-icon"><Icon name={category.icon} size={22} /></div><span>{category.label}</span><small>{category.count}</small><Icon name="arrow" size={17} /></button>)}</div></section>

      <section className="employer-band" id="employers"><div className="page-width employer-band-inner"><div className="employer-copy"><span className="section-label light-label">Built for the people doing the hiring, too</span><h2>Good teams deserve<br /><em>good people.</em></h2><p>Reach motivated candidates with job details that make the right fit easier to spot—before the first interview.</p><button className="button button-light" onClick={() => alert('Employer tools are coming soon. Tell us what you’re hiring for and we’ll be in touch.')}>Explore employer tools <Icon name="arrow" size={17} /></button></div><div className="employer-art"><div className="employer-art-circle"></div><div className="employer-art-card"><span className="mini-avatar dark">H</span><div><strong>Retail Team Lead</strong><span>Harbor & Pine · Chicago</span></div><span className="match-score">92%<small>match</small></span></div><div className="employer-art-card second"><span className="mini-avatar purple">B</span><div><strong>Product Support</strong><span>Brightline · Remote US</span></div><span className="match-score">88%<small>match</small></span></div></div></div></section>

      <section className="section browse-section page-width"><div className="section-heading compact-heading"><div><span className="section-label">Your next neighborhood</span><h2>Explore work<br /><em>near you.</em></h2></div><p>Local opportunity, with a wider view.</p></div><div className="browse-columns"><div className="browse-panel"><div className="browse-panel-head"><div className="panel-icon"><Icon name="pin" size={20} /></div><div><h3>Top cities</h3><span>Roles people are exploring</span></div></div><div className="link-list">{cities.map((city, index) => <button key={city} onClick={() => onSearch({ query: '', location: city })}><span>{city}</span><small>{[1240, 980, 770, 650, 510, 1860][index]} jobs</small><Icon name="chevron" size={15} /></button>)}</div></div><div className="browse-panel"><div className="browse-panel-head"><div className="panel-icon peach-icon"><Icon name="briefcase" size={20} /></div><div><h3>Trusted employers</h3><span>Companies hiring on Workly</span></div></div><div className="link-list">{employers.map((company, index) => <button key={company} onClick={() => onSearch({ query: company, location: '' })}><span>{company}</span><small>{[32, 18, 26, 14, 21, 12][index]} open roles</small><Icon name="chevron" size={15} /></button>)}</div></div></div></section>

      <section className="safety-strip"><div className="page-width safety-inner"><div className="safety-icon"><Icon name="shield" size={25} /></div><div><strong>Your safety comes first.</strong><span>We flag suspicious listings and keep your personal information private. <button onClick={() => alert('Workly safety guidance: never pay to apply, verify the employer domain, and trust your instincts.')}>Read our safety guide <Icon name="arrow" size={14} /></button></span></div><Icon name="check" size={20} /></div></section>
    </main>
    <Footer />
  </>
}

function JobsPage({ onSelect, onSave, saved }) {
  const params = new URLSearchParams(window.location.search)
  const [query, setQuery] = useState(params.get('query') || '')
  const [location, setLocation] = useState(params.get('location') || '')
  const [sort, setSort] = useState('Relevance')
  const [filters, setFilters] = useState({ fullTime: false, partTime: false, remote: false, verified: false })
  const [payRange, setPayRange] = useState('Any pay')
  const [distance, setDistance] = useState('Any distance')
  const [mobileFilters, setMobileFilters] = useState(false)
  const [queryDraft, setQueryDraft] = useState(query)
  const [locationDraft, setLocationDraft] = useState(location)
  const filteredJobs = useMemo(() => {
    let result = browseJobs.filter((job) => {
      const haystack = `${job.title} ${job.company} ${job.type} ${job.location}`.toLowerCase()
      const matchesQuery = !query.trim() || haystack.includes(query.toLowerCase().trim())
      const matchesLocation = !location.trim() || job.location.toLowerCase().includes(location.toLowerCase().trim()) || (location.toLowerCase().includes('remote') && job.remote)
      const matchesType = (!filters.fullTime && !filters.partTime) || (filters.fullTime && job.schedule === 'Full-time') || (filters.partTime && job.schedule === 'Part-time')
      const matchesRemote = !filters.remote || job.remote
      const matchesVerified = !filters.verified || ['Verified pay', 'Benefits included', 'Top employer'].includes(job.badge)
      const matchesPay = payRange === 'Any pay' || (payRange === '$20+/hr' && job.payValue >= 20) || (payRange === '$30+/hr' && job.payValue >= 30)
      const miles = Number.parseFloat(job.distance)
      const matchesDistance = distance === 'Any distance' || (distance === 'Within 5 miles' && !job.remote && miles <= 5) || (distance === 'Remote only' && job.remote)
      return matchesQuery && matchesLocation && matchesType && matchesRemote && matchesVerified && matchesPay && matchesDistance
    })
    if (sort === 'Newest') result.sort((a, b) => a.postedValue - b.postedValue)
    if (sort === 'Pay: high to low') result.sort((a, b) => b.payValue - a.payValue)
    return result
  }, [query, location, sort, filters, payRange, distance])
  const applySearch = (event) => { event.preventDefault(); setQuery(queryDraft); setLocation(locationDraft); navigate(`/jobs?query=${encodeURIComponent(queryDraft)}&location=${encodeURIComponent(locationDraft)}`) }
  const toggle = (key) => setFilters((old) => ({ ...old, [key]: !old[key] }))
  const clearFilters = () => { setFilters({ fullTime: false, partTime: false, remote: false, verified: false }); setPayRange('Any pay'); setDistance('Any distance') }
  return <><Header compact /><main className="results-page"><div className="results-hero"><div className="page-width"><span className="section-label">Your next move starts here</span><h1>Find a role that<br /><em>fits your life.</em></h1><form className="results-search" onSubmit={applySearch}><div><Icon name="search" size={19} /><input aria-label="Search jobs" value={queryDraft} onChange={(e) => setQueryDraft(e.target.value)} placeholder="Job title, skill, or company" /></div><div><Icon name="pin" size={19} /><input aria-label="Search location" value={locationDraft} onChange={(e) => setLocationDraft(e.target.value)} placeholder="City, state, or ZIP" /></div><button className="button button-teal" type="submit">Update search</button></form></div></div><div className="page-width results-layout"><aside className={`filter-sidebar ${mobileFilters ? 'is-open' : ''}`}><div className="filter-head"><strong>Filter jobs</strong><button onClick={() => setMobileFilters(false)} aria-label="Close filters"><Icon name="close" size={18} /></button></div><div className="filter-group"><span>Schedule</span><label><input type="checkbox" checked={filters.fullTime} onChange={() => toggle('fullTime')} /> Full-time <small>2,840</small></label><label><input type="checkbox" checked={filters.partTime} onChange={() => toggle('partTime')} /> Part-time <small>1,190</small></label><label><input type="checkbox" checked={filters.remote} onChange={() => toggle('remote')} /> Remote <small>480</small></label></div><div className="filter-group"><span>Job details</span><label><input type="checkbox" checked={filters.verified} onChange={() => toggle('verified')} /> Verified pay <small>1,760</small></label></div><div className="filter-group"><span>Pay & distance</span><select className="filter-select" aria-label="Pay range" value={payRange} onChange={(e) => setPayRange(e.target.value)}><option>Any pay</option><option>$20+/hr</option><option>$30+/hr</option></select><select className="filter-select" aria-label="Distance" value={distance} onChange={(e) => setDistance(e.target.value)}><option>Any distance</option><option>Within 5 miles</option><option>Remote only</option></select></div><button className="clear-filters" onClick={clearFilters}>Clear all filters</button><TallAdSlot /><TallAdSlot /></aside><div className="results-content"><div className="results-toolbar"><div><button className="mobile-filter-button" onClick={() => setMobileFilters(true)}><Icon name="target" size={16} /> Filters</button><strong>{filteredJobs.length} jobs</strong><span>{query || location ? 'matching your search' : 'worth a look today'}</span></div><label className="sort-control">Sort by <select value={sort} onChange={(e) => setSort(e.target.value)}><option>Relevance</option><option>Newest</option><option>Pay: high to low</option></select></label></div>{filteredJobs.length ? <div className="results-list">{filteredJobs.map((job, index) => <React.Fragment key={job.id}><JobCard job={job} onSelect={onSelect} onSave={onSave} saved={saved.includes(job.id)} />{index === 1 ? <FeaturedAdSlot href={featuredAdLinks[0]} /> : null}</React.Fragment>)}</div> : <div className="empty-state"><div className="empty-icon"><Icon name="search" size={28} /></div><h2>No exact matches yet.</h2><p>Try a broader job title, nearby city, or remove a filter. There are new roles added every day.</p><button className="button button-teal" onClick={() => { setQuery(''); setLocation(''); setQueryDraft(''); setLocationDraft(''); clearFilters() }}>Show all jobs</button></div>}</div><aside className="results-ad-column"><FeaturedAdSlot href={featuredAdLinks[0]} /><TallAdSlot /><TallAdSlot /></aside></div><section className="section partner-opportunities page-width"><div className="section-heading compact-heading"><div><span className="section-label">More partner opportunities</span><h2>More jobs to <em>explore.</em></h2></div><p>Additional listings from Workly partners are available here.</p></div><div className="cpa-jobs-grid partner-jobs-grid">{popularPartnerJobs.map((job) => <CpaJobCard key={job.title} job={job} onDetails={(id) => navigate(`/jobs/partner/${id}`)} />)}</div></section><section className="jobs-footer-ad page-width"><FeaturedAdSlot href={featuredAdLinks[2]} /></section></main><Footer /></>
}

function JobDetail({ job, onSave, saved, onBack }) {
  const [applied, setApplied] = useState(false)
  return <><Header compact /><main className="detail-page"><div className="detail-top"><div className="page-width"><button className="back-link" onClick={onBack}><Icon name="arrow" size={16} /> Back to search</button><div className="detail-intro"><EmployerMonogram job={job} large /><div><span className="section-label">{job.company}</span><h1>{job.title}</h1><div className="detail-location"><Icon name="pin" size={17} /> {job.location} <span>·</span> Posted {job.posted}</div></div><button className={`save-detail ${saved ? 'is-saved' : ''}`} onClick={() => onSave(job.id)}><Icon name="bookmark" size={18} /> {saved ? 'Saved' : 'Save job'}</button></div></div></div><div className="page-width detail-layout"><article className="detail-main"><div className="detail-pay-card"><div><span>Pay range</span><strong>{job.pay}</strong></div><div><span>Schedule</span><strong>{job.schedule}</strong></div><div><span>Workplace</span><strong>{job.remote ? 'Remote' : 'On-site'}</strong></div><span className="verified large-verified"><Icon name="check" size={14} /> {job.badge}</span></div><section className="detail-section"><h2>About the role</h2><p>{job.description}</p></section><section className="detail-section"><h2>What you’ll do</h2><ul className="detail-list">{job.responsibilities.map((item) => <li key={item}><Icon name="check" size={17} /> {item}</li>)}</ul></section><section className="detail-section"><h2>What you’ll bring</h2><ul className="detail-list">{job.qualifications.map((item) => <li key={item}><Icon name="check" size={17} /> {item}</li>)}</ul></section><section className="detail-section"><h2>Benefits & perks</h2><div className="benefit-chips">{job.benefits.map((item) => <span key={item}><Icon name="spark" size={14} /> {item}</span>)}</div></section><div className="safety-note"><Icon name="shield" size={20} /><div><strong>Stay safe while you search</strong><p>Workly will never ask you to pay to apply or share sensitive financial information before an offer.</p></div></div></article><aside className="apply-card"><div className="apply-card-top"><span className="eyebrow">Ready when you are</span><h2>Make your move.</h2><p>Apply directly to {job.company} in a few simple steps.</p></div><button className="button button-teal apply-button" onClick={() => setApplied(true)}>{applied ? <><Icon name="check" size={18} /> Application started</> : <>Apply now <Icon name="external" size={16} /></>}</button><span className="apply-note"><Icon name="shield" size={14} /> Your information stays private</span><div className="company-mini"><EmployerMonogram job={job} /><div><strong>{job.company}</strong><span>Hiring on Workly</span></div><Icon name="chevron" size={16} /></div><button className="report-link" onClick={() => alert('Thanks. Our trust team will review this listing.')}>Report this listing</button></aside></div></main><Footer /></>
}

function PartnerJobDetail({ job, onBack }) {
  const roleContent = partnerRoleContent[job.id]
  const details = partnerDetails[job.id] || { company: 'Workly partner', location: 'United States', pay: 'See partner listing', schedule: 'See partner listing', badge: 'Partner opportunity', description: partnerDescriptions[job.id] || 'Review the partner listing for verified role details and application requirements.', responsibilities: roleContent?.responsibilities || [], qualifications: roleContent?.qualifications || [], benefits: [] }
  const description = getPartnerDescription(job.id) || details.description
  const summary = getPartnerSummary(job.id) || description
  const image = job.image || featuredImageFallback
  return <>
    <Header compact />
    <main className="partner-detail-page">
      <div className="page-width">
        <button className="back-link" onClick={onBack}><Icon name="arrow" size={16} /> Back to all jobs</button>
        <article className={`partner-detail-card cpa-${job.accent}`} style={{ backgroundImage: `linear-gradient(90deg, rgba(16,36,43,.95), rgba(16,36,43,.48)), url("${image}")` }}>
          <div>
            <span className="cpa-job-label">{details.company} · {details.badge}</span>
            <h1>{job.title}</h1>
            <p>{summary}</p>
            <span className="partner-detail-meta"><Icon name="pin" size={16} /> {details.location} <span>·</span> {details.schedule}</span>
            <a className="button button-light partner-apply" href={job.href} target="_blank" rel="sponsored noopener noreferrer">Apply Now <Icon name="external" size={16} /></a>
          </div>
        </article>
        <div className="partner-detail-layout">
          <article className="partner-copy">
            <div className="partner-summary">
              <div><span>Pay range</span><strong>{details.pay}</strong></div>
              <div><span>Schedule</span><strong>{details.schedule}</strong></div>
              <div><span>Location</span><strong>{details.location}</strong></div>
            </div>
            <section className="partner-detail-section partner-overview">
              <span className="section-label">About this opportunity</span>
              <p>{description}</p>
            </section>
            {details.responsibilities.length ? <section className="partner-detail-section">
              <h2>What you’ll do</h2>
              <ul className="detail-list">{details.responsibilities.map((item) => <li key={item}><Icon name="check" size={17} /> {item}</li>)}</ul>
            </section> : null}
            {details.qualifications.length ? <section className="partner-detail-section">
              <h2>What you’ll bring</h2>
              <ul className="detail-list">{details.qualifications.map((item) => <li key={item}><Icon name="check" size={17} /> {item}</li>)}</ul>
            </section> : null}
            {details.benefits.length ? <section className="partner-detail-section">
              <h2>Benefits & perks</h2>
              <div className="benefit-chips">{details.benefits.map((item) => <span key={item}><Icon name="spark" size={14} /> {item}</span>)}</div>
            </section> : roleContent ? <section className="partner-detail-section">
              <h2>Benefits & perks</h2>
              <p className="partner-detail-note">{partnerBenefitsNotice}</p>
            </section> : null}
            <div className="safety-note"><Icon name="shield" size={20} /><div><strong>Stay safe while you search</strong><p>Verify the destination and never share financial information to apply.</p></div></div>
          </article>
          <aside className="partner-ad"><FeaturedAdSlot href={featuredAdLinks[1]} /><TallAdSlot /></aside>
        </div>
      </div>
    </main>
    <Footer />
  </>
}
function AuthPage({ mode, onSuccess }) {
  const create = mode === 'create'
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' })
  const [error, setError] = useState('')
  const update = (key) => (event) => setForm((old) => ({ ...old, [key]: event.target.value }))
  const submit = (event) => {
    event.preventDefault()
    if (create && form.password !== form.confirm) { setError('Passwords do not match. Please try again.'); return }
    if (!form.email || !form.password || (create && (!form.name || !form.phone))) { setError('Please complete all required fields.'); return }
    setError('')
    onSuccess(create ? 'Profile created successfully — see jobs now' : 'Sign in successful — see jobs now')
  }
  return <><Header compact /><main className="auth-page"><div className="auth-shell page-width"><section className="auth-card"><span className="section-label">{create ? 'Your next move starts here' : 'Welcome back to Workly'}</span><h1>{create ? <>Create your<br /><em>Workly profile.</em></> : <>Sign in to<br /><em>find your fit.</em></>}</h1><p className="auth-lead">{create ? 'Save roles, move faster, and keep your job search in one clear place.' : 'Pick up where you left off and keep exploring roles that fit your life.'}</p><form className="auth-form" onSubmit={submit}>{create ? <><label>Full Name<input value={form.name} onChange={update('name')} placeholder="Your full name" autoComplete="name" /></label><label>Phone Number<input value={form.phone} onChange={update('phone')} placeholder="(555) 123-4567" autoComplete="tel" /></label></> : null}<label>Email<input type="email" value={form.email} onChange={update('email')} placeholder="you@example.com" autoComplete="email" /></label><label>Password<input type="password" value={form.password} onChange={update('password')} placeholder="Enter your password" autoComplete={create ? 'new-password' : 'current-password'} /></label>{create ? <label>Confirm Password<input value={form.confirm} onChange={update('confirm')} placeholder="Confirm your password" autoComplete="new-password" /></label> : null}{error ? <p className="form-error">{error}</p> : null}<button className="button button-teal auth-submit" type="submit">{create ? 'Create Now' : 'Sign In'} <Icon name="arrow" size={17} /></button></form><p className="auth-switch">{create ? 'Already have an account?' : 'Don’t have an account?'} <button onClick={() => navigate(create ? '/signin' : '/create-profile')}>{create ? 'Sign in' : 'Create profile'}</button></p></section><aside className="auth-aside"><div className="auth-aside-art profile-photo-art"><img src={create ? '/assets/logo/logo-2.jpg' : '/assets/logo/logo-1.jpg'} alt={create ? 'Professional woman holding a job offer' : 'Professional woman ready for her next move'} /></div><strong>{create ? 'A clearer way to move forward.' : 'Your next opportunity is closer.'}</strong><p>Transparent details, trusted destinations, and less noise in every step.</p></aside></div></main><Footer /></>
}

function Footer() {
  return <footer className="site-footer"><div className="page-width footer-top"><div className="footer-brand"><Logo light /><p>Find work that fits your life—and employers you can trust.</p><div className="social-row"><button aria-label="Workly on LinkedIn">in</button><button aria-label="Workly on Instagram">ig</button><button aria-label="Workly on X">x</button></div></div><div className="footer-links"><div><strong>For job seekers</strong><button onClick={() => navigate('/jobs')}>Find jobs</button><button onClick={() => alert('Salary insights are coming soon.')}>Salary insights</button><button onClick={() => alert('Workly safety guidance is coming soon.')}>Safety guide</button></div><div><strong>For employers</strong><button onClick={() => document.getElementById('employers')?.scrollIntoView({ behavior: 'smooth' })}>Why Workly</button><button onClick={() => alert('Employer posting tools are coming soon.')}>Post a job</button><button onClick={() => alert('Contact sales is coming soon.')}>Talk to sales</button></div><div><strong>About Workly</strong><button onClick={() => alert('We’re building a clearer way to work.')}>Our story</button><button onClick={() => alert('Workly support is coming soon.')}>Help center</button><button onClick={() => alert('We’re always looking for thoughtful builders.')}>Careers</button></div></div></div><div className="page-width footer-bottom"><span>© 2026 Workly, Inc.</span><div><button>Privacy</button><button>Terms</button><button>Accessibility</button></div><span className="footer-status"><span className="live-dot"></span> Built for better work</span></div></footer>
}

const SEO_ORIGIN = 'https://8328-imqkntv1ahfb7k61bdig1-d3466311.us1.manus.computer'
const SEO_IMAGE = `${SEO_ORIGIN}/manus-storage/workly-job-banner_111c08c1.png`
const SEO_ORGANIZATION = { '@type': 'Organization', '@id': `${SEO_ORIGIN}/#organization`, name: 'Workly', url: `${SEO_ORIGIN}/`, logo: SEO_IMAGE, description: 'A clearer way to find trusted work opportunities across the United States.' }
const SEO_WEBSITE = { '@type': 'WebSite', '@id': `${SEO_ORIGIN}/#website`, url: `${SEO_ORIGIN}/`, name: 'Workly', publisher: { '@id': `${SEO_ORIGIN}/#organization` }, inLanguage: 'en-US' }

function upsertMeta(attribute, key, content) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

function buildJobPostingSchema(partner, details, canonical) {
  if (!partner || !details || partner.id === 'partner-17') return null
  const employmentType = details.schedule.toLowerCase().includes('full-time') && details.schedule.toLowerCase().includes('part-time') ? ['FULL_TIME', 'PART_TIME'] : details.schedule.toLowerCase().includes('part-time') ? 'PART_TIME' : 'FULL_TIME'
  const salaryMatch = details.pay.match(/\$(\d+(?:\.\d+)?)[–-]\$(\d+(?:\.\d+)?)/)
  const salary = salaryMatch ? { '@type': 'MonetaryAmount', currency: 'USD', value: { '@type': 'QuantitativeValue', minValue: Number(salaryMatch[1]), maxValue: Number(salaryMatch[2]), unitText: 'HOUR' } } : undefined
  return { '@context': 'https://schema.org', '@type': 'JobPosting', title: partner.title, description: `${details.description} Responsibilities include ${details.responsibilities.join('; ')}. Qualifications include ${details.qualifications.join('; ')}.`, datePosted: '2026-10-02', employmentType, hiringOrganization: { '@type': 'Organization', name: details.company }, jobLocation: { '@type': 'Place', address: { '@type': 'PostalAddress', addressCountry: 'US' } }, ...(salary ? { baseSalary: salary } : {}), identifier: { '@type': 'PropertyValue', name: details.company, value: partner.id }, url: canonical, directApply: false, industry: 'Employment opportunities' }
}

function updateSeo(path) {
  const cleanPath = path.split('?')[0] || '/'
  const partnerId = cleanPath.match(/^\/jobs\/partner\/(partner-\d+)$/)?.[1]
  const partner = partnerId ? featuredJobs.find((item) => item.id === partnerId) : null
  const details = partner ? partnerDetails[partner.id] : null
  const isAuth = cleanPath === '/signin' || cleanPath === '/create-profile'
  const seo = partner && details
    ? { title: `${partner.title} | USA Jobs | Workly`, description: `${details.description} See pay, schedule, and benefits for this USA opportunity.`.slice(0, 158), keywords: `${partner.title}, USA jobs, ${details.schedule}, Workly`, type: 'article' }
    : cleanPath === '/jobs'
      ? { title: 'Browse USA Jobs, Remote Work & Part-Time Roles | Workly', description: 'Browse USA jobs with clear pay, schedules, benefits, locations, remote work, warehouse, healthcare, construction, driver, and flexible opportunities.', keywords: 'browse USA jobs, remote jobs USA, part-time jobs, warehouse jobs, healthcare jobs, construction jobs', type: 'website' }
      : cleanPath === '/create-profile'
        ? { title: 'Create Your USA Job Search Profile | Workly', description: 'Create a free Workly profile to save USA jobs, move faster, and keep your remote and local job search organized.', keywords: 'create job profile USA, job seeker profile, Workly account', type: 'website' }
        : cleanPath === '/signin'
          ? { title: 'Sign In to Your Workly Job Search | Workly', description: 'Sign in to your Workly account to continue exploring trusted USA jobs and flexible work opportunities.', keywords: 'Workly sign in, USA job search account, job seeker login', type: 'website' }
          : { title: 'USA Jobs & Remote Work Opportunities | Workly', description: 'Find trusted USA jobs, remote work, part-time roles, warehouse opportunities, healthcare careers, and flexible work with Workly.', keywords: 'USA jobs, American jobs, remote jobs, part-time jobs, warehouse jobs, healthcare jobs, job search', type: 'website' }
  const canonical = `${SEO_ORIGIN}${cleanPath === '/' ? '/' : cleanPath}`
  document.title = seo.title
  document.documentElement.lang = 'en-US'
  upsertMeta('name', 'description', seo.description)
  upsertMeta('name', 'keywords', seo.keywords)
  upsertMeta('name', 'robots', isAuth ? 'noindex, follow' : 'index, follow, max-image-preview:large')
  upsertMeta('property', 'og:type', seo.type)
  upsertMeta('property', 'og:title', seo.title)
  upsertMeta('property', 'og:description', seo.description)
  upsertMeta('property', 'og:url', canonical)
  upsertMeta('property', 'og:image', SEO_IMAGE)
  upsertMeta('property', 'og:image:alt', 'Professionals finding their next USA job opportunity')
  upsertMeta('name', 'twitter:title', seo.title)
  upsertMeta('name', 'twitter:description', seo.description)
  upsertMeta('name', 'twitter:image', SEO_IMAGE)
  let canonicalLink = document.head.querySelector('link[rel="canonical"]')
  if (!canonicalLink) { canonicalLink = document.createElement('link'); canonicalLink.rel = 'canonical'; document.head.appendChild(canonicalLink) }
  canonicalLink.href = canonical
  const jobPosting = buildJobPostingSchema(partner, details, canonical)
  const pageEntity = { '@type': 'WebPage', name: seo.title, description: seo.description, url: canonical, isPartOf: { '@id': `${SEO_ORIGIN}/#website` }, inLanguage: 'en-US' }
  const structuredData = jobPosting
    ? { '@context': 'https://schema.org', '@graph': [jobPosting, pageEntity, { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Workly', item: `${SEO_ORIGIN}/` }, { '@type': 'ListItem', position: 2, name: 'USA Jobs', item: `${SEO_ORIGIN}/jobs` }, { '@type': 'ListItem', position: 3, name: partner.title, item: canonical }] }, SEO_WEBSITE, SEO_ORGANIZATION] }
    : { '@context': 'https://schema.org', '@graph': [pageEntity, SEO_WEBSITE, SEO_ORGANIZATION] }
  const structuredScript = document.getElementById('workly-structured-data')
  if (structuredScript) structuredScript.textContent = JSON.stringify(structuredData)
}

function App() {
  const [path, setPath] = useState(window.location.pathname)
  const [saved, setSaved] = useState([])
  const [toast, setToast] = useState('')
  useEffect(() => { updateSeo(path) }, [path])
  useEffect(() => { const handlePop = () => setPath(window.location.pathname); window.addEventListener('popstate', handlePop); return () => window.removeEventListener('popstate', handlePop) }, [])
  const onSearch = ({ query = '', location = '' }) => navigate(`/jobs?query=${encodeURIComponent(query)}&location=${encodeURIComponent(location)}`)
  const onSelect = (id) => navigate(id.startsWith('partner-') ? `/jobs/partner/${id}` : `/jobs/${id}`)
  const onSave = (id) => setSaved((old) => old.includes(id) ? old.filter((savedId) => savedId !== id) : [...old, id])
  const showSuccess = (message) => { setToast(message); window.setTimeout(() => setToast(''), 4200); navigate('/jobs') }
  let page
  if (path === '/create-profile') page = <AuthPage mode="create" onSuccess={showSuccess} />
  else if (path === '/signin') page = <AuthPage mode="signin" onSuccess={showSuccess} />
  else if (path.startsWith('/jobs/partner/')) {
    const job = featuredJobs.find((item) => item.id === path.split('/')[3]) || popularPartnerJobs[0]
    page = <PartnerJobDetail job={job} onBack={() => navigate('/jobs')} />
  } else if (path.startsWith('/jobs/')) {
    const job = jobs.find((item) => item.id === path.split('/')[2]) || jobs[0]
    page = <JobDetail job={job} onSave={onSave} saved={saved.includes(job.id)} onBack={() => navigate('/jobs')} />
  }
  else if (path === '/jobs') page = <JobsPage onSelect={onSelect} onSave={onSave} saved={saved} />
  else page = <HomePage onSearch={onSearch} onSelect={onSelect} onSave={onSave} saved={saved} />
  return <><div>{page}</div>{toast ? <div className="toast-message" role="status"><Icon name="check" size={17} /> {toast}</div> : null}</>
}

createRoot(document.getElementById('root')).render(<App />)
