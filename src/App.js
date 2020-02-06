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

function App() {
  return (
    <Flex
      sx={{
        justifyContent: "space-between",
        width: "100%"
      }}
    >
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

export default App
