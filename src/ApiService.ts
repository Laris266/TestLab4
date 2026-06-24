export interface ApiResponse 
{
  success?: boolean;
  error?: string;
  token?: string;
  id?: string;
}

const BASE_URL = "http://webp-ilv-backend.cs.technikum-wien.at/messenger";

export class ApiService 
{

  private static token: string | null = null;
  private static userId: string | null = null;

  static getToken(): string | null {
    return this.token;
  }

  static getUserId(): string | null {
    return this.userId;
  }

  static async registerUser(
    name: string,
    email: string,
    password: string,
    groupId: string
  ): Promise<ApiResponse> {
    try {
      // registrierung mit werten an backend senden, antwort zurückgeben für UI
      const res = await fetch(`${BASE_URL}/registrieren.php`, {
        method: "POST",
        body: new URLSearchParams({
          name,
          email,
          password,
          group_id: groupId
        })
      });

      const data = (await res.json()) as ApiResponse;
        if (!res.ok || !data.success) { //zb fehlerhafte eingabe
          return { success: false, error: data.error || "Registrierung fehlgeschlagen" };
        }

        return { success: true, id: data.id };
    } catch { //zb server down 
        return { success: false, error: "Registrierung fehlgeschlagen. Probiere es erneut" };
    }
  }


  static async loginUser(
    usernameOrEmail: string,
    password: string
  ): Promise<ApiResponse> {
    try {
      let res: Response;
      const isLocalDev = window.location.origin.includes("127.0.0.1") 
        || window.location.origin.includes("localhost"); // for debugging und wegen CORS probleme



      if (isLocalDev) 
        {
          // Workaround um die Fehlermeldung zu meiden?
          res = await fetch(`${BASE_URL}/login.php`, {
            method: "POST",
            body: new URLSearchParams({
              username_or_email: usernameOrEmail,
              password
            })
          });
      } else 
        {
          // README JSON
          res = await fetch(`${BASE_URL}/login.php`, {
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
      

      const data = (await res.json()) as ApiResponse;
        if (!res.ok || !data.token || !data.id) {
          return { success: false, error: data.error || "Login fehlgeschlagen" };
        }

      // token und id für spätere anfragen speichern
      this.token = data.token;

      this.userId = data.id;


      return { success: true, token: data.token, id: data.id };
    } catch {
      return { success: false, error: "Login fehlgeschlagen. Überprüfe deine VPN/Netzwerkverbindung und versuche es erneut." };

    }

  }

}
