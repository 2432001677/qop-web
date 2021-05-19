const gulp = require("gulp");
const gap = require("gulp-append-prepend");

gulp.task("licenses", async function() {
  gulp
    .src("build/static/js/*chunk.js", { base: "./" })
    .pipe(
      gap.prependText(`/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://github.com/2432001677/qop-web
* Copyright 2021 Bruce Yu (https://2432001677.github.io/)

* Coded by Bruce Yu

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/`)
    )
    .pipe(gulp.dest("./", { overwrite: true }));
  gulp
    .src("build/index.html", { base: "./" })
    .pipe(
      gap.prependText(`<!--

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://github.com/2432001677/qop-web
* Copyright 2021 Creative Tim (https://2432001677.github.io/)

* Coded by Bruce Yu

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

-->`)
    )
    .pipe(gulp.dest("./", { overwrite: true }));
  gulp
    .src("build/static/css/*chunk.css", { base: "./" })
    .pipe(
      gap.prependText(`/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://github.com/2432001677/qop-web
* Copyright 2021 Bruce Yu (https://2432001677.github.io/)

* Coded by Bruce Yu

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/`)
    )
    .pipe(gulp.dest("./", { overwrite: true }));
  return;
});
