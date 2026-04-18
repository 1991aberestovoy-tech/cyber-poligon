const TOTAL_SECONDS = 45 * 60;
const STORAGE_KEY = "cyber-shift-progress-v3";

const missionPacks = window.CTF_MISSION_PACKS || [
  {
    id: "shift-1",
    name: "Смена 1: первый инцидент",
    description: "Фишинг, пароли, права доступа, логи, XSS и план реагирования.",
    missions: [
      {
    title: "Фишинговая почта",
    role: "Аналитик SOC",
    difficulty: "Легко",
    time: "4 минуты",
    points: 10,
    story:
      "В школьный центр пришло письмо якобы от организаторов олимпиады. Нужно понять, безопасно ли открывать вложение.",
    type: "multi",
    prompt: "Отметь все признаки фишинга.",
    artifact: [
      "От: support@olimpiada-winners.ru",
      "Тема: Срочно подтвердите приз до 18:00",
      "Текст: Вы выиграли ноутбук. Откройте invoice.zip и введите пароль от школьной почты.",
      "Ссылка: http://olimpiada-prize-login.site/verify"
    ],
    options: [
      "Домен отправителя похож на официальный, но выглядит подозрительно",
      "Просят пароль от школьной почты",
      "Есть срочность и давление по времени",
      "В письме есть слово «олимпиада»",
      "Вложение zip прислали без предварительной договоренности"
    ],
    answer: [0, 1, 2, 4],
    success:
      "Верно. Главные сигналы: странный домен, просьба ввести пароль, давление и неожиданное вложение.",
    fail: "Проверь признаки давления, просьбу пароля, домен и неожиданный архив."
  },
  {
    title: "Надежный пароль",
    role: "Специалист IAM",
    difficulty: "Легко",
    time: "3 минуты",
    points: 10,
    story:
      "Команда готовит временные аккаунты для участников. Выбери самый устойчивый пароль из предложенных.",
    type: "single",
    prompt: "Какой пароль лучше использовать?",
    options: [
      "School2026",
      "qwerty!2026",
      "Marta2009",
      "River-Cloud-91-Mint",
      "Admin12345"
    ],
    answer: 3,
    success:
      "Да. Длинная парольная фраза с разными словами обычно лучше коротких предсказуемых шаблонов.",
    fail: "Ищи длинную парольную фразу, которую сложно угадать по имени, году или клавиатуре."
  },
  {
    title: "Лишние права",
    role: "Инженер безопасности",
    difficulty: "Средне",
    time: "5 минут",
    points: 15,
    story:
      "В облачной папке лежат материалы мероприятия. Нужно оставить доступ только тем, кому он действительно нужен.",
    type: "multi",
    prompt: "Кому можно оставить право редактирования?",
    artifact: [
      "Папка: /event/cyberday",
      "Файлы: расписание, задания, ответы, сертификаты",
      "Текущее правило: все, у кого есть ссылка, могут редактировать"
    ],
    options: [
      "Организатор мероприятия",
      "Приглашенный школьник",
      "Учитель, отвечающий за расписание",
      "Внешний гость, которому нужно только посмотреть программу",
      "Технический администратор площадки"
    ],
    answer: [0, 2, 4],
    success:
      "Точно. Редактирование оставляем только тем, кто отвечает за содержимое или техническое сопровождение.",
    fail: "Применяй принцип минимальных привилегий: редактируют только те, кому это нужно для задачи."
  },
  {
    title: "Подозрительный логин",
    role: "Охотник за угрозами",
    difficulty: "Средне",
    time: "5 минут",
    points: 15,
    story:
      "Система заметила несколько входов в аккаунт организатора. Найди строку, которая больше всего похожа на компрометацию.",
    type: "single",
    prompt: "Какая запись требует первоочередной проверки?",
    artifact: [
      "08:11 user=teacher ip=10.18.2.15 city=Kazan result=success device=school-pc",
      "08:15 user=teacher ip=10.18.2.15 city=Kazan result=success device=school-pc",
      "08:18 user=teacher ip=185.92.44.18 city=Unknown result=success device=new-browser",
      "08:19 user=teacher ip=10.18.2.15 city=Kazan result=failed device=school-pc"
    ],
    options: [
      "08:11, потому что это первый вход",
      "08:15, потому что вход повторился",
      "08:18, потому что новый браузер, неизвестный город и внешний IP",
      "08:19, потому что там неудачный вход"
    ],
    answer: 2,
    success:
      "Верно. Успешный вход с нового устройства и неизвестного места опаснее одиночной ошибки пароля.",
    fail: "Смотри на сочетание факторов: успешный вход, новая среда, странная география и внешний адрес."
  },
  {
    title: "Шифр Цезаря",
    role: "Криптоаналитик",
    difficulty: "Средне",
    time: "4 минуты",
    points: 15,
    story:
      "На стенде оставили подсказку, зашифрованную сдвигом на 3 буквы вперед. Нужно вернуть исходное слово.",
    type: "text",
    prompt: "Расшифруй слово: vhfxulwb",
    artifact: ["Подсказка: английский алфавит, каждая буква была сдвинута на 3 вперед."],
    answer: "security",
    success: "Да, получилось security. В реальной работе криптография требует аккуратности и проверки гипотез.",
    fail: "Сдвинь каждую букву на 3 назад: v станет s, h станет e."
  },
  {
    title: "XSS на сайте",
    role: "Пентестер",
    difficulty: "Сложно",
    time: "6 минут",
    points: 20,
    story:
      "Школьный сайт принимает комментарии к мероприятию. Нужно выбрать защиту от внедрения скриптов.",
    type: "multi",
    prompt: "Какие меры реально помогают против XSS?",
    artifact: [
      "Форма комментария сохраняет HTML как есть.",
      "Комментарий потом показывается всем посетителям страницы."
    ],
    options: [
      "Экранировать пользовательский ввод при выводе на страницу",
      "Добавить Content Security Policy",
      "Запретить все короткие комментарии",
      "Проверять и очищать HTML через надежный sanitizer",
      "Спрятать форму ниже на странице"
    ],
    answer: [0, 1, 3],
    success:
      "Отлично. Экранирование, CSP и безопасная очистка HTML закрывают типовой путь атаки.",
    fail: "Нужны меры, которые меняют обработку данных или политику выполнения скриптов."
  },
  {
    title: "Резервная копия",
    role: "Администратор",
    difficulty: "Средне",
    time: "4 минуты",
    points: 15,
    story:
      "Перед финалом нужно защитить материалы от случайного удаления и шифровальщика.",
    type: "single",
    prompt: "Какой план резервного копирования лучше?",
    options: [
      "Хранить копию в той же папке с названием backup",
      "Раз в месяц отправлять архив в общий чат",
      "Держать 3 копии, на 2 разных носителях, 1 копию отдельно от основной сети",
      "Не делать копии, если включен антивирус"
    ],
    answer: 2,
    success:
      "Верно. Это правило 3-2-1: несколько копий, разные носители и одна изолированная копия.",
    fail: "Подумай, какой вариант переживет удаление, поломку диска и заражение основной сети."
  },
  {
    title: "Wi-Fi для гостей",
    role: "Сетевой специалист",
    difficulty: "Сложно",
    time: "5 минут",
    points: 20,
    story:
      "На площадке будут школьники, гости и организаторы. Нужно настроить безопасный гостевой Wi-Fi.",
    type: "order",
    prompt: "Расположи шаги по смыслу: что должно быть включено в безопасной конфигурации?",
    options: [
      "Отдельная гостевая сеть без доступа к внутренним ресурсам",
      "WPA2/WPA3 с отдельным паролем",
      "Ограничение скорости и фильтрация опасных ресурсов",
      "Открытый Wi-Fi без пароля для удобства"
    ],
    answer: [0, 1, 2],
    success:
      "Да. Гостевая сеть должна быть изолирована, защищена паролем и иметь разумные ограничения.",
    fail: "Открытая сеть без пароля не входит в безопасную конфигурацию."
  },
  {
    title: "Цепочка инцидента",
    role: "Руководитель реагирования",
    difficulty: "Сложно",
    time: "6 минут",
    points: 20,
    story:
      "На компьютере организатора сработал антивирус. Нужно выбрать правильную последовательность действий.",
    type: "sequence",
    prompt: "Выбери порядок действий при инциденте.",
    options: [
      "Изолировать устройство от сети",
      "Сохранить важные логи и скриншоты",
      "Сообщить ответственному за безопасность",
      "Переустановить систему без фиксации деталей"
    ],
    answer: [0, 1, 2],
    success:
      "Верно. Сначала ограничиваем распространение, затем сохраняем факты и подключаем ответственных.",
    fail: "Не начинай с переустановки: так можно потерять следы и не понять причину."
  },
  {
    title: "Финальный разбор",
    role: "Команда безопасности",
    difficulty: "Сложно",
    time: "7 минут",
    points: 25,
    story:
      "Все подсказки собрались в одну картину. Нужно выбрать наиболее вероятный сценарий атаки и первые меры.",
    type: "case",
    prompt: "Что произошло и что делать первым?",
    artifact: [
      "1. Учитель получил письмо с архивом.",
      "2. Через 4 минуты был вход с нового браузера и неизвестного IP.",
      "3. В облачной папке включилось правило «редактируют все по ссылке».",
      "4. На сайте появились странные комментарии со script-тегами."
    ],
    options: [
      "Вероятно, скомпрометирован аккаунт. Сбросить пароль, завершить сессии, включить MFA, проверить права и логи",
      "Это обычная активность. Ничего не делать",
      "Удалить сайт, но аккаунт не трогать",
      "Попросить всех участников поменять фон рабочего стола"
    ],
    answer: 0,
    success:
      "Сильный финал. Ты связал фишинг, подозрительный вход, права доступа и следы на сайте в один инцидент.",
    fail: "Свяжи события: письмо могло привести к захвату аккаунта, а дальше к изменению прав и сайта."
  }
    ]
  },
  {
    id: "shift-2",
    name: "Смена 2: цифровой след",
    description: "MFA, ссылки, Wi-Fi, данные, SQL-инъекции, расширения, DNS и расследование.",
    missions: [
      {
        title: "Код из мессенджера",
        role: "Специалист IAM",
        difficulty: "Легко",
        time: "4 минуты",
        points: 10,
        story:
          "Участнику пишет человек с аватаркой организатора и просит срочно переслать код подтверждения для входа в кабинет.",
        type: "single",
        prompt: "Что нужно сделать?",
        artifact: [
          "Сообщение: Привет! Я из оргкомитета. Система сломалась, пришли мне код из SMS, иначе команда не попадет в рейтинг.",
          "SMS: Код входа 481923. Никому не сообщайте этот код."
        ],
        options: [
          "Переслать код, если человек назвал имя организатора",
          "Не отправлять код, проверить просьбу через официальный канал и сообщить взрослому/организатору",
          "Отправить только последние три цифры",
          "Опубликовать код в общем чате, чтобы все видели проблему"
        ],
        answer: 1,
        success:
          "Верно. Код MFA нельзя передавать другим людям, даже если просьба выглядит срочной.",
        fail: "Код подтверждения равен ключу от аккаунта. Его нельзя пересылать."
      },
      {
        title: "Короткая ссылка",
        role: "Аналитик угроз",
        difficulty: "Легко",
        time: "4 минуты",
        points: 10,
        story:
          "В чат соревнования пришла короткая ссылка на якобы обновленное расписание. Нужно решить, какие проверки сделать перед переходом.",
        type: "multi",
        prompt: "Что стоит проверить?",
        artifact: [
          "Сообщение: Срочно новое расписание тут: https://clck.example/7Qp2",
          "Автор сообщения появился в чате 2 минуты назад."
        ],
        options: [
          "Раскрыть короткую ссылку через безопасный просмотрщик или спросить исходную ссылку",
          "Проверить отправителя и официальный канал мероприятия",
          "Скачать файл, если ссылка открылась быстро",
          "Посмотреть, совпадает ли домен с официальным сайтом",
          "Переслать ссылку всем участникам для скорости"
        ],
        answer: [0, 1, 3],
        success:
          "Да. Сначала проверяем источник, реальный домен и контекст публикации.",
        fail: "Короткая ссылка скрывает адрес. Нужны проверка домена и подтверждение источника."
      },
      {
        title: "Публичный компьютер",
        role: "Администратор площадки",
        difficulty: "Легко",
        time: "4 минуты",
        points: 10,
        story:
          "Участник вошел в почту на общем ноутбуке в аудитории. Нужно выбрать безопасные действия перед уходом.",
        type: "multi",
        prompt: "Что нужно сделать?",
        options: [
          "Выйти из аккаунта",
          "Очистить сохраненные пароли и не сохранять их в браузере",
          "Оставить вкладку открытой для следующей команды",
          "Закрыть браузер и считать, что этого достаточно",
          "Проверить, что файлы с личными данными не остались в загрузках"
        ],
        answer: [0, 1, 4],
        success:
          "Верно. На общем устройстве важно выйти из аккаунта, не сохранять пароли и убрать личные файлы.",
        fail: "Закрыть окно мало: сессия или загруженные файлы могут остаться доступными."
      },
      {
        title: "Секреты в репозитории",
        role: "DevSecOps-инженер",
        difficulty: "Средне",
        time: "5 минут",
        points: 15,
        story:
          "Команда загрузила учебный проект на Git-хостинг. В одном файле случайно оказался ключ API.",
        type: "single",
        prompt: "Какое действие правильное первым?",
        artifact: [
          "config.js: const API_KEY = 'sk_live_48ab...';",
          "Репозиторий уже был публичным 20 минут."
        ],
        options: [
          "Просто удалить строку и сделать новый коммит",
          "Считать ключ скомпрометированным, отозвать его, выпустить новый и убрать секрет из истории/настроек",
          "Переименовать переменную API_KEY в TOKEN",
          "Добавить комментарий «не использовать»"
        ],
        answer: 1,
        success:
          "Точно. Публичный секрет нужно считать украденным: сначала отзываем, потом исправляем хранение.",
        fail: "Если секрет уже был публичным, удаления из текущего файла недостаточно."
      },
      {
        title: "Личные данные",
        role: "Специалист по защите данных",
        difficulty: "Средне",
        time: "5 минут",
        points: 15,
        story:
          "Для сертификатов собрали таблицу участников. Нужно понять, какие поля нельзя публиковать в открытом доступе.",
        type: "multi",
        prompt: "Какие поля относятся к персональным или чувствительным данным?",
        artifact: [
          "Таблица: ФИО, школа, класс, телефон родителя, e-mail, результат команды, любимый цвет."
        ],
        options: [
          "ФИО участника",
          "Телефон родителя",
          "E-mail",
          "Результат команды без ФИО",
          "Школа и класс в связке с ФИО"
        ],
        answer: [0, 1, 2, 4],
        success:
          "Верно. Публиковать такие данные можно только по понятным правилам и с разрешением.",
        fail: "Ищи данные, по которым человека можно прямо или косвенно определить."
      },
      {
        title: "Подозрительное расширение",
        role: "Специалист endpoint-защиты",
        difficulty: "Средне",
        time: "5 минут",
        points: 15,
        story:
          "После установки расширения «Free Answers Helper» браузер начал открывать рекламу и менять поисковик.",
        type: "sequence",
        prompt: "Выбери порядок действий.",
        options: [
          "Отключить и удалить подозрительное расширение",
          "Проверить разрешения расширений и список недавно установленных программ",
          "Запустить проверку защитным ПО и сменить пароли, если были входы в аккаунты",
          "Установить еще три расширения для блокировки рекламы"
        ],
        answer: [0, 1, 2],
        success:
          "Верно. Убираем источник, проверяем изменения и оцениваем риск кражи учетных данных.",
        fail: "Новые расширения не лечат проблему. Начни с удаления подозрительного."
      },
      {
        title: "SQL-запрос",
        role: "Специалист AppSec",
        difficulty: "Сложно",
        time: "6 минут",
        points: 20,
        story:
          "Форма поиска участников вставляет текст пользователя прямо в SQL-запрос. Нужно выбрать защиту.",
        type: "multi",
        prompt: "Что помогает против SQL-инъекции?",
        artifact: [
          "query = \"SELECT * FROM users WHERE name = '\" + search + \"'\";",
          "Поле search приходит из формы на сайте."
        ],
        options: [
          "Параметризованные запросы",
          "ORM или query builder с безопасной привязкой параметров",
          "Ограничение длины поля как единственная мера",
          "Выдача базе минимально нужных прав",
          "Скрыть ошибку SQL красивой страницей"
        ],
        answer: [0, 1, 3],
        success:
          "Отлично. Параметры и минимальные права сильно снижают риск и последствия атаки.",
        fail: "Главная защита - не склеивать SQL из пользовательского текста."
      },
      {
        title: "DNS-аномалия",
        role: "Сетевой аналитик",
        difficulty: "Сложно",
        time: "5 минут",
        points: 20,
        story:
          "На стенде мониторинга видно, что один компьютер часто обращается к странным доменам.",
        type: "single",
        prompt: "Какая запись выглядит самой подозрительной?",
        artifact: [
          "12:01 pc-07 -> school.local",
          "12:03 pc-07 -> updates.vendor.com",
          "12:04 pc-07 -> a8f3k2q9z1.example-ddns.net",
          "12:05 pc-07 -> docs.school.local"
        ],
        options: [
          "school.local, потому что это внутренний домен",
          "updates.vendor.com, потому что там слово updates",
          "a8f3k2q9z1.example-ddns.net, потому что домен случайный и похож на динамический",
          "docs.school.local, потому что это документы"
        ],
        answer: 2,
        success:
          "Да. Случайно выглядящий поддомен и DDNS могут быть признаком командного сервера или вредоносной активности.",
        fail: "Сравни домены: привычные внутренние адреса менее подозрительны, чем случайная строка и DDNS."
      },
      {
        title: "Фото с метаданными",
        role: "OSINT-аналитик",
        difficulty: "Средне",
        time: "4 минуты",
        points: 15,
        story:
          "Команда хочет выложить фото с подготовки к мероприятию. В файле могли остаться метаданные.",
        type: "multi",
        prompt: "Какие меры уменьшают риск раскрытия лишней информации?",
        options: [
          "Удалить EXIF-метаданные перед публикацией",
          "Проверить, не видны ли бейджи, списки, экраны и адреса",
          "Публиковать фото только после согласования с ответственным",
          "Выложить оригинальный файл без изменений для лучшего качества",
          "Добавить к фото точный адрес аудитории"
        ],
        answer: [0, 1, 2],
        success:
          "Верно. Фото может раскрыть геолокацию, документы, лица и внутренние детали.",
        fail: "Думай не только о картинке, но и о скрытых метаданных и деталях в кадре."
      },
      {
        title: "Итоговая корреляция",
        role: "Аналитик расследований",
        difficulty: "Сложно",
        time: "7 минут",
        points: 25,
        story:
          "Нужно связать несколько событий и выбрать наиболее вероятную картину атаки.",
        type: "case",
        prompt: "Какой вывод и первые действия наиболее правильные?",
        artifact: [
          "1. В чат пришла короткая ссылка от нового участника.",
          "2. Один организатор ввел код MFA после сообщения в мессенджере.",
          "3. Через 10 минут в репозитории появился неизвестный deploy key.",
          "4. Сервер начал обращаться к случайному DDNS-домену."
        ],
        options: [
          "Возможен захват аккаунта и закрепление доступа. Отключить подозрительные ключи, завершить сессии, сменить секреты, проверить логи и изолировать сервер",
          "Это нормальная подготовка к мероприятию",
          "Нужно только удалить сообщение из чата",
          "Нужно попросить участников перезагрузить телефоны"
        ],
        answer: 0,
        success:
          "Сильно. Ты связал социальную инженерию, MFA, репозиторий и сетевые признаки в один сценарий.",
        fail: "События похожи на цепочку: обман, захват доступа, закрепление и связь с внешним узлом."
      }
    ]
  }
];

