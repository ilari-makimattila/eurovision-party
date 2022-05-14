import { writable } from 'svelte/store';

export const constantArtists = true;

const artists2022 = [
    "🇨🇿 Czech Republic: We Are Domi – Lights Off",
    "🇷🇴 Romania: WRS – Llámame",
    "🇵🇹 Portugal: MARO – Saudade, Saudade",
    "🇫🇮 Finland: The Rasmus – Jezebel",
    "🇨🇭 Switzerland: Marius Bear – Boys Do Cry",
    "🇫🇷 France: Alvan & Ahez – Fulenn",
    "🇳🇴 Norway: Subwoolfer – Give That Wolf A Banana",
    "🇦🇲 Armenia: Rosa Linn – Snap",
    "🇮🇹 Italy: Mahmood & Blanco – Brividi",
    "🇪🇸 Spain: Chanel – SloMo",
    "🇳🇱 Netherlands: S10 – De Diepte",
    "🇺🇦 Ukraine: Kalush Orchestra – Stefania",
    "🇩🇪 Germany: Malik Harris – Rockstars",
    "🇱🇹 Lithuania: Monika Liu – Sentimentai",
    "🇦🇿 Azerbaijan: Nadir Rustamli – Fade To Black",
    "🇧🇪 Belgium: Jérémie Makiese – Miss You",
    "🇬🇷 Greece: Amanda Georgiadi Tenfjord – Die Together",
    "🇮🇸 Iceland: Systur – Með Hækkandi Sól",
    "🇲🇩 Moldova: Zdob şi Zdub & Advahov Brothers – Trenulețul",
    "🇸🇪 Sweden: Cornelia Jakobs – Hold Me Closer",
    "🇦🇺 Australia: Sheldon Riley – Not The Same",
    "🇬🇧 United Kingdom: Sam Ryder – SPACE MAN",
    "🇵🇱 Poland: Ochman – River",
    "🇷🇸 Serbia: Konstrakta – In Corpore Sano",
    "🇪🇪 Estonia: Stefan – Hope",
]

const gameKey = 'eurovisionPartyState';

const updater = (key) => (value) => localStorage.setItem(key, JSON.stringify(value));

const storedGameState = JSON.parse(localStorage.getItem(gameKey) || JSON.stringify(newGame()));
storedGameState.artists = artists2022;

export const gameState = writable(storedGameState);

gameState.subscribe(updater(gameKey));

export function newGame() {
    gameState.set({
        artists: artists2022,
        participants: [],
        votes: {},
        finished: false,
    });
}