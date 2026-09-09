import type { Recipe } from '../../types'

export const salmonPotatoesBroccoli: Recipe = {
  id: 'salmon-air-fryer-traybake',
  title: 'Salmon, Potatoes & Broccoli',
  summary: 'A straightforward two-drawer air-fryer dinner with crisp potatoes, salmon and easy microwave broccoli.',
  category: 'Fish',
  season: 'all-year',
  tags: ['fish', 'air fryer', 'two drawer', 'frozen veg', 'quick'],
  prepMinutes: 15,
  cookMinutes: 30,
  makes: '4 salmon portions',
  householdUse: 'For 2 adults + toddler, cook the 4-pack and serve three fillets according to appetite; chill the remaining fillet promptly for lunch the next day. For a 2-adult night, a 2-pack of salmon is ideal. Serve with the potatoes and microwave broccoli.',
  freezer: 'Best eaten fresh. Cooked salmon can be chilled promptly and used for lunch the next day.',
  equipment: ['Two-drawer air fryer', 'Microwave'],
  packNotes: [
    'Uses a standard 4-fillet salmon pack for the family meal; a 2-fillet pack works cleanly for a 2-adult night.',
    'Frozen broccoli can be microwaved directly from frozen, so there is no fresh vegetable remainder.',
    'Potatoes are easy to scale and keep well.'
  ],
  ingredients: [
    '4 salmon fillets',
    '700 g potatoes, cut into roughly 2 cm chunks',
    '300 g frozen broccoli florets',
    '1 tbsp olive or rapeseed oil',
    'Spices, dried herbs and other seasonings as desired',
    'Lemon or other finishing flavours, optional'
  ],
  quickSteps: [
    'Toss potatoes with oil and seasonings of choice.',
    'Drawer 1: potatoes at 200°C for 25–30 minutes; shake twice.',
    'Season the salmon however you like.',
    'Drawer 2: salmon at 180°C for 9–11 minutes, starting when the potatoes have about 10 minutes left.',
    'Microwave the frozen broccoli according to the packet while the salmon cooks.',
    'Check the salmon is cooked through and serve everything together.'
  ],
  method: [
    'Toss the potato chunks with the oil and whatever spices, herbs or other seasonings you want to use. Put them in drawer 1 at 200°C for 25–30 minutes, shaking after roughly 10 and 20 minutes. Exact time will depend on chunk size and the air fryer.',
    'Pat the salmon dry and season as desired. Lemon, herbs, spices, garlic or other flavourings can all be used according to the meal you want.',
    'When the potatoes have about 10 minutes left, put the salmon in drawer 2 at 180°C for 9–11 minutes. Thick fillets may need slightly longer.',
    'While the salmon cooks, microwave the frozen broccoli according to the packet instructions and drain it well.',
    'Check that the salmon is opaque and flakes easily at the thickest point. Serve with the crisp potatoes, broccoli and any finishing flavours you want.'
  ],
  variations: [
    {
      title: 'White fish',
      text: 'Use cod, haddock or pollock fillets instead. Start checking thinner fillets after about 8 minutes at 180°C.'
    },
    {
      title: 'Wedges',
      text: 'Cut the potatoes into wedges instead of chunks and allow roughly 25–30 minutes at 200°C depending on thickness.'
    }
  ]
}
