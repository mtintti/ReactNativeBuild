## LOCAL BUILD LINUXILLA



### Asenna WSL (Windows Subsystem for Linux)

1. Avaa komentokehote ja kirjoita komento:
    ```
    wsl --install
    ```
2. Rebuuttaa tietokone ja käynnistä Ubuntu.
3. Määritä itsellesi käyttäjätunnus ja salasana.
4. WSL yhdistää automaattisesti Windowsin PATH-muuttujan Linuxin PATH:iin, joten tämä täytyy muuttaa.
5. Kirjoita komento:
    ```
    sudo sh -c "echo '[interop]\nappendWindowsPath=false' >> /etc/wsl.conf"
    ```
6. Tämä ottaa käyttöön vain Linuxin PATH-muuttujan.

### Asenna npm

1. Päivitä paketit:
    ```
    sudo apt update
    ```
2. Asenna npm:
    ```
    sudo apt install npm
    ```

### Kloonaa repository

1. Kloonaa haluamasi repository:
    ```
    git clone https://github.com/AndroidOhjelmointi/ReactNativeBuild.git
    cd ReactNativeBuild
    npm install
    ```

### Asenna Expo CLI

1. Asenna CLI komentorivi:
    ```
    sudo npm install expo-cli --global
    ```

### Asenna Java

1. Asenna Java versio 17:
    ```
    sudo apt install openjdk-17-jdk
    ```
2. Tarkista Java versiosi:
    ```
    java -version
    ```

### Asenna Android SDK

1. Luo hakemistot Android SDK:lle:
    ```
    mkdir -p ~/Android/Sdk/cmdline-tools
    ```
2. Asenna uusin command line tools:
- #### uusin versio löytyy osoitteesta: https://developer.android.com/studio
    ```
    wget https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip -O ~/commandlinetools.zip
    ```
3. Asenna unzip ja pura commandlinetools.zip:
    ```
    sudo apt install unzip
    unzip ~/commandlinetools.zip -d ~/Android/Sdk/cmdline-tools
    ```
4. Nimeä cmdline-tools kansio latest kansioksi:
    ```
    mv ~/Android/Sdk/cmdline-tools/cmdline-tools ~/Android/Sdk/cmdline-tools/latest
    ```
5. Lisää Android SDK ja Command-Line tools PATH-muuttujiin:
    ```
    sudo sh -c "echo '\nexport ANDROID_SDK_ROOT=\$HOME/Android/Sdk\nexport PATH=\$PATH:\$ANDROID_SDK_ROOT/cmdline-tools/latest/bin\nexport PATH=\$PATH:\$ANDROID_SDK_ROOT/platform-tools\n' >> $HOME/.bashrc"
    ```
6. Ota muutokset käyttöön:
    ```
    source ~/.bashrc
    ```
7. Tarkista, että asennus on onnistunut:
    ```
    sdkmanager --version
    ```
8. Asenna tarvittavat SDK paketit:
- #### uusin versio löytyy osoitteesta: https://developer.android.com/tools/releases/build-tools
    ```
    sdkmanager "platform-tools" "platforms;android-34" "build-tools;34.0.0"
    ```

### Luo Expo dev account

1. Luo tili: [https://expo.dev/](https://expo.dev/)

### Asenna eas CLI

1. Asenna eas CLI:
    ```
    sudo npm install -g eas-cli
    ```
2. Kirjaudu Expo dev accountille:
    ```
    eas login
    ```
3. Tarkista kirjautuminen:
    ```
    eas whoami
    ```

### Konfiguroi projekti androidille

1. Konfiguroi projekti:
    ```
    eas build:configure
    ```
2. Luo .aab bundle:
    ```
    eas build --platform android --local
    ```
3. Buildaa projekti suoraan puhelimelle asennettavaksi APK:ksi:
    ```
    eas build --platform android --local --profile preview
    ```

### Muisti ja buildin kesto

- Kun muistia oli vain 8 gigatavua, buildi epäonnistui.
- 10 gigatavulla buildi onnistui, mutta kesti 15-20min.
- 16 gigatavulla buildi kesti noin 5min.

### Virheilmoitukset ja varoitukset

- Buildin aikaisia virheilmoituksia ja varoituksia voi poistaa esim. asentelemalla puuttuvia paketteja:
    ```
    npm install expo-system-ui
    ```

### Luotu .aab tai .apk

- Löytyy resurssienhallinnasta koneella:
    ```
    \\wsl.localhost\Ubuntu\home\AndroidOhjelmointi\ReactNativeBuild
    ```
