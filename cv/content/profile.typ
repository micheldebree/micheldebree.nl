#let meta = toml("../info.toml")
#let data = toml("../michel_de_bree.toml")
#import meta.import.fontawesome: *

#let icon = meta.section.icon.profile
#let language = meta.personal.language
#let include-icon = meta.personal.include_icons

// = Summary
= #if include-icon [#fa-icon(icon) #h(5pt)] #if (
  language == "en"
) [Summary] else [Samenvatting]

#v(5pt)

#if language == "en" [
  #{ data.Summary.Introduction }
] else [
  #{ par(justify: true)[#text(lang: "nl")[#data.Summary.Introduction]] }
]
