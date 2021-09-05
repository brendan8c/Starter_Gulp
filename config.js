export default Object.config = {
    // Сырые файлы
    app: {
        html: 'app/html/*.html',
        style: 'app/scss/**/*.scss',
        js: 'app/js/**/*.*',
        fonts: 'app/fonts/**/*.*',
        img: 'app/img/**/*.*',
    },
    // Готовая сборка
    build: {
        html: 'build/',
        style: 'build/css',
        js: 'build/js',
        fonts: 'build/fonts',
        img: 'build/img',
    },
    // Следит за обновлениями файлов внутри папок (чтобы всё работало в режиме stream)
    watch: {
        html: 'app/html/**/*.*',
        style: 'app/scss/**/*.*',
        js: 'app/js/**/*.*',
        fonts: 'app/fonts/**/*.*',
        img: 'app/img/**/*.*',
    }
};