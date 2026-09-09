import type { Recipe } from '../../types'

export const salmonPotatoesBroccoli: Recipe = {
  id: 'salmon-air-fryer-traybake',
  title: 'Salmon / Fish, Potatoes & Greens',
  summary: 'A flexible two-drawer air-fryer fish dinner with crisp potatoes and easy microwave frozen vegetables.',
  category: 'Fish',
  season: 'all-year',
  tags: ['fish', 'salmon', 'air fryer', 'two drawer', 'frozen veg', 'quick'],
  prepMinutes: 15,
  cookMinutes: 30,
  makes: '2–4 fish portions',
  householdUse: 'For 2 adults + toddler, a 4-pack of salmon or fish gives enough flexibility for appetite and usually leaves a useful lunch portion. For a 2-adult night, a 2-pack is ideal. Serve with potatoes and microwave frozen broccoli, peas or sweetcorn.',
  freezer: 'Best eaten fresh. Cooked fish can be chilled promptly and used for lunch the next day.',
  equipment: ['Two-drawer air fryer', 'Microwave'],
  packNotes: [
    'Choose a 2-pack or 4-pack of salmon or white fish to match the night rather than forcing a fixed quantity.',
    'Frozen broccoli, peas or sweetcorn can be microwaved directly from frozen with no fresh vegetable remainder.',
    'Potatoes are easy to scale and keep well.'
  ],
  ingredients: [
    '2–4 salmon fillets or other fish portions',
    '700 g potatoes, cut into roughly 2 cm chunks or wedges',
    '250–300 g frozen broccoli, peas or sweetcorn',
    '1 tbsp olive or rapeseed oil',
    'Spices, dried herbs and other seasonings as desired',
    'Lemon or other finishing flavours, optional'
  ],
  quickSteps: [
    'Toss potatoes with oil and seasonings of choice.',
    'Drawer 1: potatoes at 200°C for 25–30 minutes; shake twice.',
    'Season the fish as desired.',
    'Drawer 2: cook the fish for the time/temperature appropriate to the type; salmon is usually around 180°C for 9–11 minutes.',
    'Microwave broccoli, peas or sweetcorn near the end.',
    'Check the fish is cooked through and serve everything together.'
  ],
  method: [
    'Toss the potato chunks or wedges with oil and whatever herbs, spices or other seasoning you want. Put them in drawer 1 at 200°C for 25–30 minutes, shaking after roughly 10 and 20 minutes. Exact time depends on size and the air fryer.',
    'Pat fresh fish dry and season as desired. Lemon, herbs, spices, garlic or other flavourings can be used according to the meal you want.',
    'For salmon, start drawer 2 when the potatoes have about 10 minutes left and cook at 180°C for roughly 9–11 minutes. Thick fillets may need slightly longer. For another fish type, use the relevant variation or packet instructions.',
    'While the fish cooks, microwave your choice of frozen broccoli, peas or sweetcorn according to the packet instructions and drain if needed.',
    'Check that the fish is cooked through at the thickest point, then serve with the crisp potatoes, vegetables and any finishing flavours you want.'
  ],
  variations: [
    {
      title: 'Plain white fish',
      text: 'Use cod, haddock or pollock fillets instead of salmon. At 180°C, start checking thinner fresh fillets after about 8 minutes; thicker fillets may need longer.'
    },
    {
      title: 'Breaded or frozen fish with wedges',
      steps: [
        'Cut the potatoes into wedges, toss with oil and seasoning, then cook in drawer 1 at 200°C for 25–30 minutes, shaking twice.',
        'Cook the breaded or frozen fish in drawer 2 using the product temperature and timing because coating, thickness and whether it is cooked from frozen vary considerably.',
        'Microwave frozen peas, broccoli or sweetcorn near the end of the cooking time.',
        'Serve the fish with the wedges, vegetables and lemon or another finishing flavour if wanted.'
      ]
    }
  ]
}
