// Смена 2 · Глубокий слой. Файл сгенерирован: ответы хранятся только в виде хэшей.
(function () {
  var pack = {
 "id": "shift-2-deep-layer",
 "shift": 2,
 "minutes": 120,
 "name": "Смена 2 · Глубокий слой",
 "description": "40 заданий повышенной сложности: лаборатория изображений, спектрограммы, шифры, интерактивный терминал, анализ трафика и журналов, реверс. Ответы проверяются без раскрытия в коде.",
 "visual": {
  "image": "assets/scenario-shift2.jpg",
  "code": "DEEP LAYER / SHIFT 2",
  "tags": [
   "Stego",
   "Crypto",
   "Terminal",
   "Network",
   "Reverse"
  ]
 },
 "groups": [
  {
   "name": "A · Слои изображения",
   "from": 1,
   "to": 8,
   "color": "violet"
  },
  {
   "name": "B · Шифры и коды",
   "from": 9,
   "to": 16,
   "color": "cyan"
  },
  {
   "name": "C · Терминал",
   "from": 17,
   "to": 24,
   "color": "green"
  },
  {
   "name": "D · Сеть и журналы",
   "from": 25,
   "to": 32,
   "color": "pink"
  },
  {
   "name": "E · Разведка и реверс",
   "from": 33,
   "to": 39,
   "color": "amber"
  },
  {
   "name": "Финал",
   "from": 40,
   "to": 40,
   "color": "red"
  }
 ],
 "skillGroups": [
  {
   "name": "Стего",
   "match": "stego"
  },
  {
   "name": "Форензика",
   "match": "forensic"
  },
  {
   "name": "Крипто",
   "match": "crypto"
  },
  {
   "name": "Системы",
   "match": "linux|devsecops"
  },
  {
   "name": "Сеть и SOC",
   "match": "network|soc|web"
  },
  {
   "name": "Разведка и реверс",
   "match": "osint|reverse|boss"
  }
 ],
 "missions": [
  {
   "title": "Тёмная комната",
   "role": "Stego",
   "difficulty": "Средне",
   "time": "4 минуты",
   "points": 20,
   "story": "Архив «Глубины» открывается снимком тёмного помещения. На глаз это чёрный квадрат, но оператор уверяет: на камеру попала надпись, просто её яркость почти не отличается от фона.",
   "blocks": [
    {
     "kind": "image",
     "src": "assets/shift2/a1-dark-room.png",
     "caption": "dark-room.png · 720×400",
     "lab": true
    }
   ],
   "type": "text",
   "prompt": "Сделай надпись видимой и введи флаг.",
   "hint": "Глаз не видит разницу в 5 уровней из 255. Сузь диапазон в лаборатории: чёрная точка около 15, белая около 35.",
   "success": "Принято. Растяжение уровней — первый инструмент любого стеганографа.",
   "fail": "Надпись есть. Сдвигай ползунки «Чёрная точка» и «Белая точка» навстречу друг другу в тёмной области.",
   "id": 1,
   "h": [
    "bfad81484fda31fe7dd4665a9814b2489881a806d4791ec922c0ff7cf3c05c1c"
   ]
  },
  {
   "title": "Нижний бит",
   "role": "Stego",
   "difficulty": "Средне",
   "time": "5 минут",
   "points": 25,
   "story": "Красивый закат из рекламного буклета ушёл на сервер без изменений, но кто-то перезаписал самый младший бит красного канала в нижней части кадра. Для глаза это шум, для программы — сообщение.",
   "blocks": [
    {
     "kind": "image",
     "src": "assets/shift2/a2-dusk-ridge.png",
     "caption": "dusk-ridge.png · 800×450",
     "lab": true
    }
   ],
   "type": "text",
   "prompt": "Достань сообщение из младшего бита и введи флаг.",
   "hint": "В лаборатории выбери канал R и битовую плоскость 0.",
   "success": "Верно. Младший бит меняет цвет не больше чем на 1/255, поэтому LSB-стего почти не видно.",
   "fail": "Нужен один канал и одна битовая плоскость: канал R, плоскость 0.",
   "id": 2,
   "h": [
    "68d1531b0df9ccac757a89ab74de903d30630b5d434b070c0c48ac194d4bb42b"
   ]
  },
  {
   "title": "Прозрачный слой",
   "role": "Stego",
   "difficulty": "Сложно",
   "time": "6 минут",
   "points": 30,
   "story": "PNG бывает с четвёртым каналом — прозрачностью. На этой картинке всё непрозрачно… почти. Хранитель архива клянётся, что слово спрятано именно там.",
   "blocks": [
    {
     "kind": "image",
     "src": "assets/shift2/a3-glass-pane.png",
     "caption": "glass-pane.png · 720×360 · RGBA",
     "lab": true
    }
   ],
   "type": "text",
   "prompt": "Найди надпись в альфа-канале и введи флаг.",
   "hint": "Выбери канал A. Различие между 254 и 255 тоже придётся растянуть уровнями.",
   "success": "Верно. Прозрачность — это отдельный канал данных, который программы просмотра почти не показывают.",
   "fail": "Выбери канал A (альфа) и сузь уровни вокруг значения 255.",
   "id": 3,
   "h": [
    "f22f6016385d704dfe3c1b3ab235b369f94fe8a3687a4412ec73ee9614fd6071"
   ]
  },
  {
   "title": "Два листа",
   "role": "Stego",
   "difficulty": "Сложно",
   "time": "6 минут",
   "points": 35,
   "story": "Двум агентам выдали по «случайному» листу шума. По отдельности это мусор. Если наложить листы друг на друга по правилу исключающего ИЛИ, мусор исчезнет и останется послание.",
   "blocks": [
    {
     "kind": "image",
     "src": "assets/shift2/a4-sheet-a.png",
     "caption": "Лист A",
     "lab": {
      "pair": "assets/shift2/a4-sheet-b.png",
      "pairCaption": "Лист B"
     }
    }
   ],
   "type": "text",
   "prompt": "Совмести листы A и B и введи флаг.",
   "hint": "В лаборатории включи режим «A XOR B».",
   "success": "Принято. Так работает одноразовый блокнот: пока лист ключа секретен, шифртекст неотличим от шума.",
   "fail": "Включи режим «A XOR B» — он вычитает один лист из другого по каждому пикселю.",
   "id": 4,
   "h": [
    "3d22de524e6fa49df6e75ac79ff35403e45593ec232750e2fa9151fb5a5f880a"
   ]
  },
  {
   "title": "Пиксельная телеграмма",
   "role": "Forensics",
   "difficulty": "Сложно",
   "time": "7 минут",
   "points": 35,
   "story": "На картинке нет ни текста, ни штрихкода — только ряд цветных квадратов. Радист признался: «Первое число цвета каждого квадрата — код буквы по таблице ASCII».",
   "blocks": [
    {
     "kind": "image",
     "src": "assets/shift2/a5-telegram.png",
     "caption": "telegram.png · 11 квадратов",
     "lab": true
    }
   ],
   "type": "text",
   "prompt": "Прочитай слово из 11 символов (в нём есть подчёркивание) и введи флаг в формате CTF{слово}.",
   "hint": "Наведи курсор на квадрат в лаборатории — снизу покажется R, G, B. Нужно первое число. Например, 112 — это «p».",
   "success": "Верно. Любые данные можно спрятать в цвете — достаточно договориться о таблице.",
   "fail": "Прочитай R у каждого квадрата слева направо и переведи числа в буквы по ASCII (65 = A, 97 = a, 95 = _).",
   "id": 5,
   "h": [
    "64f3741312c54c906e0a5450249123bca0d1da47839ef918fe29b1485f600c21"
   ]
  },
  {
   "title": "Зеркальный QR",
   "role": "Stego",
   "difficulty": "Сложно",
   "time": "6 минут",
   "points": 40,
   "story": "Пропуск в хранилище выдали в виде QR-кода, но печатный принтер «отразил» картинку и поменял чёрное с белым. Сканеры отказываются его читать.",
   "blocks": [
    {
     "kind": "image",
     "src": "assets/shift2/a6-mirror-qr.png",
     "caption": "pass.png · зеркало + негатив",
     "lab": true
    }
   ],
   "type": "text",
   "prompt": "Верни QR в нормальный вид, считай его (камерой телефона или кнопкой «Распознать QR») и введи флаг.",
   "hint": "В лаборатории включи «Отразить по горизонтали» и «Инверсия». Потом наведи камеру телефона на экран.",
   "success": "Верно. Сканер ждёт тёмные модули на светлом фоне и правильную ориентацию угловых маркеров.",
   "fail": "Нужны два действия: отзеркалить по горизонтали и инвертировать цвета. После этого код читается.",
   "id": 6,
   "h": [
    "ddd70ad36d1e8e19c7d0a47228af8b4f324f8b81e2d84aa977fa46c187cee33d"
   ]
  },
  {
   "title": "Хвост после IEND",
   "role": "Forensics",
   "difficulty": "Сложно",
   "time": "7 минут",
   "points": 40,
   "story": "Этот файл открывается как крошечная картинка. Но он весит больше, чем должна весить картинка 1×1. Ниже — его шестнадцатеричный дамп.",
   "blocks": [
    {
     "kind": "hex",
     "b64": "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAG3RFWHRDb21tZW50AG5vdGhpbmcgaGlkZGVuIGhlcmWZGfVMAAAADElEQVR4nGOQE7EBAADCAG+7/hBFAAAAAElFTkSuQmCCUkFWRU4tTk9URQBRMVJHZTNSaGFXeGZZV1owWlhKZmFXVnVaSDA9",
     "caption": "mystery.png · 147 байт"
    }
   ],
   "type": "text",
   "prompt": "Найди то, что лежит после конца PNG-файла, расшифруй и введи флаг.",
   "hint": "Конец PNG — блок IEND (49 45 4E 44 AE 42 60 82). Всё, что идёт дальше, просмотрщик игнорирует. Хвост похож на Base64.",
   "success": "Верно. Данные «после IEND» — классический способ спрятать файл в картинке, и просмотрщики его не замечают.",
   "fail": "Найди 49 45 4E 44 AE 42 60 82 и читай текст справа от него. Строка после «RAVEN-NOTE» — Base64.",
   "id": 7,
   "h": [
    "c9f310f181175127cd1307f6c6b25da2abab5574c5a863a8f2d34ca19e1fbbce"
   ]
  },
  {
   "title": "Эхо под шумом",
   "role": "Stego",
   "difficulty": "Эксперт",
   "time": "9 минут",
   "points": 60,
   "story": "Последний файл блока — звук. На слух это шипение с лёгким писком. Но если растянуть звук по частоте и времени, получится картинка, которую нарисовали тональными сигналами.",
   "blocks": [
    {
     "kind": "audio",
     "b64": "UklGRiTVAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQDVAAB/goV9e31/f4F9d3+Ce4V/fIR3en6CfHh+hIR+f4CCfoV6iYWDf3p/g3+CgoOCd4F8fnqCgIKGg4GDhX2Ff4B4hYOBhYJ9e4GEg4N+fYGFfYJ6fH2AhXyAgoKEfn6Dgn5+goJ9gHuCgoqAhIN/eHyCen+AhHqDe4CAh39/iIGKe31/gXyDfn6EhYB/gICCf3d6fX+AgHV7gIZ9en18fIB/gYKIgXp9gX+CdoKAgX+CfIB+goGBfoGCfIGDgn6DhIJ1f36DgIR/f3uBh4B/f4R9gHl8foCCgHqHgHqIfH2Df399fH18eX+Af4N/f318h3iDhH5+en95gXZ+goF/g36AgIeHgYF9f36Af4GAfXuCgX+AfYF/eISGgX6BeoR5hYB8gH6Gf3eHg4GFgYCAhoF6en9/foJ+e3mAgYGCg3+Ahn2GhHZ+hH6AeYGDgIOBfICDg356f4B8fYCAhYeGgXl+f3qAfIB9goSAgH59f39+fHuCeX99hYB/g395gYF6fXt/gHl/d4N7fX9+fnqCf3t8gnmChX18foKGeoWFf4V/f3qDgIB+f4B/foB8gIN9f39+f4OFgn+BfYN+f4GBfH1+fX2GgIJ/hIN5e359iIR9hH6Dfnx9gX5+f3iCgIF9gIJ+gn9/gYCDgn56d4GAenyAe4V7f4ODgX+EgX+BfIaDdnx4g4KAfIKEgHmBen57hYB/foJ+gX96g4F7goSFhISChnx/f4V6fYCJfoB8e4GEgoJ3g4KDg31/en1+hX98gXqAf32HhHyDgX11fYGHfnuCgn2IhYB6fnuCfn9+g32IgIN/gIF6gYGAfYGFeXR+hH+CgoZ5enuDfoR9fYCEgYJ3e3h8d4Z7gISAhIGFg4SEfIV8foOCeYV9f3x9g39+foiDiISBf399eomCg4KAgIB+eYB9h3+Ehoh6doZ8gX55goR+gX9+g35+fX9+f36CeoB9fYCDhoSJeoB+gYJ8fn5+g4V7g4CFeIWAgXp6fn2DfICDfoJ7gYCGgoGBgIJ8fX+BgYR7gXSCh319goJ8foB8fICBgYOBeHqAeYB/hoCEgYF8gYGCfH2CfnyEeol/fYKDeoCFeYOIgYF4goaIg4aFfX1+gneBd4J9eoN5e4CCeH+DhH6Ef399fIKEhXyBf4R/fHqIf4d4h358gH2Afol8e4OAhnx8e3qEgYV+f3+ChoJ6hH+Gf4OEhYCDg3x/e3uBf4R8gnx+gn+DfniAenmBfoJ/fX9+fnqBgYSCgHuBgYKAh3p+gX98g356hYZ9gX2AhoGCgYB8g359fYKCfHh/d32Ce3h+f4GCfX+Bfn95gISBhISAgn+CgYGCfYV8hYF7gIV/foCAf3p+g4p9hH1/fYF9fX+AeYJ9goiAe4F9hHuFhH6Hg4GDfHl8gomBgoGDgoCCgYWCfX2AgH2Eg3t7e4R1foV7eYR/gH59gIN/g32EhnmCgIJ8e4F+fIJ4fIKIfoJ+e4CBfHqBeYF6hoJ8fn6Ahn+BgYB/g36AfoR6fnmAfYN7fnqDhYKCe396gYZ0gYWCfnt6gn5+hX6BgYN7gX18gn+AfH+Af4CHf356hIJ6fYCBh4B9gX9/fn6AgoOBgYCBgX6De3x/g4CCgIN+fn6FhHt+hYN+g4h+g4GAeYR8f3l+e3qIfnyAf4N5jHuBfX1/gH+Ce3t7dYKCgH6AgISCgnqBgXl/gn2DeX9/god+e4J5hICBhIJ/h3+DeX5/fXp+fnyChYGEhYZ9g4CAg4mCgoN3hX6Ggn2AfX2EiIeEgn6FgHl6gn1yhnyCeYF8gIGCgYF9en5/hYGAg4N9f4Z/goN1dX6Ig4WCf4CJe3x1g5SDf4Fqh6h+g4NPfqB7j4xfdpOBkoWAdnKAg4KDiXyAgHmCgIF6fYF7e4V7eIuBf395gnmFiHZ7hH+Ef4CAeISBd39/fICBfn2Cg4R8hIKCgYJ/hIZ/h4KCfIOMeYCDfH5/goB9hoF/g4J+hoh8foN9fW+AiH2WjVx8gXGhml51em6Vnn91fHl/j4V7f4mGenl+eIeBgX95fYOBe3l+goJ9gH6Ff4GBfH17fIODf4KAfn96h4aBfXx8f4WBfXeBg35+goF/gIB6fICBhoCBfnt+e4GDhoF+fIJ2e4aCfnqEiXB8hH2NhXhybpaOa5xuTJuaeJl6X3aAjol5iHZ5i4Z9f4GFfIF5e4eFhnx7gn6Fg4OGf32Ad3uGfoaBfnx1hId5f4R8f3uEfHyAfIF9e35+eYl8hoN5gYOIfYB+gHuBhId+foZ2gXuAi4GFfHuAf36Bf4eGeoR0eYuKkHRjjnV6unpSkGpzo4mHd3OEeImIe4F9gX97fYaCgn2HdHuFeIZ7eYx/gn16fIOCg3mBfX6BfIJ7f3+Cf3yAgHx7gH56d4uAf4J/iH1/enl8fYF/gYZ/gYKCfXqBhHyAfIGCfISFeYCGfH1ygIOAi3Zzd3+heH+STWOteYSSaW59hYeBgYVzg3+EfoCDf36Bg4J9hIN/hIF8g32Ag3t9gYJ3foGDgIF9fXl8hXiAgIiBeYCAfIGGiXyEgYB/gHyEg4J/gH2Cf3+Ffn6CgH15gIGDeoODdn6AhX17fYCFf3eEdYSTiYNkcJBhn65Pc4Zhio6OfnF6gXqFeoN6d4Z9dX+FhH5/fHuAfoZ+gH+DgoF3fYOAgYd9eHyChnqFgn53iIKAe4KDf4B9gHqBhIF8gX+GeX15gYZ7gn91gHuBf36Ihn16eYB0hoSBfH6Khn2CfYyAhI1uc3eKlWeVezuUnG6ahWZvfZCMeIJ6fICJhHuDhoZ+cXl/gIiFh3t5gniBfH6Jg4V9enyAhYCHfoGBgn2FeoGDgH53gIWDeICFfYGBfn94h4eDgnuAfH2KhIN7hIR8eXyAhH18f3iBgYeCeoWCg39/dnaOlIZ2W416ar+ITJFrcJaPh2x0gnR/iYqBd36HgHh/jIN+g3t9eoF9g3+BgoR2hHqCgX9/eHyDgoKCe4GCgHiCeYGJgoJ9goJ+eoV4d4GHgHuCe4d+fnt2f4B+hHiEgIR+d3x6e4h/hH2HiHmDgYGGfop2aHeJon1zpk1Urn99mXhwa4CQf4GBgHt8iH2Fd4aJgoR4f4N5hYOBdHiEgHqAg4d6iYN6fXuHeX99d4aBfoSIgX58hH6HgYN6gIZ/gH2FiXx6eoF9foKBiIB9gnmHeIKDfYR8fHl9in98fX6MeXh3eH6Bkox/ZG6RXo7AWGeQXn6PkYhyeXl7hH+IfXeGfoF0fX+GiIWIe3OGgYZ4e4OAgn9/fX2IhIV9f4d/fnx+g3uEgIt+foSFhH59iH+Bfn6BenuAhYV+f3iCeX+DgIOFfnx0f4GAhoOFeoGAf3t2iYKDgH+IbH+JlptsiZE/jq1ulYt1b22IioN9gIF1h4V5f3+Cin6Bf3h8f4aDgXiFg3iBgIOFhIR+e3h+h3p+en6BfYN7gHmAiYJ+fYCDhHqFe398hIJ6fYSKg4R/f4N9gX6Jf3+Bg4SAeXp7hoh6hHWHfX59hYB0jpd8c2SDi165mEmHdmSOkJF4anh5foKDhHqBfoGCeIN8iIOAfXmAeoaEeYOBe4N5gX17goKDgnp+gX59d4CBgod/hH99f4CIgYF6hId7f319jXuAfn+Bh4eBfn6FhXt/en+Bhoh9hX2EfoKCgYaAgn6CeWZ+ipiNZqJiSLGMcpp4cmZ4j4OLgIF+f4N3f3mIh4SGd4R+gYSChn57fYCHfH2Cf4J9gXx8eXmAhHl+iHt4e4N8hH+FfX5/gYZ9fX2BfH1+fHx8g4OGiH6Df4iAfnqAgIKJgnh9f4qFgoCBhXx+enV0epqNeHBsk3F/yGFnlGp2f5WQZ391fYGCfoWBdYSAdYV5g4t8eYOBe4KBeoWAhoZ+fHiAfXiEfoaAgHuEfnaEgn2CgXuAenWGe3l8fIODf36EgoSHgHt9fYF8f4J8f4CBeniEeY6CgHl1kH14goFzhYt9jXBli4aVeH+PRH6ycpCLe3BklIh/h3qEgH98h3x2i4OGgnaCfoSAhHl9gICHg395f4Z/cXyAeXqAgnZ8gYZ4d35+fnyCeYF1eIqDfH2Cf4F8e4J+d4OAgoCAgn6Be4WBgYGDh3+BeYKOfICGfXx1e3SHeoKhc2lydI9npqNWgXlze3yrgHCDbYKBgH+DfXqEfnl7eoGChIWCgnl6goWAf4WDgnuAh3p/hX6BeXp+f32BgYV5d4KKfIN+fYSAgYF9f4mAjHaHiXiIhYCAgn9/h399hXyEfYCGfXx4hIdyeoWDgoeDe4RheZKNh3aVeEikk3GVgoVXeJmCiIN3hHp+fYx3fY2Cin2Dhnt6hISDd32BhHmHfXt/fH96gIGAgoR+fn98eId+fnt+gYGCfXeAfYOCj4Z7e32AfXmIgoJ8g4ODfHWHgIh+fYV1g4CFfnJ+iYGAeXR8h3eWn2x0d399erp5YIh0gX2Ym2Z8gHR/h4WFfneBiIF9dYaGgIqBgXyAgoSEfX97fIR5hXx7gXeIgHx7hX2FhICEdn+AeXp5gYd5goaBeHx8gYZ7gYR2gHyDgXh5hYV+eH96hXeHiH14fn16fX52hIaFeIZ0XI6Ph4J8jk5ppnyNgYhzXYmPfI52fIB7f36JgX6Dh397fnuHhH6IfHh+f32DgIB9f4l/fX52foZ+f3+AgHqCfn2AgISAf4F/fH+Ah4J3gn9+foKFeoR6gIV7e4J+gIGMfXh4e4N8gnd/f4B6fIJue4OApoRcgHSFb5myWHCAb3x0popyhHJ/gIKBfYJ2foWEfHeLfoWEe4J+f3+EgX14gn6AfYB/gX2Cg36FeoKAhIZ2gIWBfIKBeIOCg4R9f3h6gXqOhYF5fH+KgXyEi36Hfod5fIB+goF7f4aDd3t9fIGFi3uKZHOYhoeHlHxJk6J7j32OY22VfouIfIR5d32Fin1/gYd/f357hYGDfoR7fIF/f4GEgYWBen17eYWAhH9/fnmDhYN+g36Df4R9f3eBgYl/eoJ8dH1/f3yEfYWHeHt+gX6HgnKDgHZ/hHeBiYWHeIJ2cIN4jptrdnuBeHW5h1iJe3t6kKVvcH1wg3uKhIGBeYmBgnmJh3+OeHt/eH5+hoF5eoSAgYJ/iYF6hnmBfniCiYOCfICBen1/eX6Bf4N7fXWAhXyFi3p+fYJ/gXyEhIN/fniAeIKFf4p8fX2Jg398gXyEkoKAgFWJkn2Jf41eXa2LhoZ+e2F+kIiMdHt8eHmCiX96fomHfHuAfYV4h4N9fniCh3t2h4eDfnl+eXuCgox+gnx2hn57gYZ8gYd6gXx+in2DeX+Fd3aGgICEen+Ef398gYN5jX18fn5/hoZ8gY6IenmIdHaGe6eBaXp2h2+Ut2VngXZ4cqGUaH9tfIp7iIeDe3aBhnx+hIJ9eoZ8gIOBe4x7gISCg3h/hYaCf4GBgnJ/iYKDf4F9g359e4F/hYKGgoV/gX+FhnaHe313hXx2eoyDe3l/d359gY2CfX2Af4CCen6Agol9imVvooaDhoZ8SYejfo2Ai2dimoyKinyHenqBfIqCf36Kfn6CeIl/fot6dXx4hn95fYh/hoKAgHqIfIOFeXyCfHuBgIGDfoCDhXx3hoR3gYSIe317gImCfHuLfHt+g4SIg4h7gHd9hIB3hH+AhX2EhHh/foybaHF/d4Vxrpdcd4J/dX+reHJ7boKAhYKFhXN9eYR5gIWBh4CBg3qBeXmEgn+Df32FfYGAgnx/fYV5goeDi4R8gH+AfniDhn2OhXx8eHx/hIRzg32BgIJ4fol+goCBfHSCeoSEfICGiHqAgHmCfIh/fX5VhZeCjYSVV1GmioJ+goZYfZWJjIB9eH+EgIKMgHV9ineCeHeDfYN/f4Z1gX2Bfnh+f4V6fnp8gH+Dg36De3GBhH6ChXuAfYd9eYWCf4qAf3p/fniEiIF+fXmFgHl5fo6DfHt2fIN9eox/eXiCgXp1fH6gjWGFcHluhLloX359gnSSlGZ4dH+FfIJ6foR8e31+coh9hIB8fX6DgXWCfX9/fnqAgH+Ggoh7f4Z7fn91foOEgH+BeICBgn2DfnuIhHl/fIl/hH16gXKEf4d8c4OIh3R7e32Mhnp/fXN/g3yFfXyPe4tmY5iLgIuLh0V1q4eDeolxXJOPh4t6h3+If31+g4F8jX54gHWCgYd8eIB9foF5fIGEfnuDfXyBgX59goB8gn98f4B9e4aAeId6fIeDgYODfX+Efnh+iX99fnl9hnuBhYqHfYuBe4SAe4GJe32BgoRqfoKBpXBvfW91b6ymWm18iIF5poRtgHCAiYR9eYqEhHp/e36JgYOBeH54hXt6hXqDiYF8dYV8gYGAfIR8dYN9gYR9hH57e3mEg39/hoF+hHd9gICEiH6DfXuHe32BgnuIgHh8h3qEjoCBgXx7gYB7inyNfHqBYImNc5aJjVxEoJ2PfGyPbnCYgoJ9fH97f3mAf4x/e4J9f4l8hnuHhHp0ent8hXx+gX2BfX+ChomFfHqHfX6BeoGAf4B/g36FgYKBgYGAf4B7gHuCgniBhX5/fH1zhoV8eoGJgIN7coyGgnmGfnl1eINzjYtkl3Nvd4nNgVF3d453iJ10ent2iX+Jf4iIhXZ5gn59hXGDiIN8eIJ7gn6Fg4WFdoB7goV/inl+hYN9doZ+fYaBfX6EhHyDhnuAgX6Hg3mJf4R+fH+AfX9+doB+enl8fIB7ioiDhX16f31+eYWAhHmGd2mQd3+ciYpDXq+bjG15iV6Oj3uMhId7fX92hIKDdIWGdX95fIB8gnmEgX56g4R6hH+AiH+He4eGfoB9gXx+eoJ/hoV+hoV+fH+ChYCCdX+Ae35/hXyAhn+DeIB7fYZ8gn19fX2CgXqEgIWAfXp5cIZ/gJRzfpBidGmwv1dgc4aVcJCBcI54fXh9iH5/hHp5eoF3iH1/h357en+GfoGJfHaBg4KBeIh8goWBg3+BfoB/fYF4fIV+g3qDhoGGfXt8fXuEg4F/e36De319fnt/f4CCfIJ5e4R4iIp+fn16eoKBh397hml6i3CSlJRoM5GwiYJnjXZojn2ChH+CeoJ6gHyDgXqEdn2DfYl/gIR9gXl9eYB8f4GEfH1+gIJ9hIN7f4J6fICBiYGCe3p+eX2DgISCfIWEeoN+gIN+hIuBfX6AfHx4hn1+iW+Af36LgoGIhXR+fX59f4SMbpV9Z2+CwI1RcG6dg2yXbXyFd4N9g4d+eYF9eIOCgIB2gX1/gH5+ioODf3x+h3x/fX6HfnuAgoB/g4Z+enyEgoqGg3yEfYJ8gYCBe4N4hYCBf32HgICAdXuDhH+DgH1+eIB6eYqBgYd8fISOgIiGjX1ii3VzoI2TTFOtnJJxa5FtgJV5gXh/fXeEhYB5hoN9hHSEfYeEeoV9e4CFf36GfHyBeol9gH98fYB5e4B3gX6BiYN8f4B+gYSChYV8h4KBhIh/g3x+hHmDh4F3eIR9eX6BhHKFgXV3gX9+g4d3hHyFen6ZfHeRYnNumbpeV3R7mnN/lGx2fXx9gYl6f4J9dHqDfX6FgXx6eIN7gYOAgH+AdIGDgYJ+gn59hnuHgIN8fIN/eId5gX9/hH5/fIN9hISFhnp7fIB/fnt8f3aEf32BgYGBeYWAeoOFe4N+g3uFfH+CfoVpfYRti5KTeTiEsJSFYn2FaomJfoGAiXmCgXyAeot8e4t0fIGFfHx9fYCAfYF6fX9/hH+Cf3x+ent+iHx+fX2DfX+GeoeFfX52foJ+gIh9eIWDe4CBf4R6iIl+gYWBgoN9goCAiHx9g3h/jYt9gYF6enKGhm6XfmZsdLeXUmtrlZhrj4Jtfn+IhnmEfnp9iHeBhnh9fn+EfIWLfH2Cg36AhIKBdoB5d4KChIF9f393g4R+goZ5hX5+gIGEgn56gYWBhoSCfXt6goCFfH19gHl8g35+fXp8gX+CdoaDe3iGgXWKgY2Ba45xbZuNkl1KpZiEeFyTf3SXf318d4R/g4eDfn17eYGFfoB5fn1/h4SBe4B5eoSAgoR4fn55iHl7gYJ/gX6Kh4V/fn59f4B5gH5/fICFhIKDcniBgIOAdH55enZ/fn2IeYR+goN6iIB5e4eCh4x/fnpzk31/nnBua43Dblp8eqZ6d5BmdHyBh3yAhHx4goN7g35wgneJgn1+gnR7hn9+fYJ7en6CfYGCgIJ+eXZ/h352gH6Dgod/e36CfoKCgoN7fn99i4CBgH58dnqAgn2Gg3x7g36CgIKDfnqIhH6Cfn93hIJ+foV0cXqcnG5Ycp+bdmZxj4l8iIV2e4CJfHyCf3WAhH97e3+Cg4aHf399fX+CgnqAeHt6g4qFfIaBg36FgoF9foWFfIGBhXx3e4KAgn1+g4J+gIGDf4B8g36LeIN5gYF+e4KBgoR7hoJ7eoCAfn+Dfnd+e4iAjpNwX4CklGRefJeJeYF7fXuDiIN2gXx/foJ8eX+Ahn+DgoODfX6Efn6BiX+Ae3iFf4CAhoB9foR/d3eCg4GDgYB8hIR6gHuBg4GAfnh/e3x7hXuCg4CDh4R9goR9fn97hHx+fYaEeIKHiIF7e39+gpGKcHF/lopta4iYiGxrhpWIfn17f4OBg4F3fH96foJ4gH+BiIF9f3qEeH57fHt7hoR+eYGAeYSCgnx3gIF8eYV+goKGgnl9e4eFfnWEf3l/f4R8fIaLgnh7en5/iIKAfoSAg31+gHt9hIR+fo6AfIGEgnV8hYp8dnd/h4Jyd4OAgnx/fX2Gg3d5f4B+e36Ahn17g3eAgoOAfH59e4GCeXp/d4OIhYN7e4R+f3d/fIOHhYKCeYSKgYaFgHp8iYB9hYF6eX2GhXyDfHuAg4WGf3p/g359gYGBfoGAfYqAhIB+goN5fISDen19gXp6h4d5f3t9gH6DfoJ2goF8g4eBgn+DfIKDfoF8f4V+goB+gXx+f3+DfnyAhn6BgYCAcn+DfHeEgn5+g4F+hHiJgXt5e317g4CAe4ODgn+Efn+ChoN+gYKBhH2DfYSBeXuAd358foB5gYSAg319fn2EeIZ9hX2CgYGBgYWAgXyCfn55goWCgH1+e4N/f4F7g4V9fn6EdoeIeX2CfHuCf4F7hIODgIB8fIF/e4B/f3+Ff3+AhYGDgX6Af4h8fnt8fXl9f3+Df4B5fXuAiIKCgX+DgISIh4OAfoB8hn+AgIGAfYSCgnd/fIF8hoF7gX+Ad4SFf4J7fXx/fYODf4N3f4aAfX6HfomGgIODgIB7gIWAfX16fnuFdoZ7fX5/ent6hHx8hHx7fH6Dfn1/hXuChn1/fH5+gnd7goh8gX6BfIaBhH6Fg4N9iHt/fX98foJ/hoCMfYKCfHeEfoCDgX19fn2IeHp6en+Fe4V+en5+g4J/fIODiH+BfXt/foB8fX5+fH6Af4GCfHqFeXx+fIF9fn95e3V+gX19eoN+e4CAg4B7fH9+f4GAhYB+gYGCfX6AgH6AhISJgYF9gYaBhn5+dYN4fH2BeIR8g4KBgX5/e4R9fH6Cf4F9hX+AfIJ+fYFzfoGBgXx/gn2AgoGAfoGBgX2DgX+Ben2AgICAg4OBgYGJg3yGfIR9fn2DgH+Ef398e3uEhH2EgoF9eIKHgYF/gXuBgX1+e4R+e31+gX+BhX55fICBgn98gH+BfoCAfYF+eoB5f4CCfYB9fn1+en99gYCBg3yCeXt+ioB9fnl8fYKBgoJ+gnt+e4N3f4F+enqBeYKBfHl6e4GCeX+Bf3t/gISBhn+Dgn99gIF4gn58fn2BfHx+gH54gYGBfYWKg4GFgH+Bh4B8gYJzhXyBgHyAfXyBe3qBi39/fYJ/g3x9goN9hYF/fIB6gH2BgH6AfYB9gH5/goJ8hHuBhIKFg4CBfXx8goJ+g4R+hYd+e35/fICAi398h3x9g3yDg4KCf4J4g4SAfIJ9foV8e4R6fIKBf4WBfYN6e3t+fnl6eXh9e4B9en+Df3uCgYN+fYOFe35+fId8fn+AhoB6hYKAf3qEe4GChH5+gIR8iHmDfX+Efn+Ff314fIWBent9f4N9f4KFfnt8f3+BhXp+gX6CfISEfXmDjX6AhIV/ioCDeoJ+foR8goSDfIN9goV5gH+AgYJ/fX9/foGDeniEen17goF+gIOBfnyBhXyGe4GBf3mBfIJ6fICAg4J7fn2AgIN+fn95gYKAgoV/fXx+gH+CgIODhHx+dnh9gniAfnmCfIB9hHyCgX+Be313g4OEgIKAgn5/g4OEeXuAg3eAfoCCeoGJf4J/e4KDfn5/eX96goOEenyCgn+Cd3uKg36KgHyBgXuAfH95hIV6hoGBe3uAhX59gnx2gXeBgHt/hH6Ae399fX+Efn6GfHyDf36Fe4J9f3+EgYB9f3qAe4WGhXx9fn+Bf4eDf4OAg3+AgoCEgIB/f3+Cg4WCgoWAhH19g36Agn+FgHaGiX5+f4aDd4F8eoB6eoaCfoF9eod8gYCBgH5+fIZ7hIF/hXt+gHyIf31/f3yIgIN7f4eBf399eoGCgHuCh4F+f3h/gYKDgYt/e3uAfX6Eg4N7f4GDfYWBfHx9f3t+foKDgIGCfoCDgISGfoF+hH5/gnqBfH6AfH6HgX98goF7e4V9f4WCdoCBhH58gYGBgYN7goF8fIB9e4F9fn1+eoB+gIKBgXx6gIiEg3uCgIB+e32Fg31+eX97fXx6gn2FeXuCeHx+gYCBfYKAgHqDgnyEfnqCfoF6iHyDgICEgH59hH5+foGAf3yFf3yFfnx/fXt6gHmHgYB3gIJ/gIKDhIN7eXx7g4d/fYR+g316fX98iYN8e4CBgoJ8gnyBgX6BfYWGfHx9goN8gIB+f32Bh4KAg3t/fYeFhHx6f3t/fn6OfoR+dnp2hX6IinqDaH1mdul8OIF5jo6AiHSCfIGAeoZ7fn9/gXx/eYSFgoh7fXp8g3x+f4mIhX15g32Gfn96fHuBdoF7g4CJgnh2hIOCgoN/f31+eX+CgIB9gHyEg3iEgH2AgoWCfoB7f4WBg4Z9f4N/fYN9hoWIeoB8cYd4k46JnSlQyoh/gWh+doSDhYd4h319f319eIKFgYJ2hYJ+f4F/fYSAf3t/hn1+g32DeH11fICBhH59fX+Ag4B7hIOBf35+gH16gYWAgneCfn2AfYGJfISAhX59h32BhIZ8e3l/hoOFfnyCfX13eoiDjIOHe2h8TLHOPmCHfZF7joJ5fnd/e4WDgIJ5fnt7fHeEhYF+f4J8f4WDhICFhX18en98gIWHfoB9en2GfIOBgIWAhHyGf4J9fn96fH6BgXyHeoCEfH19h4KHfoKCfn1+fXyEhnyAeoKCd4F9g4R/f3iHcn17d5F1oG0cocB5jm1ygHOIfo2BeYRzeHp1hoKEfYKCfHt/hHyGf4R/eYCCgnd2gYODe3+GgoF+iIWBgXyEeH5/fISEfHp5hHt8goF/dYN9g4KCgn9/h4B6fod9gn6CfnuDe4B9f4l+goCEfnyGfIl+joyBf2d3bWriji96eoORhI1/fnl6hH1/h4GLgH98fn6Bg4d9gIGAfISBgYGDh4V/dXx9gYWChYZ+eXeEf4CJgX1+gnt+fHyEf4WEgYGChoGEgoV/gX6Af4B/hnqJfYJ9gId/hoSAgn55enh9eYp+iYB5fnWBdJGTh6Q8SceSgI5pgHqCiIKHfYN+dX15iH2Dg3yCe3+Bf4V3gYF/hH6DeX18gYWCgYB7d4CGf4OAgYJ8gX+Gf4J9fH+BeH6DgIKIhIqAenx0g4KGgIB/eH2Cf3+GiYR8fHp+eoeCfYl8hIF/fX6JfY6Je3RqfFif101Si3qPi4x+boJwfoOBfn6Ge3p+d4B9gH9/hnx+d396hX+AhYF8gXt+e4WEhIOBg3h8gX2AgYSAfIV4fnt7gX57f3p7e4F9iYOFgn6EfoB9fISDgYJ+eYCEeoJ8f36Dg4F/fYGJgH57fnx2g3mRgZmCH4jCeId1b35+iX+Gg4CCd3t6dYd6iYB9gXx/goGBhoF4fn18f4B/eoSFhIV+f3iJfIWFfn96eXt+goN5hXt/dH1+fnyAgXZ9e31+gIB8jYJ+f4F7gIiBgnl9hHx8f3t4f42Gf4BzhXuGeoSOeYRrfHRj1aUye3qGkIKKfX16eoF8goGFf4GBd3+GeoWGgHuAgnuGf4qOfX17gXh+goKGgoN7gn17f4B6g4J/gn19gYB8gYGJgHyAf4CAg4CEf31/eH1/g4KFe39+d3yCfIaAgIV5fX2DfniAgop9eoF1i3yEln+qTC7Bo3WEan50fYZ9in19eniAeoODhoN9fnyDeoWEfXuDgXp5gH6Cg4SEf35+fIN9gX+CgYGCeHp/gXx9h32Cf4J8gX6AhXuEg3WIeoKBg39/gH6FeHqGeoiCf3x6fH1+f4WIe4N/gYKAh3yMfn9+Z4NckeFcSYp0k4GGhnZ/d36EgoZ/hoF+hHd+fHx+hIR9gX+HfnyAgYiEgX58hX+CfHt9goB+hn98hHp9e4F/fX98hIB7hnx/g4V+hIR+hYN9hH5/gICIhH18fX9+e3qHh32Fen15g4CGhIWCfoB4dIV3knyOjx9wyIGIf3Z8dYaFh454hHx4fXuBe4eAiX97fIB9g3uDe3p9g3x9f3x3fYOCd4BygnmAh4F9gXeCgH+DgH18gn97fIeHfoN8fXx7i3l8fX17hHyBfnt/f3+FgIZ0foZ5hH6Cg4F/d3h2g32DiHqHdW10VsTCNWiIeJF/jH92e3V9gISDgX+Egnd/gYF+gIh4foJ2hH2AhH9+gX19foF/fnuMf319gYJ+e4KBhn+CfX19goSIgYKBg35+gH9+gYZ/f3+AgX6FgYOAfIR7fn99gYGGd4B4doZ+ioKAgX2Gc3t5f5R4nV0osqh4iXB2dneCf4qEh3x7gHCDfIN9gIF/gHl8g4aHd4B/gXyAf32HioJ/e3x8gIh/hHx5fX9/fH9+f4Z4fXt/g4GFhYV8gn58gn9/f35+gYV9ent+hoWDgYJ9gIB6fH+ChH6Ge3t4dId6iYmGhmZ9aHjidUKCcIuMfop3dnh4eICCeoB7gXt3gXd8iYSGc318f4F8fXmBgHuFg4OBfn9+hHiGf357f31+fX16f36Bg3mHhHmBgXh9gnyDgYKDhIKAhYKFhYR5d4N4f4ODfoV4hnuAhH5/h3x1g4GEd3edeW2GfJtjcJ92g26Hmml7iYSLcoaAfoB7dnmGfn6DfYV7gIB/foB8fX+DgX59hoJ9g4GFfH1+fYF9fH+HfIGCgIeBfYJ7gIGHe3x9g4GGhoF5iH1/fIGFeoV8f3qAhnaCe4CAeIWCfoKAdX6GfH2DhJBndZt4gGyNoV6ChYiHV4mPcoB8ioJ5gXx6hIVxgIt6gnmHfYKBf4CCg4J+g3qGeIKHeoB9gYSBhX9/f31+coeDg3eBiHx5gYB/fn13f3yAd3uIh32DgYKAf319fol8fn6AfYJ6hHl5gH2Kg4R5fIR+hWyJkmiGfpCJV5ieb4JulXtljXZ+eHKKgH2Df3iDgnmAf4OBe4N/f3R/g3+HfIV8gYN1g4qBfn5+fn2FgoJ6iH52foGBfoKDf32HeX6FgXqEe4V+foR8hIV6goR8f4V8hn52hXyGfXSJf4OAenyFiHV5fIqAZpGNeXtoon9cjoCOemmcf3aAeId9foiCfIF8eYqBfYB6iH99gXqEfH19fH58f3t+f3J+e4SFd3+DhIWHdn2EeoF7goJ8gHZ/fYB8fYB8fH99hnyCf4V5fnt8gX+IgXWGgHt6gIh6eoaAgX+CeYaCg3ZtmXtwhXyRaGugfn10fpptfYmAg3WChoJ5fX91hXp8f3yIen2Ff4J+gn5/hnqAeoN9gICEiHmAen15d4GGhoN2gYGKf3+GfH6Aen57f3h4hISAf4B/g395hYN/fH+CgIp1fIR9iHp/hX+CgX99jH97hX2NcHeZeoBqf6Bec4aDjGKCmXeGgX+IcYSBh3yIeXqAf4Z7iI55goV8fIR8e4J6gHt7hoZ/eYKFfH6Cg4OIgHyJgoB+foF/gX6CgXqEgId+hYZ4hn53gX2AhXuAfX9+f3SKin+BeH2HdoB9goSFfXaJhYFrgp1hg4SGjliIlnN8a46MZImCjIJ5hoKEhnx/goGBgXyDi3OCfX9+foCDgn+EgoKEe3qDf3+CgICCgYN9foh8fH5+gHx9fnuDfn+Cg4B+g3+JhH+GfIN/gnqAgXl5gYqJfYR9hX1xh4J/g4d3eoZ6eXmIkV6LknJ+bJuGXo1+l31om4N3d36OeHeEgXyBfHeHhYOBfYeEe4N8g3t/foSAhH92fYV/fn2GfYGEeYJ8fnt7h4CAe4SDeId6hoKBfYF9fIB+fX6EfoWAgYB+en57f4F7hnyAd3aGenaFfoJ+g3WGe4B5b5OFZ4N6j3hno4F0dXmid22QgIV9eIh9fIOIe4WAenqBiH16gHqBf4F8gXmGg397fIKAhH5/fIZ+dIN/foCDgnyBg3+AhIN7hHx/foWAfX6Eg3KFgX6FfIB5f3x8gHuJdnyEgY15fYN+fYCAeIGAe395k3lrlX2AcnWpbWyQhI5teJlze4V9hHmGf4KDhnl6g3+DgX+Fe36Bfn1+hoaHgIV8foN8eX16g3mFfH5+goB6f4B9g32Cf357hnp+gICAhnt/fYOAe4B9f4B4gIF/goR9fYyCfnZ/gnV5gXx/hXx+hX6Cc3yXa3l+hJFeeJ5ygG6Pl2WChoSDe4OFf4B6fYSIfXx7hIx/foR/hXt9iop+fH96hHt2g4SCgX2CeoCBeoCDf3aAfIN7fYSChIGFfoN8gX6AfYF1gYCCgICDgH17gHuDhXaDhH2DdYGKfX59eXqWdn18iZJkgpR4gGWVlWaDhYqCVpCDc315g4NxgIGEhIV3hIWCfHeDhX2DgIKCgX6Cg4aFf36LfH6Agn1/f4F9e4WCe4mBgYN2gHx/gHyCgoJ7gXyCgnuGfX2BfIh9fId4fnx+dIaCfX5+g4F1foKBgYVygoZ/g2qYjGCDgox9WJuCenlzpHptin6Je3uIeIGFeXeCgnqAgoKFe4l+e36AfIJ/eX2EgoV4hYOEgYN9fX9/d3qDhXl9f4KBfYODgnx8g32HeoCDf4R9fn5+fn6AhXx+hXt7fn9zhn2DeHmDgnqAgnuDg3mLeo55YpiBfXZsqXBgmH+NbnGfeXl9hIB+gH2DhYGBdYSBf4mDgH9/e4SGhIGDiYF5hoKDgXl7foWDg3iBgH1/fXyBgIN7gIJ8in2GgH+Bf399e3+JfYWAc4mGe4SBgICHfX14gIh0dot6e4aEg3p/fHyCiXtunnJuh4GcV22oa392hptkfYd/hXx9goJ9f393hHl2hoJ7g4GAf4GBfnmGen2Ff358e36FgX6EfIWEgX6Ge4CBfoKEf3p+gYWCfIOEgXiGgoODgIN7foF9e4GAe35/goB+g3aEhH6BeoaCgX9/f4GBb4OOboSKfIlhj6RVfJJ2fGaNiW2Bh4GFe4B5jH9+goOBeXyBfX2AfnyDfX9+gYSBeoV9fYOBe4SCeoKJgYOFg398e4CEgH+CiIh8e4p+eH5/gIaEf3uHf4B6iIF5foKDgIOAfIZ/eXyBgnh2gn1/gIR8iIVki5hug3WWjEqWj22Ado2IaJGAd397f4SDfH2FgIB3gId8fn9+h35/fISCfXmAhnp+hHuCe4SBf3yAgYWCfHmDg39+fYZ5foKChoJ8f4V2enWAgIKAgn19gIeDeYZ+dYl6g4GAf3mDdICHfIB+gYJ5h3eNfnOEgpZwXrOBVZeKeXx4jnt2goJ/f4B8gopzd4d/f4J8gn6Gf4V1eYJ/gYB9c3yFg3t9f4J+fHiFgnaCfYaBfH99g355gn2Fdnl9eoF7gIGDgnOCfXR+hIV+ent7hXt3fXt/e32AgoJzf4WAeoGAeIJ7dpF7f3R4slxjuXZmjXyJcn+FeoB3iId7gHeNhHl+d358fIKAhXt+hH+DeXp/hIKAfXyGg3x7eHx/eHp6foF/h3x+gH2BfIB+hIODfICDfnmEe4GDfIJ/f3Z+f4WBfoN/fX5/goF9eniBhX6BfYN5gneAjHR9gomTUYm7UW2dentxgod4gHyAhnt/d3uBeX6Gfn6Bg3iCfYOFf4B3gIGBe4CAf3+BhISGgHx8g355fYKEfH6EfX10gIJ6h4CChn2Ae4V/fXx6hIF+hoKDf399gId9gX2GgnqGeod9eYB7iHl+hICAcoOQen5lmJtDkKZegIyEhnSJh4KGe39/gYJ2in1/enx+fYF+gYB5fXp9eXx+foJ7eYGCeoN9hnp+fX2Bgnl6hoR2hH6DgnyBdItzg4J+hn1+fnyCeYCBgoh4gIN8gICCe4SCe4WDfnaFhnl6eImKeIJ8hYJug3qVelixjEGXkXGLe42EeoCBiX17gIOAfoGHe397fIOAg3uCf31+goV/gIGAf4eBfoJ+gn+EeX98fYOCgoJ9e4GAgn96fn5+eoJ+fnd5gX1+f3yHgX9/gn5/foWBgH6DfXl8e4GChnd7hn53f32KfHGMgYxtb7h1Va+BXo+Dgnx5i4J9gX2EdoCCgYSBf3+BgXp7hIR5fX6Ffn53hYR7fXyCf3yCe4B7h4V8hX97iHx8god8eoKEgHx3gX6BhIN6gXyAfYCAf4J9hH18gIJ+fYSFfn95f4R/g31/fHyKf4F1gYeBgnmDm2F1u2JlpoJ6gXqHdXmIgn5+goZ9fX2BioJ7foKAeoKDg3l8gn+Cfn+KgYp7gIeBfId6hX2DiICBfomAgYCDhoN7f3mBh398goNxf4Z2fXuDgoJ5f4F8e3Z+g35yhH1+gICGf4N9fIV7fIB/hm+Ei3+IYZCrRHy2XXaQgIJufop1foCCfn19gHyCfHt9hnt3fYGAeol+fYB8e4F6fYB/f3Z/g3x8gIaIe3yChH6Bhod9fn99gYB8fod+fH6Ae3iAhIKCeoR5fn95hH2BgHWEgIKEe4h/gneDgn1+g4GGcoSSfYp2lYZOmp1OipZweICDinyGiX+DeoeFe39+iIF5h4eIfXaEgYaAfoZ6hIV+gIB+gXx7fYB9fIGAgIN+gH56hYCAf3V8gn1/gn92eoSBgHqBgIiHfoeHeoF8f39+goV9fH6EgH5+h4R7eIGBfH5+iIJ1gXyTe22qgVGjlV2LgnKCcoiGdoWFh393hX17fX2EgHiCfYaDe318g394goF7eXx9foZ/fYKEfIR5fIN+hYGGfniChn2Ah4B8gXWBfYR/f36AhoV7foKGgoOAf4F+g4GChot+gYCAiIF9ioR/goCIfnqBeYZ5e51obbNwXKd+a4h9hX55hHp6g4CKe3uGd4KAg4N8foZ+gX2Ai3x/hn6DgX6JgYSEhH+AfH6AfXt8hoJ/gXyBhoaAfn+FhIh+hn+ChXyGfICAfoN/fIGAeHp7fYKBhXyAgX9+fX2Ge3+Cg4B2hoR2f4OFimeBolhyqGNunYJ9foCLd3iHdX2FgoV0fIZ7g31/gYJ/gH+Ae3x9gH19h4V6eYR6f4OCg3qCgIF/fnx9hYCDhH98iIZ6f4SDhXmHgYV7f4F/fYaBgn2EhYB6g36Ddn2Dd3p7hn94fYN6fXqJhHuEhoJ7aYyQWIyeUnujb3SGhYt4hId4fICHfn2CgXp8fYKKeoB6f32Bg4F9fHt9fnp9foR/fHx/dYl4fHqAg4R4foJ4f4OEf3uBin6Ae4KDfH59gn55hn2AfX+Ignx9fH59f32GfXSHg4GAfX6HgIGDfYR/f3tzj3prmYZakZZqiY1td4h6gXmDg3R/f3mCh4N6gHmGcX9+g357f4J/g4CDf31+gHqCgoJ8e398fnqCe4CHgXyAgoN8gIV2doJ7f36FgIOJeoCBgXt8fHOBeISFfoF8foR2fn59gX99h4B9jHp6iYZ+e3mNb3abemKngWCVjWWHhHiAf4R8cYJ+fH6GfnyBgnt8gn94fYKEfYF/fod7hnt9eIh6e4KDf4J/gH99f4J8hYJ3hoWBgHh9e32Cgn9/fYF4f36Bg31/d4aDiXyCfYB3e4SDgYJ8fYKCfH6BfoCBhYd0e4twgo1pf5p2dJR/b5SCbo2JeIOIeX6Cfn5+goh5fYV8goN+f4ODf36CfoB/h3p/gYKAgoJ/eXuBgHx/g4WDhYOFgn99gIKEfoF/goB8e4KAgYN7gnl7foR5e4SBf4J8h3h9fXZ+g4J7hYJ9gX2Cfn2NhnWJhGiFiW12j250lHpzkYJyh4J4hX57fYV+f4B8fYuCfIKCfYF/g318gIB7f39+foGAgniCe3V9f4R6fXt/gIp8f4R8fIGDgXx/g32Eg35/f3yAgYCFg4B/gHx8eIV/f3+ChYB+gYR/gH18fYCDfYB+g4GFf358fX6Hf4F+eXeCgIN6goB9goF9hYV/fH2FfoF/f3qEgH+AgH6AfoiAeXh6fX1/fYOEf4OCf3eFf4CBfH2EgYGHg32Bg3uFfH+CgH17g3uGfX96fn2FfX19e4GDhYWChIN5hHx3gHuGf358hoKAfn2BfoF+doGAfYJ9eoGEgX2DfXmCgIGAgIGDg4Z9gX1/gnqDgn6DhId+hH99fIF4fIF9fH59g4CCf4N9hYR8goR/fXuEeX57fXyBfXuIg4B5g3yCf4KEfn5/gHiBeoJ3fX1+goKFfIKBg4F8g317eXt8g3x9eoF/fn5+hH97fH59f4SEfHt9doF8eoSCe358hIGCf4KCfX59fIGChICAgX+Gfn98fISFe36Cfnx/hYd8e3+FgoSDgH+BfYKCe4eBgHl8g4SBe31/hYR7fn2Cf4J/eoF+hXt/e3mBgXyAe3yGe4GCfYCAeoV/gnqBeoGEgH99gYZ+fX95fX+Bf4KAfnqAgIh5f4CAgIaBfn+AgHt7doOEfXp/hH5/fXuDfIaAg4B8fn99foOIhHp/e4OGgHx/f4aCfnmCeHqCe39+fH2Afn9/eX1+fn2Be4KEfYCAhH2AfoCChH1/foKDhIN/f3iJhoWFfIOCgX6GfIJ7e3t+eIGEgIB6doB9foiFgHiCgnx/g4SHgoaAg3l6en1/gXt+gIB/fIKEf4GEf4GBe4V/hnx+gX99fIJ9gH57fIJ9e4l/goKCf3eFgIeCg3h7gHp+gIODe318fH2AgH1/f4OBgoB7goJ7fYSFgn+BfoJ5goF9gH55gnx5hH19e3+Cg35+eYCDgH+HgYKFe4N8hIF/hoKBgXp7fHh/hIN+f4WBhn55e4GHg4CJfnqAgIF5gn6AgYCEg3t9eH9/eYOGf4CEf32AgoCDg4CDfX56gX57f4F8fX1/fn6CgYSBfn5+hX1/fYCJgnyAg35/f397fYN/hH2Df3h8gYSFgX6DgHuCfn97f4CCgH58hHl8e4N6hIB8fn6Eh4B7gX92fYB/goR6fn6Af4J/hH2Ben+FhX+CfoB/e4B8foGDfIN/hH17g4V2hoN9fnp6goV9gId8gYN+f3+AgImFeYR5gX13hIN/hIJ7in6DgoN7gIN9gHx+gIR8iIWCdoJ6hH6Bf4F+hXyAgYSBhYR/eH2DfIh/gn6DhoOAfH+CgH5/h394g4KAgHx8fn9+fn6Ff4J7g32AgYV5fH99g3yCeHuCfYSFgX6Cfnx+gYR6fISDhX5/fH6CgIOEfIV/en2Dg3qDg3d/dX9/hHh7eoSAe4KAhYh7g3yBgYKBgX6DfICFfIF8eoB8g4OKhYB8g4OAf4eCfn6CfoB/gYiFgYOBd3x9fX+AeYN8fnd8f3l7hIN9fYN8fH98foR8hnh4gIOAf317fHh9goOFgoCEent4f36FhYN+hoKAeHx6g4GDgX+AeHWGfXuBgX6AfICBgIKEen6DfX+FgIOBg3WCfoWEgIGGgn2AhYOBg3+AfYB5fnx6gIGIfH6BfoJ+iY19gnJ8eX2LfqRzHp22bYt0dYN6iH1+iXV+eHqDgYN/gnt6e3aFf4GBfHt8fn19gYJ9e3iAfIR7gIGFgXuCgXt/fXx/f4CAe4KFhH+FfX2FgoZ/fYeCfX+Af4CCeIB/fn+AhX+FiYOCgXh8foN+f31+gnKHhIeLgIJsgW5k4oczeXSHjIGKeIV9dn19gYN+hXZ6cn55fYSBgX13fHx+f4GBe4KCfXeDgX2CfIGDe32Afn2HgoiBfn59eoWGgISHe32BfHyAgYh/eHd9fHuEfoCDg4F6enyBfYN+gIB8f3x8f3uFfoh/g3pzfnyJjISiN0LLjH2GbX55gYaFjH6BeniCf4mEgIV7gnl/eX2DgISEfnl6e3mDg4iGfICCgHmDgICFhH9/hIN8gIOBfHyAen53eoSFhYeLeXqAfoB+goF3g3qHe3+KeoZ+hIB7eH+Gf4SHfYN6fHx/hICIfn5/an1epdlJVIx7j4SCfXWCdnt7f4x9gXmGfnt8fX98eoN3gHt8goOChoB4f4B8gXt+gH2Cfnt8gYWHf3qGfnt+hH2Fh4OBg36AeX1+e3+IfoKFeneFfoKBg318f4GAiYGIgYd+en14fX6GhHuIfHx1fX57lIWYhBiIvHmOeXd6en6CiIOBhnV8d3yLgY6CjIJ5g3p+foWEfIh8eYCDgISDfXqAgoV6hIR4gH+Af35+eoSDh3x+g4mFgX17f4V6f4B8fXh9gn18gYJ0fXx/fnyAhIB9e4R9f3uEfHt8d394hISHg4KNcXl1ZNOkLnl/gY1+iHqAgXd+gYOEhoR7f318eYR/hHx8gXl9fn2BfnuCgIN7foN7gYGDgoWGdIV+gHqBgn+Denl4foSDgHZ9hYKAgn99gICAf35+hHqHf3+Dg314gXeDhH5+eYKCgIF9iHuJgn+Ec4BwiY2EoEkzw593j298eHuHg42CfXt5gnqIfYeAgYN7iH59foKGgXaAgYF6gYCCg4N/fH97e3x/g3yCeX1/foCAh3t/h39+fn5+goB+g4KAhnqDgX+JfYN3gYN+h4GIfH96hH97d4F9iIl5enx+eYSFiISFfm1+Y5LiXT6GfI2OiYJ3h3WDf3yQgYWBfoJ6h4CEg3mGfIJ3f4d/goKDhn15f4N4gH6BhX1/gH5/fYOAf4F9e355gH1/g3+Ae4B/fnaDgYR/f3iAgoF+foN+fIB8f3t+hX2EhIGAd4J8hIiAh3J/eHZ/b46JlJUicMWGfnprhnaIg4OEgoB/fnh7gnuOgIWEfnlwiHmEfn6GfX58eYZ8hHt/gn51f4N5gYKCgIB9foV+fYKBeXx5hIF+gniFgod4foF9f3uAin2De3x9fHh9g4V9gXaAe4R8foF/f215dYCBfo57hnlxeF3JvTZsgHyQf41+eXp3hnl/iIGDgoB5d32Bh4CAhnqCdIGAgYJ+g3+Gg3yBfIN8hYV7hHuDfIaDfH58gXl5g4KAgoF9fYR/fH1+gICAh3+BgH5/jIWFeH2CfoN8f32BgIJ9f4CAfn1+iXp4gXOAeYSQdaFcIbercpBwfn17goSKgYJ8d4F1goODh3yJfoJ8fIOCiX2AfHuAfYN8f4GAhHp+fHyFen2DfHx6hICChYKBe4Z8fH+Cf3yBgn2DfYF+foJ5gH6HeX2BeoKEfoF9hH92eoKGgoh+jH14f35+gYWGeYZhf2p84HNAfnOHhoWRfXp2e3p9in2FfoGCdIV9foeDgYCBfH6Be3yAgIZ+f3mBfoCDfn59fIB+goKFfYSEfIl3fHx7fXt8eYGBgHx8gIJ+goB7fH56eol9gIGDd3yBfH2DgoZ4hXmAfIKHfod8gXhxhHuSiY2cLFPShIWFbH9vg4V9hHyGgH98hIWAioN8gIJ7d32DiIZ+g4F+f4CDfYOHgHx+fn99foCAgIF5gH15fnt/goB9gX58f4V7gISAfn2BeoV9enx7hHuAfnyFeYaChnx8eHmCe4KEeX58gHt7hn2LfIV3bn1TutU5Y5B0loSLhH2GcoV+g4d/iHd+eHx+gX6BhoJ+g3p/gX6DfYaAen2EhXuBhYR/d3l4f3+Efn2AeoaCfH+BgnyBfoCFfHqDiIiEg4OBgn2Ed3yBhYJ4f3x5fXyIf4N8gHl5e32FhoGDent+gn58l3mhcx2cvHqObnB9fox8hYN6g3iAiH2BfIB+iHt5fnmGeIKFfH94g3l8foGFeX97gH95g4GAgIJ7fn13gIKBhImBfYKEiIF+gn2CgH6IgYGCg4F/g4N9gH2Dg4CEf4Zvd3yBhIGEgIWCe397hnCTn2V6cXqCc7yGYIRthHaLpWx2g3Z/foyHgn1/gXd3d4OOen56fYV6gX57foF6fn51g39/h4CJen14g358eX6BfHZ4goKDgYF9gIOCh397eIx7io18fHWBfX97gICCgoR5fnSGjXt5f4B/fX9+hYSGeIp5XYaShIp5jl9fo4CIhneAX4qbdomEfIF9foN+gX+DhHl1fX94iYJ9fYODf4KBfnuGgXyBc359gnmAh4J8fH16eYh6f4SAhH+Fe4d6d3+EgH18gHqGhnuHfIF+hoGAf4aGfoOBd4F/hYF2gX2IeHR4gYBynINxf2mBfI22aHGBbIV9oohmgnx6gYGEfoSDh4V2e36If3mGfH2BgoB8gYCFgYR/doCHh4SBeniAeYB4e3+Cg3WEgHOAfIB+g3d0hYWGd4GFgX99goV/hXiKfoGGfIJ6f3t4gYJ/hXV9iYN7doSEfnuOZWWZjJGBeX5IhJ99i36Bb2KUgoCMfnh+h4V/fXqKhIZze4N1dYZ6gnyGfoV7goCEiX6IfHB6gnx4hIJ7fn1/eHmAhIKFfIaEg4h8e4B+hId0f4B8goB6gn16foF9fYCEf4CKfnt9fYd8fH15hXl5eYd3g6VvcHN4h3SqmGB9d3l/gqJ2cYd5g3+EgH+Gh4V8f3WBiHeChHt6fYN9eH+FgYGBgICAdoaDfoGBhX2AgHuBfoSDgHd5g3qAeYR7eoaAd3yFf36Fe4GAdIOAfnuCfn6AfHt0fIR4hXh9f4SAeYKBjoOHhVd7koWRdI9lU6CHg4p5g1t6nnt/f4J5dX16fXmBhYiGd4J+fImHfXqAe3x/fn90iYR+gHt4g39/gYWAf3uEfXqCgoCDgYKAgn19gYF9fn97d3p7goZ7hH53gn6Cf3h/h3t5iXx9enqFf4R7gX9/eYOAc6WXaHpwg3mKtnNofnF5go2XYH97dYJ5hIN9f4uEe4Z6hYCBh3yBfn+AenqBgoB/foCAe4GGe3aAhnx8g398f4iBfIZ4h4GAf3x9fn+Dg3eEhH2Ag32BfHyAfX9/hYd/fYN+eoiDgIJ5e4N5e4WDfoOHkG1fjIiLg32JUXuffpJ/gHthko17kYN7fH6GeYOEhIiJgXaEdIKEfXt8gIB+fX58gIB6f4h7foSAeYGEfIKCgnZ5f4CCf3eBgH2Eg358h4WBeH+Cfn+CgoKAdX98g3t8iod2hXd1gX+EgIGCgIZ3eXmHeoKlcGl7colwrZ5Ye3Z9hYOmd1yGcn2Hf4N/gICAg318hYl5iItvf4SDfHV7hIN+f3qDgoKAgnx+goN+f4B5f4V+fYJ/eIZ8fn2EgoKGhnZ0i3uEf4B2fnuAhIp5iIl7d3eEfn6Qf4Z8fn6CgHR/ho15f4tdfZKDl3qLc02flYeMeYVZc6B6gIOAe3yEf4F1gYeAe3V3hHiChXt+h4iBhHuFgoCIfoJ7eYOFgX+FgIWBfYJ6g4F8iXqGg31+f4WCgH6DgYJ8en6CfYODgIGChnZ+gYiBgol0fX6Dgnx8fYSBeHp6g2ucmmmDcHp/g7d/ZH9tiHiXpGt1gXJ/gIh/gIKDf3d9doiIeYd8e36EgXeBf4V8fH16fn6AhX1/f4J7eH1/e32Ff32AdIKEhIR+g3qBfYGAgY6Ce4x7iHt5gnt/gICBgXV+g3+Kg3+IeneCgHh8hIGEdIt4Vo2NiYl4i1FnpHeSh317Vo+YeIaBf3l/fn18eIp+gXp3hn11hXx7foKAfHp9gn+CgH6Adn1+goJ4foB9fn19eoiAiIJ6fnyBeH6Dfn2BgXJ6fYOGfIGDfXqEgH96eHyJf4SBc4KCgIF0d4ODeYZ2hn14p4BmeGqJbp6sWHh7dIODpH1mhoGCg4V/fHyCf4B0en2Pf3qAf3eFgYZ1foGFen98d4F7gIR1h4KAhH1/gXaEjHyCgHqDgX95fH54dYJ8eoOFgYR/fYdzhYJ/gX+BgYB9g3V7hYR9eXiJf4OAgIOFe4CJXXCZg5R9gH5NmJWCk3WHY2qfgoWFgHp1goZ8f4aEd4Z7gX17gYCHf3aFfXl4fIOFhICIgHOEe313fYaIhYZ/dYd/f4B/doR/fnuEgXp/hIh+gX13hX2DgX96foF4eH2NgH6EfHx+g39+eYKAgHp4fX9ykqVseXJxgHe2h1uFbYN8kKFqb4F7f4OCfoSAgYN1e3yBhH2DenqCfoB3gYCDe3l/eHp9goJ9f4ODgXx9fXx8f3l4fXZ4goOAe3x4hIOCfH2AfIOGgX54fop8fnyAhYJ3foJ5f5ODg3Z7fX6Cd4CCh3yJelmMkYmLcIxfXqiHj4Z5flyOnXeBfYR9eYiBgXuBgIaAd4h5eoJ7gHeIgH54fHyBhXx9f3t9hIB0fIZ8h3+BgHqBhIKFfoSEgn+DfoCEhoF6e359hIaCgoV9fYeCen2EiXeGf3l8eIODgXyAgHp/c4B+eaCKcnduiHiRtGZteW+HepyDYIJ2eYZ/iH17eIiAfYB2hoOBjYJ/fYF+d4GHfnmGdnZ/f4aJf4R4g35+f36Ce35/dn54f4Z6g4Z+fHd8gH5/ioODeH5/eICBfYR7gIGDdX+CfYiJeX52g4B7fHx5h396kWRnj4aMgoGAR46hgZR5g2tinYR/iISHdIF9gHt/f4iHcXt+eH+JgoCBgoCAg4R8iIaAgYd2g4V8e318fH+CgX58f4aAfHiHf4B/iIR5gIKFd396eoODfn+BeIWHfX+FiYV8iXh2gH+HfX+AgIOEeHiIdImhbnV4d4F1q5VVgHJ/fYSjbGyEeXp8hoSBgYSBe3l5fYh6f4N7fHWIeXh/hn6BfHl+enuGgYJ/e4J9en19gXeGf399eoV8gH59f3+DfX56hH5/f3p7g32Dh4N8f4yBe3eFdIKGhoF/fn5+f3iBg4pyg31af4+IjHSSZlKliImOd35bhZd8g4SDenqBfnx5hH+Chnd9gG6Dg4V7f4GHeICAe4WBfIB3fIeBgnuFfX6Dh317e4V/fHt9f3+CfIeDinx+fH2Ef4KKgIGDgH+Cg35+iYiAgIZ6f3uEhH95foR4fnZ/gnGhkW5zb4F9iLhyaYBrgoKZkmF8eniAho9/e4R+hnt6gomFeIJ6gHx9gnmBgoSBgXuCgnmDi355doV4fX2Efn+De4F7d4V/gH2Df3p/fIR7fYN9g31/g3uCfIF/gn+FgHl4e3OKg4CAe397fHiEhYaGe4xmZ42Il355kEZ+pIOSfYV0ZJeNfYuHfH97i4GBeIuAhn5/gX+Fh4F5fYOEeYGFe3yBfXmAfoKEeXiBf3l+gYB9fIR3i4KAg3x4f4B8eHt+h31/g3Z9e4R8foB6g3V5gIOCgoaFeH6Ch4h0e4ODeXp7hnWAn3NsbnCJcqmlWXl0eYSEq3NnhnWDgYiDgIOCgXl5fYGOdYOBe3iGfoKAgIiEiX93cX6Ci3x/gYWDd3x7hn+HhHqBfnuNgX6FfoZ+f4B+f36DeoF5en17fIWHfn2BhH51h318hH6CenZ9g4V4hIaLe36EYHmcjJV2iW5LmJOFjXiCXXGgfIKJgnx2f397foZ+hIN6foB2f4qFe32EgoF3fX5/iX+HgHyEgn56gH5+fIp6eIOEf4h6gX2EeoJ/en1+fYB0gX2If4F+g3x7fXV7g3+OfX+AbH5/f4CCgYKKhnx2e4ZtmJJmdnCHhn62eWCKZX+Fj5xmdYV8e4uBenZ/gX56f3eLh3WHf3WChoGEf3yFfn58eYR8goCFf3eIhn2BeoZ7hoN9fH58gX6IgoJ9hH6FgIaFgYCFgYN7fIJ7fX2AhoN4fHt4g4SDfYB8gYlxf3yGknmBcWiIep+XcYJlb5CBn4RqgGWAk3+EdX2DdYSDfYN+g397eHl8fYN9gYR8gHyDf3yDgIh8f316hX+CgYGDgYGEeIOBgoaDenl/foSEfX2HgIKAeXd/fX16fXh+gYR6gXmDg36Ac36AhIiEhHyChYZ/dX2FhJd1f31hkHmOm3p7aW2Zf5CBbIN0gIODgoCBf31/gX6BgoKAfIR9f4R+gHqCfoCDgYCAe3qDiIGCfXeCgX6BhIKEfn1+e4F8fn56gYN+gH98gH9/f4N9e4OGeIB/g36Ae4N8d39+gYODfoV+fH95goF7f3+BfIF9fH2DgHZ8doKCfn99hn57en97fn99hnuAfod6fX98fn1+gICAhX2ChICJgoCAgXmBg3yDg4SBfoJ5fYKCfoGAfX+CgICEgoZ+f32Ggn19gHt9fnyFgHqBfoN/gH6Df39+hIF7goOBe3h8g317g4F+gXuFf4N5fYF3fIGAgH95gnmCfn+EhYd9gX6Af3l8fXyKeYCDfoKKfXyBgX6BhoB6c32AhH1/hHuDgX6Ah4N2fXZ/fX2Dfn1/d4F6gnx9fn97foF+gn+CfIKJdn5+fn2DfYR8f4CBfnmGeYWAd4OChHyChHt/f399fXt9fIOBgn2Dg35+gH+Cg3qFeX9+fn2Gg4CGfnyBfoB7f32BeHyAg4GEgnp3en58fXaDfoJ/fYKBgnuBgn1/hoV9gX5/g3uGen58fYWAfn19gYN9eoB8hn9+gH58gYOGgH9+gIaBhH1+f3t/g4N/f4V5g36Ch3yBeH5/iHx9fX99goV9fYF+gX17gICEgX2EgICBeXt+f4R/gYGAe3qEh4B+e4Z7fXp9gH14gIB3fYGAhIB+fXyDen+AfX97fIR+gX59hX9+fIN9foB/goWAf4R+gYF/fYJ9d3qEhIWEf4KFg4F6f4F/fn6DfoJ7f398f319hoSDfIF+fIN/gX57gH+AgH99g319foB9fYGHeIB9en18fIF+gYeCf3+AfIJ/gH98fnl+e3uFhXmAf3yDgH6Fg4J+eX2Bf4J6gH5+g4CGf39+hX18f3mGjYJ+foB7g4OCfoN5fXh/foCHfXt6fnuBhYF9fHt+eYR6fIOHf4F+d32Af31/fH2FfYGCf4R9f4F/e3yAhH5/gniHg3x9gYZ/fIKAhYB8en1+g356gH+AgIKCgHt+gnmBg3d9hX+HeYB9g4J9fn59foR/eYOEfH12fIF+e4B/f4KDgIF6fXqDgn1+gYB8g4V5hIKDg3qFhX6AfISCg4GBe36AeXd9gYCAdoODgn59gYGBfYCAgX+AgH2AfXh6iHp/hH5/fHx9fX+Bh4SDfH2DfYKDgYaJe3yCgYJ7en9+f358foJ/gIGBeH6Cf4mAf4CGfnp4fIKFfIB+g4OCfICBeYN6dX99enaCgIZ/e4B8gIaBfnl9gIl/fH+GgnmAf4WAgH+Hg4KEeoJ+hn2FgoyAgn2Ke4CAgYJ7g3p/e4R+hnp9en95fYR/fICBgn57hYGFf4SBg4Z/gH+BhYR+e393h39/gIGAhICGf399foF/h3yGgX+CgHiCfnx/fIGGgH97f319foGAgXp/f3p/gIOAg4F6gnp9fHuEfYB+doF7gICBf4d/iH6Be4B/fICHf4CDgXd9hIWDfn6FfYB4gH97hoGGgYV7hIKCfoWGe4N/fn6ChX6Ahnt+fISEgX1+f39/hHuCf4iBeoJ7fX+EfoF/h36EhXx/hIF/gH+Dh3x8e315god+eoCDfnt2hIKBg4J/gX2Ff3eHf3p/foaFfoF8iYd9hH9+gnyChIB+eoGDfHx9hHt+eIWDf3Z/gnp+fIaEhnl+kH5thJt4XZKXa2qXiHRwgYCBfoB6gn90gIZ/eHuDg4N4goCDhHqCfIODf3yJf3uEgXl9hICDhnmDiIN/gH1/eX5+hHx/f358fYKAfIKEgXyFgIF9gYF8gHx/gX6BhIaBf4KEf3l7goV4gH59gXmHf4aEdXCShVl5qXhXip10cX6CiIh8doh/eXx2e5WBf395goZ3fHx+e4V9g32GhIV6fYWDeHh7hXx3fH2AeYWGfYOAgod1iYKEen1+gIGBgX2Cfnp7dnt6eoB5d3yFgX6Dh354fYR7f4V8f4GAhXx6g4qAdoaChINucaOSWXGphV57j32Be3V/h3qChH6FhnyBf4N9g31/hXWBg4KChXt9h36AhISDg4KCfXqAgoR9fnh+fn16eH9/gH98h4B7fIKDhXl3gnt7hH2Fgnx7fYZ/fH1/hIaEdoaDf356g4J9g4F2gH+BhoBuhYCElnFdnq1aXJmHfIR3e4+FgYB7hoV8f396hIN+h4B7goeDfISAhoKAdnuFeoWDfnuBgXt+e3yGgXuEd4GEenp9f32BgIKBeYR+hnx6gYOBe4CBf4mBiHd+f4F4fHt4jnp9fnd/f4F8fnuBhnyFenqPhHGFbXyxd0aSsWtoioKDjnl/hHyKfHODh4OIgYN8gYqFhIF8foZ/fIB+fop6eYJ+gXeBgIGCen15gYB6hIN5hIR/f3x5hXqDhXx3gH+FfYSHgnx5f4iEd4J8fYR7eIN6h4GBgH19gH99fnh/e4WHdoB7cIWEg4tXcMCHRIGYgIl/boGAhYd8fn+EgYN1gHh+hYCDenaDe4aEhYGCfIKGfoJ8gIV8gX6BhoJ/hnyChYCDgISHgYGDgn+CfYN5e357d4F8goR6goF9gId+f3t+gn5/f3qCfnyAfX14f4N9hIB5goKBknpuf3OQpkhZwJhmfHWCi4F+g3OAf4GIcYKDe4SIhYh7f4OAgH99e32Eg32BeYCBhIaAe3uDf3uAgIR9fnh+gXuDfHh+gXqEen+CfICAg359fYN5gn55e3yHfIF9fneBfId5d355iYV7hIB/hoGGhn2BeXqOgH52VZ69U0uegoWMcoGHf4J+gIaAgoKAhnyHgn2IgYCAfnuGfYV6fYF7g4SCf4OCfX58hISEhH+Bf3yCe4R+hn6EeX16gX2AgHyCgYJ+foKFfoN6goKEgYCAhoCAf39+hYd/gXt9iXp9fH17gYmIgYhwfYF8posxirx4dX51gIaCg3CAgXuEgnuAeIJ2gH+Eg3l5jIGChHt8foCAfYd/g4CFeoB8hHd/e3uBioF8en9+enmBfX16g4KBf3l6e32FiYGCdnyGgoCIgYGAfX59hXiEgICFg4OCeX5+g4N+f354fYCGjnaEYmjEoz96k32Oe3aAcYyMgX97fIl8goR5fHZ5iYCDiHx6eYV5iYB/gYB2f4SBgYKCe4J6hIaCgICBgYR/fnp1e398gICAh3p5gXyCd4GBfIJ8eIF9gIR5foN/eIGHe3l8d4CDgoJ1fHp9hoKEhHiFb4qBgaxKQrSlZ3t5doV3iX52fnuBgoF/fn1/fIV+hX6Ah3uBgYOFgnt+fYZ/fn59gnl8fYOCg399fn2DgH9/hXt4hH5+fH19d4SDgYOAfoGBh4OCh4GFgn+Fg4KBf32BfIZ/g4R9fXaAen+CgIh0f4WBj4B2fVmE2GFIkoOHkHODdHeLgIl6fH93hH6Ai35/d3yBhH6Hf4KCen1/g4l/fHp7e4R9foSBfXx8h4OEgIGDgHqDeXx7foOEgX+EiH2Bg4KCf3qBdHl/fYR/fn9/gYGDe3qCfH+CfYiCgX14gYB9inp9c3SEiJyMNXDFinJ7c4SFgYd5eXxziICBiHp4e4GDe4OAhHx+h3+GiH2Fe3WJhoJ9eoOAeIOCfIB+hXWDfoF9fYGAiYGEgIF/g3mAhX+IeIZ6fIKAg3uHgXeFhYCCe4KEfoKDf3t4doR8hoSEgnmIeYWGgIl9dHFfvK43aZJ9kYJ+fHB8fnyGgoJ/d3t5h4V8fX1/eX+AhI6BgX6BgoKDfX+AeoGBfYZ+foN7hn2Dg3mBgH6EfX2AhYCBgHuCfoOBgn56fYSDgoaAfoB5g3aFgYx/gIZ+hnyGgISAdnWDgIqCg4FygnCHkYKxYC+usHSEc3d/eJGBfIN4gn6Ahn+Ie3mDgIWBiIN+gH16gHqAe4CCg4SAgn+CgnqFg3qAfXl8goiDdXiBgH+Hhn57hoF6hH5/e4V/hHeCgYGEgoeDdIOGf4B5g4F+goZ+eYKPeIF8fIF8gXyDh4qIaHpheeF6P4d3iJF4hneAgHmCgoJ+gYN0f3yAgHqEhnd8doV6g4mBg32Cen2Ci3x+f4R7fnyEeH9/f39/goV4hYSDc4KBf32BgYJ+goF+g4OFfoCEfXp4god7h46Gf4KIfYd9jXp8i3l8foOTf3x/fHx2joSQmypcyY1+hGV7e4KCfo6BiXdyh4R8gIF4e3p0fH1+hn17gX97eot/hYB7fYGDfnmDgoKEfIGEgH2Eg3mEfH6Kf3uAhoJ/gnp+gnyBgod7gH1+hYWCe4F+fn6FgIZ+f4F6hnyJfomGdYF+fHuIhnmYdFGNbJ+qWHduaqiHeYB5f3d+fIOSfn5/f3+Ef4OFhnl6eIKAf3+KgHd4goKJf4N3fHuBf4KCgoF/fIF6f4J7gYCDfHh/fnqHfoGFdXl/e397hXqGgHt8f3x7iIWBhXl+fX+HfIR1d4F6hIOCgIKIcn9yfql8gXpPk5eAoWdmgXuWiHmGg392gnp8kH+EhICCgoF9gX18gXqFeoCEfHaBfIR6hIGHgYKDg3+DhIJ+goJ+gHx7foGBgYR6hXh6fXyGf4R+gH54gYOFf4B9f3uIgn1/iIKBgHWEkISAhnx9hYFtiIOIj1ZujX6qh2F6XoWkeopycYZ9gXiDfX+JbX2Cg4Z5fIKGeYV6e4eCen6AgoGAhIKEeHyBdIKEg4J7g399ho59hnuBgIaCfn5+foF7f3+Bgn1+h4V8fHh9hYSDgH6CgH2DiHWLhXuCeHyEhYB2g3yHfmyFdpWjbIlgY6KAnolkf26AkoKDe4KBgXt+ioWJhHh/e4WBgH2Chn1/hn1/fYB+f4GCgXmDgoqEeoKEgX2Bfn2Cg4GHe31+f3mGfX6EhHiBdYCEgICDhYWDfH15fIWFhn+Df3+Hd4F+hYB+fYB+fIKEd5ODiIFUh4KKr2d4bGOYjIKPb3l9gYl+hoKBf3x+eH58ioV/gn6Eg3aBf4Z6hneEf4R/f31+gYGCg3tziICLgoF+eoiDhHuEh4CGg318eX+Fg4GIeoF1dYJ9gYmDgIB/fXp5goB+hn51f3yCh3l9hYV/g25xh32ginGDWIeUg6l2bHtzj4OEh3iAgH15hnmJjnt+en2EgoF8hIF9fX58hn2CgH+FfYJ5eX18eYWGfX14gYJ5gHqAg4J7fIF6hIKChXuGf4F1gHqCin+AfHV6e3eEdol/h3V3eXqJgICAfoF+hHOCeIeUeIZtZ5KBn5Nog2N7lIGYf3V+boaGi358gH1+d4F8eoWBhIJzhX57g3+EfoB8hnh+g3mDgXyFdYGCgoWDhYOAgIJ8fn9+gYOBhX+Cgn5zhoN8hHl+fIOCg4WEhoR+fYJ3eoWHgoJ2eH55gnx6eoiBg39khIGKnHJ4cWKWfZ2PZYJveZGFhXx4fHqAfIB8gYOAjHuCf3mCgoB8gHqDgnp9fIyGeYBzgIN8hoB7fYJ/d313gHqIiXx8fXyAfX99gIGHfnuCeXmEgX6Af4CBf3uAfYR7h4B7gHmJiod6hYN3fntyh4KTjneFXYKDgKZtfXRdkn6Lk2t+e4SDgoOAgoF8hXx5foqEgX54gXyAenx8gYOCg31zgIV+goB8fXx/eIB/f4OEgnp8eoKGgYB8hIKCf319f4V9e4N6eX2ChXV7gXuEf3eCg3uIf4WBe395e32EgYOReotvbYd7mpRyhF98kIGjeHV+YoWGgYh4goB/e4V8god8h310enp9fneBfnx/gHyAgn6QgX2AfIZ4eod8gYN4d3x9eoF+hIODe3x6gn1/hH6ChHx6e3yEe4GEgIaFfHuCeYSGdoZ+eoKChX2DgIh9gXtwf4KAm3N7dmGUhJ6ZaYFsdZSDl3t0enR8g32HfIZ8gXt9gnaKfYB+eHqAhoCAgIOEd4iDdnp7ioCDfniAeXZ/hIJ9gHmDhHyDgYN/g32EfXl9eHuBgoV+eH9+f3t/e36FiHttfHyDhoKIfnx/f4F5h3yKhXZ9aHuMf513c3NjjIWTmHGEanWGf5OAfn16iH9+g3+DgXuDinp1ioOKgn2AfnyBgYB9f3h/foh9eYOCiIh6f32GgoGEfnqAh398foCBfoiIfXp7ent+foGAfIqBenx7goGLjYGCdn6Bf4J+goSBfIB6cI15k4VwgGV7i4GofnN2XoqFg5FzgnR4h4CEhHx9fHh6hHiBgH2Eg4J3gn6EgIN+eXx/gXiAhoKEiIZ9foGEh4aGeYF/goN8doCAeYF+foJ+gIWDiH2Ce3+BgH5+gX9/fIR+dn2NhIZ+e32HfIV8goB/j3mCdmuRgJKhbYRscJV6oYRzgmeFiIqMe39ydIB9gHqHfoGGfX93gYaDhXmEfnyDeX+DgnuEf3+DdoF5gIGCgXx5f4SAfoGAgnqAgXx+jHqMgYiFfH57fn+BhYB9fX51gH19inx9gHmDfICHfYeDfYCFcoCHgZh+fHZhiYqDmG6Ia2qKiJWJdoNxhoSDioGCfIV9eYJ7hXuBg4B/enh+e4mDgoF+hoGDd4B+g4aChYGBfH6GdX96g36Cf3aEf4OHcXt6gIV/hYJ8hoiGhHt8e3mDfXuEeYGAfYd9gn2DfnyBeI+DjohxgWt7jn2geXiEYoyBh51wgm5rkHmMhHl+eYF/e35+gYaIf39/eYh/hIZ/hHp/fX6Agn+AhIJ8gH2EfoJ8hX6DgYGBhn+Ffod8gH98f3t+hn19goKGg4B/gICAgn19fX2AgX6AiXx5eX6AgYCAin16fGyDfoqRboZsb5GBoIdufVmHj36Xcn56eomAhoSBgHyAf4J8goqGiXt7gXuCe4SCd4aGgX2DfYKBfYR9f4N2hYJ+hH6CfIV9f397f35+hHd8fYN/goZ8fYCEgIF6fIJ+hnt+gHiAhHqCe4KCf3p/d3yIfZB7doJkiYKGkm1/Z2WYeJyFcoBlfoWHkYB+enh+gX98f3eJfnaBcX2FgYmBf4SCgIKAgnp8hIN+fYSDgYaEfneGe36Bgn17fYd/dn53fYKBi4GDfXmEgYWCdnyCf3x6d32Ag4l/eHx/foGIf32AeoV5fnJ3iYaXgXh7YIOFiJ9yfnRmlXuPkXWEaoGOh4t8g4CGgIeDhIaEhIV7hH55eICCgXmChIF+f3eAeoOEgn5+e4WAhHt8iYF/hn2CiICIhniDfXqDg36BgYB+gn14eIl7g4Z3gnZ7g36EgYCAfoCEhHSCfYyLcoBybIl6nYdwf2WFiYGdcHV/bJN5iYZ2hnl6f4N7eoKFf4J6hHKEf4SCeoN3foN5gISAgX6BgX97f4GGh4F/fYWAgHt/iYCDgH9+d4eDhIyCgnuCgoJ5hH1/f4F6gXV8h4KHgYF4e4OCf4J/g32Gen9og4iMmXWAa2uQeJaJcHtgeo+EmXZ/fHB/foN9goR/fIJ8gH6Be4p/ent7g32Cg3x6f3+HfHqAfIB7g4F6eX5+f4N/fHp4f3p8gISFfn92gHKAioGHhHd8gH6CgYCFgYCCfYN8gIaGhX+ChH2AhX19hXyRhHSCZIWFjJ51enBjm4adk2eAZ3eMgpF9doGEgnl+e4aDh4d5eIF9iXx9fHmBgXx+h4R/fYWCen19g4KCf3yGgX96fX6BhIR8g358hH9+d4Z5g4V9enuLinl9hIJ+f4F8gH6LfIB7enh2goR2fnd8gIJzeot8m4lwhmCClHyifHZ4Yo+BjJN0gXF6h4F/gXx/hXp4hHl9iYKGeXp5hod/fn2EfH57gnt/iId9fIKCg4F9hoZ+g4OEgnqHhIKEe3iBgXqEfoCIfn2EeX98foGBfX+Cg4V9e32GiYCHhnZ/ioF6gX6BjXp+cnCLfZ2LcYNcfJSGnnxufGSFioeQd355e4J6goODgYV+d4CChoJ/gn+IfYB8eoGAgod8g4B/fYV6h397gn97fn2DhYqChIJ7e4aGeIOAgYp/gH56g4R7h3yCeoF9fIKEhHyJenx6eYOEgoJ5gH+DdoaCkZhwf3NjlH2Ui2eAZ3mbfJqKcn1qgoJ/hn1/f4R4gHh/jHyBgXp9fXqAiXuFg4KDfHaAeoaAg3uAgIKBen+AhIR/fXV8foF/hId/iH17hHuChYB+e3+CgIKHgH2BgHx8eIR/gYd+g4B9goSEg4J6h4d7f2qBhX2neX99WZCHiZxmdW9vjYSHe3p8foZ9gn19h4aCenl5gYiBg4OBg318foeAgoN9gX16h31/gHx7gHuCf3l7gX+CeoJ7gISDfYSGfoaFfoF7eYV/gnx7foKDe36Dh4OGhHl9f4KIgoGChH2Ae3aDepOHd4ZbeJF4p3tue1+JlYCSbneIf4uCe3+CgnuEc4KBiYN8fYWAhHx8gHyDgH59fYV5iYN5fYCFfIB3fX56fnyCgH9+iICFfX2AhIGFfn+GeXyEfYSBg4F6fn19e31/foF3eYJ+iYh8fn2BgYF7fox+i3VsjXOdmnGHYnOQep19aINuhpB7ioZ2ioGFhYGBhIZ9gXJ9iHl/gHZ/hXiDe3+Df36FfYJ6gYKBf4CDh4N7fH2BeYN7gICBgH98e357gIN+f4uCg3yBfXqEfoCHg35wfHuCiH6JeHWDfYWDiYCEgXOBdXeXfIZvV456lpdtfmhpnIOMiWZ+dIOHf3iAg3l9f3eNfYqBfoJ+fIN/fIF+hHd8fIJ9gYt6gH6BgHp8goGAgXt5iHiKgnp+fIKFfHp8goOHfXSCeoKFf36DgIN6g3aChn18dHyDgpF/gH99gIR4eYeBhIlggoZ7pH53e2CNiomcaXh+c4+EhIZ4f35/gIGIh4V1eYF8hYZ+gXl/hn2AgYOAfHlzgIJ7g397f4qDgIGFfoZ9h4J+fX97h3uDgod/gX5+g4OEhoWAfHeAfniDhXR9fXl3gX+Kind/dHiDg4GHj397eW+NhYWSZ3aMeaKDaoFsiJR7jnRth4KHi32Ce3+AgoZ6h394gHeGiIJ+fn91hXmAhH+EhXd6goB5gIV+gXuAgXyCgn2BgHyFhXx/fIeEeHyAfIiGdXqAfYeAfoB9hIOBfHqGgoB5e4SCf4J7fYGCeYKJf5CAbXxsjp92fWJqn3yVhWN6eoaOgXp9eIaCg3uAgX+CfIWHf4uCfXmAhYGEhHmDfn52eJKCfYCAfH5/foV8eIN/e4R/gX53e35/hH99hHuDfoOAfol6fniBg4aAfYGCgX9+en6JiX9+f3qEeXmDhoF0f295kYOUe1aJfY2pZ3d1bZqNfYhrdYp8i3t+fYGCgIaDg419fH5+iYJ7g3x9g3x3gIiIiH6CgYCFfXuAfn+FgX17g3p2goKFioSAf32BgYB9gXyEhX18fIB+e3t9hnqCeH18fn2Cen16en9+fIGEd4SCgIN6fYN8gYCBg3uDf3qGe4d7hIB+goeEgoiFgnuDen9+f4N/fIGGfX+FgHmEgnyDgoCBfYSAg4B5hH+Bf399gIWCgIZ7g3t/f3+CfoCBhYKChH5+goKCg32ChHyBgH1/eneKhH2DfIp+gIF9fn59fn6AgXt6foB+g4N+gH97fIB6fn2ChH6GgHyDgYF9gHyAf36Gf4OEgnuAgoR+hoWAe4B7fn+Eg3yEhYB8gH6CgYB+hH6DhIGGgYOGfX1/goR6fn6AhIB9fXqDfXeJfoR7hH56h4GGe3yGgH+AhHqBf36Ei4OEfIN/gYKBhH98goKGe4GBfX2Bf3yAfn+Aen1+fn5/goKCfX+FhoWGgYCAf3l7eYF+iIN7fXuEfnuCgIWCgXt8fYKCfIJ7doKAgH2Afnx9gXyGhYiIfoV5g4N/eniGgICBfHh+gICCgoB7f4J7f4Z7hHt8gX+Eg4OCgHp4gHmDeIJ9gX57e3l9fXqCen1+g3x6e3t+hH58goCAgn5/g396hIN/d4WAfoOEf4eEfH+Ad32EhYCBg35/fH1/hoOFgoGDgH+AhHqFfnp8gIWFhH+BgH13f4GCfYCAgICAen19f3Z8foWBhIOBf3uCeXp+fX1+eoOEhnt/f3+AgX58gYWEhoWCgH57fX1+fnh6gICIgYJ8dn5/e358fn59fnyAfXSAgn15f3x/e4SBhYR6f4GDg4CDfn9/gIeBf4V8f4KBhIKDhYp/gIV8gIOBhn58hHp/gnl6e319f3mGeXuSdI2BdZptgIVvlX18kG6KfnyIeYOBeoCCf3mFfIJ/eoN5f3x3gn95f4KKfHuBhoKCgnyIgYOHfIN7fH1/gYWFfId/hod/fol/fYSEg3p+fXx8hXd9f4SAfoKAgX6AfIWJfXaJe4OBfX9+gH2EfH9+gI12iXxylHCFhmqad36Laol8eJJ6hoh7f3p9g394hoB+hH+Af4SBgIB/fH97g3+EgXt9doeGgIZ9gHiCeYOCf4aGf4CKh3x9jIKEfHh9foGAf3mGf4Z+fICAhXx/fn+BfIWAeoJ5gXV+fIKBhXuBi356hnOEf22Tc4OIbZN6epZtiX9rinCHg36JfnyFf3qCfXyFgIeAdn9/foB/goB9f4V7fYKCgYB+fnaChoGDhn97hYOEf3uCfIKEhH56gXR9gIZ6f4N8gYJ7gIKGh4CEiIR8f3l6hn2HfXqIen96fH6FfX6Fc4CEc5Bxg4RjjXJ9im2NgXuIcoSDe415h4Z+hIR9gH96hYF7hIB+f3p9e4F/gHyEfYGCf3t/gYCBhHd5gHuDdoJ8en98gHmBgn6Aen1+gYGBgYN9gXaEhX+CfYR/gIKCgHp+eYF/en2Dfn2DhYSBeoJuhIB2kXSFimuTc3WYaYt+dpBuioh1i3SFfHt8goKAgXiCgn+BeXx+e39/gX6FfYWAfoKIfYaAg3t/hn53fHyAhYB6f3R+gYF/fXuCgIN+fn6Ed3x+eoV+e4aAgoN5fYF9gIZ/goKAfHx/g32DfIJ8inuBgHGPdYCLao55gZFsinp2jWuIh3aNc4GEdIJ3gHqDgoCAd4J5g4CAhX99hn+CeIJ8fHx+gXx/f3p+f3x8dYSHfnqBfn+BeYJ/gHuDfnuBeIR+fYB/iXx7fn+Ig3qDfX9+hIB9e3SFeYOAe4OAfYR+foR+fIl2gYlvjXd+hm2RgnOKb4eGdItzgn13hnd9f3t7fYB9hoF7iHiIgISGf4R9gXZ/gXuDfX5+gIh8f3x9goaBfH57iYGAhIR/foCBe4B/hHl+gn+Di3+AfYB+i4iFe355fIR9fYZ7iIN8jnmAfIeDgXh5hW1+hHONfIKVbZJ9eJdnhIJymG6FgnaJgIR/g4GEgoOGgHqBfoR9gIF6hX97f356goJ9gnp9hn5+hHx+g4N9eX6DgH2GgoSEgoJ/eYOAfYiCf4aEg4J/f32AhYKDgX1/goJ3hnaCfX+BgH2Cgnl8f3+DdX5/bY58d4Rvi3l4l2uNgXqOboSFdIx4g4GBhIJ7fICDfYV5iXiDgnx+gXuCgYGCgH1+fXqFeIGCgHh9e3+AeX5/foF/f4R8gIGIhX+DfHx6eH1+g315fXaEhX6AgISAhXuCe4OBfY14gIF4hH99hX6AgH57hnp8h26Mf3SSbYuAcJNwgYZxiXmAfnuHfn6AgX+DhnWFgHuDgYWCgX93fYOFhod9fHp7fYWChHqFgoKCfYh9dH9/gHuBfoSDeoWAfHx/e32AfYB/eoF8g3l9g4GChoV8f354gXV8hHmDgXp7g4KAfneKeXqFbpN4eZJrioh4kHOAiWuOfYSJeIN+gIt8f3yBf4GCfYN3eXl9hoGAfoOEhX17hIB2g3aCeoCBen98foaIfHiBfoJ9gISIgoOBgIN7gYKEiHyDi4B+hHx/f313fH2BfYSFgn+HfoGEgIt8gIF9f4d7hIl2in94lnSOgXKXcoCKaoZ3fIN1iXR+gnuAg32BgYSChHiEfn2Af4B/gISAgIJ9hIF7gYWBgYF6iIKFen99e5B9hHx9gn+BgYJ/e4SAhIODgn2FhIR8foGCfYKCfYV7d4N6fYGAg3mCfXmDfH9/hYB+gG6JdniNcJKDa5NwgZJvjXF1h3GGfnyBfXV8e3+Ee3KLeoN8f4WBf4OFgIN5gIJ7gIJ6gIR8h4OHf3l9fnyHfXCEfYZ+e3+BgHx5foN+foGCf4J6fYF5gnZ4f32AiIB9gX95f3yJf3+BgoV6fn6FgICGeIKDcYx1hoBulHOEimiRdYONdYl/fIRzg316goh9fIF6goSDfICJgX6BfX17gIOFgn6CgX6Ec399foWBfoCBd4N7g4Z8e4KAfX6Ae3qEg395gH+AgYGIeXt8g4eCgHyAgXmBfYh6gH58gn2CgICFfYyAhYF/hXKBgnKSbXmKbI52fIlyk3l+i3l/gnp+e398hnuAgYGLenx+e4Z9g4GEg3yBd39+fYN/hHl9hXt7gXx9hHx6hH5/gH2DgH+BhoF+e32Efnd9hop8f316gX6GgX+Af4Z5i4B8hICFfX19fIGBf3qDgXuPdYeFcJZwgYlskHV8jG2KfneJd4CFf4F3gIKIeYeCeX13hYV6hnuHeoZ+gX16hIR9gnqAgHmDe4eCc3qDgIGGgoN+goeAf3+FfnqEgoF5doZ7gICBhH5+gXyHeYOGh4KDeX1+fn+DeoeCgn98eoV+e4tyiH5yj3mFi2qPenmRbJB6cY90iH52hH16gH6Bfnx/g3uBiHp5f4WGeIODfIODf3qCeH55gIZ7iH2DgYODeoR8goV/fX2Bf396fHp/fIGGgHqFeoWEgIZ9fIp9foJ+dYF5foJ9foB5hnt+gYJ+fnd+i3WHhHePdICGa5V3epRnkX93iHV/gX6JfHqDeIB5gnZ/f4V7d4V9fX6Ag4aCe31+gH2BhYF/iYGCg398fYCAfYGEfYWFfnqEfIyAhIKCgX2BgYGDfoOFh319hoGEeIB+hoB8hnmCfXqFg4OAeIKAgX6LdYWFdY9xgoduk3R2j26PenKPcIiAeYp2hYZ7foKDgYd+f4B6hnuBg32Bg3yFhYR9g3aGfn9/f4N/e4GFgnuAfIKBe357f4eBgn6AhH1/f3eDg4N+g4SCf3x5g4KCg3l+gIF+c3+Gd4yDhYZ+goB7foB/hIF0i3p9i26NdIWMbY55eJpzjYV0inmBhHmGhIWBf3uFfniHdoCFgYV7fIF/fXqFe4GGe4N+foJ9gIB+foN8fnp8hn+GhIOHfYGCfIGAhYWKfn6Bf359d4Z3gYF+fX1+hIZ4h3h6g3qFf3yBgIGBg317h3mGhIeKgINreG5u3ZEzgX18l3+Ng4F7e4N5iYSAhnyFgIF2e4F7g3x/f3h6gYB/g4N6fnyAgn6DgISAe4J6g4R+goF/fYWEeX+BhYGHe3+GgIGBgH9+fXp/f35/gYOGfH1/eX19fIeGhIR2fnqEgYSFf4V/dnpvgniOjIikPEHJj3mEZoJ4fIiCjnyDd3iBe4aFfYOCgIB7fH2DeoR7fXx9f3yCfoCAhXp/iYB8hoGCfHl0gn5+gYOChHh/e32AfYKAhn+CfYB6e3t8hYl/gHyFfYZ/fX2BfHp+gXmHg3eDfIB3fXt6gnqHfoB8Y31dpOJJT5B5joKFg3Z7cX6BfoOAiHd9gH2Ed4CGgYR5f3+FfoOMf4R9gYJ6foF9foSDfIGAgH5+fn2Bg3eCgH+AeoWDgHqFgX2CgIWAent7f32CfoCDe4J8hX15fX2IfoWBeXp6h4GFhoGJfH93dnuAloCZfx+CxIGDdXR7cY2Ch4GCgHZ6gIB9f4l8gnt1en6FfoiAf4KDg36Cfn5/f4SAgHp+gn98hIF/goN2gX98gIJ/eHl9gYB/gn58hXp8gH6IfYSAgXx+dX1/hIJ9hIJ0f4J9gn+FfoCBdn99fYaEi3uIanhxYNGiMXp4fZiEiniDfnWCfoCAh4J/gnuEfoGGfIKAgniCgYGDgYSGdn5zgHx+iICEenyDfYR7g4B6gHqAfn5/gYKCgXx9e3yGfoJ9f4N9f4N9gX6Kf318f4Z+hHqDfnuAfn54gXl5gISCg3qBdYV7ipKGo00tvaN7iWl7fniGcoh9gIN5g4GAfIaFgIF9gX56gH+Agn59ent6hYOJiYKBgnqEf4OCgYOChH6BeH2DfYN4iXx/fH6AfYCChYR/f3mDfn6Be4CAgHh9jYGCfH58fH+Bf4F8inuEf3d/eYiCioaCgmx8WJPgZEOFdI+Hg4h/f3x9g4KGfoeAfnd7fIOFg4CDf3p+gHp5hICDfXuAdYF/gn18hn6AfYKFfnqCgIF/eHl8f3uEgH9zgYB5gHmEf4GBdoGAgYN7gn17gX+Afnh5jIODfX+BdH99gIJ+hHd9d3eHepSDlo8Zc8t7intwgHqDhYOJfIJ4hoJ6g4CIgId6fIB3e3h6hIKFd4GCfoiAhX2Dfnp/gYaDiIZ+fXqDe4GHfIB9gYR6gn2BgICHfX+HfIF5gX+CiX+Ac4F8fH2Cf4SBe4B+eH+FfoN8fXl8dYGIiYyCgnV0flbJwjRzhXuPf4aBfn16iXaCgYGFen9/fnyAin19gn6Gfnp7fod4goCAeH97fod+f4KCf399foKBf395g359f4GCfYV/fH94fXmCfHuIfoJ5hIV/fYKDgoCEfH6FgoJ8iXiAfXh5eYODhYR6f259fYaThqdgHrKweYdsd3p6goCGf3qHe4J9foSBioWBfHt+fXt7g4B5fnt7fXyEgYt8gnqCfYCCfoV8goF9gX2FhIGDgIB/e3uAhIOEf32AgoF7hIWAh3yAfXx+hIiBgoF/gX+CenyCf4N7fXp8foCEhIeEgodjf2F96XZEh3eNkIaOd4J4fYaAiIaDg3SFeoSDeoSCiYKBd32Eg4eFgIF0hHuAgoF/e3p9fn96hIR/goiDfoR3hX9+gIGBgH6Fe4KAhoF+eH+AfXh9f31/h3+Bd3t9foCAgoF8fXSHhH2JgYWBfnh5gHyViY2bKVjKh4OBb4R7hX6EjHuEfX54eol/gIB6gHeCfYaAg4F9iHx+e3uBeIJ+foJ8gnqGe3eIdoJ9f4OAgoKEgoWEeH+DgX2Cin54fXp/g4WAgoN+eneBfX5/hYd4gn18fXmHgIaCfn56dX1+hHyHfIh2a31Xsdg4X4ZvkYWLgXl/d3x+fYKCgIGChH6FfouDgIJ5gnp+gIWBfnl5god4foSGgoCCfIB+fXqGfIB7gYF9eIF8gYGCfH6BfH9+g4WCfHyAfX+JgIGCgomAgH6IfXaDgYV6fHp8gn2GhIOFd3l5eYN/kYCldRecvXWOdXl7d4eDgIN6hXqJdYGCf4R9g358foSAgIN+gH57iYB/hn6Ffoh3hYOAgH+Fgn6CeX5/gH96gnuAhoGDfoh/f4SHg3+IfHt4eoN6fn58g3t9goWGgYN/gIaAgXmHgYZ+eHl5fYGGiYKNZ31lauKRMoF/gZJ5g3V/dXmDfYZ8foB6fHyEhIOBeIR6d4qDiHx4fn13e31/iH98gn+Bdn58hICAgICChnuAeH+FeoN+gYWDiYWCe4N7gH2Gg3d/gn2GhIh/gIKChX2Cf4CEe4F/foR7fH+Jf3yCcYB5hpR+nllarICIfXORcn6HdYp3e4CFfnuFeod9gYJ7hHp9fX9+e4B/fYB+gnuDeIl/gIaCfXx8hHyBf4R9d4J9hn9+e4B+f316in19h396f31/g3uBfnx/fnaBfICGfn+Hd3+Cfnd8gIB9d4B3gYtzi3h6jnKVfXKRbYl/d4twgYB2jHR/hHuAhIGDhHl8gHeDgX6Bfn6BeHx5gH2DeoZ8foZ6hIaBhIF/gHiCg36AhH96hnyHfYOJfX6DhIR8enp3f4SCf4p7h3p+f3x9fIGAgoB6h3t4hXh+gYGCgnyIgnSMeXuRbol+dJJojYNulnOBiHWIgICAdH1/g4J/eoKEfYV8goZ2hH54gnyAeX56fH19gn9/h3+EeYCDeIGAfH+CfX6Ce3eAfoiChn6Gc35+f4R+hIJ3hXp+foJ9hH2HfnmCfXiFf4R+fIaFfIV+g4R/fIWCeYlvlHxvk26Khm6VcYKLdY57gYR6jHV7fHqBeYV2f35+gnmAgYF/fISDgIF9doCBdoCCe4SDgISDfHp8d4N+hX98hn+AhIKCgoJ+g3+FgHmAfnx6foZ+e4d9hHGCd4B+foh9fYR+h398fX1/goZ4hIB6hW6Mdn+NaZN9c5tvgo1ujnV9inaKe3+DeX9+f35/f32CfYB8eoV+gIGCg4N9f4yAf355gYOAgoZ8g39+gXx+gYV+g32Dfn+Gfnp/gn9+goF7d4KBgoh7gn58g3mCe3qAfoKFg3uKfnqCgnuAfnqCgH6Ec46BeJhuin5tlXSIiXGKdHSIcY18foZ/iIGBf4Z/f4R7hX1+h3yAeYCGf4Z9f35+f3mAeoGHgYWFfXmBfX+EeYZ7gYGBfoN7g319eYGBg4KBgHiGfoCDfX+DfYV/fn6Be4WAe4eGfod9hH+Cd4R/hIV7jHtyiWyNfnCUcYORb5Z5e4xyhYB7h3iFhoCAe4R/f359gH2Ce3+DeYZ7fX+BhH5+gIF7foB+hn59f4GFfoF6gXyEfYF/hniDeX59gnyAgIaEeIF8doaDg3+EfYJ9g3t9goGCgnyBg3yBhYGLe398f3aAd3iLcYmCcpRxhYpsk3p6hXOKeHyMeoaDeXyBgX2JeX59fX9+gH6HhX6BfIB8f4Z8hXt9gHuCd32BeIl2hoaEhn2Be3eAfn9/gH2Afn6Be4l7hX+CgX+EgIGBgoh6fX9+gYaAg4GDgYR+dn13f4GCeImDeox3hINyl3GChHKSdX2RcpJ8eY1ufn19iIeHgX9/e3p9hH1+h3eEhIJ8gHyAfn2FfoKGfnuIfHqAf31+f3x+gn59gIZ9h3uDgIB8fHx7f4GFf3qHgnqCgYN3goV5eoF8foqHhYV2gn19hH58g4N5inx3iXWIgm+KcYOLbJF1d5VtkoF2jHWIfn2Ie4V3hICCgHqAgICDg4OBgoGAi4KDfoR8foR8hnx7fIeAg4KAgH17h3yGfn6EhH13hIB+h3qEfIR7e4d+g4V+gIGDfoWDgnt6f3x9gn9/fnmJeYCAeX+EhX2EeH58dZNygY11mHZ4jG+SenyMdIyAeYJ5fnuCfXZ/goR9gIl9h4B8fIB8f3l8eoCCfICBfH2IeIiDfHmAgIV9fXyBeoR5gIB/hnuCg4F5gX56iH57hIKGfX2Ff3x/hX2FgIKIeoF+fIN2g3t9f4eAhId9gnt4hm18jXKQd3uLZIh1dJBskH99j3qHiX99gH59h4CGg3Z/foV/foCDfYGDg4KGfYJ+gYJ9iIKAg4B7e392hYaCgH6Agn+BeXyAf4B/foGDfH6Ed4d8gYV6h32Cg4B9foR6hoeBhXGJgH2CfX15g4WBhHuKeYSIcZJ4eI9nkYF9km2Fg3aLd36FeX16eYSEfnqHdYWCfId1goODiX+Gf4CCgnt/i3qCfYWJfoN/e4KCfYOEeoJ/e4OCf4aCgX6ChXt+e397gYB8i4KBfHyCgneCg39+g3yAf3p/fox9goKCeIJ8f4d5foZtjoKAiW2Ng3iQbY+FeIhwg4J3gX5/f4N7hIJ+g3N+hHyDg3yFhoGBg4J8goF/f4OAgoB+g4B7fH+EfoB7hXx0fH9/fH5/eoKBg3p+f3qBgH6AeoR8fYKDeYZ/fH9/fYd8h3t6hnuEgIB/fXh4gHWKh2+Odn+OaZB/eItujIZ1knGCgnWPd3qAfYN4gnqFfoGCfHp+eoF/goKDe4R7fIV6hICCh4ODg4F/gICFf4KEiXmGfHuEfIeBeImCfIR6fXt+eHx5iH56f357gYGBhYKCfnh/fnaHfoJ+fHmEgX6CfYGHc4x6foVukH5yjWaPhXKVdYWFbopzfH19gIGCe3+DfoF7h32AhXl5fH+Eg4B+hX+Hg3qBf4B6e4t8e31/gH19fYSDfYZ4gnx9goSIf4N7f35/gnuDe3yEeXp9g318hHuIgIB/hoN8hoJ9fn6BeICAhoJykHF4i3KLfXKPbJCBdJNxiId1i3h+gnx9e398f3+CiXuDeHuEf4GAeoN+eoCFdn5/eIh6g36Ch4GCgoJ9f4B/fH2Af3+Fe3yDfXx8foCCfnuDhYeGe4V7fX57fH+BgIZ3gH+Dg3+BeneDfXyGf32AgoKGgHqIbox7c5FnhYFsmG2ChmuPd3+EfIiBf4OEhYeFe4B+gYZ6hYB9hYSEgIN+gX96gIB+gYCAgXyDfHl/hISChX9+fXyAhX5+e4KFgol+f357f4J8gX6BhXyCgYKDgIWIgX6Ae4GCfYmDgH9+gHp9e4aDfYd4jXtzlGiQhm+Sb36LbZF5gId1iICBhIR6hoV6fH5+iHmEg3R9gXyGhH96g3h/d4GEfoR2fYGFgYaHfYZ/hIZ6enx/gnt/gX+AfIaFfYSAf4CFeX+HgoB9gYGGfX6AfHiBgYCAgYaDfnt8hoJ7fnh2f3uEhH57hIJ/gn9/gImAeoZ9eIKDfIF/e3yBhoV7gIGAfoGAgnOHf4N7gIGBeoKAhIOGfIWBg4R8fXWFgYJ+eoN7gHt+hnuDgH19g36Cf3t+gIB/fn+AfYWBgH18hIF+gX9/fH6MhXiDfoR/f35+fIJ7fX2BfIF7fn5+f319g4GDhX+Fe4CBe4B9gHl+fYWAf32AgYGDfoKGf39/gXV7enx8gX9+goiAgH6AfoF/foiAgYOCh4R8fH6Df4CDf4J7foN7f4OIfH19gIGFhIR7e4OHgX54ioF/hXqGhXx7hX+EgYOBf4B8hoF5goR5e4ODfnqBfImEgICBfYmChn2Bf3mBgnmAf4OAgH6Fe4GAgIN/fXt5goF+f4CBgIGEgIN6e4GBfnl7eoR+gX+BhXx1fXuEhoKBgoV/hoF7fX99hH6Cen98gYCFe36AhXyDfX14fX+EgH+EgHx8gn6AgH+CgX2AfoSHf397f32BgX98foCBdYGBfX9/hYB+gHqEfIiDhIF5eoSChnZ+f3h9gH6Cg4GBeISAent/fn+Ch4GAeXqChHd7gH58e3mDhIKAgnuGg4F9gIKCg4N7gnyAf359hYN8gn6Cg4F7fn9+fYJ6fYKCfnp/foN+hYV9hYV/foF8e3+HhoOCfIiChX19f36BgXl7foCHfYF9foJ/gHmFfYB8enyAfH2Ff4GCgX6DfH98fHp9fIiAe4KAfX98gIR+gHh7fnx+enyBfH18goJ+gIOBg32KhX+BfXp/foB9gICHfnuEgod8fXuCg353e4R/gH14hYSEh32EdoWBg4SAgXt+gIKAf4GEf4F9g3uChH9/f4GBgYV8foB9f3t7hn17iIJ/gIJ/gIOJgIB8gX9/eX6Cd3p1ent1e4B/f4Z/gnSAfoB8gXt8gYV8gn58e39/fn+AgHx5d3+Df32Egn98g4B8gYV9f3p/hn5/eYV8gX13fH17g36FeoOBgId7f3p+fXyBgn6AgHmDhYKBgHx8f398gYF+f4V6gISAgXl/hXiAgoJ+gYGAf357gYV/hIOCgHmDgX51gIF9g4J1eYGFhIJ/goCFfICAen6DeX2CgHeFfH2AgX9/fX9/hn5+gX2CeoJ/fX2CgoGFf4J8gH+EgHiAgX59fXt7hXx9fnl9goKDf36Bg4B+fYCAeoGBhnd+e4GGhHl+hX2CfX16hYR8e4CAhYB9e4SCdoF+f3mBfnp4g3x6gYSCfoVqfHVr5ostdnuAi3+MfX13f4Z9hIKFhHh+en1+eoWAfoCCe32AgIeIgYSAgX5+gnx9gIJ/e3qBiXp9foF7f4qCfoODg32BhYN7f4KGe3+AeX15fn5+doN/hISGe4GEd3+GgIV9gnN8e36Ke4WEfn53gHWNjoKhOT7Kj3uBcXd7fYOHiYKGc3t5doWEfoN9gIB6f4R9fYl6f4V8g3t+fYWHf3x6f3p/ioGDgX2AdYR/iXuAgYJ/en2CgH99iX17gH56h3p6gX2Ahn6DgHmFe419hoB3gXqBhYGGfn53fHx+f4CHfYR7bIBbnuJPUYpxj4eIgXJ8cIKDe4J9hXt8e36JeoKBe4KBhnt7doB/fol6f3x/hIF5hX+FfHWDgHp7goGHf3l9foB8goGCgnt9fXt5gYd+hYN+e3qGgX6BeomAgXp/hXSHgIiGgnl5hX+Ah4mGdn5yeIB7kIKbhRuJxnyJc3N2dYaAh4h8hnd1dnyIf4mAf4F3gXOCfIJ7hIF6eYF+fn+MgIV7gX2EgIOCg4CEf359g4R5g4V9fn16fn2CfYOBf3uGhYCCf4iBf36BfoCAgX2JgX5/gnp7hH2OfH2Aen17fH6HinWMcHpzZdSlLHh+epWAinZ+f32AfYGIh4N2g3Z8gH+Hf3x7goOCfH+Cg32HfYB7hn6AgoGEfoB9f3p8hIGGhYB8en18gYB7hH5/fH6Ee4KEgn99goF4hHt+foKBfHx1e4KFgn6GdYB9fnx6i32GiIOCbIF8hYiEoks1waGAkGd/dXyEhIuJh3p1g3qBf4KAeIJ6gXd/h4CKfoF+gHqBhIKCgoSDe32Cf36BgICBg3yDfIKBfX57en96e3uBfH1+eX19goCEf4CFe4J6d4R4gX+Ce3yEe395f4SIhX2Eenh9hoSAi4GHgWuBXI7oVkSDco6FfoZ6gXh+g3qFg4SAeYN7g3qBfoKGfHx+fn2Ch3+AiYKDfnmJf4OFgHh/f3eEgIZ7g4B6gH6CgnyDgX99en5+hYl+f3yBfnmAfnx+g4B/eoB9fYKDgYOEfH18eYN5g4OChn15dHCAf5aKlpEkdc19hHxufXOEdoR9gId8eH9+hHqFfoV5e4Z7gICDgHt9f3t4e4F7foN/fH16e3yBhoWHfnh7hX2Ie4KBe4CCiHp9iIWEfYCGfICAfoCEgoCAgH58fn98goKHfHeEgYGFfoZ+gXOBeoaEgIt/jHVvelrQujVxgXiWgIGFg3p0gHqAf3+BfX97fYN0gn56hHyBfoZ3hYF+jIJ+eH5/foeKhnyFiHqBfIB/f3yBd4F7e3p/eod8f4J5gnx4hYiBfYSGe4B9kHuCg3aAe4B/gYWCg4F+fnV5fIqGfHx3gXOAg32ZfatcKLWvfYRte318h4CDg4F/en9/en99hoR6dX2Afn18f399fXZ9fX+Af4OGhnaBg3uDhIKFgX+Bgnx7gn6GfYSCeIl/gYKBgn2BfX19hYB6f399f3mAeoKCiYB8hXqBfoCFfIqBf3p8gHKGgIyGf4FqemR+5nRAfXeKh3eHdYN3dIp3hYWEgnt+d4KBgX2FhHV/gH+Af4Z9gIF4gnyBgoKBgoF9enx5g4WBgoN9eoCAfYSFhoGEfHZ/cIJ/hYaBgn6Bf397g4F6i354fIR8f4B/en97hH2Af4OLgol3e3p2hXGMiYuhLlfOiYSFan5vhIWNiX2DeYKBgISAf4R8gYF+gH9+foaAgYB6en6FfoKAf3t1f3qEgXmBgoR+en55gHx8gYF/f39/gIR8g3t6gX5/e4t+g4R6gXl/d4OBiYF+e3d8fXuBfoN+foR5e3qDhnuHeoNwaXlZr81DYoJ4mYeChHp+eIJ/goKChH6Cf3d4fIODhH99fnuCfIV7gYmIgXp7foF+f4N8e4F/gn58f4F6goZ/fH6AgYiAh3qDg4CBf4t8gn6CgHiAf4GHeoR+fnp+g4B/hod/eX96hoGFfoCAeX1yhX+CkHyjcxeouHeLd3KCdoV5h4WDfHaDdX2FhYZ/gYGDf4GGg4SBhIV7foF4foCGgX6AfYF7fn2Gf32CeYeAgHyBe36De4B7eX6DgH5/gH18eoKFhYF9enaAgXyEfYKAgId4gnyDgn6FgH2Ff3h0hoOHjX2Mand4bdqPL395ioh7h3qAeXt9eoKCgIN6hHt8fn2FfHt+fnt+hnmBgoOEgIV9gHqDi4SEgHx2fn2Bf4B/hXuAfn6Af3t/hYR7fYGBd4CAgIB9fH94g3uIhYSAgoWBeX6CfYCAf354f32AhXqEgXaBdYR5gI6Bn01ZtYF+gIGPanuPdoOAhoJ7hHiEgod5g4p5fX5/fXqKgnOCgYOEg3t/e32FfYJ/eIOBeoSGeIeAfoF6hX56hH6DeICEf319g39/fX2GfXx8g3qEfXyEgnp7fod5fI6DeYV4gXt+d4GAeXhymXJqlH2GaH6mXnuOgH9pjIxtjX9/gXaDf39+foWAhmyIgHyAfYGBdn6Gfn9+e4N+eYCEgYKAhIJ6e4GAgoV6f3uEfXqAfYOAfnmFen1+g3qCgH6DfISGhIGAeIN6f4J8fn16gnt8fneChXx8iIB6gIaJbICYbn2AhZhaiY9yhG+Ng2KRh3t/dod4g4WEfXmGeYZ/eX2ChYFzf3mEf4WEe4F/hHl+eHyJfHx4foB7gXyId4N4dXqCfIGAeIZ9f4eBfol4gHqAhoSAe4GEe3qFgHt+fn2DfYd9eICAfoJ/eX6CfIN5hIxkh4OCf2OeiGCFgYVzapmBc4N8iHWAgIF2foWGh4F/ineKgIOEfX1+goKDfH2AgIB/eoOAeYiDhYKEiIGBf4R6fH5+iISEf4CAe4OBhHiBfYCCg4GAgIJ+gHx9gYGHeIF7hYN+gn+Cen6BgIV5eXuBhmeVhmiGcY93YKB8eXp8nnVwkXl+fH6FfIKAgoCGeXuEfISBgIJ2gYd/en5/f4J/e4KAgX59hX18gH+Bg36EfnqEfX+Hfn2FhIJ9gIeGc3+Cen59e4F6fXyAgnl+hnp7goCAf32HfoJ/e32Dg3iAhnx6dZqFapOChG14o2d0jnmFZIGVb4OAfIZzh4R8dIJ+goV3gH57fH6FgH+Dhn91gICDenl9f4J+eX18goB9hIGCfoJ9gIB5gop8eHeCfn95g399h3l/fHyHfX95d5GHfn2Hfn6Bgol/eoV4g3uCfYiBen+Ei2ttnXF9fYGYXHuXbIVyio9mjYR7eoGJgXSBgn18gXiHhXqFe4l+gICEenyGgIWAg3qBgYh/iHd5fH+AgX95gn97g358fHyDf3x+foGCf3p8d4J8foB5hoCBgn2AfIN/foqAhXuAiH2Ef4KFgn2EjH+HcICVanaQeYlpkZFdh4yDe2qagHCHeol/dYyBgHd9dIaDeH5+g3p4g3t9g4d5fIZ8hYSBgnqKe3aCfoJ6gHx/e3mAf4N7fIiGgnyBiHp+f4d9gIuDhH2DgISEdn+CgnuDjXt+fnqGeIeDfH+BgYGJe4V6iIFqjZdofnWWg2ieg3WDepl3c5Z9fnl7g4GAg4aBf4F4i3d8gYCAdn+Ae3mBf3x9g3x+dYN8gX59fX9/foeGeYF/g4J6f3+BgXOFgIB7gIOIhX2FgX58doqBd3x/gH2FdoGAg3h9gYB4g36Ae357iH6CenOUhV6ShYVtcKt4ZpF0hm18n258iXyFd3+GgoZ9fISIeHt6foh5gYKFhn19goV0eIZ/fn5+fX2DeX6DgIB+kn57gniDfX58eIJ7g4SEeXh9gYaAhIJ9gIF7hH6BhIeDhnt9hYKEgHqCgnh1gImBgXeDe4N4bZ99c3qEl1p1o3V7cYqTZoONeYh5fn6Gf4B6gX56fol9hH1/gX+CfHaDhnd8hXaCgHeAgHyIfYZ9f3+DfX+ChIaAhoSFf3l8gH+FhYV+gIOBfXiChX2Dfn6ChXp9g4CAeoh6dH96gYV/eXuDgoZ6hnt7oHB2ln+JZYykWn2Ni4Vekolwg4F/fX1/e4aIgnuFgnh6en6FgYd7goR6fYSGfn98goaDgXZ7hHZ+fYJ6gXt8hYGFgYGKfnl9f316gXx/g35/h4mBf353d32AfYODeYJ/gIN/gYCKfnqChIh1eX5+gn+JcoyVYXp6mYtEmJN2fXCbiWWKfIOFenZ7h354eoaHeYJ5fol9d32DhH2EgIR6g4F5hX5/eoB7f4J9hYN+hHt/h4N6hH2Ag4F8g3uAgHiDf4KJg3x/g3V6fYN9hn53gH6DfYGDfIN/d4aAe35/iH1/eoV5jH5ekYmCcmOugFKQg41uZpqBd4OAfn98eH2Hh3x7inqDiHp9goZ5eXp7eoKBg32Hf4KCf3mAfH6CgX2FhYSAfXl9gH9/hIB2hoWBh4J/g4SAfoGGh3l6i32Ehnt/gXyAhHB8iIKBe3yJfoJ7eoOFfHyDeXiYeGyFhaZWYLeEdnB6pXF1hnSGjXx5gIuFhn51gX2IgHZ+fYWDg3p+gnaKfnp/gYF8fYN2fX+Ce4GEfH98fX6HhHuIenyGfIOAfn96gYGAe3x6eIKCe4F9fo6AdoCEf3+FgH+Dgod9fH96joN7d4Z/fYxveZSMgl6LsF5nmoiIaHySdYWFeoCDjXeCg3+DeICEfYB5hISAe3uAg4GCfX58gIJ7gH6EdIJ+foKBh3+AhXt/gX+FgH56gYaGeHOAhYGCgX1+g4KDeH6CfoR2enmJgn+Gg3d5foKEfXeHdYKChHl5iYCBgHSIe6uNLJG9a3N7g5SAe3eEhYKEgXl4fIeCg3h+hICGgnh8gYmAeX+CgYiDfnx9eHyCent/g3x9e36BfIaGeIF/gX+GgoCGhoB/fHd6gIWAhHmDgIiFeoSAgYCDgnl8hIeGe4OBe4F2gHmGh4CJeXWBeY9ygHFcz5g9gpSJkm93fXyOgIR/fX+Cg4aDgYOCeoKEfnqFhXt9en+Ce3yDgH+BgHp6h3qEfn5/f4OIgHp8hH6FhX6Bg4SCenyAfX9+hYF4fXqBf4KAeX2Ef3mBfn6Ae4iHhH98f36Ef35+eH13hYx3iXN6gIOzVkG9nGWDa4iIfpB7f3x7iHyJeoR/e4B+hoF2gH+Dg4CBfoN7hH95hn+Gh3+Ee35+fn+EhXh9in+Fen2AeoeAh3+BfXl+f36GhH95gYSAhXt+eYJ9foOFhnl7e4CHh4OEdXR6foyBhHt/gGyIgIKIbnxZidRbRZV5i4Z3fXJ/foGOeoN2en+EhoF9h3Z+hXyBfX6Cen+CjIKDfXt8dnt/fH18hX1/goCFgXd+gH2FgX9/foKAgIN9gXx9fXh/fn1zfXyBf4GBhnmBeoJ/hoF/fIl8f3yEgnd4fXqKe4F4d3dujn+ZniqAxXpzdXSKgIqJeYF8hH2Bf3mFgHyEfoh8gH+AhIB9gIOEgYF8g4h9fnyFhHaFenp2eYV9foOBfnODfXp8iHeCgYODeHuFhYOEgoN7foN7g4aAgn5/gH57hIN7f4F8fXyKgYGEgYJ0h4B/jIOLc218YMG3Nm6DfJuGf4F7f3h9g4OCfoh8gYN6hH6Fhnl1f4J+hImGf3qIhYCCgoeDfX9+en6HhHuKgXd+foB8hoSAgHqEgHeCgoF6fn18gnuAgHmChoCAg4aAgIKFfmyFgHqChIN2d315goGNf3SBc3xwh5N+nmAwsq91kG1xhXmCgYaJeXaFh3R7ioJ/gX1+eHyBgHp/j4J7f3+BhH5/fX2FhX98gIJ9gnuLeXh7eoR8goN/iHuBfnyCgH5/gH6AeHZ3g4N8foCCeH6DhYKAg4R8eHR9fXeMhn6BfH90eoeCg3+VgmWAZHzbfEJ+doebeYh6foFxg4KCe4WHeXx/hIJ8h4B7gnmCgnqIg4N8f4F9gYJ+hH97hXyDgoOAe4h9iIGAgX6CenyDhIN/doKCe3aBhHqAfoJ8eoWDf4Z5gXl6hnd/gnuChoR5gICCfXmPiHaAgYJ4cJyKjJE4XcCAgodkfoR+dniMgHKEeYJ6gIx8gIiHfXx/fn+EfX99f4J/hIR9g3uJfHuBeoR9f4CAgHl8fH6CgYWCfoF7g3h/gYKHgn+GdXyAg4F/hId6hX6DgYGIhH15fX59f3uBiX17gIB+cIeFgH17kG5qe2G1vk1lhWmQknmDfH5zeYt5gYODhXB7fnh3g4B8eoR6e4J8eYOCfX2AgYKAh3yCgICCgHiBfHmDgX53en56fn6DhId4gH58f357gXt/goODfnt9fnt7hYR2fXp9gYKHgIN8d4OBfnmAind8iIJ9c4ikf5twMpWpgph0aYp9fnuBkoR6fHl7fYKHh4B8fYN5g4CDiYB7gIJ/enuGhIZ/hICAgXl4gH2Gfn1/enuAfoR3iH53gH1/gH+HfoB+gHx/foSCh357gXx7c32JgHl8gHt9gIJ7h4KCgnl9d4GHgIB2jYRidX5/woxPeXF0nYVxi4F9cXuAfY+EdYSDeHp7iIF4hIJ8gn9/gIR9fYF+fnuEgYCAhH6BhHmAgnqGfoODfYJ9f4J8hX5/gXuBhX19hn+Ee4l6hX95gX+CgXx/gX2BfoCEhoWAhYh5f4R2h39/eoCGdG2fkX+ITVqvlISRXm6MfYSIhYR6e3x2hnx1goSIdHyAgIKFfYiAgnl9e3h2fnqDfXZ8eIZ/fH2FgHl6hH16hXx6f397fXd8dICBf36CgoGBhXd5g4h9f4GDgIJ7gYiGdnWGhHqIgIKMiXd0eISAgIp7jZhhZoB2mK5mZ31kjqt4fIJ3g4Zwf4WHfXp9hHmJfH+HgYJ8gYGDfYB5gIJ+fIF9hYR8g3qGgHt/gYCCeYKKhHt7d4N6e4OEg4F1fH6Ef36AhHqIfHqBg319fHt+fn57e4R7gIR6gn98dYCHgH1/hXiBfGOJoX+AdkqAn4eQg2N+hIGNg3yCf3l/d4qFhod9fX+Ce32DfHyBg4R9eoKHgHx9eoB8e3+EgH59iH5/fYB9e4B6iYGFfniBf4aCiIeCf3yBfYCBhYKDhIJ7d4J/fYGJgH2Gd3l/hoeDg3t9fIB+gXmJj4R+aW57jpiRcmxsgpGRhXt2gH5/gYCAgI17fXmEg4KAhn6BeIN/d4SGg4N4dYKAfX6AgYmAgH52gYCDfoJ/goKDgX+Ef4GBfoWDen+Be3qDhHmAfH96fYKEiH1xgH1/fXp6fYGFfHx0eoOEfnuAg4J4dXWAjY2FcXNtf4+Xh3xuc3eCkoV7hIR+fnt6eoKIgId/fX6DhIGBfneDf3hwfnh+fX99hIKEgn2BeH+CgH2BfHuDh4d/iH2AfYN9fn5/hYGDfn2DgXx6fnuCgn54gnqBfoR7e3d9e4WJhHt/fHt3dniCjYl6b213ho2Nh3Rrc4WQkoV4eXF2iYN+eoKAg4N+en19f4d/f35/eoaAfX6FfYB6fnuAhIKEfH+Af36EfIKDh3qBd3p8hoOCd35/f3yCgIB6foGDgXx8gYCHh4Z/fX58gIN7gYODfIGFe3d4eIiNf3x2cHmDkISOgHN3eYGRhod7bXR2gIyJhYF4en5+in+AfX6DgIF7gXqDhX15g3uBgH+Fg4F/hoZ2gXx8gnyAgXuBf3+Hf4WDf3l4hoN2fIN6foB/gISBh4GBi3l/gH54h4GAgIOEfoF9g3iBiIaIfoR4e3qDi4qFeXB2gYaQjHl8cnWKkI+IenZueYOFhYR7fX6Hg31+hX2ChYCCfoF4g4N8f35+eoSIfHyFfYKAfn58eXt+hYWIgH+BdoaEfX96foF6e4aDfoGCeX6Ef3mCgoWAhYZ9en99gICCgIJ9fXt7g4aKgIN5eH5+iIaGhHp4eXiBiIl9cXl4eYSKi4WAf3N/gH6GgX55gHmBgICGfYd7fICFgXx+g3eFhoSAhnWEfoeCgnl+g3qBgoeBfoJ/hH5+hYJ6gH6BeYSEg3t/eoOEfHx6doOCgYN/fXSAe3uEgol+fnl7f3+FiYWGfHp6gX2GhIF7gIF/fIV7gH52gH2AhHd/e4SDgYCCfIJ/f4CFgXx+goGEf3t9fnyCfYSCgIOBgXd6f3l8gYF8hH5+goB+f4GAf4ODfoKKgHuAgHiFg35/fnx+goF/fX99h4iAgn6Ienp4goOBeHx7f4B9fXiChIWAhX9/gIWCg3t9f36BhH97fX1/e4SGfIaAgn19f3yFgn6DhIGCfYKEh3x/f4CDeoWCgoF/fX2DfIF+hH9/goR7fHl6g3+DgoF/foKFgIaAgIJ6hX+AeXuBfoGBg3x9fnh+got/fIWCfn59e36Ag4CEe4B8hX59fIN/g3yChYN9fn+AhH55fIGCgoB+e4B4eXx6fnuBeXx+hXuFfYJ8hYGBf4KKeIF6eYKDg3uBen2BeX99iIiAg4GBe398h4F4gH2GgHx7f3x3gX17fn+DfX2Dg35+hoSDfX99hICAfoOBhIB+enyFen6AfoCBf3l+hHx+gH2AhnyAfH2Ag4N+gnWBfoOEfICEfYOFgHiCg4aCgYKBhnx4e3+GfoaCeXh7gIGCgoJ3fXt9hX+BgYGEgnuAfoB3gn+Bf4J5gHqAfYSAgn91e3t4gYKHiXx3e3t/hIuHfX17foKEh4qKfnd3gH+LiYd7e316f4qNiX9+fX56f4SCgX18en9/g4GBf4N/hn59fYJ8f4KFgIF7fniAg4WFe359gH12foCJf4N+gX97gYKFf32FgH55g4F/foGEgIB+eH2FhoSAg4F9dXyEhI5+fHN9gIOPjIV6cXR4iIeLfnZtcXt+iYKDeXx6fX2AeH+EfoeAfHaAhYSIfYB7d4GEhXiDgYJ8eHV9goCIhYN4fXuBgoKBf3yAhYF7fX2BgIOCeYF8gn2HfYCBf4F/fnyAgoKEiXt5eX2DhH97fYeMgXtze4OOjoh8dXCCiJaJh3Fqb4ONiIl+d31/iIeAf3mCgH5+e3iCgoeFe3t6eoOGg3mEf3t7gYJ/fXuEfH6CgIOAf4CFgn+DfH+BfoKGfomCe32AfYSCgYGCgH1+d3h5gIiFenqAgYF4gIGDh3t4fX+CfoJ8g39/end2h5SSgGVjdY2XknVxb4OOg4d8fYGDfIB4hIWGf39+fnt6dn6IiIKBgHmDg3+FfYF7e3V1fYV9gYGDgYd/e4J9goN9fIN/h3h+fIR8fn5ygHuDgXx9hn1/dX2Cgoh/f3h8gn16gXeGhYOEeYKAfniAiYyJeWJwgY6bj3Voan6RjIV5coCDgYB+hIWHf358fIJ9iIaDioN/e39+hoCCeICCfX9/gYWJhYGAfX6FfH2FgX2CfHp9hIV9enyCf3p4f4B8f4F/hnt7hHqAgISAhId8dnyAgYJ4gHp/g355hYmJfYF9e3Z5go2ZinhcaH+ckoNybnqGiYB+goiDd3uFhIR/h399gHh5eYmHgX6Bf3iCfH18gX15hoR+e36Gg4F8fIN7fnd/gYSEfYJ/inV9eoCDgICBfX1/e4KAgYh+gXt5hnmCf4Z+d358gH5/f4qJf3l6eoaAgHqMiHVqaIWYpn5sZn2UjIF8gn+AeoKEhYZ9gn92eoCAgoR8e39+goCCf39+hn15eoB9f3eDf4ODgXyAdYWDhX2BgXl/hHuCjnp7f3x/fniJfIGDgoJ6g399fH6Ag316fHmGgIKEgXyAfoN7eoCCh3t6d3d9gHyKmoxxVXOapIl0cHZ8foCFjH94fYB9en+Hf4uEe3+Gf4ODgoZ8fX55e4CKfX6AgX18f36DfXh+hoN8hHyCgICCfHt+gn6Ef36BgYWHeH9/foCChH6EgHqBe3t+f4KDhHx3hoeCgYeDf31/hXaAi5J/fId9aWWJraBoU3WRhoF+h391eXx+e3+LgYGAf4WDhYuEf4WAgIOCfXyAgISBgYGEfIKDf4N8goCAeX95eIGCfn+Cg4F9gICBe32BeXt5e4V8goeBdYB+fYCGgn5+eoGBf4GEfYF8goF6e4SLhImIc3V5fnp4kqGBWVGHopN6bXd8enuKh4CBhnx8fISEgYF/g3x4foB+en+CgIF7fXqCgIaBhYh9fHqIgH6EhH17gnR/gnuCgIODfYF9eoB1hIR8g3l5goGDhYeAfX99fnl/g4aCfX6AhXx/goR6iHyEeIZ8foGRfn2BemVkqrOIUF+MjICLiX5yfHt7gYiJgHiAe359d3uGgYOChHuBg4Z+e3x/fYGGd36BhoJ9gXx7gYB6gIOBfnh9gHt/iYWBg397fHx8fX6Fh4R+gHp+hIJ0hISCgXZ5e32Ge3+AeXV7gYCDhHx9f4JtdIR8gZqecEBuoKl+cHh8dnyFf4eBgnh5gHx8hYaEfIB4gnx5gX18hYN9gYCFhn6DhYaDeYF9foOAg39+eYB7fYd+hIZ+e4F/fX2BfnqAfX19e3+Bh31/goF6gn57f4Z/f4GAdn+CfXyChHeCiXh9hIODjoB3g3pbc7exalJ+l399jn55en13g4qEeYF9eHqCfH+CgYB/hH1+fIN/iHx/f35/fImGfISBfIB9fHp+fn+AhH9/f316fH6Eg36Be4KDhH5/gHuEgXZ/fnuGg358gYR/g4GCeIp/eoWDen+DgH+GgYKGf3B/hneSpVw6h7GIbnp5dISKgIWCe319coWFgX2Adn+Be4GBgIGDf3yCg4CDgnx/f3iBiH2Cf3l6fXZ+gH6DgYh7g4SAd4SDhnl9e4GCgoKEhYJ8e31+fYOBf4aFhH6CfYh+g4B4doCDh4qFh4B1doCAgo6Cd3txVovGkEdii4OEkoN0gYF3ioN8hYV7gn54gYGBfIF/hnx9f4OAgoOBfoeCeoV9gnt+en98gIOChoKAe3+ChIV8g319fX6ChIGDgnmAfXmBfXp+gYd/enuCfnx/gnuBgX6Ce4iFh4J9eH17hIN/eoJ0fot5pZZAWLmkbnt/c4eDfId+fIWBfIl9foR4fYB4goB5fnh5gYF8fH96fnqAiIGBf3t+gIN9hXh5fH18fYGAeH6HdX6IgHp7g4KEhIOAf398f4aGfYCDeXx5h4x7hn57hIKDhHt7gX+DiHeCgneEfniQiHiEb1WlwWFEkoyAi3xwfniAhIR8fIB9d4B8eYWLhIN+gIWCfIJ2hIJ3hoOAgHt4f4B9d4CFeYKFeIKCeod9fH13h4V/g3mGgn+Ag357fXyDfnt7eoCDh4F8gHyHgn6Be399f317fXiAhHeEeXiEfoeLcX54f6yJQIW9d2l/doSHeYFqfYKIf4F0e4B9iH93hICFg36GhXt8f4GGgIF/fYGDfICAg416f4SAg4B8hHl+gH97foR6gn1/gXt/gX+EhH56fYaCin1+fHmDhoF9fXyEg4N8hnyBf4GGgHuDgICCeX57gJOBhmdbvZdDgZJ4iHN2g4GPeH6Cg4x3fn53fYJ/gniDhIaBe3p8fYZ7foV8gHl/gXp8gHyDeXiDgIJ/f4N6g3yMhoGBfoJ/fYV8e4J8foF+iXmIhHWBgH15fnV5fYCCgXiFenyGgYKAfYeFeXt1iIOEjHV5goCqYUu2lmt/eIiWdoZ6dol8hoFvioSEe3p+e4WDenyBeYV8hIN+fH6EenqFfoSAfnp/fIR8fX2Fg3eFeoR7eYaFgX19f317e4N/d4GCent8fXaEfn2Fe4qEfYCCf3+DfX6AgYSBfoF0gXuMkHZ+dIKPeopWf85gVKF/iYF2fnmIhXl5eX9/f4B3h3iDhnx9f3yEiH1+eYGFfXt/f36Ben15gYJ/hH5+fX5/eYR9e32AfXl/eXqBfIJ7gIWAe3l/fHyKe397hoGBhnh+eX9+gIOBdoV9hYR9e32Fg399foWDhIZ3gHCYoDN8vm17dXuVfIN6dYCBhoF7hn6De3uDeoF/fYSFfniIgIR3gIKChn+Dfnl3eIl8d36KhnqAfYB8fnt9f396gnx6hIKIfoF4gYR9gHd+fYaChX17gIKCgHt7eoSCf356f3iHgH+Dc359gYFzf3qLeoF6S7esOn2ZgIV5gYCBiXt/doCNh4N6gnyAf3+DfX+DiIByhHqAgIR+gnyEfX9+gnuChoWDdISIgnx9enmCfoaAd399g3x2fYCCfHh8gYF4gIF6eHd/hYl9fYB+gHh/fYKHeoWAenyBiIx8cnSShnptfYtzp39AsJJigm2Ch42Gan6IkHx1hoODgYeBfX9/g4B5hn+Cf36CgIiDeX1+hXZ7hn9+fYOEhHV6gHyDgI2GgH59h31/gH6Dg4V/gIaJi3qEgH6AhIp7fX1/g32BgXuEf4h6g4R3goCIgHh+g5BxdX6DiXiKa2XCeUibeYKNd3pwkY53dHqLen5+eoR9gIGGhH2Hf4h5e4GCiIZ7eYR8fIWIeHZ1hYSBe36KfHuAgYB8f4KAf4R+fYR7d3p/gH57e4N9foSDfX54iISFgnx+fohxd4N/gYKEeH1ygIaBg3J7lodraY+DfqpScbN2f3xqiYeBaXKLgIl8hXyBhn6Ef319eIeDfX+EgX9/fHiChYV5goJ5fYKFen58gniGfnl9gn17foR/gYeCgX56gICHdYCHgn57hICBf3+BeIN9i36EfHeFiYF8eIZ+hYd/fniDfI2FbXiDl3x2lGGSsk6Bi26ffW9xhZVwfHp+gnuBdYKAgH+Bg39/f4uFfYB6hH17gn+BfIKEeoCAgX58hnV1gYF8fYN6hn+AfoSDgYCAeoCDfYSAen6AfHqCfn53fYF9f3h5ioiAgYB2hoJ9gIKAeoyDdn18h4+NbG2geoqNSJyQcZVjc5aIfnJ/hIiFdn+Ien99hYJ+enqBfYN/f4R9fXiChnx7e4d8eoR+fnGFgYN7gHt7gYSBeX+Cf3h/hH16g3+Be4CIhIyFf4mBgoKCgYiDeIaGfXSDfnp8e4GIgIR8gYB7gYiLgH13gJ5xdIlrqYFciWmOjmN7eoiIenl/jX+DfniDeH58g3V4eoGDgnx/fH1/gYB6gH6HgXmEfYOBhXqBhIWAgXp9gYF8g3iAhn+Bg397gYJ/f4CDi32CgYCEe32FgXd7gnuIfXZ7hISBgnN7iHaKgnV6hYiIkGF8lXmSZ2ifeod7ZZaHgHNxgIWEeIOBfYJ7f4OCgIGEgYB5goV/g4J+gHyDhoB7cn53gIR4gIWDgHiDhIp9gIOFgYCGgIV7eoODgIJ9f4GBgIt6f32DhoN9eoKGfn18g4d9eXyCg3t+fYhwe4SBhnh5c5iQXoxwgq5geIZupnpmg4qNg35xhol5h3t7fYKBiH15d4F9en17hYl7d4J/f4d6gYJ8gIOCgIN+foF+e31/f3uCfIB7gH6GgXl+foCDeYWBgoNzgYGGdoGHgYWBgIKGh3eBdoKGgH6AgniJi3t3d4CIhX1nmoODmVGFpHOSanOZfX1xfYmHfnZ9f319g4F7cnyJh3t8enqCgH94hX96h4V6fXuEfYB+fYKJfXuDf4CBfop7gXx+iX96fYF/g4F6fIZ9fX1+f4F+f4J4gX6GiHZ+eXqEhXx7iIB7gHt/dYKBioF1doCadHuGWqWQTpWAg5pzb32NiHmAb3uIgXp+hnqAiICAf4J+hISCf4SBfIKAe4V+f39+fnh8g39/f4KAf4OAhYOCgIB4gH+BgIR+g3uDgoODeIF9g3x7fnl/iIJ+en57gnt9eoaEeoh9fHiAioCEdnOOj3lvfJBvp2tPr350jmp8i5F8cIWIgXl5hXqHgn2Ef4B4gn96fHuJeneBfYB4foaIg36DhIF4fYF+i313hHeBg4CCf4h+eXiDeH+EhIB9fIeDgIB3gICFgHuFf32AhIN9e3t/dYGIgn9/g3+FhX58jIx0cXmQkHSNY3vEYF+de46IdXR5mX53fIeLfYF7eX5+gXiHf4N6g4F0fH98fHuGeX2CgHR8eXeAhIF+eIGAf4OBhYWEhX6Cend4f4CAeX6HhH6Cd3mBf4F7gH1+hoKKhHx+hoZ4f4SJe3yAgX57iYuAfXmLh3qBdIl5l6NBe7Vkdn9yjoSPc3KCgIVzd4mHgHaBfX5+fIV6f3x/gnl8eYKAgoN+g3x8gHp9e4KAgIx+fX2EgXV8fX19eYCCgnmFhIWAfXp+gnp4hICAfICEfYV8hYd+eniDiIR+eIV7g4CPgW53fYt3b4SHkIN+gEqxrkSGk3yNd3p1hY+CeG6Ihnp8en92fot8gnZ9f3+Cf4Z7g4F7hYGGgYKBe4F9hYp7hn2ChXuBfHqCgX58g3iCfnmBenx6f4CDfXx6goN7gn96g39+f3uCgIN6gYB8iYWEfHSCgIN9f3p7homHe2uBdLJyL7SlaIBnjYyCgW+CgYaBfHx9hX59fXiFg392fIN/goOBfXqCgoV/fYV7g4GChn6Ee4N9hHyAiHqBfoB/eYKDfYKChoGHhX56f4CDe4N+fYGBf4CBfYh+gnl8iX6FfYmBfoV/hXuAgoGFe3x/eo94hWJz129CmoeHh3KAfXyIfn50i319f3d9e32DgX58gIp8gXyGgH+BeYKAfIZ+eXx+f319goOEeX96d359gYCGfnp+f394gnt7gIN7eoCEeIiAen1/gXuEgH2DfoWAeIF4hX2EhHt+gYd+eYd1foWBf2t9eYyqPGfIcnCBepZ9fn1zh4GJhHV9eYaBd4J4goV8hX1+fISGgH5/iH2AfnaAf4OFfINyfYWGgIZ9gX6EgoOAf4CBgoKAgoR9eYGBe4GAhXyBgX2DfXuKgICCfn95gn+HfoB5foCJfnt+doeFfX9+e42Hg3pMo7ROYqB9g3txjICFiXaDf4WHgH9/eoCFfH2BeId+goR/f4J/hHuDeIWJhoB9f31+fHt6foKIhYSBfIGBd4J7gHt/g395foCCfoF/fYF/hIKBfISGeIV3g4GHh4KHfYB/goN6d4B+iIB5f4J/inJ5eXyrfTOYqWd4gHSQgIGDdoqChIV7eoaCgn97gn6Ghop5fX6Ee3t9hn9/fn6Ig4KDg4ODhIaDf35+eXx8goV7hnuAi4B3e4B9iXmHgHyAf4eCfoJ+fH6BhH95gX+Eh359hXx+g32JenB/foiJgXmEfZKIeYpWbL+CRHyVeoyEa314iYl8gnqCj4d9inx2iIWHgXiCfniFgIR+fH58god8fnt/gIKChH5+gH+Bf3t/dYGAfH19en+BgISCfoGEfn2DgIB8hYF+iXaHen5+gIF/en2GfYCBgoJ4g4N/gX53f4SFhnl3h3ufoEpUr6FofHxzgYeCg4R0eoh8hYuAhIB5gX56hYZ9g3yCgnyGhH1/gnp4goGAgn15g3d+h4F6gnR+fYV9fYB+fYODf32Den5/eYJ/homCeH+Ff3+AfISEgH9+eHd/eYOFe4KEd4aDfoJ2eHyAgYWBcIZpXqa+YU6HmIOPgHZ6fneEhX6LfX6Bd4GBg3yDfn6Cd32FgoOEg4B9hICDgn5/f4OEgomBeXyAfoSEeICJfnx9h4GAfIB/foZ5fomAgn57gXx9foCBfIJ8e3x3eYWAg4WDf3uEcoB/gXiKfoN+gW58iX6Nomg7drOWc4KAcX6Ff3+IhX6AeXyGf3+Ah3d9eXh6g4F9gn+Fhn54gX58fXmCdH57hYKFf36DhIR3d35+gHyEfIGDeX9+hYV6f4GAfIJ8foF8gX99g3p6foR/goWDeXp9f4N/gYh8e4V0f4N8iIeEdn50WYTAnUxbhYt7jpCBf351gYaAgIaEf357d4SBf4iBfXp+end/fYCAhH2CfHp/fXl/gn59g3t/foF8fYGDe3aBfHl9g39+iXx+eX5+foKEe4R7gHuCeneIhHp6hHp3inl/fHx8fHqCeYGIg35+dXN/hHSIpIZLUJq2iGmDhHB9hn+Ag398fIF8f4OGe4KAfIGEfHiAgX1zgnyCgYJ5hoCGfIF+fHuHfYCAgoF7f354eIJ9hX99fn+Gg4SCfIJ7gXh9hHt5goN7gHx9gYaEgIeGf3p9fXyEhYF9iH18eYN9gJKJfod+YG2luHdNZ5WHf4KGgnB8gX+AiIh+foJ+dn5+fX2Egn9/g3l7hoCEfH+GeXh8f3+DgH6BfX2Af4WDfn6Efn6Ag36DgYCAfYN9eYCHg3yIhnt+fX58gn+AfYd6fX1/f4F+g4J6g4CAgIeFhH+HfXR2hICBnpZpSW2vpIBpgIJ6gIqIgoSBeHN8gXx6hIF8g4V8eoOFgn9/eIB0fn6AgoR/fH9/gH5/goCFeoF7fH18gYWCfn2Ffn+ChoF/foB6f3uFen57hYCGg357fHx+foSGgXd6gH57iH99fH+Af3N9h4Z8hYl9ZGiOqZtrXnCLknuBhXt3f3mIh32Eg394f4B6dYGDfniEfYF7e4aBgH5/e3t8goF9eIKBfX9/fXp/foR8d4R9fHuBg32Cenx8fHuGgoV7h32Af4CBd3uAfnmGfIJ6f4qHgYJ+gHJ9gIJ6hYSJfneDgXx5laSBVVuHqZVwbXuDc3iGioF9eX14d32EfoB/hn92foB9g4WFfoOAfoB7fYKFfH6FgX+BgIGCgn19fn17fn1/gYR/fn94fYCHgX+AgoKBfHuAf4R9gX1/enp+f31/eYJ8eICBhH+EdX96enmBiIGFg5CCaWuAl6OJaV1yjYyEeoR8fHJ5homGgXp/f4B7eX1/iIB+gX18hIN+foF9fX1/fYGIfI1+g4N5f4B+dn5+fH55hX18eX6Bh4F3foOBgoOEiYeCf4J/gX6Ch3x3gIV/gHh8hX+FeYB/gXx9hoaFeX5/fHl5lJqMZF1tjJ2QdW50gIN7gYOEhXp6eIaEiH98g4F8e4GCh4KBh4J4e3l8gYJ9foGCiX2Bi4WMg4p+f3p8gH2AhXx3g4V8gIGAf4R8fYJ7hXt6iYOEgIB2fX9/hIeFhH19fHp5e3uChYB8dnmDgIB+gpSCbm90i6CSdWdnepONjXh3fIN4fX6CgYCDe3+DgoJ7goF8hH+DeoSBioN9dYF/gIKCeIeEfXqDhIV8g4N/hop6e3qAfoJ+gY6JeXx8g4J+f36AgIF+foSHeoF+gnWCfoCAgIl8f3J9f4d/fHuDiIGBe259i5SJe2ZxfpCRiIZwdXqHiIV/fX6EgHqDgIWFf36Ee3x+f32BgoCCenZ9hYeBgoiDeYKBe32FhoR4hIGDgIOCgoCAiIN+d36Bf4V+f4d/eoWHgYSAgIB/f3+BfH58gId+gnV9foKHgYOBgX+BdXp+i46BdXBvfZKUg3Rnb3yYk4V8cXJ8iIeAgoePfHt/gYODhIF8eX5+hX19gIGKfXt6gHyDgoKGgoF9fX17f4SAg32DfoSCgIGDgn2Bf4CFfnt6gIOBgYOCg4CHgol9gnt/d4B7gYGDiYCBf3h7f4GUiYJ3d3SEi4mJfXpudIKNiIl8cnZ6f4mJgXl9dn+Dfop8gX59gH95hICFgYeAdnh8hYiAgIJ9gYZ9fIGBgHuIfX15g4F/goCCgnl8eYGEgoR9hoGAfXmDfX5+iYOEfHqAen6Hg397en6EfoGAiIOCg3p8eniCkoeBenV1eImPioF4cHJ0hpWCgHd7end+ioaDfIN6eoB/g4SEf4N4eoOAg4KAf4WCeYJ6g4KAfX2AgnuChoB/hH6BiIR/fnSDfoN/gn14g32AfoCBfH+BeX6AiYSCfXV8dnt/eoCBg4B8eH+Bg4SCfnl5fHuAhoaBgYKEenmCiYR9fn+BeXyEgIiDgn93e3+Ei4d2h3x1eYKMhIR7hn5+fX5+hX+AfHyBg4eBhYF7hHp/g3iAhHd/h3yAg4J+gH+BhYB8g4GCg4V9iYaGen19en+BjH2Agn+BfoKHfoB8gn19goR/fHmBgH19fX6Ff355foOEg3mEg3x9goKEf3uDfnqCf35+g3+DhYB8f36EeYV6foGFfIR+foB+fYGCfH+Be4CBhIB8fX17hIuCgXqCe32DgYCAg4OCgX6BgX2DiH59gn2Bgn52e3+EgISBfXx8gIWBfHyBgIJ5foF5fnd+f36AhYeBfYB8e32Ae3iAh4GBfIOAgHp+hYF8c36Aj3+Dg3d/fYGDhIKKiH2BdoKDfH5+e4F9hHt6gICAfnt9e3t8gX+AeIB+goWCgIGBg32BhoWAfn+AfoGFe3h/dnp8fHl9gYaBfX94hIV/f4J6foF9hXyDgoCCfXmFfH9+hHqAeIN6goN+gHt+goKFg4B/e3qAfH96gH5/fn98f398goCAgHyFgH2BiXp+gYGEgoF6g399e4GEeICBgXp/g36DfXx+fH+CgYSBgXd8f4GCf36Cf4R/fnx6g4OBgYCCgYN/gX6BhIJ8fH97fYB9en+BfXp5gnl8gYOEfYl5gYCDgn+AgIKEgn99f36Eg3+BgYGGfoJ7g35/eIGAfoKCfIh8fYSDgoeCgXx+f36Gg3+Bfn18gn2FfYSBf32GgYR/eX18fYOAgIN7f4N9hYB9foiFfX19eXqAfH59hYGDg359h4CAg4F9foGBf3x+gnaFg39+hHx9fnx8gn19g319goSAgX2Dfn15f4OCf3yGfoN/e3+Df31/gX59hoGBfn6Dgn2CgX9+foGAgIR9gYV8f3qBhH2Efn6Efn17f3h/fYOAgoB/enx6hIR+goJ9f4F5fYOCe3yEhHyDfYR9goWCfHx/e3x7goCAe3l/eIR+hIGHhX2FgIB8gYOHfIWAf3eFgYN+gnyAiH+GfXyBf4B7fHyBgIGDgX6Ifn9+dnuBfIGKfnyHeX57gYJ6fn6Ae4GDfYZ7eYCFg3eDf4CGfH99hn2AgYF8gn+BgYB9fH96e32AfYOBfH2BhoB9gIV9fICBg32Aen58fYN8gHx9fnt+gn+Fh398fH9+fYJ/fH6Efn+Ag398hoB6gH56fYCHhICIf398gHqFgYGEhoGBhIR8hICFfXuCgXuCinuCfYKHfYCBcYR7goOFfoeBgH+BgXuDfYSDfICEg4N7goOEfn+EeX6DfXt/gnqBhIJ/gIJ+foWAfn2Ad399foCAgH9/f4V7fYZ8gIKChIF+e358gIODfH16gYGAf4OAg32GhHx6g3x6fH59gIGDgoCFhXl/gXyAgHuBf358g316eX+BfYKHgH11gYJ9gX18foKCfH58hnp5e36GgHd6foSHg3+AfH2FeX+AgIN/fYd/gn94gHx9hn58f358g4B7hYGCfYB7fYh9fYB5g4J/fYd/enx2hICFgHyAgH13dYB7ioZ/hHV6e4GSf5t0Gpy4cod4dYF3joCGgHaEe3qHgoOCg31+iXiHfYd5f310foF+fn+HfXd6enx6hoB9gXyAf4R/g32DgYF9hXyEg3+JgHx9fn5+gICBfnmEfXt+gYCAh4J+eX6JgIN/eoB7foJ9gIF5eXaHeouKg4ZleG1w5Y0vf3mDk4N+fYCBeId+joeCgH95eH1+gIN7gHp9gIF9eYCFeoOFgXh9fIKDgoCBgH57foKDf4N5dol6fYSFh35/fYd7gH15g3h6f3d9fX1+foZ/gXl8eHx5fn+Ae4t9hn6AfnqJf4eEeXhxhX2JiY+kNT7Ik3yJbIN3foJ7iYGHfHt+fn6DhYKCd3mCeYGEfIaAgX6Ag4B+hIN3gnx8gnqBiX6Fgn+EgX18gn+FhH6Cf3+CfYKFfnaDfnd8gX+CgYV8hIR+eYV7f4eFf4R5g3iGeoeEgIJ2gX59jYGNfoh9bYFUpuJPV4d1k32FhH1+d3uBfoaFiHmDfYB+goKEeoZ9iHyFhISKfISBfX5+gn6AgoB+hnqDeX5/hnuGf3yBfYF/gIN/gX+BfHp8eIOCe3l8fXx8f3yFeX+ChoWCfH2Dfn98d3p8eXiCgoSFgn17en94knqXhxuGxnWDd3mDeop+g4V9g3t8dICCgod6gn17fXl8gYN9gIF0f31/h3mDhHyCfoJ+fXuCh4GCen2AfYKAe4OEhHZ8gHqDgIZ9gnx6gIKAe398fXx+fn2BgoWAfYl6e310hYCEf32DeIF5hIN/jHiDcHF0XdWqNnl9fJWBinx8dHmFe4mAh4Z9gIB8fXuHgYV8hH57eH6FgIGDgId7foWCg32FfX5+g4V8hYKCg3iFe36Cfoh/f3uCfX6IeX2If351fnx/fn2Ff4KCgoF4gXuIhIKAfoF4f4V7hIGGf32AcIeAiJaBpkwzvKF/h2l7c3uBe4l7hnx4fneCh4WBgIJ+hH6Ai3x5gYWCeoF7hXyAf4CDf36HhX5/gIR7fHmAgIOCgH97gX+DfYB8iIOGgX17eoGBgoOBgImBeoJ3h4N6hYeBfHl8fX+AgIGEdXiFe4uEi4KFiWl9YIThX0WEcYqLiIx9hXB6gnyFhX2FfHx5hYR5g4OIe395e4KCg4KHgX6BgH98g4l2fIF2fniDfYF7fYN8gXuEf4CBgX99gHd9gX+GfoB2gIp3hoR/e4GFiYJ+f4J+hX2EgH2DcoF/eYiBhX19cXiGepiHmpQcc8Z+fHxzfmuJgn+JgoJ7eYB9fIOGfYGEen6Ci4J7g3x8hIN9e4h+hYCBfHZ+hoWKjHt6g31/fn5/fHx8eoKCenuAf4J+fH98e4KDgYKGg3yGdIeBhn+Bf4KFe4GAfYOFgYaAgXB5en19hYt3gnV0e1zIvjxqf3qYf4h8gH53iXh9gn+LfIB9hH6Ef36DfHuDfnqAe3+GgH2AgXqCgoSBhX57fn18e4F+foiEfYd7h4GCgX+AhX9/fYCChH6BiX94e4KEhoqEg3mEfYF8g4aGjnx+fISGe4F/g39+gW2AeX2VgahbJrWudop0e3N+h3uHgoGBen15f36DgH2AgXt+foKIfYeCe3+GeoF8gYV9fn9+gX2DgISAhH16gHiAdn6BgIKEfnyChIB9f32BdX6EhX+IioCDhXmAgYODg396hHWBeICHfoZ+gYF9d3mOg4yGfoRogmV/5HQ5hXeJjHqPeIB8eX9/i3uJgnx6eIV4fYiDfHyAfICDf4N+hX2BgH1/fX+BeYeEfn2Ag3+Kin2Efn6BeIGAhYaCgIJ/goN9iYZ+gYKEgIKGfYl9hX+AhXiEf4qAfoB/e3d8gH+DfYl2fH1xhXiNjI6fJFjUinyFcIJ1hICBgn+DfXyCe4eBgYF7d3J/e4GCgISAe4KCgIqEf4aIgIN/fIWGfoGJgHx7gXeFh4CBe3+AhIJ+gYR9gICDhHqAf4N8goB+fHSDhYKCg4aCgHh1hH2Hg4eIf4J/gYF9h3+LgYF8aoFZtdQ9ZYh1mH6Ch3yCcn6AhYaAgoaCfHuGe3+Bg4F+f3aBf4J7f4B8fn59f3yBhIJ9fH5+g4WChXp/fYB6eHiAg398fnWFgXt9e4SEfIB/f3qAfYKAeHp+fnl7g4KJgIOKg394h36Ggn6FfoBye3p7j4WjdxCevXSJcnN2fY55h4F/fnF+fIOFe4iIgXt9foCCfIV/fYKCf359fX6Ch35+fH6IgYJ/g4SDe3t6e4KGgH59gIKAhH5+f32ChHt2f32IgYR6gnmBeoKAgoKFf4R8doGEfoOAeYWAhHl2f4SQj4ZybnOElJSIfG1pfYuLhn2AeHyIhXl+h4OGg36BgoCHh4KBe4N/hIOCe4OGgn17gXuAhn97fYF/eYh+fX2AhYJ8gH9+f3p6gXp7gn16g4aFfn5/e3uEh4F8gYR9hXl6fHqBi4J+gIF7fnt6foaIhIJzb3yIjpSCbmlxfpOXh3lueIOJjYGCgnyAh4V5iISCh3p4fnmAgoR+i32CgH5+g4ODf4B6gYCChIR6eoGEfXt7eHiCf4OGeXuDe397fHiCgoKDfX6HhIV+gHp7gYJ4gIWFh4CBeXd8gHqAfIKGgIJ1bn2KkJFya294gZeQhW9ndoSOn4d8eHR9jYWCgYKDhISCeX+Hhoh8f4F9f32AfYZ+g4KBd4OAfn2DgXyAfIKDg4GEfH+Ae3p+gX58enyCfn2EfH2Bf4N8f3x9gIGHfHyIh3+CfH+BhIaDfXh7hn5+fIF+iH97bXeDlJiCeXJtf5GPhoR2cneEjox8eHmBh3mCg4GJgn94d3h4gYN/gHyFhYd6hH6AhoF/e4OAgoKAhHyGfX54eXqFg32Dg4B6gnqBgIaIg4F+gn57hoGDfYCDfIF/fnx7goCCeXt4gn6FfXuDfX18dYKEioiCb2x0d5OXh4Bubn6NkISCdm90h4qBgHx+hICAf4GEhoeGenp8fX99gIGBgoKDe317gYiBent+fn18gH6Bh32AfH18fId9fHyCeX2AgH+DhoGCf4J9hoR/gnyFeoODen6AgYeBgXN0eoKCgH+KioSBd2p/ipKHf29qb4aSlI10a3J4hoeIc319f4CAgX+IeISDfIF+gIF4hIeEhIR5fHd+e3+AeYKHfICFhIJ+f3x5hXmBhYiAgH93gH+BdX59fYKDe31+hYiGfIJ5eoF9gn2Cf4J7doJ1f4CBhHyEf4N4doB9io6Qf2x0g4uRkn96aHB+jI6Cf3h4fn+HgYF/gn+AfXt+hImHhIJ6f4GAf4KAhYGAgH55d4F/gHuBgIKBgIWBhYWDe3V/fICAgIF7foOAfYSDhoGDg3x3gYOCf39/hIOAfHZ9eIKKfn9+eX1+gnx8fIF8fHZzfYWYjn1rcXeIj4+Ac3Z3foWDgYV5gXl+f3yAf4qGgHt5en6AfYOCfX59g3mEg4J9goZ5goOHh4KCgoV/gH2GfoKChH98d4N9f4OAhIOFfX95goJ/gXx5eIiEfoJ/hoKEfX1/gYWGhIGBhoiBgHt1g4OJhHlrdHqMl491ZGx7gY6Jgnl2gH+Cf4l9f356f3d5gYCAgIB2foR+gn98goV/gXl/f3+FfoB5fnuGgYJ/hYSEgX57fYGFfICAfoSJh3p6gIaFhHt8fn5+hYKBgYCBfH58dn99g4B+fIF6gXp+hIGBfnR2cYyQi4R8aHGFiJeOfHRveYOPgoh8fH6BhH96eoOBgH58f3l9goB8gn97fX5+g36EfX19fYOFeX+AgoJ9gH97eoOKgXWFfXuIgH19fIaCe4B8eHt+gYF7fYOAfnp6g3+GgoB+fYKAdoOFeoSEfnh8fIGQiH50aHmHjZKJfG9sf4+Kg3F3dXuHfHyChn+Eg3h7eoeKiX99fHx9fX19hoiFfn59eYCHhXx6fHx/fYKAeoOAfn9+g4F/hIB7gYJ+eoKEg4OChX96fnaAhoZ3fH+BhHuAfYGIgH6Fgnt/f3qEf4KCinZ2en6Ll4yCb2R0fpKRhnFtd3uIgoh/end9fH5/f4OMhX57fn+FgYF6f4OBgH19gX2Ghn2BgYGEhYF4gYCHgoF/fXyCf4N+doR7gn57e4WDgX2CenmAfIZ5fn6HfoF7gIKCh396e3t8g4OBe4mDfnx5eYOIi4R2b3J8h4ySemhoe4iTh354dnp9gYGFgn9/fX56eHyEgIZ7fH2De36DfYCCgIOAf4CDgYCCfICBgIJ/f3+Dg4V8fYGDi399fHp/hX19e4OIgomAfn1+iH54fH6Ff3t+hoCDiHx9g4F+gX2GfYGJg4J1dnmAk5eFfHBrfpCZj3trcnqBhod+eXt8fn5+h4CFg3+AeIWFgH+FfH6DfX5/fn6AhH+AeXt5f4SBenx/eYZ7eXyDgn94fICEeHuBe4ODg3l7fYd8f4GGgX16f32AfX2HhH9+fXSCgH2FgIR4foF5dnuEkomCdGp3fpCSg3tqcXyKkYqCeG16hYCCfISDfXt9c3Z9jYGBgIF/hX9+f39+e4V8fHuAg4ODgn6BgXl8fYB9iXt5gX+AgH+AfnuDg35/gHh+h4KCgHl3eX+DeICAg3t6e3x/gYOCfX6EfYJ2fYSEhoR9dXF7houPhHJqcYeSkYh0cWp1i4qGfn99gICDfX6Eh4F8e4F8hImDfX99fYB8gIGGh4SAhoJ3gX6Gen+EfoB7e3p/goF8gX16eoF/eoV7f4B9en+EfYGEeoB8en2Dfn2ChYGFdXl/fH6HhH5/hIF7d3R7kI6EenNxf4OVkX93bHWFlJGCeHF8f4V+hH5/gYJ/fnp5gYOCf312f4J2hH6Ff3mBgXKAgH2DgHeBeX17gH+FhYV5hX17fX59fYGAhXx/fnaBfIaDhoB0f4ODfIaDgnp+fYKBf4KFe3p6eYOCf398hIqHeXF3eoqRg31ubHWNlo+IcWh6hYiFhYF/fIZ6f3t9eoyEenl/goaEgIOEgn6BhISCfYmFgIB4fISFhXt8f314foOFhIODiHh9g4GDg3mCeoCDg3h9e399hHx8gYKCg4B7hISEgnx6eoOIhYN/fn+AfHh7g4qPgHRvdXuKkYp7bG52g4uJgnJzeIGIgIR+hn5+fXx5ioeGgYB8eIGAgYCAhn+Jfn15g4CGhIB7e36CgnyHgIh8hIJ7foKEgYB6gIJ8enWAeYeChneBfn2Mf35/gnyJg3l6gIKHh4N1gIiCfn2FhIKCdnNse4SOjIZzbXd+j5GFc3NzeoiEgYSAend+fH2EgYSEg3l5fYB+iYB7hH+Bf3h7hnmGg4B9eXl3g4KCfIF9f397e4mJgXuAeoiAgIN4hX2HgYB4f3uGgX6CfX2EfHp7gYKJiHp/gISHgn6HgX+BgHt6foSPi3pubXSBj4yGcm10goiHh3p2eICHhX+FfICHgHx+hIOHgH58gnmBgH98e4CAfnt5e4GGhn+Ae31/gH54eoJ/hHh0gYKFf3t/goCGfXh8gH+AhIR/g3uCgn15d4SAf3x6en6ChoCFgIB/fYB3fIOJgnVzeXuKiYp9cHF3iJGNhHl0c4GMg4B+f3yCg3x6g4GFgnx8fIGDgIKAgH+Ehn99gYODfX5+gHp9eX97foOAfHp9eoR9fX16iXyCf36HgneHfXZ4f4B/i4OEfoF9gIOBgIWCh3qAd357hXuDf4KFgX13eoKMjIxxcm5+ipGIdW5saoaRioB+e3h8g4F+fYKBen5+d4WDhYZ/fXuIg3yEh4J9gXqAdnuLhoWBg39/gX58gIZ6h3l9gX58h4R8fnx+fn59fHWCg395en6Fhn17e4B+fX9+eYZ+hYZ3enl7dnx/g4qLh4N2eXaFjo+Cc2xxhJGUk3hsfXOGiIN+fnh4eXx9fYaLg3t4f3yDhYKDfYCAhn18fH1+f4N+enV+gHl4gn18hIKEeX54gnx5fXyCfn6DfYR/f4B4d36Gg4qAgXiDfX58e4J9eoV3g3x7fIWJgod9gn13cnuDkIiCdGh0hIyThXVuc4GMlIt9dXF9hICDiISHgH99eHyEg4WAdIF9e31/gn2EhIF9e3d8fX9/foN/fX1/gIN+g4Z3g39/goOCiHuGe4B9f4J+f4J+e4B9fYGIg32Ahn9+enyChYGCd317g4GAeIWHioWAdnF/jpOPeHFrdIyPlYZqa3R9jIiFenyBf4J+d3l+g4V/eH+AgYd+gX1/eX58goGFhXuAfICDgoCBgYCAeoF6hX5+g4d/g4N7hHl8eoB9f3+Bf3p9foOCinx+eIJ+enx9goGAe4B0g4eDgISDg3l+f356hpCLgXJqeY2UkYFybH2JjYmId3x7eoN8gIB8gX1/fHqEgH9/fX5+foOBgn1/fYWCg3uDgn9/gH1+e4GDgXyAfYSDeH9/gHx+gXuBfYF+gYR+foCCeHx/fn2Bfn17e4N8gIB5gIV4hH55gIB+fnp6gHt5f39/foSAdoGAgYeAe4N9g4F4foCCe4F7goB5doSIgIF8eYN+fYGBgYR7gX6AgX+Cf3h+g3+EfoCGfXt9hIR+hoWAfX9+foGCfoJ7fn17god+fH53goF+eX9/hnqBfYGAgoKFfIGBgHt3f399hYR9inl9gIN7fYWEfoCEfoCAgICCf3+Ag3+Bf4R/f36EgXt/f3t/hn2Ae31/d4d9e315fXmFgnp8fn9/hnt7d32HfIJ6gYCDgHmBgXyDg4B5hIF8iXiEg4KChYeHfIuDhoJ8hIKBfXuFfHqBe317hX5+fIOCfX+CgIOFgYGEen98f3d/hXx9gX2AfX6Gf359foGAg4KDfICBg3+BgHx+fXt9fIWFgnx9goOCeIWEf31/fYR7gYSCfXqIfoGDfoB+gYJ/g3+EeYF+gH19foB+hHx6gH6EhH9/fH53eoF+g4iFfH90gYN/eIaDf359gn55gH58fYaMgHp9gX17iYCBgIKGe3+Afn+Dg4SCf3yDhnd7f4SCeHuAd4B+gH5/gIF7foGBgn6DgXp8f36EgH6BhIB+fYCGhYmEfn56gYF/eIKBf3uBeoCJgX95d4F/gX2Bhn+KgIB6fX6DgYR7hHt9fIF/gYiDfoCDh3l+hIWBhIV6hH2CeHmBgX+DfoF9hXuAfoB9hYF+g4WDgYN6fYV3gX+Bg3yEf36BfIaBfYR8f4OBgnl3eYGCgYN9gIWBhYR8fYN8gn15gH9/foF/fnyAf36Ae4GEfHuBgoN7f3mDfYaGf4N/gHx+fYZ8fYN/foF8gXuIeoV+eYGHd3x/gYR/foKCgIJ8gX6Bg31+gH+EgH5/g31+fYN/fneGf4J+gXl+f3+DfYGGhoN/fH95gIKGe3l7en17gX59gn2CfXqBgn9+fIJ9g32CeIJ4g3+AgH58en+Ff3qGfIJ9fYB7g357foCDf4GCgX1/goGCgYB9gIeBe36Df4aAeYCGf3x6f36IeYGEhYB7gneFe3qAfICFe4J8gnyKgoOAgYODeXx/dn9+gn6JgIqBf357gnmFfYOBg4B/fIOGgnd/gX5+fYiBfoWAhYCAfoN9fH6CfnuDe36BhYJ/fYF5hX98eYJ/f4GAfoGIhYJ7gX57hH2CgoCEgHl+e4F9g36JgYR7gYF7in2GgXd+gH6Chn19fn2Bfn+Dg4J7h4N+dod7h4F8hX9+gIB/foB7f3mJhIODg319g4V+fHqBgnx/d4B7gH5+gnp/gHqDfIB7g3+DeoJ+fnt9fnZ9gIR4en+If4WAhn1/f4mAfYKCg4aEfod5hH6Dgn57fIB3en54eoaGfoN8gn6DfIOCf4WAiHyBhHl+f4CEgoKAgH99fXmBgYN2h4KCf32EfYF7f3yCeH6BeYCHhoJ7gXyBfIl/e4CEfn17fIB7fn2Ff4N/fX6Afn16gYCDeX6JfHqBfoGAf4F8gHp8d3yDfYZ+gIiBfYN+f3qEfoOFg398f4B/fnyEhICChImEfn14g4F7fYN9hn6De4J8fYKBfn+Fg4R/gIKEhXiCeoaBfIGEgX6DfYGAhIN/fYB9foKGeIB/gYJ7gIF9e3iBhYd8fX2De4N/hYd+fYN6fn9/fIB9h4B/fX+AfHd7hYV5hn2AgIZ9gn98gIB/gYV7gneEfnp7fIB5eX1+e4GDgX57gH5/fYCEe4B3fXl6gX9zfoOAg4c=",
     "caption": "echo.wav · 8 кГц · 7 секунд"
    }
   ],
   "type": "text",
   "prompt": "Построй спектрограмму, прочитай слово (8 букв) и введи флаг строчными в формате ctf{слово}.",
   "hint": "Нажми «Построить спектрограмму». Слово написано крупно, читается слева направо.",
   "success": "Блок A пройден. Осколок ключа смены 1 из 5: {{shard}}. Запомни его, он понадобится в финале.",
   "fail": "Слово появится на спектрограмме крупными буквами. Введи его строчными: ctf{слово}.",
   "id": 8,
   "h": [
    "1a640843e8dfaae9d359c686ccc4b17a18a5facdcf37ea99e660b8da7f89c949"
   ],
   "shardEnc": "ce9519a3"
  },
  {
   "title": "Ворон шепчет",
   "role": "Crypto",
   "difficulty": "Средне",
   "time": "5 минут",
   "points": 25,
   "story": "Перехвачена записка с эмблемой ворона. Это шифр Виженера: каждая буква сдвигается на число, которое задаёт очередная буква ключа. Ключ короткий, и совсем не секретный для того, кто знает формат флага.",
   "artifact": [
    "Шифртекст: tta{vnmei_auzskiej_ii_xuv_dvvx}",
    "Ключ: птица-вестник, 5 букв"
   ],
   "type": "text",
   "prompt": "Расшифруй и введи флаг.",
   "hint": "Известный открытый текст: флаг начинается на «ctf{». Сравни «ctf» с началом шифртекста — получатся первые буквы ключа.",
   "success": "Верно. Знание формата флага — это известный открытый текст, самая частая слабость шифров.",
   "fail": "Вычти из каждой буквы шифртекста букву ключа (A=0, B=1…). Ключ — птица-вестник из пяти букв; первые три буквы выдаёт начало «ctf».",
   "id": 9,
   "h": [
    "6b889383551310aee7060ff115d3d266878f6f2464573233e87277ef5aa227ee"
   ]
  },
  {
   "title": "Рельсы",
   "role": "Crypto",
   "difficulty": "Средне",
   "time": "5 минут",
   "points": 25,
   "story": "Текст записывали зигзагом на трёх «рельсах», а потом читали построчно. Такой шифр называют «забором» (Rail Fence). Он только переставляет буквы и не меняет их.",
   "artifact": [
    "Шифртекст: crs__pyt{al_ftede_ae}fiohelr",
    "Рельсов: 3"
   ],
   "type": "text",
   "prompt": "Расшифруй и введи флаг.",
   "hint": "В инструментах есть вкладка «Шифры» → «Рельсовая изгородь». Укажи 3 рельса.",
   "success": "Верно. Перестановочные шифры сохраняют частоты букв, и на этом их ломают.",
   "fail": "Число рельсов — 3. Если считаешь руками, посчитай, сколько букв попадает на каждую рельсу.",
   "id": 10,
   "h": [
    "73e4d93c47d1c6bedecb1d347d4558000b17bc948185ed194976d2d37a58cbd1"
   ]
  },
  {
   "title": "Матрёшка кодировок",
   "role": "Crypto",
   "difficulty": "Сложно",
   "time": "8 минут",
   "points": 35,
   "story": "Флаг упаковали в несколько слоёв подряд. Ни один из них не является шифром в строгом смысле — это просто кодировки. Распаковывать нужно в обратном порядке.",
   "artifact": [
    "Данные:",
    "3d3d44736d574b4d3553546f7349544d6341616f633931706c494a72756b32727a45334c"
   ],
   "type": "text",
   "prompt": "Распакуй все слои и введи флаг.",
   "hint": "Внешний слой — hex. После него строка выглядит перевёрнутой, потом идёт ROT13, и в конце — Base64. Все операции есть в инструментах.",
   "success": "Верно. Умение узнавать кодировку «по виду» ценится выше, чем умение её вычислять.",
   "fail": "Порядок слоёв при распаковке: hex → переворот строки → ROT13 → Base64.",
   "id": 11,
   "h": [
    "85b9eab878724c08be05326ee5f010cf554b4c01065c79e705492366284de2f9"
   ]
  },
  {
   "title": "Один байт",
   "role": "Crypto",
   "difficulty": "Сложно",
   "time": "8 минут",
   "points": 40,
   "story": "Кто-то применил XOR ко всему сообщению с одним и тем же байтом. Какой это был байт — неизвестно. Но вариантов всего 256, а правильный даст читаемый английский.",
   "artifact": [
    "Hex: 2f333e7b3d373a3c7b32287b382f3d2034353e0439222f3e0432280435342f043e35342e3c3326"
   ],
   "type": "text",
   "prompt": "Подбери ключ-байт, прочитай сообщение и введи флаг.",
   "hint": "В инструментах: «Шифры» → «XOR: перебор байта». Среди 256 вариантов ищи ту строку, где всё читается.",
   "success": "Верно. Однобайтовый XOR ломается полным перебором за долю секунды.",
   "fail": "Попробуй все значения ключа от 0 до 255 — правильное даст осмысленный текст со словами «the flag is».",
   "id": 12,
   "h": [
    "154410c45b378a7593ae12969f2e4a3a7ede4e6af4e2de7f80ca212700ea143f"
   ]
  },
  {
   "title": "Аффинный сдвиг",
   "role": "Crypto",
   "difficulty": "Сложно",
   "time": "8 минут",
   "points": 40,
   "story": "Шифр Цезаря — частный случай аффинного: буква x заменяется на (a·x + b) mod 26. Здесь автор выбрал a, взаимно простое с 26, и какой-то сдвиг b.",
   "artifact": [
    "Шифртекст: szh{ihhwvc_wu_beuz_qizr}",
    "Формат до шифрования: ctf{...}"
   ],
   "type": "text",
   "prompt": "Найди a и b, расшифруй текст и введи флаг.",
   "hint": "Допустимых a всего 12, b — 26. Перебор в инструментах: «Шифры» → «Аффинный перебор». Правильный вариант начинается на «ctf».",
   "success": "Верно. Всего 312 ключей — для компьютера это мгновенно.",
   "fail": "Среди всех пар (a, b) выбери ту, что даёт расшифровку, начинающуюся на «ctf{».",
   "id": 13,
   "h": [
    "034d4c72e58e344d6ad7d0385bc579ebe1b543f2a725f391d91a84359e0d714b"
   ]
  },
  {
   "title": "RSA на школьной доске",
   "role": "Crypto",
   "difficulty": "Эксперт",
   "time": "12 минут",
   "points": 55,
   "story": "Учитель выбрал два «секретных» простых числа… и слишком маленьких. Сообщение разбито на блоки по два символа: код каждого блока = код первой буквы × 256 + код второй. Каждый блок зашифрован как c = mᵉ mod n.",
   "artifact": [
    "n = 100160063",
    "e = 65537",
    "Шифроблоки: 94828771, 16879068, 1231489, 32183264"
   ],
   "type": "text",
   "prompt": "Разложи n на множители, найди закрытый ключ d, расшифруй блоки и введи флаг CTF{слово}.",
   "hint": "Вкладка «Математика» в инструментах умеет раскладывать число на множители, искать обратный по модулю и считать a^b mod n. План: p·q = n → φ = (p−1)(q−1) → d = e⁻¹ mod φ → m = c^d mod n → два байта.",
   "success": "Верно. RSA стоит на сложности разложения, но разложение маленьких чисел занимает миллисекунды.",
   "fail": "Проверь по шагам: 1) n = p·q; 2) φ = (p−1)(q−1); 3) d = e⁻¹ mod φ; 4) m = c^d mod n; 5) m = код1·256 + код2.",
   "id": 14,
   "h": [
    "f1fb6bd524ecca166cdd87e9f7df3f873ed3a0217862731d53b414fbbccbc69c"
   ]
  },
  {
   "title": "Хэш-охота",
   "role": "Crypto",
   "difficulty": "Сложно",
   "time": "8 минут",
   "points": 40,
   "story": "Из утечки получен SHA-256 хэш пароля администратора. Политика компании: пароль = слово из списка (с заглавной буквы) + год + «!». Список слов нашли в той же утечке.",
   "artifact": [
    "SHA-256: 3bf97bc38716a32691b82227bc1021029c0ff96fc8a0f3ba2cd1ab0af1486025",
    "Слова: Lantern, Mirror, Raven, Shadow, Harbor, Falcon, Cipher, Orchid, Signal, Winter, Marble, Cobalt",
    "Шаблон: Слово2026!"
   ],
   "type": "text",
   "prompt": "Найди пароль, который даёт этот хэш, и введи его.",
   "hint": "В инструментах: «Хэши» → «Подбор по словарю». Вставь слова, в суффикс впиши 2026!, укажи целевой хэш.",
   "success": "Верно. Именно поэтому пароли хранят с солью и медленными хэшами, а не простым SHA-256.",
   "fail": "Хэш считается от всей строки, например «Mirror2026!». Проверь каждое слово из списка.",
   "id": 15,
   "h": [
    "ee2a1af4cd27c770e0d8d4a1bbe14781cb07116e163a044f047916be0b500b7a"
   ]
  },
  {
   "title": "Шифр Бэкона",
   "role": "Crypto",
   "difficulty": "Эксперт",
   "time": "12 минут",
   "points": 60,
   "story": "Сообщение спрятано не в буквах, а в их регистре: строчная буква = A, заглавная = B. Пять таких символов подряд дают одну букву по таблице Бэкона.",
   "artifact": [
    "Текст: tHE nigHt watch NEvER sLeEps whiLE quiET SErvERS hUm BenEath The olD hARbor lights and nobody in the sleeping city notices the signal that keeps blinking in the dark",
    "Таблица: a=AAAAA b=AAAAB c=AAABA d=AAABB e=AABAA f=AABAB g=AABBA h=AABBB i=ABAAA j=ABAAB k=ABABA l=ABABB m=ABBAA",
    "n=ABBAB o=ABBBA p=ABBBB q=BAAAA r=BAAAB s=BAABA t=BAABB u=BABAA v=BABAB w=BABBA x=BABBB y=BBAAA z=BBAAB"
   ],
   "type": "text",
   "prompt": "Прочитай скрытое слово (12 букв) и введи флаг CTF{слово}.",
   "hint": "Выпиши только буквы текста (пробелы пропусти). Запиши A для строчной и B для заглавной. Режь на группы по 5 и ищи в таблице. Нужно 60 символов.",
   "success": "Блок B пройден. Осколок ключа смены 2 из 5: {{shard}}.",
   "fail": "Считай только буквы. Строчная = A, заглавная = B. Группы по 5, всего 12 групп.",
   "id": 16,
   "h": [
    "507de2fcab035a83cffb24f8496db8d2b1976bd00391b88dd212d8b4ba40c608"
   ],
   "shardEnc": "b5d60620"
  },
  {
   "title": "Грепни архив",
   "role": "Linux",
   "difficulty": "Средне",
   "time": "6 минут",
   "points": 25,
   "story": "Сервер «Глубины» хранит логи за годы. Кто-то разбил флаг на три кусочка и раскидал их по файлам. Вручную перебирать всё — часы, а grep делает это за секунду.",
   "blocks": [
    {
     "kind": "terminal",
     "enc": "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"
    }
   ],
   "type": "text",
   "prompt": "Найди три фрагмента, собери флаг по номерам и введи его.",
   "hint": "grep -r frag /var/log/deeplayer. Некоторые строки с «defrag» — просто шум. Нужны только frag1, frag2, frag3.",
   "success": "Верно. grep -r ищет по всему дереву каталогов, включая архивы.",
   "fail": "Склей части в порядке номеров: frag1 + frag2 + frag3.",
   "id": 17,
   "h": [
    "b1764a6a366bc7a7eef758ea6034c9e7d10cce77409b7e0328752b0952b87dc7"
   ]
  },
  {
   "title": "Забытый коммит",
   "role": "DevSecOps",
   "difficulty": "Средне",
   "time": "6 минут",
   "points": 30,
   "story": "Разработчик перед релизом «убрал» токен из репозитория. Но Git хранит всю историю. Секрет, однажды попавший в коммит, остаётся там навсегда.",
   "blocks": [
    {
     "kind": "terminal",
     "enc": "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"
    }
   ],
   "type": "text",
   "prompt": "Найди удалённый секрет в истории и введи его.",
   "hint": "git log --oneline покажет список коммитов. Подозрительный — «remove debug credentials». Открой его: git show <хэш>.",
   "success": "Верно. Удаление из последней версии не стирает секрет из истории. Токен нужно отозвать и выпустить заново.",
   "fail": "Строка со знаком «-» в git show — это то, что было удалено. Ищи токен там.",
   "id": 18,
   "h": [
    "0248ce54207aa9d5afa39215c66878602361244f0d14b0c24201225b4e533f6f"
   ]
  },
  {
   "title": "Скрытый API",
   "role": "Web",
   "difficulty": "Сложно",
   "time": "10 минут",
   "points": 40,
   "story": "Шлюз DeepLayer отвечает только тем, кто умеет с ним разговаривать. Документация лежит на виду, а закрытый раздел спрятан за заголовками. Сервер слишком доверяет тому, что присылает клиент.",
   "blocks": [
    {
     "kind": "terminal",
     "enc": "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"
    }
   ],
   "type": "text",
   "prompt": "Пройди по API до закрытого раздела и введи флаг.",
   "hint": "Начни с curl http://api.deep.local/. Заголовки передаются так: curl -H \"Имя: значение\" адрес. Сначала разберись, какой роли доверяет /api/v1/users.",
   "success": "Верно. Сервер, доверяющий заголовку X-Role, позволяет любому назвать себя админом.",
   "fail": "Цепочка: docs → /api/v1/users с нужной ролью → токен → /internal/export с заголовком X-Export-Token.",
   "id": 19,
   "h": [
    "79c96a3330fb4341c0c0ac3ca97f75da6c74839cf9afdbb0640eeee21dc4eaeb"
   ]
  },
  {
   "title": "Права на отчёты",
   "role": "Linux",
   "difficulty": "Сложно",
   "time": "8 минут",
   "points": 40,
   "story": "Аналитику разрешили читать отчёты от имени root, но только из одной папки. Правило записано шаблоном со звёздочкой. А шаблоны любят ошибки.",
   "blocks": [
    {
     "kind": "terminal",
     "enc": "H05aQgcRUFdLAREfAAwSW0hOR14RF1BXSw8PDUESFg1GQBBOAwFQV0tBCQNADkoYCg1eVAcRUEFLAw4YSUlfIka8k/3BtPK9277Uva1Ltce17uOqpfSj77nQsd4NqdJZtNPik6Teo+G52bHS/dm1ybXu4pik3qPhSQ8PDUESFg1GQBD917XFvdS+0byUR0Wo472w/cpFo++527Hd/d5FqOS8gv3DtPK93L/pvJi72KnaQBL9zEWi37nQsO391LXHtNfjoaTSo+6517Dt/ORFqOm9sP3Mtc5DSzNNTkQPR0NGGVtJSVRCXVhGAAJMBxwKEEUSSh0BT1xZXlBETAUEFR0fRgRUAgACHB4SURxbVUhMDVxMGBwBGUBCUFwdXk0LARxdXwAWW09FTBIZSQQpEBcYEBdWKBMZCgYIAkpLIRwCDUdBABZSCAcaEwVIGEUfCx4STBoEHhQaGkEDQ0sKCRdBVVpOORxNSU5BCUMdOgsBH1dZWEUBCAobEwlyGwQNDFEdWAcXXQEGDQAAAhgHEAowbhdbEAEfRgIOD0wHShsNAm5xTkoHHhtBEg5EBTklXkNHXgZKEAQHMg8wQz4WHBZMU0MVCQseHU4MDVRLFwwKTEZFEUUUAgUCDhtEBQJZBwNfQBULFh5JAQ9MQhsWVAMbCHEaRVJNSUYTA0IfTFkqI2JsJzYlKVNOThleGUobDQIdThURUkIGHhVDSQ4ACQgNS0gGSgAIGQETGF5ET1tITkFYEAogGAULEk4XMB5bBwFWD05HEQwdTE1OTBkCKRYJVEQMR0hPRgERGAIPABwUAFNUERddHwweDh5ZGEpbGTEeDxIWUFcSTAkDQA5HQx9OU0MVCQseHUxbFw8FCg0BHxxZDBFQV0u+/byTuupZtezik6Teo+FTTrDr/dO0+7Tc46+l6VK917/jvaq69KjmvbkNpNdSQgYeFUNJDgAJCA1LSAZKAAgZARMYXkU5F7TPEv3GtPO93L/kTP3VtPi17uKdpN6j4bnTsOf87kWo4LyC/c21yb3XvtNMz+vxWbXt4p+k26LVSb/kvJO70qjrvIf9xrXCQ0sTHEAPBBUNRlZJDxAAFx0FDxgJX0lfAkYeV10bFwYeS1QaTlxaSw0cGBAXVrXsvOu/5r28uudZNV0IDaTdotC46LHU/d+1zLTR46+k26LfSVpNTP3ctcm01uOtpe6j77nQQVgDSUlbFV4cWQwRUFdLvv+9r7riqPW9sA0lV0hNudax0fzttcG02OKYpNij77nQsd4NXElZtNvinaTfo+245bDu/dVFT0pOHg8FVlwZERpDVg+7+6jmvbX85bTwTThdW0z907XEterilaTRoti507Du/dW1y0RfHg2k0qLdudSw7PzgtPu00hIeWkcPEBRCQx5CBBFbXhcQSxgEFUMdFhVOF0kGDQIXQVgQCi0aAAIFD0wZASYQHlNbERcBDAUTQ0APRQcYFwRtRR0WBgIbF0NWD0O1xrXv46yl56LTQEwcEQFJCBwQDRAXD0ddHwYBFU4XEEcUCwhXD05HFh8eFkxBAEZIVEZAEEIDCxcfS1RDHkIEEVkWA11ZVhheT0YcDgNZRAMVBQscWQwRUFcSTAwDSQ5HQ0ZBQFpZSF9ARENMTgFJCg4KCUAPTkcAAgYaQR5CBBFbGRFP"
    }
   ],
   "type": "text",
   "prompt": "Найди, что разрешено через sudo, и прочитай /root/flag.txt.",
   "hint": "sudo -l покажет разрешённую команду. Правило проверяет только начало пути. Что произойдёт, если в пути есть «..»?",
   "success": "Верно. Символы «..» выводят из разрешённой папки, а sudo проверил только префикс пути.",
   "fail": "Разрешено: sudo cat /opt/deeplayer/reports/*. Подумай, как из этой папки подняться на несколько уровней вверх.",
   "id": 20,
   "h": [
    "c2c87501d4ba82134535366a485325becf9f7a436f7573b3e6ad658a9280ab61"
   ]
  },
  {
   "title": "Тайна контейнера",
   "role": "DevSecOps",
   "difficulty": "Сложно",
   "time": "8 минут",
   "points": 40,
   "story": "На хосте крутятся три контейнера. Разработчики любят передавать пароли через переменные окружения. Любой, кто может выполнить docker inspect, их увидит.",
   "blocks": [
    {
     "kind": "terminal",
     "enc": "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"
    }
   ],
   "type": "text",
   "prompt": "Найди секрет в контейнере API, расшифруй и введи флаг.",
   "hint": "docker inspect api. Значение JWT_SECRET выглядит как Base64. Расшифровать: echo <значение> | base64 -d. Остальные контейнеры — отвлекающие.",
   "success": "Верно. Переменные окружения видны в docker inspect — для секретов есть Docker secrets и менеджеры секретов.",
   "fail": "Бери секрет у контейнера api (а не db) и декодируй Base64.",
   "id": 21,
   "h": [
    "293b3d5e3cfa0bffac00bf4f01b5cc1a362413c5e4c20d62cf0848f2635d0afc"
   ]
  },
  {
   "title": "Кто слушает порт",
   "role": "Linux",
   "difficulty": "Сложно",
   "time": "9 минут",
   "points": 45,
   "story": "Мониторинг сообщил, что на сервере открыт непонятный порт. Нужно найти процесс, понять, откуда он запущен, и забрать его конфиг.",
   "blocks": [
    {
     "kind": "terminal",
     "enc": "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"
    }
   ],
   "type": "text",
   "prompt": "Найди подозрительный процесс, его папку и конфигурацию. Введи флаг из конфига.",
   "hint": "ps aux и netstat покажут процесс 3187. Его файлы лежат в скрытой папке — ls -la покажет и скрытые файлы.",
   "success": "Верно. Нормальные службы не запускаются из /tmp и не прячутся в папках с точкой в имени.",
   "fail": "Путь процесса виден в ps aux. Открой его папку командой ls -la и прочитай скрытый файл.",
   "id": 22,
   "h": [
    "a47f18c05276f451f5d20de320f0089a949a084656e8a84fd8b495b4bd2b57c3"
   ]
  },
  {
   "title": "Журнал входов",
   "role": "SOC",
   "difficulty": "Эксперт",
   "time": "12 минут",
   "points": 55,
   "story": "В журнале bastion тысячи неудачных входов. Брутфорсеров много, но один из них всё-таки подобрал пароль. Обрати внимание: самый шумный — не обязательно самый опасный.",
   "blocks": [
    {
     "kind": "terminal",
     "enc": "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"
    }
   ],
   "type": "text",
   "prompt": "Найди IP, который успешно вошёл после серии неудач, и имя учётной записи. Формат: ctf{IP_пользователь}.",
   "hint": "Сначала grep Accepted: вход с внешнего IP, который ты не ожидаешь. Затем проверь его неудачи: grep Failed | grep <IP> | wc -l. IP в строке — всегда на позиции $(NF-3) в awk.",
   "success": "Верно. Успешный вход после серии неудач с одного IP — главный признак удачного подбора пароля.",
   "fail": "Сопоставь два списка: кто входил (Accepted) и кто ломился (Failed). Тебе нужен тот, кто совпал в обоих.",
   "id": 23,
   "h": [
    "c5e44a2bfe0e9b462c78354dc97d9c862506d23cc6b5343fc09af6980813c047"
   ]
  },
  {
   "title": "Корневая цепочка",
   "role": "Linux",
   "difficulty": "Эксперт",
   "time": "12 минут",
   "points": 70,
   "story": "Хранилище ключей открывает единственная программа с повышенными правами. Как ей пользоваться — никто не помнит. Придётся собрать цепочку из мелких улик.",
   "blocks": [
    {
     "kind": "terminal",
     "enc": "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"
    }
   ],
   "type": "text",
   "prompt": "Найди нестандартную setuid-программу, выясни, как она работает, открой хранилище и введи флаг.",
   "hint": "find / -perm -4000 покажет setuid. strings <файл> покажет текст внутри бинарника. Один из путей ведёт к файлу в Base64.",
   "success": "Блок C пройден. Осколок ключа смены 3 из 5: {{shard}}.",
   "fail": "Порядок: setuid-файл → strings → файл по найденному пути → base64 -d → vaultctl --open <парольная фраза>.",
   "id": 24,
   "h": [
    "4d0640aa5c87e510914c61b52e4860d89dae9e3d61fff0688c4035881d47bae6"
   ],
   "shardEnc": "4044a6e7"
  },
  {
   "title": "DNS-туннель",
   "role": "Network",
   "difficulty": "Средне",
   "time": "7 минут",
   "points": 30,
   "story": "Рабочая станция 10.0.4.31 ночью отправляет странные DNS-запросы к домену, которого нет в списке разрешённых. Субдомены похожи на бессмысленный набор букв, но разделены номерами.",
   "blocks": [
    {
     "kind": "table",
     "caption": "Захват DNS-трафика · станция 10.0.4.31",
     "columns": [
      "Время",
      "Клиент",
      "Тип",
      "Запрос",
      "Ответ"
     ],
     "rows": [
      [
       "03:00:00",
       "10.0.4.31",
       "A",
       "update.school.test",
       "NOERROR"
      ],
      [
       "03:00:03",
       "10.0.4.31",
       "TXT",
       "s01.mn2gm63e.t.cdn-metrics.test",
       "NOERROR"
      ],
      [
       "03:00:07",
       "10.0.4.31",
       "A",
       "cdn.example.org",
       "NOERROR"
      ],
      [
       "03:00:10",
       "10.0.4.31",
       "TXT",
       "s02.nzzv63df.t.cdn-metrics.test",
       "NOERROR"
      ],
      [
       "03:00:14",
       "10.0.4.31",
       "A",
       "time.pool.test",
       "NOERROR"
      ],
      [
       "03:00:17",
       "10.0.4.31",
       "TXT",
       "s03.mfvxgx3e.t.cdn-metrics.test",
       "NOERROR"
      ],
      [
       "03:00:21",
       "10.0.4.31",
       "A",
       "mail.school.test",
       "NOERROR"
      ],
      [
       "03:00:24",
       "10.0.4.31",
       "TXT",
       "s04.mf2gc7i.t.cdn-metrics.test",
       "NOERROR"
      ],
      [
       "03:00:28",
       "10.0.4.31",
       "A",
       "cdn.example.org",
       "NOERROR"
      ]
     ],
     "mark": [
      1,
      3,
      5,
      7
     ]
    }
   ],
   "type": "text",
   "prompt": "Собери части из подозрительных запросов по номерам, расшифруй и введи флаг.",
   "hint": "Склей средние части subдоменов (между «sNN.» и «.t.»). Кодировка — Base32 (буквы A–Z и цифры 2–7). В инструментах есть «Base32 → текст».",
   "success": "Верно. Так данные уходят через DNS: запросы разрешены почти везде, и их редко проверяют.",
   "fail": "Нужны только запросы к cdn-metrics.test. Склей куски в порядке s01, s02… и расшифруй Base32.",
   "id": 25,
   "h": [
    "9a2e40dd89d8b6a59270c0f2cb96a85789925c8a13eede0e49a370adda14aaca"
   ]
  },
  {
   "title": "Basic без секретов",
   "role": "Network",
   "difficulty": "Средне",
   "time": "5 минут",
   "points": 25,
   "story": "Админка принимает HTTP Basic: логин и пароль едут в заголовке Authorization, закодированные Base64. Кодировка — не шифр. В журнале шесть попыток входа, одна из них закончилась успехом.",
   "blocks": [
    {
     "kind": "table",
     "caption": "Журнал веб-сервера · /admin",
     "columns": [
      "Время",
      "Клиент",
      "Запрос",
      "Authorization",
      "Код"
     ],
     "rows": [
      [
       "10:02:11",
       "10.0.2.8",
       "GET /admin",
       "Basic b3BzOldpbnRlcjIwMjU=",
       "401"
      ],
      [
       "10:02:19",
       "10.0.2.8",
       "GET /admin",
       "Basic YWRtaW46YWRtaW4=",
       "401"
      ],
      [
       "10:03:02",
       "10.0.2.8",
       "GET /admin",
       "Basic cm9vdDp0b29y",
       "401"
      ],
      [
       "10:03:47",
       "10.0.2.8",
       "GET /admin",
       "Basic b3BzOmN0ZntiYXNpY19pc19ub3Rfc2VjcmV0fQ==",
       "200"
      ],
      [
       "10:04:10",
       "10.0.2.9",
       "GET /admin",
       "Basic Z3Vlc3Q6Z3Vlc3Q=",
       "401"
      ],
      [
       "10:04:55",
       "10.0.2.9",
       "GET /admin",
       "Basic b3BzOlNwcmluZzIwMjY=",
       "401"
      ]
     ]
    }
   ],
   "type": "text",
   "prompt": "Найди успешный вход (код 200), расшифруй заголовок и введи пароль пользователя.",
   "hint": "Заголовок после слова Basic — Base64 от «логин:пароль». Пароль — часть после двоеточия.",
   "success": "Верно. Basic без HTTPS — это открытый текст. Любой между клиентом и сервером читает пароль.",
   "fail": "Смотри только строку с кодом 200. Декодируй Base64 и возьми часть после двоеточия.",
   "id": 26,
   "h": [
    "78c9e091aa9221caa5f1aea6f81756a0142c58d813d69f83c736a1c8d78ad1db"
   ]
  },
  {
   "title": "SYN-сканер",
   "role": "Network",
   "difficulty": "Сложно",
   "time": "8 минут",
   "points": 35,
   "story": "Адрес 198.51.100.9 проверяет, какие порты открыты у сервера 10.10.0.5. Открытый порт отвечает на SYN пакетом SYN+ACK, закрытый — RST. А ещё в захвате есть ответ от другого узла.",
   "blocks": [
    {
     "kind": "table",
     "caption": "Пакеты · сканер 198.51.100.9",
     "columns": [
      "№",
      "Время",
      "Откуда",
      "Куда",
      "Информация"
     ],
     "rows": [
      [
       "1",
       "41.270",
       "198.51.100.9",
       "10.10.0.5",
       "51020 → 22 [SYN] Seq=0 Win=1024"
      ],
      [
       "2",
       "41.340",
       "10.10.0.5",
       "198.51.100.9",
       "22 → 51020 [SYN, ACK] Seq=0 Ack=1"
      ],
      [
       "3",
       "41.410",
       "198.51.100.9",
       "10.10.0.5",
       "51020 → 22 [RST] Seq=1"
      ],
      [
       "4",
       "41.480",
       "198.51.100.9",
       "10.10.0.5",
       "51021 → 23 [SYN] Seq=0 Win=1024"
      ],
      [
       "5",
       "41.550",
       "10.10.0.5",
       "198.51.100.9",
       "23 → 51021 [RST, ACK] Seq=0 Ack=1"
      ],
      [
       "6",
       "41.620",
       "198.51.100.9",
       "10.10.0.5",
       "51022 → 80 [SYN] Seq=0 Win=1024"
      ],
      [
       "7",
       "41.690",
       "10.10.0.5",
       "198.51.100.9",
       "80 → 51022 [RST, ACK] Seq=0 Ack=1"
      ],
      [
       "8",
       "41.760",
       "198.51.100.9",
       "10.10.0.9",
       "51099 → 80 [SYN] Seq=0 Win=1024"
      ],
      [
       "9",
       "41.830",
       "10.10.0.9",
       "198.51.100.9",
       "80 → 51099 [SYN, ACK] Seq=0 Ack=1"
      ],
      [
       "10",
       "41.900",
       "198.51.100.9",
       "10.10.0.5",
       "51023 → 443 [SYN] Seq=0 Win=1024"
      ],
      [
       "11",
       "41.970",
       "10.10.0.5",
       "198.51.100.9",
       "443 → 51023 [SYN, ACK] Seq=0 Ack=1"
      ],
      [
       "12",
       "42.040",
       "198.51.100.9",
       "10.10.0.5",
       "51023 → 443 [RST] Seq=1"
      ],
      [
       "13",
       "42.110",
       "198.51.100.9",
       "10.10.0.5",
       "51024 → 3306 [SYN] Seq=0 Win=1024"
      ],
      [
       "14",
       "42.180",
       "10.10.0.5",
       "198.51.100.9",
       "3306 → 51024 [SYN, ACK] Seq=0 Ack=1"
      ],
      [
       "15",
       "42.250",
       "198.51.100.9",
       "10.10.0.5",
       "51024 → 3306 [RST] Seq=1"
      ],
      [
       "16",
       "42.320",
       "198.51.100.9",
       "10.10.0.5",
       "51025 → 8080 [SYN] Seq=0 Win=1024"
      ],
      [
       "17",
       "42.390",
       "10.10.0.5",
       "198.51.100.9",
       "8080 → 51025 [RST, ACK] Seq=0 Ack=1"
      ]
     ]
    }
   ],
   "type": "multi",
   "prompt": "Какие порты на 10.10.0.5 открыты?",
   "options": [
    "22",
    "23",
    "80",
    "443",
    "3306",
    "8080"
   ],
   "hint": "Считаются только ответы от 10.10.0.5. Ищи [SYN, ACK]. Ответ от 10.10.0.9 — не про наш сервер.",
   "success": "Верно. SYN-сканирование так и работает: ответ SYN+ACK означает, что порт слушает.",
   "fail": "Открыт порт — когда сервер 10.10.0.5 отвечает [SYN, ACK]. [RST, ACK] означает закрыт.",
   "id": 27,
   "h": [
    "8ad54169129200f23041a3c488e0a5884bbb78ed8712813b2c4e2e5f75a4430f"
   ]
  },
  {
   "title": "Двойник шлюза",
   "role": "Network",
   "difficulty": "Сложно",
   "time": "8 минут",
   "points": 35,
   "story": "У пользователей локальной сети пропадает интернет. В ARP-трафике кто-то заявил, что адрес шлюза 10.0.0.1 принадлежит другому устройству. Нужно найти устройство, которое подделывает шлюз.",
   "blocks": [
    {
     "kind": "table",
     "caption": "ARP · сегмент 10.0.0.0/24",
     "columns": [
      "№",
      "Время",
      "Отправитель",
      "Сообщение",
      "MAC"
     ],
     "rows": [
      [
       "1",
       "00:00:00",
       "10.0.0.23",
       "Who has 10.0.0.1? Tell 10.0.0.23",
       "—"
      ],
      [
       "2",
       "00:00:00",
       "10.0.0.1",
       "10.0.0.1 is at aa:bb:cc:00:00:01",
       "aa:bb:cc:00:00:01"
      ],
      [
       "3",
       "00:00:04",
       "10.0.0.15",
       "10.0.0.15 is at aa:bb:cc:00:00:15",
       "aa:bb:cc:00:00:15"
      ],
      [
       "4",
       "00:00:09",
       "10.0.0.31",
       "10.0.0.31 is at aa:bb:cc:00:00:31",
       "aa:bb:cc:00:00:31"
      ],
      [
       "5",
       "00:00:15",
       "10.0.0.50",
       "10.0.0.50 is at aa:bb:cc:00:00:50",
       "aa:bb:cc:00:00:50"
      ],
      [
       "6",
       "00:01:20",
       "10.0.0.77",
       "10.0.0.77 is at 02:42:ac:11:00:66",
       "02:42:ac:11:00:66"
      ],
      [
       "7",
       "00:01:21",
       "10.0.0.77",
       "10.0.0.1 is at 02:42:ac:11:00:66",
       "02:42:ac:11:00:66"
      ],
      [
       "8",
       "00:01:22",
       "10.0.0.77",
       "10.0.0.1 is at 02:42:ac:11:00:66",
       "02:42:ac:11:00:66"
      ],
      [
       "9",
       "00:01:23",
       "10.0.0.31",
       "Who has 10.0.0.1? Tell 10.0.0.31",
       "—"
      ],
      [
       "10",
       "00:01:23",
       "10.0.0.15",
       "10.0.0.15 is at aa:bb:cc:00:00:15",
       "aa:bb:cc:00:00:15"
      ],
      [
       "11",
       "00:01:25",
       "10.0.0.77",
       "10.0.0.1 is at 02:42:ac:11:00:66",
       "02:42:ac:11:00:66"
      ]
     ]
    }
   ],
   "type": "text",
   "prompt": "Введи IP-адрес устройства, которое выдаёт себя за шлюз.",
   "hint": "Настоящий MAC шлюза — в пакете №2. Найди кто ещё отвечает за 10.0.0.1 с другим MAC и под каким IP он живёт.",
   "success": "Верно. ARP не проверяет подлинность, поэтому одно устройство может притвориться шлюзом (ARP-спуфинг).",
   "fail": "Смотри на MAC: один MAC не может принадлежать двум разным IP без причины. Сравни его с MAC в пакете №2.",
   "id": 28,
   "h": [
    "c0bff3d35754a9a0913967e8e34eb69c2db028ca70e7db28f3aaa590a13749d8"
   ]
  },
  {
   "title": "Письмо от «директора»",
   "role": "Forensics",
   "difficulty": "Сложно",
   "time": "9 минут",
   "points": 40,
   "story": "В школу пришло письмо «от директора» с требованием срочно оплатить счёт. Адрес отправителя выглядит правильно. Но служебные заголовки письма ничего не скрывают.",
   "blocks": [
    {
     "kind": "code",
     "caption": "Заголовки письма",
     "text": "Received: from mx.school.test (mx.school.test [192.0.2.10])\n        by inbox.school.test with ESMTP; Fri, 09 Oct 2026 09:14:55 +0300\nReceived: from relay.freemail.test (relay.freemail.test [198.51.100.44])\n        by mx.school.test with ESMTP; Fri, 09 Oct 2026 09:14:50 +0300\nReceived: from laptop-ivan (unknown [203.0.113.140])\n        by relay.freemail.test with SMTP; Fri, 09 Oct 2026 09:14:47 +0300\nFrom: \"Директор школы\" <director@school.test>\nReply-To: pay-now@freemail.test\nX-Originating-IP: 10.1.1.5\nAuthentication-Results: mx.school.test; spf=fail smtp.mailfrom=director@school.test\nSubject: СРОЧНО: оплатить счёт сегодня"
    }
   ],
   "type": "text",
   "prompt": "Определи реальный внешний IP-адрес устройства, с которого письмо было отправлено.",
   "hint": "Строки Received читаются снизу вверх: самая нижняя — начало пути. X-Originating-IP можно подделать и это внутренний адрес.",
   "success": "Верно. Подделать From легко, а цепочку Received подделать намного сложнее.",
   "fail": "Нужен самый нижний Received: тот, где письмо впервые попало в интернет. Внутренние адреса вроде 10.x — не ответ.",
   "id": 29,
   "h": [
    "2076e948e9e55b2528354b4e7320eff426c96a6b30ed3ccf81e6a9c8fbaeabbe"
   ]
  },
  {
   "title": "PowerShell из тени",
   "role": "Forensics",
   "difficulty": "Сложно",
   "time": "9 минут",
   "points": 45,
   "story": "Журнал Windows хранит запуски процессов (событие 4688). Среди них — PowerShell, скрытый и с огромной строкой в параметрах. Так злоумышленники прячут команды: Base64 в кодировке UTF-16LE.",
   "blocks": [
    {
     "kind": "table",
     "caption": "Windows · событие 4688",
     "columns": [
      "Событие",
      "Время",
      "Пользователь",
      "Процесс",
      "Аргументы"
     ],
     "rows": [
      [
       "4688",
       "02:11:05",
       "svc_print",
       "C:\\Windows\\System32\\spoolsv.exe",
       ""
      ],
      [
       "4688",
       "02:11:40",
       "m.petrova",
       "C:\\Program Files\\Office\\WINWORD.EXE",
       "/n report.docx"
      ],
      [
       "4688",
       "02:12:03",
       "m.petrova",
       "C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe",
       "-NoP -W Hidden -EncodedCommand JAB1AD0AJwBoAHQAdABwADoALwAvAGMAZABuAC0AbQBlAHQAcgBpAGMAcwAuAHQAZQBzAHQALwBwAC4AcABzADEAJwA7ACAAJABrAD0AJwBjAHQAZgB7AGQAZQBjAG8AZABlAF8AdABoAGUAXwBwAG8AdwBlAHIAcwBoAGUAbABsAH0AJwA7ACAAaQBlAHgAIAAoAGkAdwByACAAJAB1ACkA"
      ],
      [
       "4688",
       "02:12:44",
       "m.petrova",
       "C:\\Windows\\System32\\whoami.exe",
       "/all"
      ],
      [
       "4688",
       "02:13:10",
       "t.ivanov",
       "C:\\Windows\\explorer.exe",
       ""
      ]
     ]
    }
   ],
   "type": "text",
   "prompt": "Расшифруй команду из подозрительного процесса и введи флаг, который в ней спрятан.",
   "hint": "Параметр -EncodedCommand — это Base64 в кодировке UTF-16LE (по два байта на символ). В инструментах: «Кодировки» → «Base64 → текст (UTF-16LE)».",
   "success": "Верно. -EncodedCommand — один из первых признаков подозрительного PowerShell.",
   "fail": "Простой Base64 даст «кракозябры» с нулями. Выбирай декодирование UTF-16LE.",
   "id": 30,
   "h": [
    "def61e24c9403a44ce7463799c6f7a89cd3f8b4da3a6f57460b51e849afb9c1f"
   ]
  },
  {
   "title": "Вход под привилегиями",
   "role": "SOC",
   "difficulty": "Эксперт",
   "time": "10 минут",
   "points": 50,
   "squash": true,
   "story": "Журнал безопасности Windows: 4625 — неудачный вход, 4624 — успешный, 4672 — вход со специальными привилегиями. Тип входа 3 — по сети, 2 — локально, 10 — по RDP. Нужна одна учётка, которую взломали.",
   "blocks": [
    {
     "kind": "table",
     "caption": "Журнал безопасности · DC-01",
     "columns": [
      "Событие",
      "Время",
      "Учётка",
      "Тип входа",
      "Источник",
      "Результат"
     ],
     "rows": [
      [
       "4625",
       "04:10:00",
       "m.petrova",
       "2",
       "10.20.0.14",
       "Неверный пароль"
      ],
      [
       "4625",
       "04:10:07",
       "m.petrova",
       "2",
       "10.20.0.14",
       "Неверный пароль"
      ],
      [
       "4625",
       "04:10:14",
       "m.petrova",
       "2",
       "10.20.0.14",
       "Неверный пароль"
      ],
      [
       "4625",
       "04:10:21",
       "m.petrova",
       "2",
       "10.20.0.14",
       "Неверный пароль"
      ],
      [
       "4624",
       "04:10:28",
       "m.petrova",
       "2",
       "10.20.0.14",
       "Успех"
      ],
      [
       "4625",
       "04:10:35",
       "admin",
       "3",
       "198.51.100.99",
       "Неверный пароль"
      ],
      [
       "4625",
       "04:10:42",
       "admin",
       "3",
       "198.51.100.99",
       "Неверный пароль"
      ],
      [
       "4625",
       "04:10:49",
       "admin",
       "3",
       "198.51.100.99",
       "Неверный пароль"
      ],
      [
       "4625",
       "04:10:56",
       "admin",
       "3",
       "198.51.100.99",
       "Неверный пароль"
      ],
      [
       "4625",
       "04:11:03",
       "admin",
       "3",
       "198.51.100.99",
       "Неверный пароль"
      ],
      [
       "4625",
       "04:11:10",
       "admin",
       "3",
       "198.51.100.99",
       "Неверный пароль"
      ],
      [
       "4625",
       "04:11:17",
       "admin",
       "3",
       "198.51.100.99",
       "Неверный пароль"
      ],
      [
       "4625",
       "04:11:24",
       "admin",
       "3",
       "198.51.100.99",
       "Неверный пароль"
      ],
      [
       "4625",
       "04:11:31",
       "admin",
       "3",
       "198.51.100.99",
       "Неверный пароль"
      ],
      [
       "4625",
       "04:11:38",
       "svc_backup",
       "3",
       "198.51.100.23",
       "Неверный пароль"
      ],
      [
       "4625",
       "04:11:45",
       "svc_backup",
       "3",
       "198.51.100.23",
       "Неверный пароль"
      ],
      [
       "4625",
       "04:11:52",
       "svc_backup",
       "3",
       "198.51.100.23",
       "Неверный пароль"
      ],
      [
       "4625",
       "04:11:59",
       "svc_backup",
       "3",
       "198.51.100.23",
       "Неверный пароль"
      ],
      [
       "4625",
       "04:12:06",
       "svc_backup",
       "3",
       "198.51.100.23",
       "Неверный пароль"
      ],
      [
       "4625",
       "04:12:13",
       "svc_backup",
       "3",
       "198.51.100.23",
       "Неверный пароль"
      ],
      [
       "4624",
       "04:12:20",
       "svc_backup",
       "3",
       "198.51.100.23",
       "Успех"
      ],
      [
       "4672",
       "04:12:27",
       "svc_backup",
       "—",
       "—",
       "Специальные привилегии"
      ],
      [
       "4624",
       "04:12:34",
       "t.ivanov",
       "10",
       "10.20.0.40",
       "Успех"
      ],
      [
       "4672",
       "04:12:41",
       "t.ivanov",
       "—",
       "—",
       "Специальные привилегии"
      ]
     ]
    }
   ],
   "type": "text",
   "prompt": "Найди учётную запись, которую взломали снаружи и которая получила привилегии. Введи в формате ctf{учётка_IP}.",
   "hint": "Ищи цепочку: много 4625 с одного внешнего IP → 4624 с него же → 4672 для той же учётки. Внутренние адреса 10.x — свои.",
   "success": "Верно. Подбор пароля к сервисной учётке — частый путь к привилегиям. Такие учётки нельзя пускать по сети снаружи.",
   "fail": "Админ с 9 неудачами не вошёл. Мария вошла локально со своего адреса. Нужна цепочка «подбор → успех → привилегии».",
   "id": 31,
   "h": [
    "bed6481e19f4583236574e1b5e403869abe4f2fd2cb98e5835cb247a2ba0e3b7"
   ]
  },
  {
   "title": "Единое время",
   "role": "Forensics",
   "difficulty": "Эксперт",
   "time": "12 минут",
   "points": 70,
   "story": "Шесть систем в разных часовых поясах записали события одного взлома. У каждой записи — своё время в своём формате. Чтобы восстановить цепочку, нужно привести всё к UTC.",
   "type": "sequence",
   "n": 6,
   "prompt": "Расставь события по порядку, где 1 — самое раннее по единому времени (UTC).",
   "options": [
    "Боковое перемещение по SMB — Sun Mar 15 11:12:30 2026 +09:00",
    "Вложение открыто пользователем — 2026-03-15T02:07:41Z",
    "Выгрузка данных наружу — 2026-03-15 03:20:00 +01:00",
    "Фишинговое письмо доставлено — 2026-03-14 21:05:10 −05:00",
    "Выполнен дамп учётных данных — 2026-03-14 18:10:00 −08:00",
    "PowerShell скачал payload — 15/03/2026 05:09:02 +03:00"
   ],
   "hint": "Смещение «−05:00» означает UTC−5, значит UTC = местное + 5 часов. «+09:00»: UTC = местное − 9 часов. Приведи все 6 времён к UTC.",
   "success": "Блок D пройден. Осколок ключа смены 4 из 5: {{shard}}.",
   "fail": "Переведи каждое время в UTC (учти и смену даты). Потом отсортируй от раннего к позднему.",
   "id": 32,
   "h": [
    "e14b914310ef2bd7448c8add261d9a562f0f6967758d6c2dc4d40ccf5dbc8387"
   ],
   "shardEnc": "ad4f4ce788"
  },
  {
   "title": "EXIF-досье",
   "role": "OSINT",
   "difficulty": "Средне",
   "time": "8 минут",
   "points": 25,
   "squash": true,
   "story": "Волонтёр прислал фотографию, но не сказал, где и когда она сделана. Камера всё записала сама. Осталось прочитать метаданные и перевести их на человеческий язык.",
   "blocks": [
    {
     "kind": "code",
     "caption": "exiftool · IMG_2210.jpg",
     "text": "Make                  : Pixelon\nCamera Model Name     : Pocket 7\nSoftware              : PocketCam 3.1\nDate/Time Original    : 2026:02:28 08:41:12\nOffset Time Original  : -05:00\nGPS Latitude          : 40 deg 41' 21.31\" N\nGPS Longitude         : 74 deg 2' 40.17\" W\nGPS Altitude          : 4.2 m Above Sea Level\nUser Comment          : морозное утро"
    }
   ],
   "type": "text",
   "prompt": "Что находится в точке GPS и в какой день недели сделан снимок? Ответ: ctf{объект_день}, всё по-английски через подчёркивание. Пример формата: ctf{eiffel_tower_friday}.",
   "hint": "Вставь координаты в картографический сервис (широта 40.6892, долгота −74.0445). День недели считай по дате 28 февраля 2026.",
   "success": "Верно. Фото с телефона обычно несёт точные координаты. Перед публикацией метаданные нужно стирать.",
   "fail": "Нужно два факта: что в точке GPS (переведи DMS в десятичные градусы) и какой день недели 28.02.2026.",
   "id": 33,
   "h": [
    "b54437ff96ac1d88da1e6dc8cc2a1bd152c513305c0bf7734a216769d908845c",
    "d1ccd69406dc8c80e6bacd833b89682dd8eaa9036d960b25c63456968a179ab6",
    "c0606dedd200e5a75d884dd49fa9cf7079b914da27a103e2a308c3b8b82b0a6a",
    "1967b7cb7d6df07c73c43b825392d093022b2b64573ec3d310c271c789ffc782"
   ]
  },
  {
   "title": "Окно трамвая",
   "role": "OSINT",
   "difficulty": "Сложно",
   "time": "12 минут",
   "points": 45,
   "story": "Кто-то выложил кадр из кабины трамвая и подписал: «Мы ехали к Депо, остановились — и тут я всё понял». На карте города — три трамвайные линии и десятки заведений. Нужно понять, на какой остановке сделан кадр.",
   "blocks": [
    {
     "kind": "image",
     "src": "assets/shift2/e2-tram-window.png",
     "caption": "Кадр из кабины",
     "lab": true
    },
    {
     "kind": "image",
     "src": "assets/shift2/e2-city-map.png",
     "caption": "Схема города (север — сверху)",
     "lab": true
    }
   ],
   "type": "text",
   "prompt": "Назови остановку, на которой сделан кадр.",
   "hint": "На табло: линия 7 и направление «Депо». Значит, едем на восток. Справа по ходу — юг, слева — север. Кадр: аптека «Липа» справа, кинотеатр «Орион» слева.",
   "success": "Верно. Стороны «слева/справа» зависят от направления движения: на этом и ловят невнимательных.",
   "fail": "Учти направление: ехали к Депо (на восток). Слева по ходу — север, справа — юг. Найди остановку линии 7 с нужной парой заведений.",
   "id": 34,
   "h": [
    "dd0405efda3ddd7e229d0522aac47a00c109b68481ea78f26b99e13313047548",
    "b0a7b87bd2e857c5cfefdcf31c3d5c67fa0c1e625f8e035dde6f32229c816afc",
    "14617b5fc2d0631b4edd120c6c1eccb6ec25680a3ce7faf70b282aa883594ad6"
   ]
  },
  {
   "title": "Двойная жизнь",
   "role": "OSINT",
   "difficulty": "Сложно",
   "time": "10 минут",
   "points": 40,
   "story": "Четыре вымышленных профиля в разных соцсетях. Два из них принадлежат одному человеку. Совпадение имени или города — слабое доказательство: каждый может взять похожий ник.",
   "blocks": [
    {
     "kind": "table",
     "caption": "Профили (вымышленные данные)",
     "columns": [
      "Профиль",
      "Хэш аватара",
      "Время постов (UTC)",
      "Привычки в тексте",
      "Город в профиле"
     ],
     "rows": [
      [
       "@harbor_light",
       "9f3a-c1",
       "01:00–04:00",
       "«recieve», «lol.» с точкой",
       "Воронеж"
      ],
      [
       "@quiet_signal",
       "4d71-b8",
       "08:00–16:00",
       "часто пишет «по сути»",
       "Воронеж"
      ],
      [
       "@h4rbor.light",
       "20ce-77",
       "12:00–20:00",
       "без особых привычек",
       "Казань"
      ],
      [
       "@night_scribe",
       "9f3a-c1",
       "01:00–04:00",
       "«recieve», «lol.» с точкой",
       "не указан"
      ]
     ]
    }
   ],
   "type": "multi",
   "prompt": "Какие два профиля принадлежат одному человеку?",
   "options": [
    "@harbor_light",
    "@quiet_signal",
    "@h4rbor.light",
    "@night_scribe"
   ],
   "hint": "Слабые признаки: похожий ник, один город. Сильные: одинаковый хэш аватара, ночной график постов, одни и те же ошибки в словах.",
   "success": "Верно. Аналитики связывают аккаунты по совокупности признаков, а не по одному.",
   "fail": "Сколько признаков совпадает у каждой пары? Нужны хэш аватара, график и привычки.",
   "id": 35,
   "h": [
    "c5cf9cea0e41ba659c627660eb392181ff64f2ea2399b1bafa0068a53aeaaa39"
   ]
  },
  {
   "title": "Пароль на пять букв",
   "role": "Reverse",
   "difficulty": "Сложно",
   "time": "12 минут",
   "points": 40,
   "story": "Программа проверяет пароль, но хранит не сам пароль, а число, которое получается из него. Обратной функции нет, зато вариантов всего 26⁵.",
   "blocks": [
    {
     "kind": "code",
     "lang": "js",
     "caption": "check.js",
     "text": "function check(s) {\n  if (s.length !== 5) return false;\n  let h = 7;\n  for (const c of s) {\n    h = (h * 31 + c.charCodeAt(0)) >>> 0;\n  }\n  return h === 298735336;\n}\n// пароль: пять строчных латинских букв"
    }
   ],
   "type": "text",
   "prompt": "Найди пароль, для которого check возвращает true, и введи флаг CTF{пароль}.",
   "hint": "Открой «Инструменты» → «Песочница JS», вставь функцию и перебери все пять вложенных циклов от «a» до «z». Всего 11 881 376 вариантов — на JS это секунды.",
   "success": "Верно. Перебор — основной метод против слабых хэшей, поэтому в паролях нужна длина.",
   "fail": "Решение перебором: for по каждой из пяти позиций от «a» до «z», вызывай check и печатай те, что дали true.",
   "id": 36,
   "h": [
    "862730aa294d551cab7fec746927e2635bc7344461cefaa203e7f99fd9ac33fb"
   ]
  },
  {
   "title": "Питон на бумаге",
   "role": "Reverse",
   "difficulty": "Сложно",
   "time": "12 минут",
   "points": 40,
   "story": "В архиве нашли скрипт, который собирает флаг из массива чисел. Python на компьютере из архива не запустить, но логику можно прочитать глазами или повторить в другом языке.",
   "blocks": [
    {
     "kind": "code",
     "lang": "py",
     "caption": "assemble.py",
     "text": "data = [228, 2, 20, 20, 15, 7, 25, 21, 6, 20, 23, 27, 19, 25, 22, 14, 13, 18, 3]\nkey = \"deep\"\nout = []\nfor i, v in enumerate(data):\n    out.append(chr((v ^ ord(key[i % len(key)])) - 3))\nprint(\"\".join(out)[::-1])"
    }
   ],
   "type": "text",
   "prompt": "Выполни скрипт (мысленно, в другом языке или в песочнице) и введи то, что он напечатает.",
   "hint": "Для каждого числа v: взять XOR с кодом нужной буквы ключа «deep», вычесть 3, превратить в символ. В конце строку нужно перевернуть. В песочнице JS это String.fromCharCode, ^ и .split('').reverse().join('').",
   "success": "Верно. Умение читать чужой код и воспроизводить его логику — основа реверса.",
   "fail": "Шаги: XOR с key[i % 4] → минус 3 → символ → собрать строку → перевернуть.",
   "id": 37,
   "h": [
    "1392d4584247b57ca367741f2e7ef20bb5f1aaeb765dc76f5a49a6023b22901d"
   ]
  },
  {
   "title": "Мозг набекрень",
   "role": "Reverse",
   "difficulty": "Сложно",
   "time": "10 минут",
   "points": 45,
   "story": "Загадочный файл состоит из восьми символов: + - < > [ ] . и ,. Это эзотерический язык Brainfuck — программа печатает флаг. Читать её глазами тяжело, а вот исполнить — минута.",
   "blocks": [
    {
     "kind": "code",
     "lang": "bf",
     "caption": "mind.bf",
     "text": "++++++++++[>++++++++++<-]>-.+++++++++++++++++.--------------.+++++++++++++++++++++.-------------------------.++++++++++++++++.-----------------.++++++++.+++++.---------------.++++++++++++++++.+++++++.-----------------.+++++++++++++.------.+++.--------------.+++.+++++++++++++++++++++++++."
    }
   ],
   "type": "text",
   "prompt": "Запусти программу и введи то, что она напечатает.",
   "hint": "В «Инструментах» есть вкладка «Песочница» → «Brainfuck». Вставь код и нажми «Выполнить».",
   "success": "Верно. Brainfuck не пригоден для работы, но учит тому, как работает память и циклы.",
   "fail": "Скопируй программу целиком и запусти интерпретатор Brainfuck из инструментов.",
   "id": 38,
   "h": [
    "a0e1f672b707b134b7a6e1f5684a89c91f00c0b37d2eb32bfa0b67c9948f2cd8"
   ]
  },
  {
   "title": "PIN-замок",
   "role": "Reverse",
   "difficulty": "Эксперт",
   "time": "15 минут",
   "points": 70,
   "story": "Последняя дверь хранилища открывается пятизначным PIN-кодом. Код нигде не хранится, зато логика проверки — перед тобой. Ровно один PIN проходит все условия.",
   "blocks": [
    {
     "kind": "code",
     "lang": "js",
     "caption": "unlock.js",
     "text": "function unlock(pin) {\n  const [a, b, c, d, e] = pin.split('').map(Number);\n  return (a * 7 + b * 3) % 10 === 8\n      && (b ^ c) === 2\n      && (c * d + a) % 11 === 5\n      && a + b + c + d + e === 24\n      && (d * 10 + e) % 7 === 3\n      && a !== e\n      && d > b;\n}\n// pin — строка из пяти цифр, например '00000'"
    }
   ],
   "type": "text",
   "prompt": "Найди единственный PIN и введи флаг ctf{PIN}.",
   "hint": "Всего 100 000 вариантов: for n от 0 до 99999, превращай в строку из пяти цифр (padStart(5,'0')) и проверяй unlock. Запускай в «Песочнице JS».",
   "success": "Блок E пройден. Осколок ключа смены 5 из 5: {{shard}}. Остался финал.",
   "fail": "Перебери 00000…99999 в песочнице: выведи те PIN, для которых unlock возвращает true.",
   "id": 39,
   "h": [
    "4a0542d110ac1409e67b223b36bfd91f69c32769efb00991d91c7ba8185513dd"
   ],
   "shardEnc": "74d3a2fa58"
  },
  {
   "title": "Ключ смены",
   "role": "Boss",
   "difficulty": "Эксперт",
   "time": "3 минуты",
   "points": 100,
   "story": "В конце каждого блока тебе выдали осколок ключа. Пять осколков, пять блоков: изображения, шифры, терминал, сеть и реверс. Пора собрать ключ и закрыть хранилище «Глубины».",
   "type": "text",
   "prompt": "Введи осколки из блоков A, B, C, D и E по порядку через подчёркивание строчными: ctf{осколок1_осколок2_осколок3_осколок4_осколок5}. Они показаны на панели «Ключ смены».",
   "hint": "Осколок выдаётся за последнее задание каждого блока (8, 16, 24, 32 и 39). Панель «Ключ смены» показывает уже найденные.",
   "success": "Хранилище открыто. Ты прошёл все пять слоёв «Глубины».",
   "fail": "Проверь порядок и количество осколков: A, B, C, D, E. Если какого-то нет — вернись в блок и реши его последнее задание.",
   "id": 40,
   "h": [
    "7c1b5250ab9be597dd0ffcbf1cadc77660fe374601a425ddbb1633bbc5c7e230"
   ]
  }
 ]
};
  window.CTF_MISSION_PACKS = window.CTF_MISSION_PACKS || [];
  window.CTF_MISSION_PACKS.push(pack);
})();
