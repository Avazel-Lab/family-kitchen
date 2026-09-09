import type { Recipe } from '../../types'

export const beefStewDumplings: Recipe = {
  id: 'winter-beef-stew-dumplings',
  title: 'Beef Stew with Dumplings',
  summary: 'A deeply flavoured winter beef stew with root vegetables, peas and fresh suet dumplings.',
  category: 'Beef',
  season: 'winter',
  tags: ['winter', 'batch cook', 'freezer', 'pressure cooker option'],
  prepMinutes: 30,
  cookMinutes: 150,
  makes: 'About 6 adult portions of stew',
  householdUse: 'For 2 adults + toddler, serve roughly half the stew and make 4 dumplings, then chill or freeze the remaining stew without dumplings. For a larger meal, double the dumpling quantities.',
  freezer: 'Stew freezes very well. Dumplings are best made fresh when reheating.',
  equipment: ['Large casserole or Dutch oven', 'Pressure cooker optional'],
  packNotes: [
    'Uses one full 500 g pack of stewing beef.',
    'Uses 500 g potatoes when serving with dumplings; increase to about 700 g if making the stew without dumplings.',
    'The dumpling quantities make 4 medium dumplings; double them for 8.',
    'Frozen peas are added only at the end.'
  ],
  ingredients: [
    '500 g stewing beef, cut into chunks',
    '1 large onion, chopped',
    '3 carrots, cut into chunks',
    '500 g potatoes, cut into chunks',
    '4 garlic cloves, finely chopped or crushed',
    '2 tbsp plain flour',
    '2 tbsp tomato purée',
    '1 tbsp Worcestershire sauce',
    '750 ml beef stock',
    '2 tsp dried thyme',
    '1 tsp dried rosemary',
    '2 bay leaves',
    '150 g frozen peas',
    '75 g self-raising flour, for 4 dumplings',
    '40 g vegetable or beef suet, for 4 dumplings',
    'About 45 ml cold water, for 4 dumplings'
  ],
  quickSteps: [
    'Brown the beef well; soften onion and garlic.',
    'Add flour, tomato purée and Worcestershire sauce.',
    'Add carrots, potatoes, stock, thyme, rosemary and bay.',
    'Cover and cook at 160°C fan for about 2 hours until the beef is tender.',
    'Mix dumpling flour, suet and water; shape into 4.',
    'Add peas and dumplings; cook uncovered for 25–30 minutes.'
  ],
  method: [
    'Heat the oven to 160°C fan. Brown the beef in batches in a large casserole so it develops good colour rather than steaming, then set aside.',
    'Cook the onion for about 5 minutes until beginning to soften. Add the garlic and cook for another minute.',
    'Return the beef, sprinkle over the plain flour and stir for 1 minute. Add the tomato purée and Worcestershire sauce and stir well.',
    'Add the carrots, potatoes, stock, thyme, rosemary and bay leaves. Bring to a simmer, cover and transfer to the oven for about 2 hours, until the beef is tender.',
    'For 4 dumplings, mix 75 g self-raising flour with 40 g suet, then add about 45 ml cold water gradually until a soft dough forms. Divide into 4 balls without overworking. Double these quantities if you want 8 dumplings.',
    'Stir the frozen peas into the stew, place the dumplings on top and return to the oven uncovered for 25–30 minutes until puffed, browned and cooked through.',
    'Taste and adjust the seasoning before serving. If the stew is thinner than you want, leave it uncovered for a little longer while the dumplings finish.'
  ],
  variations: [
    {
      title: 'Pressure cooker',
      steps: [
        'Use sauté mode to brown the beef in batches, then soften the onion and garlic.',
        'Return the beef, add the flour, tomato purée and Worcestershire sauce, and stir well.',
        'Add about 500 ml beef stock, the thyme, rosemary and bay leaves, and scrape the base thoroughly so nothing is stuck.',
        'Cook at high pressure for 25 minutes.',
        'Allow a 10-minute natural release, then release the remaining pressure.',
        'Add the carrots and potatoes, reseal and cook at high pressure for 4 minutes.',
        'Release the pressure, stir in the frozen peas and check the consistency. Reduce briefly on sauté if needed.',
        'Transfer to an oven-safe dish if required, top with freshly made dumplings and bake uncovered at 200°C fan for 25–30 minutes until the dumplings are puffed and cooked through.'
      ]
    },
    {
      title: 'Without dumplings',
      text: 'Increase the potatoes to about 700 g if you want the stew to be the complete meal without dumplings.'
    }
  ],
  familyNotes: [
    'The long cook should make the beef very tender; use the texture of the beef rather than the clock alone to decide when the stew is ready for dumplings.'
  ]
}
