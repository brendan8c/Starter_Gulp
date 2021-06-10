const app = ('app/') // Папка с сырыми файлами
const build = ('build/') // Папка готовой сборки
const { src, dest, series, watch } = require('gulp') // Gulp.
const browserSync = require('browser-sync').create() // Вызываем методо create чтобы сервер работал.
const postcss = require('gulp-postcss') // Для передачи CSS через несколько плагинов.
const sourcemaps = require('gulp-sourcemaps') // Поддержка карты исходного кода для gulpjs. Для более удобной отладки.
const autoprefixer = require('autoprefixer') // Добавление автопрефиксов поставщиков в правила CSS.
const cssnano = require('cssnano') // Оптимизатор для сжатия CSS.
const sass = require('gulp-sass') // CSS препроцессер SCSS.
const include = require('gulp-file-include') // Пакет для соединения файлов.
const htmlmin = require('gulp-htmlmin') // HTML-минификатор.
const del = require('del') // Удалить файлы и каталоги.
const concat = require('gulp-concat') // Объединит файлы в один файл, в том порядке, в котором они указаны, в gulp.src функции.
const babel = require('gulp-babel') // Компилятор JS. Набор инструментов для преобразования кода ECMAScript 2015+ в обратно совместимую версию JS в текущих и старых браузерах.
const babelPresetEnv = require('@babel/preset-env') // Это интеллектуальная предустановка, которая позволяет использовать последнюю версию JS без необходимости микроуправления.
const terser = require('gulp-terser') // Инструмент для сжатия JavaScript для ES6 +. На замену старому (gulp-uglify)
const ttf2woff = require('gulp-ttf2woff') // Конвертировать шрифт из ttf в woff
const ttf2woff2 = require('gulp-ttf2woff2') // Конвертировать шрифт из ttf в woff2
const size = require('gulp-size') // Регистрирует общий размер файлов в потоке и возможно отдельные размеры файлов. Размер фалов будет показан в терминале при сборке.
    // const replace = require('replace-in-file') // Простая утилита для быстрой замены текста в одном или нескольких файлах.
const pxtorem = require('postcss-pxtorem') // Плагин который генерирует единицы rem из единиц px.
const posthtml = require('gulp-posthtml') // Это инструмент для преобразования HTML/XML с помощью плагинов JS.
const posthtmlPostcss = require('posthtml-postcss') // Использовать PostCSS в HTML.

const config = {
    // Сырые файлы
    app: {
        html: app + 'html/*.html',
        style: app + 'scss/**/*.scss',
        js: app + 'js/**/*.*',
        fonts: app + 'fonts/**/*.*',
        img: app + 'img/**/*.*',
    },
    // Готовая сборка
    build: {
        html: build,
        style: build + 'css',
        js: build + 'js',
        fonts: build + 'fonts',
        img: build + 'img',
    },
    // Следит за обновлениями файлов внутри папок (чтобы всё работало в режиме stream)
    watch: {
        html: app + 'html/**/*.*',
        style: app + 'scss/**/*.*',
        js: app + 'js/**/*.*',
        fonts: app + 'fonts/**/*.*',
        img: app + 'img/**/*.*',
    }
}

const config_size = { // Получаем размер файла.
    showFiles: false, // Отображает размер каждого файла, а не только общий размер.
    showTotal: true, // Отображает общее количество всех файлов.
    pretty: true, // Отображает предварительно заданный размер: 1337 Б → 1,34 КБ.я
    gzip: false, // Отображает размер в сжатом виде.
}

const config_HTML_size = { title: '-------------------------------------------- HTML: ' }
const config_CSS1_size = { title: '-------------------------------------------- libs.min.css: ' }
const config_CSS2_size = { title: '-------------------------------------------- style.min.css: ' }
const config_FONTS_size = { title: '-------------------------------------------- FONTS: ' }
const config_JS1_size = { title: '-------------------------------------------- libs.min.js: ' }
const config_JS2_size = { title: '-------------------------------------------- main.min.js: ' }
const config_IMG_size = { title: '-------------------------------------------- IMG: ' }
const config_ALL_size = { title: '-------------------------------------------- All project: ' }


