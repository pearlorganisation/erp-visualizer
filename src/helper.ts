export enum ERP_DEPARTMENT_TYPE {
  PHP = "PHP",
  APP = "APP",
  WIX = "WIX",
}

enum ERP_COLOR {
  PINK = "#E75480",
  GREEN = "#00FF00",
  RED = "#FF0000",
  BLUE = "#0000FF",
  ORANGE = "#FFA500",
  DEFAULT = "#5B8FF9",
}

type DepartMentTypes = {
  QCprojects: number;
  overallProjectCompleted: number;
  overdueProjectNotCompleteds: number;
  todayProjectRecieved: number;
  todayTaskCompleted: number;
  todayTotalTaskCreated: number;
  todayWorkedUpon: number;
};
export type erpArrayType = [
  { PHP: DepartMentTypes },
  { APP: DepartMentTypes },
  { WIX: DepartMentTypes }
];

export const modifyErpData = (args: any) => {
  return new Promise((resolve, reject) => {
    const erpArray: any | erpArrayType = [];
    for (const key in args) {
      const param: string[] = key.split("_");
      if (param[0] === ERP_DEPARTMENT_TYPE.PHP) {
        if (erpArray.length) {
          const index = erpArray.findIndex(
            (item: any) => Object.keys(item)[0] === ERP_DEPARTMENT_TYPE.PHP
          );
          Object.assign(erpArray[index].PHP, {
            [param[1]]: args[key],
          });
        } else
          erpArray.push(
            Object.assign(
              {},
              {
                [param[0]]: {
                  [param[1]]: args[key],
                },
              }
            )
          );
      } else if (param[0] === ERP_DEPARTMENT_TYPE.APP) {
        const foundIndex = erpArray.findIndex(
          (item: any) => Object.keys(item)[0] === ERP_DEPARTMENT_TYPE.APP
        );
        if (foundIndex !== -1) {
          Object.assign(erpArray[foundIndex].APP, {
            [param[1]]: args[key],
          });
        } else
          erpArray.push(
            Object.assign(
              {},
              {
                [param[0]]: {
                  [param[1]]: args[key],
                },
              }
            )
          );
      } else if (param[0] === ERP_DEPARTMENT_TYPE.WIX) {
        const foundIndex = erpArray.findIndex(
          (item: any) => Object.keys(item)[0] === ERP_DEPARTMENT_TYPE.WIX
        );
        if (foundIndex !== -1) {
          Object.assign(erpArray[foundIndex].WIX, {
            [param[1]]: args[key],
          });
        } else
          erpArray.push(
            Object.assign(
              {},
              {
                [param[0]]: {
                  [param[1]]: args[key],
                },
              }
            )
          );
      }
    }
    if (erpArray.length) {
      resolve(erpArray);
    } else reject("something went wrong...");
  });
};

export const getStatus = (erpData: Array<any>, args: string) => {
  return erpData?.find((item: any) => Object.keys(item)[0] === args)?.[args];
};

export const getColor = (dataPointIndex: number) => {
  switch (dataPointIndex) {
    case 0:
      return ERP_COLOR.PINK;
    case 1:
      return ERP_COLOR.GREEN;
    case 2:
      return ERP_COLOR.RED;
    case 3:
      return ERP_COLOR.BLUE;
    case 4:
      return ERP_COLOR.GREEN;
    case 5:
      return ERP_COLOR.ORANGE;
    case 6:
      return ERP_COLOR.ORANGE;
    default:
      return ERP_COLOR.DEFAULT;
  }
};
