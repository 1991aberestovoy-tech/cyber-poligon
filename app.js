const TOTAL_SECONDS = 60 * 60;
const STORAGE_KEY = "cyber-shift-progress-v4";

const SCENARIO_VISUALS = [
  {
    image: "assets/scenario-quals.png",
    code: "RANGE / QUALS",
    tags: ["Web", "Crypto", "OSINT", "Forensics"]
  },
  {
    image: "assets/scenario-finals.png",
    code: "RANGE / FINALS",
    tags: ["AppSec", "Linux", "DevSecOps", "IR"]
  }
];

const NODE_DETAILS = {
  attacker: {
    title: "ATTACK · EXTERNAL",
    text: "Учебная атакующая машина. Отсюда моделируются разведка, доставка и обращения к DMZ."
  },
  firewall: {
    title: "FIREWALL · EDGE",
    text: "Контролирует входящий трафик и отделяет внешнюю сеть от сервисов полигона."
  },
  web: {
    title: "WEB-01 · DMZ",
    text: "Веб-сервис учебного полигона. Здесь проявляются IDOR, cookie, JWT и path traversal."
  },
  ad: {
    title: "AD-01 · LAN",
    text: "Каталог пользователей и ролей. Узел связан с доступом, MFA и проверкой привилегий."
  },
  database: {
    title: "DB-01 · DATA",
    text: "Хранилище данных сценария. Особое внимание параметризации запросов и секретам."
  },
  ids: {
    title: "IDS/IPS · SENSOR",
    text: "Сетевой сенсор выделяет аномалии и передает срабатывания в SIEM."
  },
  siem: {
    title: "SIEM · CORE",
    text: "Коррелирует логи, сетевые признаки и временную шкалу инцидента."
  },
  soc: {
    title: "SOC-07 · ANALYST",
    text: "Рабочее место участника. Здесь проверяются гипотезы и принимаются решения по сдерживанию."
  }
};

const NODE_BASE_STATUS = {
  attacker: "status-warning",
  firewall: "status-success",
  web: "status-normal",
  ad: "status-normal",
  database: "status-normal",
  ids: "status-normal",
  siem: "status-success",
  soc: "status-normal"
};

const NODE_LINKS = {
  attacker: ["attacker-firewall"],
  firewall: ["attacker-firewall", "firewall-web", "firewall-ad"],
  web: ["firewall-web", "web-db", "web-ids"],
  ad: ["firewall-ad", "ad-ids"],
  database: ["web-db", "db-siem"],
  ids: ["web-ids", "ad-ids", "ids-siem"],
  siem: ["db-siem", "ids-siem", "siem-soc"],
  soc: ["siem-soc"]
};

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
let activeShift = getPackById(activePackId).shift || 1;
let tickId = null;

const SHIFT_COPY = {
  1: {
    eyebrow: "Школьный CTF-турнир",
    title: "Твоя смена<br>в центре защиты",
    lead: "Исследуй инфраструктуру, находи флаги и связывай события в единый инцидент. Здесь ценятся внимательность, логика и командная работа.",
    time: "60:00",
    routes: "1",
    missions: "30",
    mode: "CTF",
    heading: "Выбери уровень операции",
    note: "30 заданий в одном маршруте примерно на 60 минут",
    start: "Начать смену"
  },
  2: {
    eyebrow: "Смена 2 · уровень «Эксперт»",
    title: "Глубокий слой<br>под поверхностью",
    lead: "Картинки с двойным дном, зашифрованные записки, живой терминал и журналы взлома. Здесь мало знать приёмы — нужно исследовать, сопоставлять и перебирать.",
    time: "120:00",
    routes: "5 блоков",
    missions: "40",
    mode: "EXPERT",
    heading: "Выбери глубину погружения",
    note: "40 заданий и финал примерно на 2 часа. Подсказки стоят 20% баллов",
    start: "Начать смену 2"
  }
};

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
const completionPercent = document.querySelector("#completionPercent");
const progressDonut = document.querySelector("#progressDonut");
const heatmapGrid = document.querySelector("#heatmapGrid");
const eventTimeline = document.querySelector("#eventTimeline");
const nodeDetail = document.querySelector("#nodeDetail");

