/**
 * zebra1.js
 *
 * Finding the zebra problem
 *
 * This script solves the zebra problem by
 * brute-forcing all possible combinations
 * and attempting to filter them based on
 * the rules specified by the problem
 *
 * @author Eduardo Trujillo <eduard44@uga.edu>
 */

/**
 * Function for generating permutations from an array
 */
function permutations(list)
{
	// Empty list has one permutation
	if (list.length == 0)
		return [[]];


	var result = [];

	for (var i=0; i<list.length; i++)
	{
		// Clone list (kind of)
		var copy = Object.create(list);

		// Cut one element from list
		var head = copy.splice(i, 1);

		// Permute rest of list
		var rest = permutations(copy);

		// Add head to each permutation of rest of list
		for (var j=0; j<rest.length; j++)
		{
			var next = head.concat(rest[j]);
			result.push(next);
		}
	}

	return result;
}

// Come up with permutations for every category
var nationalityPerm = permutations(['Norwegian', 'Spaniard', 'Japanese', 'Englishman', 'Ukranian']);
var colorPerm = permutations(['Blue', 'Red', 'White', 'Green', 'Yellow']);
var drinkPerm = permutations(['Coffee', 'Milk', 'Tea', 'Water', 'Juice']);
var petPerm = permutations(['Zebra', 'Horse', 'Fox', 'Dog', 'Serpent']);
var smokePerm = permutations(['Kool', 'Chesterfield', 'Kent', 'Lucky Strike', 'Winston']);

// Filter the permutations down a bit based on the 3 rules
// that give us a hint on laction

// Norwegian is on the first hosue from the left
nationalityPerm = nationalityPerm.filter(function (nationalities) {
	return nationalities[0] === 'Norwegian';
});

// The blue house is near the Norwegian (so it must be on the second column)
colorPerm = colorPerm.filter(function (colors) {
	return colors[1] === 'Blue';
});

// The middle house drinks Milk
drinkPerm = drinkPerm.filter(function (drinks) {
	return drinks[2] === 'Milk';
});

// Create an array for storing solutions
var solutions = [];

// The following will loop every possible combination
// of the permutations
nationalityPerm.forEach(function (nationalities) {
	colorPerm.forEach(function (colors) {
		drinkPerm.forEach(function (drinks) {
			petPerm.forEach(function (pets) {
				smokePerm.forEach(function (smokes) {
					// Now we try to apply each rule
					// If one of them fails, we just skip the case altogether

					// Englishman lives in the red house
					var englishman = nationalities.indexOf('Englishman');
					if (colors[englishman] !== 'Red') {
						return;
					}

					// Spaniard has a dog
					var spaniard = nationalities.indexOf('Spaniard');
					if (pets[spaniard] !== 'Dog') {
						return;
					}

					// Drink coffee in green house
					var greenHouse = colors.indexOf('Green');
					if (drinks[greenHouse] !== 'Coffee') {
						return;
					}

					// The Ukranian drinks tea
					var ukranian = nationalities.indexOf('Ukranian');
					if (drinks[ukranian] !== 'Tea') {
						return;
					}

					// The green house is next to the white house
					var whiteHouse = colors.indexOf('White');
					if (Math.abs(whiteHouse - greenHouse) !== 1) {
						return;
					}

					// The Winston smoker has a serpent
					var winston = smokes.indexOf('Winston');
					if (pets[winston] !== 'Serpent') {
						return;
					}

					// In the yellow house, they smoke kool
					var yellow = colors.indexOf('Yellow');
					if (smokes[yellow] !== 'Kool') {
						return;
					}

					// The Chesterfield smoker lives near the man with the fox
					var chesterfield = smokes.indexOf('Chesterfield');
					var fox = pets.indexOf('Fox');
					if (Math.abs(chesterfield - fox) !== 1) {
						return;
					}

					// In the house near the house with the horse they smoke Kool
					var horse = pets.indexOf('Horse');
					var kool = smokes.indexOf('Kool');
					if (Math.abs(horse - kool) !== 1) {
						return;
					}

					// The Lucky Strike somker drinks juice
					var luckyStrike = smokes.indexOf('Lucky Strike');
					if (drinks[luckyStrike] !== 'Juice') {
						return;
					}

					// The Japanese smokes Kent
					var japanese = nationalities.indexOf('Japanese');
					if (smokes[japanese] !== 'Kent') {
						return;
					}

					// This combination passed all the rules
					// We can add it to the solutions array
					solutions.push({
						nationalities: nationalities,
						colors: colors,
						drinks: drinks,
						pets: pets,
						smokes: smokes
					});
				});
			});
		});
	});
});

// Print out the solutions array
console.log(solutions);
