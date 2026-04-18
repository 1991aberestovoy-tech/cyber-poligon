window.CTF_MISSION_PACKS = [
  {
    id: "ctf-qual",
    name: "Трек 1: CTF Quals",
    description: "Разминка CTF: Base64, robots.txt, Caesar, логи, HTML-комментарии, cookies, stego и DNS.",
    missions: [
      {
        title: "Base64-разминка",
        role: "Crypto",
        difficulty: "Легко",
        time: "3 минуты",
        points: 10,
        story:
          "На табло CTF появился первый зашифрованный флаг. Организаторы оставили подсказку: это обычная кодировка Base64.",
        type: "text",
        prompt: "Раскодируй строку и введи флаг.",
        artifact: [
          "Encoded: Q1RGe2Jhc2U2NF9zdGFydH0=",
          "Формат ответа: CTF{...}"
        ],
        answer: "ctf{base64_start}",
        success: "Флаг принят. Base64 часто встречается в CTF как быстрый старт и способ спрятать подсказку.",
        fail: "Это Base64. После декодирования получится флаг в формате CTF{...}."
      },
      {
        title: "robots.txt",
        role: "Web",
        difficulty: "Легко",
        time: "4 минуты",
        points: 10,
        story:
          "Веб-задание начинается с открытого файла robots.txt. В CTF такие файлы часто ведут к скрытым директориям.",
        type: "single",
        prompt: "Где вероятнее всего лежит флаг?",
        artifact: [
          "User-agent: *",
          "Disallow: /admin-old/",
          "Disallow: /backup-2026/",
          "# note: readme.txt was not removed"
        ],
        options: [
          "/contacts",
          "/backup-2026/readme.txt",
          "/assets/logo.png",
          "/robots.txt.txt"
        ],
        answer: 1,
        success: "Верно. robots.txt не защищает директории, а только подсказывает поисковым роботам, куда не ходить.",
        fail: "Ищи скрытый путь из Disallow и файл, который организаторы забыли убрать."
      },
      {
        title: "Шифр Цезаря",
        role: "Crypto",
        difficulty: "Легко",
        time: "4 минуты",
        points: 10,
        story:
          "Флаг был сдвинут на 3 буквы вперед по английскому алфавиту. Нужно вернуть исходный текст.",
        type: "text",
        prompt: "Расшифруй: FWI{FDHVDU_VKLIW}",
        artifact: ["Подсказка: F -> C, W -> T, I -> F."],
        answer: "ctf{caesar_shift}",
        success: "Верно. Простые замены и сдвиги помогают почувствовать логику криптозадач.",
        fail: "Сдвинь каждую английскую букву на 3 назад. Символы { } и _ не меняются."
      },
      {
        title: "Подозрительный запрос",
        role: "Logs",
        difficulty: "Средне",
        time: "5 минут",
        points: 15,
        story:
          "В access.log спрятан запрос, который похож на попытку добраться до файла с флагом.",
        type: "single",
        prompt: "Какая строка самая подозрительная?",
        artifact: [
          "10.0.0.5 GET /index.html 200",
          "10.0.0.8 GET /assets/app.css 200",
          "10.0.0.9 GET /download?file=../../flag.txt 403",
          "10.0.0.11 GET /rules.pdf 200"
        ],
        options: [
          "GET /index.html",
          "GET /assets/app.css",
          "GET /download?file=../../flag.txt",
          "GET /rules.pdf"
        ],
        answer: 2,
        success: "Да. Последовательность ../ похожа на path traversal и попытку выйти из разрешенной папки.",
        fail: "Смотри на путь, который пытается обратиться к файлу вне обычной директории."
      },
      {
        title: "View Source",
        role: "Web",
        difficulty: "Легко",
        time: "3 минуты",
        points: 10,
        story:
          "На странице задания ничего не видно, но в исходном коде остался комментарий разработчика.",
        type: "text",
        prompt: "Найди и введи флаг.",
        artifact: [
          "<main>",
          "  <h1>Welcome to CTF</h1>",
          "  <!-- CTF{view_source} -->",
          "</main>"
        ],
        answer: "ctf{view_source}",
        success: "Флаг найден. Просмотр исходника страницы - классика web-разминки в CTF.",
        fail: "Посмотри на HTML-комментарий: флаг уже лежит внутри него."
      },
      {
        title: "Cookie Role",
        role: "Web",
        difficulty: "Средне",
        time: "5 минут",
        points: 15,
        story:
          "В задании видно, что роль пользователя хранится в cookie. Нужно понять, где ошибка безопасности.",
        type: "multi",
        prompt: "Какие выводы правильные?",
        artifact: [
          "Cookie: user=team7; role=guest",
          "Подсказка на странице: admin panel checks your role"
        ],
        options: [
          "Если сервер доверяет role из cookie, роль можно подменить",
          "Cookie всегда невозможно изменить пользователю",
          "Проверка прав должна выполняться на сервере",
          "Флаг безопасно хранить в HTML-комментарии",
          "Cookie с правами лучше подписывать и проверять"
        ],
        answer: [0, 2, 4],
        success: "Верно. Клиентские данные нельзя считать доказательством прав доступа без серверной проверки.",
        fail: "Думай как участник CTF: все, что пришло от клиента, можно попытаться изменить."
      },
      {
        title: "LSB-пиксели",
        role: "Forensics",
        difficulty: "Средне",
        time: "5 минут",
        points: 15,
        story:
          "Изображение слишком обычное, но организаторы дали младшие биты нескольких пикселей. Они складываются в ASCII.",
        type: "text",
        prompt: "Переведи байты в символы и введи флаг.",
        artifact: [
          "01000011 01010100 01000110 01111011",
          "01101100 01110011 01100010 01111101"
        ],
        answer: "ctf{lsb}",
        success: "Да. Это мини-версия стеганографии: данные прячут в младших битах.",
        fail: "Каждые 8 бит - один ASCII-символ. Первые три байта дают CTF."
      },
      {
        title: "DNS TXT",
        role: "OSINT",
        difficulty: "Средне",
        time: "4 минуты",
        points: 15,
        story:
          "В OSINT-задаче нужно проверить DNS-записи домена CTF-стенда.",
        type: "single",
        prompt: "Какая запись содержит флаг?",
        artifact: [
          "A ctf-school.example -> 203.0.113.10",
          "MX ctf-school.example -> mail.example",
          "TXT ctf-school.example -> CTF{dns_txt}",
          "AAAA ctf-school.example -> 2001:db8::10"
        ],
        options: [
          "A-запись",
          "MX-запись",
          "TXT-запись",
          "AAAA-запись"
        ],
        answer: 2,
        success: "Верно. TXT-записи часто используют для верификации, подсказок и OSINT-задач.",
        fail: "Ищи тип записи, где можно хранить произвольный текст."
      },
      {
        title: "Порядок реагирования",
        role: "Incident Response",
        difficulty: "Сложно",
        time: "5 минут",
        points: 20,
        story:
          "На CTF-инфраструктуре заметили подозрительную активность. Нужно выбрать порядок первых действий синей команды.",
        type: "sequence",
        prompt: "Расставь действия по порядку.",
        options: [
          "Изолировать подозрительный контейнер или хост",
          "Сохранить логи, дампы и время событий",
          "Сменить скомпрометированные секреты",
          "Стереть все логи, чтобы освободить место"
        ],
        answer: [0, 1, 2],
        success: "Правильно. Сначала ограничиваем ущерб, затем сохраняем доказательства и обновляем секреты.",
        fail: "Удаление логов разрушает расследование. Это лишний вариант."
      },
      {
        title: "Финал Quals",
        role: "Mixed",
        difficulty: "Сложно",
        time: "7 минут",
        points: 25,
        story:
          "Последняя задача объединяет несколько подсказок: robots.txt, HTML-комментарий, cookie role и странный запрос к flag.txt.",
        type: "case",
        prompt: "Какой вывод лучше всего описывает путь к флагу?",
        artifact: [
          "1. robots.txt ведет в /backup-2026/",
          "2. В readme.txt есть подсказка view-source",
          "3. В HTML-комментарии найдено имя cookie role",
          "4. Лог показывает попытку /download?file=../../flag.txt"
        ],
        options: [
          "Это цепочка web-разведки: скрытая директория, исходник, клиентская роль и path traversal",
          "Это только криптография, веб-части здесь нет",
          "Все события случайны и не связаны",
          "Нужно удалить браузер и начать заново"
        ],
        answer: 0,
        success: "Финальный флаг засчитан: CTF{quals_complete}. Ты связал несколько техник в одну цепочку.",
        fail: "Свяжи веб-подсказки в цепочку: скрытый путь, исходник, cookie и запрос к файлу."
      }
    ]
  },
  {
    id: "ctf-finals",
    name: "Трек 2: CTF Finals",
    description: "Сложнее: JWT, IDOR, HTTP stream, XOR, Linux-права, контейнеры, regex и таймлайн атаки.",
    missions: [
      {
        title: "JWT Payload",
        role: "Web",
        difficulty: "Средне",
        time: "5 минут",
        points: 15,
        story:
          "Организаторы дали декодированный payload JWT. Нужно извлечь флаг из подсказки.",
        type: "text",
        prompt: "Введи флаг по значению hint.",
        artifact: [
          "{",
          "  \"user\": \"team12\",",
          "  \"role\": \"guest\",",
          "  \"hint\": \"CTF{jwt_payload}\"",
          "}"
        ],
        answer: "ctf{jwt_payload}",
        success: "Верно. В CTF JWT часто начинают с чтения header и payload, но права должен проверять сервер.",
        fail: "Флаг уже есть в поле hint. Введи его целиком в формате CTF{...}."
      },
      {
        title: "SQLi: найди защиту",
        role: "AppSec",
        difficulty: "Сложно",
        time: "6 минут",
        points: 20,
        story:
          "В коде формы поиска пользовательский ввод склеивается с SQL-строкой. Нужно выбрать правильные меры защиты.",
        type: "multi",
        prompt: "Что действительно снижает риск SQL-инъекции?",
        artifact: [
          "query = \"SELECT * FROM flags WHERE name = '\" + input + \"'\"",
          "input приходит из формы участника"
        ],
        options: [
          "Параметризованные запросы",
          "Подготовленные выражения",
          "Спрятать ошибку SQL и больше ничего не менять",
          "Минимальные права у пользователя базы",
          "Переименовать таблицу flags"
        ],
        answer: [0, 1, 3],
        success: "Верно. Главная идея - не склеивать SQL из пользовательского текста и ограничивать последствия.",
        fail: "Ищи меры, которые меняют способ выполнения запроса или ограничивают права базы."
      },
      {
        title: "IDOR",
        role: "Web",
        difficulty: "Средне",
        time: "4 минуты",
        points: 15,
        story:
          "Участник видит URL профиля /profile/120. При изменении числа открывается чужой профиль с флагом.",
        type: "text",
        prompt: "Как называется этот класс уязвимости? Введи флаг.",
        artifact: [
          "/profile/120 -> профиль team12",
          "/profile/121 -> чужой профиль и CTF{idor}"
        ],
        answer: "ctf{idor}",
        success: "Верно. IDOR возникает, когда объект доступен по предсказуемому идентификатору без проверки прав.",
        fail: "Подумай про Insecure Direct Object Reference. Флаг уже указан рядом с чужим профилем."
      },
      {
        title: "Follow HTTP Stream",
        role: "Forensics",
        difficulty: "Средне",
        time: "5 минут",
        points: 15,
        story:
          "В дампе трафика нужно открыть HTTP stream и найти заголовок с флагом.",
        type: "text",
        prompt: "Введи значение заголовка X-Flag.",
        artifact: [
          "HTTP/1.1 200 OK",
          "Server: ctf-lab",
          "X-Flag: CTF{follow_the_stream}",
          "Content-Type: text/plain"
        ],
        answer: "ctf{follow_the_stream}",
        success: "Флаг найден. Анализ потока в Wireshark - частая forensic-задача.",
        fail: "Ищи HTTP-заголовок X-Flag."
      },
      {
        title: "XOR Key",
        role: "Crypto",
        difficulty: "Сложно",
        time: "5 минут",
        points: 20,
        story:
          "Флаг зашифровали XOR с одним байтом. Организаторы дали ключ, чтобы проверить внимательность.",
        type: "text",
        prompt: "Применяй XOR 0x13 к байтам и введи флаг.",
        artifact: [
          "key = 0x13",
          "cipher hex = 70 67 75 68 6b 7c 61 4c 78 76 6a 6e",
          "Подсказка: первый байт 0x70 XOR 0x13 = 0x63 = c"
        ],
        answer: "ctf{xor_key}",
        success: "Верно. Однобайтовый XOR - базовая CTF-классика для понимания операций над байтами.",
        fail: "Каждый байт нужно XOR-нуть с 0x13. Первый символ получится c."
      },
      {
        title: "SUID-файл",
        role: "Linux",
        difficulty: "Сложно",
        time: "5 минут",
        points: 20,
        story:
          "В Linux-задании нужно найти бинарник с необычными правами, который может быть путем к повышению привилегий.",
        type: "single",
        prompt: "Какая строка требует проверки первой?",
        artifact: [
          "-rw-r--r-- root root /etc/hosts",
          "-rwxr-xr-x root root /usr/bin/less",
          "-rwsr-xr-x root root /usr/local/bin/backup",
          "-rw------- user user /home/user/notes.txt"
        ],
        options: [
          "/etc/hosts",
          "/usr/bin/less",
          "/usr/local/bin/backup с битом s",
          "/home/user/notes.txt"
        ],
        answer: 2,
        success: "Да. Буква s в правах владельца означает SUID, такой файл нужно анализировать особенно осторожно.",
        fail: "Ищи необычный бит прав в строке с исполняемым файлом."
      },
      {
        title: "Контейнерные секреты",
        role: "DevSecOps",
        difficulty: "Средне",
        time: "5 минут",
        points: 15,
        story:
          "В CTF-инфраструктуре секреты случайно попали в переменные окружения контейнера.",
        type: "multi",
        prompt: "Какие действия правильные?",
        artifact: [
          "ENV FLAG_TOKEN=CTF{container_secret}",
          "ENV DB_PASSWORD=student123",
          "image pushed to public registry"
        ],
        options: [
          "Считать секреты скомпрометированными и перевыпустить их",
          "Оставить как есть, если образ уже скачали",
          "Убрать секреты из Dockerfile и использовать secret manager",
          "Проверить историю образов и публичный registry",
          "Переименовать FLAG_TOKEN в TOKEN"
        ],
        answer: [0, 2, 3],
        success: "Верно. Публичный образ с секретами требует перевыпуска секретов и исправления процесса сборки.",
        fail: "Если секрет уже попал в публичный образ, его нужно считать раскрытым."
      },
      {
        title: "Regex-флаг",
        role: "Scripting",
        difficulty: "Легко",
        time: "3 минуты",
        points: 10,
        story:
          "В большом тексте нужно найти флаг по шаблону CTF{...}.",
        type: "text",
        prompt: "Извлеки флаг из строки.",
        artifact: [
          "noise=alpha; token=7421; note='almost'; flag=CTF{regex_power}; end=true"
        ],
        answer: "ctf{regex_power}",
        success: "Флаг найден. Регулярные выражения помогают быстро доставать CTF{...} из шума.",
        fail: "Ищи подстроку, которая начинается с CTF{ и заканчивается }."
      },
      {
        title: "Таймлайн атаки",
        role: "Forensics",
        difficulty: "Сложно",
        time: "6 минут",
        points: 20,
        story:
          "Нужно восстановить порядок событий по артефактам инцидента.",
        type: "sequence",
        prompt: "Расставь события в правильном порядке.",
        options: [
          "Фишинговое письмо доставлено участнику",
          "Скачан архив challenge.zip",
          "Запущен suspicious.exe",
          "Появилось исходящее соединение на неизвестный домен"
        ],
        answer: [0, 1, 2, 3],
        success: "Правильно. Таймлайн помогает отличить причину, действие и последствия.",
        fail: "Сначала приходит письмо, затем файл, затем запуск, затем сетевой след."
      },
      {
        title: "Финал: Blue Team Wins",
        role: "Mixed",
        difficulty: "Сложно",
        time: "6 минут",
        points: 25,
        story:
          "Финальный разбор: команда нашла JWT-подсказку, IDOR, HTTP stream, SUID-файл и секреты в контейнере.",
        type: "case",
        prompt: "Какой план действий лучше всего закрывает финальный инцидент?",
        artifact: [
          "JWT payload раскрывает hint",
          "IDOR показывает чужие профили",
          "X-Flag найден в HTTP stream",
          "SUID backup запускается от root",
          "Секреты попали в публичный container image"
        ],
        options: [
          "Проверить авторизацию на сервере, закрыть IDOR, пересобрать образ без секретов, перевыпустить ключи, проверить SUID и сохранить логи",
          "Удалить только HTML-страницу с подсказкой",
          "Сменить цвет интерфейса и оставить секреты как есть",
          "Запретить участникам открывать браузер"
        ],
        answer: 0,
        success: "Финальный флаг: CTF{blue_team_wins}. Это уже похоже на разбор настоящего CTF-инцидента.",
        fail: "Нужен план, который закрывает веб-ошибки, секреты, Linux-риск и сохраняет доказательства."
      }
    ]
  }
];
