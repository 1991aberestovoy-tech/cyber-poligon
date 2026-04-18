# Ключи ответов: CTF-треки

## Трек 1: CTF Quals

1. Base64-разминка: `CTF{base64_start}`
2. robots.txt: `/backup-2026/readme.txt`
3. Шифр Цезаря: `CTF{caesar_shift}`
4. Подозрительный запрос: `GET /download?file=../../flag.txt`
5. View Source: `CTF{view_source}`
6. Cookie Role: правильные варианты 1, 3, 5
7. LSB-пиксели: `CTF{lsb}`
8. DNS TXT: `TXT-запись`
9. Порядок реагирования:
   1. Изолировать подозрительный контейнер или хост
   2. Сохранить логи, дампы и время событий
   3. Сменить скомпрометированные секреты
10. Финал Quals: цепочка web-разведки

## Трек 2: CTF Finals

1. JWT Payload: `CTF{jwt_payload}`
2. SQLi: найди защиту: правильные варианты 1, 2, 4
3. IDOR: `CTF{idor}`
4. Follow HTTP Stream: `CTF{follow_the_stream}`
5. XOR Key: `CTF{xor_key}`
6. SUID-файл: `/usr/local/bin/backup` с битом `s`
7. Контейнерные секреты: правильные варианты 1, 3, 4
8. Regex-флаг: `CTF{regex_power}`
9. Таймлайн атаки:
   1. Фишинговое письмо доставлено участнику
   2. Скачан архив challenge.zip
   3. Запущен suspicious.exe
   4. Появилось исходящее соединение на неизвестный домен
10. Финал: Blue Team Wins: комплексный план закрытия веб-ошибок, секретов, Linux-риска и сохранения логов
