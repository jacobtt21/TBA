import { Client } from 'square';
import { randomUUID } from 'crypto';

const { paymentsApi } = new Client({
  accessToken: process.env.NEXT_PUBLIC_SQUARE_ACCESS_TOKEN,
  environment: 'sandbox'
});

export default async function handler(req, res) {
  try {
    const { result } = await paymentsApi.createPayment({
      idempotencyKey: randomUUID(),
      sourceId: req.body.sourceId,
      amountMoney: {
        currency: 'USD',
        amount: req.body.amount
      }
    })
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ "payment": {"status": "FAILED"} });
  }
}

BigInt.prototype.toJSON = function() { return this.toString(); }