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
  householdUse: 'For 2 adults + toddler, use roughly half the chicken with potatoes and microwave broccoli or peas, then chill the remaining chicken for lunch or another meal. For 2 adults, use roughly two-fifths of the batch.',
  freezer: 'Chicken freezes well after cooking. Potatoes are better fresh.',
  equipment: ['Two-drawer air fryer or oven', 'Microwave for frozen veg'],
  packNotes: [
    'Uses one full 600 g pack of chicken thigh fillets.',
    'Frozen broccoli or peas keep the side simple with no fresh remainder.',
    'One whole lemon is used between zest, juice and serving.'
  ],
  ingredients: [
    '600 g boneless skinless chicken thigh fillets',
    '800 g potatoes, cut into wedges or chunks',
    '1 lemon, zested and juiced',
    '4 garlic cloves, crushed',
    '1 tbsp dried oregano',
    '2 tsp paprika',
    '2 tbsp olive oil',
    '300 g frozen broccoli or 200 g frozen peas',
    'Natural yoghurt to serve, optional',
    'Black pepper',
    '1 tsp dried thyme or rosemary, optional'
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
    'Mix most of the lemon zest and juice with the garlic, oregano, paprika, 1 tbsp olive oil, black pepper and optional thyme or rosemary. Coat the chicken well.',
    'Toss the potatoes with the remaining 1 tbsp oil and put them in drawer 1 at 200°C for 25–30 minutes, shaking after roughly 10 and 20 minutes.',
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