// Компилирует HTML файлы
function html() {
    const postcssPlugins = [
        autoprefixer({
            overrideBrowserslist: [
                '>0.25%',
                'not ie 11',
                'not op_mini all'
            ]
        }),
        pxtorem({
            rootValue: 16,
            unitPrecision: 5,
            propList: ['font', 'font-size', 'line-height', 'letter-spacing'],
            replace: false,
            mediaQuery: false,
            minPixelValue: 0,
        })
    ];
    const postcssOptions = { from: undefined }
    const filterType = /^text\/css$/
    const plugins = [
        // Подключаем плагины 'autoprefixer' и 'pxtorem' через плагин 'posthtml-postcss'. В опциях для PostCss выставляем значение 'undefined' для отключения ошибки.
        posthtmlPostcss(postcssPlugins, postcssOptions, filterType)
    ];
    return src(config.app.html)
        .pipe(include({ // Подключаем через @@include() файлы html к основному.
            prefix: '@@'
        }))
        .pipe(posthtml(plugins))
        .pipe(htmlmin({ // Минифицируем HTML. (https://github.com/kangax/html-minifier#options-quick-reference)
            collapseWhitespace: true, // Удаляем пробелы.
            // preserveLineBreaks: true, // Всегда сворачивайте до 1 разрыва строки (никогда не удаляйте его полностью), если пробелы между тегами включают разрыв строки.
            // conservativeCollapse: true, // Всегда сворачивайте до 1 места (никогда не удаляйте его полностью).
            collapseInlineTagWhitespace: true, // При сворачивании не оставляйте пробелов между элементами.
            continueOnParseError: true, // Обработка ошибок синтаксического анализа вместо прерывания.
            html5: true, // Анализировать ввод в соответствии со спецификациями HTML5.
            includeAutoGeneratedTags: true, // Вставить теги, созданные парсером HTML.
            preventAttributesEscaping: true, // Предотвращает экранирование значений атрибутов.
            removeComments: true, // Убрать HTML-комментарии.
            removeScriptTypeAttributes: true, // Убрать type="text/javascript"из scriptтегов. Остальные typeзначения атрибутов оставлены без изменений.
            removeStyleLinkTypeAttributes: true, // Удалить type="text/css"из styleи linkтеги. Остальные typeзначения атрибутов оставлены без изменений.
            sortAttributes: true, // Сортировать атрибуты по частоте.
            sortClassName: true, // Сортировать классы стилей по частоте.
            useShortDoctype: true // Заменяет doctypedoctype на короткий (HTML5).
        }))
        .pipe(dest(config.build.html)) // Перемещаем в папку готовой сборки.
}

function scss() {
    const plugins = [
        autoprefixer({
            // browsers: 'last 1 version'
            overrideBrowserslist: [
                '>0.25%',
                'not ie 11',
                'not op_mini all'
            ]
        }),
        pxtorem({
            rootValue: 16, // Представляет размер шрифта корневого элемента.
            unitPrecision: 5, // Десятичные числа, до которых могут вырасти единицы REM.
            propList: ['font', 'font-size', 'line-height', 'letter-spacing'], // Свойства, которые могут изменяться с px на rem.
            replace: false, // Заменяет правила, содержащие rems, вместо добавления резервных вариантов.
            mediaQuery: false, // Разрешить преобразование px в медиа-запросах.
            minPixelValue: 0, // Установите минимальное значение заменяемого пикселя.
        }),
        cssnano()
    ];

    return src(config.app.style)
        .pipe(sourcemaps.init({ loadMaps: true })) // Чтобы загрузить существующие исходные карты.
        .pipe(sourcemaps.identityMap()) // Позволяет сгенерировать полную действительную исходную карту с кодировкой без изменений.
        .pipe(sass()) // Скомпилировали SCSS в CSS.
        .pipe(concat('style.min.css')) // Объединяем CSS файлы в один файл.
        .pipe(postcss(plugins))
        .pipe(sourcemaps.write('../sourcemaps/'))
        .pipe(dest(config.build.style)) // Перемещаем в папку готовой сборки.
}

// Заменяем все найденный строки в style.min.css.
// function updateRedirects(done) {
//     replace({
//         files: 'build/css/style.min.css',
//         from: /img\/sprite.png/g, // Ищем эти строки img/sprite.png
//         to: '../img/sprite.png', // Заменяем на ../img/sprite.png
//         countMatches: true,
//     }, done)
// }

// Компилирует JavaScript файлы
function javaScript() {
    return src(config.app.js)
        .pipe(sourcemaps.init({ loadMaps: true })) // Чтобы загрузить существующие исходные карты.
        .pipe(sourcemaps.identityMap()) // Позволяет сгенерировать полную действительную исходную карту с кодировкой без изменений.
        .pipe(babel({ // Скомпилировали ECMAScript 2015+ в совместимый JS.
            presets: [babelPresetEnv]
        }))
        .pipe(terser()) // Минифицируем JS файлы.
        .pipe(concat('main.min.js')) // Объединяем CSS файлы в один файл.
        .pipe(sourcemaps.write('../sourcemaps/'))
        .pipe(dest(config.build.js)) // Перемещаем в папку готовой сборки.

}

// Конвертирует шрифт
function fontConverter() {
    return src(config.app.fonts)
        .pipe(ttf2woff()) // Конвертирует шрифт ttf в woff
        .pipe(src(config.app.fonts))
        .pipe(ttf2woff2()) // Конвертирует шрифт ttf в woff2
        .pipe(dest(config.build.fonts)) // Перемещаем в папку готовой сборки.
}

