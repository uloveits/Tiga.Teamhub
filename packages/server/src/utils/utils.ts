import * as fs from 'fs';

export const getRandomColor = () => {
  return (
    '#' + ('00000' + ((Math.random() * 0x1000000) << 0).toString(16)).substr(-6)
  );
};
export function Guid() {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return `${S4()}${S4()}-${S4()}-${S4()}-${S4()}-${S4()}${S4()}${S4()}`;
}

export const checkDirAndCreate = (filePath) => {
  const pathArr = filePath.split('/');
  let checkPath = '.';
  let item: string;
  for (item of pathArr) {
    checkPath += `/${item}`;
    if (!fs.existsSync(checkPath)) {
      fs.mkdirSync(checkPath);
    }
  }
};
