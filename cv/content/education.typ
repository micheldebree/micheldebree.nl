#let meta = toml("../info.toml")

#import "@preview/grotesk-cv:1.0.4": education-entry
#import meta.import.fontawesome: *

#let icon = meta.section.icon.education
#let language = meta.personal.language
#let include-icon = meta.personal.include_icons

#let data = toml("../michel_de_bree.toml")

= #if include-icon [#fa-icon(icon) #h(5pt)] #if (
  language == "en"
) [Education] else [Opleiding]

#v(5pt)

#for education in data.Education [
  #education-entry(
    degree: education.Title.at(language),
    date: education.Start + sym.space + sym.dash.em + sym.space + education.End,
    institution: education.Institution.at(language),
  )
]

