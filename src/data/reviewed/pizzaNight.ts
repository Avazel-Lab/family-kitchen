import type { Recipe } from '../../types'

export const pizzaNight: Recipe = {
  id: 'summer-pizza-night',
  title: 'Pizza Night',
  summary: 'A flexible pizza-oven recipe for three roughly 270 g pizzas, with repeatable same-day and overnight dough routes.',
  category: 'Pizza',
  season: 'summer',
  tags: ['pizza oven', 'summer', 'weekend'],
  prepMinutes: 25,
  cookMinutes: 10,
  makes: '3 x roughly 270 g dough balls',
  basePortions: 3,
  householdUse: 'Three roughly 270 g pizzas is a good household batch for 2 adults + toddler, with the third pizza providing flexibility for appetite or leftovers. For 2 adults, make two pizzas and chill or freeze the spare dough ball.',
  freezer: 'Dough freezes well after balling. Defrost slowly in the fridge, then bring to room temperature until relaxed before stretching.',
  equipment: ['Pizza oven', 'Mixing bowl or mixer'],
  packNotes: [
    'Uses 480 g flour; the remainder of the flour bag is dry-store and keeps well.',
    'Use roughly 150–200 g of a 400 g tin of tomatoes across three pizzas, then refrigerate or freeze the remainder for another meal.',
    'Use only as much mozzarella and topping as the pizzas need; do not overload them simply to finish a pack.'
  ],
  ingredients: [
    { id: 'pizza-flour', name: 'strong white bread or pizza flour', quantity: 480, unit: 'g' },
    { id: 'water', name: 'cool or room-temperature water', quantity: 312, unit: 'g' },
    { id: 'fine-salt', name: 'fine salt', quantity: 12, unit: 'g' },
    { id: 'instant-dried-yeast', name: 'instant dried yeast', quantity: 1.5, unit: 'g', note: 'same-day route', alternatives: [{ id: 'instant-dried-yeast-overnight', name: 'instant dried yeast', quantity: 0.5, unit: 'g', note: 'overnight fridge route' }] },
    { id: 'pizza-sauce', name: 'crushed tomatoes or pizza sauce', quantity: 175, unit: 'g' },
    { id: 'mozzarella', name: 'Mozzarella, drained well, as needed' },
    { id: 'pizza-toppings', name: 'Toppings of choice' }
  ],
  quickSteps: [
    'Mix flour, cool water and yeast; add salt and mix/knead for about 5 minutes until cohesive and developing strength.',
    'Bulk ferment covered until clearly expanded.',
    'Divide into equal dough balls of roughly 270 g and prove until relaxed and extensible.',
    'Heat the pizza oven and stone thoroughly.',
    'Stretch, add a thin layer of tomato, mozzarella and toppings.',
    'Launch and turn frequently; cook by colour and base rather than a fixed timer.'
  ],
  method: [
    'Put the flour, cool or room-temperature water and same-day yeast quantity into a bowl. Mix until no dry flour remains, add the salt, then mix or knead for about 5 minutes until the dough is cohesive, smoother and starting to develop strength. Avoid warm water: dough temperature and fermentation time are easier to control when the water starts cool or at room temperature.',
    'Cover and bulk ferment until the dough is clearly expanded and aerated. With the same-day yeast quantity this will commonly take around 3–5 hours at a normal room temperature, but use the dough rather than the clock as the main guide.',
    'Turn out the dough, divide into equal pieces of roughly 268–270 g and shape into tight balls. Cover and leave until relaxed, airy and easy to stretch, commonly another 2–3 hours depending on room temperature.',
    'Preheat the pizza oven and stone thoroughly according to the oven manufacturer.',
    'Stretch one dough ball gently, preserving the gas around the rim. Add a thin layer of tomato sauce, well-drained mozzarella and a restrained amount of toppings.',
    'Launch onto the hot stone and turn frequently. Watch the underside and crust colour closely; high-temperature pizza cooks quickly and oven conditions matter more than a fixed cooking time.'
  ],
  variations: [
    {
      title: 'Overnight fridge dough',
      steps: [
        'Use the overnight yeast quantity shown in the ingredient list instead of the same-day quantity.',
        'Mix and knead the dough as normal using cool water.',
        'Leave it at room temperature for roughly 30–60 minutes to begin fermentation.',
        'Cover and refrigerate overnight, or for roughly 18–24 hours.',
        'Divide and ball either before refrigeration or after the cold bulk ferment; both work, but if balling after refrigeration give the dough enough time to relax afterwards.',
        'Bring the dough balls out of the fridge around 2–3 hours before cooking, or until soft, airy and easily extensible.'
      ]
    },
    {
      title: 'Use leftovers as toppings',
      text: 'Small amounts of cooked chicken, peppers, mushrooms, sausage or vegetables from earlier meals are ideal toppings and reduce waste.'
    }
  ],
  familyNotes: [
    'Fermentation is temperature-dependent. If the dough is racing ahead, use it earlier or refrigerate it; if it is sluggish, give it longer rather than forcing the schedule.'
  ]
}
