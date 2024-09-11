const quizData = [
    {
        question: "Wann will Bayern klimaneutral werden?",
        choices: ["2030", "2035", "2040", "2301"],
        correct: 2,
        description: "Laut bayrischem Klimaschutz-Gesetz 2040. Wenn die Staatsregierung weiter im heutigen Zeitlupentempo Emissionen reduziert, wird Bayern aber erst in knapp 280 Jahren klimaneutral, etwa im Jahr 2301."
    },
    {
        question: "Was unternimmt Wirtschaftsminister Aiwanger für die Energieversorgung Bayerns in der Zukunft?",
        choices: ["Er genehmigt neue Gasbohrungen, z.B. in Reichling", "Er schafft die 10H-Regel ab", "Er lässt nach Wasserstoff bohren", "Er forciert den Netzausbau und den Ausstieg aus fossiler Energie"],
        correct: 0,
        description: "Allein im Gebiet 'Lech Ost', zwischen Lech und Ammersee spricht der verantwortliche Konzern Genexco von 10 potentiellen Bohrvorhaben. Für weitere Gasfelder in Holzkirchen, Halfing und Bad Endorf besitzen andere Konzerne die Konzessionen."
    },
    {
        question: "Wie kann Erdgas zum Klimaschutz beitragen?",
        choices: ["Mit viel Greenwashing", "Nur, indem es im Boden bleibt", "Als Kältemittel in Klimaanlagen", "Das kann bestimmt Minister Aiwanger erklären"],
        correct: 1,
        description: "Circa 60 % der bekannten globalen Erdgasreserven müssen im Boden bleiben, um das 1,5-Grad-Ziel noch erreichen zu können*. Dafür müsste die Gas-Förderung jährlich etwa 3 % zurückgehen. *)Laut einer Studie des Energie- und Umweltökonomen Dan Welsby aus dem Jahr 2021"
    },
    {
        question: "Wieviel Prozent des bayrischen Gasverbrauchs könnte Kinsau 1A decken?",
        choices: ["2,5 - 4,2%", "10 - 15%", "20 - 30%", "70 - 80%"],
        correct: 0,
        description: "Die potenziell gesamte Erdgas-Menge* deckt nur 2,5 bis 4,2 % des momentanen jährlichen Erdgasverbrauchs von Bayern. Das reicht gerade einmal 9 bis 15 Tage. *) gefördert über 15 Jahre"
    },
    {
        question: "Warum ist der Standort der geplanten Bohrstelle Kinsau 1A besonders problematisch?",
        choices: ["Weil er weit von der Infrastruktur entfernt ist", "Weil er in der Nähe von empfindlichen Trinkwasserschutz- und Naturschutzgebieten liegt", 
        "Weil er in einem städtischen Gebiet liegt", "Weil dort keine Gasvorkommen erwartet werden"],
        correct: 1,
        description: "Der Bohrplatz liegt nur 150 m von einem Natura 2000-Schutzgebiet, 200 m vom Reichlinger Trinkwasserschutzgebiet und 150 m vom nächsten Wohnhaus entfernt."
    },
    {
        question: "Wie tief soll in Kinsau 1A gebohrt werden?",
        choices: ["30m", "300m", "500m", "3000m"],
        correct: 3,
        description: "Im Herbst 2024 ist eine Erkundungsbohrung bis in eine Tiefe von 3000 m geplant. Dazu soll ein 40 m hoher Bohrturm aufgestellt werden."
    },
    {
        question: "Welche langfristigen Auswirkungen könnten die Bohrungen auf die lokale Umwelt haben?",
        choices: ["Neue Arbeitsplätze", "Mögliche Bodensenkungen, Lärm und Verschmutzung",
         "Gewerbesteuer-Mehreinnahmen", "Es könnte Gold gefunden werden"],
        correct: 1,
        description: "Die Region muss allein die negativen Folgen tragen. Der Konzern Genexco hat seinen Firmensitz nicht in Bayern, die Gewerbesteuer fällt woanders an. In Bayern wird auch keine Förderabgabe erhoben. (Diese liegt z.B. in Niedersachsen bei 10 %.)"
    },
    {
        question: "Was plant das Unternehmen Genexco mit dem geförderten Gas?",
        choices: ["Den Bau einer neuen Gaspipeline, um das Gas abtransportieren zu können", "Die kostenlose Nutzung des Gases für lokale Haushalte", 
        "Die Umwandlung des Gases in erneuerbare Energie", "Die Erzeugung von Wasserstoff für Minister Aiwangers Privat PKW"],
        correct: 0,
        description: "Der Abtransport ist bisher unklar. Wahrscheinlich müsste eine Pipeline nach Denklingen gebaut werden. Alternativ könnte das Gas verflüssigt und mit LKWs abtransportiert werden."
    },
    {
        question: "Welches ist der größte Gaslieferant für Deutschland?",
        choices: ["USA", "Katar", "Norwegen", "Niederlande"],
        correct: 2,
        description: "Die Haupt-Gaslieferanten sind: Norwegen 1.374 GWh/Tag, Niederlande 805 GWh/Tag, Belgien 737 GWh/Tag, LNG 190 GWh/Tag. Auch im Winter 2024 droht kein Gasmangel!"
    },
    {
        question: "Wie viele Windräder sind in Bayern von Januar bis Juni 2024 ans Netz gegangen?",
        choices: ["4", "10", "21", "52"],
        correct: 0,
        description: "4 Windräder sind in der ersten Jahreshälfte in Betrieb gegangen. Es müssten 52 sein (104 pro Jahr), um die angestrebte Klimaneutralität bis 2040 zu erreichen."
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
    const currentQuizData = quizData[currentQuiz];
    if (answer !== undefined) {
        if (answer == currentQuizData.correct) {
            score++;
            alert("Richtig: " + currentQuizData.description);
        } else {
            alert("Die Antwort ist leider falsch. Die richtige Antwort ist: " + currentQuizData.choices[currentQuizData.correct] + " " + currentQuizData.description);
        }
        currentQuiz++;
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