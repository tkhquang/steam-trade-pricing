const tailwindcss = require("tailwindcss");
const glob = require("glob-all");
const purgecss = require("@fullhuman/postcss-purgecss");
const autoprefixer = require("autoprefixer");
const postcssImport = require("postcss-import");

class TailwindExtractor {
  static extract(content) {
    return content.match(/[\w-/:]+(?<!:)/g) || [];
  }
}

module.exports = {
  // Specify the locations of any files you want to scan for class names.
  paths: glob.sync(["src/**/*.js"]),
  syntax: "postcss-scss",
  parser: "postcss-scss",
  plugins: [
    postcssImport,
    tailwindcss("./tailwind.config.js"),
    ...(process.env.NODE_ENV === "production"
      ? [
          purgecss({
            content: ["./src/**/*.js"],
            css: ["./src/**/*.css"],
            extractors: [
              {
                extractor: TailwindExtractor,
                extensions: [
                  "js", //
                  "css"
                ]
              }
            ]
          })
        ]
      : []),
    autoprefixer
  ]
};
