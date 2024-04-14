# Angulari registreerimisvormi rakendus
Tere! See on minu testtöö Junior Front End arendaja kohale. Kasutasin esimest korda Angulari ja rakendasin teadmisi, mida olen peale testtöö saamist omandanud. See Angulari rakendus pakub lihtsat registreerimisvormi koos nime, perekonnanime, e-posti ja töökogemuse valideerimisega.

# Failid

`src/app` kaustas on kaks peamist komponenti: `message` ja `app`. `Message` komponent on loodud info kuvamiseks, nagu vead, info ja õnnestumised. `App` komponent on peamiseks komponendiks, kus on kujunduse ja vormi põhiline osa, lisaks logode ja päisega väljad ja nende valideerimine.

## Faili avamiseks

Selle rakenduse paigaldamiseks ja kohalikul masinal käitamiseks järgige järgmisi samme:
1. Klooni repositoorium oma kohalikku masinasse:
git clone https://github.com/camaar2/wisercat_test.git
2. Navigeeri projekti kausta:
cd app
3. Paigalda sõltuvused:
npm install
4. Käivita arendusserver:
ng serve
5. Ava oma veebibrauser ja külasta `http://localhost:4200`, et vaadata rakendust.

## Kasutamine

Rakenduse käivitamisel saate kasutada registreerimisvormi, et sisestada oma andmed. Vorm sisaldab iga välja valideerimist, et tagada andmete terviklikkus.

-   **Eesnimi:** Peab olema vähemalt kaks tähemärki ja võib olla kuni 20 tähemärki, ei tohi sisaldada numbreid ega erimärke.
-   **Perekonnanimi:** Peab olema vähemalt 2 tähemärki ja võib olla kuni 40 tähemärki, samuti ei tohi sisaldada numbreid ega erimärke.
-   **Email:** Peab sisaldama märki '@' ja lõppema sobiliku lõpuga (nagu .com või .ee).
-   **Töökogemus:** Võib omada kuni ühte komakohta, ei tohi olla negatiivne ega ületada 600 (mis vastab umbes 50 töökogemuse aastale).

"Reset" nupp kustutab väljad ja annab kolmeks sekundiks lehe ülaosas märku, et väljad on kustutatud. Vajutades "Submit" nupule, salvestuvad andmed konsooli, kus on võimalik näha, mis on sisestatud.

