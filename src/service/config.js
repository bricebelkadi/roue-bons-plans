import Case from "../model/case"

export default class Config {
    static initConfig = [
        new Case("passe"),
        new Case("win", 20),
        new Case("win", 10),
        new Case("win", 50),
        new Case("win", 20),
        new Case("chance"),
        new Case("win", 100),
        new Case("win", 10),
        new Case("win", 20),
        new Case("crash"),
        new Case("win", 20),
        new Case("win", 50),
        new Case("win", 100),
        new Case("win", 10),
        new Case("super chance"),
        new Case("win", 10),
        new Case("win", 50),
        new Case("crash"),
        new Case("win", 200),
        new Case("win", 20),
        new Case("win", 50),
    ]

    static getConfig() {
        let roueConfig = JSON.parse(localStorage.getItem('roueConfig')) || undefined;
        if (!roueConfig) {
            console.log("aucune configuration trouvée => nouvelle config d'init enregistrée en localStorage")
            roueConfig = this.initConfig;
            localStorage.setItem('roueConfig', JSON.stringify(roueConfig))
        }
        return roueConfig;
    }

    static updateConfigIndex(i, type, value) {
        const roueConfig = this.getConfig();
        roueConfig[i] = new Case(type, value);
        localStorage.setItem("roueConfig", JSON.stringify(roueConfig));
    }

    static updateConfig(x) {
        localStorage.setItem("roueConfig", JSON.stringify(x));
    }
}