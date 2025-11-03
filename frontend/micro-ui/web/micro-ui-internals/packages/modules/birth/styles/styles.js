/**
 * Centralized Style Configuration for Death Certificate Components
 * 
 * This file contains all the style objects used across the Death Certificate components.
 * You can import and customize these styles as needed.
 * 
 * Usage:
 * import { formStyles, modalStyles, attachmentStyles } from './styles';
 */

// Color Palette
export const colors = {
  primary: '#6B133F',
  primaryLight: 'rgba(107, 19, 63, 0.1)',
  primaryDark: '#4a0d2c',
  white: '#fff',
  black: '#000',
  gray100: '#f8f9fa',
  gray200: '#e9ecef',
  gray300: '#dee2e6',
  gray400: '#ced4da',
  gray500: '#adb5bd',
  gray600: '#6c757d',
  gray700: '#495057',
  gray800: '#343a40',
  gray900: '#212529',
  success: '#28a745',
  danger: '#dc3545',
  dangerLight: 'rgba(220, 53, 69, 0.1)',
  warning: '#ffc107',
  info: '#17a2b8',
  text: '#333',
  textLight: '#666',
  textMuted: '#888',
  border: '#aaa',
  red: 'red',
};

// Font Configuration
export const fonts = {
  primary: 'Poppins, sans-serif',
  fallback: 'Arial, sans-serif',
};

// Font Sizes
export const fontSizes = {
  xs: '10px',
  sm: '12px',
  base: '14px',
  md: '16px',
  lg: '18px',
  xl: '20px',
  xxl: '24px',
  xxxl: '32px',
};

// Font Weights
export const fontWeights = {
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
};

// Spacing
export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  base: '16px',
  lg: '20px',
  xl: '24px',
  xxl: '32px',
  xxxl: '40px',
};

// Border Radius
export const borderRadius = {
  sm: '4px',
  base: '8px',
  md: '12px',
  lg: '16px',
  full: '50%',
};

// Shadows
export const shadows = {
  sm: '0 1px 2px rgba(0,0,0,0.05)',
  base: '0 2px 4px rgba(0,0,0,0.1)',
  md: '0 4px 8px rgba(0,0,0,0.15)',
  lg: '0 8px 16px rgba(0,0,0,0.2)',
  xl: '0 12px 24px rgba(0,0,0,0.25)',
};

// Main Form Styles
export const formStyles = {
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.base,
    padding: spacing.xl,
    marginBottom: spacing.lg,
    boxShadow: shadows.base,
  },
  sectionHeader: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.bold,
    color: colors.primary,
    marginBottom: spacing.lg,
    fontFamily: fonts.primary,
  },
  formSection: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: spacing.lg,
    marginBottom: spacing.lg,
  },
  flex30: {
    flex: '1 1 30%',
    minWidth: '250px',
  },
  poppinsLabel: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.medium,
    color: colors.text,
    marginBottom: spacing.sm,
    fontFamily: fonts.primary,
  },
  mandatory: {
    color: colors.red,
    marginLeft: spacing.xs,
  },
  widthInput: {
    width: '100%',
    minWidth: '250px',
  },
  errorText: {
    color: colors.danger,
    fontSize: fontSizes.sm,
    marginTop: spacing.xs,
    fontFamily: fonts.primary,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: spacing.base,
    marginTop: spacing.xl,
    marginBottom: spacing.xl,
  },
  previewButton: {
    backgroundColor: colors.primary,
    color: colors.white,
    border: 'none',
    padding: `${spacing.md} ${spacing.xxxl}`,
    borderRadius: borderRadius.sm,
    fontSize: fontSizes.md,
    fontWeight: fontWeights.medium,
    cursor: 'pointer',
    fontFamily: fonts.primary,
    transition: 'background-color 0.3s',
  },
  errorContainer: {
    marginTop: spacing.base,
    padding: `${spacing.base} ${spacing.lg}`,
    borderLeft: `4px solid ${colors.danger}`,
    borderRadius: borderRadius.base,
    background: colors.dangerLight,
    color: '#611a15',
    fontSize: fontSizes.base,
    fontFamily: fonts.primary,
    boxShadow: shadows.md,
  },
  errorHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: spacing.sm,
    fontWeight: fontWeights.semibold,
  },
  errorIcon: {
    fontSize: fontSizes.lg,
    marginRight: spacing.sm,
  },
  errorList: {
    margin: 0,
    paddingLeft: spacing.lg,
  },
  errorItem: {
    marginBottom: spacing.xs,
  },
};

