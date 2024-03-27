export const validate = (payload, setInvaliFields) => {
  let invalids = 0;
  const fomatPayload = Object.entries(payload);
  for (let arr of fomatPayload) {
    if (arr[1].trim() === "") {
      invalids++;
      setInvaliFields((prev) => [
        ...prev,
        { name: arr[0], mes: "Require this field." },
      ]);
    }
  }

  for (let arr of fomatPayload) {
    switch (arr[0]) {
      case "email":
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!arr[1].match(regex)) {
          invalids++;
          setInvaliFields((prev) => [
            ...prev,
            { name: arr[0], mes: "Email invalid." },
          ]);
        }
        break;

      case "password":
        if (arr[1].length < 1) {
          invalids++;
          setInvaliFields((prev) => [
            ...prev,
            { name: arr[0], mes: "Password minimum 1 characters." },
          ]);
        }
        break;

      default:
        break;
    }
  }

  return invalids;
};

export const reverseTransformData = (data, id_main) => {
  const reversedData = [];
  Object.keys(data)?.forEach((key) => {
    if (key !== "id_others" && data[key] === true) {
      reversedData.push({
        id_main: id_main,
        column: key,
        id_others: data.id_others,
      });
    }
  });

  return reversedData;
};

export const transformData = (data) => {
  const newData = {};

  data.forEach((item) => {
    if (newData[item.id_others]) {
      newData[item.id_others][item.column] = true;
    } else {
      newData[item.id_others] = {
        id_others: item.id_others,
        [item.column]: true,
      };
    }
  });

  return Object.values(newData);
};