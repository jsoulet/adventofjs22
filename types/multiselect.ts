export type Episode = {
  name: string,
  id: number,

}

export type EpisodeWithStatus  = Episode & {
  checked: boolean
}