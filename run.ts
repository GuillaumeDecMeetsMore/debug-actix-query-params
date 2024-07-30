import axios from "axios";
import { stringify } from "qs";

(async () => {
  const res1 = await axios.get("http://localhost:8080/hello/test");
  console.log(res1.request.path, res1.status, res1.data);

  const res2 = await axios.get("http://localhost:8080/params", {
    params: {
      object_param: {
        key1: "value1",
        key2: "value2",
      },
      array_param: ["arr_value1", "arr_value2"],
    },
    validateStatus: () => true,
  });
  console.log(res2.request.path, res2.status, res2.data);

  const res3 = await axios.get("http://localhost:8080/params", {
    params: {
      object_param: {
        key1: "value1",
        key2: "value2",
      },
      array_param: ["arr_value1", "arr_value2"],
    },
    validateStatus: () => true,
    paramsSerializer: (params) => stringify(params),
  });
  console.log(res3.request.path, res3.status, res3.data);

  const res4 = await axios.get("http://localhost:8080/params", {
    params: {
      object_param: {
        key1: "value1",
        key2: "value2",
      },
      array_param: ["arr_value1", "arr_value2"],
    },
    validateStatus: () => true,
    paramsSerializer: (params) =>
      stringify(params, {
        allowDots: true,
      }),
  });
  console.log(res4.request.path, res4.status, res4.data);

  const objectParams: Record<string, string> = {
    key1: "value1",
    key2: "value2",
  };
  const serializedObjectParams = Object.keys(objectParams).reduce(
    (acc, key) => {
      if (acc.length !== 0) {
        return `${acc}&${key}=${objectParams[key]}`;
      }
      return `${key}=${objectParams[key]}`;
    },
    ""
  );
  const res5 = await axios.get("http://localhost:8080/params", {
    params: {
      object_param: encodeURIComponent(serializedObjectParams),
      array_param: ["arr_value1", "arr_value2"],
    },
    validateStatus: () => true,
    paramsSerializer: (params) =>
      stringify(params, {
        allowDots: true,
      }),
  });
  console.log(res5.request.path, res5.status, res5.data);
})();
