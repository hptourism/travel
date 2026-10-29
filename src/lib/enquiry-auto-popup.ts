export const ENQUIRY_AUTO_POPUP_SESSION_KEY = "enquiry-auto-popup-shown";

/** In-memory flag for the current page load: hero form engagement cancels auto popup. */
let suppressed = false;

export function suppressEnquiryAutoPopup() {
  suppressed = true;
  try {
    sessionStorage.setItem(ENQUIRY_AUTO_POPUP_SESSION_KEY, "1");
  } catch {
    // sessionStorage may be blocked
  }
}

export function isEnquiryAutoPopupSuppressed() {
  return suppressed;
}

export function markEnquiryAutoPopupShown() {
  try {
    sessionStorage.setItem(ENQUIRY_AUTO_POPUP_SESSION_KEY, "1");
  } catch {
    // ignore
  }
}

export function wasEnquiryAutoPopupShown() {
  try {
    return sessionStorage.getItem(ENQUIRY_AUTO_POPUP_SESSION_KEY) === "1";
  } catch {
    return false;
  }
}