// Клонируем изображения
function imgConverter() {
    return src(config.app.img)
        .pipe(dest(config.build.img))
}

//—————————————————————— Подключаем CSS файлы и минифицируем их в libs.min.css ——————————————————————
function css() {
    const plugins = [
        autoprefixer({
            overrideBrowserslist: [
                '>0.25%',
                'not ie 11',
                'not op_mini all'
            ]
        }),
        cssnano()
    ];
    return src([
            'node_modules/normalize.css/normalize.css',
        ])
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.identityMap())
        .pipe(postcss(plugins))
        .pipe(concat('libs.min.css'))
        .pipe(sourcemaps.write('../sourcemaps/'))
        .pipe(dest(config.build.style))
}
//—————————————————————— Подключаем JS файлы и минифицируем их в libs.min.js ——————————————————————
function js() {
    return src([
            'node_modules/jquery/dist/jquery.js',
        ])
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.identityMap())
        .pipe(babel({
            presets: [babelPresetEnv]
        }))
        .pipe(terser())
        .pipe(concat('libs.min.js'))
        .pipe(sourcemaps.write('../sourcemaps/'))
        .pipe(dest(config.build.js))
}

// Получаем размеры файлов в готовой сборке 
function htmlSize() {
    return src(build + '**/*.html')
        .pipe(size(Object.assign(config_size, config_HTML_size)))
}

function cssSize1() {
    return src(config.build.style + '/libs.min.css')
        .pipe(size(Object.assign(config_size, config_CSS1_size)))
}

function cssSize2() {
    return src(config.build.style + '/style.min.css')
        .pipe(size(Object.assign(config_size, config_CSS2_size)))
}

function jsSize1() {
    return src(config.build.js + '/libs.min.js')
        .pipe(size(Object.assign(config_size, config_JS1_size)))
}

function jsSize2() {
    return src(config.build.js + '/main.min.js')
        .pipe(size(Object.assign(config_size, config_JS2_size)))
}

function fontSize() {
    return src(config.build.fonts + '/**.*')
        .pipe(size(Object.assign(config_size, config_FONTS_size)))
}

function imgSize() {
    return src(config.build.img + '/**.*')
        .pipe(size(Object.assign(config_size, config_IMG_size)))
}

function allSize() {
    return src(build + '**/*.*')
        .pipe(size(Object.assign(config_size, config_ALL_size)))
}

// Очищаем папку build перед каждым запуском сборки.
function clear() {
    return del(build)
}

function stream() {
    browserSync.init({
            server: build, // Запускаем сервер из папки build, уже сгенерированный сайт.
            host: 'localhost', // Переопределить определение хоста, если вы знаете правильный IP-адрес для использования.
            notyfy: false, // Не показывать уведомления в браузере. Небольшие всплывающие уведомления.
            browser: "chrome", // Откройте сайт в Chrome.
            logPrefix: 'My Project:', // Измените префикс ведения журнала консоли. Полезно, если вы создаете свой собственный проект на основе Browsersync.
            logLevel: 'info', // Просто покажите основную информацию.
            open: "local", // Откройте URL-адрес localhost. Решите, какой URL-адрес будет открываться автоматически при запуске Browsersync.
            port: 8080 // Использовать определенный порт (вместо того, который автоматически определяется Browsersync).
        })
        // Следит за обновлениями html, scss и п.р. файлов. Если произошли изменения тогда вызываем задачу series(). И перезагружаем сервер.
    watch(config.watch.html, series(html)).on('change', browserSync.reload)
    watch(config.watch.style, series(scss)).on('change', browserSync.reload)
    watch(config.watch.style, series(css)).on('change', browserSync.reload)
    watch(config.watch.js, series(javaScript)).on('change', browserSync.reload)
    watch(config.watch.js, series(js)).on('change', browserSync.reload)
    watch(config.watch.fonts, series(fontConverter)).on('change', browserSync.reload)
    watch(config.watch.img, series(imgConverter)).on('change', browserSync.reload)
}

// Экспортируем задачи для сборки проекта или запуска в режиме разработки.
// Вызываем по очерёдно задачи. Gulp build.
exports.build = series(clear, fontConverter, html, scss, css, javaScript, js, imgConverter, htmlSize, cssSize1, cssSize2, fontSize, jsSize1, jsSize2, imgSize, allSize)
    // Очищаем папку build, компилируем файлы и запускаем сервер stream. Gulp stream.
exports.stream = series(clear, fontConverter, html, scss, css, javaScript, js, imgConverter, htmlSize, cssSize1, cssSize2, fontSize, jsSize1, jsSize2, imgSize, allSize, stream)
exports.clear = clear()