# Aplikace Angular notes

## Implementace

- Aplikace v Angular 9 vytvořena pomocí Angular CLI.
- Databáze [Firebase](https://console.firebase.google.com/).
- Autorizace taktéž Firebase (viz též [Angular 9/8 Authentication with Firebase (Google, Email & Password): Login, Register, Email Verification and Password Recovery](https://www.techiediaries.com/angular-firebase/angular-9-firebase-authentication-email-google-and-password/)), vytvořeno ve firebase console a přílušné angular knihovny přidány pomocí npm.
- CSS framework [bootstrap](https://getbootstrap.com), instalace npm.
- Knihovna [ng-bootstrap](https://ng-bootstrap.github.io/#/home), instalace npm.
- Lokalizace [transloco](https://netbasal.gitbook.io/transloco/) (viz též 
  [Introducing Transloco: Angular Internationalization Done Righ](https://netbasal.com/introducing-transloco-angular-internationalization-done-right-54710337630c)), npm, lokalizované texty v json souborech assets/i18n.

## Popis a chování aplikace

- Nepřihlášený uživatel může aplikaci používat, avšak nemůže nic měnit (zadávat, editovat, mazat poznámky).
- Autorizace - Přihlásit/Sign in - okrové tlačítko Doplnit/Fill in umožňuje doplnit přihlašovací údaje. Při zadání špatných údajů chybová hláška (vždy anglicky - posílá ji firebase)
- Vlaječka - změna jazyka  

### Seznam 

- Stránkování, možnost řazení kliknutím na příslušný nadpis (implementace podle [Complete example](https://ng-bootstrap.github.io/#/components/table/examples#complete)).
- **Detail poznámky** - klik na hyperlink v 1. sloupci; **Text** oříznut - celý v popupu, **Akce** - smazaní  poznámky.
- Karty - zobrazení podobné Google Keep.

### Detail poznámky

- Nová poznámka - horní menu.
- Nadpis/Title povinný, hlídáno opuštění stránky.
- Priorita 3 Thumbs up - 3 Thumbs down - volba šipkami.
- Nelze uložit pokud není zadání validní.
- Při přechodu na jinou stránku bez uložení editované poznámky - Deactivate guard - možnost dodatečného uložení.

### Nedodělky/možná vylepšení

- Nestihnul jsem napsat testy - pokusím se ještě doplnit.
- Detail - priorita - vytvořit jako samostatnou komponentu
- při prvním zobrazená seznamu se nezobrazuje směr řazení (šipka).
- karty např řazení, přesouvání, barvy...
- zapamatovat si stav tabulky (řazení, stránkování, event. filtry).
- zlepšit logování (aktuálně jenom console.log), error handling (error interceptor)
