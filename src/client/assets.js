const ASSET_NAMES = [
  'ship.svg',
  'women1.png',
  'InkedboosterZoneSlower.jpg',
  'boosterZoneFaster.png',
  'wall.jpg',
  'man1.png',
  'background1.jpg',
  'businessman.png',
  'man2.png',
  'punk-man.png',
];

const assets = {};

const downloadPromise = Promise.all(ASSET_NAMES.map(downloadAsset));

function downloadAsset(assetName) {
  return new Promise(resolve => {
    const asset = new Image();
    asset.onload = () => {
      console.log(`Downloaded ${assetName}`);
      assets[assetName] = asset;
      resolve();
    };
    asset.src = `/assets/${assetName}`;
  });
}

export const downloadAssets = () => downloadPromise;

export const getAsset = assetName => assets[assetName];
