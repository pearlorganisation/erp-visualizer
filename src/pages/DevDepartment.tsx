import React, { useState, useEffect, useCallback } from "react";
import Chart from "react-apexcharts";
import HttpService from "../http-service";
import {
  modifyErpData,
  getStatus,
  getColor,
  erpArrayType,
  ERP_DEPARTMENT_TYPE,
} from "../helper";
import { statusType } from "../constants";

export const DevDepartment = () => {
  const [height, setHeight] = useState<string>("540");
  const [erpData, setErpData] = useState<Array<erpArrayType>>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    window.addEventListener("resize", handleSetChartWidth);
    return () => window.removeEventListener("resize", handleSetChartWidth);
  }, []);

  useEffect(() => {
    let isSubscribed = true;
    let interval: any;
    const intervalWrapper = (cb: () => void, delay: number) => {
      cb();
      interval = setInterval(cb, delay);
    };
    intervalWrapper(() => handleApiCall(isSubscribed), 30000);

    return () => {
      clearInterval(interval);
      isSubscribed = false;
      HttpService.abortRequest();
    };
  }, []);

  const handleApiCall = (isSubscribed: boolean) => {
    HttpService.getErpDepartmentData()
      .then(async (success: ReturnType<typeof success>) => {
        try {
          const modifiedData: Array<erpArrayType> = await modifyErpData(
            success
          );
          if (isSubscribed) {
            setErpData(modifiedData);
            setLoading(false);
          }
        } catch (err: ReturnType<typeof err>) {
          throw new Error(err);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleSetChartWidth = useCallback(
    (e: any) => {
      if (e.target.innerwidth >= 634 && e.target.innerWidth <= 1016) {
        setHeight(`${e.target.innnerHeight}`);
      } else setHeight("540");
    },
    [height]
  );

  const AppDepartmentState = {
    options: {
      chart: {
        id: "bar",
      },
      title: {
        text: "Live Advanced APP Tech Dept. Report",
        offsetX: 7,
      },
      xaxis: {
        categories: statusType,
      },
      colors: [
        function ({ dataPointIndex }: any) {
          return getColor(dataPointIndex);
        },
      ],
    },
    series: [
      {
        name: "erp-status",
        data: [
          erpData.length === 0
            ? ""
            : getStatus(erpData, ERP_DEPARTMENT_TYPE.APP)?.QCprojects,
          erpData.length === 0
            ? ""
            : getStatus(erpData, ERP_DEPARTMENT_TYPE.APP)
                ?.overallProjectCompleted,
          erpData.length === 0
            ? ""
            : getStatus(erpData, ERP_DEPARTMENT_TYPE.APP)
                ?.overdueProjectNotCompleteds,
          erpData.length === 0
            ? ""
            : getStatus(erpData, ERP_DEPARTMENT_TYPE.APP)?.todayProjectRecieved,
          erpData.length === 0
            ? ""
            : getStatus(erpData, ERP_DEPARTMENT_TYPE.APP)?.todayTaskCompleted,
          erpData.length === 0
            ? ""
            : getStatus(erpData, ERP_DEPARTMENT_TYPE.APP)
                ?.todayTotalTaskCreated,
          erpData.length === 0
            ? ""
            : getStatus(erpData, ERP_DEPARTMENT_TYPE.APP)?.todayWorkedUpon,
        ],
      },
    ],
  };

  const WixDepartmentState = {
    options: {
      chart: {
        id: "bar",
      },
      title: {
        text: "Live Advanced HTML Tech Dept. Report",
        offsetX: 7,
      },
      xaxis: {
        categories: statusType,
      },
      colors: [
        function ({ dataPointIndex }: any) {
          return getColor(dataPointIndex);
        },
      ],
    },
    series: [
      {
        name: "erp-status",
        data: [
          erpData.length === 0
            ? ""
            : getStatus(erpData, ERP_DEPARTMENT_TYPE.WIX)?.QCprojects,
          erpData.length === 0
            ? ""
            : getStatus(erpData, ERP_DEPARTMENT_TYPE.WIX)
                ?.overallProjectCompleted,
          erpData.length === 0
            ? ""
            : getStatus(erpData, ERP_DEPARTMENT_TYPE.WIX)
                ?.overdueProjectNotCompleteds,
          erpData.length === 0
            ? ""
            : getStatus(erpData, ERP_DEPARTMENT_TYPE.WIX)?.todayProjectRecieved,
          erpData.length === 0
            ? ""
            : getStatus(erpData, ERP_DEPARTMENT_TYPE.WIX)?.todayTaskCompleted,
          erpData.length === 0
            ? ""
            : getStatus(erpData, ERP_DEPARTMENT_TYPE.WIX)
                ?.todayTotalTaskCreated,
          erpData.length === 0
            ? ""
            : getStatus(erpData, ERP_DEPARTMENT_TYPE.WIX)?.todayWorkedUpon,
        ],
      },
    ],
  };

  const PHPDepartmentState = {
    options: {
      chart: {
        id: "bar",
      },
      title: {
        text: "Live Advanced PHP Tech Dept. Report",
        offsetX: 7,
      },
      xaxis: {
        categories: statusType,
      },
      colors: [
        function ({ dataPointIndex }: any) {
          return getColor(dataPointIndex);
        },
      ],
    },
    series: [
      {
        name: "erp-status",
        data: [
          erpData.length === 0
            ? ""
            : getStatus(erpData, ERP_DEPARTMENT_TYPE.PHP)?.QCprojects,
          erpData.length === 0
            ? ""
            : getStatus(erpData, ERP_DEPARTMENT_TYPE.PHP)
                ?.overallProjectCompleted,
          erpData.length === 0
            ? ""
            : getStatus(erpData, ERP_DEPARTMENT_TYPE.PHP)
                ?.overdueProjectNotCompleteds,
          erpData.length === 0
            ? ""
            : getStatus(erpData, ERP_DEPARTMENT_TYPE.PHP)?.todayProjectRecieved,
          erpData.length === 0
            ? ""
            : getStatus(erpData, ERP_DEPARTMENT_TYPE.PHP)?.todayTaskCompleted,
          erpData.length === 0
            ? ""
            : getStatus(erpData, ERP_DEPARTMENT_TYPE.PHP)
                ?.todayTotalTaskCreated,
          erpData.length === 0
            ? ""
            : getStatus(erpData, ERP_DEPARTMENT_TYPE.PHP)?.todayWorkedUpon,
        ],
      },
    ],
  };

  return (
    <div
      className={`p-1 relative z-1 bg-gray-300 h-screen w-auto
       grid sm:grid-cols-1 sm:grid-rows-3 lg:grid-rows-1 lg:grid-cols-3 gap-2`}
    >
      <div className="flex bg-white rounded-md relative">
        <Chart
          className={"flex-1 "}
          options={PHPDepartmentState.options}
          series={PHPDepartmentState.series}
          type="bar"
          height={height}
        />
        <span className="absolute animate-pulse h-2 w-2 top-2 left-1 bg-green-500 rounded-full" />
      </div>
      <div className="flex bg-white rounded-md relative">
        <Chart
          className={"flex-1"}
          options={AppDepartmentState.options}
          series={AppDepartmentState.series}
          type="bar"
          height={height}
        />
        <span className="animate-pulse absolute h-2 w-2 top-2 left-1 bg-green-500 rounded-full" />
      </div>
      <div className="flex bg-white rounded-md relative">
        <Chart
          className={"flex-1"}
          options={WixDepartmentState.options}
          series={WixDepartmentState.series}
          type="bar"
          height={height}
        />
        <span className="animate-pulse absolute h-2 w-2 top-2 left-1 bg-green-500 rounded-full" />
      </div>

      {loading && (
        <div className="flex gap-4 justify-center items-center absolute left-[50%] top-[50%]">
          <div className="spinner-border border-black animate-spin inline-block w-8 h-8 border-4 border-t-0 rounded-full"></div>
          <span className="visually-hidden text-black font-bold">
            Loading...
          </span>
        </div>
      )}

      <div className="absolute w-[99%] text-black justify-center items-center h-10 flex overflow-x-hidden z-40 bottom-1">
        <div className=" animate-marquee backdrop-blur-sm bg-white/30 whitespace-nowrap">
          <span className="text-xl ">test</span>
          <span className="text-xl ">Marquee Itemn mn m 2</span>
          <span className="text-xl ">Marquee Item 3</span>
          <span className="text-xl ">Marquee Item 4</span>
          <span className="text-xl ">Marquee Item 5</span>
          <span className="text-xl ">test</span>
          <span className="text-xl ">Marquee Itemn mn m 2</span>
          <span className="text-xl ">Marquee Item 3</span>
          <span className="text-xl ">Marquee Item 4</span>
          <span className="text-xl ">Marquee Item 5</span>
        </div>
      </div>
    </div>
  );
};

// export default FloorOne;
