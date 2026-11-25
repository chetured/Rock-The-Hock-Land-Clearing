import type { LandingPage } from './types';
import { PER_ACRE_MULCHING } from './pricing';

// Town pages. Each one is written around what is actually different about
// that place, so they are not near-duplicates of one template.

export const TOWN_PAGES: LandingPage[] = [
  {
    kind: 'location',
    slug: 'logan-oh',
    navLabel: 'Logan, OH',
    areaName: 'Logan, Ohio',
    service: 'Land Clearing',
    area: 'Logan, OH',
    description:
      'Land clearing and forestry mulching in Logan, OH from a local, owner-run crew based right here. Brush, lots, driveways, septic. Free estimates: (614) 379-2170.',
    intro:
      'Logan is home base. Our track loader, mulcher, dump truck and trailer are kept here, so jobs in and around town cost less to reach and are easier to fit into the schedule. Call or text and you talk to the owner who runs the machine.',
    presetService: 'Forestry mulching',
    sections: [
      {
        heading: 'Work we do around Logan',
        paragraphs: [
          'Logan is the county seat of Hocking County, and the land around it runs from the flat bottoms along the Hocking River to steep, wooded hollows a few miles out. Most of the calls we get here are wooded lots off the state routes that need a homesite opened, back fields that went to brush, fence lines before new fence goes in, and drives that need cutting in or re-graveling.',
        ],
        bullets: [
          'Forestry mulching and underbrush clearing',
          'Homesite, barn and camper pad clearing',
          'Brush cutting on fields and fence lines',
          'Gravel driveways, grading and seed bed prep',
          'Septic tank installation',
          'Gravel, topsoil and fill dirt delivery',
          'Skid steer and attachment rental',
        ],
      },
      {
        heading: 'In town and out in the hollows',
        paragraphs: [
          'Inside town, jobs tend to be overgrown lots, backyards that got away from the owner and clean-up around garages and outbuildings, where a compact machine and a quick job matter. Out toward Lake Logan, Gore, Union Furnace and Haydenville, it is acreage: hillside lots, ridge-top homesites and old farm fields. The same track loader handles both without tearing up the ground.',
        ],
      },
      {
        heading: 'Why local matters',
        paragraphs: [
          'Being based in Logan keeps equipment delivery low for Hocking County jobs, and it means we can come back for the follow-up mow, a few more loads of gravel or a quick fix without a big trip charge. We know which roads a trailer can get down and which ones turn to mud in March.',
        ],
      },
      {
        heading: 'Nearby areas',
        paragraphs: [
          'From Logan we also cover Rockbridge, Haydenville, Union Furnace, Gore, Carbon Hill, Murray City and the rest of Hocking County, plus Laurelville, Sugar Grove and Nelsonville.',
        ],
      },
    ],
    faqs: [
      { q: 'How much does land clearing cost per acre near Logan?', a: PER_ACRE_MULCHING },
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
    service: 'Land Clearing',
    area: 'Hocking Hills, OH',
    description:
      'Land clearing for cabin lots, views, trails and driveways in the Hocking Hills, OH. Forestry mulching on steep, wooded ground. Free estimate: (614) 379-2170.',
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
          'Yearly brush control so rentals stay tidy for guests',
        ],
      },
      {
        heading: 'Keep the woods that make it worth buying',
        paragraphs: [
          'People come to the Hocking Hills for the trees and the rock. Forestry mulching lets us clear selectively: we take the brush, briars and small stuff and leave the bigger trees you want to keep. We flag the keepers with you before the machine starts.',
        ],
      },
      {
        heading: 'What the best land clearing in the Hocking Hills looks like',
        paragraphs: [
          "Good clearing out here is less about horsepower and more about judgment. The best job leaves the trees you wanted, keeps the hillside from washing, puts the drive where water won't ruin it, and doesn't leave ruts or burn scars behind. That takes a contractor who knows the ground and is on the machine.",
          'Here is what we offer: a local, owner-run crew from Logan, a track loader and mulcher sized for slopes, written quotes that rate the terrain and the brush density, and fuel and delivery listed on their own lines. Compare that against anyone else you are considering.',
        ],
      },
      {
        heading: 'Steep ground, tight access',
        paragraphs: [
          'Sandstone ledges, ravines and narrow township roads are normal here. A compact track loader fits on a trailer that can get down most of them, and it stays stable on slopes that would stop wheeled equipment. Ground that is too steep is left out of the measured area and the price.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Who is the best land clearing company in the Hocking Hills?',
        a: 'The best fit is a local contractor who owns the equipment, works steep wooded ground every week and gives an itemized written quote. Rock The Hock Land Clearing is based in Logan, the county seat of Hocking County, and does forestry mulching, lot clearing, driveways and septic installs across the Hocking Hills. Call or text (614) 379-2170 for a free estimate.',
      },
      { q: 'How much does land clearing cost per acre in the Hocking Hills?', a: PER_ACRE_MULCHING },
      {
        q: 'Can you clear a view without cutting down all the trees?',
        a: 'Yes. We clear the understory and selected small trees and leave the bigger ones. Walk the lot with us and we will flag what stays.',
      },
    ],
  },
  {
    kind: 'location',
    slug: 'rockbridge-oh',
    navLabel: 'Rockbridge, OH',
    areaName: 'Rockbridge, Ohio',
    service: 'Land Clearing',
    area: 'Rockbridge, OH',
    description:
      'Land clearing, forestry mulching and driveway work in Rockbridge, OH along US-33 and the Hocking River. Local crew from Logan. Free estimate: (614) 379-2170.',
    intro:
      'Rockbridge sits along US-33 and the Hocking River between Logan and Lancaster, a few minutes up the road from our yard. The land here mixes river bottoms, steep wooded side hollows and ridge-top lots, often on the same property.',
    presetService: 'Forestry mulching',
    sections: [
      {
        heading: 'Bottoms, hollows and ridges',
        paragraphs: [
          'Down near the river and the US-33 corridor, ground is flatter and wetter, and old fields tend to fill in with brush and willow. Back up the side roads, lots climb fast onto wooded ridges with sandstone outcrops, the same rock that gives the nearby Rock Bridge State Nature Preserve its natural bridge. A property here can need brush cutting in the bottom, mulching on the hillside and a well-drained drive connecting the two.',
        ],
      },
      {
        heading: 'Common Rockbridge jobs',
        paragraphs: [],
        bullets: [
          'Clearing wooded lots for homes and cabins off the side roads',
          'Reclaiming overgrown bottom fields',
          'Driveways that climb from the road to a ridge-top site',
          'Brush clearing along road frontage and ditches',
          'Food plots and trails on hunting ground',
        ],
      },
      {
        heading: 'Wet ground and the river',
        paragraphs: [
          'Bottom ground near the Hocking River stays wet into late spring. We schedule those jobs for dry spells or frozen ground so the tracks do not rut the field. Work right along a stream bank may have extra rules, so we keep a buffer unless you have checked otherwise.',
        ],
      },
    ],
    faqs: [
      { q: 'How much does forestry mulching cost per acre in Rockbridge?', a: PER_ACRE_MULCHING },
      {
        q: 'Is Rockbridge in your service area?',
        a: 'Yes. Rockbridge is just up US-33 from Logan, so delivery stays low.',
      },
    ],
  },
  {
    kind: 'location',
    slug: 'laurelville-oh',
    navLabel: 'Laurelville, OH',
    areaName: 'Laurelville, Ohio',
    service: 'Land Clearing',
    area: 'Laurelville, OH',
    description:
      'Land clearing, brush clearing and forestry mulching in Laurelville, OH on the west side of the Hocking Hills. Farms, cabin lots and fence lines. (614) 379-2170.',
    intro:
      'Laurelville is a small village on the west side of Hocking County, where the Hocking Hills start to give way to the farm country of Pickaway and Ross counties. That mix shows up in the work: cabin lots in the hills on one side, fence lines and pasture on the other.',
    presetService: 'Overgrowth and brush cutting',
    sections: [
      {
        heading: 'Where hills meet farm ground',
        paragraphs: [
          'East of the village, roads wind into the hills toward Hocking Hills State Park and the cabin country around it. West and north, the ground opens into rolling farmland. We clear wooded homesites and views on the hill side, and fence rows, overgrown pasture and field edges on the farm side.',
        ],
        bullets: [
          'Fence row and hedgerow clearing on farm ground',
          'Pasture reclamation for cattle and horses',
          'Cabin and homesite clearing in the hills',
          'Views opened from ridge-top lots',
          'Driveways, gravel and grading',
          'Post holes and fence post driving',
        ],
      },
      {
        heading: 'Fence lines and pasture',
        paragraphs: [
          'Old fence rows around Laurelville tend to be thick with multiflora rose, locust and cedar. We clear them wide enough for a fence crew, can pull old wire first, and can auger holes and drive posts on the same trip. Overgrown pasture gets the brush cutter in the open and the mulcher on the woody edges.',
        ],
      },
    ],
    faqs: [
      { q: 'How much does land clearing cost per acre around Laurelville?', a: PER_ACRE_MULCHING },
      {
        q: 'Do you work near Laurelville and the west side of the Hocking Hills?',
        a: 'Yes, including the roads toward the state park and state forest and the farm country toward Pickaway County.',
      },
    ],
  },
  {
    kind: 'location',
    slug: 'sugar-grove-oh',
    navLabel: 'Sugar Grove, OH',
    areaName: 'Sugar Grove, Ohio',
    service: 'Land Clearing',
    area: 'Sugar Grove, OH',
    description:
      'Land clearing, brush clearing and forestry mulching in Sugar Grove, OH and southern Fairfield County. Acreage, fence lines, driveways. (614) 379-2170.',
    intro:
      'Sugar Grove is a small village in southern Fairfield County, just over the Hocking County line on US-33. It is where the flatter farm country around Lancaster starts climbing into the hills, and a lot of people out here own a few wooded acres behind the house.',
    presetService: 'Forestry mulching',
    sections: [
      {
        heading: 'Acreage behind the house',
        paragraphs: [
          'Most Sugar Grove jobs are on homes with five to twenty acres where the back of the property went to brush and saplings. Owners want it walkable again, want a trail to the back line, or want a pasture for a few animals. Forestry mulching is ideal: no burning near the neighbors, no hauling, and the ground is usable right away.',
        ],
        bullets: [
          'Clearing brush and saplings from the back acreage',
          'Walking and ATV trails to the back line',
          'Fence line clearing and new fence post work',
          'Small pasture reclamation',
          'Gravel driveway re-dresses and parking pads',
        ],
      },
      {
        heading: 'Steeper ground toward the Hocking line',
        paragraphs: [
          'Back toward the Clear Creek valley and Rockbridge, the ground gets steep, shaded and wet in places, with sandstone close to the surface. On properties in that country we take care on slopes, leave stream buffers, and leave out ground too steep to run.',
        ],
      },
    ],
    faqs: [
      { q: 'How much does forestry mulching cost per acre near Sugar Grove?', a: PER_ACRE_MULCHING },
      {
        q: 'Do you serve Sugar Grove and Berne Township?',
        a: 'Yes. Sugar Grove is a short trip from Logan on US-33.',
      },
    ],
  },
  {
    kind: 'location',
    slug: 'nelsonville-oh',
    navLabel: 'Nelsonville, OH',
    areaName: 'Nelsonville, Ohio',
    service: 'Land Clearing',
    area: 'Nelsonville, OH',
    description:
      'Land clearing, forestry mulching and brush clearing in Nelsonville, OH, Buchtel and the Athens-Hocking line next to the Wayne National Forest. (614) 379-2170.',
    intro:
      'Nelsonville sits on the Hocking-Athens county line, about 20 minutes down US-33 from our yard in Logan. We clear lots, fields and fence lines in town and out toward Buchtel, Haydenville and Murray City.',
    presetService: 'Overgrowth and brush cutting',
    sections: [
      {
        heading: 'Old mine and farm ground grown back in',
        paragraphs: [
          'A lot of the land around Nelsonville was mined or farmed long ago and has grown back thick with autumn olive, multiflora rose, briars and young trees. Some of it sits right next to the Wayne National Forest. Brush cutting and forestry mulching are a good fit for getting that ground usable again without stirring up the poor, rocky soil underneath.',
        ],
        bullets: [
          'Reclaiming overgrown lots and old fields',
          'Clearing along property lines next to public land',
          'Opening space for homes, garages and campers',
          'Driveways, grading and gravel delivery',
        ],
      },
      {
        heading: 'Know your lines next to the national forest',
        paragraphs: [
          "Where private land borders national forest or other public ground, we only clear what is yours. If the line isn't marked, we ask you to have it marked or surveyed before we start.",
        ],
      },
      {
        heading: 'In town',
        paragraphs: [
          'Inside Nelsonville, jobs are usually overgrown lots and backyards. The track loader is compact enough for most residential lots and leaves less damage than a wheeled machine.',
        ],
      },
    ],
    faqs: [
      { q: 'How much does land clearing cost per acre around Nelsonville?', a: PER_ACRE_MULCHING },
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
    service: 'Land Clearing',
    area: 'Lancaster, OH',
    description:
      'Forestry mulching, brush clearing, fence line clearing and gravel driveways in Lancaster and Fairfield County, OH. Free estimate: (614) 379-2170.',
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
          'Around Lancaster, Carroll and Baltimore a lot of jobs are within sight of the neighbors and the subdivision next door. Forestry mulching leaves no smoke, no brush piles and no ruts, and we clean up the road and the drive before we leave.',
        ],
      },
      {
        heading: 'New construction on the edge of town',
        paragraphs: [
          'As Lancaster grows, more people are building on wooded or overgrown parcels at the edge of town. We clear the building site, pull stumps where the foundation goes, cut in the drive and power-rake the yard for seed when the house is done.',
        ],
      },
    ],
    faqs: [
      { q: 'How much does land clearing cost per acre around Lancaster?', a: PER_ACRE_MULCHING },
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
    service: 'Land Clearing',
    area: 'Athens, OH',
    description:
      'Land clearing, forestry mulching and brush removal in Athens and Athens County, OH on steep, wooded ground. Free estimate: (614) 379-2170.',
    intro:
      'We bring the track loader and mulcher down US-33 to Athens, The Plains, Albany and the rest of Athens County. Hillside homesites, small farms, overgrown fields and wooded acreage make up most of the work down here.',
    presetService: 'Forestry mulching',
    sections: [
      {
        heading: 'Hillside lots and small farms',
        paragraphs: [
          'Athens County land is mostly steep and wooded, with old fields that have gone back to brush. A lot of owners here want to grow food, keep animals or build small, so the goal is usually to open ground while keeping the topsoil in place. Forestry mulching does exactly that on slopes.',
        ],
        bullets: [
          'Homesite and small farm clearing',
          'Garden, orchard and pasture ground reclaimed from brush',
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
      { q: 'How much does land clearing cost per acre in Athens County?', a: PER_ACRE_MULCHING },
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
    service: 'Land Clearing',
    area: 'McArthur, OH',
    description:
      'Forestry mulching, food plots, hunting lanes and land clearing in McArthur and Vinton County, OH. Free estimate: (614) 379-2170.',
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
      { q: 'How much does it cost to clear a food plot in Vinton County?', a: PER_ACRE_MULCHING },
      {
        q: 'How big should a food plot be?',
        a: 'It depends on deer numbers and what you plant. Many hunters in this area run plots from a quarter acre to a couple of acres. We can lay out a few options when we walk the land.',
      },
    ],
  },
];
