/*
The outer Record<string, ...> means that the object can have keys 
of type string.
The value corresponding to each of these keys is another object,
 as indicated by Record<string, string>.
This inner Record<string, string> means that this inner object 
can have its own string keys, each of which maps to a string value.
*/
export type LabelTypes = Record<string, Record<string, string>>
//This defines an enumeration named LanguageEnum with two possible values:
export enum LanguageEnum {
  en = 'en',
  ne = 'ne',
}
//keyof is a TypeScript keyword that creates a union of the keys of an object type.
/**
 * keyof typeof LanguageEnum creates a union of the keys of the 
 * LanguageEnum type:
'   en' | 'ne'
 */
export type language = keyof typeof LanguageEnum

export type LanguageType = {
//The type of lang is LanguageEnum, which means it can only be 
//one of the values defined in the LanguageEnum enum.
    lang:LanguageEnum
/**
setLang is a function property of the LanguageType.
This function takes one parameter lang of type LanguageEnum.
The function returns void, which means it doesn't return any value. 
*/
    setLang:(lang:LanguageEnum)=>void
}
export type multiLanguage = Record<string,string>
