/**
 * Custom Haptic Feedback Utility using the Web Vibration API.
 * Ensures cross-browser safety by checking if `navigator.vibrate` is supported.
 */

export const Haptics = {
  /**
   * Light vibration for minor interactions (tab changes, general subtle clicks)
   */
  light: () => {
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      try {
        navigator.vibrate(12);
      } catch (e) {
        // Ignore errors from browser restrictions or permission issues
      }
    }
  },

  /**
   * Medium vibration for significant interactions (play/pause toggle, track select)
   */
  medium: () => {
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      try {
        navigator.vibrate(25);
      } catch (e) {
        // Ignore
      }
    }
  },

  /**
   * Heavy vibration for major actions (impact, long press, toggle heavy controls)
   */
  heavy: () => {
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      try {
        navigator.vibrate(50);
      } catch (e) {
        // Ignore
      }
    }
  },

  /**
   * Success feedback pattern (short - pause - short)
   */
  success: () => {
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      try {
        navigator.vibrate([15, 60, 20]);
      } catch (e) {
        // Ignore
      }
    }
  },

  /**
   * Warning or error pattern (longer pulses)
   */
  error: () => {
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      try {
        navigator.vibrate([60, 80, 60]);
      } catch (e) {
        // Ignore
      }
    }
  },

  /**
   * Playback state feedback (double pulse)
   */
  doublePulse: () => {
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      try {
        navigator.vibrate([10, 40, 10]);
      } catch (e) {
        // Ignore
      }
    }
  },
};
