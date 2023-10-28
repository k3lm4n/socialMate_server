import { Request, Response } from "express";
import { RtcTokenBuilder, RtcRole } from "agora-token";

const appID = process.env.AGORA_APP_ID;
const appCertificate = process.env.AGORA_APP_CERTIFICATE;

const generateToken = (req: Request, res: Response) => {
  const channelName = req.params.channelName;
  const uid = req.params.uid;
  const role = RtcRole.PUBLISHER;

  const expirationTimeInSeconds = 3600;

  const currentTimestamp = Math.floor(Date.now() / 1000);

  const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

  if (!appID || !appCertificate) {
    return res.status(500).json({ message: "Erro ao gerar token" });
  }

  if (!channelName) {
    return res.status(500).json({ message: "Erro ao gerar token" });
  }

  const token = RtcTokenBuilder.buildTokenWithUid(
    appID,
    appCertificate,
    channelName,
    uid,
    role,
    privilegeExpiredTs,
    privilegeExpiredTs
  );

  return res.status(200).json(token);
};

export { generateToken };
