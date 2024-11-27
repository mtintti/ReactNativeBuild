# Expo App -sovelluksen julkaisu Google Playhin Codemagicilla

### 

# Sisällys

[Expo App -sovelluksen julkaisu Google Playhin Codemagicilla
[1](#expo-app--sovelluksen-julkaisu-google-playhin-codemagicilla)](#expo-app--sovelluksen-julkaisu-google-playhin-codemagicilla)

[Valmistele React Native -sovelluksesi
[1](#valmistele-react-native--sovelluksesi)](#valmistele-react-native--sovelluksesi)

[Luo Codemagic-tili [3](#luo-codemagic-tili)](#luo-codemagic-tili)

[Codemagic.yaml [4](#codemagic.yaml)](#codemagic.yaml)

[Muokkaa build.gradle- tiedostoa
[11](#muokkaa-build.gradle--tiedostoa)](#muokkaa-build.gradle--tiedostoa)

[Luo Google Play -julkaisutili, uusi projekti ja luo projektiin uusi
julkaisu
[12](#luo-google-play--julkaisutili-uusi-projekti-ja-luo-projektiin-uusi-julkaisu)](#luo-google-play--julkaisutili-uusi-projekti-ja-luo-projektiin-uusi-julkaisu)

[Luo Service Account automaattista Uploadaamista varten
[19](#luo-service-account-automaattista-uploadaamista-varten)](#luo-service-account-automaattista-uploadaamista-varten)

[Lisätään Service Accountin avain Codemagicin ympäristömuuttujiin
[23](#lisätään-service-accountin-avain-codemagicin-ympäristömuuttujiin)](#lisätään-service-accountin-avain-codemagicin-ympäristömuuttujiin)

## Valmistele React Native -sovelluksesi

Valitse haluamasi repository jonka haluat buildata

Esimerkin julkista repositoriota voi käyttää testauksessa:

https://github.com/jonezki01/ReactNativeBuild.git

Voidaksemme yhdistää repo CodeMagiciin sen tulee olla omalla github
tililläsi.

Kloona repo githubissa omalle tilillesi samalla nimellä:

<img src="./attachments/images/media/image1.png"
style="width:2.73662in;height:2.07899in"
alt="A screenshot of a computer Description automatically generated" />

<img src="./attachments/images/media/image2.png"
style="width:3.39148in;height:2.79329in"
alt="A screenshot of a computer Description automatically generated" />

git clone https://github.com/OMATUNNUSTÄHÄN/ReactNativeBuild.git

cd ReactNativeBuild

npm install

Sovelluksen buildaaminen ja toiminta kannattaa testata ensin esimerkiksi
eas:lla.

(tähän linkki jonezkin testirepoon)

Aja prebuild saadaksesi build.gradle tiedosto jota täytyy muokata
myöhemmin codemagicia varten.

npx expo prebuild:  
<img src="./attachments/images/media/image3.png"
style="width:6.26806in;height:2.74514in"
alt="A screenshot of a computer program Description automatically generated" />

Yllä oleva komento luo android/ kansion. Ota sieltä talteen tiedosto
android/app/build.gradle tiedosto siirtämällä se kansioon support-files/

mkdir support-files

mv ./android/app/build.gradle ./support-files/

voit tuhota android/ kansion:

rm -rf ./android

Voit tarkistaa tiedoston tallentumisen support-files kansioon
komennolla:

ls support-files/

<img src="./attachments/images/media/image4.png"
style="width:3.73028in;height:1.45268in"
alt="A screen shot of a computer Description automatically generated" />

## Luo Codemagic-tili

Mene [Codemagicin](https://codemagic.io) sivustolle ja luo tili.

Lisää aplikaatio -&gt; yhdistä GitHub-tili

<img src="./attachments/images/media/image5.png"
style="width:3.71447in;height:2.17699in" />

<img src="./attachments/images/media/image6.png"
style="width:3.75368in;height:2.2216in"
alt="A screenshot of a application Description automatically generated" />

Jos repoja ei näy paina Check your GitHub integration settings ja
valitse joko vain yksi repo tai vaikka kaikki:

<img src="./attachments/images/media/image7.png"
style="width:2.81496in;height:3.39691in"
alt="A screenshot of a computer Description automatically generated" />

Paina päivitä-nappia niin repon tulisi näkyä:  
<img src="./attachments/images/media/image8.png"
style="width:2.49906in;height:0.50336in"
alt="A screenshot of a web page Description automatically generated" />

valitse projektityypiksi React Native ja Finish: Add application.

<img src="./attachments/images/media/image9.png"
style="width:2.25007in;height:1.14534in"
alt="A blue box with white text and a hand cursor Description automatically generated" />

## Codemagic.yaml

Esimerkkirepossa on codemagic.yaml-tiedosto joka määrittelee buildin
etäkoneella.

Codemagic antaa tiedostosta virheilmoituksia koska ympäristömuuttujia ei
ole määritelty palvelimelle.

<img src="./attachments/images/media/image10.png"
style="width:2.50311in;height:1.93765in"
alt="A screenshot of a computer Description automatically generated" />

Esimerkkirepositio sisältää codemagic.yaml-tiedoston juurikansiossa:

workflows:

\# Tiedostossa voi olla useita workflow osioita

\# esim. androidille develepor buildi ja production buildi ominaan ja
ios omanaan.

\# Tässä olemme toteuttaneet vain yhden workflown androidille.

  react-native-android:

    name: React Native Android \#workflown nimi Codemagicissä

    max\_build\_duration: 30 \# buildin maksimi kesto minuutteina ennen
kuin se keskeytetään

    instance\_type: mac\_mini\_m2 \# buildin suoritusympäristö
(mac\_mini\_m1, mac\_mini\_m2, linux yms.)

    environment: \# tässä voidaan määritellä suoritusympäristön
ympäristömuuttujia ja työkalujen versioita

      java: 17

      groups:

        - permissions \#keystore ja gcloud service account key

        - email \# build ilmoitusten sähköpostit

        - env\_vars \# ympäristömuuttujat

      vars:

        \# Tähänkin voi määritellä ympäristömuuttujia

        \# esim package name on sama kuin app.json ja
support-files/build.gradle tiedostossa

        PACKAGE\_NAME: "com.AndroidOhjelmointi.OstoslistaSovellus"

    \# Tässä voidaan määritellä workflow käynnistymään automaattisesti

    \# esim. push, tag, pull\_request githubissa voi käynnistää uuden
buildin

   # triggering:

   #   events:

   #     - push

   #     - tag

   #     - pull\_request

   #   branch\_patterns:

   #     - pattern: main

   #       include: true

   #       source: true

    scripts:

        \# Tässä määritellään buildin vaiheet scripteillä

      - name: Expo public environment variables

        \# Jos buildissa tarvitaan .env tiedostoa, se voidaan luoda
tässä

        \# WEATHER\_API\_KEY:tä voi reactissa käyttää myös:
process.env.WEATHER\_API\_KEY ilman .env tiedostoa

        \# koska Codemagicin ympäristömuuttujat ovat käytettävissä myös
reactissa

        \#script: |

        \#echo "WEATHER\_API\_KEY=$WEATHER\_API\_KEY" &gt;&gt;
$CM\_BUILD\_DIR/.env

      - name: Install npm dependencies

        \# npm install asentaa projektin riippuvuudet package.json
tiedostosta suoritusympäristöön

        script: |

          npm install

      - name: Run Expo Prebuild

        \# Expo prebuild luo tarvittavat tiedostot android buildia
varten

        script: |

          npx expo prebuild

      - name: Set Android SDK location

        \# Android SDK location määritellään local.properties tiedostoon

        script: |

          echo "sdk.dir=$ANDROID\_SDK\_ROOT" &gt;
"$CM\_BUILD\_DIR/android/local.properties"

      - name: Set up app/build.gradle

        \# Siirretään Codemagicia varten tehty build.gradle tiedosto
android/app kansioon

        script: |

          mv ./support-files/build.gradle android/app

      - name: Set up keystore

        \# Keystore tiedosto on syötetty Codemagicin ympäristömuuttujaan
$KEYSTORE base64 koodattuna

        \# Tässä dekoodataan se ja tallennetaan /tmp kansioon

        script: |

          echo $KEYSTORE | base64 --decode &gt; /tmp/keystore.keystore

          \# Alla oleva komento luo key.properties tiedoston android
kansioon

          \# ja määrittelee keystore tiedoston sijainnin, aliaksen ja
salasanat

          cat &gt;&gt; "$FCI\_BUILD\_DIR/android/key.properties"
&lt;&lt;EOF

          storePassword=$KEYSTORE\_PASSWORD

          keyPassword=$KEY\_PASSWORD

          keyAlias=$KEY\_ALIAS\_USERNAME

          storeFile=/tmp/keystore.keystore

          EOF

      - name: Debuggailua

        \# Tässä olen lisännyt debuggailua varten komentoja

        script: |    

          echo "Display env file"

          cat $CM\_BUILD\_DIR/.env

          echo "Displaying key.properties contents:"

          cat "$FCI\_BUILD\_DIR/android/key.properties" || echo "Error:
Unable to display key.properties"

          echo "Listing contents of /tmp directory:"

          ls -la /tmp || echo "Error: Unable to list /tmp directory"

          echo "Displaying keystore details:"

          ls -la /tmp/keystore.keystore || echo "Error: keystore file
not found"

          echo "displaying FCI\_BUILD\_DIR"

          echo $FCI\_BUILD\_DIR

          echo "displaying CM\_BUILD\_DIR"

          echo $CM\_BUILD\_DIR

      - name: Build Android release

        \# Varsinainen android build komento

        \# versionCode ja versionName määritellään tässä

        \# Aluksi tarkistetaan google playsta viimeisin buildin numero
ja lisätään siihen yksi

        \# Jos google playsta ei löydy buildin numeroa, käytetään
defaulttina BUILD\_NUMBER ympäristömuuttujaa

        script: |

          LATEST\_GOOGLE\_PLAY\_BUILD\_NUMBER=$(google-play
get-latest-build-number --package-name "$PACKAGE\_NAME")

          if \[ -z $LATEST\_GOOGLE\_PLAY\_BUILD\_NUMBER \]; then

              \# fallback in case no build number was found from google
play. Alternatively, you can \`exit 1\` to fail the build

              UPDATED\_BUILD\_NUMBER=$BUILD\_NUMBER

              echo "no build number found from google play"

              \#exit 1

          else

             
UPDATED\_BUILD\_NUMBER=$(($LATEST\_GOOGLE\_PLAY\_BUILD\_NUMBER + 1))

          fi

          cd android

          ./gradlew bundleRelease \\

            -PversionCode=$UPDATED\_BUILD\_NUMBER \\

            -PversionName=1.0.$UPDATED\_BUILD\_NUMBER

    artifacts:

      \# Tässä määritellään buildin jälkeiset tiedostot, jotka halutaan
tallentaa

      \# esim. .aab tiedosto julkaistavaksi google playhin

      - android/app/build/outputs/\*\*/\*.aab

    publishing:

      \# Tässä määritellään mihin buildin jälkeiset tiedostot
julkaistaan

      email:

        \# Tässä määritellään kenelle buildin onnistumis- ja
epäonnistumisilmoitukset lähetetään

        recipients:

          - $EMAIL1

        notify:

          success: true

          failure: true

\# App täytyy julkaista google playhin manuaalisesti ensimmäisen kerran
ennen kuin se voidaan julkaista automaattisesti          

\#      google\_play:

\#        credentials: $GCLOUD\_SERVICE\_ACCOUNT\_CREDENTIALS

\#        track: internal

\#        submit\_as\_draft: true

Lisätään ympäristömuuttujia codemagicin sivuilla:  
  
<img src="./attachments/images/media/image11.png"
style="width:2.26328in;height:1.8849in"
alt="A screenshot of a computer Description automatically generated" />

Ympäristömuuttujille annetaan nimi, arvo ja ryhmä.  
Securessa kun on ruksi niin arvo piiloutuu tässä ja sen lisäksi vaikka
sen build ympäristössä echottaisi esille, tulos olisi vain rivi tähtiä.

<img src="./attachments/images/media/image12.png"
style="width:3.62575in;height:0.60336in"
alt="A screenshot of a computer Description automatically generated" />

Muistaa painaa Add groupin luomisen jälkeen

Luodaan aplikaation allekirjoitusavain Javan keytoolilla, aja seuraava
komento esmes git bash komentoikkunassa:  
  
keytool -genkeypair -v -storetype PKCS12 -keystore uploadkey.keystore
-alias TÄHÄNOMANAVAIMENNIMI -keyalg RSA -keysize 2048 -validity 10000

Tässä tapauksessa keystoren ja sinne tallennetun avaimen salasana voi
olla sama. Pistä salasa hyvään talteen.

<img src="./attachments/images/media/image13.png"
style="width:6.26806in;height:3.05in"
alt="A screenshot of a computer program Description automatically generated" />  
  
Keystore on binäärinä ja jotta se voidaan tallentaa codemagicin
ympärisömuuttujiin täytyy se ensin muuntaa tekstiksi koodaamalla se
base64-muotoon:

openssl base64 -in uploadkey.keystore -out uploadkey.keystore.base64

<img src="./attachments/images/media/image14.png"
style="width:6.26806in;height:0.82847in"
alt="A black screen with yellow text Description automatically generated" />

Aukaise luotu tiedosto haluamallasi editorilla ja kopioi avain
leikepöydälle.

Jos loit avaimen reposition sisällä niin kuin tässä esimerkissä pääsi
tapahtumaan niin siirrä se sieltä pois ja turvaan ennen committia…

Liitä avain ympäristömuuttujaksi codemagicissä:  
<img src="./attachments/images/media/image15.png"
style="width:6.26806in;height:0.75764in" />

Lisätään vielä keystoren salasana, avaimen alias, avaimen salasan ja
avaimen sijainti buildympäristössä (viimeisen näistä määritämme
codemagic.yamlissa /tmp/keystore.keystore):

<img src="./attachments/images/media/image16.png"
style="width:6.26806in;height:2.38333in"
alt="A screenshot of a computer Description automatically generated" />

Painamalla check for configuration file virheilmoitusten tulisi kadota
ja voit aloittaa ensimmäisen buildin.

<img src="./attachments/images/media/image17.png"
style="width:3.57959in;height:1.79138in"
alt="A screenshot of a chat Description automatically generated" />

Myöhemmin jos muokkaat codemagic.yamlia niin muista päivittää
configuraatiotiedosto myös codemagicissä:  
<img src="./attachments/images/media/image18.png"
style="width:6.26806in;height:0.98125in"
alt="A white background with black and white clouds Description automatically generated" />

Valitse buildattava branchi ja workflow, esimerkissä molempia pitäisi
olla vain yksi.

Voit myös halutessasi enabloida SSH/VNC yhteyden jos haluat ottaa
etäyhteyden buildikoneelle esimerkiksi debuggailua varten. Buildikansio
on ainakin tämän esimerkin ohjeilla /Users/builde/clone

Etäkoneen tutkiskelu on kannattavaa.

<img src="./attachments/images/media/image19.png"
style="width:2.0857in;height:2.21672in"
alt="A screenshot of a computer Description automatically generated" />

<img src="./attachments/images/media/image20.png"
style="width:4.66026in;height:2.61384in" />

Jos ja toivottavasti kun buildi valmistuu näkyy vasemmassa reunassa
linkki .aab bundleen jonka voi ladata Play Storeen. Tallenna tiedosto
koneellesi.

## Muokkaa build.gradle- tiedostoa

build.gradle tiedostoon täytyy muokata (Esimerkkireposition juuressa on
valmis build.gradle tiedosto. Sen nimenä on
com.AndroidOhjelmointi.OstoslistaSovellus, muuta tarvittaessa)

Tarkista että namespace ja applicationId ovat samat kuin
package.jsonissa

<img src="./attachments/images/media/image21.png"
style="width:6.26806in;height:1.63194in"
alt="A screen shot of a computer code Description automatically generated" />

Versionumeroiden tulee olla nousevia ja luotiin codemagic.yamlissa:  
<img src="./attachments/images/media/image22.png"
style="width:6.26806in;height:0.65208in" />

Julkaisu tulee signata joko omilla avaimilla kuten tässä esimerkissä tai
sitten play storen uploadavaimilla:

<img src="./attachments/images/media/image23.png"
style="width:3.78352in;height:1.91104in"
alt="A computer screen with text on it Description automatically generated" />

buildtypesin releaseen valitaan signingConfigs.release:

<img src="./attachments/images/media/image24.png"
style="width:6.26806in;height:2.62292in"
alt="A screen shot of a computer Description automatically generated" />

## Luo Google Play -julkaisutili, uusi projekti ja luo projektiin uusi julkaisu

Luo Google Play Developer tili ($25):  
<https://support.google.com/googleplay/android-developer/answer/6112435?hl=en>

Luo projekti:  
<https://developers.google.com/workspace/guides/create-project>

<img src="./attachments/images/media/image25.png"
style="width:2.74384in;height:2.04405in"
alt="A screenshot of a chat Description automatically generated" />

Jos sinulla on useampi projekti niin valitse juuri luomasi projekti (osa
projekteista voi olla piilossa koska näkyviin tulee vain RECENT
projektit):  
<img src="./attachments/images/media/image26.png"
style="width:2.69142in;height:2.37803in"
alt="A screenshot of a computer Description automatically generated" />

Uploadaa tallentamasi .aab bundle, esimerkissä app-release.aab, Play
Storeen.

Avaa [Google Play Console](https://play.google.com/console) ja Create
app:

<img src="./attachments/images/media/image27.png"
style="width:6.26806in;height:1.96597in"
alt="A white background with black text Description automatically generated" />

Anna sovellukselle nimi ja valitse haluamasi vaihtoehdot:  
<img src="./attachments/images/media/image28.png"
style="width:3.25434in;height:3.62138in"
alt="A screenshot of a computer Description automatically generated" />

Haluamme julkaista sovelluksen sisäiseen testiin.

<img src="./attachments/images/media/image29.png"
style="width:4.59026in;height:1.8954in"
alt="A screenshot of a computer Description automatically generated" />

Valitse testaajat luomalla sähköpostilista ja lisäämällä sinne ainakin
yksi testaaja. Testaajan sähköpostiosoite kannattaa olla puhelimeen
liitetty googletili (<postiosoite@gmail.com>).

<img src="./attachments/images/media/image30.png"
style="width:4.68599in;height:1.73298in"
alt="A screenshot of a computer Description automatically generated" />

<img src="./attachments/images/media/image31.png"
style="width:4.68761in;height:2.04778in"
alt="A screenshot of a computer Description automatically generated" />

<img src="./attachments/images/media/image32.png"
style="width:4.71523in;height:2.0285in"
alt="A screenshot of a computer Description automatically generated" />

Muista tallentaa muutokset (sivun oikea alareuna) ja valitse create new
release

<img src="./attachments/images/media/image33.png"
style="width:3.86512in;height:2.13572in"
alt="A screenshot of a computer Description automatically generated" />

Choose signing key:

<img src="./attachments/images/media/image34.png"
style="width:4.71941in;height:2.35449in"
alt="A screenshot of a computer Description automatically generated" />

Valitse Use Google-generated key (voit myös halutessa uploadata luomasi
avaimen):

<img src="./attachments/images/media/image35.png"
style="width:3.28656in;height:2.0225in"
alt="A screenshot of a computer Description automatically generated" />

Uploadaa tallentamasi .aab bundle, esimerkissä app-release.aab

<img src="./attachments/images/media/image36.png"
style="width:2.13033in;height:1.44313in"
alt="A screenshot of a computer Description automatically generated" />

Pysy sivulla niin kauan, että upload on valmis. Lisää Release Name ja
halutessa Release notes:  
<img src="./attachments/images/media/image37.png"
style="width:2.95406in;height:1.53823in"
alt="A screenshot of a computer Description automatically generated" />

Jos upload epäonnistuu (esim. jos sinulla on jo saman niminen
applikaatio tililläsi, com.jotain.Jotain) niin versionumero saattaa
siitäkin huolimatta kasvaa tjsp. Muuta versionumero käsin build.gradle
tiedostoon väliaikaisesti.

<img src="./attachments/images/media/image38.png"
style="width:4.49373in;height:0.87176in"
alt="A screen shot of a computer code Description automatically generated" />

<img src="./attachments/images/media/image39.png"
style="width:3.02992in;height:1.76404in"
alt="A screenshot of a computer Description automatically generated" />  
<img src="./attachments/images/media/image40.png"
style="width:3.54795in;height:1.37854in"
alt="A screenshot of a computer Description automatically generated" />

Sivun oikeaan alareunaan on piilotettu Next-nappi:

<img src="./attachments/images/media/image41.png"
style="width:3.5836in;height:1.57859in"
alt="A screenshot of a computer Description automatically generated" />

Preview and confirm sivu:  
<img src="./attachments/images/media/image42.png"
style="width:3.00549in;height:1.93828in"
alt="A screenshot of a computer Description automatically generated" />

New app bundles kohdassa voi tuosta sinisestä nuolesta selata bundlen
sisältöä ja vaikka ladata .apk paketti Downloads-välilehdeltä testiä
varten ennen publishaamista.

<img src="./attachments/images/media/image43.png"
style="width:3.24927in;height:1.29237in"
alt="A screenshot of a phone Description automatically generated" />

<img src="./attachments/images/media/image44.png"
style="width:2.73718in;height:1.60122in"
alt="A screenshot of a computer Description automatically generated" />

Testers-välilehdeltä löytyy linkki jonka avulla testaajat pääsevät
liittymään soveluksen testaajiin. Vain testaajien listalla olevat
sähköpostiosoitteet voivat testata sovellusta.

<img src="./attachments/images/media/image45.png"
style="width:3.80261in;height:3.09736in"
alt="A screenshot of a computer Description automatically generated" />

<img src="./attachments/images/media/image46.png"
style="width:3.84861in;height:0.84937in"
alt="A screenshot of a computer Description automatically generated" />

Kutsun voi hyväksyä myös selaimessa

<img src="./attachments/images/media/image47.png"
style="width:3.13236in;height:1.53078in"
alt="A screenshot of a computer Description automatically generated" />

Kutsun hyväksymisen jälkeen samasta linkistä saa sovelluksen ladattua
play storesta:

<img src="./attachments/images/media/image48.png"
style="width:3.46579in;height:2.24474in"
alt="A screenshot of a computer Description automatically generated" />

Sovelluksen ladattavaksi ilmestymiseen voi kestää muutamasta minuutista
pariin tuntiin.

## Luo Service Account automaattista Uploadaamista varten

Luo Service Account:  
<https://developers.google.com/android/management/service-account>

IAM & Admin -&gt; Service Accounts

<img src="./attachments/images/media/image49.png"
style="width:2.24147in;height:3.63542in"
alt="A screenshot of a computer Description automatically generated" />

Valitse luomasi projekti, tässä esimerkkissä
Kehittynyt-Android-Ohjelmointi

<img src="./attachments/images/media/image50.png"
style="width:3.85417in;height:1.83869in"
alt="A screenshot of a computer Description automatically generated" />

Valitse Create Service Account

<img src="./attachments/images/media/image51.png"
style="width:3.63238in;height:1.20288in"
alt="A screenshot of a service account Description automatically generated" />

Anna Service Account tiedot

<img src="./attachments/images/media/image52.png"
style="width:2.77014in;height:3.10068in"
alt="A screenshot of a service account Description automatically generated" />

Mene kolmesta pisteestä Manage Keys kohtaan.

<img src="./attachments/images/media/image53.png"
style="width:4.47804in;height:1.82327in"
alt="A screenshot of a computer Description automatically generated" />

Add Key -&gt; Create new key  
<img src="./attachments/images/media/image54.png"
style="width:2.6857in;height:0.84028in"
alt="A white box with black text Description automatically generated" />

Luo private key projektillesi ja laita key type JSON:iksi

<img src="./attachments/images/media/image55.png"
style="width:2.61967in;height:1.8491in"
alt="A screenshot of a computer Description automatically generated" />

Tallenna avain koneellesi turvalliseen paikkaan:

<img src="./attachments/images/media/image56.png"
style="width:2.81944in;height:1.21882in"
alt="A screenshot of a computer Description automatically generated" />

Kopio luomasi service accountin email talteen vaikkapa muistioon:

<img src="./attachments/images/media/image57.png"
style="width:4.32352in;height:2.00028in"
alt="A screenshot of a computer Description automatically generated" />

Enabloi [Google Play Android Developer
API](https://console.developers.google.com/apis/api/androidpublisher.googleapis.com/).

<img src="./attachments/images/media/image58.png"
style="width:3.73436in;height:2.42696in"
alt="A screenshot of a computer Description automatically generated" />

Avaa [Google Play Console](https://play.google.com/console) ja kutsu
uusi käyttäjä:  
<img src="./attachments/images/media/image59.png"
style="width:3.125in;height:2.8411in"
alt="A screenshot of a computer Description automatically generated" />

Anna talteen laittamasi Service Accountin sähköposti:  
<img src="./attachments/images/media/image60.png"
style="width:3.92708in;height:1.29656in"
alt="A screenshot of a computer Description automatically generated" />

Anna Service Accountille tarvittavat käyttöoikeudet:  
<img src="./attachments/images/media/image61.png"
style="width:3.66999in;height:3.84483in"
alt="A screenshot of a computer Description automatically generated" />

<img src="./attachments/images/media/image62.png"
style="width:3.75916in;height:1.54681in"
alt="A screenshot of a computer Description automatically generated" />

## Lisätään Service Accountin avain Codemagicin ympäristömuuttujiin

Avaa tallentamasi Service Accountin json-muodossa oleva avaintiedosto
esim. vscodessa tai notepadilla ja kopio koko tiedoston sisältö
leikepöydälle.

<img src="./attachments/images/media/image63.png"
style="width:2.90411in;height:2.12676in"
alt="A screen shot of a computer Description automatically generated" />

Siirry codemagicissä sovelluksen asetussivulle ja lisää uusi
ympäristömuuttuja. Liitä Value-kohtaan leikepöydältä json-muodossa oleva
avain, anna muuttujan nimeksi GCLOUD\_SERVICE\_ACCOUNT\_CREDENTIALS ja
lisää muuttuja ryhmään
permissions.<img src="./attachments/images/media/image64.png"
style="width:6.26806in;height:1.68472in"
alt="A screenshot of a computer Description automatically generated" />

Avaa vscodessa codemagic.yaml tiedosto ja poista tiedoston alimmaisten
rivien edestä kommentointimerkit (risuaidat) kuvan mukaisesti:

<img src="./attachments/images/media/image65.png"
style="width:6.26806in;height:1.93403in" />

$ GCLOUD\_SERVICE\_ACCOUNT\_CREDENTIALS sisältää service accountin
avaimen, track: internal ohjaa aab.bundlen sisäiseen testiin ja
submit\_as\_draft jättää julkaisun odottamaan hyväksyntää.

Jos jouduit muuttamaan versionumeron käsin build.gradle tiedostoon
korjaa muutos nyt:

<img src="./attachments/images/media/image38.png"
style="width:4.49373in;height:0.87176in"
alt="A screen shot of a computer code Description automatically generated" />

<img src="./attachments/images/media/image66.png"
style="width:4.47957in;height:0.82782in"
alt="A screen shot of a computer code Description automatically generated" />

Kannattaa klikata molempia refreshausnappeja ja jos codemagic ilmoittaa
yamlivirheistä niin ne täytyy korjata ennen kuin voit aloittaa uuden
buildin. Jos kaikki on okei niin ei muuta kuin buildi tulille.

<img src="./attachments/images/media/image67.png"
style="width:6.26806in;height:1.93819in"
alt="A screenshot of a computer Description automatically generated" />

<img src="./attachments/images/media/image68.png"
style="width:6.26806in;height:3.10278in"
alt="A screenshot of a computer Description automatically generated" />

Lisätietoa [Google Play publishing with
codemagic.yaml](https://docs.codemagic.io/yaml-publishing/google-play/)

Jos buildi ja julkaisu onnistui niin uuden version tulisi näkyä Google
Play Consolissa valittuasi luomasi sovelluksen. Testing -&gt; Internal
testing.

Valitse Edit release:

<img src="./attachments/images/media/image69.png"
style="width:2.8376in;height:2.57792in"
alt="A screenshot of a computer Description automatically generated" />

Voit taas tarkastella bundlea nuolesta tai vain painaa Next.  
<img src="./attachments/images/media/image70.png"
style="width:2.83492in;height:2.73128in"
alt="A screenshot of a computer Description automatically generated" />

Vielä yksi tarkastelusivu ja nyt voitkin julkaista sovelluksen sisäiseen
testiin: Save and publish.

<img src="./attachments/images/media/image71.png"
style="width:2.87031in;height:3.11422in"
alt="A screenshot of a computer Description automatically generated" />

Testaajat jotka ovat jo asentaneet sovelluksen edellisen version play
storesta saavat päivityksen automaattisesti puhelimeensa. Puhelimen
asetuksista riippuen sovellus jo täytyy sitten itse päivittää tai se
päivittyy automaattisesti.
