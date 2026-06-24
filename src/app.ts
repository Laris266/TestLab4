import { ApiService } from "./ApiService.js";

async function register(): Promise<void> 
{
  // registrierungsdaten aus formular holen
  const name = (document.getElementById("reg-name") as HTMLInputElement).value.trim();
  const email = (document.getElementById("reg-email") as HTMLInputElement).value.trim();
  const password = (document.getElementById("reg-password") as HTMLInputElement).value.trim();
  const groupId = (document.getElementById("reg-group") as HTMLInputElement).value.trim();

  if (!name || !email || !password || !groupId) 
    {
      alert("Bitte fülle alle Felder aus.");
      return;
    }

  // api aufruf
  const data = await ApiService.registerUser(name, email, password, groupId);
  console.log("REGISTER:", data);

  if (data.success) // == true sozusagen weil apiresonse interface das beihnhaltet
    {
      alert("Erfolgreich registriert");
      return;
    }

  alert("Registrierung fehlgeschlagen");
}


async function login(): Promise<void> 
{
  // logindaten aus formular holen
  const usernameOrEmail = (document.getElementById("login-user") as HTMLInputElement).value.trim();
  const password = (document.getElementById("login-password") as HTMLInputElement).value.trim();

  if (!usernameOrEmail || !password) 
    {
      alert("Email oder Username und Passwort müssen ausgefüllt werden.");
      return;
    }

  // Api kümmert sich um format und speichern von token bzw userid
  const data = await ApiService.loginUser(usernameOrEmail, password);
  console.log("LOGIN:", data);


  if (!data.success || !data.token || !data.id) 
    {
      alert("Login fehlgeschlagen");
      return;
    }

  alert("Login erfolgreich");
}


// Buttons verknüpfen.
document.getElementById("register-btn")!
  .addEventListener("click", register);

document.getElementById("login-btn")!
  .addEventListener("click", login);
