const quizData = [
    {
        question: "Wann will Bayern klimaneutral werden?",
        choices: ["2030", "2035", "2040", "2301"],
        correct: 2
    },
    {
        question: "Was unternimmt Wirtschaftsminister Aiwanger für die Energieversorgung Bayerns in der Zukunft?",
        choices: ["Er genehmigt neue Gasbohrungen, z.B. in Reichling", "Er schafft die 10H-Regel ab", "Er lässt nach Wasserstoff bohren", "Er forciert den Netzausbau und den Ausstieg aus fossiler Energie"],
        correct: 0
    },
    {
        question: "Wie kann Erdgas zum Klimaschutz beitragen?",
        choices: ["Mit viel Greenwashing", "Nur, indem es im Boden bleibt", "Als Kältemittel in Klimaanlagen", "Das kann bestimmt Minister Aiwanger erklären"],
        correct: 1
    },
    {
        question: "Wieviel Prozent des bayrischen Gasverbrauchs könnte Kinsau 1A decken?",
        choices: ["2,5 - 4,2%", "10 - 15%", "20 - 30%", "70 - 80%"],
        correct: 0
    },
    {
        question: "Warum ist der Standort der geplanten Bohrstelle Kinsau 1A besonders problematisch?",
        choices: ["Weil er weit von der Infrastruktur entfernt ist", "Weil er in der Nähe von empfindlichen Trinkwasserschutz- und Naturschutzgebieten liegt", 
        "Weil er in einem städtischen Gebiet liegt", "Weil dort keine Gasvorkommen erwartet werden"],
        correct: 1
    },
    {
        question: "Welche Gefahr besteht für das Trinkwasser der Gemeinde Reichling durch die geplanten Gasbohrungen?",
        choices: ["Keine Gefahr, da die Bohrungen weit entfernt stattfinden", "Es könnten zusätzliche Wasserreserven gefunden werden", 
        "Das Trinkwasser könnte durch die Nähe der Bohrungen kontaminiert werden", "Es besteht keine Verbindung zwischen den Bohrungen und dem Trinkwasser"],
        correct: 2
    },
    {
        question: "Wie tief soll in Kinsau 1A gebohrt werden?",
        choices: ["30m", "300m", "500m", "3000m"],
        correct: 3
    },
    {
        question: "Welche langfristigen Auswirkungen könnten die Bohrungen auf die lokale Umwelt haben?",
        choices: ["Neue Arbeitsplätze", "Mögliche Bodensenkungen, Lärm und Verschmutzung",
         "Gewerbesteuer-Mehreinnahmen", "Es könnte Gold gefunden werden"],
        correct: 1
    },
    {
        question: "Was plant das Unternehmen Genexco mit dem geförderten Gas?",
        choices: ["Den Bau einer neuen Gaspipeline, um das Gas abtransportieren zu können", "Die kostenlose Nutzung des Gases für lokale Haushalte", 
        "Die Umwandlung des Gases in erneuerbare Energie", "Die Erzeugung von Wasserstoff für Minister Aiwangers Privat PKW"],
        correct: 0
    },
    {
        question: "Welche Rolle spielt der Ukraine-Krieg in den Plänen zur Gasförderung in Reichling?",
        choices: ["Keine Rolle, die Pläne bestehen schon seit Jahrzehnten", "Er dient als Vorwand, um fossile Brennstoffe in Europa zu fördern, obwohl dies die Klimakrise verschärft",
         "Der Krieg hat die Lieferketten für Solarmodule unterbrochen", "Angesichts des Krieges ist  die Klimakrise egal"],
        correct: 1
    },
    {
        question: "Wie viele Windräder sind in Bayern von Januar bis Juni 2024 ans Netz gegangen?",
        choices: ["4", "10", "21", "52"],
        correct: 0
    }
];

let currentQuiz = 0;
let score = 0;

const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const questionElement = document.getElementById('question');
const choiceElements = document.querySelectorAll('.choice');
const previousButton = document.getElementById('previous');
const nextButton = document.getElementById('next');
const scoreElement = document.getElementById('score');
const restartButton = document.getElementById('restart');

function loadQuiz() {
    deselectChoices();
    const currentQuizData = quizData[currentQuiz];
    questionElement.innerText = currentQuizData.question;
    choiceElements.forEach((choice, index) => {
        const choiceLabel = document.getElementById(`choice${index}`);
        choiceLabel.innerText = currentQuizData.choices[index];
    });
    quizContainer.classList.add('active');
    resultsContainer.classList.remove('active');
}

function deselectChoices() {
    choiceElements.forEach(choice => choice.checked = false);
}

function getSelected() {
    let answer;
    choiceElements.forEach(choice => {
        if (choice.checked) {
            answer = choice.value;
        }
    });
    return answer;
}

previousButton.addEventListener('click', () => {
    if (currentQuiz > 0) {
        currentQuiz--;
        loadQuiz();
    }
});

nextButton.addEventListener('click', () => {
    const answer = getSelected();
    if (answer !== undefined) {
        if (answer == quizData[currentQuiz].correct) {
            score++;
            currentQuiz++;
        } else {
            alert("Die Antwort ist leider falsch. Versuch es nochmal!")
        }
        if (currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            quizContainer.classList.remove('active');
            resultsContainer.classList.add('active');
            scoreElement.innerText = `Du hast ${score} von ${quizData.length} Fragen richtig beantwortet.`;
        }
    } else {
        alert("Bitte wähle eine Antwort aus!");
    }
});

restartButton.addEventListener('click', () => {
    currentQuiz = 0;
    score = 0;
    loadQuiz();
});

loadQuiz();