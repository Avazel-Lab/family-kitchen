import type { Recipe } from '../../types'

export const beefMixedBeanChilli: Recipe = {
  id: 'beef-mixed-bean-chilli',
  title: 'Beef & Mixed Bean Chilli',
  summary: 'A deeply flavoured but family-friendly beef chilli with mixed beans and frozen sweetcorn.',
  category: 'Beef',
  season: 'all-year',
  tags: ['batch cook', 'freezer', 'beans', 'rice', 'pressure cooker option'],
  prepMinutes: 25,
  cookMinutes: 45,
  makes: 'About 6 adult portions',
  basePortions: 6,
  householdUse: 'For 2 adults + toddler, serve roughly half the batch with rice and sour cream, then chill or freeze the rest. For 2 adults, use about a third of the batch. Also works well with jacket potatoes or in wraps.',
  freezer: 'Excellent. Freeze the chilli without rice or sour cream for up to 3 months.',
  equipment: ['Large saucepan or casserole', 'Pressure cooker optional'],
  packNotes: [
    'Uses one full 500 g pack of 5% or 12% fat beef mince.',
    'Uses two full 400 g tins of mixed beans and two full 400 g tins of tomatoes.',
    'Frozen sweetcorn means no fresh remainder to use up.',
    'A 150 ml pot of sour cream is enough for normal dollops across the batch; use a 300 ml pot if you want it generously or across two meals.'
  ],
  ingredients: [
    { id: 'beef-mince', name: 'beef mince', quantity: 500, unit: 'g', note: '5% or 12% fat' },
    { id: 'onion', name: 'large onion', pluralName: 'large onions', quantity: 1, unit: 'count', note: 'diced' },
    { id: 'pepper', name: 'pepper', pluralName: 'peppers', quantity: 2, unit: 'count', note: 'diced' },
    { id: 'garlic', name: 'garlic clove', pluralName: 'garlic cloves', quantity: 4, unit: 'count', note: 'finely chopped', alternatives: [{ id: 'garlic-puree', name: 'garlic purée', quantity: 4, unit: 'tsp' }] },
    { id: 'ground-cumin', name: 'ground cumin', quantity: 1, unit: 'tbsp' },
    { id: 'dried-oregano', name: 'dried oregano', quantity: 1, unit: 'tbsp' },
    { id: 'smoked-paprika', name: 'smoked paprika', quantity: 2, unit: 'tsp' },
    { id: 'ground-coriander', name: 'ground coriander', quantity: 1, unit: 'tsp' },
    { id: 'mild-chilli-powder', name: 'mild chilli powder', quantity: 2, unit: 'tsp' },
    { id: 'tomato-puree', name: 'tomato purée', quantity: 2, unit: 'tbsp' },
    { id: 'worcestershire-sauce', name: 'Worcestershire sauce', quantity: 1, unit: 'tbsp' },
    { id: 'chopped-tomatoes', name: 'chopped tomatoes', quantity: 800, unit: 'g', purchaseUnit: { label: 'tin', quantity: 400, unit: 'g' } },
    { id: 'mixed-beans', name: 'mixed beans', quantity: 800, unit: 'g', note: 'drained and rinsed', purchaseUnit: { label: 'tin', quantity: 400, unit: 'g' } },
    { id: 'frozen-sweetcorn', name: 'frozen sweetcorn', quantity: 150, unit: 'g' },
    { id: 'beef-stock-or-water', name: 'beef stock or water', quantity: 150, unit: 'ml' },
    { id: 'sour-cream', name: 'sour cream', quantity: 150, unit: 'ml', note: 'to serve' },
    { id: 'cooking-oil', name: 'olive or rapeseed oil', quantity: 1, unit: 'tbsp', note: 'if needed' },
    { id: 'chilli-serving-carb', name: 'Rice, jacket potatoes or wraps, to serve' }
  ],
  quickSteps: [
    'Brown the beef well; add onion and peppers and soften.',
    'Add garlic, cumin, oregano, paprika, coriander, chilli and tomato purée; cook for 1–2 minutes.',
    'Add Worcestershire sauce, tomatoes and stock/water.',
    'Simmer 20–25 minutes until rich and reduced.',
    'Stir in beans for 8–10 minutes; add sweetcorn for the final 5 minutes.',
    'Taste, adjust seasoning and serve with rice plus sour cream.'
  ],
  method: [
    'Heat a large pan over medium-high heat. Brown the mince thoroughly, letting it take on some colour rather than simply turning grey. Use a little oil if needed, especially with 5% mince.',
    'Add the onion and peppers and cook for 5–7 minutes until softened and beginning to colour.',
    'Add the garlic, cumin, oregano, smoked paprika, coriander, chilli powder and tomato purée. Cook, stirring, for 1–2 minutes so the spices toast and the tomato purée darkens slightly.',
    'Stir in the Worcestershire sauce, then add the chopped tomatoes and stock or water. Bring to a simmer.',
    'Simmer uncovered or partly covered for 20–25 minutes, stirring occasionally, until the sauce is rich and starting to thicken.',
    'Stir in the drained mixed beans and cook for another 8–10 minutes. Add the frozen sweetcorn for the final 5 minutes.',
    'Taste and adjust seasoning. Serve with rice and a spoonful of sour cream; jacket potatoes or wraps also work well.'
  ],
  variations: [
    {
      title: 'Pressure cooker',
      steps: [
        'Use sauté mode to brown the beef well, then add the onion and peppers and cook until beginning to soften.',
        'Add the garlic, cumin, oregano, smoked paprika, coriander, chilli powder and tomato purée; cook for 1 minute.',
        'Stir in the Worcestershire sauce, then add the stock/water and scrape the base thoroughly so nothing is stuck.',
        'Pour the chopped tomatoes over the top and do not stir them down into the base.',
        'Cook at high pressure for 20 minutes.',
        'Allow a 10-minute natural release, then release the remaining pressure.',
        'Switch back to sauté, stir in the drained beans and frozen sweetcorn, and cook for 5–8 minutes until piping hot and thickened.',
        'Taste, adjust seasoning and serve with rice and sour cream.'
      ]
    },
    {
      title: 'Dried beans',
      ingredients: [
        { id: 'dried-mixed-beans', name: 'dried mixed beans', quantity: 250, unit: 'g', note: 'use instead of the tinned mixed beans' }
      ],
      steps: [
        'Soak the dried beans overnight in plenty of cold water, unless the packet specifically says soaking is unnecessary.',
        'Drain, cover with fresh water and cook until completely tender according to the packet instructions.',
        'Drain the cooked beans, then add them to the chilli at the same point as the tinned beans.',
        'Do not rely on the chilli cooking time to cook dried beans from raw.'
      ]
    }
  ],
  familyNotes: [
    'The base is strongly flavoured but uses mild chilli powder; add hot sauce, jalapeños or chilli flakes to adult portions at the table if wanted.',
    'Sour cream softens the spice and works particularly well for the toddler portion.'
  ]
}
