'use strict';
const { User, SpotType } = require('../models')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await User.findAll({ order: ['id'] });
    const spotTypes = await SpotType.findAll({ order: ['id'] });

    return queryInterface.bulkInsert('Spots', [
      {
        name: 'Sacred Nectar Sanctuary',
        description: "Hello! Welcome to Sacred Nectar Sanctuary.\
                      Bordered by the White Mountain National Forest and land conservation, Sacred Nectar Sanctuary is cradled in the valley of the 4,020 ft.\
                      Whiteface Mountain. Our private camp sites each carry their own unique enchanting energy.\
                      Four of our sites have Mountain Views and are up the steep but smooth dirt road (AWD recommended but not necessary).\
                      The other three magical sites lay tucked in the mossy forests. Enjoy our Blissful campsites as your base camp and easy access to all the White Mountains of New Hampshire have to offer.\
                      Looking to get off grid away from traditional campgrounds? Welcome to the New Earth.",
        userId: users[1].id,
        spotTypeId: spotTypes[0].id,
        address: '222 Whiteface Intervale Rd',
        city: 'Sandwitch',
        state: 'NH',
        country: 'United States',
        latitude: 43.89197875977831,
        longitude: -71.39764097357144,
        pricePerNight: 100,
        maxCapacity: 24,
      },
      {
        name: 'Starlight Hills Campground',
        description: "Perfect place to take your family and enjoy an experience all your own.\
                      Secluded camping area on mountainous forest, privacy is key to us. Camp sites are well spaced out.\
                      Minimal light pollution, our skies are beautiful for viewing.\
                      Creek on property lovley for walking.\
                      Wildlife viewing throughout.There are feed locations to increase viewing opportunities.\
                      Trails through natural wooded habitat with hidden gems of nature.",
        userId: users[2].id,
        spotTypeId: spotTypes[0].id,
        address: '7466 Bostic Sunshine Hwy',
        city: 'Bostic',
        state: 'NC',
        country: 'United States',
        latitude: 35.51284241948895,
        longitude: -81.75745356931608,
        pricePerNight: 60,
        maxCapacity: 10,
      },
      {
        name: 'Twisselman’s Glamping by the Pond',
        description: "Come glamp next to our pond under breathtaking stars located in beautiful Carrisa Plains, California.\
                      Cozy up in a comfy private canvas wall tent. The tent is fully furnished with a queen bed, side tables, chairs and/or coffee table.\
                      The tent also has a screen door and three screen windows to let the fresh breeze cool you off during the day.\
                      The tent is set on a raised deck to keep you and your belongings out of the dirt. Outside there is a picnic table or table & several chairs.",
        userId: users[3].id,
        spotTypeId: spotTypes[4].id,
        address: '7645 Cattle Dr',
        city: 'Santa Margarita',
        state: 'CA',
        country: 'United States',
        latitude: 35.401473139469545,
        longitude: -120.1077065618283,
        pricePerNight: 210,
        maxCapacity: 5,
      },
      {
        name: 'Four Directions Retreat Tiny Cabin',
        description: 'Located at the Four Directions Retreat, the rustic Tiny Cabin is nestled amongst the firs and ferns.\
                      It is a wonderful place to create or to "Just Be."  The cabin sleeps two, plus it has its own campsite for additional guests in the Summer.\
                      Our beautiful property features a 40 year old Douglas Fir forest and a spacious meadow which is stunning in the spring with wild grasses and beautiful flowers.\
                      During the Summer you can take a break from the heat or just chillax amongst the huge ferns, Douglas Fir, Western Cedar and Alder trees.',
        userId: users[1].id,
        spotTypeId: spotTypes[2].id,
        address: '71829 Beaver Springs Rd',
        city: 'Rainier',
        state: 'OR',
        country: 'United States',
        latitude: 46.03713584937922,
        longitude: -122.94639108465805,
        pricePerNight: 109,
        maxCapacity: 6,
      },
      {
        name: 'Homosassa Springs RV SITE with dock',
        description: "Setup your own RV under the shade then enjoy our shared dock with direct access into the Homosassa springs for a refreshing dip or paddle.\
                      We provide full hookups (water, sewer, 50amp electric) for your RV as well as WIFI service and access to the docks for your boat or swimming.\
                      We have kayaks and paddleboards INCLUDED with our site or bring your own to paddle the springs and take a chance at seeing a manatee up close and personal or catching some fish.",
        userId: users[2].id,
        spotTypeId: spotTypes[1].id,
        address: '10200 W Fishbowl Dr',
        city: 'Homosassa',
        state: 'FL',
        country: 'United States',
        latitude: 28.791245049260052,
        longitude: -82.60033019193774,
        pricePerNight: 75,
        maxCapacity: 5,
      },
      {
        name: 'Treehouse Cabin Retreat',
        description: "Welcome to the Treehouse Cabin Retreat! If you like camping, you will love this getaway.\
                      Our unique Treehouse (one queen bed on main floor plus small single bed in the loft) plus Rustic Cabin rental (1 bedroom with 1 queen bed, loft with double bed) brings you back to nature for relaxation and unplugging.\
                      Located just minutes from the Suwanee River. Just escape and relax among the trees or visit nearby springs, parks and rivers.\
                      Enjoy an outdoor shower under the stars. Warm up next to the campfire and create new memories.",
        userId: users[3].id,
        spotTypeId: spotTypes[3].id,
        address: '370 NE 386th Ave',
        city: 'Old Town',
        state: 'FL',
        country: 'United States',
        latitude: 29.68094032667499,
        longitude: -83.00148963068392,
        pricePerNight: 255,
        maxCapacity: 7,
      },
      {
        name: 'Our Desert Homestead - RV Site',
        description: "We have a 1.5 acre homestead, broken into a main property and an annex property.\
                      With the panoramic mountain views and no neighbors but us, you will feel that you are in the middle of nowhere, even though we are only 10 minutes from a big commercial area.\
                      The stars at night go on forever in one direction, and in the other shimmer the beautiful lights of the city of Albuquerque.",
        userId: users[1].id,
        spotTypeId: spotTypes[1].id,
        address: '228 18th St SW',
        city: 'Rio Rancho',
        state: 'NM',
        country: 'United States',
        latitude: 35.25399791746644,
        longitude: -106.7723652004487,
        pricePerNight: 30,
        maxCapacity: 5,
      },
      {
        name: 'Marble Mountain Yurt',
        description: "Enjoy hut-style glamping at its finest in our modern mountain yurt. Bask in the sun and take in the stunning panoramic mountain views above the quirky town of Marble, CO.\
                      With immediate access to some of the best backcountry skiing, hiking, biking, lakes, rivers, and BBQ in Colorado, there is truly something for everyone to love!",
        userId: users[2].id,
        spotTypeId: spotTypes[4].id,
        address: '600 W Village Dr',
        city: 'Marble',
        state: 'CO',
        country: 'United States',
        latitude: 39.08103938178297,
        longitude: -107.1925337999704,
        pricePerNight: 200,
        maxCapacity: 6,
      },
      {
        name: "Flying Pig B'n'B",
        description: "We are a small farm in Silicon Valley. You can stay in our cabin (sleeps up to 4) or your tent. We provide a full breakfast. Wake up to sheep and goats outside your door with a view of the pasture.",
        userId: users[3].id,
        spotTypeId: spotTypes[2].id,
        address: '2005 Giampaoli Drive',
        city: 'San Martin',
        state: 'CA',
        country: 'United States',
        latitude: 37.08808358252119,
        longitude: -121.57066427726433,
        pricePerNight: 180,
        maxCapacity: 5,
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Spots', null, {});
  }
};