document.querySelector("#startGame").addEventListener("click", () => startFresh());
document.querySelector("#resumeGame").addEventListener("click", () => showGame());
document.querySelector("#restartGame").addEventListener("click", () => startFresh());
document.querySelector("#checkAnswer").addEventListener("click", () => checkCurrentAnswer());
document.querySelector("#prevMission").addEventListener("click", () => moveMission(-1));
document.querySelector("#nextMission").addEventListener("click", () => moveMission(1));

document.querySelectorAll(".shift-tab").forEach((tab) => {
  tab.addEventListener("click", () => applyShift(Number(tab.dataset.shift)));
});
document.querySelector("#openToolkit")?.addEventListener("click", () => window.Shift2?.toggleToolkit(true));

initNetworkMap();
applyShift(activeShift, { silent: true });

function applyShift(shift, options = {}) {
  activeShift = shift;
  document.body.dataset.shift = String(shift);
  document.querySelectorAll(".shift-tab").forEach((tab) => {
    const on = Number(tab.dataset.shift) === shift;
    tab.classList.toggle("active", on);
    tab.setAttribute("aria-selected", on ? "true" : "false");
  });

  const copy = SHIFT_COPY[shift] || SHIFT_COPY[1];
  const set = (selector, value, html) => {
    const node = document.querySelector(selector);
    if (node) node[html ? "innerHTML" : "textContent"] = value;
  };
  set("#introEyebrow", copy.eyebrow);
  set("#introTitle", copy.title, true);
  set("#introLead", copy.lead);
  set("#briefTime", copy.time);
  set("#briefRoutes", copy.routes);
  set("#briefMissions", copy.missions);
  set("#briefMode", copy.mode);
  set("#scenarioHeading", copy.heading);
  set("#scenarioNote", copy.note);
  set("#startGame", copy.start);

  if ((getPackById(activePackId).shift || 1) !== shift) {
    const pack = missionPacks.find((item) => (item.shift || 1) === shift) || missionPacks[0];
    activePackId = pack.id;
    missions = pack.missions;
    state = loadPackState(pack.id);
    if (!options.silent) saveState();
  }

  renderPackSelector();
  renderMap();
  renderResumeButton();
}

function getPackById(packId) {
  return missionPacks.find((pack) => pack.id === packId) || missionPacks[0];
}

function packSeconds(packId) {
  return (getPackById(packId).minutes || 60) * 60;
}

function totalSeconds() {
  return packSeconds(state.packId);
}

function defaultState(packId = missionPacks[0].id) {
  const pack = getPackById(packId);
  return {
    packId: pack.id,
    current: 0,
    score: 0,
    secondsLeft: packSeconds(pack.id),
    completed: Array(pack.missions.length).fill(false),
    answers: Array(pack.missions.length).fill(null),
    hints: Array(pack.missions.length).fill(false),
    startedAt: null
  };
}

function packKey(packId) {
  return `${STORAGE_KEY}:${packId}`;
}

function normalizeState(saved, pack) {
  if (!saved || !Array.isArray(saved.completed) || saved.completed.length !== pack.missions.length) return null;
  if (!Array.isArray(saved.hints) || saved.hints.length !== pack.missions.length) {
    saved.hints = Array(pack.missions.length).fill(false);
  }
  return saved;
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    const pack = getPackById(saved?.packId);
    return normalizeState(saved, pack) || defaultState();
  } catch {
    return defaultState();
  }
}

