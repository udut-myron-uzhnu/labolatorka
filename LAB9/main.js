const userNameInput = document.getElementById('nameInput');
const generateButton = document.querySelector('.generate');
const outputStory = document.querySelector('.story-output');

function getRandomElement(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

const baseStory = "It was 80 degrees Celsius outside, so :insertX: decided to explore. When they arrived at :insertY:, they gasped in disbelief, then :insertZ:. Alex witnessed everything, but was not shocked — :insertX: weighs 150 kilograms, and it was a chilly day.";
const characters = ["Alice the Adventurer", "Captain Awesome", "The Great Wizard"];
const locations = ["the enchanted forest", "the city park", "the castle"];
const actions = ["disappeared into thin air", "turned into a cloud of mist", "flew away on a dragon"];

generateButton.addEventListener('click', generateStory);

function generateStory() {
    let newStory = baseStory;

    const character = getRandomElement(characters);
    const location = getRandomElement(locations);
    const action = getRandomElement(actions);

    newStory = newStory.replace(/:insertX:/g, character);
    newStory = newStory.replace(':insertY:', location);
    newStory = newStory.replace(':insertZ:', action);

    if (userNameInput.value !== '') {
        const name = userNameInput.value;
        newStory = newStory.replace(/Alex/, name);
    }

    if (document.getElementById("countryUK").checked) {
        const weightInStones = Math.round(150 * 0.157473) + " stones"; 
        const temperatureInFahrenheit = Math.round((80 * 9/5) + 32) + " degrees Fahrenheit"; 
        newStory = newStory.replace("80 degrees Celsius", temperatureInFahrenheit);
        newStory = newStory.replace("150 kilograms", weightInStones);
    }

    outputStory.textContent = newStory;
    outputStory.style.visibility = 'visible';
}
