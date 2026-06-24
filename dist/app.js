var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ApiService } from "./ApiService.js";
function register() 
{
    return __awaiter(this, void 0, void 0, function* ()
     {
        // registrierungsdaten aus formular holen
        const name = document.getElementById("reg-name").value.trim();
        const email = document.getElementById("reg-email").value.trim();
        const password = document.getElementById("reg-password").value.trim();
        const groupId = document.getElementById("reg-group").value.trim();
        if (!name || !email || !password || !groupId) 
            {
                alert("Bitte fülle alle Felder aus.");
                return;
            }
        // api aufruf
        const data = yield ApiService.registerUser(name, email, password, groupId);
        console.log("REGISTER:", data);
        if (data.success) 
            {

                alert("Erfolgreich registriert");
                return;
            }
        alert("Registrierung fehlgeschlagen");
    });
}
function login()
 {
    return __awaiter(this, void 0, void 0, function* () {
        // logindaten aus formular holen
        const usernameOrEmail = document.getElementById("login-user").value.trim();
        const password = document.getElementById("login-password").value.trim();
        if (!usernameOrEmail || !password) 
            {
                alert("Email oder Username und Passwort müssen ausgefüllt werden.");
                return;
            }
        // Api kümmert sich um format und speichern von token bzw userid
        const data = yield ApiService.loginUser(usernameOrEmail, password);
        console.log("LOGIN:", data);
        if (!data.success || !data.token || !data.id)
             {
                alert("Login fehlgeschlagen");
                return;
            }
        alert("Login erfolgreich");
    });
}
// Buttons verknüpfen.
document.getElementById("register-btn")
    .addEventListener("click", register);
document.getElementById("login-btn")
    .addEventListener("click", login);
