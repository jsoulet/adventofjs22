// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import type { Metadata as ChallengeMeta } from '../../types/challenge'

const challenges = [
  {
    name: 'Pomodoro',
    slug: '1-pomodoro'
  },
  {},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},
]

const responseData: any[] = []
responseData.length = 24

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ChallengeMeta[]>
) {
  const response = challenges.map((challenge, index) => {
    const day = (index + 1).toLocaleString('en-GB', {minimumIntegerDigits: 2})
    return {
      ...challenge,
      date: `2022-12-${day}`
    }
  })
  res.status(200).json(response)
}