function loadPackState(packId) {
  try {
    const pack = getPackById(packId);
    const own = normalizeState(JSON.parse(localStorage.getItem(packKey(pack.id))), pack);
    if (own) return own;
    const last = normalizeState(JSON.parse(localStorage.getItem(STORAGE_KEY)), pack);
    return last && last.packId === pack.id ? last : defaultState(pack.id);
  } catch {
    return defaultState(packId);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  localStorage.setItem(packKey(state.packId), JSON.stringify(state));
}

function startFresh(packId = activePackId) {
  activePackId = packId;
  missions = getPackById(activePackId).missions;
  activeShift = getPackById(activePackId).shift || 1;
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
  window.scrollTo(0, 0);
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

  missionPacks.forEach((pack, index) => {
    if ((pack.shift || 1) !== activeShift) return;
    const visual = pack.visual || SCENARIO_VISUALS[index % SCENARIO_VISUALS.length];
    const button = document.createElement("button");
    button.className = "pack-option";
    button.type = "button";
    button.innerHTML = `
      <span class="scenario-visual">
        <img src="${visual.image}" alt="" loading="lazy">
        <em>${visual.code}</em>
      </span>
      <span class="scenario-body">
        <strong>${pack.name}</strong>
        <span>${pack.description}</span>
        <span class="scenario-tags">${visual.tags.map((tag) => `<i>${tag}</i>`).join("")}</span>
        <span class="scenario-select-state">Выбрать сценарий</span>
      </span>`;
    button.classList.toggle("active", pack.id === activePackId);
    button.addEventListener("click", () => {
      activePackId = pack.id;
      missions = pack.missions;
      state = loadPackState(pack.id);
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
  const groups = getPackById(state.packId).groups || [];
  missions.forEach((mission, index) => {
    const group = groups.find((item) => item.from === index + 1);
    if (group) {
      const heading = document.createElement("div");
      heading.className = "map-group";
      heading.dataset.color = group.color || "violet";
      heading.textContent = group.name;
      missionMap.append(heading);
    }
    const button = document.createElement("button");
    button.className = "mission-tab";
    button.type = "button";
    button.dataset.role = String(mission.role || "").toLowerCase();
    button.innerHTML = `
      <span class="mission-number">${String(index + 1).padStart(2, "0")}</span>
      <span class="mission-copy">
        <strong>${mission.title}</strong>
        <small>${mission.role} · ${mission.points} баллов</small>
      </span>
      <i class="mission-state" aria-hidden="true"></i>`;
    button.setAttribute("aria-label", `${index + 1}. ${mission.title}. ${mission.difficulty}`);
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
  if (mission.h && window.Shift2) {
    window.Shift2.renderHint(mission, missionTask, state, state.current, () => {
      state.hints[state.current] = true;
      saveState();
    });
  }
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

  if (mission.blocks && window.Shift2) window.Shift2.renderBlocks(mission, missionTask);

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
      row.innerHTML = `<strong>${option}</strong><label for="order-${index}">Позиция</label><select id="order-${index}"><option value="">Не использовать</option>${Array.from({ length: mission.n || 4 }, (_, k) => `<option value="${k + 1}">${k + 1}</option>`).join("")}</select>`;
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
    state.score += mission.h && window.Shift2 ? window.Shift2.pointsFor(mission, state, state.current) : mission.points;
  }

  const successText = mission.h && window.Shift2 ? window.Shift2.successText(mission, answer) : mission.success;
  feedback.textContent = correct ? successText : mission.fail;
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
  if (mission.h && window.Shift2) return window.Shift2.verify(mission, answer);

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
  const percent = Math.round((done / missions.length) * 100);
  progressText.textContent = `${state.current + 1} / ${missions.length}`;
  scoreLabel.textContent = `${state.score} баллов`;
  progressBar.style.width = `${percent}%`;
  timerLabel.textContent = formatTime(state.secondsLeft);
  completionPercent.textContent = `${percent}%`;
  progressDonut.style.setProperty("--progress", `${percent * 3.6}deg`);
  document.querySelector("#queueStatus").textContent = `${done} выполнено`;

  [...missionMap.querySelectorAll(".mission-tab")].forEach((button, index) => {
    button.classList.toggle("active", index === state.current);
    button.classList.toggle("done", state.completed[index]);
    button.setAttribute("aria-current", index === state.current ? "step" : "false");
  });
  const hud = document.querySelector("#shardHud");
  if (hud && window.Shift2) window.Shift2.renderShardHud(hud, getPackById(state.packId), state);

  renderTelemetry();
  renderMissionNetwork();
  renderKillChain();
  renderHeatmap();
  renderTimeline();
}

function initNetworkMap() {
  document.querySelectorAll(".network-node").forEach((node) => {
    const activate = () => {
      document.querySelectorAll(".network-node").forEach((item) => item.classList.remove("selected"));
      node.classList.add("selected");
      renderNodeDetail(node.dataset.node);
    };

    node.addEventListener("click", activate);
    node.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        activate();
      }
    });
  });
}

function renderTelemetry() {
  const done = state.completed.filter(Boolean).length;
  const answered = state.answers.filter((answer) => answer !== null).length;
  const openRisks = Math.max(0, answered - done);
  const mission = missions[state.current];
  const riskByDifficulty = {
    "Легко": ["LOW", "контролируется"],
    "Средне": ["MED", "нужен анализ"],
    "Сложно": ["HIGH", "приоритет миссии"],
    "Эксперт": ["CRIT", "критический уровень"]
  };
  const [risk, caption] = riskByDifficulty[mission.difficulty] || ["MED", "нужен анализ"];

  // The static app has no backend event stream. These training metrics are derived mock telemetry.
  document.querySelector("#eventsMetric").textContent = String(28 + answered * 13 + state.current * 3);
  document.querySelector("#detectionsMetric").textContent = String(done);
  document.querySelector("#incidentsMetric").textContent = String(openRisks);
  document.querySelector("#riskMetric").textContent = state.completed[state.current] ? "CLEAR" : risk;
  document.querySelector("#riskCaption").textContent = state.completed[state.current] ? "риск закрыт" : caption;
}

function getMissionNode(mission) {
  const context = `${mission.role} ${mission.title}`.toLowerCase();
  if (/osint|dns|развед/.test(context)) return "attacker";
  if (/network|трафик|arp|syn/.test(context)) return "firewall";
  if (/stego|image|изображ/.test(context)) return "ids";
  if (/reverse|boss/.test(context)) return "soc";
  if (/web|appsec|sql|idor|jwt|cookie|robots|source/.test(context)) return "web";
  if (/devsecops|контейнер|секрет|database/.test(context)) return "database";
  if (/linux|suid|прав/.test(context)) return "ad";
  if (/forensic|logs|incident|timeline|таймлайн|blue team|реагирован/.test(context)) return "siem";
  if (/crypto|scripting|regex|base64|caesar|xor/.test(context)) return "soc";
  return "ids";
}

function renderMissionNetwork() {
  const mission = missions[state.current];
  const activeNodeId = getMissionNode(mission);
  const activeStatus = state.completed[state.current]
    ? "status-success"
    : mission.difficulty === "Сложно" || mission.difficulty === "Эксперт"
      ? "status-critical"
      : mission.difficulty === "Средне"
        ? "status-warning"
        : "status-normal";

  document.querySelectorAll(".network-node").forEach((node) => {
    node.classList.remove("active-node", "status-normal", "status-warning", "status-critical", "status-success", "status-offline");
    node.classList.add(NODE_BASE_STATUS[node.dataset.node] || "status-normal");
    if (node.dataset.node === activeNodeId) {
      node.classList.remove("status-normal", "status-warning", "status-critical", "status-success", "status-offline");
      node.classList.add("active-node", activeStatus);
    }
  });

  document.querySelectorAll(".network-links path").forEach((link) => {
    link.classList.toggle("active-link", (NODE_LINKS[activeNodeId] || []).includes(link.dataset.link));
  });

  renderNodeDetail(activeNodeId);
}

function renderNodeDetail(nodeId) {
  const detail = NODE_DETAILS[nodeId] || NODE_DETAILS.web;
  const node = document.querySelector(`.network-node[data-node="${nodeId}"]`);
  const statusClass = ["status-normal", "status-warning", "status-critical", "status-success", "status-offline"]
    .find((name) => node?.classList.contains(name)) || "status-normal";
  nodeDetail.innerHTML = `
    <span class="status-dot ${statusClass}"></span>
    <div><strong>${detail.title}</strong><p>${detail.text}</p></div>`;
}

function renderKillChain() {
  const phase = Math.min(5, Math.floor((state.current / missions.length) * 6));
  document.querySelectorAll("#killChain li").forEach((item, index) => {
    item.classList.toggle("past", index < phase || (index === phase && state.completed[state.current]));
    item.classList.toggle("active", index === phase && !state.completed[state.current]);
  });
  document.querySelector("#chainStatus").textContent = `Этап ${phase + 1} из 6`;
}

function renderHeatmap() {
  if (!heatmapGrid) return;
  const done = state.completed.filter(Boolean).length;
  const focusNode = getMissionNode(missions[state.current]);
  const focusRow = { web: 0, attacker: 0, ad: 1, database: 2, ids: 3, siem: 3, soc: 3 }[focusNode] ?? 0;
  heatmapGrid.innerHTML = "";

  // Deterministic training model: 4 segments x 8 time windows, derived from current progress.
  for (let row = 0; row < 4; row += 1) {
    for (let column = 0; column < 8; column += 1) {
      const cell = document.createElement("span");
      let level = (row * 2 + column + state.current + done) % 4;
      if (row === focusRow && column === state.current % 8) level = 4;
      cell.className = `heatmap-cell level-${level}`;
      cell.title = `Сегмент ${row + 1}, окно ${column + 1}: уровень ${level}`;
      heatmapGrid.append(cell);
    }
  }
}

function renderTimeline() {
  if (!eventTimeline) return;
  const doneIndexes = state.completed
    .map((completed, index) => completed ? index : -1)
    .filter((index) => index >= 0);
  const lastDone = doneIndexes.at(-1);
  const elapsed = Math.max(0, totalSeconds() - state.secondsLeft);
  const elapsedMinutes = Math.floor(elapsed / 60);
  const mission = missions[state.current];
  const timelineItems = [
    ["T+00", "Смена открыта", "Инфраструктура и сенсоры переведены в учебный режим."],
    [`T+${String(Math.max(1, elapsedMinutes)).padStart(2, "0")}`, "Миссия в работе", `${mission.title} · ${mission.role}`],
    lastDone === undefined
      ? ["WAIT", "Ожидается обнаружение", "Первое подтвержденное решение появится здесь."]
      : ["DONE", "Обнаружение подтверждено", missions[lastDone].title],
    ["LIVE", "SIEM коррелирует события", `${state.completed.filter(Boolean).length} из ${missions.length} миссий закрыто.`]
  ];

  eventTimeline.innerHTML = timelineItems
    .map(([time, title, text]) => `<li><time>${time}</time><div><strong>${title}</strong><span>${text}</span></div></li>`)
    .join("");
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
  window.scrollTo(0, 0);

  const maxScore = missions.reduce((sum, mission) => sum + mission.points, 0);
  const percent = Math.round((state.score / maxScore) * 100);
  const spent = totalSeconds() - state.secondsLeft;
  const level = getLevel(percent);

  document.querySelector("#badgeLevel").textContent = level.short;
  document.querySelector("#resultTitle").textContent = level.title;
  document.querySelector("#resultText").textContent = level.text;
  document.querySelector("#finalScore").textContent = `${state.score} из ${maxScore} баллов`;
  document.querySelector("#finalTime").textContent = `${Math.max(1, Math.round(spent / 60))} минут`;
  document.querySelector("#finalLevel").textContent = `${percent}%`;
  document.querySelector("#resultPercent").textContent = `${percent}%`;
  document.querySelector("#resultRing").style.setProperty("--score-progress", `${percent * 3.6}deg`);

  const hints = document.querySelector("#careerHints");
  hints.innerHTML = "";
  level.hints.forEach((hint) => {
    const p = document.createElement("p");
    p.textContent = hint;
    hints.append(p);
  });

  renderSkillChart();

  saveState();
}

function renderSkillChart() {
  const packGroups = getPackById(state.packId).skillGroups;
  const groups = packGroups
    ? packGroups.map((group) => ({ name: group.name, match: new RegExp(group.match, "i"), earned: 0, total: 0 }))
    : [
        { name: "Web", match: /web|appsec/i, earned: 0, total: 0 },
        { name: "Аналитика", match: /forensic|logs|incident|osint/i, earned: 0, total: 0 },
        { name: "Системы", match: /linux|devsecops|scripting/i, earned: 0, total: 0 },
        { name: "Crypto", match: /crypto/i, earned: 0, total: 0 }
      ];

  missions.forEach((mission, index) => {
    const group = groups.find((item) => item.match.test(mission.role)) || groups[Math.min(1, groups.length - 1)];
    group.total += mission.points;
    if (state.completed[index]) group.earned += mission.points;
  });

  document.querySelector("#skillChart").innerHTML = groups.map((group) => {
    const percent = group.total ? Math.round((group.earned / group.total) * 100) : 0;
    return `
      <div class="skill-row">
        <span>${group.name}</span>
        <div class="skill-bar"><i style="width: ${percent}%"></i></div>
        <strong>${percent}%</strong>
      </div>`;
  }).join("");
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
