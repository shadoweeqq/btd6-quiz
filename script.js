var pytania = [
  {
    pytanie: "Co to za mapa?",
    zdjecie: "zdj/map1.avif",
    odpowiedzi: ["Monkey Meadow", "Logs", "Park Path", "Downstream"],
    poprawne: 0,
  },
  {
    pytanie: "Co to za mapa?",
    zdjecie: "zdj/map2.webp",
    odpowiedzi: [
      "Dark Castle",
      "Ancient Portal",
      "Encrypted",
      "Castle Revenge",
    ],
    poprawne: 2,
  },
  {
    pytanie: "Kiedy zostało wydane Bloons TD 6?",
    zdjecie: null,
    odpowiedzi: [
      "20 maja 2018",
      "15 kwietnia 2019",
      "12 luty 2019",
      "13 czerwca 2018",
    ],
    poprawne: 3,
  },
  {
    pytanie: "Jaki jest najmocniejszy balon?",
    zdjecie: "zdj/banner.jpg",
    odpowiedzi: ["ZOMG", "BAD", "MOAB", "BFB"],
    poprawne: 1,
  },
  {
    pytanie: "Czy ta małpa nazywa się Sea Monkey?",
    zdjecie: "zdj/bloons-btd6.png",
    odpowiedzi: ["Tak", "Nie"],
    poprawne: 1,
  },
  {
    pytanie: "Jaki jest najtrudniejszy tryb gry?",
    zdjecie: null,
    odpowiedzi: [
      "C.H.I.M.P.S.",
      "Impoppable",
      "Alternate Bloons Rounds",
      "Double HP MOABs",
    ],
    poprawne: 0,
  },
  {
    pytanie: "Co to za mapa?",
    zdjecie: "zdj/map3.webp",
    odpowiedzi: ["Lotus Island", "Off The Coast", "Peninsula", "Polyphemus"],
    poprawne: 3,
  },
  {
    pytanie: "Co wylatuje po zniszczeniu tego balona?",
    zdjecie: "zdj/mqdefault.jpg",
    odpowiedzi: [
      "4x ZOMG",
      "3x ZOMG, 2x DDT",
      "2x ZOMG, 3x DDT",
      "2x ZOMG, 4x DDT",
    ],
    poprawne: 2,
  },
  {
    pytanie: "Ile było herosów podczas wydania gry?",
    zdjecie: "zdj/bloons-td-6-pat-fusty.jpg",
    odpowiedzi: ["4", "3", "5", "2"],
    poprawne: 0,
  },
  {
    pytanie: "W której rundzie pojawia się pierwszy camo balon?",
    zdjecie: "zdj/camo.webp",
    odpowiedzi: ["22", "27", "24"],
    poprawne: 2,
  },
  {
    pytanie: "BTD6 to pierwsza gra Bloons która wprowadziła herosy.",
    zdjecie: null,
    odpowiedzi: ["Prawda", "Fałsz"],
    poprawne: 0,
  },
  {
    pytanie: "Która z tych małp widzi camo balony bez żadnych ulepszeń?",
    zdjecie: null,
    odpowiedzi: [
      "Sniper Monkey",
      "Ninja Monkey",
      "Beast Handler",
      "Mortar Monkey",
    ],
    poprawne: 1,
  },
  {
    pytanie: "Jak się nazywa ten heros?",
    zdjecie: "zdj/hero1.jpg",
    odpowiedzi: ["Gwendolin", "Sauda", "Etienne", "Rosalia"],
    poprawne: 2,
  },
];

var index = 0;
var _pytanie;
var przyciski;
var odpowiedziano = false;
var poprawne = 0;
var bledne = 0;
var liczba_pytan = 0;
var liczba_odpowiedzianych = 0;
var wynik = document.getElementById("wynik");

