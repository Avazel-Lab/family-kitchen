import type { Recipe } from '../../types'

export const mildFamilyChickenCurry: Recipe = {
  id: 'mild-family-chicken-curry',
  title: 'Mild Family Chicken Curry',
  summary: 'A tomato and yoghurt chicken curry with plenty of flavour, mild heat and easy frozen vegetables.',
  category: 'Chicken',
  season: 'all-year',
  tags: ['curry', 'frozen veg', 'rice', 'pressure cooker option'],
  prepMinutes: 25,
  cookMinutes: 30,
  makes: 'About 5 adult portions',
  householdUse: 'For 2 adults + toddler, serve about half the batch with rice or flatbreads and chill or freeze the remainder. For 2 adults, use roughly two-fifths of the batch.',
  freezer: 'Good. Freeze before adding yoghurt if making specifically for the freezer; stir yoghurt in after reheating.',
  equipment: ['Large saucepan', 'Pressure cooker optional'],
  packNotes: [
    'Uses one full 600 g pack of chicken thigh fillets.',
    'Frozen cauliflower and peas avoid leftover fresh vegetables.',
    'Natural yoghurt can also be used with burritos or Greek chicken during the week.'
  ],
  ingredients: [
    '600 g boneless skinless chicken thigh fillets, cut into bite-sized pieces',
    '1 large onion, diced',
    '4 garlic cloves, finely chopped',
    '4 tsp ginger purée',
    '1 tbsp garam masala',
    '2 tsp ground cumin',
    '2 tsp ground coriander',
    '1 tsp turmeric',
    '1 tsp mild curry powder',
    '1 tbsp tomato purée',
    '1 x 400 g tin chopped tomatoes',
    '250 g frozen cauliflower florets',
    '150 g frozen peas',
    '150 g natural yoghurt',
    '100 ml water',
    '1 tbsp rapeseed or olive oil',
    'Rice or flatbreads, to serve'
  ],
  quickSteps: [
    'Brown the chicken and set aside if needed.',
    'Soften the onion; add garlic, ginger purée, spices and tomato purée.',
    'Add tomatoes, water and chicken.',
    'Simmer gently for 15 minutes.',
    'Add frozen cauliflower for 8–10 minutes and peas for the final 3 minutes.',
    'Take off the heat, stir in yoghurt and serve with rice or flatbreads.'
  ],
  method: [
    'Heat the oil in a large pan over medium-high heat. Brown the chicken in batches if necessary, then remove to a plate.',
    'Reduce the heat, add the onion and cook for 5–7 minutes until softened.',
    'Add the garlic, ginger purée, garam masala, cumin, coriander, turmeric, mild curry powder and tomato purée. Cook for 1–2 minutes, stirring, until fragrant.',
    'Add the chopped tomatoes and water, return the chicken to the pan and bring to a gentle simmer.',
    'Simmer for 15 minutes, stirring occasionally.',
    'Add the frozen cauliflower and cook for another 8–10 minutes until tender. Add the peas for the final 3 minutes.',
    'Remove from the heat and stir in the yoghurt gradually. Taste, adjust seasoning and serve with rice or flatbreads.'
  ],
  variations: [
    {
      title: 'Pressure cooker',
      steps: [
        'Use sauté mode to brown the chicken, working in batches if needed, then remove it temporarily.',
        'Add the onion and cook until beginning to soften.',
        'Add the garlic, ginger purée, garam masala, cumin, coriander, turmeric, mild curry powder and tomato purée; cook for about 1 minute.',
        'Add the water and scrape the base thoroughly so nothing is stuck.',
        'Return the chicken and pour the chopped tomatoes over the top.',
        'Cook at high pressure for 5–6 minutes, then allow a 5–10 minute natural release before releasing the remaining pressure.',
        'Switch to sauté, add the frozen cauliflower and cook until tender, then add the peas for the final 2–3 minutes.',
        'Switch off the heat and stir in the yoghurt before serving.'
      ]
    },
    {
      title: 'Change the veg',
      text: 'Frozen broccoli or spinach can replace some or all of the cauliflower and peas without changing the basic method.'
    }
  ],
  familyNotes: [
    'The shared curry is deliberately mild in heat but strongly flavoured. Add chilli oil, chilli flakes or lime pickle to adult portions at the table if wanted.'
  ]
}
