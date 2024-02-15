/// <binding AfterBuild='default' />
var gulp = require("gulp");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");

//minify Javascript
function minify() {
    return gulp.src(["wwwroot/js/**/*.js"])
        .pipe(uglify())
        .pipe(concat("dutchtreat.min.js"))
        .pipe(gulp.dest("wwwroot/dist/"));
}
//minify css
function styles() {
    return gulp.src(["wwwroot/css/**/*.css"])
        .pipe(uglify())
        .pipe(concat("dutchtreat.min.css"))
        .pipe(gulp.dest("wwwroot/dist/"));
}

exports.minify = minify;
exports.styles = styles;

exports.default = gulp.parallel(minify, styles);


//PS C: \Dev\DutchTreat > npm - g install gulp - cli
//PS C:\Dev\DutchTreat> npm install gulp
//PS C:\Dev\DutchTreat> npm i gulp-uglify
//PS C:\Dev\DutchTreat> npm i gulp-concat
    //Developer command prompt for VS2019
    //C:\Dev\DutchTreat> gulp
                       //gulp minify
                       //gulp styles

//In Task Runner Explorer sub Gulpfile.js/Tasks/ deafult / run after build
//<environment include="Development"> in _Layout

//In proiect.csproj edit mode
//<Target Name="MyPublishScripts" BeforeTargets="BeforePublish">
//    <Exec Command="npm install" />
//    <Exec Command="gulp" />
//    <Exec Command="npm install" WorkingDirectory=".\\client" />
//    <Exec Command="ng build --prod" WorkingDirectory=".\\client" />
//</Target>

//Publishing to folder
//dotnet DutchTreat.dll
//"outputHashing": "none" in angular.json

//Publishing to IIS
//Sites/Add website/port 81
//physical path: C:\inetpub\dutchtreat
//publish: server localhost
        //site name dutchtreat
        //destination url http://localhost:81

//Publishing using CLI
//PS C: \Dev\DutchTreat > dotnet publish - o C: \Users\Daniel\Desktop\pub2
//PS C:\Dev\DutchTreat> cd C:\Users\Daniel\Desktop\pub2
//PS C: \Users\Daniel\Desktop\pub2 > dotnet DutchTreat.dll

//Publishing with RUntime
//<RuntimeIdentifier>win10-x64</RuntimeIdentifier> in editproject.csproj
//PS C: \Dev\DutchTreat > dotnet publish -o C:\Users\Daniel\Desktop\pub2 --self-contained
//SAU pt mai multe runtimes
//<RuntimeIdentifiers>win10-x64,OSX.10.10-x64</RuntimeIdentifiers>
//PS C: \Dev\DutchTreat > dotnet publish -o C:\Users\Daniel\Desktop\pub2 --runtime osx.10.10-x64
