import type { Recipe } from '../types'

export const recipes: Recipe[] = [
  {
    id: 'beef-mixed-bean-chilli',
    title: 'Beef & Mixed Bean Chilli',
    summary: 'A mildly spiced, batch-friendly chilli with plenty of beans and frozen sweetcorn.',
    category: 'Beef',
    season: 'all-year',
    tags: ['batch cook', 'freezer', 'beans', 'rice', 'pressure cooker option'],
    prepMinutes: 15,
    cookMinutes: 40,
    makes: 'About 6 adult portions',
    householdUse: 'Family dinner plus 3–4 portions for lunches/freezer, or two smaller family dinners.',
    freezer: 'Excellent. Freeze the chilli without rice for up to 3 months.',
    equipment: ['Large saucepan or casserole', 'Pressure cooker optional'],
    packNotes: [
      'Uses one full 500 g pack of beef mince.',
      'Uses two full 400 g tins of mixed beans and two full 400 g tins of tomatoes.',
      'Frozen sweetcorn means no fresh remainder to use up.'
    ],
    ingredients: [
      '500 g beef mince',
      '1 large onion, diced',
      '2 peppers, diced',
      '2 garlic cloves, finely chopped',
      '2 tsp ground cumin',
      '2 tsp smoked paprika',
      '1 tsp ground coriander',
      '1 tsp dried oregano',
      '1/2–1 tsp mild chilli powder, to taste',
      '2 x 400 g tins chopped tomatoes',
      '2 x 400 g tins mixed beans, drained and rinsed',
      '150 g frozen sweetcorn',
      '150 ml water or low-salt beef stock',
      '1 tbsp tomato purée',
      '1 tbsp olive or rapeseed oil if needed'
    ],
    quickSteps: [
      'Brown beef, then add onion and peppers.',
      'Add garlic, spices, oregano and tomato purée.',
      'Add tomatoes, beans and stock/water.',
      'Simmer 25–30 minutes.',
      'Stir in frozen sweetcorn for the final 5 minutes.',
      'Taste, adjust seasoning and serve with rice, wraps or jackets.'
    ],
    method: [
      'Heat a large pan over a medium-high heat. Brown the mince well, breaking it up as it cooks. If the beef is very lean, add a little oil first.',
      'Add the onion and peppers and cook for 5–7 minutes until beginning to soften.',
      'Add garlic, cumin, smoked paprika, coriander, oregano, chilli powder and tomato purée. Stir for 1 minute.',
      'Add chopped tomatoes, drained beans and stock or water. Bring to a gentle simmer.',
      'Cook uncovered or partly covered for 25–30 minutes, stirring occasionally, until thickened.',
      'Add frozen sweetcorn for the final 5 minutes. Taste before serving and add extra chilli only to adult portions if wanted.'
    ],
    variations: [
      {
        title: 'Pressure cooker',
        text: 'Brown the beef using sauté mode, soften the onion/peppers, then add everything except sweetcorn. Cook at high pressure for 8 minutes, allow 10 minutes natural release, then quick-release. Stir in frozen sweetcorn on sauté for 3–5 minutes.'
      },
      {
        title: 'Dried beans',
        text: 'For a make-ahead version, replace the two tins with about 250 g dried beans. Soak overnight in plenty of cold water, drain, cover with fresh water and cook until completely tender according to the packet. Drain, then use as you would the tinned beans. Cook beans fully before adding to the chilli.'
      }
    ],
    familyNotes: ['Keep the base mild and add hot sauce, jalapeños or chilli flakes at the table.']
  },
  {
    id: 'mild-family-chicken-curry',
    title: 'Mild Family Chicken Curry',
    summary: 'Tomato and yoghurt chicken curry with cauliflower and peas; flavourful without relying on heat.',
    category: 'Chicken',
    season: 'all-year',
    tags: ['curry', 'frozen veg', 'rice', 'pressure cooker option'],
    prepMinutes: 15,
    cookMinutes: 30,
    makes: 'About 5 adult portions',
    householdUse: 'Family dinner plus roughly 2 portions left for lunch/freezer.',
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
      '2 garlic cloves, finely chopped',
      '15 g fresh ginger, grated, or 1 tsp ground ginger',
      '2 tsp garam masala',
      '1 tsp ground cumin',
      '1 tsp ground coriander',
      '1 tsp turmeric',
      '1/2 tsp mild chilli powder, optional',
      '1 tbsp tomato purée',
      '1 x 400 g tin chopped tomatoes',
      '250 g frozen cauliflower florets',
      '150 g frozen peas',
      '150 g natural yoghurt',
      '100 ml water',
      '1 tbsp rapeseed or olive oil'
    ],
    quickSteps: [
      'Brown chicken and set aside if needed.',
      'Soften onion; add garlic, ginger, spices and tomato purée.',
      'Add tomatoes, water and chicken.',
      'Simmer 15 minutes.',
      'Add frozen cauliflower for 8–10 minutes and peas for the final 3 minutes.',
      'Take off the heat and stir in yoghurt.'
    ],
    method: [
      'Heat the oil in a large pan. Brown the chicken in batches if necessary, then remove to a plate.',
      'Reduce the heat, add the onion and cook for 5–7 minutes until softened.',
      'Stir in garlic, ginger, garam masala, cumin, coriander, turmeric, chilli powder and tomato purée. Cook for 1 minute.',
      'Add chopped tomatoes and water, return the chicken, then simmer gently for 15 minutes.',
      'Add frozen cauliflower and cook for another 8–10 minutes until tender. Add peas for the final 3 minutes.',
      'Remove from the heat. Stir in the yoghurt gradually, taste and serve with rice or flatbreads.'
    ],
    variations: [
      {
        title: 'Pressure cooker',
        text: 'Use sauté mode for chicken and onion. Add spices, tomatoes and 100 ml water, then cook at high pressure for 5 minutes with a 5-minute natural release. Stir in frozen cauliflower and peas on sauté until hot and tender, then add yoghurt off the heat.'
      },
      {
        title: 'Change the veg',
        text: 'Frozen broccoli or spinach can replace some or all of the cauliflower/peas without changing the basic method.'
      }
    ],
    familyNotes: ['Extra chilli, lime pickle or chilli oil can be added to adult portions at the table.']
  },
  {
    id: 'lentil-spaghetti-bolognese',
    title: 'Lentil-Boosted Spaghetti Bolognese',
    summary: 'Classic beef bolognese bulked out with lentils and served with wholemeal spaghetti.',
    category: 'Beef',
    season: 'all-year',
    tags: ['batch cook', 'freezer', 'lentils', 'wholemeal pasta', 'pressure cooker option'],
    prepMinutes: 15,
    cookMinutes: 45,
    makes: 'About 6 adult portions of sauce',
    householdUse: 'Use enough sauce for dinner and freeze the rest in meal-sized portions.',
    freezer: 'Excellent. Freeze sauce only; cook fresh spaghetti when needed.',
    equipment: ['Large saucepan or casserole', 'Pressure cooker optional'],
    packNotes: [
      'Uses one full 500 g pack of beef mince and one full 400 g tin of lentils.',
      'Wholemeal spaghetti is dry-store, so cook only the amount you need.',
      'Carrots keep well and can also be used in stew.'
    ],
    ingredients: [
      '500 g beef mince',
      '1 large onion, finely diced',
      '2 carrots, finely diced or grated',
      '2 garlic cloves, finely chopped',
      '2 tbsp tomato purée',
      '2 x 400 g tins chopped tomatoes',
      '1 x 400 g tin green or brown lentils, drained and rinsed',
      '200 ml water or low-salt beef stock',
      '1 tsp dried oregano',
      '1 tsp dried basil',
      '1 tsp Worcestershire sauce, optional',
      'Wholemeal spaghetti: roughly 75–90 g dry per adult portion'
    ],
    quickSteps: [
      'Brown beef thoroughly.',
      'Add onion and carrots; cook until softened.',
      'Add garlic, tomato purée and herbs.',
      'Add tomatoes, lentils and stock/water.',
      'Simmer 30–40 minutes.',
      'Cook wholemeal spaghetti separately and serve.'
    ],
    method: [
      'Brown the mince in a large pan over medium-high heat, breaking it up well.',
      'Add onion and carrots and cook for 6–8 minutes until softened.',
      'Add garlic, tomato purée, oregano and basil and cook for 1 minute.',
      'Add chopped tomatoes, lentils, stock/water and Worcestershire sauce if using.',
      'Simmer gently for 30–40 minutes until rich and thick, adding a splash of water if it catches.',
      'Cook wholemeal spaghetti according to the packet, drain and serve with the sauce.'
    ],
    variations: [
      {
        title: 'Pressure cooker',
        text: 'Brown beef and vegetables on sauté. Add remaining sauce ingredients, then cook at high pressure for 10 minutes with a 10-minute natural release. Reduce briefly on sauté if needed.'
      },
      {
        title: 'Dried lentils',
        text: 'Replace the tin with about 100 g dried green/brown lentils. Cook separately in unsalted water until tender, usually 20–30 minutes depending on type, drain, then add to the sauce. They do not normally need soaking; follow the packet if it says otherwise.'
      }
    ]
  },
  {
    id: 'salmon-air-fryer-traybake',
    title: 'Salmon, Potatoes & Broccoli',
    summary: 'A two-drawer air-fryer dinner using salmon, crisp potatoes and frozen broccoli.',
    category: 'Fish',
    season: 'all-year',
    tags: ['fish', 'air fryer', 'two drawer', 'frozen veg', 'quick'],
    prepMinutes: 10,
    cookMinutes: 25,
    makes: '4 salmon portions',
    householdUse: 'Ideal for 2 adults + toddler with roughly one portion left, or halve the sides and buy a 2-pack of salmon for a 2-adult night.',
    freezer: 'Best eaten fresh. Cooked salmon can be chilled promptly and used for lunch the next day.',
    equipment: ['Two-drawer air fryer'],
    packNotes: [
      'Uses a standard 4-fillet salmon pack; a 2-fillet pack works cleanly for a 2-adult night.',
      'Frozen broccoli goes straight from the freezer.',
      'Potatoes are easy to scale and keep well.'
    ],
    ingredients: [
      '4 salmon fillets',
      '700 g potatoes, cut into 2 cm chunks',
      '300 g frozen broccoli florets',
      '1 lemon',
      '1 tbsp olive or rapeseed oil',
      '1 tsp garlic granules',
      '1 tsp dried dill, parsley or mixed herbs',
      'Black pepper'
    ],
    quickSteps: [
      'Toss potatoes with oil, garlic and herbs.',
      'Drawer 1: potatoes at 200°C for 22–25 minutes; shake twice.',
      'Season salmon with lemon, herbs and pepper.',
      'Drawer 2: salmon at 180°C for 9–11 minutes.',
      'Add frozen broccoli to potato drawer for the final 8–10 minutes.',
      'Check salmon is cooked through and serve with lemon.'
    ],
    method: [
      'Toss the potatoes with oil, garlic granules, herbs and pepper. Put them in drawer 1 at 200°C for 22–25 minutes, shaking after about 8 and 16 minutes.',
      'Pat the salmon dry, add a squeeze of lemon and season with herbs and black pepper.',
      'When the potatoes have about 10 minutes left, put the salmon in drawer 2 at 180°C for 9–11 minutes. Thick fillets may need slightly longer.',
      'At the same time, add the frozen broccoli to drawer 1 around the potatoes. Shake once during the remaining cooking time.',
      'Check that the salmon is opaque and flakes easily at the thickest point. Serve with lemon wedges.'
    ],
    variations: [
      {
        title: 'White fish',
        text: 'Use cod, haddock or pollock fillets instead. Start checking thinner fillets after about 8 minutes at 180°C.'
      },
      {
        title: 'Wedges',
        text: 'Cut potatoes into wedges instead of chunks; allow roughly 25–30 minutes at 200°C depending on thickness.'
      }
    ]
  },
  {
    id: 'chicken-bean-burritos',
    title: 'Chicken & Bean Burritos',
    summary: 'Mildly spiced chicken, beans, peppers and sweetcorn wrapped with rice and optional yoghurt/cheese.',
    category: 'Chicken',
    season: 'all-year',
    tags: ['burritos', 'beans', 'frozen veg', 'air fryer option'],
    prepMinutes: 15,
    cookMinutes: 25,
    makes: '8 medium burritos',
    householdUse: 'Family dinner with leftovers for lunch; cooked filling also freezes well.',
    freezer: 'Freeze the cooked filling or fully assembled cooled burritos. Reheat thoroughly.',
    equipment: ['Large frying pan', 'Air fryer optional'],
    packNotes: [
      'Uses one full 600 g chicken pack, one full tin of beans and a full 8-pack of wraps.',
      'Frozen sweetcorn avoids opening fresh corn or wasting a tin remainder.',
      'Peppers overlap well with chilli if both are in the same week.'
    ],
    ingredients: [
      '600 g boneless skinless chicken thighs or breasts, sliced',
      '1 large onion, sliced',
      '2 peppers, sliced',
      '2 tsp smoked paprika',
      '1 tsp ground cumin',
      '1 tsp ground coriander',
      '1/2 tsp mild chilli powder',
      '1 x 400 g tin black, pinto or mixed beans, drained and rinsed',
      '150 g frozen sweetcorn',
      '8 medium wholemeal or standard tortilla wraps',
      'Cooked rice, roughly 300–400 g cooked',
      'Natural yoghurt, grated cheese and lime/lemon to serve, optional'
    ],
    quickSteps: [
      'Cook chicken with paprika, cumin, coriander and chilli.',
      'Add onion and peppers and cook until tender.',
      'Stir through beans and frozen sweetcorn until hot.',
      'Warm wraps.',
      'Fill with rice, chicken mixture and optional yoghurt/cheese.',
      'Roll tightly; toast seam-side down if wanted.'
    ],
    method: [
      'Season the chicken with the spices. Cook in a large frying pan over medium-high heat until browned.',
      'Add onion and peppers and cook for 6–8 minutes until softened and the chicken is cooked through.',
      'Add drained beans and frozen sweetcorn and cook for another 4–5 minutes.',
      'Warm the wraps so they fold without splitting.',
      'Add a small amount of rice and chicken filling to each wrap, followed by yoghurt or cheese if wanted. Fold in the sides and roll tightly.',
      'Eat immediately or toast seam-side down in a dry pan or air fryer for a crisper finish.'
    ],
    variations: [
      {
        title: 'Two-drawer air fryer',
        text: 'Cook seasoned chicken in one drawer at 190°C for around 12–15 minutes, shaking once. Cook peppers/onion in the second drawer at 190°C for around 10–12 minutes. Combine in a bowl with hot beans and sweetcorn.'
      },
      {
        title: 'Dried beans',
        text: 'Replace the tin with about 125 g dried black or pinto beans. Soak overnight, drain, cover with fresh water and cook until completely tender according to the packet. Drain before adding.'
      }
    ]
  },
  {
    id: 'greek-chicken-potatoes',
    title: 'Greek Chicken & Potatoes',
    summary: 'Lemon, garlic and oregano chicken with crisp potatoes and easy frozen greens.',
    category: 'Chicken',
    season: 'all-year',
    tags: ['air fryer', 'two drawer', 'potatoes', 'frozen veg'],
    prepMinutes: 15,
    cookMinutes: 30,
    makes: 'About 5 adult portions',
    householdUse: 'Family dinner plus useful lunch leftovers.',
    freezer: 'Chicken freezes well after cooking. Potatoes are better fresh.',
    equipment: ['Two-drawer air fryer or oven'],
    packNotes: [
      'Uses one full 600 g pack of chicken thigh fillets.',
      'Frozen broccoli or peas keep the side simple with no fresh remainder.',
      'One whole lemon is used between marinade and serving.'
    ],
    ingredients: [
      '600 g boneless skinless chicken thigh fillets',
      '800 g potatoes, cut into wedges or chunks',
      '1 lemon',
      '3 garlic cloves, crushed',
      '2 tsp dried oregano',
      '1 tsp paprika',
      '1 tbsp olive oil',
      '300 g frozen broccoli or 200 g frozen peas',
      'Natural yoghurt to serve, optional',
      'Black pepper'
    ],
    quickSteps: [
      'Coat chicken with lemon, garlic, oregano and paprika.',
      'Drawer 1: potatoes at 200°C for 25–30 minutes.',
      'Drawer 2: chicken at 190°C for 15–18 minutes.',
      'Shake/turn both halfway through.',
      'Add broccoli to potato drawer for final 8–10 minutes, or microwave peas.',
      'Finish with lemon and optional yoghurt.'
    ],
    method: [
      'Mix the juice of half the lemon with garlic, oregano, paprika, half the oil and black pepper. Coat the chicken.',
      'Toss potatoes with the remaining oil and put them in drawer 1 at 200°C for 25–30 minutes, shaking twice.',
      'Put the chicken in drawer 2 at 190°C for 15–18 minutes, turning once, until cooked through.',
      'Add frozen broccoli to drawer 1 for the final 8–10 minutes, or cook frozen peas separately.',
      'Serve with the remaining lemon cut into wedges and natural yoghurt if wanted.'
    ],
    variations: [
      {
        title: 'Oven traybake',
        text: 'Roast potatoes at 210°C fan for 15 minutes, add chicken, then roast for another 20–25 minutes. Add frozen broccoli for roughly the final 12–15 minutes.'
      }
    ]
  },
  {
    id: 'sausages-wedges-or-mash',
    title: 'Sausages with Wedges or Mash',
    summary: 'A dependable family dinner with an easy two-drawer air-fryer route and frozen peas.',
    category: 'Pork',
    season: 'all-year',
    tags: ['air fryer', 'two drawer', 'potatoes', 'quick', 'frozen veg'],
    prepMinutes: 10,
    cookMinutes: 30,
    makes: '8 sausages / about 4 adult portions',
    householdUse: 'Works well for a family night; leftover sausages are useful for lunch.',
    freezer: 'Cooked sausages freeze well. Wedges/mash are better made fresh.',
    equipment: ['Two-drawer air fryer or saucepan'],
    packNotes: [
      'Uses one standard 8-sausage pack.',
      'Frozen peas are portioned straight from the freezer.',
      'Potatoes keep well, so there is no need to force an exact bag size into one meal.'
    ],
    ingredients: [
      '8 sausages',
      '800 g potatoes',
      '250 g frozen peas',
      '1 tbsp olive or rapeseed oil if making wedges',
      '1 tsp paprika or mixed herbs if making wedges',
      'Milk and a small knob of butter if making mash, optional',
      'Onion gravy, optional'
    ],
    quickSteps: [
      'Wedges: cut potatoes, toss with oil/seasoning.',
      'Drawer 1: wedges at 200°C for 25–30 minutes.',
      'Drawer 2: sausages at 190°C for 12–16 minutes, turning once.',
      'Cook peas for the final few minutes.',
      'Or boil potatoes and mash instead of making wedges.',
      'Serve with gravy if wanted.'
    ],
    method: [
      'For wedges, cut potatoes into even wedges, toss with oil and seasoning, and air fry in drawer 1 at 200°C for 25–30 minutes, shaking twice.',
      'Air fry sausages in drawer 2 at 190°C for 12–16 minutes, turning halfway. Check they are cooked through.',
      'Cook frozen peas according to the packet just before serving.',
      'For mash instead, peel if desired, cut potatoes into even chunks, boil until tender, drain well and mash with a little milk/butter if using.',
      'Serve as-is or with onion gravy.'
    ],
    variations: [
      {
        title: 'Add frozen cauliflower',
        text: 'Air fry frozen cauliflower with the wedges for the final 10–12 minutes for an extra vegetable without extra prep.'
      }
    ]
  },
  {
    id: 'beef-lentil-keema',
    title: 'Beef & Lentil Keema',
    summary: 'Mild spiced beef mince bulked with lentils and peas, good with rice or flatbreads.',
    category: 'Beef',
    season: 'all-year',
    tags: ['lentils', 'batch cook', 'freezer', 'frozen veg', 'pressure cooker option'],
    prepMinutes: 10,
    cookMinutes: 30,
    makes: 'About 6 adult portions',
    householdUse: 'Family dinner plus several freezer/lunch portions.',
    freezer: 'Excellent. Freeze without rice.',
    equipment: ['Large frying pan or saucepan', 'Pressure cooker optional'],
    packNotes: [
      'Uses one full 500 g pack of mince and one full tin of lentils.',
      'Frozen peas are added straight from the freezer.',
      'Spices are all dry-store staples.'
    ],
    ingredients: [
      '500 g beef mince',
      '1 large onion, diced',
      '2 garlic cloves, finely chopped',
      '15 g fresh ginger, grated, or 1 tsp ground ginger',
      '2 tsp garam masala',
      '1 tsp ground cumin',
      '1 tsp ground coriander',
      '1 tsp turmeric',
      '1/2 tsp mild chilli powder, optional',
      '1 x 400 g tin chopped tomatoes',
      '1 x 400 g tin green/brown lentils, drained and rinsed',
      '200 g frozen peas',
      '100 ml water',
      '1 tbsp tomato purée'
    ],
    quickSteps: [
      'Brown beef and onion.',
      'Add garlic, ginger, spices and tomato purée.',
      'Add tomatoes, lentils and water.',
      'Simmer 20 minutes.',
      'Add frozen peas for final 5 minutes.',
      'Serve with rice or flatbreads.'
    ],
    method: [
      'Brown the beef in a large pan, breaking it up well. Add the onion and cook for another 5 minutes.',
      'Add garlic, ginger, garam masala, cumin, coriander, turmeric, chilli powder and tomato purée. Cook for 1 minute.',
      'Add chopped tomatoes, drained lentils and water. Simmer for about 20 minutes until thickened.',
      'Stir in frozen peas and cook for another 5 minutes.',
      'Taste and serve with rice, flatbreads or yoghurt.'
    ],
    variations: [
      {
        title: 'Pressure cooker',
        text: 'Brown beef/onion using sauté. Add spices, tomato, lentils and water. Cook at high pressure for 5 minutes, natural release for 5 minutes, then release remaining pressure. Stir in peas on sauté until hot.'
      },
      {
        title: 'Dried lentils',
        text: 'Replace the tin with about 100 g dried green/brown lentils. Cook separately until tender, usually 20–30 minutes, drain and add in place of the tinned lentils.'
      }
    ]
  },
  {
    id: 'pesto-wholemeal-pasta-bake',
    title: 'Pesto Wholemeal Pasta Bake',
    summary: 'Wholemeal pasta, pesto, broccoli and peas baked with a modest cheese topping.',
    category: 'Pasta',
    season: 'all-year',
    tags: ['wholemeal pasta', 'frozen veg', 'vegetarian', 'batch cook'],
    prepMinutes: 15,
    cookMinutes: 25,
    makes: 'About 6 adult portions',
    householdUse: 'Family dinner plus lunch portions; also useful for a 2-adult night with several leftovers.',
    freezer: 'Good. Cool completely, portion and freeze.',
    equipment: ['Large saucepan', 'Large baking dish'],
    packNotes: [
      'Uses one full 500 g bag of wholemeal pasta and one standard jar of pesto.',
      'Frozen broccoli and peas avoid fresh veg waste.',
      'Cheese comes from a block and keeps well for other meals.'
    ],
    ingredients: [
      '500 g wholemeal penne, fusilli or similar',
      '1 x 190 g jar pesto',
      '300 g frozen broccoli florets',
      '150 g frozen peas',
      '1 x 400 g tin chopped tomatoes',
      '150 g grated cheddar or mozzarella',
      '100 ml pasta cooking water',
      'Black pepper'
    ],
    quickSteps: [
      'Cook wholemeal pasta 2 minutes short of packet time.',
      'Add frozen broccoli for final 4–5 minutes and peas for final 2 minutes.',
      'Drain, reserving pasta water.',
      'Mix with pesto, tomatoes and enough pasta water to loosen.',
      'Top with cheese.',
      'Bake at 200°C fan for 20–25 minutes.'
    ],
    method: [
      'Heat the oven to 200°C fan.',
      'Cook the pasta in a large pan until about 2 minutes short of the packet time. Add frozen broccoli for the final 4–5 minutes and peas for the final 2 minutes.',
      'Reserve about 100 ml cooking water, then drain.',
      'Return everything to the pan and stir through pesto, chopped tomatoes and enough cooking water to make a loose sauce.',
      'Transfer to a baking dish, scatter over cheese and bake for 20–25 minutes until bubbling and lightly browned.'
    ],
    variations: [
      {
        title: 'Add chicken',
        text: 'Stir through about 300 g cooked chopped chicken before baking if you want a meat version.'
      },
      {
        title: 'Different frozen veg',
        text: 'Frozen cauliflower or spinach can replace some of the broccoli/peas.'
      }
    ]
  },
  {
    id: 'summer-pizza-night',
    title: 'Pizza Night',
    summary: 'A flexible summer pizza-oven template with a dependable dough and low-waste topping approach.',
    category: 'Pizza',
    season: 'summer',
    tags: ['pizza oven', 'summer', 'weekend'],
    prepMinutes: 25,
    cookMinutes: 10,
    makes: '4 x roughly 250 g dough balls',
    householdUse: 'Enough for 2 adults + toddler with spare dough/pizza depending on appetite. Extra dough can be chilled or frozen.',
    freezer: 'Dough freezes well after balling. Defrost slowly in the fridge, then bring to room temperature before stretching.',
    equipment: ['Pizza oven', 'Mixing bowl or mixer'],
    packNotes: [
      'A 500 g flour bag is mostly or completely used depending on dough-ball size.',
      'One tin of tomatoes makes enough sauce for several pizzas.',
      'Choose toppings that use full packs or overlap with another meal rather than buying many one-off ingredients.'
    ],
    ingredients: [
      '600 g strong white bread or pizza flour',
      '390 g water',
      '15 g fine salt',
      '2 g instant dried yeast',
      '1 x 400 g tin whole or chopped tomatoes, lightly crushed for sauce',
      '250 g mozzarella, drained and torn',
      'Toppings of choice: use a small number of full-pack ingredients rather than many odds and ends'
    ],
    quickSteps: [
      'Mix flour, water and yeast; add salt and knead until smooth.',
      'Bulk rise until noticeably expanded.',
      'Divide into 4 balls and prove until relaxed and airy.',
      'Heat pizza oven and stone thoroughly.',
      'Stretch, add a thin layer of tomato, mozzarella and toppings.',
      'Launch and turn frequently until the base and crust are cooked.'
    ],
    method: [
      'Mix flour, most of the water and yeast until no dry flour remains. Add salt with the remaining water and knead until the dough is smooth and elastic.',
      'Cover and allow to rise until clearly expanded. For more flavour, use a smaller yeast quantity and refrigerate overnight.',
      'Divide into four equal balls, cover and allow to relax/prove until soft and extensible.',
      'Preheat the pizza oven and stone thoroughly according to the oven manufacturer.',
      'Stretch one dough ball, add a thin layer of tomato, mozzarella and a small number of toppings.',
      'Launch onto the hot stone and turn frequently. High-temperature pizza ovens normally cook very quickly, so watch the base and crust rather than relying only on a timer.'
    ],
    variations: [
      {
        title: 'Use leftovers as toppings',
        text: 'Small amounts of cooked chicken, peppers, mushrooms, sausage or vegetables from earlier meals are ideal pizza toppings and reduce waste.'
      }
    ]
  },
  {
    id: 'winter-beef-stew-dumplings',
    title: 'Beef Stew with Dumplings',
    summary: 'A winter batch meal with beef, root vegetables, peas and simple suet dumplings.',
    category: 'Beef',
    season: 'winter',
    tags: ['winter', 'batch cook', 'freezer', 'pressure cooker option'],
    prepMinutes: 20,
    cookMinutes: 150,
    makes: 'About 6 adult portions',
    householdUse: 'One family dinner plus several leftovers, or two family meals.',
    freezer: 'Stew freezes very well. Dumplings are best made fresh when reheating.',
    equipment: ['Large casserole or Dutch oven', 'Pressure cooker optional'],
    packNotes: [
      'Uses one full 500 g pack of stewing beef.',
      'Carrots/onions overlap well with bolognese and other batch meals.',
      'Frozen peas are added only when needed.'
    ],
    ingredients: [
      '500 g stewing beef, cut into chunks',
      '1 large onion, chopped',
      '3 carrots, cut into chunks',
      '700 g potatoes, cut into chunks',
      '2 tbsp plain flour',
      '1 tbsp tomato purée',
      '750 ml low-salt beef stock',
      '1 tsp dried thyme',
      '1 bay leaf',
      '150 g frozen peas',
      '150 g self-raising flour',
      '75 g vegetable or beef suet',
      'About 90 ml cold water for dumplings'
    ],
    quickSteps: [
      'Brown beef; soften onion.',
      'Add flour and tomato purée.',
      'Add carrots, potatoes, stock, thyme and bay.',
      'Oven: cover and cook at 160°C fan for about 2 hours.',
      'Mix dumpling flour, suet and water; shape into 8.',
      'Add peas and dumplings; cook uncovered 25–30 minutes.'
    ],
    method: [
      'Heat the oven to 160°C fan. Brown the beef in batches in a large casserole, then set aside.',
      'Cook the onion for 5 minutes. Return beef, sprinkle over plain flour and stir for 1 minute, then add tomato purée.',
      'Add carrots, potatoes, stock, thyme and bay leaf. Bring to a simmer, cover and transfer to the oven for about 2 hours, until the beef is tender.',
      'For the dumplings, mix self-raising flour and suet, then add enough cold water to form a soft dough. Divide into 8 balls without overworking.',
      'Stir frozen peas into the stew, place dumplings on top and return to the oven uncovered for 25–30 minutes until puffed and cooked through.'
    ],
    variations: [
      {
        title: 'Pressure cooker',
        text: 'Brown beef and onion on sauté. Add everything except peas and dumplings, using about 500 ml stock rather than 750 ml. Cook at high pressure for 30 minutes, then allow 15 minutes natural release. Transfer to an oven-safe dish if needed, add peas and freshly made dumplings, then bake uncovered at 200°C fan for 25–30 minutes.'
      }
    ]
  },
  {
    id: 'tuna-wholemeal-pasta-bake',
    title: 'Tuna Wholemeal Pasta Bake',
    summary: 'A cupboard-and-freezer-friendly tuna pasta bake with sweetcorn and peas.',
    category: 'Fish',
    season: 'all-year',
    tags: ['fish', 'wholemeal pasta', 'frozen veg', 'store cupboard', 'batch cook'],
    prepMinutes: 15,
    cookMinutes: 25,
    makes: 'About 6 adult portions',
    householdUse: 'Family dinner plus lunch portions; particularly useful when there is little fresh food in.',
    freezer: 'Good. Cool fully, portion and freeze.',
    equipment: ['Large saucepan', 'Large baking dish'],
    packNotes: [
      'Uses a full 500 g bag of wholemeal pasta and two whole tins of tuna.',
      'Sweetcorn and peas come straight from the freezer.',
      'Everything else is cupboard or long-life food.'
    ],
    ingredients: [
      '500 g wholemeal pasta shapes',
      '2 x 145 g tins tuna, drained',
      '1 x 400 g tin chopped tomatoes',
      '200 g frozen sweetcorn',
      '150 g frozen peas',
      '300 ml milk',
      '25 g butter',
      '25 g plain flour',
      '150 g grated cheddar',
      '1 tsp dried mixed herbs',
      'Black pepper'
    ],
    quickSteps: [
      'Cook pasta 2 minutes short of packet time.',
      'Make quick white sauce with butter, flour and milk.',
      'Mix pasta with tuna, tomatoes, sweetcorn, peas, herbs and sauce.',
      'Transfer to baking dish.',
      'Top with cheese.',
      'Bake at 200°C fan for 20–25 minutes.'
    ],
    method: [
      'Heat the oven to 200°C fan. Cook the wholemeal pasta until about 2 minutes short of the packet time, then drain.',
      'Melt butter in a saucepan, stir in flour and cook for about 1 minute. Gradually whisk in milk and simmer gently until thickened.',
      'Mix pasta, drained tuna, chopped tomatoes, frozen sweetcorn, frozen peas, herbs and white sauce. Add black pepper.',
      'Transfer to a baking dish, scatter over cheese and bake for 20–25 minutes until bubbling and browned on top.'
    ],
    variations: [
      {
        title: 'No white sauce',
        text: 'For a faster version, omit butter/flour/milk and use a second tin of chopped tomatoes plus a small splash of pasta water. Top with cheese and bake as normal.'
      },
      {
        title: 'Broccoli',
        text: 'Add 200–300 g frozen broccoli to the pasta water for the final 4–5 minutes if you want another vegetable.'
      }
    ]
  },
  {
    id: 'fish-wedges-peas',
    title: 'Fish, Wedges & Peas',
    summary: 'A deliberately simple fish-and-chips-style dinner using the two-drawer air fryer.',
    category: 'Fish',
    season: 'all-year',
    tags: ['fish', 'air fryer', 'two drawer', 'quick', 'frozen veg'],
    prepMinutes: 10,
    cookMinutes: 30,
    makes: '4 fish portions',
    householdUse: 'Use a 2-pack of fish for a 2-adult night or a 4-pack for a family night and leftovers.',
    freezer: 'Use frozen fish directly if the product instructions allow; cooked leftovers are best eaten the next day.',
    equipment: ['Two-drawer air fryer'],
    packNotes: [
      'Works with fresh or frozen white-fish packs, so buy the pack size matching the night.',
      'Frozen peas are zero-waste and always available.',
      'Potatoes keep well and can be shared with several meals.'
    ],
    ingredients: [
      '2–4 white fish fillets or breaded fish portions',
      '700–800 g potatoes, cut into wedges',
      '250 g frozen peas',
      '1 tbsp oil',
      '1 tsp paprika or garlic granules for wedges',
      '1 lemon, optional'
    ],
    quickSteps: [
      'Toss wedges with oil and seasoning.',
      'Drawer 1: wedges at 200°C for 25–30 minutes.',
      'Drawer 2: fish according to pack; fresh plain fillets usually need much less time than breaded frozen fish.',
      'Shake wedges twice.',
      'Cook frozen peas near the end.',
      'Serve with lemon.'
    ],
    method: [
      'Toss potato wedges with oil and seasoning and air fry in drawer 1 at 200°C for 25–30 minutes, shaking twice.',
      'Cook fish in drawer 2. For packaged frozen/breaded fish, follow the product temperature and time because thickness and coating vary significantly. For fresh plain fillets, start checking from around 8–10 minutes at 180°C.',
      'Cook frozen peas according to the packet while the air fryer finishes.',
      'Check fish is cooked through and flakes easily, then serve with wedges, peas and lemon.'
    ],
    variations: [
      {
        title: 'Broccoli instead of peas',
        text: 'Add frozen broccoli around the wedges for the final 8–10 minutes, leaving enough space for air to circulate.'
      }
    ]
  }
]