let state = loadState();
let activePackId = state.packId;
let missions = getPackById(activePackId).missions;
let tickId = null;

const introScreen = document.querySelector("#introScreen");
const gameShell = document.querySelector("#gameShell");
const resultScreen = document.querySelector("#resultScreen");
const missionMap = document.querySelector("#missionMap");
const missionTitle = document.querySelector("#missionTitle");
const missionRole = document.querySelector("#missionRole");
const missionDifficulty = document.querySelector("#missionDifficulty");
const missionTime = document.querySelector("#missionTime");
const missionStory = document.querySelector("#missionStory");
const missionTask = document.querySelector("#missionTask");
const feedback = document.querySelector("#feedback");
const progressBar = document.querySelector("#progressBar");
const progressText = document.querySelector("#progressText");
const scoreLabel = document.querySelector("#score");
const timerLabel = document.querySelector("#timer");

document.querySelector("#startGame").addEventListener("click", () => startFresh());
document.querySelector("#resumeGame").addEventListener("click", () => showGame());
document.querySelector("#restartGame").addEventListener("click", () => startFresh());
document.querySelector("#checkAnswer").addEventListener("click", () => checkCurrentAnswer());
document.querySelector("#prevMission").addEventListener("click", () => moveMission(-1));
document.querySelector("#nextMission").addEventListener("click", () => moveMission(1));

