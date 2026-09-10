import type { Recipe } from '../../types'

export const tunaWholemealPastaBake: Recipe = {
  id: 'tuna-wholemeal-pasta-bake',
  title: 'Tuna Wholemeal Pasta Bake',
  summary: 'An oven-only tuna pasta bake using store-cupboard pasta, tinned tuna and frozen vegetables.',
  category: 'Fish',
  season: 'all-year',
  tags: ['fish', 'wholemeal pasta', 'frozen veg', 'store cupboard', 'oven only'],
  prepMinutes: 15,
  cookMinutes: 45,
  makes: 'About 4 adult portions',
  basePortions: 4,
  householdUse: 'For 2 adults + toddler, serve most of the dish and keep any remainder for lunch. For 2 adults, expect roughly half to two-thirds of the bake depending on appetite.',
  freezer: 'Good. Cool fully, portion and freeze. Reheat thoroughly.',
  equipment: ['Large ovenproof baking dish with lid or foil'],
  packNotes: [
    'Uses 200 g dry wholemeal pasta; the rest of the bag keeps well in the cupboard.',
    'Uses both 145 g tins of tuna, giving a fish-rich rather than pasta-heavy bake.',
    'Frozen sweetcorn and peas cook in the same dish with no separate vegetable pan.'
  ],
  ingredients: [
    { id: 'wholemeal-pasta', name: 'dry wholemeal pasta shapes', quantity: 200, unit: 'g' },
    { id: 'tinned-tuna', name: 'tuna', quantity: 290, unit: 'g', note: 'drain before using', purchaseUnit: { label: 'tin', quantity: 145, unit: 'g' } },
    { id: 'chopped-tomatoes', name: 'chopped tomatoes', quantity: 400, unit: 'g', purchaseUnit: { label: 'tin', quantity: 400, unit: 'g' } },
    { id: 'vegetable-stock-or-water', name: 'boiling water or low-salt vegetable stock', quantity: 300, unit: 'ml', note: 'plus a little extra if needed' },
    { id: 'frozen-sweetcorn', name: 'frozen sweetcorn', quantity: 150, unit: 'g' },
    { id: 'frozen-peas', name: 'frozen peas', quantity: 100, unit: 'g' },
    { id: 'cheddar', name: 'grated cheddar', quantity: 100, unit: 'g' },
    { id: 'tuna-bake-seasoning', name: 'Herbs, spices and black pepper as desired' }
  ],
  quickSteps: [
    'Heat oven to 200°C fan.',
    'Mix dry pasta, tomatoes, boiling water/stock and frozen sweetcorn in a baking dish; cover tightly.',
    'Bake 20 minutes, then stir thoroughly.',
    'Stir in tuna, frozen peas and chosen herbs/spices; add a splash more boiling water if needed.',
    'Cover and bake another 10–15 minutes until pasta is nearly tender.',
    'Top with cheese and bake uncovered for 8–10 minutes until bubbling and browned.'
  ],
  method: [
    'Heat the oven to 200°C fan.',
    'Put the dry wholemeal pasta, chopped tomatoes, measured boiling water or stock and frozen sweetcorn into a large ovenproof baking dish. Stir well so the pasta is mostly submerged, then cover tightly with a lid or foil.',
    'Bake for 20 minutes.',
    'Remove carefully and stir thoroughly, especially around the edges and bottom. Stir in the drained tuna, frozen peas and any herbs or spices you want. If the pasta has absorbed most of the liquid but is still firm, add a little more boiling water.',
    'Cover again and bake for another 10–15 minutes, until the pasta is almost tender. Wholemeal pasta varies, so check rather than relying only on the clock.',
    'Stir once more, scatter over the cheese and bake uncovered for 8–10 minutes, until bubbling and the pasta is tender.',
    'Leave to stand for 5 minutes before serving so the sauce thickens slightly.'
  ],
  variations: [
    {
      title: 'Béchamel version',
      ingredients: [
        { id: 'butter', name: 'butter', quantity: 25, unit: 'g' },
        { id: 'plain-flour', name: 'plain flour', quantity: 25, unit: 'g' },
        { id: 'milk', name: 'milk', quantity: 300, unit: 'ml' }
      ],
      steps: [
        'Use roughly two-thirds of the scaled boiling water or stock quantity with the tomatoes at the start.',
        'While the pasta begins baking, melt the measured butter in a small saucepan, stir in the measured plain flour and cook for about 1 minute.',
        'Gradually whisk in the measured milk and simmer gently until smooth and lightly thickened.',
        'At the 20-minute stir, add the tuna, peas and béchamel to the pasta. Stir thoroughly.',
        'Cover and continue baking for 10–15 minutes, adding a small splash of boiling water only if the pasta still looks too dry.',
        'Top with cheese and finish uncovered for 8–10 minutes.'
      ]
    },
    {
      title: 'Different frozen veg',
      text: 'Frozen broccoli or cauliflower can replace some or all of the sweetcorn. Add larger florets at the start so they have enough time to cook.'
    }
  ],
  familyNotes: [
    'Seasoning is intentionally flexible: oregano, parsley, paprika, garlic, chilli or other favourites can all work depending on the flavour you want that day.'
  ]
}
