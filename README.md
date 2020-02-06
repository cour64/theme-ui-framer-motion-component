# theme-ui-framer-motion-component

This is a component that integrates framer-motion and theme-ui to allow the use of theme styles from theme-ui in framer-motion

## TODO
- Integrate AnimationControls

## Example usage

```javascript
import React from "react"
import { Flex } from "@theme-ui/components"
import { Motion } from "./Motion"

const variants = {
  start: {
    scale: 1,
    rotate: 0,
    bg: "primary",
    mt: 0
  },
  end: i => ({
    scale: 2,
    rotate: 270,
    bg: "secondary",
    mt: i
  })
}

function MyComponent() {
  return (
    <Flex>
      {[0, 3, 6].map(i => (
        <Motion
          key={i}
          sx={{ width: 200, height: 200 }}
          custom={i}
          initial="start"
          animate="end"
          variants={variants}
        />
      ))}
    </Flex>
  )
}
```
