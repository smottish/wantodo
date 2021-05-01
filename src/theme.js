import theme from '@rebass/preset';

export default {
  ...theme,
  fonts: {
    ...theme.fonts,
    default: 'system-ui, sans-serif',
  },
  colors: {
    ...theme.colors,
    muted: '#f8f8fc',
    lightGray: '#e8e8e8',
    darkGray: 'rgb(54, 55, 64)',
    primary: 'rgb(54, 55, 64)',
  },
  variants: {
    ...theme.variants,
    navBlock: {
      ...theme.variants.nav,
      display: "block",
      ':hover': {

      }
    }
  },
  buttons: {
    ...theme.buttons,
    primary: {
      ...theme.buttons.primary,
      ':hover': {
        cursor: 'pointer',
      }
    },
    transparent: {
      variant: 'buttons.primary',
      borderRadius: 0,
      bg: 'transparent',
      color: 'black',
      cursor: 'pointer',
    },
    transparentNoOutline: {
      variant: 'buttons.transparent',
      ':focus': {
        outline: 'none',
      },
      WebkitTapHighlightColor: 'transparent',
    },
  },
}
