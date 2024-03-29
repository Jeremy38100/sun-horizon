export {getAltitude, highestPointInAzimuth} from './altitude';
export {init, getCacheData, cleanCache} from './cache';
export * from './types';

import { highestPointInAzimuth } from './altitude';
import { AzimuthParams, Horizon, HorizonOptions, LatLng } from './types';

export async function getHorizon(origin: LatLng, options: HorizonOptions = {}): Promise<Horizon> {
  const horizon: Horizon = {
    elevationProfile: [],
    origin
  };
  const azimuthParams = new AzimuthParams(options.azimuthOptions);
  let azimuth = azimuthParams.azimuthStart;
  while (azimuth < azimuthParams.azimuthEnd) {
    horizon.elevationProfile.push(await highestPointInAzimuth(origin, azimuth, options.highestPointOptions));
    azimuth += azimuthParams.azimuthTick;
  }
  return horizon;
}
