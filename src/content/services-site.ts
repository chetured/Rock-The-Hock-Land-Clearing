import type { LandingPage } from './types';
import { PER_ACRE_MULCHING, TREE_SIZE } from './pricing';

export const SITE_SERVICES: LandingPage[] = [
  {
    kind: 'service',
    slug: 'food-plot-trail-clearing',
    navLabel: 'Food plots and trails',
    service: 'Food Plot & Trail Clearing',
    area: 'Hocking County, OH',
    description:
      'Food plot clearing, shooting lanes, ATV trails and hunting land work in Hocking and Vinton County, OH. Mulch, clear and power-rake. (614) 379-2170.',
    intro:
      'Hocking and Vinton counties are some of the best deer country in Ohio, and a lot of the land changing hands is recreational and hunting ground. We clear food plots, shooting lanes, stand access and ATV trails, and we can power-rake a plot so it is ready to plant on the same visit.',
    serviceType: 'Food plot and trail clearing',
    presetService: 'Trails, hunting lanes and food plot prep',
    sections: [
      {
        heading: 'What we clear on hunting and recreation land',
        paragraphs: [],
        bullets: [
          'Food plots in old fields, woods openings and log landings',
          'Shooting lanes from existing stands and blinds',
          'Quiet access trails to stands, routed to keep your scent off the deer',
          'ATV, UTV and walking trails',
          'Old logging roads cleaned up and reopened',
          'Camper pads and parking at the gate',
          'Edge feathering to create cover along field borders',
        ],
      },
      {
        heading: 'Food plots from start to plantable',
        paragraphs: [
          'A food plot needs three things from us: the brush and small trees gone, the stumps low enough to work, and a seed bed. The drum mulcher clears the plot and grinds stumps to about ground level. Then the Raytree 78-inch power rake breaks up the mulch and the top few inches of soil, pulls out roots and rocks, and leaves a level seed bed. You or your planting crew can spread lime, fertilizer and seed right behind us.',
          'For new plots in the woods, think about sunlight. A plot needs at least four to six hours of direct sun to grow well, so we often clear a wider opening or feather the south edge to let more light in.',
        ],
      },
      {
        heading: 'Trails and lanes that work for hunting',
        paragraphs: [
          'Good access trails let you get to a stand without walking through bedding areas or crossing the wind. We can follow your route or help lay one out on the walk-through. Shooting lanes are cleared narrow and long, with the mulch left down so the lane stays quiet. On steep ground we keep trails across the slope where we can, so they do not turn into ditches after the first heavy rain.',
        ],
      },
      {
        heading: 'Timing the work around the season',
        paragraphs: [
          'Late winter and early spring are ideal for clearing new plots and trails. Deer have time to get used to the changes before fall, and plots can be limed early. Summer is the time to power-rake and plant fall plots. We avoid working active hunting properties during the season unless you ask us to.',
        ],
      },
      {
        heading: 'Pricing hunting land work',
        paragraphs: [
          'Plots are priced like any mulching job: by terrain and brush rating, then machine hours, with fuel and delivery listed separately. Trails and lanes are priced by length and density. Grouping several plots and trails into one visit spreads the delivery cost out and is the cheapest way to do it.',
        ],
      },
      {
        heading: "Laying out plots and trails on the walk-through",
        paragraphs: [
          "We walk the property with you and look at bedding areas, travel corridors, wind direction, sun and slope. Plots on a gentle south-facing slope near cover tend to get the most use. Trails work best when they approach stands from the downwind side and stay off ridgelines where deer will see and smell you. We mark everything with ribbon so you can see it before the machine starts.",
        ],
      },
      {
        heading: "Soil in Hocking and Vinton County plots",
        paragraphs: [
          "Most soils here are acidic and low in phosphorus, so a soil test before planting pays for itself. OSU Extension offices can tell you how to send one. Newly cleared woods ground is often thin and rocky; the power rake mixes the mulch into the top few inches, which helps, but expect to lime and fertilize the first couple of years to get a good stand.",
        ],
      },
      {
        heading: "Logging roads and old trails",
        paragraphs: [
          "Many hunting tracts have old logging roads that have grown shut and washed out. We mulch them open, knock down the berms, fill or shape the worst ruts, and put in water bars so the next heavy rain does not cut them back out. The result is a road you can drive a side-by-side down without dragging bottom.",
        ],
      },
      {
        heading: "Where we work",
        paragraphs: [
          "We clear plots and trails on hunting land across Hocking County and in Vinton County around McArthur, Hamden and Zaleski, plus Athens and Perry counties. Big tracts with several plots and miles of trail are best done in one visit to keep delivery costs down.",
        ],
      },
    ],
    faqs: [
      {
        q: "When is the best time to clear a new food plot?",
        a: "Late winter or early spring, so you can soil test, lime and let the ground settle before planting in summer for fall.",
      },
      {
        q: "Will clearing scare the deer off my property?",
        a: "Deer get used to the change quickly, especially when the work is done months before the season. New plots and edges usually draw more deer, not fewer.",
      },
      { q: 'How much does it cost to clear a food plot per acre?', a: PER_ACRE_MULCHING },
      { q: 'What size trees can you clear for a plot or lane?', a: TREE_SIZE },
      {
        q: 'How big should a food plot be?',
        a: 'It depends on deer numbers and what you plant. Many hunters here run plots from a quarter acre to a couple of acres. Small plots near cover get hunted; bigger plots feed deer. We can lay out a few options on the walk-through.',
      },
      {
        q: 'Can you get a plot ready to plant?',
        a: 'Yes. After clearing we power-rake the ground into a seed bed. You spread lime, fertilizer and seed, or have your planting crew do it.',
      },
      {
        q: 'Do you work in Vinton County and on big hunting tracts?',
        a: 'Yes. We work across Hocking and Vinton counties and the surrounding area, including large recreational tracts.',
      },
    ],
  },
  {
    kind: 'service',
    slug: 'gravel-driveways',
    navLabel: 'Driveways and grading',
    service: 'Gravel Driveways & Grading',
    area: 'Logan, OH',
    description:
      'Gravel driveway installation, driveway cut-ins, grading and seed bed prep in Logan, OH and Hocking County. We clear, haul and spread. (614) 379-2170.',
    intro:
      'Plenty of wooded lots around Logan have no way in. We clear the path, shape the base, bring the stone in our own dump truck and spread it with the track loader, so one company handles the whole driveway from trees to gravel. We also re-grade washed-out drives and do finish grading with a 78-inch power rake.',
    serviceType: 'Gravel driveway installation',
    presetService: 'Driveway cut-ins and gravel driveway construction',
    sections: [
      {
        heading: 'Driveway and grading work we do',
        paragraphs: [],
        bullets: [
          'New driveway cut-ins through brush and woods',
          'Gravel driveways, turnarounds and parking pads',
          'Re-grading and re-graveling worn or washed-out drives',
          'Ditches, water bars and crowning to move water off the drive',
          'Pads for campers, sheds, pole barns and equipment',
          'Finish grading and seed bed prep with the power rake',
          'Yard leveling after construction or septic work',
        ],
      },
      {
        heading: 'Drives that hold up on hills',
        paragraphs: [
          'On a slope, water is what wrecks a gravel drive. Once it starts running down the middle, it cuts a channel, washes the fines out and leaves loose rock and ruts. We shape the drive with a crown or a cross slope so water sheets off the side instead of down the center, add ditches where it needs somewhere to go, and put in water bars on steep stretches to turn it off the road.',
          'We talk through culverts before any stone goes down. A drive that crosses a draw or a ditch line usually needs a pipe, and a new connection to a county or township road usually needs a driveway permit and sometimes a specific culvert size from the road authority.',
        ],
      },
      {
        heading: 'Base, stone and compaction',
        paragraphs: [
          'A drive is only as good as what is under it. On soft clay we strip the topsoil, shape the subgrade and use a larger base stone that locks together. On top goes a finer, crushed stone with fines that packs down into a hard surface. Steep stretches may need bigger base stone or geotextile fabric to keep the gravel from migrating downhill. We go over the stone choice with you on the quote.',
        ],
      },
      {
        heading: 'Power rake grading and seed bed prep',
        paragraphs: [
          "The Raytree RMSC78 78-inch power rake is a rotating drum with carbide teeth that breaks up clods, pulls out rocks and roots, and leaves a smooth, level surface. It is the fastest way to turn rough ground after clearing or septic work into a seed bed for grass. It also re-dresses an old gravel drive by loosening the surface and windrowing the stone back into the center.",
        ],
      },
      {
        heading: 'One company from trees to gravel',
        paragraphs: [
          "Because we clear land, haul with our own International 4700 dump truck and run the loader that spreads the stone, you do not need to line up a clearing crew, a trucking company and a grader. That saves scheduling headaches and usually money too, since there is only one delivery charge for the machine.",
        ],
      },
      {
        heading: 'Pricing a driveway',
        paragraphs: [
          'Driveways are priced by length, width, how much clearing the route needs, and how many loads of stone it takes. Your written quote lists clearing, grading, stone and trucking, culvert work if any, fuel and equipment delivery as separate lines. Give us the rough length and whether it is new or a re-dress, and we can estimate the loads for you.',
        ],
      },
      {
        heading: "Signs your driveway needs work",
        paragraphs: [
          "Potholes that come back every spring, a center hump with deep tire ruts on each side, gravel washed into the ditch or the road, standing water on the drive, and soft spots where vehicles sink are all signs the base or the drainage has failed. Adding stone on top only buys a season. Fixing the shape and the drainage first, then adding stone, is what lasts.",
        ],
      },
      {
        heading: "Maintaining a gravel drive",
        paragraphs: [
          "Keep the crown, keep the ditches clear and add a load of top stone every few years where traffic wears it thin. After a big storm, check the culvert inlets for brush and gravel. A quick pass with the power rake every few years pulls stone back from the edges and re-shapes the surface for a fraction of the cost of a rebuild.",
        ],
      },
      {
        heading: "Camper, shed and barn pads",
        paragraphs: [
          "A pad has to be level, drain well and hold weight. We strip the topsoil, level and compact the subgrade, and build it up with base and top stone. For pole barns and garages, we can set the pad height so the floor sits above the surrounding ground and water runs away from the building.",
        ],
      },
      {
        heading: "Where we build driveways",
        paragraphs: [
          "We build and repair gravel drives around Logan and across Hocking County, in the hill country near Rockbridge, Laurelville and the state park, and in Sugar Grove, Lancaster, Nelsonville and Athens. Jobs near Logan cost the least to reach, and our own dump truck keeps stone deliveries simple anywhere in that area.",
        ],
      },
      {
        heading: "Working with your builder",
        paragraphs: [
          "If a house or barn is going up, we coordinate with your builder on the drive route, the pad elevation and when heavy trucks will need access. A construction-grade drive goes in early so concrete and lumber trucks can get in without sinking, then we come back after the build to top-dress it and fix any damage the trucks did.",
        ],
      },
    ],
    faqs: [
      {
        q: "How long does a new gravel driveway take?",
        a: "A short drive on open ground can be done in a day. A long drive through woods with clearing, culverts and many loads of stone can take several days.",
      },
      {
        q: 'How much does a gravel driveway cost?',
        a: 'It depends mostly on length, how much clearing and grading the route needs, and the number of loads of stone. A short re-dress might be a few loads and a half day of work; a new 500-foot drive through woods is a much bigger job. Send the length and photos for a written, itemized quote.',
      },
      {
        q: 'Do I need a permit for a new driveway?',
        a: 'A new drive onto a county or township road usually needs a driveway permit from the road authority, and some need a culvert. Check with the county engineer or your township before we start. We build to whatever they require.',
      },
      {
        q: 'What gravel is best for a driveway on a hill?',
        a: 'Usually a larger base stone with a crushed top stone that packs down. Steep stretches may need bigger stone, fabric or water bars. We recommend the mix on the site walk.',
      },
      {
        q: 'Can you fix a washed-out driveway?',
        a: 'Yes. We re-grade it, fix the crown or cross slope, add ditches or water bars to move water off, and top it with fresh stone.',
      },
      { q: 'Can you clear trees for a new driveway route?', a: TREE_SIZE },
    ],
  },
  {
    kind: 'service',
    slug: 'septic-tank-installation',
    navLabel: 'Septic tank installation',
    service: 'Septic Tank Installation',
    area: 'Hocking County, OH',
    description:
      'Septic tank installation and replacement in Hocking County, OH: site clearing, excavation, setting the tank and backfill to the approved design. (614) 379-2170.',
    intro:
      'Almost every new home and cabin in the Hocking Hills runs on a septic system. We handle the machine work for new and replacement septic tanks: clearing the site, digging, setting the tank, backfilling, and getting the ground ready for seed, all to the design approved by your county health district.',
    serviceType: 'Septic tank installation',
    presetService: 'Septic tank installation',
    sections: [
      {
        heading: 'How septic jobs work in Ohio',
        paragraphs: [
          'In Ohio, a new or replacement household sewage treatment system needs a permit and an approved design through your local health district before any digging starts. The process usually starts with a site and soil evaluation, then a system design that says where the tank and the soil treatment area go and what type of system fits your soil. The health district inspects the work before it is covered.',
          "We work from that approved plan. If you are still at the soil evaluation stage, we can clear access for the evaluator, dig test pits where the evaluator directs, and get the site ready for the next step.",
        ],
      },
      {
        heading: 'What we do on a septic job',
        paragraphs: [],
        bullets: [
          'Clear the tank and treatment area, plus access for trucks',
          'Excavate for the tank to the depth and location on the plan',
          'Set the tank on a level base and make it ready for connection and inspection',
          'Backfill and compact after inspection',
          'Haul off spoil or spread it where you want it',
          'Rough and finish grade, then power-rake for seed',
        ],
      },
      {
        heading: 'Hill country soils',
        paragraphs: [
          'A lot of Hocking County has shallow soil over sandstone or shale, or heavy clay that drains slowly. That affects which type of system the health district will approve and how deep the excavation goes. Hitting rock where the plan calls for a deep tank changes the job, so we walk the site and the plan with you before quoting, and we tell you what we will do if we hit rock or water.',
        ],
      },
      {
        heading: 'Replacing a failing system',
        paragraphs: [
          'Wet spots and odors over the leach field, slow drains and sewage backing up are common signs a system is failing. A replacement goes through the same permit and design process as a new system. We dig out the old tank where the plan calls for it, set the new one, and backfill and restore the yard.',
        ],
      },
      {
        heading: 'Why one contractor helps',
        paragraphs: [
          'A septic system on a wooded lot usually means clearing first, then digging, then grading and gravel. Because we do land clearing, excavation, hauling and grading with our own track loader and dump truck, you are not waiting on a second contractor to open up the site before the septic work can start.',
        ],
      },
      {
        heading: 'Pricing',
        paragraphs: [
          'Septic jobs are priced from the approved design: tank size and type, excavation depth, access, rock, how much spoil moves and how far, plus clearing, grading, fuel and delivery. We give a written, itemized quote after walking the site with the plan.',
        ],
      },
      {
        heading: "Getting the site ready for the soil evaluation",
        paragraphs: [
          "The soil evaluator needs to reach the likely tank and treatment area, often on a wooded slope. We clear a path for their truck or a small machine, open the evaluation area and dig the test pits where they direct. Clearing only what the evaluation needs at that stage keeps your options open in case the approved location ends up somewhere else.",
        ],
      },
      {
        heading: "Protecting the treatment area",
        paragraphs: [
          "The soil treatment area is where the system does its work, and compacting it with heavy equipment can ruin it. We keep machines and trucks off the treatment area except where the plan calls for work, route traffic around it, and stage stone and spoil elsewhere. After the job, keep vehicles, livestock and building projects off that ground too.",
        ],
      },
      {
        heading: "Calling 811 and inspections",
        paragraphs: [
          "Ohio law requires a call to OUPS at 811 before excavation so buried utilities are marked. We make that call for septic digs. The health district inspects before the system is covered, so the schedule leaves time for that inspection between setting and backfilling.",
        ],
      },
      {
        heading: "After the install",
        paragraphs: [
          "Once the system is approved and covered, we grade the site so water runs away from the tank and treatment area, then power-rake and prepare it for seed. Grass cover protects the soil and makes the system easy to find and maintain later. Keep a copy of the as-built drawing so you know where the tank lids are for pumping.",
        ],
      },
      {
        heading: "Where we install septic tanks",
        paragraphs: [
          "We do septic tank installs and replacements around Logan and across Hocking County, including the cabin country near the state park, Rockbridge and Laurelville. We also work in nearby parts of Fairfield, Athens, Vinton and Perry counties. Each county has its own health district, permits and inspection process, and we work to whichever applies to your property.",
        ],
      },
      {
        heading: "New cabins and short-term rentals",
        paragraphs: [
          "A lot of new septic systems in the Hocking Hills go in for cabins and short-term rentals. Rentals can see heavier use than a typical household, with more guests and laundry, so the design may account for that. We handle the clearing, drive, tank install and site grading as one job so the cabin build stays on schedule.",
        ],
      },
    ],
    faqs: [
      {
        q: "How often does a septic tank need pumping?",
        a: "Many households pump every few years, depending on tank size and how many people live there. Your health district and the system design give guidance for your system.",
      },
      {
        q: "What are signs my septic system is failing?",
        a: "Soggy ground or odors over the treatment area, slow drains, gurgling plumbing and sewage backing up into the house are common signs. Contact your health district about repair or replacement requirements.",
      },
      {
        q: 'Do I need a permit to install a septic tank in Hocking County?',
        a: 'Yes. In Ohio, new and replacement household septic systems need a permit and an approved design from your local health district before work starts, and the work is inspected before it is covered.',
      },
      {
        q: 'How long does a septic tank install take?',
        a: 'The machine work for a tank install is often a few days once the permit is in hand, depending on weather, access, rock and the system type. Inspections can add time between steps.',
      },
      {
        q: 'Can you replace an old septic tank?',
        a: 'Yes. Replacements go through the health district too. We dig out, set the new tank to the approved plan and backfill.',
      },
      {
        q: 'What if you hit rock?',
        a: 'Sandstone is common here. We look at the plan and the site first, and the quote says how rock is handled so there are no surprises.',
      },
      {
        q: 'Do you clear the lot for the septic system too?',
        a: 'Yes. We clear the tank and treatment area and the access route, and can clear the rest of the homesite on the same trip.',
      },
    ],
  },
  {
    kind: 'service',
    slug: 'gravel-delivery-hauling',
    navLabel: 'Gravel delivery and hauling',
    service: 'Gravel Delivery & Hauling',
    area: 'Logan, OH',
    description:
      'Gravel, topsoil and fill dirt delivery, debris haul-off and equipment hauling in Logan, OH and Hocking County. Our own dump truck. (614) 379-2170.',
    intro:
      'We run our own International 4700 dump truck, a Ford F-350 flatbed and a long tilt trailer. That means we bring material in, take junk out and move machines without waiting on a trucking company, and if you need the gravel spread, the track loader can do it on the same trip.',
    serviceType: 'Gravel and dirt delivery',
    presetService: 'Gravel, topsoil and fill dirt delivery',
    sections: [
      {
        heading: 'Gravel and stone delivery',
        paragraphs: [
          'Driveway stone, crushed limestone, base stone and other common aggregates from local quarries, dropped where you want it. Tell us what it is for and we will suggest the right stone. Tailgate spreading puts a thin layer down the length of a drive as we dump, and the track loader can spread and shape it if you want a finished surface.',
        ],
      },
      {
        heading: 'Topsoil, fill dirt and mulch',
        paragraphs: [
          'Topsoil for lawns and gardens, fill dirt for low spots and building up pads, and mulch. We can deliver and spread, then power-rake topsoil into a seed bed so it is ready for grass.',
        ],
      },
      {
        heading: 'Debris and dirt haul-off',
        paragraphs: [
          'Brush piles, stumps, spoil dirt from a dig, rock and old concrete. We load it with the track loader and haul it out. Dump and landfill fees are billed at cost, so you are not paying a markup on disposal. Many clearing jobs avoid haul-off entirely by mulching in place, but when something has to go, we can take it.',
        ],
      },
      {
        heading: 'Equipment and material hauling',
        paragraphs: [
          'Our tilt trailer moves skid steers, compact tractors, mowers, side-by-sides and campers. The F-350 flatbed carries pallets, lumber, fence material and smaller loads. Moves within about 25 miles of Logan are priced as a flat trip each way, with a per-mile charge beyond that.',
        ],
      },
      {
        heading: 'Starting prices',
        paragraphs: [
          'Our home page lists starting prices for deliveries, haul-off, the dump truck by the hour and equipment moves. Material is priced at the quarry plus trucking. Farther trips are priced by distance. Call or text for an exact number.',
        ],
      },
      {
        heading: 'Where we deliver',
        paragraphs: [
          'Logan and all of Hocking County, plus nearby parts of Fairfield, Athens, Vinton, Perry and Pickaway counties. Delivery close to Logan is a flat trip; farther out is priced by distance.',
        ],
      },
      {
        heading: "Picking the right stone",
        paragraphs: [
          "Crushed limestone with fines packs into a hard driving surface. Larger base stone builds up soft or washed-out spots and makes a solid foundation under new drives. Clean stone without fines drains well and works for drainage trenches and under sheds. Tell us what the stone is for and we will recommend the size and the number of loads.",
        ],
      },
      {
        heading: "Getting the truck in",
        paragraphs: [
          "A loaded dump truck is heavy and tall. Before delivery, make sure there is a firm path to the drop spot, no low wires or limbs, and room to raise the bed. On soft lawns or steep, wet drives we may drop at the top and spread with the track loader instead. Point out septic tanks, leach fields and buried lines so we stay off them.",
        ],
      },
      {
        heading: "Yard and site clean-up",
        paragraphs: [
          "After storms, construction or a big clean-out, we can clear brush piles, dig out and haul stumps, scrape and haul spoil dirt, and take old concrete and rock away. The loader does the loading so you are not doing it by hand, and the dump truck takes it to the right disposal site.",
        ],
      },
      {
        heading: "Hauling for land clearing jobs",
        paragraphs: [
          "Most of our clearing jobs need no hauling at all, because the mulcher leaves everything on the ground. When a job does need trucking, such as stumps from a building pad, spoil from a septic dig or stone for a new drive, having our own truck on the same job means no waiting on an outside hauler and one less bill to manage.",
        ],
      },
      {
        heading: "Seasonal timing",
        paragraphs: [
          "Spring is the busiest time for stone, when drives are soft and potholed after the winter. Fall is a good time to get a drive ready before freeze and thaw starts. Summer is best for topsoil and seeding. Book early in spring if you need several loads.",
        ],
      },
    ],
    faqs: [
      {
        q: "How much is a load of gravel?",
        a: "It depends on the stone and the size of the load. Material is priced at the quarry plus trucking. Tell us the stone and the amount and we will give you a total.",
      },
      {
        q: "Can you deliver to a steep or soft driveway?",
        a: "Usually. If the truck cannot get to the spot safely, we drop where it can and move the stone with the track loader.",
      },
      {
        q: 'How much gravel do I need for my driveway?',
        a: 'Give us the length and width and whether it is new or a re-dress. A rough rule is that a few inches of stone over a 10-foot-wide drive takes about a ton every 6 to 8 feet, but base needs vary. We figure the loads for you.',
      },
      {
        q: 'How much does gravel delivery cost?',
        a: 'Trucking starts at a flat price for deliveries near Logan, plus the material at quarry price. Our current starting prices are on the home page; farther trips are priced by distance.',
      },
      {
        q: 'Can you spread the gravel too?',
        a: 'Yes. The dump truck can tailgate-spread as it unloads, and the track loader can spread and shape it for a finished drive.',
      },
      {
        q: 'Do you haul away brush and stumps?',
        a: 'Yes. We load with the track loader and haul it off. Disposal fees are billed at cost.',
      },
      {
        q: 'Can you move my tractor or skid steer?',
        a: 'Yes. Our tilt trailer moves compact equipment, mowers, side-by-sides and campers.',
      },
    ],
  },
  {
    kind: 'service',
    slug: 'post-hole-digging',
    navLabel: 'Post holes and post driving',
    service: 'Post Hole Digging & Fence Post Driving',
    area: 'Logan, OH',
    description:
      'Post hole digging and hydraulic fence post driving in Logan, OH and Hocking County. Fence posts, pole barns, decks and tree planting. (614) 379-2170.',
    intro:
      'Digging post holes by hand in Hocking County clay and rock is a miserable job. We auger holes with a hydraulic skid steer auger and drive T-posts and wood posts with a hydraulic post driver, so a fence line that would take you a week goes in a day.',
    serviceType: 'Post hole digging',
    presetService: 'Post holes and fence post driving',
    sections: [
      {
        heading: 'What we do',
        paragraphs: [],
        bullets: [
          'Fence post holes for wood posts, corners and braces',
          'Driving T-posts and wood posts with a hydraulic driver',
          'Holes for pole barns, pavilions, decks and sign posts',
          'Holes for tree and shrub planting',
          'Clearing the fence line first, then setting posts on the same trip',
        ],
      },
      {
        heading: 'Auger or post driver?',
        paragraphs: [
          'The Raytree RMA42 auger digs clean holes for posts that get set in concrete or tamped gravel: corners, braces, gate posts, pole barns and decks. The GIYI GY-D680 hydraulic post driver pounds T-posts and pointed wood line posts straight into the ground. Driven posts are often tighter than set posts because the soil around them is never disturbed. Most fence jobs use both: augered corners and braces, driven line posts.',
        ],
      },
      {
        heading: 'Rock and clay',
        paragraphs: [
          'Hocking County has a lot of sandstone just under the surface and heavy clay in the bottoms. The hydraulic auger handles clay and broken rock far better than a hand or PTO auger. Solid ledge rock can stop any auger, so if we hit it, we move the post slightly where the layout allows or talk through options with you.',
        ],
      },
      {
        heading: 'Clear the line and set the posts in one trip',
        paragraphs: [
          'If your fence line is overgrown, we clear it first with the forestry mulcher or brush cutter, then come right behind with the auger and post driver. One delivery, one crew. We set posts; stretching wire and building the finished fence is up to you or your fence builder.',
        ],
      },
      {
        heading: 'Pricing',
        paragraphs: [
          'Post work is priced by the number of holes or posts and the ground conditions, plus delivery. Send the length of fence, the post spacing and how many corners and gates, and we will give you a written number.',
        ],
      },
      {
        heading: "Fence post spacing and depth",
        paragraphs: [
          "Line posts on livestock fence are commonly set 8 to 12 feet apart, closer for woven wire on rough ground. Corners, ends and gates carry the strain of the whole fence, so they are set deeper and braced. In Ohio, frost reaches a couple of feet down, so posts that hold gates or structures should be set below it. Tell us the fence type and we will match spacing and depth to it.",
        ],
      },
      {
        heading: "Pole barns, decks and pavilions",
        paragraphs: [
          "Post-frame buildings need holes at precise spacing and depth for the posts or footings. We auger to your builder's layout and depth, so the crew can set posts the same day. If footings need concrete, the auger leaves clean, straight-sided holes that take less concrete.",
        ],
      },
      {
        heading: "Tree and shrub planting",
        paragraphs: [
          "For windbreaks, orchards and screening rows, the auger digs planting holes fast and loosens the soil around the hole for roots. It is much quicker than a shovel in clay and rocky ground.",
        ],
      },
      {
        heading: "Call 811 first",
        paragraphs: [
          "Ohio law requires an OUPS 811 call before digging, including post holes, so buried electric, gas, phone and water lines are marked. We make that call for the hole locations before we start.",
        ],
      },
      {
        heading: "Where we dig and drive posts",
        paragraphs: [
          "We do post work on farms and acreage around Logan and across Hocking County, around Laurelville and the farm country toward Pickaway County, and in Sugar Grove, Lancaster, Nelsonville, Athens and Vinton County. Pairing post work with fence line clearing on the same trip saves you a second delivery charge.",
        ],
      },
      {
        heading: "Driven versus set posts",
        paragraphs: [
          "Driven posts go in without removing soil, so the ground stays tight around them and they resist leaning. Set posts in augered holes are better where you need concrete, exact depth, or large posts for corners, gates and buildings. On rocky ground the auger can break through layers a driver cannot, and on soft ground a driven post can be longer for more holding power. We pick the method post by post.",
        ],
      },
      {
        heading: "Gates and corners",
        paragraphs: [
          "Gates and corners take the most strain. We set them deeper, in augered holes, so they can be concreted or tamped and braced. For wide farm gates, a heavier post and a longer brace keep the gate from sagging after a few years.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can you dig in rocky ground?",
        a: "The hydraulic auger handles clay and broken rock well. Solid ledge can stop any auger; if we hit it, we shift the post where the layout allows or talk through options with you.",
      },
      {
        q: "How deep do you set fence posts?",
        a: "Line posts are usually driven or set a couple of feet deep, and corner, end and gate posts deeper and braced. We match depth to your fence type and soil.",
      },
      {
        q: 'How much does post hole digging cost?',
        a: 'It depends on the number and size of holes and the ground. We price by the job after seeing the layout. Grouping post work with fence line clearing saves a delivery charge.',
      },
      {
        q: 'What size holes can you dig?',
        a: 'Common fence and pole sizes, depending on the bit. Ask about the bit size you need when you request a quote.',
      },
      {
        q: 'Can you drive wood posts?',
        a: 'Yes. The hydraulic driver drives pointed wood line posts as well as T-posts.',
      },
      {
        q: 'Do you build the whole fence?',
        a: 'We clear the line and set the posts. Wire and the finished fence are up to you or your fence builder.',
      },
      {
        q: 'Can I rent the auger or post driver instead?',
        a: 'Yes. Both are on our rental list for use on a skid steer or our Cat 289D3.',
      },
    ],
  },
];
