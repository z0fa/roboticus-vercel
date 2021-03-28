import { VercelRequest, VercelResponse } from "@vercel/node";
import { resolveCommand, verifyKey } from "@z0fa/roboticus";
import commands from "../index"

const CLIENT_PUBLIC_KEY = process.env.CLIENT_PUBLIC_KEY;

export default async function (req: VercelRequest, res: VercelResponse) {
  const signature = req.headers["x-signature-ed25519"].toString();
  const timestamp = req.headers["x-signature-timestamp"].toString();

  const isValidRequest = await verifyKey(
    JSON.stringify(req.body),
    signature,
    timestamp,
    CLIENT_PUBLIC_KEY
  );

  if (!isValidRequest) {
    return res.status(401).end("Bad request signature");
  }

  const interaction = req.body;
  const response = await resolveCommand(interaction, commands)

  return res.json(response);
}
