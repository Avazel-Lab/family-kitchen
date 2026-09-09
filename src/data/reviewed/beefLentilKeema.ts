import type { Recipe } from '../../types'

export const beefLentilKeema: Recipe = {
  id: 'beef-lentil-keema',
  title: 'Beef & Lentil Keema',
  summary: 'A well-spiced but family-friendly beef keema bulked with lentils and finished with peas.',
  category: 'Beef',
  season: 'all-year',
  tags: ['lentils', 'batch cook', 'freezer', 'frozen veg', 'pressure cooker option'],
  prepMinutes: 20,
  cookMinutes: 30,
  makes: 'About 6 adult portions',
  householdUse: 'For 2 adults + toddler, serve roughly half with rice or flatbreads and yoghurt, then chill or freeze the remainder. For 2 adults, use roughly a third and keep the rest for lunches/freezer.',
  freezer: 'Excellent. Freeze without rice, flatbreads or yoghurt.',
  equipment: ['Large frying pan or saucepan', 'Pressure cooker optional'],
  packNotes: [
    'Uses one full 500 g pack of 5% or 12% beef mince and one full 400 g tin of lentils.',
    'Frozen peas are added straight from the freezer.',
    'Spices are dry-store ingredients, so use the full flavour profile without simplifying it around pack sizes.'
  ],
  ingredients: [
    '500 g beef mince, 5% or 12% fat',
    '1 large onion, diced',
    '2 garlic cloves, finely chopped',
    '20 g / about 1 tbsp ginger purée',
    '1 tbsp garam masala',
    '2 tsp ground cumin',
    '2 tsp ground coriander',
    '1 tsp turmeric',
    '2 tsp mild curry powder',
    '1 tbsp tomato purée',
    '1 x 400 g tin chopped tomatoes',
    '1 x 400 g tin green or brown lentils, drained and rinsed',
    '200 g frozen peas',
    '100 ml water',
    'Rice or flatbreads and natural yoghurt, to serve'
  ],
  quickSteps: [
    'Brown beef well; add onion and soften.',
    'Add garlic, ginger purée, spices and tomato purée; cook for 1–2 minutes.',
    'Add tomatoes, lentils and water.',
    'Simmer about 20 minutes until thick and rich.',
    'Add frozen peas for the final 5 minutes.',
    'Taste and serve with rice or flatbreads and yoghurt.'
  ],
  method: [
    'Heat a large frying pan or saucepan over medium-high heat. Brown the beef well, breaking it up and allowing it to take on some colour.',
    'Add the onion and cook for about 5 minutes until softened.',
    'Add the garlic, ginger purée, garam masala, cumin, coriander, turmeric, mild curry powder and tomato purée. Cook for 1–2 minutes, stirring, until fragrant.',
    'Add the chopped tomatoes, drained lentils and water. Bring to a simmer.',
    'Simmer for about 20 minutes, stirring occasionally, until thickened and the lentils have softened into the sauce.',
    'Stir in the frozen peas and cook for another 5 minutes. Taste and adjust seasoning before serving with rice or flatbreads and yoghurt.'
  ],
  variations: [
    {
      title: 'Pressure cooker',
      steps: [
        'Use sauté mode to brown the beef well, then add the onion and cook until beginning to soften.',
        'Add the garlic, ginger purée, garam masala, cumin, coriander, turmeric, mild curry powder and tomato purée; cook for 1 minute.',
        'Add the water and scrape the base thoroughly so nothing is stuck.',
        'Add the drained lentils, then pour the chopped tomatoes over the top.',
        'Cook at high pressure for 5 minutes.',
        'Allow a 5-minute natural release, then release the remaining pressure.',
        'Switch back to sauté, stir in the frozen peas and cook for 3–5 minutes until hot and thickened.',
        'Taste and serve with rice or flatbreads and yoghurt.'
      ]
    },
    {
      title: 'Dried lentils',
      steps: [
        'Replace the tin with about 100 g dried green or brown lentils.',
        'Cook them separately in water until tender, usually around 20–30 minutes depending on type.',
        'Drain, then use in place of the tinned lentils.',
        'Follow the packet instructions if the lentils specify a different cooking method.'
      ]
    }
  ],
  familyNotes: [
    'The shared dish is aromatic rather than hot; adults can add chilli oil, fresh chilli or pickle at the table if wanted.'
  ]
}
