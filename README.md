# use-changed-props

A React hook to log which props have changed. The hook will also include the changes for each prop, which is useful for tracking down unnecessary work when nothing really changed eg. a reference was updated.

## Demo

https://codepen.io/mozmorris/pen/BaopXRX?editors=1111

## Installation

```
npm install use-changed-props
```

or

```
yarn add use-changed-props
```

## Usage

### Log changed props to console

```jsx
import useChangedProps from "use-changed-props"

const App = props => {

  // log props changes
  useChangedProps(props)

  return </div>
}
```

### Disable logging

```jsx
import useChangedProps from "use-changed-props"

const App = props => {

  // disable logging
  const options = { log: false }

  // store changed props
  const changedProps = useChangedProps(props, options)

  return </div>
}
```


## Options

| Option                | Description                                                               |  Default     |
| --------------------- | --------------------------------------------------------------------------|------------- |
| `log`                 | Should automatically log prop changes to the console                      | `true`       |

## License

MIT

## Motivation

"How to check what props have changed?"

"Determine which props caused a re-render"

I've found myself Googling these questions on more than one occasion. Ideally I can now just drop this hook in to my component and get feedback about which props have changed and also the differences.
