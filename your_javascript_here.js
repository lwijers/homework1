// weapon objects ------------------------
var mace = {
  type: 'mace',
  damage: 2
}

var axe = {
  type: 'axe',
  damage: 3
}

var foundWeapon = {
  type: 'towel',
  damage: 5
}

// creature objects ------------------------
var hero = {
  name: 'Arthur Dent',
  heroic: true,
  inventory: [mace, axe],
  health: 8,
  weapon: {
    type: 'sword',
    damage: 2
  }
}

var enemy = {
  name: 'Beholder',
  heroic: true,
  inventory: [],
  health: 5,
  weapon: {
    type: 'gaze',
    damage: 1
  }
}

// logic ------------------------

// rest the creature, restores health to 10
function rest(creature) {
  creature.health = 10;
  return creature;
}

// puts item in creature inventory
function pickUpItem(creature, item) {
  creature.inventory.push(item);
  return creature;
}

// subtracts attacker weapon damage from defender health, returns defender, logs the damage done
function dealDamage(attacker, defender) {
  console.log(`${attacker.name} causes ${attacker.weapon.damage} damage to ${defender.name} with ${attacker.weapon.type}`);
  defender.health -= attacker.weapon.damage;
  console.log(`${defender.name} now has ${defender.health} health`);
  return defender;
}

// takes the weapon from creature inventory at the assigned
// index, removes it from inventory and assigns it to creatures
// weapon
function equipWeapon(creature, index) {
  creature.weapon = creature.inventory.splice(index, 1)[0];
  return creature;
}

// returns false unless creatures health is <1
function isDead(creature) {
  if (creature.health < 1) {
    return true
  }
  return false
}

// while any combatant has health and attacker is heroic take turns
// doing damage, returns: null if not heroic, heroicCreuture if
// victorious
function doBattle(heroicCreature, creature) {
  var curRound = 1
  // check if both actors have health and if heroic
  while (heroicCreature.health >= 0 && creature.health >= 0) {
    if (heroicCreature.heroic === false) {
      return null;
    }
    // attacker deals damage to defender
    console.log(`round: ${curRound}`);
    dealDamage(heroicCreature, creature);
    if (isDead(creature)) { // check if defender is dead
      console.log(`${creature.name} DIED!`);
        return heroicCreature;
    }
    //defender fights attacker
    dealDamage(creature, heroicCreature);
    if (isDead(heroicCreature)) { //check if attacker is dead
      alert(`Too bad, ${heroicCreature.name} has kicked the bucket`);
    }
    curRound += 1;
  }
}

// UI Input handling------------------------

// rest buttons calls rest() and displays updates stats
$("#rest").click( function() {
  rest(hero);
  updateStats();
  console.log(`${hero.name}'s health is restored to ${hero.health}`);
});

// pickup Item button calls pickUpItem() and displays updates stats
$("#pickUpItem").click( function() {
  pickUpItem(hero, foundWeapon);
  updateStats();
  console.log(`${hero.name} has the following item: ${hero.inventory[0].type}`);
});

// boBattle button calls doBattle() and displays updates stats
$("#doBattle").click( function() {
  doBattle(hero, enemy);
  updateStats();
});

// equipWeapon button calls equipWeapon() and displays updates stats
$("#equipWeapon").click( function() {
  var userIndex = window.prompt(`what index would you like?`)
  equipWeapon(hero, userIndex);
  updateStats();
  console.log(`${hero.inventory}`);
});

// form submit button sets hero name to value, displays new stats
// and clears input field
$("#submitBut").click( function() {
  hero.name = document.getElementById("field").value;
  displayStats(hero);
  document.getElementById("field").value = ""
});

// UI --------------------------------

//display important attributes of an actor
function displayStats(creature) {
  document.getElementById('statsContainer').innerHTML= `
    <p>name: ${creature.name}</p>
    <p>health: ${creature.health}</p>
    <p>weapon type: ${creature.weapon.type}</p>
    <p>weapon damage: ${creature.weapon.damage}</p>`
}

//display the current inventory of an actor
function displayInventory(creature) {
  // clear the inventory container div
  document.getElementById('inventoryContainer').innerHTML = ``
  // loop through inventory array
  creature.inventory.forEach(function(element) {
    // loop through weapon object
    for(var key in element){
      // add key and value to div
      document.getElementById('inventoryContainer').innerHTML += `<p>${key}: ${element[key]}</p>`
    }
  });
}

// function that updates and displays all updateable stats
function updateStats(){
  displayStats(hero);
  displayInventory(hero);
}

// Setup ------------------------------

// make sure the DOM gets filled by calling the display functions on loading
displayStats(hero);
displayInventory(hero);
