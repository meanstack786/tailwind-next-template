import React from 'react'

import Select, { components, Props } from 'react-select'
import styles from 'styles/react-select.module.css'
export const SelectContainer: typeof components.SelectContainer = ({
  isFocused,
  className,
  ...other
}) => {
  return (
    <components.SelectContainer
      {...other}
      isFocused={isFocused}
      className={
        isFocused
          ? ` ${styles['dmc-form-select-child-focus']}  !text-inherit `
          : className
      }
    />
  )
}

export const Option: typeof components.Option = (props) => {
  return (
    <components.Option
      {...props}
      className={`${
        !!props.className ? props.className : ''
      }   !active:bg-base-300  !hover:bg-base-200   !text-base-content ${
        props.isFocused ? '!bg-base-200 ' : '!bg-base-100'
      }`}
    />
  )
}

export const Menu: typeof components.Menu = (props) => {
  return (
    <components.Menu
      {...props}
      className={`${
        !!props.className ? props.className : ''
      } !z-[1000] !bg-inherit`}
    />
  )
}

export const DropdownIndicator: typeof components.DropdownIndicator = (
  props
) => {
  return (
    <components.DropdownIndicator
      {...props}
      className={`${props.className ?? ''} !text-base-300 `}
    />
  )
}

export const IndicatorSeparator: typeof components.IndicatorSeparator = (
  props
) => {
  return (
    <components.IndicatorSeparator
      {...props}
      className={`${props.className ?? ''} !text-base-300`}
    />
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RSelect = React.forwardRef<any, Props<{ label: string; value: any }>>(
  (props, ref) => {
    return (
      <Select
        ref={ref}
        components={{
          SelectContainer,
          Option,
          Menu,
          DropdownIndicator,
          IndicatorSeparator,
        }}
        styles={{ singleValue: (base) => ({ ...base, color: undefined }) }}
        {...props}
      />
    )
  }
)

RSelect.displayName = 'RSelect'

export default RSelect
