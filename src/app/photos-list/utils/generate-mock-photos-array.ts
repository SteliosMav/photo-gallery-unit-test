import { Photo } from '../data-access/photos-list.service';

export function generateMockPhotosArray(): Photo[] {
  const photosArray: Photo[] = [];
  for (let index = 1; index < 100; index++) {
    photosArray.push({ name: `${index}` });
  }
  return photosArray;
}