// Attachment Section Styles
export const attachmentStyles = {
  wrapper: {
    background: colors.white,
    borderRadius: borderRadius.base,
  },
  header: {
    fontWeight: fontWeights.bold,
    fontSize: fontSizes.lg,
    marginBottom: spacing.xs,
    color: colors.primary,
    fontFamily: fonts.primary,
  },
  subHeader: {
    fontSize: fontSizes.sm,
    color: colors.textLight,
    marginBottom: spacing.lg,
    fontFamily: fonts.primary,
  },
  gridContainer: {
    display: 'grid',
    gap: spacing.lg,
  },
  fileBox: {
    border: `2px dashed ${colors.border}`,
    borderRadius: borderRadius.base,
    padding: spacing.base,
    display: 'flex',
    alignItems: 'center',
    gap: spacing.md,
    position: 'relative',
    minHeight: '90px',
    backgroundColor: colors.white,
  },
  iconBox: {
    flexShrink: 0,
  },
  labelArea: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
  },
  fileLabel: {
    fontWeight: fontWeights.semibold,
    fontSize: fontSizes.base,
    marginBottom: spacing.xs,
    color: colors.text,
    fontFamily: fonts.primary,
  },
  descText: {
    fontSize: fontSizes.sm,
    color: colors.textMuted,
    fontFamily: fonts.primary,
  },
  buttonArea: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flexWrap: 'wrap',
  },
  selectBtn: {
    backgroundColor: colors.white,
    color: colors.primary,
    border: `1px solid ${colors.primary}`,
    padding: `${spacing.sm} ${spacing.base}`,
    borderRadius: borderRadius.sm,
    cursor: 'pointer',
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    textAlign: 'center',
    fontFamily: fonts.primary,
    transition: 'all 0.3s ease',
    display: 'inline-block',
    whiteSpace: 'nowrap',
    maxWidth: '150px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
};

// Modal Styles
export const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.xxxl,
    maxWidth: '500px',
    width: '90%',
    textAlign: 'center',
    boxShadow: shadows.xl,
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: fontSizes.xxl,
    fontWeight: fontWeights.bold,
    color: colors.primary,
    marginBottom: spacing.lg,
    fontFamily: fonts.primary,
  },
  infoContainer: {
    backgroundColor: colors.gray100,
    borderRadius: borderRadius.base,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  infoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
    fontFamily: fonts.primary,
  },
  label: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.medium,
    color: colors.textLight,
  },
  value: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semibold,
    color: colors.text,
  },
  message: {
    fontSize: fontSizes.base,
    color: colors.textLight,
    lineHeight: '1.6',
    marginBottom: spacing.xl,
    fontFamily: fonts.primary,
  },
  button: {
    backgroundColor: colors.primary,
    color: colors.white,
    border: 'none',
    padding: `${spacing.md} ${spacing.xxl}`,
    borderRadius: borderRadius.sm,
    fontSize: fontSizes.md,
    fontWeight: fontWeights.medium,
    cursor: 'pointer',
    fontFamily: fonts.primary,
    transition: 'background-color 0.3s',
  },
};

// Responsive Breakpoints
export const breakpoints = {
  mobile: '768px',
  tablet: '1024px',
  desktop: '1280px',
};

// Media Queries Helper
export const mediaQueries = {
  mobile: `@media (max-width: ${breakpoints.mobile})`,
  tablet: `@media (max-width: ${breakpoints.tablet})`,
  desktop: `@media (min-width: ${breakpoints.desktop})`,
};

// Export all styles as a single object
export const styles = {
  ...formStyles,
  attachment: attachmentStyles,
  modal: modalStyles,
};

export default styles;