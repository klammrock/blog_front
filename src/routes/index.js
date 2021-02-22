export const BASE = '/'

// Home
export const HOME = `${BASE}home`

export const HOME_ACCOUNTING_SLUG = 'accounting'
export const HOME_ACCOUNTING = `${HOME}/${HOME_ACCOUNTING_SLUG}`

export const HOME_EVENTS_SLUG = 'events'
export const HOME_EVENTS = `${HOME}/${HOME_EVENTS_SLUG}`

export const HOME_VEHICLES_SLUG = 'vehicles'
export const HOME_VEHICLES = `${HOME}/${HOME_VEHICLES_SLUG}`

export const HOME_COMPANIES_SLUG = 'companies'
export const HOME_COMPANIES = `${HOME}/${HOME_COMPANIES_SLUG}`

export const HOME_ARR = [
  HOME,
  HOME_ACCOUNTING,
  HOME_EVENTS,
  HOME_VEHICLES,
  HOME_COMPANIES,
]

// Auth
export const AUTH = `${BASE}auth`
export const AUTH_LOGIN = `${AUTH}/login`
export const AUTH_LOGOUT = `${AUTH}/logout`
