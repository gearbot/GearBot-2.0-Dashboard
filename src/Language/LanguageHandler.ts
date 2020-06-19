/** @format */

import English from "./languages/en_US.json";
import BelgianDutch from "./languages/nl_BE.json";

export function getString(
  key: string,
  placeholderReplacements?: { [key: string]: any },
  lang?: string
) {
  let language: { [key: string]: string };
  if (lang) language = languageNameToLanguageObject(lang);
  else language = getLanguage();
  let str = language[key];
  if (!str) {
    if ((lang ?? getCurrentLanguage()) !== "en_US") {
      console.log(`${key} was not found on ${language}, trying English..`);
      str = getString(key, placeholderReplacements, "en_US");
    } else {
      console.log(
        `${key} was not found on English, and now everything is on fire.`
      );
      str = "LANG_ERR";
    }
  }
  if (placeholderReplacements)
    Object.keys(placeholderReplacements).forEach(
      (placeholder_key: string, index: number) => {
        str = str.replace(
          `{${placeholder_key}}`,
          placeholderReplacements[placeholder_key].toString()
        );
      }
    );
  return str;
}

export function getCurrentLanguage() {
  return window.localStorage.getItem("language") ?? "en_US";
}

function languageNameToLanguageObject(name: string): { [key: string]: string } {
  switch (name) {
    case "en_US":
      return English;
    case "nl_BE":
      return BelgianDutch;
    default:
      console.error(`Language ${name} not found, using English.`);
      return English;
  }
}

function getLanguage(): { [key: string]: string } {
  let language = getCurrentLanguage();
  return languageNameToLanguageObject(language);
}
