/**
 *
 * borders        |   border, border-top, border-right, border-bottom, border-left
 * borderStyles   |  	border-style, border-top-style, border-bottom-style, border-left-style, border-right-style
 * borderWidths   |  	border-width, border-top-width, border-bottom-width, border-left-width, border-right-width
 * colors	        |   color, background-color, border-color, border-top-color, border-bottom-color, border-left-color, border-right-color, outline-color, fill, stroke
 * fonts	        |   font-family
 * fontSizes	    |   font-size
 * fontWeights	  |   font-weight
 * letterSpacings | 	letter-spacing
 * lineHeights	  |   line-height
 * radii	        |   border-radius, border-top-right-radius, border-top-left-radius, border-bottom-right-radius, border-bottom-left-radius
 * shadows	      |   box-shadow, text-shadow
 * sizes	        |   width, min-width, max-width, height, min-height, max-height, flex-basis
 * zIndices	      |   z-index
 * space	        |   margin, margin-top, margin-right, margin-bottom, margin-left, padding, padding-top, padding-right, padding-bottom, padding-left, top, right, bottom, left, grid-gap, grid-column-gap, grid-row-gap, gap, column-gap, row-gap
 *
 */

const aliases = {
  bg: "backgroundColor",
  m: "margin",
  mt: "marginTop",
  mr: "marginRight",
  mb: "marginBottom",
  ml: "marginLeft",
  mx: "marginX",
  my: "marginY",
  p: "padding",
  pt: "paddingTop",
  pr: "paddingRight",
  pb: "paddingBottom",
  pl: "paddingLeft",
  px: "paddingX",
  py: "paddingY"
}

const multiples = {
  marginX: ["marginLeft", "marginRight"],
  marginY: ["marginTop", "marginBottom"],
  paddingX: ["paddingLeft", "paddingRight"],
  paddingY: ["paddingTop", "paddingBottom"],
  size: ["width", "height"]
}

const scales = {
  color: "colors",
  backgroundColor: "colors",
  borderColor: "colors",
  margin: "space",
  marginTop: "space",
  marginRight: "space",
  marginBottom: "space",
  marginLeft: "space",
  padding: "space",
  paddingTop: "space",
  paddingRight: "space",
  paddingBottom: "space",
  paddingLeft: "space",
  top: "space",
  right: "space",
  bottom: "space",
  left: "space",
  gridGap: "space",
  gridColumnGap: "space",
  gridRowGap: "space",
  gap: "space",
  columnGap: "space",
  rowGap: "space",
  fontFamily: "fonts",
  fontSize: "fontSizes",
  fontWeight: "fontWeights",
  lineHeight: "lineHeights",
  letterSpacing: "letterSpacings",
  border: "borders",
  borderTop: "borders",
  borderRight: "borders",
  borderBottom: "borders",
  borderLeft: "borders",
  borderWidth: "borderWidths",
  borderStyle: "borderStyles",
  borderRadius: "radii",
  borderTopRightRadius: "radii",
  borderTopLeftRadius: "radii",
  borderBottomRightRadius: "radii",
  borderBottomLeftRadius: "radii",
  borderTopWidth: "borderWidths",
  borderTopColor: "colors",
  borderTopStyle: "borderStyles",
  borderBottomWidth: "borderWidths",
  borderBottomColor: "colors",
  borderBottomStyle: "borderStyles",
  borderLeftWidth: "borderWidths",
  borderLeftColor: "colors",
  borderLeftStyle: "borderStyles",
  borderRightWidth: "borderWidths",
  borderRightColor: "colors",
  borderRightStyle: "borderStyles",
  outlineColor: "colors",
  boxShadow: "shadows",
  textShadow: "shadows",
  zIndex: "zIndices",
  width: "sizes",
  minWidth: "sizes",
  maxWidth: "sizes",
  height: "sizes",
  minHeight: "sizes",
  maxHeight: "sizes",
  flexBasis: "sizes",
  // svg
  fill: "colors",
  stroke: "colors"
}

// get the css value from theme if it exists
const get = (themeKey, val, theme) => {
  const themeScale = theme[themeKey]

  // There is no theme scale for this themeKey defined in the theme
  // although it still is a valid theme scale, just return the val
  if (!themeScale) {
    return val
  }

  if (Array.isArray(val)) {
    return val.map(v => theme[themeKey][v])
  } else {
    return theme[themeKey][val]
  }
}

// recursively replaces styles or nested styles with theme scale values
export const injectThemeStyles = (styles, theme) => {
  // Only inject in objects, if they pass an array or string such as VariantLabel(s) then ignore
  if (typeof styles === "object" && styles !== null) {
    let result = {}

    for (const key in styles) {
      const val = styles[key]

      // check if it's a TargetResolver function
      if (typeof val === "function") {
        result[key] = (...args) => injectThemeStyles(val(...args), theme)
      } else if (typeof val === "object" && val !== null) {
        // in case it's a nested Target (variants)
        result[key] = injectThemeStyles(val, theme)
      } else if (scales[key]) {
        result[key] = get(scales[key], val, theme)
      } else if (aliases[key]) {
        if (multiples[aliases[key]]) {
          multiples[aliases[key]].forEach(k => {
            result[k] = get(k, val, theme)
          })
        } else {
          result[aliases[key]] = get(scales[aliases[key]], val, theme)
        }
      } else if (multiples[key]) {
        multiples[key].forEach(k => {
          result[k] = get(k, val, theme)
        })
      } else {
        result[key] = val
      }
    }

    return result
  }
  return styles
}
