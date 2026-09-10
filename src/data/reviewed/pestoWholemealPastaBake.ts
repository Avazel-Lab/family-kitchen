import type { Recipe } from '../../types'

export const pestoWholemealPastaBake: Recipe = {
  id: 'pesto-wholemeal-pasta-bake',
  title: 'Pesto Wholemeal Pasta Bake',
  summary: 'An oven-only wholemeal pasta bake with pesto, tomatoes and frozen vegetables; no separate pasta pan needed.',
  category: 'Pasta',
  season: 'all-year',
  tags: ['wholemeal pasta', 'frozen veg', 'vegetarian', 'oven only', 'one dish'],
  prepMinutes: 20,
  cookMinutes: 45,
  makes: 'About 4 adult portions',
  basePortions: 4,
  householdUse: 'For 2 adults + toddler, serve most of the bake and keep any remainder for lunch. For 2 adults, expect roughly half to two-thirds of the dish depending on appetite.',
  freezer: 'Good. Cool completely, portion and freeze. Reheat thoroughly.',
  equipment: ['Large ovenproof baking dish with lid or foil'],
  packNotes: [
    'Uses about 225 g dry wholemeal pasta; there is no reason to force a full 500 g bag into one meal because dry pasta keeps well.',
    'Uses about half a standard 190 g pesto jar; refrigerate or freeze the remainder for another meal.',
    'Frozen broccoli and peas cook with the pasta, avoiding an extra pan and fresh-veg waste.'
  ],
  ingredients: [
    { id: 'wholemeal-pasta', name: 'dry wholemeal penne, fusilli or similar', quantity: 225, unit: 'g' },
    { id: 'chopped-tomatoes', name: 'chopped tomatoes', quantity: 400, unit: 'g', purchaseUnit: { label: 'tin', quantity: 400, unit: 'g' } },
    { id: 'vegetable-stock-or-water', name: 'boiling water or low-salt vegetable stock', quantity: 350, unit: 'ml', note: 'plus a little extra if needed' },
    { id: 'frozen-broccoli', name: 'frozen broccoli florets', quantity: 150, unit: 'g', note: 'cut smaller if very large' },
    { id: 'frozen-peas', name: 'frozen peas', quantity: 100, unit: 'g' },
    { id: 'pesto', name: 'pesto', quantity: 100, unit: 'g', purchaseUnit: { label: 'jar', quantity: 190, unit: 'g' } },
    { id: 'cheese', name: 'grated cheddar or mozzarella', quantity: 100, unit: 'g' },
    { id: 'black-pepper', name: 'Black pepper' }
  ],
  quickSteps: [
    'Heat oven to 200°C fan.',
    'Mix dry pasta, tomatoes, boiling water/stock and frozen broccoli in a baking dish; cover tightly.',
    'Bake 20 minutes, then stir thoroughly.',
    'Stir in pesto and frozen peas; add a splash more boiling water if the pasta looks dry.',
    'Cover and bake another 10–15 minutes until pasta is nearly tender.',
    'Top with cheese and bake uncovered for 8–10 minutes until bubbling and browned.'
  ],
  method: [
    'Heat the oven to 200°C fan.',
    'Put the dry wholemeal pasta, chopped tomatoes, measured boiling water or stock and frozen broccoli into a large ovenproof baking dish. Stir well so the pasta is mostly submerged, then cover tightly with a lid or foil.',
    'Bake for 20 minutes.',
    'Remove carefully and stir thoroughly, especially around the edges and bottom where pasta can stick. Stir in the pesto and frozen peas. If the pasta has absorbed most of the liquid but is still firm, add a little more boiling water.',
    'Cover again and bake for another 10–15 minutes, until the pasta is almost tender. Wholemeal pasta varies, so check rather than relying only on the clock.',
    'Stir once more, scatter over the cheese and return to the oven uncovered for 8–10 minutes, until the cheese is bubbling and the pasta is tender.',
    'Leave to stand for 5 minutes before serving; the sauce will thicken slightly as it rests.'
  ],
  variations: [
    {
      title: 'Add chicken',
      text: 'Stir through cooked chopped chicken at the mid-bake stir, alongside the pesto and peas.'
    },
    {
      title: 'Different frozen veg',
      text: 'Frozen cauliflower can replace the broccoli. Frozen spinach is best stirred in at the mid-bake stage with the pesto and peas.'
    }
  ],
  familyNotes: [
    'Seasoning can stay simple because pesto varies a lot in salt, garlic and herb strength; taste before adding anything extra.'
  ]
}
