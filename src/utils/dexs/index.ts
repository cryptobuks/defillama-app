import { IDexResponse } from "~/api/types";

const summAllVolumes = (breakdownVolumes: IDexResponse['volumeHistory'][0]['dailyVolume']) =>
  Object.values(breakdownVolumes).reduce((acc, volume) =>
    acc + Object.values(volume)
      .reduce<number>((vacc, current) => typeof current === 'number' ? vacc + current : vacc, 0)
    , 0)

export const getChartDataFromVolumeHistory =
  (volumeHistory: IDexResponse['volumeHistory']): number[][] =>
    volumeHistory.map(({ timestamp, dailyVolume }) => ([timestamp, summAllVolumes(dailyVolume)]))