function wyswietlPytanie(_index) {
  przyciski = document.getElementsByClassName("answer");
  for (var i = 0; i < przyciski.length; i++) {
    przyciski[i].className = "answer";
  }
  document.getElementById("wynik").style.display = "none";
  document.getElementById("wynik").className = "";

  _pytanie = pytania[_index];
  document.getElementById("pytanie").innerHTML = _pytanie.pytanie;
  przyciski = document.getElementsByClassName("answer");

  if (_pytanie.zdjecie != null) {
    document.getElementById("zdjecie").style.display = "block";
    document.getElementById("zdjecie").src = _pytanie.zdjecie;
  } else {
    document.getElementById("zdjecie").style.display = "none";
  }

  for (var i = 0; i < przyciski.length; i++) {
    przyciski[i].setAttribute("value", _pytanie.odpowiedzi[i]);
  }

  document.getElementById("numer-pytania").innerHTML =
    liczba_odpowiedzianych + 1 + "/" + liczba_pytan;

  document.getElementById("next-question").disabled = true;

  for (var i = 0; i < przyciski.length; i++) {
    przyciski[i].disabled = false;
    przyciski[i].setAttribute("type", "hidden");
  }
  for (var i = 0; i < _pytanie.odpowiedzi.length; i++) {
    przyciski[i].setAttribute("type", "button");
  }

  czas = 0;
  timer();
}

function nastepnePytanie() {
  if (liczba_odpowiedzianych >= liczba_pytan) {
    //wynik = document.getElementById("wynik");
    //wynik.style.display = "block";
    //wynik.innerText = "Brak nowych pytań!";
    //wynik.className = "bledna";
    zakoncz();
    return;
  }
  if (pytanie == null) return;
  odpowiedziano = false;
  pytania.splice(pytania.indexOf(_pytanie), 1);
  var rand = Math.floor(Math.random() * pytania.length);
  wyswietlPytanie(rand);
}

function zakoncz() {
  document.getElementById("quiz").style.display = "none";
  document.getElementById("koniec").style.display = "inline-block";

  // Progress bar
  var elem = document.getElementById("bar");
  var width = (poprawne / liczba_pytan) * 100;
  elem.style.width = width + "%";
  document.getElementById("koniec-punkty").innerHTML = Math.floor(width) + "%";
  document.getElementById("koniec-poprawne").innerHTML =
    "Poprawne: " + poprawne + "<br>" + "Błędne: " + bledne;
}

var id;
var czas = 0;
function timer() {
  if (czas == 0) {
    czas = 1;
    var elem = document.getElementById("timer-bar");
    var width = 100;
    id = setInterval(frame, 10);
    function frame() {
      if (width <= 0) {
        clearInterval(id);
        czas = 0;
        bledne++;
        liczba_odpowiedzianych++;
        nastepnePytanie();
      } else {
        width -= 0.05;
        elem.style.width = width + "%";
      }
    }
  }
}

function zaladuj() {
  liczba_pytan = pytania.length;
  przyciski = document.getElementsByClassName("answer");
  var rand = Math.floor(Math.random() * pytania.length);
  wyswietlPytanie(rand);
}

function sprawdzOdpowiedz(numerOdpowiedzi) {
  if (odpowiedziano) return;

  clearInterval(id);

  var poprawnaOdpowiedz = _pytanie.poprawne;
  var wynikElement = document.getElementById("wynik");

  if (numerOdpowiedzi == poprawnaOdpowiedz) {
    wynikElement.style.display = "block";
    wynikElement.innerText = "Poprawna odpowiedź!";
    wynikElement.className = "poprawna";
    przyciski[numerOdpowiedzi].className = "answer poprawna";
    poprawne++;
  } else {
    wynikElement.style.display = "block";
    wynikElement.innerText = "Błędna odpowiedź.";
    wynikElement.className = "bledna";
    przyciski[numerOdpowiedzi].className = "answer bledna";
    przyciski[poprawnaOdpowiedz].className = "answer poprawna";
    bledne++;
  }
  for (var i = 0; i < przyciski.length; i++) {
    przyciski[i].disabled = true;
    if (i == poprawnaOdpowiedz) {
      przyciski[i].disabled = false;
    } else if (i == numerOdpowiedzi) {
      przyciski[i].disabled = false;
    }
  }

  odpowiedziano = true;
  liczba_odpowiedzianych++;
  document.getElementById("next-question").disabled = false;
}
