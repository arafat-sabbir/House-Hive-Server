export interface TUser {
  name: string;
  email: string;
  role: "user"|"admin"|"agent";
  agentReq: boolean;
  whatsapp?: string;
  linkedin?: string;
  twitter?: string;
  facebook?: string;
}
