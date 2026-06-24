var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const BASE_URL = "http://webp-ilv-backend.cs.technikum-wien.at/messenger";
export class ApiService {
    static getToken() {
        return this.token;
    }
    static getUserId() {
        return this.userId;
    }
    static registerUser(name, email, password, groupId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // registrierung mit werten an backend senden, antwort zurückgeben für UI
                const res = yield fetch(`${BASE_URL}/registrieren.php`, {
                    method: "POST",
                    body: new URLSearchParams({
                        name,
                        email,
                        password,
                        group_id: groupId
                    })
                });
                const data = (yield res.json());
                if (!res.ok || !data.success) {
                    return { success: false, error: data.error || "Registrierung fehlgeschlagen" };
                }
                return { success: true, id: data.id };
            }
            catch (_a) {
                return { success: false, error: "Registrierung fehlgeschlagen. Probiere es erneut" };
            }
        });
    }
    static loginUser(usernameOrEmail, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let res;
                const isLocalDev = window.location.origin.includes("127.0.0.1")
                    || window.location.origin.includes("localhost");
                if (isLocalDev) {
                    // Workaround um die Fehlermeldung zu meiden?
                    res = yield fetch(`${BASE_URL}/login.php`, {
                        method: "POST",
                        body: new URLSearchParams({
                            username_or_email: usernameOrEmail,
                            password
                        })
                    });
                }
                else {
                    // README JSON
                    res = yield fetch(`${BASE_URL}/login.php`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            username_or_email: usernameOrEmail,
                            password
                        })
                    });
                }
                const data = (yield res.json());
                if (!res.ok || !data.token || !data.id) {
                    return { success: false, error: data.error || "Login fehlgeschlagen" };
                }
                // token und id für spätere anfragen speichern
                this.token = data.token;
                this.userId = data.id;
                return { success: true, token: data.token, id: data.id };
            }
            catch (_a) {
                return { success: false, error: "Login fehlgeschlagen. Überprüfe deine VPN/Netzwerkverbindung und versuche es erneut." };
            }
        });
    }
}
ApiService.token = null;
ApiService.userId = null;
