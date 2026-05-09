#let meta = toml("../info.toml")

#import "@preview/grotesk-cv:1.0.4": skill-entry
#import meta.import.fontawesome: *

#let icon = meta.section.icon.skills
#let language = meta.personal.language
#let include-icon = meta.personal.include_icons
#let accent-color = meta.layout.accent_color
#let font_monospace = meta.layout.text.font_monospace
#let fill-color = meta.layout.fill_color
#let multicol = true
#let alignment = left

#let renderStar(icon) = {
  text(size: 7pt)[#fa-icon(icon, solid: false)]
}

// scale score (0-10) down to half size (0-5) and render half stars if neccesary
#let renderStars(score) = {
  linebreak()
  for n in range(int(score / 2)) {
    renderStar("star")
  }
  if calc.rem(score, 2) != 0 {
    renderStar("star-half")
  }
}

= #if include-icon [#fa-icon(icon) #h(5pt)] #if (
  language == "en"
) [Skills] else [Vaardigheden]

#v(0pt)

#let data = toml("../michel_de_bree.toml")

#for skills in data.Skills [

== #emph(skills.Category)

  #skill-entry(
    fill-color,
    multicol,
    alignment,
    skills: skills
      .Keywords
      .map(k => data.Keywords.at(k))
      .map(k => (k.Name + renderStars(k.Score))),
  )
]
