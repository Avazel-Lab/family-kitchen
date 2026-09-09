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
  householdUse: 'Three roughly 270 g pizzas is a good household batch for 2 adults + toddler, with the third pizza providing flexibility for appetite or leftovers. For 2 adults, make two pizzas and chill or freeze the spare dough ball.',
  freezer: 'Dough freezes well after balling. Defrost slowly in the fridge, then bring to room temperature until relaxed before stretching.',
  equipment: ['Pizza oven', 'Mixing bowl or mixer'],
  packNotes: [
    'Uses 480 g flour; the remainder of the flour bag is dry-store and keeps well.',
    'Use roughly 150–200 g of a 400 g tin of tomatoes across three pizzas, then refrigerate or freeze the remainder for another meal.',
    'Use only as much mozzarella and topping as the pizzas need; do not overload them simply to finish a pack.'
  ],
  ingredients: [
    '480 g strong white bread or pizza flour',
    '312 g cool or room-temperature water',
    '12 g fine salt',
    '1.5 g instant dried yeast for the same-day route, or about 0.5 g for an overnight fridge ferment',
    '150–200 g crushed tomatoes or pizza sauce',
    'Mozzarella, drained well, as needed',
    'Toppings of choice'
  ],
  quickSteps: [
    'Mix flour, cool water and yeast; add salt and mix/knead for about 5 minutes until cohesive and developing strength.',
    'Bulk ferment covered until clearly expanded.',
    'Divide into 3 equal balls of roughly 270 g and prove until relaxed and extensible.',
    'Heat the pizza oven and stone thoroughly.',
    'Stretch, add a thin layer of tomato, mozzarella and toppings.',
    'Launch and turn frequently; cook by colour and base rather than a fixed timer.'
  ],
  method: [
    'Put the flour, cool or room-temperature water and yeast into a bowl. Mix until no dry flour remains, add the salt, then mix or knead for about 5 minutes until the dough is cohesive, smoother and starting to develop strength. Avoid warm water: dough temperature and fermentation time are easier to control when the water starts cool or at room temperature.',
    'Cover and bulk ferment until the dough is clearly expanded and aerated. For the same-day route using about 1.5 g yeast, this will commonly take around 3–5 hours at a normal room temperature, but use the dough rather than the clock as the main guide.',
    'Turn out the dough, divide into three equal pieces of roughly 268–270 g and shape into tight balls. Cover and leave until relaxed, airy and easy to stretch, commonly another 2–3 hours depending on room temperature.',
    'Preheat the pizza oven and stone thoroughly according to the oven manufacturer.',
    'Stretch one dough ball gently, preserving the gas around the rim. Add a thin layer of tomato sauce, well-drained mozzarella and a restrained amount of toppings.',
    'Launch onto the hot stone and turn frequently. Watch the underside and crust colour closely; high-temperature pizza cooks quickly and oven conditions matter more than a fixed cooking time.'
  ],
  variations: [
    {
      title: 'Overnight fridge dough',
      steps: [
        'Use about 0.5 g instant dried yeast instead of the same-day quantity.',
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
