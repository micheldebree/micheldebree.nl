#let meta = toml("../info.toml")

#import "@preview/grotesk-cv:1.0.4": experience-entry
#import meta.import.fontawesome: *

#let icon = meta.section.icon.other_experience
#let language = sys.inputs.at("language", default: "nl")
#let include-icon = meta.personal.include_icons


= #if include-icon [#fa-icon(icon) #h(5pt)] #if language == "en" [Other] else [Andere ervaring]


#v(5pt)

#if language == "en" [

  #experience-entry(
    title: [Combat Training],
    date: [2029],
    company: [Resistance],
    location: [Los Angeles, CA],
  )

] else if language == "es" [

  #experience-entry(
    title: [Entrenamiento de combate],
    date: [2029],
    company: [Resistencia],
    location: [Los Ángeles, CA],
  )

] else [

  #experience-entry(
    title: [Gevechtstraining],
    date: [2029],
    company: [Verzet],
    location: [Los Angeles, CA],
  )

]

