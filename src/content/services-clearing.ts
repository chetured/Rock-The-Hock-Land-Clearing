import type { LandingPage } from './types';
import { PER_ACRE_MULCHING, TREE_SIZE } from './pricing';

export const CLEARING_SERVICES: LandingPage[] = [
  {
    kind: 'service',
    slug: 'land-clearing',
    navLabel: 'Land clearing',
    service: 'Land Clearing',
    area: 'Southeast Ohio',
    description:
      'Land clearing in southeast Ohio from a Logan-based crew: homesites, pasture, overgrown acreage and land clearing for construction. Free estimates. (614) 379-2170.',
    intro:
      "Rock The Hock clears land in Logan, the Hocking Hills and the counties around them. We own and run a Cat 289D3 compact track loader with a 72-inch forestry mulcher, a brush cutter, a power rake, a dump truck and a tilt trailer, so one local crew can take a piece of ground from overgrown to usable. The owner quotes the job and runs the machine, and every quote is written and itemized.",
    serviceType: 'Land clearing',
    presetService: 'Lot and homesite clearing',
    sections: [
      {
        heading: 'What land clearing means on a Hocking County property',
        paragraphs: [
          "Land clearing covers anything from thinning the underbrush in a woodlot to stripping a building pad down to dirt. Around Logan most of the land we work on is rolling to steep, wooded, and has been left alone for years. It tends to fill in with briars, multiflora rose, autumn olive, honeysuckle, grapevine and saplings, with a few bigger hardwoods mixed in. Under all of that there is usually sandstone, clay and a spring seep or two.",
          'Before we quote, we ask what you want the ground to do next. A view, a pasture, a hunting plot, a camper spot and a house foundation each need a different level of clearing. Matching the method to the end use is the single biggest thing that keeps the price down, because it stops you paying for work you did not need.',
        ],
      },
      {
        heading: 'The jobs we do most',
        paragraphs: ['These are the land clearing jobs that make up most of our calendar:'],
        bullets: [
          'Homesite, cabin, garage and pole barn pads',
          'Overgrown pasture and hayfield reclamation',
          'Wooded lot clean-up and underbrush removal',
          'Camper, RV and tiny-home pads',
          'Fence lines, property lines and survey lines',
          'Trails, logging roads and hunting lanes',
          'Driveway cut-ins through brush and woods',
          'Clearing around ponds, barns and outbuildings',
        ],
      },
      {
        heading: 'Forestry mulching or full clearing?',
        paragraphs: [
          "For brush and small trees, forestry mulching is usually the cheapest and cleanest way to clear land. The mulcher cuts and grinds everything where it stands and spreads the chips back over the ground. You end up with open land covered in a mulch layer that holds the soil, with no burn piles and no trucks hauling brush away.",
          "Full clearing goes further. Stumps come out, topsoil may be stripped and stockpiled, and the ground is shaped. That is what you need under a slab, a foundation, a septic system or a driveway, but it costs more and it leaves bare dirt that has to be seeded or graveled. On a lot of jobs we do both: mulch the whole property, then fully clear only the footprint that is going to be built on.",
        ],
      },
      {
        heading: 'Land clearing for construction',
        paragraphs: [
          "If you are building a house, a cabin, a garage or a pole barn, we clear the footprint plus a working margin so the builder has room for equipment and material. We pull stumps where the foundation, the drive and the septic will go, strip and stockpile topsoil if you want it for later, and rough-grade the pad. Then we cut in the driveway and bring gravel with our own dump truck so the concrete truck can get in.",
          'Bring us your site plan or just a sketch of where the house and drive will sit. We can work from a builder\'s stakes, an engineer\'s drawing, or flags we place with you on the site walk.',
        ],
      },
      {
        heading: 'Why a track loader works on hill ground',
        paragraphs: [
          "Hocking County ground is steep, wet in spring and full of rock. Rubber tracks spread the 289D3's weight over a large footprint, so it works slopes and soft spots without the deep ruts a wheeled skid steer or a heavy dozer can leave. It also fits on a trailer that can get down most township roads and narrow lanes.",
          "Not every slope should be worked. Where the ground is too steep, too wet or too close to a drop-off to run safely, we tell you up front, show you where the line is and leave it out of the measured area and the price. You only pay for ground we can actually clear.",
        ],
      },
      {
        heading: 'Choosing a land clearing contractor near you',
        paragraphs: [
          "If you are searching for land clearing companies near you, a few questions sort them out fast. Do they own the equipment or rent it for your job? Will the person who quotes the job be on the machine? Is the quote in writing, with fuel and delivery shown, so you can compare it fairly against other bids? Have they worked steep, wet hill ground before? And can they handle the next step, like the driveway, the gravel or the septic, so you are not juggling three contractors?",
          "We are a local land clearing contractor based in Logan. We own every machine we bring, the owner runs the job, and every quote breaks out the terrain rating, the brush density rating, machine time, fuel and delivery.",
        ],
      },
      {
        heading: 'How a land clearing job goes',
        paragraphs: [
          'Send photos and a rough acreage through the form, or call or text. We look at the parcel on the county map and usually give you a ballpark quickly. Then we walk the property with you, flag what stays and what goes, and mark anything we will not run on. You get a written price. On clearing day the owner runs the machine, and when we finish we walk it again with you before we load up.',
        ],
      },
    ],
    faqs: [
      { q: 'How much does land clearing cost per acre around Logan, Ohio?', a: PER_ACRE_MULCHING },
      { q: 'How big a tree can you clear?', a: TREE_SIZE },
      {
        q: 'Do I need a permit to clear land in Hocking County?',
        a: "Clearing brush on your own rural land usually does not need a permit. Building, septic and new driveway connections to a public road usually do, and work in or next to a stream or wetland can have extra rules. Check with the county and your township for your parcel. We are happy to tell you what we have run into on similar jobs.",
      },
      {
        q: 'Can you clear land on a steep hillside?',
        a: 'Often, yes. The track loader handles a lot of slope. Ground too steep to work safely is left out of the measured area and the price, and we show you exactly where that line is before we start.',
      },
      {
        q: 'How long does it take to clear an acre?',
        a: 'Light brush on easy ground can be done in a few hours. Thick saplings on a slope can take most of a day per acre or more. Your quote includes our time estimate.',
      },
      {
        q: 'Do you remove stumps?',
        a: 'Mulching grinds stumps down to about ground level, which is fine for pasture, trails and lawns. Where something will be built, we dig the stumps out of that footprint and price that part separately.',
      },
      {
        q: 'What happens to the brush and trees?',
        a: 'Most of it becomes mulch on the ground. Larger logs can be left for firewood, stacked at the edge of the woods, or hauled off in our dump truck.',
      },
    ],
  },
  {
    kind: 'service',
    slug: 'forestry-mulching',
    navLabel: 'Forestry mulching',
    service: 'Forestry Mulching',
    area: 'Hocking Hills, OH',
    description:
      'Forestry mulching in the Hocking Hills, OH. 72-inch high-flow drum mulcher on a Cat track loader. No burn piles, no hauling. Free estimate: (614) 379-2170.',
    intro:
      'Forestry mulching cuts brush and small trees and grinds them into mulch in one pass, right where they stand. Nothing gets piled, burned or hauled, and the mulch left behind protects the ground. It is the main thing we do in the Hocking Hills, where steep, wooded land and soft soil make it the best fit for most clearing jobs.',
    serviceType: 'Forestry mulching',
    presetService: 'Forestry mulching',
    sections: [
      {
        heading: 'Our mulching setup',
        paragraphs: [
          'We run a Raytree RMDM72SS 72-inch drum mulcher on a Cat 289D3 compact track loader with high-flow hydraulics. The drum spins fixed carbide teeth that chew brush, saplings and small to medium trees down to the ground and throw the chips back over the area. The loader has an enclosed cab, so we can run in thick brush safely, and low-pressure rubber tracks, so we can work hillsides and wet spots that would stop a wheeled machine.',
          'Because we own the machine, the mulcher, the truck and the trailer, there is no rental markup and no waiting on someone else\'s equipment.',
        ],
      },
      {
        heading: 'Where forestry mulching works best',
        paragraphs: ['Mulching is the right call when you want land open but you do not need bare dirt. Typical Hocking Hills jobs:'],
        bullets: [
          'Clearing underbrush to open a wooded lot or a view from a cabin',
          'Reclaiming pasture that has gone to brush and saplings',
          'Knocking back multiflora rose, autumn olive, bush honeysuckle and greenbrier',
          'Cutting trails, ATV paths, shooting lanes and food plots',
          'Clearing fence lines and property lines',
          'Opening a camper spot or a building site before dirt work',
          'Fuel reduction around cabins and outbuildings',
        ],
      },
      {
        heading: 'Why landowners pick mulching over burning and hauling',
        paragraphs: [
          'Clearing the old way takes a crew with chainsaws, a skid steer to push piles, days of burning or a string of dump trucks, and then someone to fix the ruts. A mulcher does all of it with one machine and one operator. You skip the burn permit, the smoke and the ash piles, and you do not pay to truck brush to a landfill.',
          'The mulch layer matters on hill ground. It slows rain, holds soil on slopes, keeps the ground from baking in summer and breaks down into the soil over a couple of seasons. Mulched ground also greens up fast, which is why it works so well for pasture and wildlife plots.',
        ],
      },
      {
        heading: 'Selective clearing: keep the trees you want',
        paragraphs: [
          "People buy land in the Hocking Hills for the trees and the rock. Forestry mulching lets us clear selectively. We take the underbrush, briars and small stuff and leave the oaks, maples, hemlocks and anything else you want to keep. Before the machine starts, we walk the property with you and flag keepers with ribbon. If you want to open a view toward a valley, we can thin a corridor instead of clearing the whole hillside.",
        ],
      },
      {
        heading: 'What the ground looks like after',
        paragraphs: [
          'Expect an even layer of shredded wood a few inches deep, with stumps ground down to about ground level. It looks rough for the first few weeks, then grass and wildflowers start coming through. Some species, especially autumn olive and some hardwood saplings, will sprout back from the roots. A follow-up mow with a brush cutter or a spot spray the next season keeps it from coming back. We can quote that follow-up when we quote the clearing.',
        ],
      },
      {
        heading: 'Best time of year to mulch',
        paragraphs: [
          'We mulch year-round. Late fall and winter are a favorite: the leaves are down so we can see the ground and the trees you want to keep, snakes and ticks are not an issue, and frozen ground holds the machine up. Spring is the wettest time in the Hocking Hills, so we pick our days carefully. Summer works well on firm ground and is a good time to prep food plots for fall planting.',
        ],
      },
      {
        heading: 'How we price mulching',
        paragraphs: [
          'Every mulching job gets a terrain rating from 1 to 3 (flat and firm up to steep, rocky or wet) and a brush density rating from 1 to 3 (light brush up to thick saplings 4 to 8 inches across). Those two ratings set the machine hours. Your written quote then lists the mulching, edge clean-up, fuel and equipment delivery as separate lines, so you can see exactly what you are paying for and compare bids fairly.',
        ],
      },
      {
        heading: "Mulching around cabins, ponds and outbuildings",
        paragraphs: [
          "Close to buildings, the goal is usually a clean, defensible space: brush and dead material cleared back from the walls, low limbs and vines gone, and a mulch floor that is easy to keep mowed. We work in close with the mulcher's deflector door down to keep chips off siding and windows, and finish tight corners with the brush cutter or by hand. Around ponds we stay off the dam face and keep a grass buffer at the water's edge so the bank holds.",
        ],
      },
      {
        heading: "Before we start on your property",
        paragraphs: [
          "Mark your boundary or have it flagged, and point out anything hidden in the brush: wells, septic tank lids and leach lines, old fence wire, junk metal, propane lines, buried water lines and big rocks. The mulcher can grind through a lot, but steel and rock are hard on teeth and dangerous to throw. If we will be digging stumps or augering, Ohio law requires a call to OUPS at 811 before any digging, and we handle that request for the dig areas.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can forestry mulching be done in the rain?",
        a: "Light rain is fine. After long rain we wait for the ground to firm up, especially on slopes and in bottom ground, so the tracks do not rut.",
      },
      { q: 'How much does forestry mulching cost per acre in the Hocking Hills?', a: PER_ACRE_MULCHING },
      { q: 'What size trees can your forestry mulcher handle?', a: TREE_SIZE },
      {
        q: 'Does forestry mulching kill the stumps?',
        a: 'It grinds them down to about ground level. Some species resprout from the roots, especially autumn olive and some hardwoods. A follow-up mow or spot spray the next season keeps the regrowth down.',
      },
      {
        q: 'Is forestry mulching better than bulldozing?',
        a: 'For brush and small trees, usually yes. There are no burn piles, the topsoil stays put, and the mulch protects slopes from washing. If you are building, some dirt work is still needed on the footprint after mulching.',
      },
      {
        q: 'How many acres can you mulch in a day?',
        a: 'Anywhere from under an acre in thick saplings on a steep slope to a few acres of light brush on easy ground. The quote includes our time estimate for your property.',
      },
      {
        q: 'Will the mulch hurt my pasture or lawn?',
        a: 'No. A few inches of wood mulch breaks down over a couple of seasons. Grass comes through it, and on slopes it helps hold soil while it does.',
      },
      {
        q: 'Do I need to be there while you mulch?',
        a: 'Only for the walk-through at the start and the end. Once the keeper trees and the boundaries are flagged, we can work while you are away.',
      },
    ],
  },
  {
    kind: 'service',
    slug: 'brush-clearing',
    navLabel: 'Brush clearing',
    service: 'Brush Clearing',
    area: 'Logan, OH',
    description:
      'Brush clearing and overgrowth removal in Logan, OH: fields, fence lines, ditches and invasive brush. Brush cutter or mulcher, your choice. (614) 379-2170.',
    intro:
      'A field that sits a few years around Logan fills in fast with goldenrod, briars, multiflora rose and saplings. We cut it back with a 72-inch heavy-duty brush cutter or the drum mulcher, depending on how thick it is, and get the ground back to where you can mow it, graze it or walk it again.',
    serviceType: 'Brush clearing',
    presetService: 'Overgrowth and brush cutting',
    sections: [
      {
        heading: 'Two machines, two kinds of brush',
        paragraphs: [
          'For grass, weeds, briars and brush up to a couple of inches thick, the Top Cat HDRC 72-inch brush cutter is fast and keeps the cost down. It is an open-front rotary cutter built for overgrowth, and it leaves a rough-mowed finish that you can keep up with a regular bush hog afterward.',
          'Once saplings and small trees are mixed in, the Raytree drum mulcher takes over. It grinds stems up to about 6 to 8 inches and leaves a mulch layer. Plenty of jobs use both: the mulcher for the thick edges and woody patches, the brush cutter for the open middle of the field. We quote whichever mix gets your ground cleared for the least money.',
        ],
      },
      {
        heading: 'Common brush clearing jobs around Logan',
        paragraphs: [],
        bullets: [
          'Overgrown pasture and old hayfields',
          'Fence lines before new fence goes in',
          'Property and survey lines',
          'Road frontage, ditches and driveway edges',
          'Around ponds, barns and outbuildings',
          'Under power lines on private property',
          'Trails and paths on hunting land',
          'Vacant lots in town that have gone wild',
        ],
      },
      {
        heading: 'Invasive brush in southeast Ohio',
        paragraphs: [
          'Autumn olive, multiflora rose, bush honeysuckle, Japanese barberry and tree-of-heaven are all common in Hocking County. They shade out grass, choke fence lines and spread fast on old farm ground. Cutting them back opens the ground right away, but most of them resprout from the root.',
          'The best long-term result usually comes from clearing once, then keeping it mowed or treating the regrowth the next season. Ohio State University Extension and the Ohio Department of Natural Resources both publish good guides on controlling these species. We can tell you what we see on your land and when a follow-up cut makes sense.',
        ],
      },
      {
        heading: 'Getting a field back into use',
        paragraphs: [
          'If you want the field back as pasture or hay, we cut the brush, mulch the woody patches, and can follow with the power rake to knock down clods and roots on any spots you want to reseed. Fence lines can be cleared on the same visit so the new fence goes in straight.',
          'If you just want it open and walkable, a single pass with the brush cutter and the mulcher around the edges is usually enough. Keep it mowed once or twice a year after that and it stays open.',
        ],
      },
      {
        heading: 'Pricing brush clearing',
        paragraphs: [
          'Brush cutting is usually cheaper per acre than full forestry mulching, because the brush cutter covers ground faster. Light overgrowth on open, firm ground can run a few hundred dollars an acre. Thick brush with saplings, or brush on slopes and wet ground, costs more and moves into mulching prices. Every quote lists the terrain and brush ratings, machine time, fuel and delivery separately.',
        ],
      },
      {
        heading: "Road frontage, ditches and lines",
        paragraphs: [
          "Overgrown road frontage hides driveways, blocks sight lines and fills ditches with debris. We clear back from the road edge, cut the ditch banks, and open sight lines at the end of the drive so you can see traffic coming. Work inside the public right-of-way may need the county or township's okay, so we stay on your side of the line unless you have it. We do not clear around energized power lines; utility lines are the utility's job.",
        ],
      },
      {
        heading: "What to do before we arrive",
        paragraphs: [
          "Mark your property lines and anything we should not hit: wells, septic lids, water lines, old wire, metal posts and big rocks hidden in the brush. Move livestock out of the area and keep kids and pets well back while the machine runs, because brush cutters and mulchers can throw debris a long way.",
        ],
      },
      {
        heading: "Keeping it open after the first cut",
        paragraphs: [
          "The first clearing is the hard part. After that, a field stays open with one or two mows a year with a bush hog or our brush cutter. Woody invasives come back from the root for a season or two, so a second cut the next summer, before they get thick again, keeps them in check. Pasture that is grazed and mowed stays open far better than ground that is left alone. We are happy to schedule a follow-up visit when we do the first one.",
        ],
      },
      {
        heading: "Where we clear brush",
        paragraphs: [
          "Most of our brush clearing is in Hocking County: Logan, Rockbridge, Haydenville, Union Furnace, Gore and the hills around the state park. We also work Laurelville and the farm ground toward Pickaway County, Sugar Grove and Lancaster in Fairfield County, Nelsonville and the rest of Athens County, and McArthur in Vinton County. Jobs close to Logan carry the lowest delivery charge.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is the difference between brush clearing and forestry mulching?",
        a: "Brush clearing usually means cutting overgrowth with a rotary brush cutter, which is fast and cheap on grass, briars and small brush. Forestry mulching uses a drum mulcher that grinds saplings and small trees and leaves a mulch layer. Many jobs use both.",
      },
      {
        q: "Can you clear brush on a steep bank?",
        a: "Often, yes, with the track loader. Banks too steep to run safely are left out of the price and we show you where that line is.",
      },
      {
        q: 'How much does brush clearing cost per acre?',
        a: 'Light overgrowth that the brush cutter can handle on easy ground often runs a few hundred dollars an acre. Once saplings are mixed in and the mulcher is needed, it is priced like forestry mulching, roughly $800 to $2,500 an acre depending on terrain and density. Equipment delivery is a separate line. Photos get you a quick ballpark.',
      },
      { q: 'How thick a sapling can you cut?', a: TREE_SIZE },
      {
        q: 'How often does brush need to be cleared?',
        a: 'If you mow it after the first clearing, most fields only need a light cut once or twice a year. Left alone, pasture in this area fills back in within a few seasons.',
      },
      {
        q: 'Can you clear brush along a fence without wrecking the fence?',
        a: 'Yes. If the fence is in good shape we work along it carefully and leave it standing. If it is coming out anyway, tell us and we will clear right through it.',
      },
      {
        q: 'Do you haul the brush away?',
        a: 'Usually there is nothing to haul. The cutter and the mulcher leave it on the ground. If you already have piles of cut brush you want gone, our dump truck can haul them off.',
      },
      {
        q: 'Will the brush grow back?',
        a: 'Grass and weeds come back as grass and weeds, which is the point. Woody invasives like autumn olive resprout from the root, so plan on a follow-up mow or spot treatment the next year.',
      },
    ],
  },
  {
    kind: 'service',
    slug: 'lot-clearing',
    navLabel: 'Lot and homesite clearing',
    service: 'Lot Clearing',
    area: 'Hocking County, OH',
    description:
      'Lot and homesite clearing in Hocking County, OH for houses, cabins, barns and campers. Clearing, stump removal, pad grading and driveway. (614) 379-2170.',
    intro:
      'You bought a wooded lot in Hocking County. Before a house, a cabin, a pole barn or a camper can go on it, somebody has to open it up, get the stumps out where they matter, and give the builder a way in. We do all of that with one machine setup and one crew, from the first tree to the last load of gravel.',
    serviceType: 'Lot clearing',
    presetService: 'Lot and homesite clearing',
    sections: [
      {
        heading: 'What lot clearing includes',
        paragraphs: ['Every lot is different, but a typical homesite job with us covers:'],
        bullets: [
          'Forestry mulching the brush and small trees across the lot',
          'Felling larger trees in the building footprint',
          'Digging stumps out where the house, garage, drive and septic go',
          'Stripping and stockpiling topsoil if you want to reuse it',
          'Rough grading the building pad',
          'Cutting in the driveway and bringing base gravel',
          'Clearing access for the septic soil evaluator and the well driller',
        ],
      },
      {
        heading: 'Planning the clearing around the house',
        paragraphs: [
          "The best homesites in the hills keep as many good trees as possible and clear only what the house actually needs. Before we start, we walk the lot with you and, if you have them, your builder's plans. We stake the footprint, the drive, the septic area and the well, add a working margin, and flag the trees you want to keep. Clearing too much is expensive to undo. Clearing too little means a second trip.",
          "Think about sun and wind too. Opening the south side brings in winter light; leaving a tree line on the north and west breaks the wind. Keep large trees far enough from the house that they cannot reach it if they fall.",
        ],
      },
      {
        heading: 'Cabin and camper lots',
        paragraphs: [
          "Many Hocking County lots are bought for a weekend cabin, a camper or a short-term rental. These usually need less dirt work than a full house. We mulch the brush, clear a level pad, cut in a gravel drive and parking area, and open a path to a fire pit or a view. For rentals, we can come back each year to keep the brush down so the property stays tidy for guests.",
        ],
      },
      {
        heading: 'Steep lots and tight access',
        paragraphs: [
          "Hills, ravines, sandstone ledges and one narrow lane in are normal here. The compact track loader fits on our tilt trailer and gets down most township roads, and it stays stable on slopes that would stop wheeled equipment. If part of your lot is too steep to work safely, we say so, leave it out of the price, and suggest another way to get the result you want.",
        ],
      },
      {
        heading: 'Permits and inspections',
        paragraphs: [
          'Clearing itself rarely needs a permit, but the house, septic system and driveway connection usually do. In Ohio the septic system needs a permit and an approved design through your county health district, and a new drive onto a county or township road usually needs a driveway permit and sometimes a culvert. We work to whatever those plans call for and can clear access for the inspectors.',
        ],
      },
      {
        heading: 'Pricing a lot clearing job',
        paragraphs: [
          'Lot clearing is priced in parts so you can see them: mulching the lot by terrain and brush rating, stump removal and pad work by the hour or by the job, driveway and gravel by length and loads, plus fuel and equipment delivery on their own lines. A small cabin pad might be a one or two day job. A full homesite with a long drive can take a week or more.',
        ],
      },
      {
        heading: "Utilities and the well",
        paragraphs: [
          "Plan where electric, water and internet will come in before clearing. Underground electric often follows the drive, so we can leave a clear corridor beside it. The well driller needs a truck-sized path and a level spot to set up, which we can clear and gravel at the same time as the drive. Before we dig stumps, we call OUPS at 811 as Ohio law requires, so existing buried lines are marked.",
        ],
      },
      {
        heading: "Erosion control on a cleared lot",
        paragraphs: [
          "Bare dirt on a hillside washes fast in a Hocking County thunderstorm. We keep the mulch on the ground everywhere that is not being built on, avoid stripping more than the builder needs, and shape the pad so water drains off it instead of across it. Larger disturbed areas may need silt fence or straw, and we can seed and power-rake finished areas so grass takes hold quickly.",
        ],
      },
      {
        heading: "Where we clear lots",
        paragraphs: [
          "Homesite and cabin lot clearing makes up a big part of our work in the Hocking Hills, around Logan, Rockbridge, Laurelville and South Bloomingville, and in the newer acreage parcels around Sugar Grove and Lancaster. We also clear lots in Nelsonville, Athens County and Vinton County. If you are still deciding between parcels, we can walk a couple of them with you and tell you which will be cheaper to open up.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do you need to call 811 before clearing my lot?",
        a: "For brush mulching on the surface, no. For digging stumps, footers or trenches, yes. Ohio law requires an OUPS 811 call before excavation, and we make that call for the areas we dig.",
      },
      {
        q: 'How much does it cost to clear a lot for a house?',
        a: 'For a typical one-acre wooded homesite, mulching the lot is often in the $800 to $2,500 range depending on terrain and brush, and stump removal, pad grading, the driveway and gravel are added on top. We give a written, itemized quote after walking the lot with you.',
      },
      { q: 'How big a tree can you take down?', a: TREE_SIZE },
      {
        q: 'Should I clear the lot before or after the septic soil test?',
        a: 'Clear access first. The soil evaluator needs to get to the test pits, so we often open a path and the likely septic area early, then finish the rest once the system location is approved.',
      },
      {
        q: 'Can you leave the trees I want to keep?',
        a: 'Yes. We flag keeper trees with you before we start and clear around them.',
      },
      {
        q: 'Do you build the driveway too?',
        a: 'Yes. We cut in the drive, shape it and bring gravel in our own dump truck, so the builder and the concrete truck can get in.',
      },
      {
        q: 'How long does lot clearing take?',
        a: 'A camper or cabin pad might take a day or two. A full house site with stumps, a pad and a long drive can take a week or more, depending on weather and inspections.',
      },
    ],
  },
  {
    kind: 'service',
    slug: 'fence-line-clearing',
    navLabel: 'Fence line clearing',
    service: 'Fence Line Clearing',
    area: 'Logan, OH',
    description:
      'Fence line and property line clearing in Logan, OH and Hocking County. Clear old fence rows, survey lines and new fence paths. (614) 379-2170.',
    intro:
      'Old fence rows in Hocking County turn into hedgerows of multiflora rose, grapevine, locust and cedar that you cannot walk through, let alone build fence in. We clear fence lines and property lines clean and wide enough to work, and we can set the posts too.',
    serviceType: 'Fence line clearing',
    presetService: 'Fence line and property line clearing',
    sections: [
      {
        heading: 'Fence lines we clear',
        paragraphs: [],
        bullets: [
          'Overgrown fence rows before new fence goes in',
          'Old woven wire and barbed wire lines that need to come out',
          'New fence paths through brush or woods',
          'Property lines and survey lines so you can see your boundary',
          'Pasture perimeters for cattle, horses, goats and sheep',
          'Deer fence and garden fence paths',
        ],
      },
      {
        heading: 'How we clear a fence line',
        paragraphs: [
          'Most fence lines need a path about one machine width, roughly 6 to 8 feet, so a fence crew can drive posts and stretch wire. On heavy rows we go wider so the new fence is not shaded and crowded by regrowth. The drum mulcher grinds the brush and small trees in the row, the brush cutter handles the lighter stretches, and the mulch stays on the line.',
          'If the old fence is still standing and in good shape, we clear along it carefully. If it is coming out, tell us first. Old wire wrapped in brush is hard on a mulcher, so we price wire removal separately and pull it before we grind.',
        ],
      },
      {
        heading: 'Know where the line is',
        paragraphs: [
          'We only clear what is yours. If your line is not marked, have it surveyed or at least flagged before we start, especially next to a neighbor, a road or public land like the Wayne National Forest or a state forest. We are glad to look at your survey or the county GIS map with you, but the boundary is yours to confirm.',
        ],
      },
      {
        heading: 'Clear the line and set the posts',
        paragraphs: [
          'After the line is open, we can auger post holes with the Raytree RMA42 auger and drive T-posts or wood posts with the GIYI GY-D680 hydraulic post driver. That saves you a second contractor and a second trip. We set posts; we do not stretch wire or build the finished fence, so you or your fence builder take it from there.',
        ],
      },
      {
        heading: 'Pricing fence line clearing',
        paragraphs: [
          'Fence lines are priced by length and how thick the row is, plus delivery. A light, grassy line goes quickly. A 40-year-old hedgerow with locust and wire buried in it takes much longer. Send photos and the rough length in feet and we can give you a ballpark.',
        ],
      },
      {
        heading: "Why old fence rows get so thick",
        paragraphs: [
          "A fence row is the one strip of a field nobody mows. Birds perch on the wire and drop seeds of multiflora rose, autumn olive, cedar and cherry right underneath it, and in a few years the row becomes a wall of brush with trees growing through the wire. Grapevine and poison ivy climb on top. By the time a new owner wants to fence cattle or horses, the old row can be 20 to 30 feet wide.",
        ],
      },
      {
        heading: "Fencing for livestock in hill country",
        paragraphs: [
          "On slopes, a new fence holds up best when the line is cleared wide enough to keep shade and leaf litter off the wire, and when posts are set below the frost line at corners and braces. Water runs along fence lines on hillsides, so we avoid leaving bare dirt where it can start a gully, and keep the mulch on the line to protect it. If you are fencing for goats or sheep, a cleaner, wider line also makes it harder for brush to reach through and short out electric wire.",
        ],
      },
      {
        heading: "Survey lines and boundary clearing",
        paragraphs: [
          "After a survey, the pins and flags are easy to lose in the brush. Clearing a path along the line makes the boundary visible, makes the next survey cheaper, and settles a lot of neighbor questions. We clear only on your side unless both owners agree in writing.",
        ],
      },
      {
        heading: "Before we clear",
        paragraphs: [
          "Mark your line, show us any gates, water crossings and spots where the old fence has buried wire or metal posts, and let us know where livestock will be. If we will be augering post holes, Ohio law requires an OUPS 811 call before digging, and we handle that for the post locations.",
        ],
      },
      {
        heading: "Where we clear fence lines",
        paragraphs: [
          "We clear fence rows and property lines on farms and acreage across Hocking County, around Laurelville toward the Pickaway County line, in southern Fairfield County around Sugar Grove and Lancaster, and in Athens and Vinton counties. Farm ground on the west side of the county tends to have the longest, oldest rows; hill properties tend to have shorter lines through woods.",
        ],
      },
    ],
    faqs: [
      {
        q: "How long does it take to clear a fence line?",
        a: "A light, grassy line can go at a fast walking pace. An old hedgerow with trees and buried wire can take most of a day for a few hundred feet. We estimate time with the quote.",
      },
      {
        q: 'How much does it cost to clear a fence line?',
        a: 'It depends on length and how overgrown it is. A light line can be cleared quickly for a modest price; an old hedgerow with trees and buried wire costs much more per foot. Send photos and the length and we will give you a written number.',
      },
      {
        q: 'How wide do you clear a fence line?',
        a: 'Usually 6 to 8 feet, one machine width, which is enough for a fence crew. We can go wider on heavy rows to keep regrowth off the new fence.',
      },
      { q: 'Can you clear fence rows with trees in them?', a: TREE_SIZE },
      {
        q: 'Will you pull the old wire out?',
        a: 'We can, priced separately. Old wire tangled in brush has to come out before the mulcher goes through.',
      },
      {
        q: 'Do you also set fence posts?',
        a: 'Yes. We auger holes and drive T-posts and wood posts with a hydraulic post driver. The wire and the finished fence are up to you or your fence builder.',
      },
    ],
  },
];
