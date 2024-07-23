/*
The outer Record<string, ...> means that the object can have keys 
of type string.
The value corresponding to each of these keys is another object,
 as indicated by Record<string, string>.
This inner Record<string, string> means that this inner object 
can have its own string keys, each of which maps to a string value.
*/
export type LabelTypes = Record<string, Record<string, string>>

export enum LanguageEnum {
  en = 'en',
  ne = 'ne',
}
export type language = keyof typeof LanguageEnum