#let meta = toml("../info.toml")
#let data = toml("../michel_de_bree.toml")
#import meta.import.fontawesome: *

#let icon = meta.section.icon.profile
#let language = sys.inputs.at("language", default: "nl")
#let include-icon = meta.personal.include_icons

// = Summary
= #if include-icon [#fa-icon(icon) #h(5pt)] #if (
  language == "en"
) [Summary] else [Samenvatting]

#v(5pt)

#{ par(justify: true)[#data.Summary.Introduction.at(language)] }
