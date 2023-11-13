import { unit, type CSSObject } from '@ant-design/cssinjs';

import type { GenerateStyle } from '../../theme/internal';
import type { TableToken } from './index';

const genFixedStyle: GenerateStyle<TableToken, CSSObject> = (token) => {
  const {
    componentCls,
    lineWidth,
    colorSplit,
    motionDurationSlow,
    zIndexTableFixed,
    tableBg,
    zIndexTableSticky,
    calc,
  } = token;

  const shadowColor = colorSplit;

  // Follow style is magic of shadow which should not follow token:
  return {
    [`${componentCls}-wrapper`]: {
      [`
        ${componentCls}-cell-fix-left,
        ${componentCls}-cell-fix-right
      `]: {
        position: 'sticky !important' as 'sticky',
        zIndex: zIndexTableFixed,
        background: tableBg,
      },

      [`
        ${componentCls}-cell-fix-left-first::after,
        ${componentCls}-cell-fix-left-last::after
      `]: {
        position: 'absolute',
        top: 0,
        right: {
          _skip_check_: true,
          value: 0,
        },
        bottom: calc(lineWidth).mul(-1).equal(),
        width: 30,
        transform: 'translateX(100%)',
        transition: `box-shadow ${motionDurationSlow}`,
        content: '""',
        pointerEvents: 'none',
      },

      [`${componentCls}-cell-fix-left-all::after`]: {
        display: 'none',
      },

      [`
        ${componentCls}-cell-fix-right-first::after,
        ${componentCls}-cell-fix-right-last::after
      `]: {
        position: 'absolute',
        top: 0,
        bottom: calc(lineWidth).mul(-1).equal(),
        left: {
          _skip_check_: true,
          value: 0,
        },
        width: 30,
        transform: 'translateX(-100%)',
        transition: `box-shadow ${motionDurationSlow}`,
        content: '""',
        pointerEvents: 'none',
      },

      [`${componentCls}-container`]: {
        '&::before, &::after': {
          position: 'absolute',
          top: 0,
          bottom: 0,
          zIndex: calc(zIndexTableSticky).add(1).equal(),
          width: 30,
          transition: `box-shadow ${motionDurationSlow}`,
          content: '""',
          pointerEvents: 'none',
        },

        '&::before': {
          insetInlineStart: 0,
        },

        '&::after': {
          insetInlineEnd: 0,
        },
      },

      [`${componentCls}-ping-left`]: {
        [`&:not(${componentCls}-has-fix-left) ${componentCls}-container`]: {
          position: 'relative',

          '&::before': {
            boxShadow: `inset ${unit(10)} 0 ${unit(8)} ${unit(
              calc(8).mul(-1).equal(),
            )} ${shadowColor}`,
          },
        },

        [`
          ${componentCls}-cell-fix-left-first::after,
          ${componentCls}-cell-fix-left-last::after
        `]: {
          boxShadow: `inset ${unit(10)} 0 ${unit(8)} ${unit(
            calc(8).mul(-1).equal(),
          )} ${shadowColor}`,
        },

        [`${componentCls}-cell-fix-left-last::before`]: {
          backgroundColor: 'transparent !important',
        },
      },

      [`${componentCls}-ping-right`]: {
        [`&:not(${componentCls}-has-fix-right) ${componentCls}-container`]: {
          position: 'relative',

          '&::after': {
            boxShadow: `inset ${unit(calc(10).mul(-1).equal())} 0 ${unit(8)} ${unit(
              calc(8).mul(-1).equal(),
            )} ${shadowColor}`,
          },
        },

        [`
          ${componentCls}-cell-fix-right-first::after,
          ${componentCls}-cell-fix-right-last::after
        `]: {
          boxShadow: `inset ${unit(calc(10).mul(-1).equal())} 0 ${unit(8)} ${unit(
            calc(8).mul(-1).equal(),
          )} ${shadowColor}`,
        },
      },
    },
  };
};

export default genFixedStyle;
