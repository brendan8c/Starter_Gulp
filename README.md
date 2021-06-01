<img src=https://raw.githubusercontent.com/Brendan8c/start_gulp/master/img/Gulp.png width="100%">

<table align="center">
    <tr>
        <td rowspan="2">
            <a href="https://github.com/gulpjs/gulp">
                <img src=https://raw.githubusercontent.com/Brendan8c/start_gulp/master/img/Gulp.svg width="70px" style="margin-top:-50px">
            </a>
        </td>
        <td colspan="2">
            <a href="https://ko-fi.com/brendan8c">
                <img src="https://www.ko-fi.com/img/githubbutton_sm.svg" width="226px">
            </a>
        </td>
    </tr>
    <tr>
        <td>
            <a href="https://www.paypal.com/paypalme/artemguskov/5usd">
                <img src="https://raw.githubusercontent.com/Brendan8c/FFMPEG_BAT/master/img/PayPal.svg" width="100px">
            </a>
        </td>
        <td>
            <a href="https://img.shields.io/github/license/brendan8c/FFMPEG_BAT">
                <img src="https://img.shields.io/badge/License-MIT-green.svg" width="100px">
            </a>
        </td>
    </tr>
</table>

# About
Это моя стартовая сборка gulp<br>

# Установка
Откройте консоль и клонируйте этот репозиторий.<br>
`git clone https://github.com/brendan8c/start_gulp.git`<br>
В вашем редакотре кода откройте этот проект и запустите команду.<br>
`npm i`

# Для обновления зависимостей я использую:
## npm-check-updates<br>
'npm-check-updates' обновляет зависимости вашего 'package.json' до последних версии.
> https://github.com/raineorshine/npm-check-updates<br>
Установите: `npm i -g npm-check-updates`

1) `ncu` –Показать любые новые зависимости для проекта в текущем каталоге.
2) `ncu -u` –Обновить package.json
3) `ncu -g` –Проверьте глобальные пакеты.

# Как пользоваться:
Проект разрабатывается в папке `app`<br>
Готовая сборка будет находится в папке `build`<br>
В папке `build` будет так-же присутсвовать папка `sourcemaps`.<br>
Папка содержит в себе карты кода для более удобной отладки во время разработки.<br>
Загружать эту папку на сервер не нужно!<br>

Для запуска сборки введите: `npm build`<br>
Для запуска разработки введите: `npm stream`<br>
В обоих случаях проект будет собран одинаково.<br>
Режим разработки происходит в реал тайме, перезагружать gulp нет необходимости, все изменения вносятся и добавляются мгновенно.<br>

Шрифт будет автоматически сконвертирован из формата ttf в woff и woff2.<br>
В стилях '_fonts.scss' нужно сразу указывать эти разрешения форматов!<br>
Большинство современных браузеров поддерживают эти форматы.<br>
> https://caniuse.com/?search=.woff<br>
> https://caniuse.com/?search=.woff2<br>

# Дополнительно:
Также я оставил много комментариев в файле 'gulpfile.js' я думаю это поможет быстрее понять его структуру.<br>

"dependencies": Пакеты, необходимые для работы вашего приложения.<br>
"devDependencies": Пакеты, необходимые только для локальной разработки и тестирования.<br>

Чтобы добавить зависимости в "devDependencies" выполните следующую команду:<br>
`npm install <имя-пакета> --save-dev` Краткий пример: `npm i -D normalize.css`<br>
Чтобы добавить зависимости в "dependencies" выполните следующую команду:<br>
`npm install <имя-пакета> --save-prod` Краткий пример: `npm i -P normalize.css`<br>

При запуске `npm i`, npm загрузит зависимости из devDependencies, перечисленные в, package.json<br>