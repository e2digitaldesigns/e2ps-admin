export const regExp = new RegExp("^[-a-zA-Z0-9 ' .]{3,40}$");
export const regExpErrorMsg = `{#label} should only contain letters, numbers and apostrophes`;

export const regExpPhone = new RegExp("^[-0-9 ()]{10,20}$");
export const regExpPhoneErrorMessage = `{#label} format: (555) 555-1212 or 555 555-1212`;

export const regExpZipCode = new RegExp("^[-0-9]{3,20}$");
export const regExpZipCodeErrorMessage = `{#label} should only contain numbers and hypens`;
