document.getElementById("truthGame").addEventListener('click', function() {
    const gameContainer = document.getElementById('game-container');
    if (gameContainer.style.display === 'none') {
        gameContainer.style.display = 'block';
        start();
    } else {
        gameContainer.style.display = 'none';
    }
});

// waht to do next time
    // edit ig bot video
    // cut out authenticator + block out username


const truths = [
    {
        text: "I've played over 20 different Pokemon games.",
        comment: "My first Pokemon game was Pokemon Emerald, and from there I wanted to play them all!! &#x1F917;",
        truth: true
    },
    {
        text: "My favourite anime is One Piece.",
        comment: "The stories and friendships in this series are just so good. My favourite arc is Dressrosa! &#x1F624;",
        truth: true
    },
    {
        text: "I've watched 1000 episodes of One Piece in 3 months.",
        comment: "I watched most of them at 4x speed. &#x1F633;",
        truth: true
    },
    {
        text: "I hated the colour pink growing up.",
        comment: "I was never a pink girlie... but now I need everything pink. &#x1F63B;",
        truth: true
    },
    {
        text: "My first music concert was Mumford and Sons.",
        comment: "I was in 15 years old and I dragged my friend to come, at least she enjoyed it! &#x1F601;",
        truth: true
    },
    {
        text: "My daily average screen-time is 7 hours.",
        comment: "To be fair, most of it is because I am watching/listening to Youtube while doing everything. &#x1F605;",
        truth: true
    },
    {
        text: "I've spent over 350 hours playing Animal Crossing: New Horizons.",
        comment: "I've loved Animal Crossing my whole life, and ACNH + COVID-19 lockdown was the perfect combo. &#x1F60C;",
        truth: true
    },
    {
        text: "I love puzzle games.",
        comment: "My favourite is the Professor Layton series! (Even though I cheated for some of the puzzles...) &#x1F913;",
        truth: true
    },
    {
        text: "I never failed a driving test.",
        comment: 'Even at the "most difficult testing center", they thought I was good enough for the roads hehe. &#x1F633;',
        truth: true
    },
    {
        text: "My favourite Mario game series is Mario Party.",
        comment: "The competition, the fun games, the atmosphere. This series bring me so much joy. &#x1F607;",
        truth: true
    },
    {
        text: "I've always wanted to play sports, but was never good at anything.",
        comment: "I wanted to be good at volleyball, but I am terribly uncoordinated and unathletic. &#x1F622;",
        truth: true
    },
    {
        text: "I met Jhene Aiko at a Night Market.",
        comment: "She was all geared up but I recognized her daughter, and her body guard said I could take a SUPER quick photo. So I did!! &#x1F60E;",
        truth: true
    },
    {
        text: "According to my Spotify Wrapped 2023, I've listened to over 50 different genres of music.",
        comment: "I love discovering new music, so if you name any genre, I've most likely listened to it. 	&#x1F60F;",
        truth: true
    },
    {
        text: "I used to make animation videos about the computer game Maplestory.",
        comment: "If you know, you know Maplestory videos used to be so good. &#x1F601;",
        truth: true
    },
    {
        text: "I don't like bread.",
        comment: "Quite an uncommon opinion, but I will never yuck someone else's yum! &#x1F60B;",
        truth: true
    },
    {
        text: "I know how to play 4 different instruments.",
        comment: "Piano, flute, saxophone, and ukulele! &#x1F3B5;",
        truth: true
    },
    {
        text: "I can read Korean.",
        comment: "I saw a post on Tumblr back in 2011 and learned in 15 minutes. Do I understand what I read...? &#x1F605;",
        truth: true
    }
];

const lies = [
    {
        text: "My university's Vietnamese club won a province-wide performance competition.",
        comment: "During my 4 years in the club, we never won LOL but the best placement we got was 3rd!!! &#x1F624;",
        truth: false
    },
    {
        text: "My favourite anime is Sailor Moon.",
        comment: "I always wanted to be Sailor Moon growing up, but I actually never really watched the show. &#x1F616;",
        truth: false
    },
    {
        text: "I spent my childhood drawing and doing art.",
        comment: "I tried... but I was unfortunately horrible at drawing and art. &#x1F61E;",
        truth: false
    },
    {
        text: "I've played piano for all of my life.",
        comment: "I got into it too late, and even though I did get through a couple of levels, I gave up because I got discouraged. &#x1F622;",
        truth: false
    },
    {
        text: "I'm a beast in Mario Kart.",
        comment: "I really wish I was... but I'm not terrible! &#x1F920;",
        truth: false
    },
    {
        text: "Horror is my favourite movie genre.",
        comment: "I am actually deadly afraid of anything horror. &#x1F648;",
        truth: false
    },
    {
        text: "I love jigsaw puzzles.",
        comment: "My eyes and brain hurt when I do them. &#x1F635;",
        truth: false
    },
    {
        text: "I've never won a contest or giveaway.",
        comment: "The one and only time I've won is from a Twitch streamer, where I got a $100 Amazon gift card! &#x1F389;",
        truth: false
    },
    {
        text: "I love the aesthetic of strawberries, but I don't actually like to eat them.",
        comment: "I love everything about strawberries! My favourite dessert is strawberry short cake. &#x1F370;",
        truth: false
    }
];

function start() {
    const gameOptionsContainer = document.getElementById('game-options');
    gameOptionsContainer.innerHTML = '';
    displayStatement();
};

function pickStatements() {
    let statements = [];

    const truth1 = Math.floor(Math.random() * truths.length);
    statements.push(truths[truth1]);

    let truth2 = truth1;
    while (truth2 === truth1) {
        truth2 = Math.floor(Math.random() * truths.length);
    }
    statements.push(truths[truth2]);

    const lie = Math.floor(Math.random() * lies.length);
    statements.push(lies[lie]);

    let shuffled = shuffle(statements);

    return shuffled;
};

function shuffle(array) {
    let shuffled = [];

    for (let i = 0; i < 3; i++) {
        if (i === 2) {
            shuffled.push(array[0]);
        } else {
            let index = Math.floor(Math.random() * array.length);
            shuffled.push(array[index]);
            array.splice(index, 1);
        }
    };

    return shuffled;
};

function displayStatement() {
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    let statements = pickStatements();

    statements.forEach((option) => {
        const button = document.createElement('button');
        if (option['truth'] === true) {
            button.classList.add('option-btn', 'truth');
        } else {
            button.classList.add('option-btn', 'lie');
        };

        button.textContent = option['text'];
        button.addEventListener('click', () => checkStatement(option));
        optionsContainer.appendChild(button);
    });
};

function checkStatement(option) {
    const truthList = document.querySelectorAll('.truth');
    truthList.forEach(el => el.style.backgroundColor = 'rgb(252, 163, 163)');

    const lieList = document.querySelectorAll('.lie');
    lieList.forEach(el => el.style.backgroundColor = 'rgb(163, 255, 163)');

    const gameOptionsContainer = document.getElementById('game-options');
    gameOptionsContainer.innerHTML = `<p>${option['comment']}</p>`

    const restartButton = document.createElement('button')
    restartButton.classList.add('option-btn', 'restart');
    restartButton.textContent = 'Restart';
    restartButton.addEventListener('click', () => start());
    gameOptionsContainer.appendChild(restartButton);
}

start();
