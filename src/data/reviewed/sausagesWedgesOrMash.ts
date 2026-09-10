import type { Recipe } from '../../types'

export const sausagesWedgesOrMash: Recipe = {
  id: 'sausages-wedges-or-mash',
  title: 'Sausages with Wedges or Mash',
  summary: 'A dependable family dinner using the two-drawer air fryer, with flexible potatoes and microwave frozen veg.',
  category: 'Pork',
  season: 'all-year',
  tags: ['air fryer', 'two drawer', 'potatoes', 'quick', 'frozen veg'],
  prepMinutes: 15,
  cookMinutes: 30,
  makes: '8 sausages / about 4 adult portions',
  basePortions: 4,
  householdUse: 'For 2 adults + toddler, serve roughly 4–5 sausages with wedges or mash and microwave frozen veg; chill the remaining sausages for lunch or another meal. For 2 adults, roughly 4 sausages is a sensible starting point, leaving four for another meal.',
  freezer: 'Cooked sausages freeze well. Wedges and mash are better made fresh.',
  equipment: ['Two-drawer air fryer or saucepan', 'Microwave'],
  packNotes: [
    'Uses one standard 8-sausage pack, with leftovers intentionally used for another meal or lunch.',
    'Frozen peas, broccoli or sweetcorn can be portioned straight from the freezer.',
    'Potatoes keep well, so there is no need to force an exact bag size into one meal.'
  ],
  ingredients: [
    { id: 'sausages', name: 'sausage', pluralName: 'sausages', quantity: 8, unit: 'count' },
    { id: 'potatoes', name: 'potatoes', quantity: 800, unit: 'g' },
    { id: 'frozen-green-veg', name: 'frozen peas, broccoli or sweetcorn', quantity: 250, unit: 'g' },
    { id: 'cooking-oil', name: 'olive or rapeseed oil', quantity: 1, unit: 'tbsp', note: 'if making wedges' },
    { id: 'wedge-seasoning', name: 'Herbs, spices and seasoning as desired if making wedges' },
    { id: 'mash-extras', name: 'Milk and a small knob of butter if making mash, optional' },
    { id: 'onion-gravy', name: 'Onion gravy, optional' }
  ],
  quickSteps: [
    'Wedges: cut potatoes, toss with oil and whatever herbs/spices/seasoning you want.',
    'Drawer 1: wedges at 200°C for 25–30 minutes; shake twice.',
    'Drawer 2: sausages at 190°C for 12–16 minutes; turn once.',
    'Microwave peas, broccoli or sweetcorn near the end.',
    'Or boil the potatoes and mash instead of making wedges.',
    'Serve with gravy if wanted.'
  ],
  method: [
    'For wedges, cut the potatoes into even wedges, toss with oil and season however you like, then air fry in drawer 1 at 200°C for 25–30 minutes, shaking twice.',
    'Air fry the sausages in drawer 2 at 190°C for 12–16 minutes, turning halfway. Check they are cooked through.',
    'Microwave your choice of frozen peas, broccoli or sweetcorn according to the packet instructions just before serving.',
    'For mash instead, peel the potatoes if desired, cut into even chunks, boil until tender, drain well and mash with a little milk and butter if using.',
    'Serve as-is or with onion gravy.'
  ],
  variations: [
    {
      title: 'Season the wedges differently',
      text: 'Use whatever suits the meal: garlic granules, paprika, rosemary, thyme, Cajun-style seasoning or another favourite blend all work well.'
    }
  ]
}
