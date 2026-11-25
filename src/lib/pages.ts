// Service and location landing pages. Each entry becomes its own prerendered
// URL (scripts/prerender.mjs) with its own title, meta description and schema.
// Copy is written for RTH. Keep it honest: no claims we can't back up.

export type PageSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type Faq = { q: string; a: string };

export type LandingPage = {
  kind: 'service' | 'location';
  slug: string; // URL path without slashes, e.g. "forestry-mulching"
  navLabel: string; // short name used in link lists
  title: string; // <title>, keep under ~60 characters
  description: string; // meta description, keep under ~158 characters
  h1: string;
  intro: string;
  sections: PageSection[];
  faqs: Faq[];
  presetService?: string; // SERVICES label to preselect in the quote form
  serviceType?: string; // schema.org Service.serviceType (service pages)
  areaName?: string; // place name for schema (location pages)
};

export const SERVICE_PAGES: LandingPage[] = [
  {
    kind: 'service',
    slug: 'land-clearing',
    navLabel: 'Land clearing',
    title: 'Land Clearing Services in Logan & Southeast Ohio | Rock The Hock',
    description:
      'Land clearing services and lot clearing in Logan, the Hocking Hills and southeast Ohio. Homesites, cabin pads, pasture, overgrown acreage. Free estimate.',
    h1: 'Land Clearing Services in Logan and Southeast Ohio',
    intro:
      'Got ground you can’t use because it’s grown shut? We clear it with a Cat 289D3 track loader and a high-flow drum mulcher, so you end up with open, usable land instead of burn piles and ruts. We’re based in Logan and work across Hocking County and the counties around it.',
    serviceType: 'Land clearing',
    presetService: 'Lot and homesite clearing',
    sections: [
      {
        heading: 'What kind of land clearing we do',
        paragraphs: [
          'Most of our jobs are rural acreage: a homesite or cabin pad back in the woods, a pasture that went to brush, a camper spot, or a few acres somebody just bought and wants to see. We match the method to what you’re going to do with the ground next.',
        ],
        bullets: [
          'Homesite, cabin and pole barn pads',
          'Overgrown pasture and hayfield reclamation',
          'Camper and RV pads, yard expansion',
          'Fence lines, property lines and survey lines',
          'Trails, logging roads and hunting lanes',
          'Driveway cut-ins through wooded ground',
        ],
      },
      {
        heading: 'Mulching versus full clearing',
        paragraphs: [
          'For most brush and small trees, forestry mulching is the cheapest and cleanest option. The mulcher grinds everything in place and leaves a mulch layer that holds the soil on a slope.',
          'If you’re building a house or pouring concrete, the site usually needs more than that: stumps out, topsoil stripped and the pad graded. Tell us what you’re planning and we’ll quote the right level of clearing so you don’t pay for work you don’t need.',
        ],
      },
      {
        heading: 'Land clearing for construction',
        paragraphs: [
          'Clearing land for a new house, garage, pole barn or cabin takes more than knocking down brush. We clear the building footprint and a working margin around it, pull stumps where the foundation and driveway go, strip and stockpile topsoil if you want it saved, and rough-grade the pad. Then we cut in the drive and bring gravel so your builder and the concrete truck can get in.',
        ],
      },
      {
        heading: 'Built for hill country',
        paragraphs: [
          'Hocking County ground is steep, wet in the spring and full of sandstone. A rubber-track loader puts far less pressure on the soil than a dozer or a wheeled machine, so it can work slopes and soft spots without tearing them up. When part of a property is too steep to work safely, we tell you up front and leave it out of the quote.',
        ],
      },
      {
        heading: 'Picking a land clearing contractor near you',
        paragraphs: [
          'If you are searching for land clearing companies near you, a few questions sort them out fast. Do they run their own equipment, or sub it out? Will the person who quotes the job be on the machine? Is the quote in writing, with fuel and delivery shown, so you can compare it fairly? Do they know steep, wet hill ground? And can they handle the next step, like the driveway, the gravel or the septic, so you are not hiring three companies?',
          'We are a local land clearing contractor in Logan. We own the track loader, mulcher, dump truck and trailer, the owner runs the job, and every quote is written and itemized.',
        ],
      },
      {
        heading: 'How a land clearing job goes',
        paragraphs: [
          'Send photos and a rough acreage through the form, or call or text. We walk the property, flag what stays and what goes, and give you a written price. On clearing day the owner runs the machine. When we’re done we walk it again with you.',
        ],
      },
    ],
    faqs: [
      {
        q: 'How much does land clearing cost per acre in Ohio?',
        a: 'It depends on how thick the brush is, how big the trees are, how steep the ground is and how far we haul the machine. Light brush on flat ground costs far less per acre than a steep hillside full of 8-inch trees. We rate every job on terrain and on brush density and give you a written number after a free look.',
      },
      {
        q: 'Do I need a permit to clear land in Hocking County?',
        a: 'Clearing your own rural land usually doesn’t need a permit, but building, septic and driveway work often does, and work near streams or wetlands can have extra rules. Check with the county and township for your parcel. We’re happy to talk through what we’ve run into.',
      },
      {
        q: 'Can you clear land on a steep hillside?',
        a: 'Often, yes. Our track loader handles a lot of slope. Ground that is too steep to work safely gets left out of the measured area and the price, and we show you where that line is.',
      },
      {
        q: 'How long does it take to clear an acre?',
        a: 'Light brush can go in a few hours. Thick brush with trees mixed in can take a full day or more per acre. We give you a time estimate with the quote.',
      },
    ],
  },
  {
    kind: 'service',
    slug: 'forestry-mulching',
    navLabel: 'Forestry mulching',
    title: 'Forestry Mulching in Hocking County, OH | Rock The Hock',
    description:
      'Forestry mulching in Logan, the Hocking Hills and southeast Ohio. 72-inch high-flow drum mulcher, no burn piles, no hauling. Free estimate: (614) 379-2170.',
    h1: 'Forestry Mulching in Hocking County and Southeast Ohio',
    intro:
      'Forestry mulching cuts brush and small trees and grinds them into mulch in one pass, right where they stand. There is nothing to pile, burn or haul away, and the mulch it leaves behind protects the ground. It is the main thing we do.',
    serviceType: 'Forestry mulching',
    presetService: 'Forestry mulching',
    sections: [
      {
        heading: 'Our mulching setup',
        paragraphs: [
          'We run a Raytree RMDM72SS 72-inch drum mulcher on a Cat 289D3 compact track loader with high-flow hydraulics. The drum takes brush, saplings and small to medium trees down to the ground and spreads the chips as it goes. The tracks keep the machine light on its feet on soft or sloped ground.',
        ],
      },
      {
        heading: 'Where forestry mulching works best',
        paragraphs: ['Mulching is the right call when you want the land open but don’t need bare dirt. Common jobs:'],
        bullets: [
          'Clearing underbrush to open up a wooded lot or a view',
          'Reclaiming pasture that has gone to brush and saplings',
          'Knocking back multiflora rose, autumn olive, honeysuckle and greenbrier',
          'Cutting trails, ATV paths and shooting lanes',
          'Clearing fence lines and property lines',
          'Opening food plots and hunting access',
        ],
      },
      {
        heading: 'Why landowners pick mulching',
        paragraphs: [
          'You skip the burn permit and the smoke, and you don’t pay for trucks to haul brush off. One machine does the work that used to take a crew with saws, a skid steer and a dump truck. The mulch layer slows erosion on hillsides and breaks down into the soil over a couple of seasons.',
          'Mulching takes stumps down to about ground level. If you need stumps pulled out for a building pad or a lawn, tell us and we’ll price that part separately.',
        ],
      },
      {
        heading: 'Pricing',
        paragraphs: [
          'We price mulching jobs after we see the ground. Each job gets a terrain rating and a brush density rating, and your written quote shows fuel and equipment delivery as their own lines so you can see exactly what you are paying for.',
        ],
      },
    ],
    faqs: [
      {
        q: 'What size trees can a forestry mulcher handle?',
        a: 'Our 72-inch drum mulcher handles brush, saplings and small to medium trees. Bigger trees we look at on the site walk, and some may need to be cut and left or handled another way.',
      },
      {
        q: 'What land clearing equipment do you use?',
        a: 'A Cat 289D3 compact track loader with high-flow hydraulics, a Raytree RMDM72SS 72-inch drum mulcher, a Top Cat HDRC 72-inch brush cutter, a Raytree 78-inch power rake, an auger and a post driver. Most of it can also be rented from us.',
      },
      {
        q: 'Does forestry mulching kill the stumps?',
        a: 'It grinds them down to about ground level. Some species will sprout back from the roots, especially autumn olive and some hardwoods. A follow-up mow or spot spray keeps it from coming back.',
      },
      {
        q: 'Is forestry mulching better than bulldozing?',
        a: 'For brush and small trees, usually yes. There are no burn piles, the topsoil stays put and the mulch protects slopes from washing. If you are building, some dirt work may still be needed after mulching.',
      },
      {
        q: 'What time of year is best for forestry mulching?',
        a: 'We mulch all year. Late fall and winter are good because the leaves are down, you can see the ground, and frozen ground holds the machine up well.',
      },
    ],
  },
  {
    kind: 'service',
    slug: 'brush-clearing',
    navLabel: 'Brush clearing',
    title: 'Brush Clearing & Overgrowth Removal | Logan, OH | Rock The Hock',
    description:
      'Brush clearing, overgrowth cutting and invasive brush removal in Hocking County and southeast Ohio. Fields, fence lines, trails. Call (614) 379-2170.',
    h1: 'Brush Clearing and Overgrowth Removal in Southeast Ohio',
    intro:
      'Fields that sat a few years in southeast Ohio fill in fast with briars, multiflora rose and saplings. We cut it back with a 72-inch brush cutter or the drum mulcher, depending on how thick it is, and get the ground back to where you can mow, graze or walk it again.',
    serviceType: 'Brush clearing',
    presetService: 'Overgrowth and brush cutting',
    sections: [
      {
        heading: 'Two machines, two kinds of brush',
        paragraphs: [
          'For grass, weeds, briars and brush up to a few inches thick, the Top Cat HDRC 72-inch brush cutter moves fast and keeps the cost down. Once saplings and small trees are mixed in, the drum mulcher takes over. Plenty of jobs use both. We quote whichever setup gets your ground cleared for the least money.',
        ],
      },
      {
        heading: 'Common brush clearing jobs',
        paragraphs: [],
        bullets: [
          'Overgrown pasture and old hayfields',
          'Fence lines before new fence goes in',
          'Property and survey lines',
          'Road frontage, ditches and driveway edges',
          'Around ponds, barns and outbuildings',
          'Trails and paths on hunting land',
        ],
      },
      {
        heading: 'Invasive brush',
        paragraphs: [
          'Autumn olive, multiflora rose, bush honeysuckle and tree-of-heaven are all over the Hocking Hills. Cutting them back opens the ground up, but most will resprout from the root. We can tell you what we see on your land and when a follow-up cut or treatment makes sense.',
        ],
      },
    ],
    faqs: [
      {
        q: 'How often does brush need to be cleared?',
        a: 'If you keep it mowed after the first clearing, a lot of fields only need a light cut once or twice a year. Left alone, most pasture in this area fills back in within a few seasons.',
      },
      {
        q: 'Can you clear brush along a fence without wrecking the fence?',
        a: 'Yes, if the fence is in good shape we work along it carefully. If the fence is coming out anyway, tell us and we’ll clear right through it.',
      },
      {
        q: 'Do you haul the brush away?',
        a: 'Usually there is nothing to haul. The cutter and mulcher leave it on the ground as mulch. If you want piles of cut brush removed, our dump truck can haul it off.',
      },
    ],
  },
  {
    kind: 'service',
    slug: 'gravel-driveways',
    navLabel: 'Driveways and grading',
    title: 'Gravel Driveway Installation & Grading | Logan, OH | Rock The Hock',
    description:
      'Driveway cut-ins, gravel driveways, grading and seed bed prep in Hocking County and southeast Ohio. We clear, haul the stone and spread it. (614) 379-2170.',
    h1: 'Gravel Driveways, Cut-Ins and Grading',
    intro:
      'A lot of wooded lots around Logan have no way in. We clear the path, shape the base, bring the stone in our own dump truck and spread it with the track loader, so one company handles the whole driveway from trees to gravel.',
    serviceType: 'Gravel driveway installation',
    presetService: 'Driveway cut-ins and gravel driveway construction',
    sections: [
      {
        heading: 'What we do',
        paragraphs: [],
        bullets: [
          'New driveway cut-ins through brush and woods',
          'Gravel driveways and parking pads',
          'Re-grading and re-graveling worn or washed-out drives',
          'Pads for campers, sheds and pole barns',
          'Finish grading and seed bed prep with a 78-inch power rake',
        ],
      },
      {
        heading: 'Drives that hold up on hills',
        paragraphs: [
          'On a slope, water is what wrecks a gravel drive. We shape the drive so water runs off instead of down the middle, and we talk through where a culvert or a ditch would help before the stone goes down. Steep stretches may need bigger base stone than flat ground.',
        ],
      },
      {
        heading: 'Power rake finish work',
        paragraphs: [
          'After clearing or septic work, the Raytree 78-inch power rake breaks up clods, pulls out rocks and roots and leaves a smooth seed bed for grass. It is also a quick way to level a yard or re-dress a gravel drive.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Do I need a permit for a new driveway?',
        a: 'A new drive onto a county or township road usually needs a driveway permit from the road authority, and some need a culvert. Check with the county engineer or township before we start. We can work to whatever they require.',
      },
      {
        q: 'What gravel do you use for a driveway?',
        a: 'Usually a larger base stone with a finer top layer that packs down. The right mix depends on your soil and slope. We go over it with the quote.',
      },
    ],
  },
  {
    kind: 'service',
    slug: 'septic-tank-installation',
    navLabel: 'Septic tank installation',
    title: 'Septic Tank Installation in Hocking County, OH | Rock The Hock',
    description:
      'Septic tank installation and replacement in Logan, Hocking County and southeast Ohio, including clearing, excavation and backfill. Call (614) 379-2170.',
    h1: 'Septic Tank Installation in Hocking County',
    intro:
      'New homes and cabins around the Hocking Hills almost all run on septic. We handle the machine work for new and replacement septic tanks: clearing the site, digging, setting the tank and backfilling, then cleaning up and getting the ground ready for seed.',
    serviceType: 'Septic tank installation',
    presetService: 'Septic tank installation',
    sections: [
      {
        heading: 'How septic jobs work in Ohio',
        paragraphs: [
          'In Ohio, a new or replacement septic system needs a permit and an approved design through your county health district before any digging starts. The design says where the tank and the treatment area go and what type of system fits your soil. We work from that approved plan.',
          'If you are still at the soil evaluation stage, we can clear access for the evaluator and get the site ready.',
        ],
      },
      {
        heading: 'What we bring',
        paragraphs: [
          'A Cat 289D3 track loader for digging, moving spoil and backfill, a dump truck for stone and fill, and a power rake for finish grading. Because we do land clearing too, a septic job on a wooded lot doesn’t need a second contractor to open it up first.',
        ],
      },
      {
        heading: 'Hill country soils',
        paragraphs: [
          'A lot of Hocking County has shallow soil over sandstone or heavy clay that drains slowly. That affects which system the health district will approve and how deep the dig goes. We walk the site with you and the plan before giving a price.',
        ],
      },
    ],
    faqs: [
      {
        q: 'How long does a septic tank install take?',
        a: 'The machine work for a tank install is often a few days once the permit is in hand, depending on weather, access and the system type. Inspections can add time between steps.',
      },
      {
        q: 'Can you replace an old septic tank?',
        a: 'Yes. Replacements also go through the county health district. We dig out, set the new tank to the approved plan and backfill.',
      },
    ],
  },
  {
    kind: 'service',
    slug: 'gravel-delivery-hauling',
    navLabel: 'Gravel delivery and hauling',
    title: 'Gravel & Topsoil Delivery, Haul-Off | Logan, OH | Rock The Hock',
    description:
      'Gravel, stone, topsoil and fill dirt delivery, debris haul-off and equipment hauling around Logan and Hocking County. Own dump truck. (614) 379-2170.',
    h1: 'Gravel Delivery, Dirt Delivery and Haul-Off Around Logan',
    intro:
      'We run our own International 4700 dump truck, a Ford F-350 flatbed and a long tilt trailer. That means we can bring material in, take junk out and move machines without waiting on a trucking company.',
    serviceType: 'Gravel and dirt delivery',
    presetService: 'Gravel, topsoil and fill dirt delivery',
    sections: [
      {
        heading: 'Deliveries',
        paragraphs: [
          'Gravel and driveway stone, topsoil, fill dirt and mulch, dropped where you want it. If you need it spread, the track loader can do that on the same trip.',
        ],
      },
      {
        heading: 'Haul-off',
        paragraphs: [
          'Brush piles, stumps, spoil dirt, rock and old concrete. We load it with the track loader and haul it out. Dump and landfill fees are billed at cost.',
        ],
      },
      {
        heading: 'Equipment and material hauling',
        paragraphs: [
          'The tilt trailer moves skid steers, tractors, mowers and campers. The flatbed carries materials and smaller loads. Starting prices are listed in the Hauling section of our home page.',
        ],
      },
    ],
    faqs: [
      {
        q: 'How much gravel do I need for my driveway?',
        a: 'Give us the length and width of the drive and whether it is new or a re-dress, and we will figure the loads for you.',
      },
      {
        q: 'Do you deliver outside Hocking County?',
        a: 'Yes. Delivery near Logan is priced as a flat trip, and farther out is priced by distance.',
      },
    ],
  },
];

export const LOCATION_PAGES: LandingPage[] = [
  {
    kind: 'location',
    slug: 'logan-oh',
    navLabel: 'Logan, OH',
    areaName: 'Logan, Ohio',
    title: 'Land Clearing in Logan, OH | Forestry Mulching | Rock The Hock',
    description:
      'Logan, Ohio land clearing, forestry mulching, brush clearing and gravel driveways from a local, owner-run crew. Free estimates: (614) 379-2170.',
    h1: 'Land Clearing and Forestry Mulching in Logan, Ohio',
    intro:
      'Logan is home base. Our machines and trucks are kept here, so jobs in and around town cost less to get to and are easier to fit into the schedule. Call or text and you talk to the owner who runs the machine.',
    presetService: 'Forestry mulching',
    sections: [
      {
        heading: 'Work we do around Logan',
        paragraphs: [
          'Most of the calls we get around Logan fall into a few groups: wooded lots off the state routes that need a homesite opened up, back fields that went to brush, fence lines before new fence goes in, and driveways that need cutting in or re-graveling.',
        ],
        bullets: [
          'Forestry mulching and underbrush clearing',
          'Homesite, barn and camper pad clearing',
          'Brush cutting on fields and fence lines',
          'Gravel driveways, grading and seed bed prep',
          'Septic tank installation',
          'Gravel, topsoil and fill dirt delivery',
        ],
      },
      {
        heading: 'Close to town, close to the hollows',
        paragraphs: [
          'Properties around Logan run from flat ground along the Hocking River to steep, wooded hollows a few miles out. A tracked loader with a mulching head handles both without rutting the ground. If a section of your land is too steep for safe work, we tell you before we quote it.',
        ],
      },
      {
        heading: 'Nearby areas',
        paragraphs: [
          'From Logan we also cover Rockbridge, Haydenville, Union Furnace, Gore, Carbon Hill and the rest of Hocking County, plus Laurelville and Sugar Grove.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Do you charge to come look at a property in Logan?',
        a: 'No. Estimates are free. Send photos and your road name and we can often give you a ballpark before we drive out.',
      },
      {
        q: 'How soon can you start a job near Logan?',
        a: 'Local jobs are the easiest to fit in. It depends on the schedule and the weather, so ask when you send your request.',
      },
    ],
  },
  {
    kind: 'location',
    slug: 'hocking-hills',
    navLabel: 'Hocking Hills',
    areaName: 'Hocking Hills, Ohio',
    title: 'Land Clearing in the Hocking Hills, OH | Rock The Hock',
    description:
      'Clearing for cabin lots, views, trails and driveways in the Hocking Hills. Forestry mulching on steep, wooded ground. Free estimate: (614) 379-2170.',
    h1: 'Land Clearing in the Hocking Hills for Cabins and Wooded Lots',
    intro:
      'A lot of land in the Hocking Hills is bought for a cabin, a getaway or a rental. Before any of that happens the lot has to be opened up, and it usually sits on a steep, wooded hillside with one narrow way in. That is the kind of ground our equipment is set up for.',
    presetService: 'Lot and homesite clearing',
    sections: [
      {
        heading: 'Cabin and rental property work',
        paragraphs: [],
        bullets: [
          'Clearing cabin and house pads in the woods',
          'Opening views by thinning underbrush and small trees',
          'Driveway cut-ins and gravel drives on slopes',
          'Septic tank installation for new cabins',
          'Walking trails, fire pit areas and parking pads',
          'Ongoing brush control so rentals stay tidy for guests',
        ],
      },
      {
        heading: 'Keeping the woods that make it worth buying',
        paragraphs: [
          'People come to the Hocking Hills for the trees and the rock. Forestry mulching lets us clear selectively: we take the brush, briars and small stuff and leave the bigger trees you want to keep. We flag the keepers with you before the machine starts.',
        ],
      },
      {
        heading: 'What the best land clearing in the Hocking Hills looks like',
        paragraphs: [
          'Good clearing out here is less about horsepower and more about judgment. The best job leaves the trees you wanted, keeps the hillside from washing, puts the drive where water won’t ruin it, and doesn’t leave ruts or burn scars behind. That takes a contractor who knows the ground and is on the machine, not one sending a crew they met that morning.',
          'Here is what we offer: a local, owner-run crew from Logan, a track loader and mulcher sized for slopes, written quotes that rate the terrain and the brush density, and fuel and delivery listed on their own lines. Compare that against anyone else you are considering.',
        ],
      },
      {
        heading: 'Steep ground, tight access',
        paragraphs: [
          'Sandstone ledges, ravines and narrow roads are normal out here. A compact track loader fits on a trailer that can get down most township roads, and it stays stable on slopes that would stop wheeled equipment. Ground that is too steep is left out of the measured area and the price.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Who is the best land clearing company in the Hocking Hills?',
        a: 'The best fit is a local contractor who owns the equipment, works steep wooded ground every week and gives an itemized written quote. Rock The Hock Land Clearing is based in Logan, the county seat of Hocking County, and does forestry mulching, lot clearing, driveways and septic installs across the Hocking Hills. Call or text (614) 379-2170 for a free estimate.',
      },
      {
        q: 'Can you clear a view without cutting down all the trees?',
        a: 'Yes. We clear the understory and selected small trees and leave the bigger ones. Walk the lot with us and we will flag what stays.',
      },
      {
        q: 'Do you work near Old Man’s Cave, Laurelville and South Bloomingville?',
        a: 'Yes, on private land all through the Hocking Hills, including the areas around Laurelville, South Bloomingville, Rockbridge and Ilesboro Road.',
      },
    ],
  },
  {
    kind: 'location',
    slug: 'nelsonville-oh',
    navLabel: 'Nelsonville, OH',
    areaName: 'Nelsonville, Ohio',
    title: 'Land Clearing in Nelsonville, OH | Brush & Mulching | Rock The Hock',
    description:
      'Land clearing, forestry mulching and brush clearing in Nelsonville, Buchtel and the Athens–Hocking county line. Free estimate: (614) 379-2170.',
    h1: 'Land Clearing and Brush Clearing in Nelsonville, Ohio',
    intro:
      'Nelsonville sits right on the Hocking–Athens county line, about 20 minutes down US-33 from our yard in Logan. We clear lots, fields and fence lines in town and out toward Buchtel, Haydenville and Murray City.',
    presetService: 'Overgrowth and brush cutting',
    sections: [
      {
        heading: 'What we see around Nelsonville',
        paragraphs: [
          'A lot of the land around Nelsonville was mined or farmed long ago and has grown back in thick: autumn olive, multiflora rose, briars and young trees. Some of it sits next to the Wayne National Forest. Brush cutting and forestry mulching are a good fit for getting that ground usable again.',
        ],
        bullets: [
          'Reclaiming overgrown lots and old fields',
          'Clearing along property lines next to public land',
          'Opening space for homes, garages and campers',
          'Driveways, grading and gravel delivery',
        ],
      },
      {
        heading: 'Know your lines',
        paragraphs: [
          'Where private land borders national forest or other public ground, we only clear what is yours. If the line isn’t marked, we ask you to have it marked or surveyed before we start.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Do you charge extra to come to Nelsonville?',
        a: 'Nelsonville is close to our base, so equipment delivery stays low. Delivery is shown as its own line on your quote.',
      },
    ],
  },
  {
    kind: 'location',
    slug: 'lancaster-oh',
    navLabel: 'Lancaster, OH',
    areaName: 'Lancaster, Ohio',
    title: 'Land Clearing & Forestry Mulching in Lancaster, OH | Rock The Hock',
    description:
      'Forestry mulching, brush clearing, fence line clearing and gravel driveways in Lancaster and Fairfield County, Ohio. Free estimate: (614) 379-2170.',
    h1: 'Land Clearing and Forestry Mulching in Lancaster and Fairfield County',
    intro:
      'Lancaster is a short run up US-33 from Logan. Fairfield County mixes farm ground, newer homes on acreage and wooded hills toward the south end of the county, and we do clearing work across all of it.',
    presetService: 'Forestry mulching',
    sections: [
      {
        heading: 'Typical Fairfield County jobs',
        paragraphs: [],
        bullets: [
          'Clearing brush and saplings from the back of acreage lots',
          'Fence line clearing before new fence or a survey',
          'Reclaiming pasture for horses or cattle',
          'Trails and shooting lanes on wooded land',
          'Building pad clearing and gravel driveways',
          'Power-rake grading and seed bed prep for new yards',
        ],
      },
      {
        heading: 'Neat work near neighbors',
        paragraphs: [
          'Around Lancaster, Sugar Grove and Carroll a lot of jobs are within sight of the neighbors. Forestry mulching is quiet compared with a burn pile and leaves no smoke, no brush piles and no ruts. We clean up the road and the drive before we leave.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Which parts of Fairfield County do you cover?',
        a: 'Lancaster, Sugar Grove, Rushville, Bremen, Carroll, Baltimore and the countryside between them. Ask if you are farther north.',
      },
    ],
  },
  {
    kind: 'location',
    slug: 'athens-oh',
    navLabel: 'Athens, OH',
    areaName: 'Athens, Ohio',
    title: 'Land Clearing in Athens, OH | Forestry Mulching | Rock The Hock',
    description:
      'Land clearing, forestry mulching and brush removal in Athens and Athens County, Ohio, on steep and wooded ground. Free estimate: (614) 379-2170.',
    h1: 'Land Clearing and Forestry Mulching in Athens County',
    intro:
      'We bring the track loader and mulcher down US-33 to Athens, The Plains, Albany and the rest of Athens County. Hillside homesites, overgrown farm ground and wooded acreage make up most of the work down here.',
    presetService: 'Forestry mulching',
    sections: [
      {
        heading: 'Hillside lots and old farm ground',
        paragraphs: [
          'Athens County land is mostly steep and wooded, with old fields that have gone back to brush. Forestry mulching keeps the topsoil in place on those slopes while it opens the ground up, which matters when the next step is a garden, a homesite or grazing.',
        ],
        bullets: [
          'Homesite and small farm clearing',
          'Garden and orchard ground reclaimed from brush',
          'Trail and access road clearing',
          'Fence line and property line clearing',
          'Driveway cut-ins and gravel',
        ],
      },
      {
        heading: 'Getting there',
        paragraphs: [
          'Athens is far enough from Logan that equipment delivery is its own line on the quote. Bigger jobs, or a couple of jobs grouped together, spread that cost out. Ask if your neighbors need work too.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Do you serve The Plains, Albany and Glouster?',
        a: 'Yes, along with Chauncey, Amesville and the rest of Athens County.',
      },
    ],
  },
  {
    kind: 'location',
    slug: 'mcarthur-oh',
    navLabel: 'McArthur & Vinton County',
    areaName: 'Vinton County, Ohio',
    title: 'Land Clearing in McArthur & Vinton County, OH | Rock The Hock',
    description:
      'Forestry mulching, food plots, hunting lanes and land clearing in McArthur and Vinton County, Ohio. Free estimate: (614) 379-2170.',
    h1: 'Land Clearing and Food Plot Prep in Vinton County',
    intro:
      'Vinton County is the most wooded county in Ohio, and a lot of the land changing hands there is recreational and hunting ground. We clear access, plots and lanes from McArthur out to Hamden, Zaleski and Wilkesville.',
    presetService: 'Trails, hunting lanes and food plot prep',
    sections: [
      {
        heading: 'Hunting and recreation land',
        paragraphs: [],
        bullets: [
          'Opening food plots in the woods or in old fields',
          'Shooting lanes and stand access',
          'ATV and walking trails, logging road clean-up',
          'Camper pads, cabin sites and gravel drives',
          'Power-rake seed bed prep so plots are ready to plant',
        ],
      },
      {
        heading: 'Plan the season around the work',
        paragraphs: [
          'Late winter and summer are good times to clear plots so they can be worked and planted for fall. We can clear and power-rake on the same visit so the ground is ready for seed.',
        ],
      },
    ],
    faqs: [
      {
        q: 'How big should a food plot be?',
        a: 'It depends on the deer pressure and what you plant. Many hunters in this area run plots from a quarter acre to a couple of acres. We can lay out a few options when we walk the land.',
      },
    ],
  },
];

export const ALL_PAGES: LandingPage[] = [...SERVICE_PAGES, ...LOCATION_PAGES];

export function findPage(path: string): LandingPage | undefined {
  const slug = path.replace(/^\/+|\/+$/g, '');
  return ALL_PAGES.find((p) => p.slug === slug);
}

export const pageUrl = (p: LandingPage) => `/${p.slug}/`;
