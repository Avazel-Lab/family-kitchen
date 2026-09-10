import type { Recipe } from '../../types'

export const greekChickenPotatoes: Recipe = {
  id: 'greek-chicken-potatoes',
  title: 'Greek Chicken & Potatoes',
  summary: 'Lemon, garlic and oregano chicken with crisp potatoes and easy frozen greens.',
  category: 'Chicken',
  season: 'all-year',
  tags: ['air fryer', 'two drawer', 'potatoes', 'frozen veg'],
  prepMinutes: 20,
  cookMinutes: 30,
  makes: 'About 5 adult portions',
  basePortions: 5,
  householdUse: 'For 2 adults + toddler, use roughly half the chicken with potatoes and microwave broccoli or peas, then chill the remaining chicken for lunch or another meal. For 2 adults, use roughly two-fifths of the batch.',
  freezer: 'Chicken freezes well after cooking. Potatoes are better fresh.',
  equipment: ['Two-drawer air fryer or oven', 'Microwave for frozen veg'],
  packNotes: [
    'Uses one full 600 g pack of chicken thigh fillets.',
    'Frozen broccoli or peas keep the side simple with no fresh remainder.',
    'One whole lemon is used between zest, juice and serving.'
  ],
  ingredients: [
    { id: 'chicken-thigh-fillets', name: 'boneless skinless chicken thigh fillets', quantity: 600, unit: 'g' },
    { id: 'potatoes', name: 'potatoes', quantity: 800, unit: 'g', note: 'cut into wedges or chunks' },
    { id: 'lemon', name: 'lemon', pluralName: 'lemons', quantity: 1, unit: 'count', note: 'zested and juiced' },
    { id: 'garlic', name: 'garlic clove', pluralName: 'garlic cloves', quantity: 4, unit: 'count', note: 'crushed', alternatives: [{ id: 'garlic-puree', name: 'garlic purée', quantity: 4, unit: 'tsp' }] },
    { id: 'dried-oregano', name: 'dried oregano', quantity: 1, unit: 'tbsp' },
    { id: 'paprika', name: 'paprika', quantity: 2, unit: 'tsp' },
    { id: 'olive-oil', name: 'olive oil', quantity: 2, unit: 'tbsp' },
    { id: 'frozen-broccoli', name: 'frozen broccoli', quantity: 300, unit: 'g', alternatives: [{ id: 'frozen-peas', name: 'frozen peas', quantity: 200, unit: 'g' }] },
    { id: 'natural-yoghurt', name: 'Natural yoghurt to serve, optional' },
    { id: 'black-pepper', name: 'Black pepper' },
    { id: 'dried-thyme-rosemary', name: 'dried thyme or rosemary', quantity: 1, unit: 'tsp', note: 'optional' }
  ],
  quickSteps: [
    'Coat chicken with lemon zest/juice, garlic, oregano, paprika and oil; add thyme/rosemary if wanted.',
    'Drawer 1: potatoes at 200°C for 25–30 minutes; shake twice.',
    'When potatoes have about 15–18 minutes left, start chicken in drawer 2 at 190°C.',
    'Turn chicken once and cook until done.',
    'Microwave frozen broccoli or peas separately near the end.',
    'Finish with lemon and optional yoghurt.'
  ],
  method: [
    'Mix most of the lemon zest and juice with the garlic, oregano, paprika, half the olive oil, black pepper and optional thyme or rosemary. Coat the chicken well.',
    'Toss the potatoes with the remaining olive oil and put them in drawer 1 at 200°C for 25–30 minutes, shaking after roughly 10 and 20 minutes.',
    'When the potatoes have about 15–18 minutes remaining, put the chicken in drawer 2 at 190°C. Turn once during cooking and continue until cooked through.',
    'Microwave the frozen broccoli or peas according to the packet so the potatoes can stay crisp.',
    'Serve the chicken with potatoes and vegetables, finishing with the remaining lemon and natural yoghurt if wanted.'
  ],
  variations: [
    {
      title: 'Oven traybake',
      steps: [
        'Heat the oven to 210°C fan.',
        'Roast the potatoes for 15 minutes first.',
        'Add the seasoned chicken and roast for another 20–25 minutes, or until the chicken is cooked through and the potatoes are crisp.',
        'Microwave the frozen broccoli or peas separately near the end and serve alongside.'
      ]
    }
  ],
  familyNotes: [
    'The lemon, garlic and oregano are the core flavour profile; thyme, rosemary or other complementary herbs can be added freely if wanted.'
  ]
}
