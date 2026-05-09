#let meta = toml("../info.toml")

#import "@preview/grotesk-cv:1.0.4": language-entry
#import meta.import.fontawesome: *

#let icon = meta.section.icon.languages
#let language = meta.personal.language
#let include-icon = meta.personal.include_icons

= #if include-icon [#fa-icon(icon) #h(5pt)] #if language == "en" [Languages] else [Talen]

#v(5pt)

#if language == "en" {
  language-entry(language: "Dutch", proficiency: "Native")
  language-entry(language: "English", proficiency: "Fluent")
} else {
  language-entry(language: "Nederlands", proficiency: "Moedertaal")
  language-entry(language: "Engels", proficiency: "Vloeiend")
}

