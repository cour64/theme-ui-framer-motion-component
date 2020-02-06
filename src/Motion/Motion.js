/** @jsx jsx */
import { jsx, useThemeUI } from "theme-ui"
import { motion } from "framer-motion"
import { injectThemeStyles } from "./injectThemeStyles"
import { useMemo } from "react"

/**
 * style: MotionStyle
 * initial: boolean | Target | VariantLabels
 * animate: AnimationControls | TargetAndTransition | VariantLabels
 * exit: TargetAndTransition | VariantLabels | TargetResolver
 * variants: Variants
 * whileHover: string | TargetAndTransition
 * whileTap: string | TargetAndTransition
 * dragConstraints: false | { top?: number; right?: number; bottom?: number; left?: number; } | RefObject<Element>
 */

const getPropsWithThemeStylesInjected = (
  theme,
  {
    initial,
    animate,
    exit,
    variants,
    whileTap,
    whileHover,
    dragConstraints,
    ...rest
  }
) => {
  return {
    ...rest,
    initial: injectThemeStyles(initial, theme),
    animate: injectThemeStyles(animate, theme),
    exit: injectThemeStyles(exit, theme),
    variants: injectThemeStyles(variants, theme),
    whileHover: injectThemeStyles(whileHover, theme),
    whileTap: injectThemeStyles(whileTap, theme),
    dragConstraints: injectThemeStyles(dragConstraints, theme)
  }
}

export const Motion = ({ as = "div", ...props }) => {
  const Component = motion[as]
  const { theme } = useThemeUI()
  const propsWithThemeStylesInjected = useMemo(
    () => getPropsWithThemeStylesInjected(theme, props),
    [props, theme]
  )

  return <Component {...propsWithThemeStylesInjected} />
}
