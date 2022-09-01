/*
 * @Author: wangxian
 * @Date: 2022-09-01 16:19:43
 * @LastEditTime: 2022-09-01 16:19:45
 */
/**
 * 生成tree
 * @param pid 父id
 */
export function toTree(array: any[], pid: number = -1): any[] {
  const child = array.filter((it) => it.pid === pid);

  return child.map((it: any) => {
    return {
      ...it,
      key: it.id,
      title: it.name,
      children: toTree(array, it.id),
    };
  });
}
