import { PropsWithChildren, useRef, useState, useEffect, useMemo } from "react"
import { isObject, noop, isEmpty } from "lodash-es"
import { diff } from "deep-object-diff"

interface Options {
  log: boolean
}

interface ChangedProp {
  prop: string
  prev: any
  next: any
  diff: object
}

enum LogType {
  INFO = "INFO",
  WARN = "WARN",
}

const logger = (message: any, type: LogType = LogType.INFO) => {
  switch (type) {
    case LogType.WARN:
      console.warn(message)
      return

    case LogType.INFO:
    default:
      console.info(message)
      return
  }
}

const createLogger = (shouldLog: boolean) => {
  if (!shouldLog) {
    return noop
  }

  return logger
}

export const usePropsComparison = <P extends { [key: string]: any }>(
  props: PropsWithChildren<P>,
  options: Options = { log: true },
) => {
  const prevPropsRef = useRef<P>()
  const propLogger = useMemo(() => createLogger(options.log), [options.log])
  const [changedProps, setChangedProps] = useState<Record<string, ChangedProp>>(
    {},
  )

  useEffect(() => {
    const prevProps = prevPropsRef.current
    if (prevProps === undefined) {
      propLogger("First render", LogType.WARN)

      Object.keys(props).forEach((prop) =>
        propLogger({ prop, initial: props[prop] }),
      )
    } else {
      const updatedChangedProps = Object.keys(props)
        .filter((key) => prevProps[key] !== props[key])
        .reduce(
          (result, key) => ({
            ...result,
            [key]: {
              prop: key,
              prev: prevProps[key],
              next: props[key],
              diff: diff(prevProps[key], props[key]),
            },
          }),
          {},
        )

      if (Object.keys(updatedChangedProps).length) {
        propLogger("Props changed")

        Object.values(updatedChangedProps).forEach(
          ({ prop, prev, next, diff }) => {
            if (isObject(prev) && isObject(next)) {
              propLogger(
                {
                  prop,
                  prev,
                  next,
                  diff,
                },
                isEmpty(diff) ? LogType.WARN : LogType.INFO,
              )
            } else {
              propLogger({
                prop,
                prev,
                next,
              })
            }
          },
        )
        setChangedProps(updatedChangedProps)
      } else {
        propLogger("No props changed", LogType.INFO)
      }
    }

    prevPropsRef.current = props
  }, [props])

  return changedProps
}

export default usePropsComparison
