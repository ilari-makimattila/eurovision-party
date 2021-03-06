import { writable } from 'svelte/store';

export const constantArtists = true;

const artists2022 = [
    "๐จ๐ฟ Czech Republic: We Are Domi โ Lights Off",
    "๐ท๐ด Romania: WRS โ Llรกmame",
    "๐ต๐น Portugal: MARO โ Saudade, Saudade",
    "๐ซ๐ฎ Finland: The Rasmus โ Jezebel",
    "๐จ๐ญ Switzerland: Marius Bear โ Boys Do Cry",
    "๐ซ๐ท France: Alvan & Ahez โ Fulenn",
    "๐ณ๐ด Norway: Subwoolfer โ Give That Wolf A Banana",
    "๐ฆ๐ฒ Armenia: Rosa Linn โ Snap",
    "๐ฎ๐น Italy: Mahmood & Blanco โ Brividi",
    "๐ช๐ธ Spain: Chanel โ SloMo",
    "๐ณ๐ฑ Netherlands: S10 โ De Diepte",
    "๐บ๐ฆ Ukraine: Kalush Orchestra โ Stefania",
    "๐ฉ๐ช Germany: Malik Harris โ Rockstars",
    "๐ฑ๐น Lithuania: Monika Liu โ Sentimentai",
    "๐ฆ๐ฟ Azerbaijan: Nadir Rustamli โ Fade To Black",
    "๐ง๐ช Belgium: Jรฉrรฉmie Makiese โ Miss You",
    "๐ฌ๐ท Greece: Amanda Georgiadi Tenfjord โ Die Together",
    "๐ฎ๐ธ Iceland: Systur โ Meรฐ Hรฆkkandi Sรณl",
    "๐ฒ๐ฉ Moldova: Zdob ลi Zdub & Advahov Brothers โ Trenuleศul",
    "๐ธ๐ช Sweden: Cornelia Jakobs โ Hold Me Closer",
    "๐ฆ๐บ Australia: Sheldon Riley โ Not The Same",
    "๐ฌ๐ง United Kingdom: Sam Ryder โ SPACE MAN",
    "๐ต๐ฑ Poland: Ochman โ River",
    "๐ท๐ธ Serbia: Konstrakta โ In Corpore Sano",
    "๐ช๐ช Estonia: Stefan โ Hope",
]

const gameKey = 'eurovisionPartyState';

const initNewGame = () => ({
    artists: artists2022,
    participants: [],
    votes: {},
    finished: false,
})

const updater = (key) => (value) => localStorage.setItem(key, JSON.stringify(value));

const storedGameState = JSON.parse(localStorage.getItem(gameKey) || JSON.stringify(initNewGame()));
storedGameState.artists = artists2022;

export const gameState = writable(storedGameState);

gameState.subscribe(updater(gameKey));

export function newGame() {
    gameState.set(initNewGame());
}