renderPackSelector();
renderMap();
renderResumeButton();

function getPackById(packId) {
  return missionPacks.find((pack) => pack.id === packId) || missionPacks[0];
}

function defaultState(packId = missionPacks[0].id) {
  const pack = getPackById(packId);
  return {
    packId: pack.id,
    current: 0,
    score: 0,
    secondsLeft: TOTAL_SECONDS,
    completed: Array(pack.missions.length).fill(false),
    answers: Array(pack.missions.length).fill(null),
    startedAt: null
  };
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    const pack = getPackById(saved?.packId);
    if (!saved || !Array.isArray(saved.completed) || saved.completed.length !== pack.missions.length) {
      return defaultState();
    }
    return saved;
  } catch {
    return defaultState();
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function startFresh(packId = activePackId) {
  activePackId = packId;
  missions = getPackById(activePackId).missions;
  state = defaultState(activePackId);
  state.startedAt = Date.now();
  saveState();
  renderPackSelector();
  renderMap();
  showGame();
}

function showGame() {
  introScreen.classList.add("hidden");
  resultScreen.classList.add("hidden");
  gameShell.classList.remove("hidden");
  renderMission();
  startTimer();
}

function renderResumeButton() {
  const resume = document.querySelector("#resumeGame");
  const hasProgress = state.packId === activePackId && (state.completed.some(Boolean) || state.startedAt);
  resume.classList.toggle("hidden", !hasProgress);
}

function renderPackSelector() {
  const selector = document.querySelector("#packSelector");
  selector.innerHTML = "";

  missionPacks.forEach((pack) => {
    const button = document.createElement("button");
    button.className = "pack-option";
    button.type = "button";
    button.innerHTML = `<strong>${pack.name}</strong><span>${pack.description}</span>`;
    button.classList.toggle("active", pack.id === activePackId);
    button.addEventListener("click", () => {
      activePackId = pack.id;
      missions = pack.missions;
      state = defaultState(pack.id);
      saveState();
      renderPackSelector();
      renderMap();
      renderResumeButton();
    });
    selector.append(button);
  });
}

function renderMap() {
  missionMap.innerHTML = "";
  missions.forEach((mission, index) => {
    const button = document.createElement("button");
    button.className = "mission-tab";
    button.type = "button";
    button.innerHTML = `<strong>${index + 1}. ${mission.title}</strong><span>${mission.difficulty} · ${mission.points} баллов</span>`;
    button.addEventListener("click", () => {
      state.current = index;
      saveState();
      renderMission();
    });
    missionMap.append(button);
  });
}

function renderMission() {
  const mission = missions[state.current];
  missionTitle.textContent = mission.title;
  missionRole.textContent = mission.role;
  missionDifficulty.textContent = mission.difficulty;
  missionTime.textContent = mission.time;
  missionStory.textContent = mission.story;
  feedback.textContent = state.completed[state.current]
    ? "Миссия уже засчитана. Можно перейти дальше или изменить ответ для тренировки."
    : "Выбери ответ и нажми «Проверить».";
  feedback.className = "feedback";

  missionTask.innerHTML = "";
  addPrompt(mission);
  renderTask(mission);
  updateStatus();
}

function addPrompt(mission) {
  if (mission.artifact) {
    const artifact = document.createElement("div");
    artifact.className = "artifact";
    mission.artifact.forEach((line) => {
      const item = document.createElement("code");
      item.textContent = line;
      artifact.append(item);
    });
    missionTask.append(artifact);
  }

  const prompt = document.createElement("strong");
  prompt.textContent = mission.prompt;
  missionTask.append(prompt);
}

function renderTask(mission) {
  if (["single", "case"].includes(mission.type)) {
    renderChoices(mission, "radio");
  }

  if (mission.type === "multi") {
    renderChoices(mission, "checkbox");
  }

  if (mission.type === "text") {
    const row = document.createElement("div");
    row.className = "input-row";
    row.innerHTML = `<label for="textAnswer">Ответ</label><input id="textAnswer" autocomplete="off" placeholder="Введи ответ или флаг">`;
    missionTask.append(row);
    const saved = state.answers[state.current];
    if (saved) row.querySelector("input").value = saved;
  }

  if (mission.type === "order" || mission.type === "sequence") {
    const grid = document.createElement("div");
    grid.className = "puzzle-grid";
    mission.options.forEach((option, index) => {
      const row = document.createElement("div");
      row.className = "mini-card input-row";
      row.innerHTML = `<strong>${option}</strong><label for="order-${index}">Позиция</label><select id="order-${index}"><option value="">Не использовать</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option></select>`;
      grid.append(row);
    });
    missionTask.append(grid);
    const saved = state.answers[state.current];
    if (Array.isArray(saved)) {
      saved.forEach((position, optionIndex) => {
        const select = document.querySelector(`#order-${optionIndex}`);
        if (select) select.value = position || "";
      });
    }
  }
}

function renderChoices(mission, inputType) {
  mission.options.forEach((option, index) => {
    const label = document.createElement("label");
    label.className = "choice";
    label.innerHTML = `<input type="${inputType}" name="answer" value="${index}"><span>${option}</span>`;
    missionTask.append(label);
  });

  const saved = state.answers[state.current];
  if (Array.isArray(saved)) {
    saved.forEach((index) => {
      const input = missionTask.querySelector(`input[value="${index}"]`);
      if (input) input.checked = true;
    });
  } else if (Number.isInteger(saved)) {
    const input = missionTask.querySelector(`input[value="${saved}"]`);
    if (input) input.checked = true;
  }
}

function checkCurrentAnswer() {
  const mission = missions[state.current];
  const answer = collectAnswer(mission);
  const correct = isCorrect(mission, answer);
  state.answers[state.current] = answer;

  if (correct && !state.completed[state.current]) {
    state.completed[state.current] = true;
    state.score += mission.points;
  }

  feedback.textContent = correct ? mission.success : mission.fail;
  feedback.className = `feedback ${correct ? "good" : "bad"}`;
  saveState();
  updateStatus();

  if (state.completed.every(Boolean)) {
    window.setTimeout(showResult, 900);
  }
}

function collectAnswer(mission) {
  if (["single", "case"].includes(mission.type)) {
    const checked = missionTask.querySelector("input:checked");
    return checked ? Number(checked.value) : null;
  }

  if (mission.type === "multi") {
    return [...missionTask.querySelectorAll("input:checked")].map((item) => Number(item.value));
  }

  if (mission.type === "text") {
    return missionTask.querySelector("#textAnswer").value.trim().toLowerCase();
  }

  if (mission.type === "order" || mission.type === "sequence") {
    return mission.options.map((_, index) => {
      const value = missionTask.querySelector(`#order-${index}`).value;
      return value ? Number(value) : null;
    });
  }

  return null;
}

function isCorrect(mission, answer) {
  if (Array.isArray(mission.answer)) {
    if (mission.type === "order" || mission.type === "sequence") {
      const picked = answer
        .map((position, index) => ({ position, index }))
        .filter((item) => item.position)
        .sort((a, b) => a.position - b.position)
        .map((item) => item.index);
      const positions = answer.filter(Boolean);
      const uniquePositions = new Set(positions);
      const expectedPositions = mission.answer.map((_, index) => index + 1);
      return (
        positions.length === uniquePositions.size &&
        sameArray([...positions].sort((a, b) => a - b), expectedPositions) &&
        sameArray(picked, mission.answer)
      );
    }
    return sameArray([...answer].sort((a, b) => a - b), [...mission.answer].sort((a, b) => a - b));
  }

  return answer === mission.answer;
}

function sameArray(a, b) {
  return a.length === b.length && a.every((value, index) => value === b[index]);
}

function moveMission(direction) {
  const next = state.current + direction;
  if (next < 0) return;
  if (next >= missions.length) {
    showResult();
    return;
  }
  state.current = next;
  saveState();
  renderMission();
}

function updateStatus() {
  const done = state.completed.filter(Boolean).length;
  progressText.textContent = `${state.current + 1} / ${missions.length}`;
  scoreLabel.textContent = `${state.score} баллов`;
  progressBar.style.width = `${(done / missions.length) * 100}%`;
  timerLabel.textContent = formatTime(state.secondsLeft);

  [...missionMap.children].forEach((button, index) => {
    button.classList.toggle("active", index === state.current);
    button.classList.toggle("done", state.completed[index]);
  });
}

function startTimer() {
  window.clearInterval(tickId);
  tickId = window.setInterval(() => {
    state.secondsLeft = Math.max(0, state.secondsLeft - 1);
    timerLabel.textContent = formatTime(state.secondsLeft);
    saveState();
    if (state.secondsLeft === 0) {
      showResult();
    }
  }, 1000);
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(rest).padStart(2, "0")}`;
}

function showResult() {
  window.clearInterval(tickId);
  gameShell.classList.add("hidden");
  introScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  const maxScore = missions.reduce((sum, mission) => sum + mission.points, 0);
  const percent = Math.round((state.score / maxScore) * 100);
  const spent = TOTAL_SECONDS - state.secondsLeft;
  const level = getLevel(percent);

  document.querySelector("#badgeLevel").textContent = level.short;
  document.querySelector("#resultTitle").textContent = level.title;
  document.querySelector("#resultText").textContent = level.text;
  document.querySelector("#finalScore").textContent = `${state.score} из ${maxScore} баллов`;
  document.querySelector("#finalTime").textContent = `${Math.max(1, Math.round(spent / 60))} минут`;
  document.querySelector("#finalLevel").textContent = `${percent}%`;

  const hints = document.querySelector("#careerHints");
  hints.innerHTML = "";
  level.hints.forEach((hint) => {
    const p = document.createElement("p");
    p.textContent = hint;
    hints.append(p);
  });

  saveState();
}

function getLevel(percent) {
  if (percent >= 85) {
    return {
      short: "IR",
      title: "Инцидент закрыт уверенно",
      text:
        "Ты быстро связываешь факты, замечаешь детали и выбираешь практичные меры защиты. Это похоже на мышление аналитика реагирования.",
      hints: [
        "Подходящие направления: SOC-аналитик, специалист по реагированию на инциденты, пентестер.",
        "Что попробовать дальше: CTF-задачи, основы Linux, сетевые протоколы, безопасная разработка."
      ]
    };
  }

  if (percent >= 60) {
    return {
      short: "SOC",
      title: "Хорошая смена в команде безопасности",
      text:
        "Ты уверенно справился с базовыми угрозами и несколькими сложными ситуациями. Осталось натренировать логику расследования.",
      hints: [
        "Подходящие направления: администрирование, защита аккаунтов, мониторинг событий безопасности.",
        "Что попробовать дальше: анализ логов, настройка MFA, резервные копии и базовая веб-безопасность."
      ]
    };
  }

  return {
    short: "JR",
    title: "Первый выход на киберполигон",
    text:
      "Ты познакомился с реальными задачами безопасности. Ошибки здесь полезны: они показывают, какие навыки стоит прокачать первыми.",
    hints: [
      "Начни с фишинга, паролей, прав доступа и правил безопасной работы с файлами.",
      "Затем переходи к сетям, веб-уязвимостям и расследованию инцидентов по логам."
    ]
  };
}
