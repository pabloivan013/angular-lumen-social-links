var gulp = require('gulp')
var rimraf = require('rimraf')
var fs = require('fs')
var cheerio = require('cheerio')

const PATH = 'frontend'

gulp.task('dist', function(done) {
   
    // Remove frontend folder from backend
    rimraf.sync(`./../backend/public/${PATH}`)

    // Copy dist folder
    gulp.src([`./dist/${PATH}/**/*`, `!./dist/${PATH}/index.html`]).pipe(
        gulp.dest(`./../backend/public/${PATH}`)
    )

    var $ = cheerio.load(fs.readFileSync(`./dist/${PATH}/index.html`, 'utf-8'))

    $('script').filter((i,el) => {
        // Filter tagmanager (Google analytics)
        return $(el).attr('src') && $(el).attr('src').indexOf('googletagmanager') < 0
    }).each((i,el) => {
        let oldSrc = $(el).attr('src')
        $(el).attr('src', `${PATH}/${oldSrc}`)
    })

    $('link').each((i,el) => {
        var oldHref = $(el).attr('href')
        $(el).attr('href',`${PATH}/${oldHref}`)
    })

    //console.log("$: ", $.html())

    fs.writeFileSync('./../backend/resources/views/index.php', $.html(), 'utf8')

    done()
})