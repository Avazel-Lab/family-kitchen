import type { Recipe } from '../../types'

export const lentilSpaghettiBolognese: Recipe = {
  id: 'lentil-spaghetti-bolognese',
  title: 'Lentil-Boosted Spaghetti Bolognese',
  summary: 'A rich beef bolognese bulked out with lentils and served with wholemeal spaghetti.',
  category: 'Beef',
  season: 'all-year',
  tags: ['batch cook', 'freezer', 'lentils', 'wholemeal pasta', 'pressure cooker option'],
  prepMinutes: 25,
  cookMinutes: 45,
  makes: 'About 6 adult portions of sauce',
  householdUse: 'For 2 adults + toddler, use roughly half the sauce with about 200 g dry wholemeal spaghetti (80 g per adult + 40 g for the toddler) and freeze the remaining sauce. For 2 adults, use roughly a third of the sauce with about 160 g dry spaghetti.',
  freezer: 'Excellent. Freeze the sauce only; cook fresh spaghetti when needed.',
  equipment: ['Large saucepan or casserole', 'Pressure cooker optional'],
  packNotes: [
    'Uses one full 500 g pack of beef mince and one full 400 g tin of lentils.',
    'Wholemeal spaghetti keeps well in the cupboard, so cook only what the household needs.',
    'Carrots keep well and can also be used in stew.'
  ],
  ingredients: [
    '500 g beef mince, 5% or 12% fat',
    '1 large onion, finely diced',
    '2 carrots, finely diced or grated',
    '4 garlic cloves, finely chopped',
    '2 tbsp tomato purée',
    '2 x 400 g tins chopped tomatoes',
    '1 x 400 g tin green or brown lentils, drained and rinsed',
    '200 ml water or low-salt beef stock',
    '2 tsp dried oregano',
    '1 tsp dried basil',
    '1 tbsp Worcestershire sauce',
    'Wholemeal spaghetti: 80 g dry per adult and 40 g dry per toddler'
  ],
  quickSteps: [
    'Brown the beef thoroughly.',
    'Add onion and carrots; cook until softened.',
    'Add garlic, tomato purée and herbs.',
    'Add tomatoes, lentils, stock/water and Worcestershire sauce.',
    'Simmer 30–40 minutes until rich and thick.',
    'Cook 80 g wholemeal spaghetti per adult and 40 g per toddler; serve with the sauce.'
  ],
  method: [
    'Brown the mince in a large pan over medium-high heat, breaking it up well and allowing it to take on some colour.',
    'Add the onion and carrots and cook for 6–8 minutes until softened.',
    'Add the garlic, tomato purée, oregano and basil and cook for 1–2 minutes.',
    'Add the chopped tomatoes, drained lentils, stock or water and Worcestershire sauce.',
    'Simmer gently for 30–40 minutes until rich and thick, stirring occasionally and adding a splash of water if it catches.',
    'Cook wholemeal spaghetti according to the packet, using about 80 g dry per adult and 40 g per toddler, then drain and serve with the sauce.'
  ],
  variations: [
    {
      title: 'Pressure cooker',
      steps: [
        'Use sauté mode to brown the beef thoroughly.',
        'Add the onion and carrots and cook until beginning to soften.',
        'Add the garlic, tomato purée, oregano and basil and cook for about 1 minute.',
        'Add the stock/water and scrape the base thoroughly so nothing is stuck.',
        'Stir in the lentils and Worcestershire sauce, then pour the chopped tomatoes over the top.',
        'Cook at high pressure for 10 minutes and allow a 10-minute natural release before releasing the remaining pressure.',
        'Switch back to sauté and reduce briefly if the sauce needs thickening.',
        'Cook the wholemeal spaghetti separately and serve.'
      ]
    },
    {
      title: 'Dried lentils',
      steps: [
        'Replace the tin of lentils with about 100 g dried green or brown lentils.',
        'Cook them separately in unsalted water until tender, usually around 20–30 minutes depending on the type; follow the packet instructions.',
        'Drain thoroughly.',
        'Add the cooked lentils to the sauce at the same point as the tinned lentils.'
      ]
    }
  ]
}
