import type { NextApiRequest, NextApiResponse } from "next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    res.json({ hoge: 1 });
    res.status(200);
};
export default handler;